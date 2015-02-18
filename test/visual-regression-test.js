var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder()
	.withCapabilities(webdriver.Capabilities.chrome())
	.build();

var Eyes = require('eyes.selenium').Eyes;
var eyes = new Eyes();
eyes.setApiKey("VnETsLlJTfrLBNQZaJuQNlKOC107dnF7XaCcJQlDz2n8U110");

eyes.open(driver, "JavaScript SDK", "Simple JS SDK Test")
	.then(function(driver) {
		driver.get('http://www.google.com');
		eyes.checkWindow("Google");
		driver.get('http://www.nba.com');
		eyes.checkWindow("NBA");
		driver.quit();
		eyes.close();
	});
