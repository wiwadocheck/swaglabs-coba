import Main from '../POM/main.js'

let checkURL

describe('Swag Labs', () => {
  beforeEach(async () => {
    await browser.url('https://www.saucedemo.com/')
    await browser.maximizeWindow()
    //Screenshot login
    await browser.saveScreenshot('test/SS/1-login.png')
  })

  it('can log in', async () => {
    await Main.submitLogin('standard_user', 'secret_sauce')
    checkURL = `https://www.saucedemo.com/inventory.html`
    expect(await browser.getUrl()).toEqual(checkURL) // check currently URL
    //Screenshot after login
    await browser.saveScreenshot('test/SS/2-after-login.png')
  })

  it('can sort products by highest price', async () => {
    await Main.submitLogin('standard_user', 'secret_sauce')
    await Main.checkDefaultFilter('Name (A to Z)') // checking default filter - > Name (A to Z)
    await Main.selectFilterOption(3) // filter to -> Price (high to low)
    await Main.checkDefaultFilter('Price (high to low)') // checking filter after select
    await browser.pause(1000)
    //Screenshot filter high to low
    await browser.saveScreenshot('test/SS/3-filter-high-to-low.png')
  })

  it('checking how much list product highest price', async () => {
    await Main.submitLogin('standard_user', 'secret_sauce')
    await Main.selectFilterOption(3) // filter to -> Price (high to low)
    await Main.checkDefaultFilter('Price (high to low)') // checking filter after select
    // checking list product in homepage
    await Main.checkListProduct(6)
    await browser.pause(1000)
    //Screenshot login
    await browser.saveScreenshot('test/SS/4-how-much-list-prod.png')
  })

  it('Select and open first result. Verify the details (Product Name & Price)', async () => {
    await Main.submitLogin('standard_user', 'secret_sauce')
    await Main.selectFilterOption(3)
    await Main.checkDefaultFilter('Price (high to low)')
    await $('//*[text()="Sauce Labs Backpack"]').click() // click first product
    await browser.pause(1000)

    checkURL = `https://www.saucedemo.com/inventory-item.html?id=4`
    expect(await browser.getUrl()).toEqual(checkURL) // checking url

    await Main.checkDetailProduct('Sauce Labs Backpack', '$29.99')
  })

  it('Buy the product ', async () => {
    await Main.submitLogin('standard_user', 'secret_sauce')
    await Main.selectFilterOption(3)
    await Main.checkDefaultFilter('Price (high to low)')
    await $('//*[text()="Sauce Labs Backpack"]').click() // click first product
    checkURL = `https://www.saucedemo.com/inventory-item.html?id=4`
    expect(await browser.getUrl()).toEqual(checkURL) // checking url
  })

  it('Verify and enter the required details on Checkout page.', async () => {
    await Main.submitLogin('standard_user', 'secret_sauce')
    await Main.selectFilterOption(3)
    await Main.checkDefaultFilter('Price (high to low)')
    await $('//*[text()="Sauce Labs Backpack"]').click() // click first product
    checkURL = `https://www.saucedemo.com/inventory-item.html?id=4`
    expect(await browser.getUrl()).toEqual(checkURL) // checking url

    // buy the product
    await Main.btnAddCart.click()
    await browser.pause(1000) // waiting for click to complete
    await expect(Main.btnAddCart).not.toBeExisting()

    await Main.shoppingCart.click()
    checkURL = `https://www.saucedemo.com/cart.html`
    expect(await browser.getUrl()).toEqual(checkURL) // check currently URL

    //contune shopping for add 1 cart again
    await $('[data-test="continue-shopping"]').click()
    await Main.checkDefaultFilter('Price (high to low)')
    await $('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click() // add cart 1 again
    await Main.shoppingCart.click()
    await browser.pause(1000) // waiting for click to complete

    // make sure cart has 2 product
    const cartItem = await $$('.cart_item')
    expect(cartItem).toHaveLength(2)
    await browser.pause(1000)

    //Screenshot has 2 product to cart
    await browser.saveScreenshot('test/SS/5-cart_item.png')

    // user checkout step -1
    await $('[data-test="checkout"]').click()
    checkURL = `https://www.saucedemo.com/checkout-step-one.html`
    expect(await browser.getUrl()).toEqual(checkURL) // check currently URL
    await browser.pause(1000)

    //Screenshot check your information
    await browser.saveScreenshot('test/SS/6-check-your-information.png')

    // filled checkout information
    await Main.submitCheckout('wira', 'wardhana', 4091)
    await browser.pause(1000)
    //Screenshot after fill information
    await browser.saveScreenshot('test/SS/7-checkout-overview.png')

    // user checkout step -2
    checkURL = 'https://www.saucedemo.com/checkout-step-two.html'
    expect(await browser.getUrl()).toEqual(checkURL) // check currently URL

    // user click finish
    $('[data-test="finish"]').click()

    const checkListImg = await $('#checkout_complete_container img')
    const checkTitle = await $('#checkout_complete_container h2').getText()
    const checkCompleteText = await $(
      '#checkout_complete_container .complete-text'
    ).getText()
    expect(checkListImg).toBeExisting
    expect(checkTitle).toEqual('Thank you for your order!')
    expect(checkCompleteText).toEqual(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    )

    //Screenshot complete
    await browser.saveScreenshot('test/SS/8-complete.png')
  })
})
