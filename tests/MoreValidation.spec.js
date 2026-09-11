const {test, expect} = require("@playwright/test");

test("@Web Popup Validation", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://google.com");
    //await page.goBack();
    //await page.goForward();
    //await page.goBack();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.pause();
    page.on("dialog",dialog => dialog.accept());//close One Popup
    await page.locator("#confirmbtn").click(); // popup will be opend and closed
    await page.locator("#mousehover").hover();

    //iframe
    const frameLocator =  page.frameLocator("#courses-iframe");
    await frameLocator.locator("li a[href*='lifetime-access']:visible").click();
    const textChek= await frameLocator.locator("div.text h2").textContent();
    console.log(textChek.split(" ")[1]);
    

})

test("@Web Screenshot and Visual comparision", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'Screen.png'})
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'})
    await expect(page.locator("#displayed-text")).toBeHidden();

});

//Visual testing

//Screenshot - store ->screenshot
test("VisualTesting", async({page})=>
{
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png')


});

