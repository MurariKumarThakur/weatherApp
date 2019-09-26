console.log("client side javascrit message is printed .....");
fetch('http://puzzle.mead.io/puzzle').then((response) => {

     response.json().then((data) => {
          console.log(data);
     })
})

// fetch("http://localhost:3000/weather?address=Bostan").then((response)=>{



//       response.json().then((data)=>{
//          console.log(data)
//       })

// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')

  


weatherForm.addEventListener('submit', (e) => {
     e.preventDefault();
         messageOne.style.color='black';
         messageOne.textContent="Loading ..."
   

    messageTwo.textContent='';
     const location = search.value;

     const baseUrl = document.location.origin + "/weather?address=" + location

     fetch(baseUrl).then((response) => {

          response.json().then((data) => {

               if (data.error) {
                    messageOne.style.color='red';
                    messageTwo.textContent=""
                    messageOne.textContent= "ERROR --"+data.error;
                 
               } else {
                    messageOne.style.color='black';
                    messageOne.textContent = 'forcast is --'+data.forcast;
                    messageTwo.textContent = 'Location is --'+data.location;
                   
               }

          })

     })

})