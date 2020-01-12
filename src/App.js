import React from "react";  
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Switch,Route} from "react-router-dom"
import NavBar from "./Components/NavBar.js"
import DefaultPage from "./Components/DefaultPage.js"
import Details from "./Components/Details.js"
import ProductList from "./Components/ProductList.js"
import Cart from "./Components/Cart.js"

class App extends React.Component{
  render(){
    return(
      <React.Fragment>
        <NavBar/>
        <Switch>        
          <Route path="/Details" component={Details}/>
          <Route path="/Cart" component={Cart}/>
          <Route exact path="/" component={ProductList}/>
          <Route  component={DefaultPage}/>
        </Switch>
      </React.Fragment>
    ) 
  }
}

export default App;
