import React from "react"
import {storeCars,detailProduct} from "./data.js"
const ProductContext = React.createContext();

class ProductProvider extends React.Component{
    state ={
        products : [],
        detailProduct : detailProduct,
        cart : [],
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
            this.addTotals();
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
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id===id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count +1;
        product.total = product.count * product.price;
        this.setState(()=>{
            return{cart:[...tempCart]}
        },()=>{
            this.addTotals()
        })

    }

    decrement = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id===id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count -1;
        if(product.count === 0){
            this.removeItem(id)
        }
        else{
            product.total = product.count * product.price;
        }
        this.setState(()=>{
            return{cart:[...tempCart]}
        },()=>{
            this.addTotals()
        })

        }

    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart =[...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        this.setState(() => {
            return{
                cart : [...tempCart],
                products : [...tempProducts]
            }
        },() => {
            console.log("addTotals called");
            this.addTotals();
        })
    }

    clearTheCart = id => {
        this.setState(()=>{
            return{
                cart :[]
            } 
        },()=>{
            this.setProducts();
            this.addTotals();
        })
    }

    addTotals = () =>{
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.13; 
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal : subTotal,
                cartTax : tax,
                cartTotal : total
            }
        })
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
