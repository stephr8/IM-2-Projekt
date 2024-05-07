const app = document.querySelector('#app');


async function fetchData() {
    let url = "../130_extract.php";
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
    for (station of data) {
        //(vehicles.name == "101503")

        if (station.id === 870 || station.id === 879) {
            station.vehicles.forEach(vehicle => {
                console.log(vehicle);
                createCard(vehicle, station);
            });
        }
        //  || stations.name == "Fachhochschule Graubünden Pulvermühlestrasse")
    }

}

function createCard(vehicle, station) {
    // console.log("creating card");
    let card = document.createElement('div');
    card.className = 'vehicleCard';

    let cardHeader = document.createElement('div');
    cardHeader.className = 'cardHeader';
    let smalliconBike = document.createElement('img');
    smalliconBike.src = '../images/smallicon-bike.svg';
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


    let distanceDiv = document.createElement('div');
    distanceDiv.className = 'distanceDiv';
    if (station.id === 870) {
        distanceDiv.textContent = "40m";
    } else {
        distanceDiv.textContent = "300m";
    }

    let detailsDiv = document.createElement('div');
    detailsDiv.className = 'detailsDiv';



    detailsDiv.textContent = vehicle.ebike_battery_level;
    if (vehicle.ebike_battery_level == null) {
        detailsDiv.textContent = "Dieses Velo ist kein E-Bike.";
    }
    if (vehicle.ebike_battery_level < 20) {
        detailsDiv.style.color = "red";
    }
    if (vehicle.ebike_battery_level > 20 && vehicle.ebike_battery_level < 50) {
        detailsDiv.style.color = "orange";
    }
    if (vehicle.ebike_battery_level > 50) {
        detailsDiv.style.color = "green";
    }
    if (vehicle.ebike_battery_level == null) {
        detailsDiv.style.color = "black";
    }

    if (vehicle.ebike_battery_level != null) {
        let progressbar = document.createElement('progress');
        progressbar.className = 'progressbar';
        progressbar.value = vehicle.ebike_battery_level;
        progressbar.max = 100;

        detailsDiv.appendChild(progressbar);
    }



    // Function to create and show the overlay
    function showOverlay() {
        // Create overlay elements
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black background
        overlay.style.display = 'none'; // Hide overlay initially
        overlay.style.zIndex = '1000'; // Ensure overlay is on top of other elements

        const overlayContent = document.createElement('div');
        overlayContent.className = 'overlay-content';
        overlayContent.style.position = 'absolute';
        overlayContent.style.top = '50%';
        overlayContent.style.left = '50%';
        overlayContent.style.transform = 'translate(-50%, -50%)';
        overlayContent.style.backgroundColor = 'white';
        overlayContent.style.padding = '20px';
        overlayContent.style.borderRadius = '8px';

        let overlayHeading = document.createElement('h2');
        overlayHeading.textContent = "Velo " + vehicle.name + " wird für 15 min reserviert.";
        overlayContent.appendChild(overlayHeading);


        let overlayParagraph = document.createElement('p');
        overlayParagraph.textContent = station.address + "  " + station.zip + "  " + station.city;
        overlayContent.appendChild(overlayParagraph);

        const closeOverlayBtn = document.createElement('button');
        closeOverlayBtn.textContent = 'Close Overlay';
        closeOverlayBtn.style.padding = '10px 20px';
        closeOverlayBtn.style.fontSize = '16px';
        closeOverlayBtn.style.cursor = 'pointer';
        closeOverlayBtn.style.border = 'none';
        closeOverlayBtn.style.borderRadius = '4px';
        closeOverlayBtn.style.backgroundColor = '#007bff';
        closeOverlayBtn.style.color = 'white';
        closeOverlayBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
        });

        overlayContent.appendChild(closeOverlayBtn);
        overlay.appendChild(overlayContent);

        // Append overlay to the document body
        document.body.appendChild(overlay);

        // Show overlay
        overlay.style.display = 'block';
    }

    // Get reference to your existing button
    let button = document.createElement('button');
    button.className = 'button';
    button.textContent = "Reservieren";

    // Add event listener to the existing button to show the overlay
    button.addEventListener('click', showOverlay);

    // Append the button to the document body (or to a specific container)
    document.body.appendChild(button);

    card.appendChild(cardHeader);
    distanceDiv.appendChild(directionIcon);


    card.appendChild(detailsDiv);
    card.appendChild(distanceDiv);
    card.appendChild(button);

    app.appendChild(card);
}