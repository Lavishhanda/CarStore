import React from "react"
import {storeCars,detailProduct} from "./data.js"
const ProductContext = React.createContext();

class ProductProvider extends React.Component{
    state ={
        products : [],
        detailProduct : detailProduct
    };

    componentDidMount(){
        console.log("mount")
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeCars.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() => {
            return{products : tempProducts };
        })
    }

    handleDetail = () => {
        console.log("hello from detail");
    }

    addToCart = () => {
        console.log("hello from add to cart");
    }
    render(){
        console.log("render")
        return(
            <ProductContext.Provider 
                value ={{
                    detailPart:this.state.detailProduct,
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
