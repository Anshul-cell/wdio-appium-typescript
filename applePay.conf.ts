exports.config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO supports running e2e tests as well as unit and component tests.
  tsConfigPath: './tsconfig.json',
  user: "*****",
  key: "********",
  
  service: ['lambdatest'],
  specs: ['test/specs/applePay.e2e.ts'],
  exclude: [],
  logLevel: "debug",
  
  capabilities: [{
  "lt:options": {
		"w3c": true,
    "build": "Apple Pay -webdriver IO",
		"platformName": "ios",
    'username': "****",
  'key': "*********************",
		//"deviceName": "iPhone 15",
		//"platformVersion": "17",
		"network": true,
		"isRealMobile": true,
		"console": true,
    "queueTimeout": 900,
    "idleTimeout": 900,
    "privateCloud": true,
    
    // privateCloud: false,
   "applePay": true,
    // applePay: false,
   "passcode": "123456",
   "applePayCardType": ["visa", "amex"],
    //"app": "lt://APP1016053901739969674533312" // upload app and enter the url
	}}],
  reporters: [
    "spec"
],
 // logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "https://mobile-hub.lambdatest.com",
  waitforTimeout: 1500000,
  connectionRetryTimeout: 1500000,
  connectionRetryCount: 1,
  path: "/wd/hub",
  hostname: "@mobile-hub.lambdatest.com",
  port: 80,

  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 1500000,
  },
};
