const { getMetaData, getDependencyMD } = require("./helpers");
const { writeToFile } = require("./utils");
const logger = require("./logger");

const inputJson = require("../input.json");

async function init() {
  try {
    // dependencies
    const dependencies = Object.keys(inputJson.dependencies);
    const devDependencies = Object.keys(inputJson.devDependencies);

    const dependenciesResp = await Promise.all(dependencies.map(getMetaData));
    const devDependenciesResp = await Promise.all(devDependencies.map(getMetaData));
    const output = [...dependenciesResp, ...devDependenciesResp]
    .filter((data) => data != null)
    .map(getDependencyMD);

    await writeToFile("PACKAGES.md", output.join('\n'));
  } catch (error) {
    logger.error(error);
  }
}

init();
