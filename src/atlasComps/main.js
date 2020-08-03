import React from 'react';
import { Switch, Route} from "react-router-dom";
import CountryItem from './countryItem';



function Main (props){


  return(
    <div className="container-fluid">
        <div className="container" style={{minHeight:"600px"}}>
        <Switch>
            <Route exact path="/country/:countryName" component={CountryItem} />
            <Route exact path="/code/:codeName" component={CountryItem} />
            <Route exact path="/" component={CountryItem} />
        </Switch>
        </div>
    </div>  
      
  )
}

export default Main
