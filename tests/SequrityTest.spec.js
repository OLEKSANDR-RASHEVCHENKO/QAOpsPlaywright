
const { test, expect } = require("@playwright/test");
const { url } = require("node:inspector");


test("Security test request intercept", async ({page}) => {


    const userName = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const title = page.locator(".card-body b ")
    const products = page.locator(".card-body")
    const productName = "ZARA COAT 3"


    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await expect(page).toHaveTitle("Let's Shop");
    await userName.fill("rashevchenkoo@gmail.com")
    await password.fill("Gazmanov1234");
    await page.locator("#login").click();
    //console.log(await title.first().textContent());
    //await page.waitForLoadState("networkidle");
    //if this dont funk , use this
    await title.first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a96ff1121054ba4650444a2'
        })

    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order")



})