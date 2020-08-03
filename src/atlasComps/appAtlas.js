import React,{useState,useEffect} from 'react';
import Header from './header';
import {BrowserRouter as Router} from "react-router-dom";
import Main from './main';


function AppAtlas (props){


  return(
    <div>
    <Router>
        <Header/>
        <Main/>
     </Router>
    </div>
  )
}

export default AppAtlas
