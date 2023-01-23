import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete';
import WeatherComp from './WeatherComp';
// import '../App.css'

const opt=[]

export default function Home() {

  const [WeatherInfo,setWeatherInfo]=useState("");

  const [text,setText]=useState("");
  const [latLon,setLatLon]=useState({
    lat: '20.29164',
    lon: '85.8245'
  })

  // const [cityOption,setCityOption]=useState([]);
  const [cityData,setCityData]=useState({});
  // let cityData={}

  function textChange(e){
    setText(e.target.value);
  }
  let div;
  useEffect(()=>{
    div=document.getElementById("combo")
    div.addEventListener("input",(e)=>{
      auto(div.value)
    })
  },[])

  async function auto(text){
    fetch(geoAutoComplete+text+'&apiKey='+geoKey)
    .then(e=>e.json())
    .then((e)=>{
      opt.length=0;
      setCityData({})
      let cityD={}
        e.features.map((e)=>{
          console.log(opt,cityData);
            // setCityOption([...cityOption,e.properties.formatted]);
            opt.push({
              label: e.properties.formatted,
              place_id: e.properties.place_id
            })
            cityD[`${e.properties.place_id}`]={
              lat: e.properties.lat,
              lon: e.properties.lon
            }
            setCityData(cityD);
        })
    })
  }
  

  let weatherKey='8a7718abc0a6084df88c46af4a9d00fd';
  let base=`https://api.openweathermap.org/data/2.5/weather?appid=8a7718abc0a6084df88c46af4a9d00fd&lang=en&units=metric&lat=`
  let weatherBaseUrl=`https://api.openweatherapi.org/data/2.5/weather?appid=${weatherKey}&lang=en&units=metric&`;
  let geoKey='760df63f5b1744948fb9ca04e0bb8a5f';
  let geoAutoComplete='https://api.geoapify.com/v1/geocode/autocomplete?text='

  useEffect(()=>{
    console.log(latLon.lat,latLon.lon);
    fetch(base+latLon.lat+'&lon='+latLon.lon)
    .then((e)=>e.json())
    .then((e)=>{
      setWeatherInfo(e);
    })
  },[latLon])

  function loactionChanger(e){
    if (e!=undefined){
      console.log(cityData);
      let x=cityData[e.place_id];
      setLatLon(x);
    }
  }


  return (
    <div className=''>
        <Autocomplete 
          isOptionEqualToValue={(option,value)=>option.label===value.label}
          id='combo'
          options={opt}
          sx={{width:300}}
          renderInput={(params)=><TextField {...params} label="Enter city name"/>}
          onChange={(e,f)=>{
            loactionChanger(f)}}
          className="mx-auto"
        />
        {WeatherInfo==""?"":
        <WeatherComp info={WeatherInfo}/>
        }
    </div>
  )
}
