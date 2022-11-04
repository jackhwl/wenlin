module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  globals: {
    'jest-preset-angular/global-setup': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  projects: [
    '<rootDir>/apps/wenlin-site-app',
    '<rootDir>/libs/root/environments',
    '<rootDir>/libs/co2/data-access',
    '<rootDir>/libs/co2/util-date-times',
    '<rootDir>/libs/co2/feature-forecast',
    '<rootDir>/libs/co2/domain',
  ],
};
