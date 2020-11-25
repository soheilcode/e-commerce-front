import React, { useState } from 'react'
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from './StateProvider';
function Product({name , price ,rate , image , id , cart , count}) {
    const [{ products , token} , dispatch] = useStateValue()
    const [counter , setCounter] = useState(1)
    const stars = () => {
        let arr = []
        for (let i = 0; i <= rate; i++) {
            arr.push(<StarIcon key={i}/>)
        }
        return arr
    }
    const addProduct = () => {
        if(token) {
            if(!products.some(product => product.id === id)) {
                
                dispatch({type : 'SET_PRODUCTS' , products: [...products , {name : name , price : price , image : image , rate : rate , id : id , count : counter }]})
                //setCartStat("Added to Cart")
            }else {
                setCounter(counter + 1)
                dispatch({type : 'SET_COUNT' , id: id , count : counter})
            }
        }else {
            alert('Please Sign In')
        }
    }

    const removeProduct = () => {
        dispatch({type : 'REMOVE_PRODUCT' , id : id})
    }
    return (
        <div className="product" style={!cart ? {flexDirection : 'column'} : {flexDirection : 'row-reverse'}}>
            <div style={cart ? {marginLeft : '30px'} : {marginLeft : "0px"}} className="product__info">
                <p className="product__name">{name}</p>
                <div className="product__priceTag" >
                    <small>$</small><span className="product__price">{price}</span>
                </div>
                <div className="product__stars">
                    {
                        stars()
                    }
                </div>
                    {
                        cart && 
                            <div className="product__count">
                                <button onClick={() => {dispatch({type : "SET_COUNT" , id : id , count : count - 1 })}}>-</button>
                                <h3>{count}</h3>
                                <button onClick={() => {dispatch({type : "SET_COUNT" , id : id , count : count + 1 })}}>+</button>
                            </div>
                    }
                    
                    {
                        cart &&
                        <h2>${Number(price)*count}</h2>
                    }

                    {
                        cart && <button className="product__button" onClick={removeProduct}>Remove from Cart</button>
                    }
            </div>
            <img className="product__image" src={image} alt=""/>
            {
                !cart && <button className="product__button" onClick={addProduct}>Add to Cart</button>

            }
        </div>
    )
}

export default Product
