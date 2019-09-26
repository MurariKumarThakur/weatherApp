const path = require("path");
const express = require("express");
const geocode =require("./utils/geocode.js");
const forcast = require("./utils/forecast");
const hbs = require('hbs');
const app = express();
// define paths for express config

const publicFolder = path.join(__dirname, '../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialPath);

// app.set('views', path.join(__dirname, '../views'));
// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewPath);

app.use(express.static(publicFolder));

app.get('', (req, res) => {
    //debugger;

    res.render('index',{
      title:"Weather",
     
      footerText:'This is footer Text'

    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
      title:'About Me',
      name:'Sanjay Kumar' ,
      footerText:'This is footer Text'
    })
})

app.get('/help',(req,res)=>{
   res.render('help',{
     title:'Help',
      message :'This is help page , we are trying to give help if any body stuck some where .',
      name:'Priyanka' ,
      footerText:'This is footer Text'
   })
})

app.get("/product",(req,res)=>{
   if(!req.query.search){
    return  res.send({
      error:'You must provide a search term'
    })
   }
  console.log(req.query)
  res.send({
    products:[]
  });
})





//  forcast:forcastData,app.get('',(req,res)=>{
//  res.send("<h1> Weather App </h1>");
// })

// app.get("/help",(req,res)=>{
//     //  res.send({
//     //      "name":"Murari Kumar",
//     //      "age":35
//     //  })
//      const helpPage = publicFolder+"/help.html"
//     app.use(express.static(publicFolder));
// })

// app.get("/about",(req,res)=>{
//     res.send("<h1>About page </h1>")
// })

app.get("/weather", (req, res) => {
         
     if(!req.query.address){
     return  res.send({

         error:"You must provide a search term"
       })

     }
     geocode.geocode(req.query.address,(error , {latitude,longitude,location}={})=>{
      if(error){
         return res.send({error});
      }
    

     forcast.forcast(latitude,longitude,(error,forcastData)=>{
         if(error){
            return  res.send({error});
         }
         res.send({
          forcast:forcastData,
           location:location,
           address:req.query.address
         })
         
        })

})
 
})



app.get('/help/*',(req,res)=>{
  res.render('',{
    title:'404',
    errorMessage :'Help Article Not Found!!!' ,
    footerText:'This is footer Text'
  })
})


app.get('*',(req,res)=>{
  res.render('',{
    title:'404',
    errorMessage :'Sorry page Not found !!!' ,
    footerText:'This is footer Text'
  })
  
})

//app.com
// app.com/help
//app.com/about
app.listen(3000, () => {
    console.log("Server is up on port 3000 ")
});