module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((@)?react-native|@react-native-async-storage|@react-native-community|@react-navigation|react-native-image-picker|react-native-linear-gradient)/)',
  ],
};
