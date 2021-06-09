/*
  readme is remove due, it is giving lot of information
*/

function getRepositoryMDX(url) {
  if (!url) return '';
  return `[Github](${url})`;
}

function getHomePageMDX(url = '') {
  return `[Homepage](${url})`;
}

module.exports = {
  name: data => `# ${data}`.trim(),
  keywords: data => data ? `### ${data}`.trim() : '',
  description: data => `## ${data}`,
  repository: getRepositoryMDX,
  homepage: getHomePageMDX,
}
