module.exports = function Cart(initItems) {
  //it gets the old if one exsist if not it creates an empty object
  this.items = initItems || []

  // adds a new item to the cart and checks if the item already is in the cart
  this.add = function(item) {
    // console.log('ITEM', item.dataValues)
    // console.log('PRODUCT ID', id)
    // let storedItem = this.items[id]
    this.items.push({...item.dataValues, amount: 1})
    // if (!storedItem) {
    //   storedItem = this.items[id] = item
    // }
    // TODO: update existing items in cart
    // storedItem.qty++;
    // storedItem.price = storedItem.item.price * storedItem.qty;
    // this.totalQty++;
    // this.totalPrice += storedItem.item.price;
    return {...item.dataValues, amount: 1}
  }

  this.remove = function(id) {
    const idx = this.items.findIndex(item => {
      if (item.id === Number(id)) {
        return true
      }
    })
    this.items.splice(idx, 1)
  }

  this.updateAmount = function(id, newAmount) {
    const idx = this.items.findIndex(item => {
      if (item.id === Number(id)) {
        return true
      }
    })
    this.items[idx].amount = newAmount
  }

  // this.update = function(item, id){

  // }
  this.getCart = function() {
    return this.items
  }

  // helper function that returns the cart items as an array
}
