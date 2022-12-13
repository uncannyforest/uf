const fs = require('fs');
const path = require('path')
const yaml = require('js-yaml');

const ufLoader = require('../lib/ufLoader');

const loadConfig = (name) => {
  const configPath = path.join(__dirname, '..', 'config', `${name}.yaml`);
  const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
  return config;
}

module.exports = {
  uncannyforest: ufLoader(loadConfig('uncannyforest')),
  about: loadConfig('about')
}
