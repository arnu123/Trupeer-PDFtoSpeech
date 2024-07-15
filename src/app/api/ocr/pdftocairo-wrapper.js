const { execFile } = require("child_process");
const path = require("path");
const os = require("os");

let pdftocairoPath;

if (os.platform() === 'win32') {
  pdftocairoPath = process.env.PDFTOCAIRO_PATH|| path.normalize("C:/poppler/poppler-0.68.0/bin/pdftocairo.exe");
} else if (os.platform() === 'darwin') {
  pdftocairoPath = process.env.PDFTOCAIRO_PATH || path.normalize("/opt/homebrew/bin/pdftocairo");
} else if (os.platform() === 'linux') {
  pdftocairoPath = process.env.PDFTOCAIRO_PATH || '/usr/bin/pdftocairo'; // Example path for Linux
} else {
  throw new Error('Unsupported platform');
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
