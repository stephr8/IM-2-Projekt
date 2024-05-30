const app = document.querySelector('#app');


async function fetchData() {
    let url = "../130_extract.php";
    try {
        let stations = await fetch(url);
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
    for (station of data) {
        //(vehicles.name == "101503")

        if (station.id === 870 || station.id === 879) {
            station.vehicles.forEach(vehicle => {
                console.log(vehicle);
                createCard(vehicle, station);
            });
        }
    }

}

function createCard(vehicle, station) {
    // console.log("creating card");
    let card = document.createElement('div');
    card.className = 'vehicleCard';

    let cardHeader = document.createElement('div');
    cardHeader.className = 'cardHeader';
    let smalliconBike = document.createElement('img');
    smalliconBike.src = '../images/ebikeIcon.svg';
    smalliconBike.id = "v" + vehicle.name;
    cardHeader.appendChild(smalliconBike);
    document.body.appendChild(cardHeader);



    let nameElement = document.createElement('h2');
    nameElement.textContent = vehicle.name;
    cardHeader.appendChild(nameElement);

    let addressElement = document.createElement('h2');
    addressElement.textContent = vehicle.address;

    let cityElement = document.createElement('h2');
    cityElement.textContent = vehicle.city;

    let directionIcon = document.createElement('img');
    directionIcon.src = '../images/directionIcon.svg';
    directionIcon.className = 'directionIcon';


    let distanceDiv = document.createElement('div');
    distanceDiv.className = 'distanceDiv';
    if (station.id === 870) {
        distanceDiv.textContent = "40m";
    } else {
        distanceDiv.textContent = "300m";
    }


    distanceDiv.addEventListener('mouseover', () => {
        // distanceDiv.textContent = station.address + '<br>' + station.zip + "  " + station.city;
        distanceDiv.innerHTML = `${station.address}<br>${station.zip}  ${station.city}`;

    });

    distanceDiv.addEventListener('mouseout', () => {
        if (station.id === 870) {
            distanceDiv.innerHTML = "40m";
        } else {
            distanceDiv.innerHTML = "300m";
        }
        distanceDiv.innerHTML += directionIcon.outerHTML;

    });


    let detailsDiv = document.createElement('div');
    detailsDiv.className = 'detailsDiv';

    // detailsDiv.textContent = vehicle.ebike_battery_level + '%';

    if (vehicle.ebike_battery_level == null) {
        detailsDiv.textContent = "Dieses Velo ist kein E-Bike";
        smalliconBike.src = '../images/bikeIcon.svg';
        detailsDiv.style.color = "#265970";
    } else {
        let progressbar = document.createElement('progress');
        // progressbar.className = 'progressbar';
        progressbar.value = vehicle.ebike_battery_level;
        progressbar.max = 100;
    
        let percentageText = document.createTextNode(vehicle.ebike_battery_level + "%");
       
    
        let progressColor;
        if (vehicle.ebike_battery_level < 20) {
            detailsDiv.style.color = "#d9af5e";
            progressbar.className = 'progressbar percent_20';

        } else if (vehicle.ebike_battery_level >= 20 && vehicle.ebike_battery_level < 50) {
            detailsDiv.style.color = "#377692";
            progressbar.className = 'progressbar percent_50';

        } else if (vehicle.ebike_battery_level >= 50) {
            detailsDiv.style.color = "#869F80";
            progressbar.className = 'progressbar percent_100';
        }

        detailsDiv.appendChild(progressbar);
        detailsDiv.appendChild(percentageText);
    }


    let button = document.createElement('button');
    button.className = 'button';
    button.textContent = "Reservieren";
    button.dataset.vehicle = "v" + vehicle.name;

    let isReserved = false;
    // Add event listener to the existing button to show the overlay
    button.addEventListener('click', function (event) {
        let parent = this.closest(".vehicleCard");
        let h2Element = parent.querySelector('.cardHeader h2');

        if (!isReserved) {
            button.textContent = "Reserviert";
            button.style.backgroundColor = "var(--Gray-3, #828282)";
            h2Element.style.color = "#828282";

            if (vehicle.ebike_battery_level == null) {
                document.getElementById(event.target.dataset.vehicle).src = '../images/bikeIcon-crossed.svg';

            } else {
                document.getElementById(event.target.dataset.vehicle).src = '../images/ebikeIcon-crossed.svg';
            }
            isReserved = true;
        } else {
            // Change button text back to original
            button.textContent = "Reservieren";
            button.style.backgroundColor = "var(--blau, #265970)";
            h2Element.style.color = "#265970";

            // Restore original vehicle icon
            if (vehicle.ebike_battery_level == null) {
                document.getElementById(event.target.dataset.vehicle).src = '../images/bikeIcon.svg';
            } else {
                document.getElementById(event.target.dataset.vehicle).src = '../images/ebikeIcon.svg';
            }

            // Update reservation state to false
            isReserved = false;
        }
    });
    // Append the button to the document body (or to a specific container)
    document.body.appendChild(button);

    card.appendChild(cardHeader);
    distanceDiv.appendChild(directionIcon);


    card.appendChild(detailsDiv);
    card.appendChild(distanceDiv);
    card.appendChild(button);

    app.appendChild(card);
}