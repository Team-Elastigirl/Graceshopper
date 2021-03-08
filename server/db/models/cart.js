module.exports = function Cart(initItems) {
  //it gets the old if one exsist if not it creates an empty object
  this.items = initItems || {}

  // adds a new item to the cart and checks if the item already is in the cart
  this.add = function(item, id) {
    let storedItem = this.items[id]
    if (!storedItem) {
      storedItem = this.items[id] = item
    }
    // TODO: update existing items in cart
    // storedItem.qty++;
    // storedItem.price = storedItem.item.price * storedItem.qty;
    // this.totalQty++;
    // this.totalPrice += storedItem.item.price;
  }

  // }

  // helper function that returns the cart items as an array
  this.generateArray = function() {
    const arr = []
    for (let id in this.items) {
      if (this.items[id]) {
        arr.push(this.items[id])
      }
    }
    return arr
  }
}
