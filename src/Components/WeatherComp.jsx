import React from 'react'
import '../App.css'
import { InvertColors } from '@mui/icons-material';
import { Air } from '@mui/icons-material';
import { LightMode } from '@mui/icons-material';
import { Bedtime } from '@mui/icons-material';

export default function WeatherComp(props) {

  console.log(props.info);

  let iconUrl=`https://openweathermap.org/img/w/`;
  let date=new Date(props.info.dt*1000-props.info.timezone*1000)
  let sunRise=new Date(props.info.sys.sunrise*1000);
  let sunSet=new Date(props.info.sys.sunset*1000);

  return (
    <div className='border border-black w-[50%] mx-auto rounded-xl space-y-3 p-3 wthr mt-10'>
        <div className='flex justify-between'>
        <img src={iconUrl+props.info.weather[0].icon+'.png'} alt="" />
        <div>
            <div>
            {props.info.name}
            </div>
            <div>
                {date.toLocaleDateString()}
            </div>
        </div>
        </div>
        <div className='mx-auto text-center'>
            <div>
            {props.info.main.temp}
            <span>&#8451;</span>
            </div>
            <div>
                {props.info.weather[0].main}
            </div>
        </div>
        <div className='flex justify-between'>
            <div>
                <InvertColors/>
                {props.info.main.humidity}
            </div>
            <div>
                <Air/>
                {props.info.wind.speed}
            </div>
        </div>
        <div className='flex justify-between'>
            <div>
                <LightMode/>
                {sunRise.toLocaleTimeString()}
            </div>
            <div>
                <Bedtime/>
                {sunSet.toLocaleTimeString()}
            </div>
        </div>
    </div>
  )
}
