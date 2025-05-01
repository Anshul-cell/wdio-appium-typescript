export const config = {
  tsConfigPath: './tsconfig.json',
  user: "****",
  key: "*************************************",

  updateJob: false,
  specs: ['test/specs/*.ts'],
  exclude: [],
  logLevel: "trace",

  capabilities: [{
    "lt:options": {
      w3c: true,
      build: "Build",
      platformName: "android",
      deviceName: "Galaxy S24",
      platformVersion: "14",
      network: true,
      name: '', // Will be set in beforeSession
      isRealMobile: true,
      console: true,
      app: "lt://APP10160591071744125202281817"
    }
  }],

  reporters: [
    "spec"
  ],

  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "https://mobile-hub.lambdatest.com",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  path: "/wd/hub",
  hostname: "@mobile-hub.lambdatest.com",
  port: 80,

  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 20000,
  },
  beforeSession: function (_config: any, capabilities: any, specs: any) {
    const specFileName = specs[0]?.split('/').pop()?.replace('.ts', '') || 'Unnamed Test';
    const testName = process.env.TEST_NAME || `test_name [${specFileName}]`;
  
    if (capabilities['lt:options']) {
      (capabilities['lt:options'] as any).name = testName;
    }
  }
};
