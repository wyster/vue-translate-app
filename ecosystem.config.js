'use strict';

/*eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const currentPath = path.join(path.dirname(fs.realpathSync(__filename)));
const process = require('process');
process.chdir(currentPath);
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'vue-translate-app',
      script: 'npm',
      args: `run ssr:serve -- --port=${process.env.PORT}`
    }
  ]
};
