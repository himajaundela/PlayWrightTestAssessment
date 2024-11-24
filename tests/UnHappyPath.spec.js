const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {

    await page.goto('https://staging.meandem.vercel.app/palazzo-pant-black');

    await expect(page).toHaveTitle(/Palazzo Pant/);

    await page.waitForSelector('button#onetrust-accept-btn-handler'); 
    await page.click('button#onetrust-accept-btn-handler');

    
    await page.click('[data-testid="size-select-button-dropdown"]'); 
    
    
    
    const option = page.locator('div[role="option"]:has-text("UK 14")');
    await option.click();
    await page.waitForTimeout(1000);
    
    const buttons = page.locator('xpath=//span[contains(text(), "Add to Bag")]');
    await buttons.click();

    await page.click('xpath=//span[contains(text(), "Review Bag and Checkout")]')

    await page.click('div[id*=basket-summary]>a[aria-label="Checkout"]')

    await page.click('xpath=//span[contains(text(), "Continue as guest")]')

    const wrongEmailID = () => `user${Math.floor(Math.random() * 10000)}@example@com`;
    const randomWrongEmail = wrongEmailID();

    await page.locator('[type="email"]').fill(randomWrongEmail);

    await page.click('xpath=//span[contains(text(), "Continue to Delivery")]')

    const element = page.locator('span[id*=error-email]');
    await expect(element).toContainText('Invalid email address');
});