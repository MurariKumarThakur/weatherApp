const request = require('request');

const geocode = (address,callback)=>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibXVyYXJpa3VtYXIiLCJhIjoiY2p6bTRwcHh1MDBpdzNjbnlmcnZyNzV1aiJ9.NI2bQlcXjSvzOSuB8pv8jQ"
     request({url,json:true},(error,{body}={})=>{
        if(error){
          callback('Unable To connect to location Services !!!',undefined)
        }else if(body.features.length ===0){
            callback("Unable to find location .Try another Serch",undefined)
        }else{
           callback(undefined,{
             latitude:body.features[0].center[0],
             longitude:body.features[0].center[1],
             location:body.features[0].place_name
           })
        }
     })

 }

 module.exports={
   geocode:geocode

 }