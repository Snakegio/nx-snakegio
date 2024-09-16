export interface GenerateApiLibSourcesExecutorSchema {
  generator: string;
  sourceSpecPathOrUrl: string;
  useDockerBuild?: boolean;
  dockerImage?: string;
  sourceSpecUrlAuthorizationHeaders?: string;
  additionalProperties?: string;
  globalProperties?: string;
  typeMappings?: string;
  silent?: boolean;
  skipValidateSpec?: boolean;
}
