import React from 'react';
import "./css/atlas.css";
import {Link} from "react-router-dom"

function Header (props){
    let countries_ar=["ISRAEL","USA","THAILAND","FRANCE"];
    console.log(countries_ar);
  return(
   <div className="container-fluid nav">
        <div className="container bg-light border">
            {countries_ar.map(item=>{
                return(
                <Link to={item} style={{color:"black",padding:"0 12px"}} key={item}>{item}</Link>
                )
            })}
        </div>
   </div>
  )
}

export default Header
