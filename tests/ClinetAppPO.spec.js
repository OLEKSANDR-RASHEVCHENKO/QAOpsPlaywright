const { test, expect } = require("@playwright/test");
const { customtest} = require("../utils/test-base");

const { POManager } = require("../pageObjects/POManager");
//JSON->string->js objekt
//Parametrize with Json
const dataSet =  JSON.parse( JSON.stringify(require("../utils/PlaceOrderTestData.json")));
//test.describe.configure({mode:"parallel"});//parallel ausführung 
//test.describe.configure({mode:"serial"});//nacheinander laufen
for(const data of dataSet )
{
test(`@Web Client App login ${data.productname}`, async ({ page }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCard(data.productname);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productname);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();



});
}


//Parametrize with fixture

customtest(`@Web Client App login `, async ({ page,testDataForOrder}) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCard(testDataForOrder.productname);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productname);
    await cartPage.Checkout();

});




