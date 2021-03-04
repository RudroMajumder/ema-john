import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NoMatch from './components/NoMatch/NoMatch';
import ProductDetail from './components/ProductDetails/ProductDetail';

function App() {
  return (
    <div >
      <Header></Header>
      <Router>
        <Switch>
          <Route exact path ="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route exact path ="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
