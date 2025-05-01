exports.config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO supports running e2e tests as well as unit and component tests.
  tsConfigPath: './tsconfig.json',
  //user: "add username",
  //key: "add access key",
  
  updateJob: false,
  specs: ["test/specs/androidtest.ts"],
  exclude: [],
  logLevel: "trace",
  
  capabilities: [{
  "lt:options": {
		"w3c": true,
    "build": "LT_Appium_NodeJS_WebDriverIO_Typescript",
		"platformName": "android",
		"deviceName": "Galaxy S24",
		"platformVersion": "14",
		"network": true,
		"isRealMobile": true,
		"console": true,
   // "app": "lt://APP10160522181740941665026142"
	}}],
  reporters: [
    "spec"
],
 // logLevel: "info",
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
};
