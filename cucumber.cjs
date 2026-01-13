const common = [
  'tests/scenarios/**/*.feature',
  '--require-module ts-node/register',
  '--require tests/**/*.ts',
  // '--require tests/*.ts',
  '--format json:reports/cucumber-report.json',
].join(' ')

module.exports = {
  default: common,
}
