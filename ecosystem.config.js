'use strict';

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
