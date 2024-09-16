import { logger } from '@nx/devkit';
import { GenerateApiLibSourcesExecutorSchema } from './schema';
import { mkdirSync } from 'fs';
import { ExecutorContext } from 'nx/src/config/misc-interfaces';
import { deleteOutputDir } from '../../utils/delete-output-dir';
import { spawn } from 'cross-spawn';

export default async function runExecutor(
  options: GenerateApiLibSourcesExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const outputDir = context.workspace.projects[context.projectName].sourceRoot;
  const root = context.root;

  logger.info(`Deleting outputDir ${outputDir}...`);

  deleteOutputDir(root, outputDir);

  logger.info(`Done deleting outputDir ${outputDir}.`);

  await generateSources(
    options.useDockerBuild ?? false,
    options.dockerImage ?? 'openapitools/openapi-generator-cli:latest',
    options.sourceSpecPathOrUrl,
    options.sourceSpecUrlAuthorizationHeaders,
    options.generator,
    options.additionalProperties,
    options.globalProperties,
    options.typeMappings,
    options.silent,
    options.skipValidateSpec,
    outputDir
  );

  return { success: true };
}

async function generateSources(
  useDockerBuild: boolean,
  dockerImage: string,
  apiSpecPathOrUrl: string,
  apiSpecAuthorizationHeaders: string,
  generator: string,
  additionalProperties: string,
  globalProperties: string,
  typeMappings: string,
  silent: boolean,
  skipValidateSpec: boolean,
  outputDir: string
): Promise<number> {
  mkdirSync(outputDir, { recursive: true });

  return new Promise((resolve, reject) => {
    const { command, args } = useDockerBuild
      ? {
          command: 'docker',
          args: [
            'run',
            '--rm',
            '-v',
            `${process.cwd()}:/local`,
            '-w',
            '/local',
            dockerImage,
          ],
        }
      : { command: 'npx', args: ['openapi-generator-cli'] };

    args.push(
      'generate',
      '-i',
      apiSpecPathOrUrl,
      '-g',
      generator,
      '-o',
      outputDir
    );

    if (additionalProperties) {
      args.push('--additional-properties', additionalProperties);
    }

    if (apiSpecAuthorizationHeaders) {
      args.push('--auth', apiSpecAuthorizationHeaders);
    }

    if (typeMappings) {
      args.push('--type-mappings', typeMappings);
    }

    if (globalProperties) {
      args.push('--global-property', globalProperties);
    }

    if (skipValidateSpec) {
      args.push('--skip-validate-spec');
    }

    logger.info(`[command]: ${command} ${args.join(' ')}`);

    const child = spawn(command, args, { stdio: silent ? 'ignore' : 'pipe' });

    child.stdout?.on('data', (data) => {
      logger.info(`[stdout]: ${data}`);
    });

    child.stderr?.on('data', (data) => {
      logger.error(`[stderr]: ${data}`);
    });

    child.on('error', (err) => {
      reject(err);
    });
    child.on('exit', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}
