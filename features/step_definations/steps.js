const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require("../../pageObjects/POManager");
const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);

});

When('Add {string} to Cart', { timeout: 100 * 1000 }, async function (productname) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCard(productname);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', { timeout: 100 * 1000 }, async function (productname) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productname);
    await cartPage.Checkout();
});

When('Enter valid details and Place the Order', { timeout: 100 * 1000 }, async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify order is present in the Orderhistory', { timeout: 100 * 1000 }, async function () {
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});


Given('a login to Ecommerce2 application with {string} and {string}', async function (userNames, passWords) {
    const userName = this.page.locator('#username');
    const passWord = this.page.locator('#password');
    const signIn = this.page.locator('#signInBtn');
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await userName.fill(userNames);
    await passWord.fill(passWords);
    await signIn.click();
});

Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator('[style*="block"]').textContent());
    await expect(await this.page.locator('[style*="block"]')).toContainText("Incorrect username/password.");
});
