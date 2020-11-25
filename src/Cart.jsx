import React from 'react'
import Product from './Product'
import { getCartTotal } from './reducer'
import { useStateValue } from './StateProvider'

function Cart() {
    const [{products} , dispatch] = useStateValue()
    return (
        <div className="cart">
            <div className="cart__info">
                <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt=""/>
                <h1>Your Shopping Cart</h1>
                {
                    products?.map(product => {
                        
                        return(
                        <Product name={product.name} price={product.price} rate={product.rate} image={product.image} key={product.id} id={product.id} count={product.count} cart/>
                    )})
                }
            </div>
            <div className="cart__checkout">
                <p>Subtotal ({products.length} items): <strong>${getCartTotal(products)}</strong></p>
                <div className="cart__gift">
                    <input type="checkbox" name="" id=""/><p> This order contains a gift</p>
                </div>
                <button>Proceed to checkout</button>
            </div>
        </div>
    )
}

export default Cart
