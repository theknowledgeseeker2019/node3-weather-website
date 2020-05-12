console.log('This is some client side scripting running.');



const weatherForm = document.querySelector('form');  
const search = document.querySelector('input'); 
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'Form JavaScript';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();  
    const location = search.value;  

    // const url = 'http://localhost:3000/weather?address=' + location
    messageOne.textContent = 'Loading...';
    messageTwo.textConent = '';

    //'http://localhost:3000/weather?address='
    fetch('/weather?address=' + location).then((response) => {

       
        response.json().then((data) => {
            if (data.error){
                // console.log(data.error)
                messageOne.textContent = data.error;
                // messageTwo.textContent = ''; 
            } else {
                // console.log(data.forecast);
                // console.log(data.location);
                messageOne.textContent = data.location; 
                messageTwo.textContent = data.forecast;
            };
            
        });
    });



})