const fs = require("fs");

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

module.exports = {
  writeToFile,
};
