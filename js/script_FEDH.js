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

        if (station.id === 879 || station.id === 869) {
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
    if (station.id === 879) {
        distanceDiv.textContent = "400m";
    } else {
        distanceDiv.textContent = "60m";
    }


    distanceDiv.addEventListener('mouseover', () => {
        // distanceDiv.textContent = station.address + '<br>' + station.zip + "  " + station.city;
        distanceDiv.innerHTML = `${station.address}<br>${station.zip}  ${station.city}`;

    });

    distanceDiv.addEventListener('mouseout', () => {
        if (station.id === 879) {
            distanceDiv.innerHTML = "400m";
        } else {
            distanceDiv.innerHTML = "60m";
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
    
        // Style the progress bar
        // progressbar.style.width = '200px';
        // progressbar.style.height = '30px';
        // progressbar.style.border = '3px solid #265970';
        // progressbar.style.borderRadius = '20px';
        // progressbar.style.backgroundColor = '#EBE6D3';
    

        // let progressValue = document.createElement('progressStyle');
        // progressStyle.style.height = '100%';
        // progressStyle.style.width = progressbar.value + '%';
        // progressStyle.style.backgroundColor = progressColor;
        // progressStyle.style.borderRadius = '15px'; 
        // progressStyle.style.transition = 'width 0.4s ease'; 
    
        // Insert the progress value into the progress bar
        // progressbar.appendChild(progressValue);
    
        // Update the progress bar value dynamically
        // progressbar.addEventListener('change', function() {
        //     progressValue.style.width = progressbar.value + '%';
        // });
    }

    // detailsDiv.textContent = vehicle.ebike_battery_level;
    // if (vehicle.ebike_battery_level == null) {
    //     detailsDiv.textContent = "Dieses Velo ist kein E-Bike.";
    //     smalliconBike.src = '../images/bikeIcon.svg';
    // }
    // if (vehicle.ebike_battery_level != null) {
    //     let progressbar = document.createElement('progress');
    //     progressbar.className = 'progressbar';
    //     progressbar.value = vehicle.ebike_battery_level;
    //     progressbar.max = 100;

    //     detailsDiv.appendChild(progressbar);
    // }
    // if (vehicle.ebike_battery_level < 20) {
    //     detailsDiv.style.color = "red";
    // }
    // if (vehicle.ebike_battery_level > 20 && vehicle.ebike_battery_level < 50) {
    //     detailsDiv.style.color = "#38686a";
    // }
    // if (vehicle.ebike_battery_level > 50) {
    //     detailsDiv.style.color = "#2589bd";
    // }
    // var newColorHex = "#265970";

    // if (vehicle.ebike_battery_level == null) {
    //     detailsDiv.style.color = newColorHex;
    // }




    // // Function to create and show the overlay
    // function showOverlay() {
    //     // Create overlay elements
    //     const overlay = document.createElement('div');
    //     overlay.className = 'overlay';
    //     overlay.style.position = 'fixed';
    //     overlay.style.top = '0';
    //     overlay.style.left = '0';
    //     overlay.style.width = '100%';
    //     overlay.style.height = '100%';
    //     overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black background
    //     overlay.style.display = 'none'; // Hide overlay initially
    //     overlay.style.zIndex = '1000'; // Ensure overlay is on top of other elements

    //     const overlayContent = document.createElement('div');
    //     overlayContent.className = 'overlay-content';
    //     overlayContent.style.position = 'absolute';
    //     overlayContent.style.top = '50%';
    //     overlayContent.style.left = '50%';
    //     overlayContent.style.transform = 'translate(-50%, -50%)';
    //     overlayContent.style.backgroundColor = 'white';
    //     overlayContent.style.padding = '20px';
    //     overlayContent.style.borderRadius = '8px';

    //     function startTimer() {
    //         var overlay = document.getElementById("overlay");
    //         overlay.style.display = "flex";

    //         var timerElement = document.getElementById("timer");
    //         var duration = 15 * 60; // 15 minutes in seconds

    //         var timerInterval = setInterval(function () {
    //             var minutes = Math.floor(duration / 60);
    //             var seconds = duration % 60;

    //             timerElement.textContent = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

    //             if (--duration < 0) {
    //                 clearInterval(timerInterval);
    //                 timerElement.textContent = "00:00"; // Freeze on zero
    //             }
    //         }, 1000);
    //     }

    //     let overlayHeading = document.createElement('h2');
    //     overlayHeading.textContent = "Velo " + vehicle.name + " wird für 15 min reserviert";
    //     overlayContent.appendChild(overlayHeading);


    //     let overlayParagraph = document.createElement('p');
    //     overlayParagraph.textContent = station.address + "  " + station.zip + "  " + station.city;
    //     overlayContent.appendChild(overlayParagraph);

    //     const closeOverlayBtn = document.createElement('button');
    //     closeOverlayBtn.textContent = 'Close Overlay';
    //     closeOverlayBtn.style.padding = '10px 20px';
    //     closeOverlayBtn.style.fontSize = '16px';
    //     closeOverlayBtn.style.cursor = 'pointer';
    //     closeOverlayBtn.style.border = 'none';
    //     closeOverlayBtn.style.borderRadius = '4px';
    //     closeOverlayBtn.style.backgroundColor = '#007bff';
    //     closeOverlayBtn.style.color = 'white';
    //     closeOverlayBtn.addEventListener('click', () => {
    //         overlay.style.display = 'none';
    //     });

    //     overlayContent.appendChild(closeOverlayBtn);
    //     overlay.appendChild(overlayContent);

    //     // Append overlay to the document body
    //     document.body.appendChild(overlay);

    //     // Show overlay
    //     overlay.style.display = 'block';
    // }



    // Get reference to your existing button
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