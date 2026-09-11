//How to save session Storage and inject into new Browser context

//Login UI ->JSON.file

//test browser->, cart-,order,orderdetails,orderhistory

const{test, expect} = require("@playwright/test");
let webContext;

test.beforeAll(async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName  = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const title = page.locator(".card-body b ")

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await expect(page).toHaveTitle("Let's Shop");
    await userName.fill("rashevchenkoo@gmail.com")
    await password.fill("Gazmanov1234");
    await page.locator("#login").click();
    //await page.waitForLoadState("networkidle"); //if this dont funk , use that funktion down
    await title.first().waitFor(); 
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
})


test("@Web Client App login" , async() =>
{
    const page = await webContext.newPage();
    const title = page.locator(".card-body b ")
    const products = page.locator(".card-body")
    const productName = "ZARA COAT 3"
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const allTitles = await title.allTextContents()
    console.log(allTitles)
    //select Product name
    const coutn =  await products.count();
    //Chek if i forget to add await
    expect(typeof coutn).toBe("number");
    expect(coutn).toBeGreaterThan(0)
    for(let i = 0;i<coutn;++i)
    {
       if(await products.nth(i).locator("b").textContent() == productName)
    {
        //add product to card
        await products.nth(i).locator("text= Add To Cart").click();
        break;

    }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("Ind");
    //await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay: 150 });
    const dropdown = page.locator(".ta-results").first();
    await dropdown .waitFor();
    const optionsCount =  await dropdown .locator("button").count();
    for(let i=0;i<optionsCount;++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText("rashevchenkoo@gmail.com");
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID= await page.locator(".em-spacer-1 label").last().textContent();
    console.log(orderID);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows= await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderID.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
    const orderIDDetailPage = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIDDetailPage)).toBeTruthy();
});



test("@Web Client App login test 2" , async() =>
{
    const page = await webContext.newPage();
    const title = page.locator(".card-body b ")
    const products = page.locator(".card-body")
    const productName = "ZARA COAT 3"
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const allTitles = await title.allTextContents()
    console.log(allTitles)
    //select Product name
    const coutn =  await products.count();
})