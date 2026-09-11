const{test, expect,request} = require("@playwright/test");
const {ApiUtils} = require('../utils/ApiUtils');
const { verify } = require("node:crypto");
const loginPayload = {userEmail: "rashevchenkoo@gmail.com", userPassword: "Gazmanov1234"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let responce;
test.beforeAll( async()=>
{
    
const apiContext = await request.newContext();
const apiUtils = new ApiUtils(apiContext, loginPayload);
responce = await apiUtils.createOrder(orderPayLoad);

});




test("@Api Client App login" , async({page}) =>
{
    const title = page.locator(".card-body b ")
   
    //Api login
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);

    }, responce.token);
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await title.first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows= await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (responce.orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
    const orderIDDetailPage = await page.locator(".col-text").textContent();
    expect(responce.orderId.includes(orderIDDetailPage)).toBeTruthy();

});
 

