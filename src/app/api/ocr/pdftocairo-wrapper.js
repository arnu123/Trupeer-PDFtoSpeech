const { execFile } = require("child_process");
const path = require("path");
const os = require("os");

let pdftocairoPath;

if (os.platform() === 'win32') {
  pdftocairoPath = path.normalize("src/app/api/ocr/pdftocairo.exe");
} else if (os.platform() === 'darwin') {
  pdftocairoPath = path.normalize("/opt/homebrew/bin/pdftocairo");
}

module.exports = (args, callback) => {
  execFile(
    pdftocairoPath,
    args,
    { cwd: process.cwd() },
    (error, stdout, stderr) => {
      if (error) {
        return callback(error, stderr);
      }
      callback(null, stdout);
    }
  );
};
