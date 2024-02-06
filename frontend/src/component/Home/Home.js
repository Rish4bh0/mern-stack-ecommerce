import React, { Fragment, useEffect } from "react";
import { GiClick } from "react-icons/gi";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../action/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import bg1 from "../../images/gga.jpg";
import bg from "../../images/ff.jpg";
import bg2 from "../../images/sl4.jpg";
import Carousel from "react-material-ui-carousel";


const Home = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        theme: "colored",
      });
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Sam Fitness" />

          <div className="banner">
               <Carousel>
                <img src={bg1} className="bgImg"/>
                 <img src={bg} className="bgImg"/>
                 <img src={bg2} className="bgImg"/>
               </Carousel>
             <div className="home__content">
             <div>
                 <h2
                 style={{
                   fontWeight:"400",
                   fontFamily:"Poppins,sans-serif",
                   color:"#fff",
                   fontSize:"1em",
                   paddingTop:"10px",
                   paddingRight:"180px",
                 }}
                 >
                Welcome To
                 </h2>
               </div>
               <div style={{
                 display:"flex",
                 alignItems:"center",
               }}>
               <h2 style={{
                 fontFamily: "Poppins,sans-serif",
                 fontSize: "3em",
                 fontWeight:"1100",
                 color:"#fff",
               }}>Sam Fitness</h2>
               </div>
               <div>
                 <h2
                 style={{
                   fontWeight:"400",
                   fontFamily:"Poppins,sans-serif",
                   color:"#fff",
                   fontSize:"1em",
                   paddingTop:"10px",
                   paddingLeft:"30px",
                 }}
                 >
                 Get Free Shipping on all orders over रु3000
                 </h2>
               </div>
               <div>
                 <a href="#container">
                 <button type="submit" style={{
                  height:"45px",
                   borderRadius:"18px",
                   margin:"10px 0",
                   width:"135px",
                   color:"#000",
                   cursor:"pointer"
                 }}
                 className="Home__button"
                 > SHOP NOW </button>
                 
                 </a>
               </div>
             </div>
         </div>
 

          <h2 className="homeHeading">Trending Now</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          
        </Fragment>
      )}
      ;
    </Fragment>
  );
};

export default Home;
