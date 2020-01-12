import React from "react"
import {Link} from "react-router-dom"
import iconFinder from "./iconFinder.png" 
import styled from "styled-components"
import {ButtonContainer} from "./Button.js"

class NavBar extends React.Component{
    render(){
        return(
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                <Link to="/">
                    <img src={iconFinder} alt="store"
                    className="navbar-brand"/>
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link to="/" className="nav-link">
                            products
                        </Link>
                    </li>
                </ul> 
                 <Link to="/Cart" className="ml-auto">
                    <ButtonContainer>
                        <span><i className="fas fa-cart-plus"> my cart</i></span>                      
                    </ButtonContainer>
                </Link>             
            </NavWrapper>
        )
    }
}

const NavWrapper = styled.nav`
background : var(--mainBlue);
.nav-link{
    color : var(--mainWhite);
    font-size : 1.3rem;
};
text-transform : capitalize;`

export default NavBar