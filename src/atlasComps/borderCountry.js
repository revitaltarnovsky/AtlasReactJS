import React,{useState, useEffect} from 'react';
import "./css/atlas.css"
import { Map, Marker, TileLayer } from 'react-leaflet';
import {Link} from "react-router-dom"

function BorderCountry (props){
    let [country,setCountry] = useState({})

    useEffect(()=>{
        let url="https://restcountries.eu/rest/v2/all"
        if(props.match){
          if(props.match.params.codeName){
            url = "https://restcountries.eu/rest/v2/alpha/"+props.match.params.codeName
          }
        }
        fetch(url)
        .then(resp=>resp.json())
        .then(data=>{
          console.log(data)
          setCountry(data) 
        })

      },[props.match]) 
     
  return(
    <div>
        {country ? <div className="row justify-content-center align-items-center">
            <div className="w-25"> 
              <img className="float-right w-50 mr-2" src={country.flag}/>
            </div>
            <div>
              <h2>{country.name}</h2>
              <div>POP: {country.population}</div>
              <div>Region: {country.region}</div>
              <div>Languages: {country.languages.map(item=>{
                  return(
                      <span>item.iso639_2</span>
                  )
              })}</div>
            </div>
        </div>:<h2>loading...</h2>}
      
    </div>    
)
    
  
}

export default BorderCountry
