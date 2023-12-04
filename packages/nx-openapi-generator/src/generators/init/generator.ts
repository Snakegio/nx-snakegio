import {addDependenciesToPackageJson, GeneratorCallback, runTasksInSerial, Tree,} from '@nx/devkit';
import {InitGeneratorSchema} from "./schema";


function updateDependencies(host: Tree, schema: InitGeneratorSchema) {
  return addDependenciesToPackageJson(host, {},
    {'@openapitools/openapi-generator-cli': schema.version}
  );
}


export async function initGenerator(tree: Tree, schema: InitGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];
  const installTask = updateDependencies(tree, schema);
  tasks.push(installTask);
  return runTasksInSerial(...tasks);
}

export default initGenerator;
