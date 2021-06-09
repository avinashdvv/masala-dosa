/*
  readme is remove due, it is giving lot of information
*/

function getRepositoryMDX(url) {
  if (!url) return "";
  return `[Github](${url})`;
}

function getHomePageMDX(url = "") {
  return `[Homepage](${url})`;
}

function getTag(tags) {
  return tags.map((_tag) => {
    const tag = _tag.replace(" ", "");
    return `[${tag}](https://github.com/topics/${tag.replace(" ", "")}) `;
  });
}

module.exports = {
  name: (data) => `## ${data}`.trim(),
  description: (data) => `${data}`,
  keywords: (data) => (data ? `Tags: ${getTag(data)}`.trim() : ""),
  repository: getRepositoryMDX,
  homepage: getHomePageMDX,
};
