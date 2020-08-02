import React,{useState, useEffect} from 'react';
import "./css/atlas.css"
import { Map, Marker, TileLayer } from 'react-leaflet';

function CountryItem (props){
  let [country,setCountry] = useState([])

  useEffect(()=>{
    let url="https://restcountries.eu/rest/v2/name/"
    if(props.match){
      if(props.match.params.countryName){
        url = "https://restcountries.eu/rest/v2/name/"+props.match.params.countryName
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
    <div >
      {country.map(item=>{
        return(
        <div key={item.numericCode}>
          <div className="row justify-content-center align-items-center">
            <div style={{width:"25%"}}> 
              <img className="float-left mr-2" src={item.flag} height="180"/>
            </div>
            <div>
              <h2>{item.name}</h2>
              <div>POP: {item.population}</div>
              <div>Region: {item.region}</div>
              <div>Languages: {item.languages[0].iso639_2}</div>
              <div>Coin: {item.currencies.map(item=>{
                return(
                  <span  key={item.code} >
                  {item.code},{item.name}
                  </span>
                )})}
              </div>
              <div>Capital: {item.capital}</div>
            </div>
          </div>
          <div className="row justify-content-center align-items-center ">
          <div className="leaflet-container float-left mr-5">
          <Map center={[item.latlng[0],item.latlng[1]]} zoom={7}>
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[item.latlng[0],item.latlng[1]]}
            />
          </Map>
          </div>
          <div>
            Borders with states: {item.borders.map(item=>{
              return(
                <span>
                  {item + " "}
                </span>
              ) 
            })}
          </div>
          </div>
        
        </div>
        )})}
      
      


    </div>
  )
}

export default CountryItem
