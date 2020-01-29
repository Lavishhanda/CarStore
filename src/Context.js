import React from "react"
import {storeCars,detailProduct} from "./data.js"
const ProductContext = React.createContext();

class ProductProvider extends React.Component{
    state ={
        products : [],
        detailProduct : detailProduct,
        cart : storeCars,
        modalOpen : false ,
        modalProduct : detailProduct,
        cartSubTotal : 0,
        cartTax : 0,
        cartTotal : 0   
    };

    componentDidMount(){
        //console.log("mount")
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

    getItem = id => {
        const product = this.state.products.find(item => item.id===id);
        return product;
    }

    handleDetail = id => {
        //console.log("hello from detail");
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        })    
    }



    /*addToCart = () => {
            console.log("added to cart");
        }*/

     noAddtoCart = id => {
        //console.log(`hello from function and id ${id}`);
        let tempProdArray = [...this.state.products];
        const index = tempProdArray.indexOf(this.getItem(id));
        const product = tempProdArray[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price ;
        product.total = price;
        this.setState(() => {
            return {products:tempProdArray, cart : [...this.state.cart, product]};
        }, () => {
            console.log(this.state);
        }
        );
    }    

    // addToCart = id => {
    //     let tempProdArray = [...this.state.products];
    //     const index = tempProdArray.indexOf(this.getItem(id));
    //     const product = tempProdArray[index];
    //     product.inCart = true;
    //     product.count = 1;
    //     const price = product.price ;
    //     product.total = price;
    //     this.setState(() => {
    //         return {products:tempProdArray, cart : [...this.state.cart, product]};
    //     }, () => {
    //         console.log(this.state);
    //     }
    //     );
    // }

    openModal = id => {
        const product = this.getItem(id);
        this.setState ( () => {
            return {
                modalProduct : product, modalOpen : true
            }
        })
    }

    closeModal = id => {
        this.setState ( () => {
            return {modalOpen : false}
        })
    }

    increment = id => {
        console.log("this is increment method");
    }

    decrement = id => {
        console.log("this is decrement method");
    }

    removeItem = id => {
        console.log("item deleted");
    }

    clearTheCart = id => {
        console.log(" Cart is empty");
    }

    render(){
        //console.log("render")
        return(
            <ProductContext.Provider 
                value ={{
                    ...this.state,
                    //addtoCart : this.addToCart,
                    handleDetail : this.handleDetail,
                    noAddtoCart : this.noAddtoCart,
                    openModal : this.openModal,
                    closeModal : this.closeModal,
                    increment : this.increment,
                    decrement : this.decrement, 
                    removeItem : this.removeItem,
                    clearTheCart : this.clearTheCart
                    
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
