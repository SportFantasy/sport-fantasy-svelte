const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  }, {
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: [
      'file-loader',
    ],
  });

  config.resolve = {
    alias: {
      ['./images']: path.resolve(__dirname, '../public/images'),
    }
  }

  // Return the altered config
  return config;
};
