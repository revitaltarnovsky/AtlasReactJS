import React,{useRef} from 'react';
import "./css/atlas.css";
import {Link,useHistory} from "react-router-dom"


function Header (props){
    let countries_ar=["ISRAEL","USA","THAILAND","FRANCE"];
    let searchInput=useRef(null);
    let history=useHistory();
    const btnSearch=()=>{
        if(searchInput.current.value==="")return alert("must enter value");
        history.push("/country/" + searchInput.current.value) 
        
    }
    
  return(
   <div className="container d-flex justify-content-between nav border bg-light">
        <div className=" col-lg-6">
            {countries_ar.map(item=>{
                return(
                <Link to={`/country/`+item} style={{color:"black",padding:"0 12px"}} key={item}>{item}</Link>
                )
            })}            
        </div>
        <div className="col-lg-6 row">
            <input ref={searchInput} className="form-control col-lg-6 mr-2"/>
            <button onClick={btnSearch} className="btn btn-secondary">Search</button>
        </div>
   </div>
  )
}

export default Header
