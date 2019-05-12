// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./shipitfile.config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require('deepmerge');

module.exports = shipit => {
  require('shipit-deploy')(shipit);
  require('shipit-npm')(shipit);

  shipit.initConfig(
    merge(config, {
      default: {
        keepReleases: 5,
        npm: {
          remote: true
        },
        branch: 'master',
        deleteOnRollback: true
      }
    })
  );

  shipit.on('deploy', () => {
    shipit.on('npm_installed', async () => {
      await shipit.copyToRemote(
        `.env.${shipit.environment}`,
        `${shipit.releasePath}/.env`
      );

      await shipit.remote(`cd ${shipit.releasePath} && npm run ssr:build`);
      await shipit.remote(
        `cd ${shipit.config.deployTo}/current && pm2 startOrRestart --env ${
          shipit.environment
        } ecosystem.config.js`
      );
    });
  });
};
