const fs = require('fs');
const path = require('path')
const yaml = require('js-yaml');

const load = (name) => {
  const configPath = path.join(__dirname, '..', '..', 'config', `${name}.yaml`);
  const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
  return config;
}

// returns midnight in America/Denver
const correctDate = (yamlDate) => {
  return new Date(yamlDate.toLocaleDateString('en-US', { timeZone: 'America/Denver', timeZoneName: 'short' } ));
}

module.exports = { load, correctDate };
