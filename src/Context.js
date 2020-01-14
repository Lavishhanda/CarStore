import React from "react"
import {storeCars,detailProduct} from "./data.js"
const ProductContext = React.createContext();

class ProductProvider extends React.Component{
    state ={
        products : storeCars,
        detailProduct : detailProduct
    };
    handleDetail = () => {
        console.log("hello from detail");
    }

    addToCart = () => {
        console.log("hello from add to cart");
    }
    render(){
        return(
            <ProductContext.Provider 
                value ={{
                    ...this.state,
                    handleDetail : this.handleDetail,
                    addtoCart : this.addToCart
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
