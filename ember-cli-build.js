'use strict';
const { join } = require('path');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const isProduction = true;//EmberApp.env() === 'production';

const purgeCSS = {
  module: require('@fullhuman/postcss-purgecss'),
  options: {
    content: [
      // add extra paths here for components/controllers which include tailwind classes
      join(__dirname, 'app', '**', '*.html'),
      join(__dirname, 'app', '**', '*.hbs')
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
  }
}

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-power-select': {
      theme: false
    },
    postcssOptions: {
      compile: {
        plugins: [
          {
            module: require('postcss-import'),
            options: {
              path: ['node_modules']
            }
          },
          require('tailwindcss')('./config/tailwind.config.js'),
          ...isProduction ? [purgeCSS] : []
        ]
      }
    }
  });

  return app.toTree();
};
