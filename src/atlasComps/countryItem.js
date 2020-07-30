import React,{useState, useEffect} from 'react';

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
      console.log(data[0])
      setCountry(data[0])
    })
    
  },[props.match])
  return(
    <div>
      <h2>{country.name}</h2>
    </div>
  )
}

export default CountryItem
