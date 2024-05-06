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
    if(stations.id === 870){
        detailsDiv.textMeters = "40m"
    }
    // let typesContainer = document.createElement('div');
    // typesContainer.className = 'typesContainer';

    //     bike.types.forEach(type => {
    //         let typeIcon = document.createElement('div');
    //         typeIcon.className = `icon ${type.type.name}`;
    //         let typeSVG = document.createElement('img');
    //         typeSVG.src = `./img/${type.type.name}.svg`;
    //         typeSVG.alt = type.type.name;
    //         typeIcon.appendChild(typeSVG);
    //         typesContainer.appendChild(typeIcon);
    //     });

    //cardHeader.appendChild(typesContainer);
    card.appendChild(cardHeader);

    //     //image

    


    // let statsList = document.createElement('ul');
    // statsList.className = 'statsList';

    // bike.stats.forEach(stat => {
    //     let statItem = document.createElement('li');
    //     let statName = document.createElement('strong');
    //     statName.textContent = `${stat.stat.name}: `;
    //     statItem.appendChild(statName);
    //     statItem.appendChild(document.createTextNode(stat.base_stat));
    //     statsList.appendChild(statItem);
    // });

    // detailsDiv.appendChild(statsList);
    card.appendChild(detailsDiv);

    app.appendChild(card);
}



// // async function fetchData(url){
// //     try {
// //         let stations = await fetch(url);
// //         let data = await stations.json();
// //         console.log(data.stations);
// //     }
// //     catch (error){
// //         console.error(error);
// //     }
// // }

// // fetchData(url);

