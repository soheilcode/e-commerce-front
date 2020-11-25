import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axios } from './axios';
import { useStateValue } from './StateProvider';
function Header() {
    const [{products , token} , dispatch] = useStateValue()
    const [name , setName] = useState(null)

    const handleSignOut = () => {
        if(token) {
           dispatch({type : 'SET_TOKEN' , token : null})
        }
    }

    useEffect(() => {
        if(token) {
            axios.get('/api/getUserName' , {
                        headers : {
                            'Authorization': 'Bearer ' + token
                        }
                    }).then(res => setName(res.data)).catch(err => console.log(err))
                }
        }, [token])

    return (
        
        <div className="header">
            
            <Link to="/">
                <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo"/>

            </Link>
        
            <div className="header__search">
                <input type="text"/>
                <div className="header__searchIcon">
                    <SearchIcon />

                </div>
            </div>
            <div className="header__options">
                <Link to={!token ? '/auth' : '/'} onClick={handleSignOut}>
                    <div className="header__optionsSignIn" style={{color : 'white'}}>
                    <p>Hello <strong>{(name && token) && name}</strong></p>
                        <h4>Sign {token ? 'out' : 'in'}</h4>
                    </div>
                </Link>
                <div className="header__optionsOrder">
                    <p>Returns</p>
                    <h4>& Orders</h4>
                </div>
                <div className="header__optionsPrime">
                    <p>Your</p>
                    <h4>Prime</h4>
                </div>
                <Link to={token ? "/cart" : '/auth'} style={{color : 'white'}}>
                {
                    token ?
                    <div className="header__optionsKart">
                        <ShoppingCartIcon />
                         <h4>{products?.length || 0}</h4>
                    </div>
                    :
                    <div>
                        <p>Sign-In to show cart</p>
                    </div>
                }
                </Link>
                
            </div>
        </div>
    )
}

export default Header
