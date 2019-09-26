const request = require("request");

 const forcast = (latitude , longitude,callback)=>{
 

 
    const url = "https://api.darksky.net/forecast/62e0cdab5a5034711f18a833b3eb84c4/"+ encodeURIComponent(longitude)+","+encodeURIComponent(latitude);
     
     request({url,json:true},(error,{body}={})=>{
      
         if(error){
            callback("Unable to connect To the Service",undefined);
         }else if(body.error){
             callback("Sorry Unable To Find Location !!!",undefined);
         }else{
             callback(undefined,"it is currently ["+ body.currently.temperature+"] degree out There is ["+
                         body.currently.precipProbability+"%] chnage of rain .")
         }


     })

   

 }
  module.exports={
    forcast:forcast
  }