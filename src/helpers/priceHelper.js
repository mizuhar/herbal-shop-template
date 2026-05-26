 export function formatPrice(price){
    return price.toFixed(2)
  }

 export function calculateSubtotal(item){

    return item.price * item.quantity
  }