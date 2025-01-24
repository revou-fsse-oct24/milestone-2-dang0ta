import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './src'
})

const config = {  
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: 'jsdom',
};

export default createJestConfig(config);
