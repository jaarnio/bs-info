const path = require("path");

module.exports = {
  target: "node", // This ensures compatibility with Node.js
  entry: "./index.js", // Replace with your script's filename
  output: {
    filename: "bs-info-server.js",
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  externals: {
    "@brightsign/deviceinfo": "commonjs @brightsign/deviceinfo",
    "@brightsign/registry": "commonjs @brightsign/registry",
    "@brightsign/videomodeconfiguration": "commonjs @brightsign/videomodeconfiguration",
  },
};
