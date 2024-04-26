const app = document.querySelector('#app');
const url = "https://api.publibike.ch/v1/public/partner/stations";

// var express = require('express');
// var cors = require('cors');
// var app1 = express();

// app1.use(cors({ origin: true, credentials:true}));




function init(){

}

async function fetchData(url){
    try {
        let stations = await fetch(url);
        let data = await stations.json();
        console.log(data.stations);
    }
    catch (error){
        console.error(error);
    }
}

fetchData(url);

