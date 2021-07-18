// Personal API Key for OpenWeatherMap API
const apiKey ='&appid=2828de66189911f985035cf97c2d04af&units=metric';
const apiUrl ='http://api.openweathermap.org/data/2.5/weather?zip=';

// test the server using Url => 'http://localhost:3000'



// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateInfo);


// [1]  ===============   Generate required infromation when click the button [Generate]  ======================== //


function generateInfo(e) {
    
                               // Action 1 => Take infromation from the user (zip code & feeling)
                                let zipCode =document.getElementById('zip').value;
                                let feelingWhat = document.getElementById('feelings').value;

                               // Action 2  =>  The user click the Generate Button without typing information 
                                if( zipCode =="" || feelingWhat ==""){
                                    alert("Please type zip code and your feeling");
                                    return;
                                }
                                
                
                                let d = new Date();
                                let newDate = d.getMonth()+1 + "." + d.getDate() + "." + d.getFullYear();

                     // Action 3 => Call tthe function "weatherInfo" to bring the information
                    weatherInfo(apiUrl, zipCode, apiKey)

                        .then(data => {
                                    try {
                                        // Action 4 => Send Required infromation (temparture ,cityname ,feelings , date)
                                    postData("/postInfo", {
                                        
                                        temperature:data.main.temp,
                                        cityname: data.name,
                                        feelings: feelingWhat,
                                        date: newDate

                                    });
                                    } catch (error) {
                                        // The user entered invalid zip code.
                                        alert("City not found -|OR|- Invalid zip code");
                                        document.location.reload();
                                        
                                        
                                    }

                    })
                         // Action 5 =>  show the requiired infromation to the enduser .
                         .then(() => showInfo());

                         // Remove old infromation.
                         document.getElementById('zip').value="";
                         document.getElementById('feelings').value="";

};
    



// [2]  ===============   Bring Infromation Using APIKey  ======================== //
 
//1- open the website https://openweathermap.org/
//2- get your apikey  ,this is my key [ 2828de66189911f985035cf97c2d04af ]


const weatherInfo = async (apiUrl, zipCode, apiKey) => {
    // Now collect static URL & zip code form the user  & API Key
    const findInfo= await fetch(apiUrl+zipCode+apiKey);
    // Data will retrieve all the weather info from the website
    const data = await findInfo.json();
    
    try {
        //Just to check if there's a data or no.
        console.log(data);
        // Now bring data[ all weather information ]
        return data;
    } catch(error) {
        // If Error....
        console.log('error++++++>', error);
    };
    
};

// [3]  ===============   Post infromation to the server   ======================== //
// Async POST to post data from API to teh server

const postData = async (url = '', data = {}) => {
    // post infromation to url of "postData"
    const postAllInfo = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        // Just to know that postData is working
        console.log(data);
        // Take the data and send it to the url 
        return data;
        
    }
    catch (error) {
        // If Error ...
        console.log('Error', error);
    }
}



// [4]  ===============   Get information from the server  ======================== //
// Show infromation to the enduser.
const showInfo = async () => {
    

    //Request information 
    const request = await fetch('/getInfo');

    try {
        // Get information which has been sent from the server.
        const requiredInfo = await request.json();
        // Just to know if it's working and show info
        console.log(requiredInfo);

        // Add Date to the div of date .
        document.getElementById('date').innerHTML = "Date : " + requiredInfo.date;
        // Add Temperature to the div of temp .
        document.getElementById('temp').innerHTML = "Temp :"+ requiredInfo.temperature +" "+"°C";
        // Add User Feelinigs to the div of content .
        document.getElementById('content').innerHTML ="Feeling :"+  requiredInfo.feelings;

        // I added a new div to show the city name 
        // Add city name to the city div.
        document.getElementById('newTitle').innerHTML="City   ["+ requiredInfo.cityname + "]";

        
    }
    catch (error) {
        //If Error...
        console.log('error', error);
    }
}

