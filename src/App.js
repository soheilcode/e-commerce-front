
import './App.css';
import Home from './Home';
import Header from './Header';
import {BrowserRouter as Router , Switch , Route , Redirect} from 'react-router-dom'
import Cart from './Cart';
import Login from './Login'


import { useStateValue } from './StateProvider';

function App() {
  
  const [{token} , dispatch] = useStateValue()

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/auth">
            <Login />
          </Route>
          <Route path="/cart">
            <Header />
            {token ? <Cart /> : <Redirect to='/'/>}
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
