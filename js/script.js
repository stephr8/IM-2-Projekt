const app = document.querySelector('#app');
const url = "https://api.publibike.ch/v1/public/partner/stations";




async function fetchData(url) {
    let url = `https://api.publibike.ch/v1/public/partner/stations`;
    try {
        let stations = await fetch(url); //response in pokemon
        let data = await stations.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

function createCard(bike) {
    let card = document.createElement('div');
    card.className = 'bikeCard';

    let cardHeader = document.createElement('div');
    cardHeader.className = 'cardHeader';

    let nameElement = document.createElement('h2');
    nameElement.textContent = bike.name;
    cardHeader.appendChild(nameElement);
    let typesContainer = document.createElement('div');
    typesContainer.className = 'typesContainer';

    bike.types.forEach(type => {
        let typeIcon = document.createElement('div');
        typeIcon.className = `icon ${type.type.name}`;
        let typeSVG = document.createElement('img');
        typeSVG.src = `./img/${type.type.name}.svg`;
        typeSVG.alt = type.type.name;
        typeIcon.appendChild(typeSVG);
        typesContainer.appendChild(typeIcon);
    });

    cardHeader.appendChild(typesContainer);
    card.appendChild(cardHeader);

    //image

    let detailsDiv = document.createElement('div');
    detailsDiv.className = 'detailsDiv';

    let statsList = document.createElement('ul');
    statsList.className = 'statsList';

    bike.stats.forEach(stat => {
        let statItem = document.createElement('li');
        let statName = document.createElement('strong');
        statName.textContent = `${stat.stat.name}: `;
        statItem.appendChild(statName);
        statItem.appendChild(document.createTextNode(stat.base_stat));
        statsList.appendChild(statItem);
    });

    detailsDiv.appendChild(statsList);
    card.appendChild(detailsDiv);

    app.appendChild(card);
}






// async function fetchData(url){
//     try {
//         let stations = await fetch(url);
//         let data = await stations.json();
//         console.log(data.stations);
//     }
//     catch (error){
//         console.error(error);
//     }
// }

// fetchData(url);

