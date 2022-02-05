module.exports = {
  apps: [
    {
      name: 'server',
      script: './node_modules/.bin/ts-node',
      args: './src/server.ts',
      watch: true,
      ignore_watch: ['node_modules', 'ormlogs.log'],
    },
  ],
};
