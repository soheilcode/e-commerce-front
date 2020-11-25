import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Product from './Product'
import {axios} from './axios'
function Home() {
    const [products,setProducts] = useState([])

    useEffect(()=> {
        axios.get('/api/products').then(res => {
            setProducts(res.data.map(product => ({
                id : product._id ,
                info : product
            })))
        })                               
    },[])

    return (
        <div className="home">
            <div className="homeWrap">
                <img
                className="home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt=""
                />
                <div className="home__products">
                    <Grid container spacing={2} className="grid--productContainer">
 
                        {
                            products.map((product , index) => (
                                <Grid item className="grid--product" md={4} xl={3} xs={12} sm={6} key={index}>  
                                    <div className="grid--productWrap" >
                                    <Product name={product.info.name} price={product.info.price} rate={product.info.rate} image={product.info.image} key={product.id} id={product.id} />
                                    </div>
                                </Grid>
                            ))
                        }
                        
                    </Grid>

                </div>

            </div>
        </div>
    )
}

export default Home
