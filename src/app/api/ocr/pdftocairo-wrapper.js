const { execFile } = require("child_process");
const path = require("path");
const os = require("os");

let pdftocairoPath;

if (os.platform() === "win32") {
  pdftocairoPath = "C:/poppler/poppler-0.68.0/bin/pdftocairo.exe";
}else if (os.platform()==="darwin"){
  pdftocairoPath = "/opt/homebrew/bin/pdftocairo";
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
