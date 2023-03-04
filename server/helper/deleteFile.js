const fs = require("fs");
const path = require("path");

const deleteFile = (filename) => {
  fs.unlink(
    path.join(__dirname, "..", "..", "/client", "/upload", `/${filename}`),
    function (err) {
      console.log(err);
    }
  );
};
module.exports = deleteFile;
