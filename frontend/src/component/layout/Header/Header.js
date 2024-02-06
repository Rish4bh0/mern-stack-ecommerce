
// eslint-disable-next-line
import React, { useRef } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import bg1 from "./spn1.png";

const Header = () => {
const { cartItems } = useSelector((state) => state.cart);
//const { favouriteItems } = useSelector((state) => state.favourite);

const switcherTab = useRef(null);
  
window.addEventListener("scroll", () =>{
  if(window.pageYOffset > 100){
      document.querySelector(".navbar").classList.add("active");
  }
  else{
    document.querySelector(".navbar").classList.remove("active");
  }
})

  return (
    <div className="Header">

    
    <div className="navbar flex pz__10 space__beetween" ref={switcherTab}
    
    >
      <div
       className="navigation"
       style={{
         padding:"0px 50px",
         
       }}
      >
        <ul
          style={{
            fontFamily: "sans-serif",
            cursor: "pointer",
            display: "flex",
            listStyle: "none",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            
          }}
        >
          <li><Link to="/" style={{ textDecoration: "none" }}>Home</Link></li>
  <li><Link to="/about" style={{ textDecoration: "none" }}>About</Link></li>
  <li><Link to="/Products" style={{ textDecoration: "none" }}>Products</Link></li>
  <li><Link to="/contact" style={{ textDecoration: "none" }}>Contact</Link></li>
  <li><Link to="/exercises" style={{ textDecoration: "none" }}>Exercise</Link></li>
        </ul>
      </div>

      <div className="rightOption flex align__items__center">
        <div>
          <Link to="/search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-search pxz__20 black pointer"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </Link>
        </div>
        
        <div className="cart__items flex align__items__center">
          <div className="cart__items flex pointer relative">
            <Link to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-cart3 pxz__20 black"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </Link>
           <div
              className="heart__numbers"
              style={{
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                color:"white",
                backgroundColor: "#224952",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: "-40%",
                right: "3.5%",
              }}
            >
              <span>{cartItems.length}</span>
            </div>
          </div>
        </div>
        <div className="user__account flex pointer">
          <Link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-person pxz__20 black"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </div>
   
  );
};

export default Header;





