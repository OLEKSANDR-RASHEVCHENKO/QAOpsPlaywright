const base = require('@playwright/test');
const { ApiUtils } = require('./ApiUtils');
const loginPayload = { userEmail: "rashevchenkoo@gmail.com", userPassword: "Gazmanov1234" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const { request, expect } = require("@playwright/test");

exports.customTest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {

            const context = await browser.newContext();
            const page = await context.newPage();

            const userName = page.locator("#userEmail")
            const password = page.locator("#userPassword")
            const title = page.locator(".card-body b ")

            await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
            await expect(page).toHaveTitle("Let's Shop");
            await userName.fill("rashevchenkoo@gmail.com")
            await password.fill("Gazmanov1234");
            await page.locator("#login").click();
            await use(page);

            //tear down
            await context.close();
        },


        createOrder: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new ApiUtils(apiContext, loginPayload);
            const responce = await apiUtils.createOrder(orderPayLoad);
            await use(responce);
            await apiContext.dispose();
        }
        ,

        testDataForOrder: {
            productName: 'ADIDAS ORIGINAL'
        }
    }
);