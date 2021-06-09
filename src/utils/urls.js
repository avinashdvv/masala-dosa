const getPackageURL = (url) =>
  url
    .replace("git+", "")
    .replace(".git", "")
    .replace("git:", "https:")
    .replace("ssh", "https");


const getGitURL = (url) =>
  url
    .replace("github.com", "api.github.com/repos")
    .replace("git@github", "api.github");

module.exports = {
  getPackageURL,
  getGitURL,
};
