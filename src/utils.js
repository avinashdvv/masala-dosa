const fs = require("fs");
const fetch = require("node-fetch");
const secret = require("../secrets");
const logger = require("./logger");

const writeToFile = (fileName, fileData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, fileData, (err) => {
      if (err) {
        reject(err);
        return;
      }

      // TODO: rethink about what data need to send in resolve
      resolve("success");
    });
  });
};

const gitFetch = async (url) => {
  return fetch(url, {
    headers: {
      authorization: `token ${secret.GIT_TOKEN}`,
    },
  });
};

module.exports = {
  writeToFile,
  gitFetch,
};
