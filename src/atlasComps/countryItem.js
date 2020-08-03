import React,{useState, useEffect} from 'react';
import "./css/atlas.css"
import { Map, Marker, TileLayer } from 'react-leaflet';
import {Link,useHistory} from "react-router-dom"

function CountryItem (props){
  let [country,setCountry] = useState([]);
  let [loading,setLoading] = useState(true);
  let [first , setFirst] = useState(true);
  let [all,setAll] = useState([]);
let history = useHistory();
  useEffect(()=>{
    let url="https://restcountries.eu/rest/v2/name/"
    let allUrl ='https://restcountries.eu/rest/v2/all'

    if(first){
      fetch(allUrl).then(res=>res.json()).then(data=>{setAll(data);setFirst(false);});
    }
    if(props.match){
      if(props.match.url === '/'){
        history.push('/country/ISRAEL')
      }
      if(props.match.params.countryName){
        url = "https://restcountries.eu/rest/v2/name/"+props.match.params.countryName+"?fullText=true"
      }
      if(props.match.params.codeName){
        url="https://restcountries.eu/rest/v2/alpha/"+props.match.params.codeName
      }
    }
    fetch(url)
    .then(resp=>resp.json())
    .then(data=>{
      if(!Array.isArray(data)){
        if(data.status){
          setCountry([]);
          setLoading(false);
        }
        else {
          let temp=[]
          data.borders.map((item,i)=>{
          all.map(country=>{
              if(country.alpha3Code === item)data.borders[i] = country.name;
            })
          })
          temp.push(data)
          setLoading(false);
          setCountry(temp);
        }
      }
      else{
        data[0].borders.map((item,i)=>{
          all.map(country=>{
            if(country.alpha3Code === item)data[0].borders[i]=country.name;
          })
        })

        setCountry(data)
      }  
    })
  },[props.match])
  return(
    <div  className="text-center">
      {country.length > 0 ? country.map(item=>{
        return(
        <div key={item.numericCode} >
          <div className="row justify-content-center align-items-center">
            <div className="w-25"> 
              <img className="float-right w-50 mr-2" src={item.flag}/>
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
            {(item.latlng.length>0)?
                <Map center={[item.latlng[0],item.latlng[1]]} zoom={7}>
                <TileLayer
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={[item.latlng[0],item.latlng[1]]}
                />
              </Map>: <Map center={[0,0]} zoom={7}>
                <TileLayer
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={[0,0]}
                />
              </Map>
            }
          
          </div>
          <div>
            Borders with states: {item.borders.map(item=>{
                if(item.length === 3) return <Link to={`/code/`+ item} key={item}>{item + " "}</Link>
                else return <Link to={`/country/`+ item} key={item}>{item + " "}</Link>
      
            })}
          </div>
          </div>
        
        </div>
        )}) : loading ? <h2>Loading</h2> : <h2>Nothing Found</h2>}
      
      


    </div>
  )
}

export default CountryItem
