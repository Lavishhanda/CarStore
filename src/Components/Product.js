import React from "react"
import styled from "styled-components"
import {Link} from "react-router-dom"
import {ProductConsumer} from "../Context.js"

class Product extends React.Component
{
    render()
    {
        const {id, title, img, price, inCart} = this.props.product;
        return(
            <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
                    <div className="img-container p-4" onClick={() => console.log("you clicked me")}>

                    <Link to="/Details">
                        <img src={img} alt="product image" className="card-img-top">

                        </img>
                    </Link>
                    </div>
                </div>
            </ProductWrapper>
        )
    }
}

const ProductWrapper = styled.div`

`

export default Product