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

    const generateRandomEmail = () => `user${Math.floor(Math.random() * 10000)}@example3.com`;
    const randomEmail = generateRandomEmail();

    await page.locator('[type="email"]').fill(generateRandomEmail());

    //await page.waitForSelector('xpath=//span[contains(text(), "Continue to Delivery")]');

    await page.click('xpath=//span[contains(text(), "Continue to Delivery")]')

    await page.waitForTimeout(3000)
    await page.locator('input[name="firstName"]').fill('TestFirstname');
    await page.locator('input[name="lastName"]').fill('TestLastName');
    await page.locator('input[name="telephone"]').fill('07778399126');
    await page.locator('input[name="addressLine1"]').fill('Testaddress');
    await page.locator('input[name="postcode"]').fill('LU1 2QP');
    await page.locator('input[name="city"]').fill('LUTON');
    await page.locator('div[id*=address-form] button').waitFor({ timeout: 60000 }); // 60 seconds
    await page.click('div[id*=address-form] button');
    
    await page.waitForTimeout(3000)
    //await page.waitForSelector('[id*=checkout-address] button[type="button"]');
    await page.click('[id*=checkout-address] button[type="button"]')

    await page.waitForTimeout(3000)
    await page.click('div[id*=delivery-options] button[aria-disabled="false"]')

    
    const iframe = page.frameLocator('iframe#braintree-hosted-field-number');
    await iframe.locator('#credit-card-number').fill('1234 5678 9876 5432');

    
    const iframeExipiration=page.frameLocator('iframe#braintree-hosted-field-expirationDate')
    await iframeExipiration.locator('#expiration').fill('122027')

    
    const iframeCvv=page.frameLocator('iframe#braintree-hosted-field-cvv')
    await iframeCvv.locator('#cvv').fill('333')

    const iframecardholderName=page.frameLocator('iframe#braintree-hosted-field-cardholderName')
    await iframecardholderName.locator('#cardholder-name').fill('testName')
    
    
    const iframepostalCode=page.frameLocator('iframe#braintree-hosted-field-postalCode')
    await iframepostalCode.locator('#postal-code').fill('LU12QP')
    




});