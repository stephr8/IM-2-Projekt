const app = document.querySelector('#app');


async function fetchData() {
    let url = "130_extract.php";
    try {
        let stations = await fetch(url); //response in pokemon
        let data = await stations.json();
        let data_chur = data.stations.filter((element) => element.city == "Chur");
        console.log(data_chur);
        processData(data_chur);

        return data_chur;
    }
    catch (error) {
        console.error(error);
    }
}

fetchData();

function processData(data) {
    for (stations of data) {
        //(vehicles.name == "101503")

        if (stations.id === 870 || stations.id === 879) {
            stations.vehicles.forEach(vehicle => {
                console.log(vehicle);
                createCard(vehicle);
            });
        }
        //  || stations.name == "Fachhochschule Graubünden Pulvermühlestrasse")
    }

}

function createCard(vehicle) {
    // console.log("creating card");
    let card = document.createElement('div');
    card.className = 'vehicleCard';

    let cardHeader = document.createElement('div');
    cardHeader.className = 'cardHeader';
    let smalliconBike = document.createElement('img');
    smalliconBike.src = './images/smallicon-bike.svg';
    cardHeader.appendChild(smalliconBike);
    document.body.appendChild(cardHeader);



    let nameElement = document.createElement('h2');
    nameElement.textContent = vehicle.name;
    cardHeader.appendChild(nameElement);
    
    let directionIcon = document.createElement('img');
    directionIcon.src = './images/directionIcon.svg';

    
     let distanceDiv = document.createElement('div'); 
    distanceDiv.className = 'distanceDiv';
    if (stations.id === 870) {
        distanceDiv.textContent = "40m";
    } else {
        distanceDiv.textContent = "300m";
    }

    let detailsDiv = document.createElement('div');
    detailsDiv.className = 'detailsDiv';


    
    detailsDiv.textContent = vehicle.ebike_battery_level;
    if(vehicle.ebike_battery_level == null){
        detailsDiv.textContent = "Dieses Velo ist kein E-Bike.";
    }
    if (vehicle.ebike_battery_level < 20){
        detailsDiv.style.color = "red";
    }
    if (vehicle.ebike_battery_level > 20 && vehicle.ebike_battery_level < 50){
        detailsDiv.style.color = "orange";
    }
    if (vehicle.ebike_battery_level > 50){
        detailsDiv.style.color = "green";
    }
    if(vehicle.ebike_battery_level == null){
        detailsDiv.style.color = "black";
    }

    if(vehicle.ebike_battery_level != null){
        let progressbar = document.createElement('progress');
        progressbar.className = 'progressbar';
        progressbar.value = vehicle.ebike_battery_level;
        progressbar.max = 100;
    
        detailsDiv.appendChild(progressbar);
    }

    let button = document.createElement('button');
    button.className = 'button';    
    button.textContent = "Reservieren";
  


    card.appendChild(cardHeader);
    distanceDiv.appendChild(directionIcon);    
        
        
    card.appendChild(detailsDiv);
    card.appendChild(distanceDiv);
    card.appendChild(button);

    app.appendChild(card);
}