import React,{useState, useEffect} from 'react';

function CountryItem (props){
  let [country,setCountry] = useState([])
  useEffect(()=>{
    let url="https://restcountries.eu/rest/v2/name/"+props.match.params.country
    fetch(url)
    .then(resp=>resp.json())
    .then(data=>{
      console.log(data)
    })
  },[])
  
  return(
    <div>
      
    </div>
  )
}

export default CountryItem
