import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete';

const opt=[]

export default function Home() {

  const [text,setText]=useState("");
  const [latLon,setLatLon]=useState({
    lat: '20.29164',
    lon: '85.8245'
  })

  const [cityOption,setCityOption]=useState([]);
  const cityData={};

  function textChange(e){
    setText(e.target.value);
  }
  let div;
  useEffect(()=>{
    div=document.getElementById("combo")
    div.addEventListener("change",(e)=>{
      console.log(div.value)
      setText(div.value);
    })
  },[])

  useEffect(()=>{
    if (text!=""){
      auto();
    }
  },[text])

  async function auto(){
    fetch(geoAutoComplete+text+'&apiKey='+geoKey)
    .then(e=>e.json())
    .then((e)=>{
        e.features.map((e)=>{
            setCityOption([...cityOption,e.properties]);
            cityData[`${e.properties.place_id}`]={
                lat: e.properties.lat,
                lon: e.properties.lon
            }
            console.log(cityData)
        })
    })
  }
  

  let weatherKey='8a7718abc0a6084df88c46af4a9d00fd';
  let base=`https://api.openweathermap.org/data/2.5/weather?appid=8a7718abc0a6084df88c46af4a9d00fd&lang=en&units=metric&lat=`
  let weatherBaseUrl=`https://api.openweatherapi.org/data/2.5/weather?appid=${weatherKey}&lang=en&units=metric&`;
  let geoKey='760df63f5b1744948fb9ca04e0bb8a5f';
  let geoAutoComplete='https://api.geoapify.com/v1/geocode/autocomplete?text='

  useEffect(()=>{
    fetch(base+latLon.lat+'&lon='+latLon.lon)
    .then((e)=>e.json())
    .then((e)=>{
      console.log(e)
    })
  },[latLon])

  function loactionChanger(e){
    console.log(e);
  }


  return (
    <div>
        <Autocomplete 
          id='combo'
          options={opt}
          sx={{width:300}}
          renderInput={(params)=><TextField {...params} label="movie"/>}
          onChange={(e,f)=>{
            console.log(e,f);
            loactionChanger(f)}}
        />
    </div>
  )
}
