const fs = require("fs");
const RegClient = require("npm-registry-client");
const logger = require("./logger");
const plugins = require("./plugins");
const { gitFetch } = require("./utils");

const client = new RegClient();
const params = { timeout: 5000 };

const getMetaData = (dependency) => {
  const isBlockedDependency = filterDependencies(dependency);
  if (isBlockedDependency) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const registryUrl = `https://registry.npmjs.org/${dependency}`;
    client.get(registryUrl, params, async function (error, data, raw, res) {
      if (error) {
        reject(error);

        return;
      }

      // id, _rev, name, description, dist-tags, versions, readme, maintainers, time, author, license, readmeFilename, repository, homepage, bugs, users, _etag, _lastModified
      const gitURL = data.repository.url
        .replace("git+", "")
        .replace(".git", "")
        .replace("git:", "https:")
        .replace("ssh", "https");

      try {
        const gitAPIURL = gitURL
          .replace("github.com", "api.github.com/repos")
          .replace("git@github", "api.github");
        const gitRes = await gitFetch(gitAPIURL).then(safeParseJSON);

        const successData = {
          name: data.name,
          keywords: data.keywords,
          description: data.description || gitRes.description,
          repository: gitRes.html_url,
          homepage: data.homepage,
        };

        resolve(successData);
      } catch (error) {
        reject(error);
        logger.error(error);
      }
    });
  });
};

function filterDependencies(dependency) {
  //TODO: Get these keys form the developer
  const blockedDependencyKeysList = ["@razorpay", "@universe"];

  for (const blockedDependencyKey of blockedDependencyKeysList) {
    if (dependency.includes(blockedDependencyKey)) {
      return true;
    }
  }

  return false;
}

function getDependencyMD({
  name,
  keywords,
  description,
  repository,
  homepage,
  bugs,
}) {
  // Writing join is intentional to disable the few plugins
  return [
    plugins.name(name),
    plugins.description(description),
    plugins.keywords(keywords),
    plugins.repository(repository),
    plugins.homepage(homepage),
    "\n \n",
  ].join("\n");
}


async function safeParseJSON(response) {
  const body = await response.text();
  try {
      return JSON.parse(body);
  } catch (err) {
      return { };
  }
}

module.exports = {
  getMetaData,
  getDependencyMD,
};
