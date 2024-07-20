const { execFile } = require("child_process");
const path = require("path");
const os = require("os");

let pdftocairoPath;

if (os.platform() === 'win32') {
  console.log(path.join(process.cwd(),'poppler-bin','bin','pdftocairo.exe'))
  pdftocairoPath = path.join(process.cwd(),'poppler-bin','bin','pdftocairo.exe');
  console.log(`pdftocairoPath: ${pdftocairoPath}`);
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
