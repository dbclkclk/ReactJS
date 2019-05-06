const {defaults} = require('jest-config');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['tsx','ts', ...defaults.moduleFileExtensions],
  testEnvironment: 'jsdom'
};