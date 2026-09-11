const playwright = require("@playwright/test");
const { POManager } = require("../../pageObjects/POManager");
const { Before, After,BeforeStep,AfterStep,Status} = require('@cucumber/cucumber');
const path = require("node:path");

Before(async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

BeforeStep({ tags: "@foo" }, function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});


AfterStep(async function ({result}) {        // если какой то степ упадет то сделается скриншот 
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: "screenshot1.png" });
    }
});

After(async function () {
    console.log("I am last to execute")
    await this.context?.close();
    await this.browser?.close();

});