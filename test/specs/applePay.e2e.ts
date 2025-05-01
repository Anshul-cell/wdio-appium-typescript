describe('Apple Pay Checkout Flow', () => {
  it('should complete Apple Pay checkout as guest user', async () => {
    await browser.url('https://beta.dunqa.io/product/pack-of-6-duck-splats-1000016854?defaultSkuId=30085021');
    await browser.pause(4000);
    // Accept cookies
    try {
      const cookie = await $('#onetrust-accept-btn-handler');
      if (await cookie.isDisplayed()) await cookie.click();
    } catch { console.log('No cookie banner'); }

    // Close popups if present
    const popupSelectors = [
      '[data-testid="email-popup-close-area"]',
      '#header-root dialog div button'
    ];
    for (const selector of popupSelectors) {
      try {
        const el = await $(selector);
        if (await el.isDisplayed()) await el.click();
      } catch { /* ignore */ }
    }

    // Add to basket
    await browser.pause(5000);
    const addToBasket = await $('[data-testid="add-to-basket-container"] button.bg-brand');
    await addToBasket.waitForDisplayed({ timeout: 10000 });
    await addToBasket.click();
    await browser.pause(4000);

    // Go to basket
    const goToBasket = await $('//*[@id="root"]/main/div[2]/div[3]/div[4]/dialog/div[2]/a');
    await goToBasket.waitForDisplayed({ timeout: 10000 });
    await goToBasket.click();
    await browser.pause(4000);
    // Basket page
    await $('[data-testid="basket-page-title"]').waitForDisplayed({ timeout: 10000 });
    const checkoutBtn = await $('button[data-testid="basket-checkout-button"]:not([disabled])');
    await checkoutBtn.waitForDisplayed({ timeout: 10000 });
    await checkoutBtn.click();

    // Interstitial
    await browser.pause(5000);
    const guestCheckout = await $('#checkout-as-guest-button');
    await guestCheckout.waitForDisplayed({ timeout: 10000 });
    await guestCheckout.click();

    // Delivery page
    await browser.pause(7000);
    await $('[data-testid="checkout-page-title"]').waitForDisplayed({ timeout: 10000 });

    await $('[data-testid="manual-lookup-form"]').click();

    await $('#line1').setValue('Some random house');
    await $('#city').setValue('Leicester');
    await $('#postcode').setValue('LE1 1RE');
    await $('[data-testid="use-address-button"]').click();

    // Personal details
    await $('#firstName').setValue('Luke');
    await $('#lastName').setValue('Skywalker');
    await $('#mobile').setValue('0777777777');
    await $('#email').setValue('test@dunelm.com');

    await $('[data-testid="customer-delivery-details-button"]').click();

    // Payment page
    const paymentDetails = await $('[data-testid="payment-details"]');
    await paymentDetails.waitForDisplayed({ timeout: 10000 });

    // Apple Pay – Native interaction
    await browser.pause(2000);
    await browser.switchContext('NATIVE_APP');

    const applePayBtn = await $('//XCUIElementTypeButton[@name="Apple Pay"]');
    await applePayBtn.waitForDisplayed({ timeout: 10000 });
    await applePayBtn.click();

    //await browser.switchContext('WEBVIEW'); // Return to WebView context if needed
    await browser.pause(10000);
    // Simulate Apple Pay confirm
    await browser.execute('lambda-applepay', { confirm: true });
    await browser.pause(10000);
    await browser.keys('123456');
    await browser.pause(10000);

    await browser.execute('lambda-status=passed');
  });
});