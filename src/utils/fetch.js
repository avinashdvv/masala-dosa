const fetch = require("node-fetch");

const gitFetch = async (url) => {
  const GIT_TOKEN = process.env.GIT_TOKEN;

  if (!GIT_TOKEN) return fetch(url);

  return fetch(url, {
    headers: {
      authorization: `token ${process.env.GIT_TOKEN}`,
    },
  });
};

module.exports = {
  gitFetch,
};
