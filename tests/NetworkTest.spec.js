const{test, expect,request} = require("@playwright/test");
const {ApiUtils} = require('../utils/ApiUtils');
const { verify } = require("node:crypto");
const loginPayload = {userEmail: "rashevchenkoo@gmail.com", userPassword: "Gazmanov1234"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let responce;
const faceresponse = {data:[],message:"No Orders"};
test.beforeAll( async()=>
{
    
const apiContext = await request.newContext();
const apiUtils = new ApiUtils(apiContext, loginPayload);
responce = await apiUtils.createOrder(orderPayLoad);

});




test("@Web Client App login" , async({page}) =>
{
    const title = page.locator(".card-body b ")
   
    //Api login
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);

    }, responce.token);
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    //NETWORT INTERCEPTING 
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/66c30932ae2afd4c0b51665c"
        ,async route=>
        {
            //intercepting response - Api response->{playwright faceresponse} ->browser->render data
            const responce = await page.request.fetch(route.request());
            let body = JSON.stringify(faceresponse);
            await route.fulfill(
                {
                    responce,
                    body,
                }
            )
        }
    );

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());

});
 

