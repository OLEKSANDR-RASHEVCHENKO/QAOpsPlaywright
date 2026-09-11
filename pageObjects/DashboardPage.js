const { expect } = require("@playwright/test");
class DashboardPage{

constructor(page){
this.products = page.locator(".card-body");
this.productsText = page.locator(".card-body b ");
this.cart = page.locator("[routerlink*='cart']");
this.orders = page.locator("button[routerlink*='myorders']");
}

async searchProductAddCard(productName){

        //if this dont funk , use this
        await this.productsText.first().waitFor();
        const allTitles = await this.productsText.allTextContents()
        console.log(allTitles)
        const coutn =  await this.products.count();
        expect(typeof coutn).toBe("number");
        expect(coutn).toBeGreaterThan(0)
        for(let i = 0;i<coutn;++i)
        {
           if(await this.products.nth(i).locator("b").textContent() == productName)
        {
            //add product to card
            await this.products.nth(i).locator("text= Add To Cart").click();
            break;
    
        }
        }
}
async navigateToCart(){
    await this.cart.click();
}
async navigateToOrders()
{
    await this.orders.click();
}

}
module.exports={DashboardPage};