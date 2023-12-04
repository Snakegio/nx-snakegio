// Nrwl
import {readJson, Tree} from '@nx/devkit';
import {createTreeWithEmptyWorkspace} from '@nx/devkit/testing';
import {initGenerator} from "./generator";

// Generator

describe('init schematic', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace({layout: "apps-libs"});
  });

  it('should add openapi dep to package.json if not already present', async () => {
    await initGenerator(appTree,{version:"2.7.0"});
    const packageJson = readJson(appTree, '/package.json');

    expect(packageJson).toMatchObject({
      dependencies: {},
      devDependencies: {
        '@openapitools/openapi-generator-cli': expect.anything(),
      },
    });
  });
});
