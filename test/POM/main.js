class Main {
  /**
   * Login Component
   */

  // Getters for login elements
  get usernameInput() {
    return $('[data-test="username"]')
  }

  get passwordInput() {
    return $('[data-test="password"]')
  }

  get loginButton() {
    return $('[data-test="login-button"]')
  }

  get filterDropdown() {
    return $('[data-test="product_sort_container"]')
  }

  get listProducts() {
    return $$('.inventory_item')
  }

  get activeFilterOption() {
    return $('.active_option')
  }

  get shoppingCart() {
    return $('#shopping_cart_container')
  }

  get btnAddCart() {
    return $('[data-test="add-to-cart-sauce-labs-backpack"]')
  }

  get btnContinueCheckout() {
    return $('[data-test="continue"]')
  }

  /**
   * Checkout Input
   */
  get checkOutFirstName() {
    return $('[data-test="firstName"]')
  }

  get checkOutLastName() {
    return $('[data-test="lastName"]')
  }

  get checkOutZip() {
    return $('[data-test="postalCode"]')
  }

  /**
   * detail product
   */

  get detailImg() {
    return $('.inventory_details_img_container > img')
  }

  get detailTitle() {
    return $('.inventory_details_name.large_size')
  }

  get detailPrice() {
    return $('.inventory_details_price')
  }

  /**
   * Logs in to the app with the given username and password
   * @param {string} username
   * @param {string} password
   */
  async submitLogin(username, password) {
    try {
      await this.usernameInput.waitForExist()
      await this.usernameInput.setValue(username)
      await this.passwordInput.waitForExist()
      await this.passwordInput.setValue(password)
      await this.loginButton.waitForExist()
      await this.loginButton.click()
    } catch (error) {
      console.error(`Error logging in: ${error.message}`)
    }
  }

  async submitCheckout(firstName, lastName, ZipCode) {
    try {
      await this.checkOutFirstName.waitForExist()
      await this.checkOutFirstName.setValue(firstName)
      await this.checkOutLastName.waitForExist()
      await this.checkOutLastName.setValue(lastName)
      await this.checkOutZip.waitForExist()
      await this.checkOutZip.setValue(ZipCode)
      await this.btnContinueCheckout.click()
    } catch (error) {
      console.error(`Error logging in: ${error.message}`)
    }
  }

  /**
   * Assertion - defaultFilter
   */
  async checkDefaultFilter(option) {
    try {
      const filterFirst = await this.activeFilterOption.getText()
      expect(filterFirst).toEqual(option)
    } catch (error) {
      console.error(`Error default Filter ${option} ${error.message}`)
    }
  }

  /**
   * Selects the filter option at the given index
   * @param {number} index
   */
  async selectFilterOption(index) {
    try {
      await this.filterDropdown.waitForExist()
      await this.filterDropdown.selectByIndex(index)
      console.log(`Selected option at index ${index}`)
    } catch (error) {
      console.error(
        `Error selecting option at index ${index}: ${error.message}`
      )
    }
  }
  /**
   * Give how much product high to low on dashboard
   * @param {number} values
   */
  async checkListProduct(values) {
    try {
      const products = await this.listProducts
      expect(products).toHaveLength(values)
    } catch (error) {
      console.error(`Error ${values} : ${error.message}`)
    }
  }

  /**
   * Checking detail product
   */
  async checkDetailProduct(title, price, addCart) {
    try {
      const titleProduct = await this.detailTitle.getText()
      const priceProduct = await this.detailPrice.getText()
      expect(titleProduct).toEqual(title)
      expect(priceProduct).toEqual(price)
    } catch (error) {
      console.error(
        `Error check detail title:${title} | price:${price} , error : ${error.message}`
      )
    }
  }
}

export default new Main()
