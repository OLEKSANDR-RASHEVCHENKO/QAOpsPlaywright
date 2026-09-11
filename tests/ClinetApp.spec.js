const{test, expect} = require("@playwright/test");


test("@Web Client App login" , async({page}) =>
{
    const userName  = page.locator("#userEmail")
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





    
test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "rashevchenkoo@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Gazmanov1234");
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});