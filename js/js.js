let forex;
let tickerandinfo;

async function init() {
    const reponseinit = await fetch("json/list.json");
    forex = await reponseinit.json();

    listetop();
    carrouselnews();
    tickerandinfos();
    graph();

    document.getElementById('search').addEventListener('keyup', () => { searchticker() });
    document.getElementById('reset').addEventListener('click', () => { reset() });
    document.getElementById('sortOptions').addEventListener('change', () => { tickerandinfos() });
    document.getElementById('charts').style.display = "none";
}


function listetop() {
    //forex.markets.length - 1 pour parcourir tout le tableau
    if (window.matchMedia("(min-width: 640px)").matches) {
        for (let i = 0; i < 5; i++) {

            j = getRandomInt(forex.length - 1);
            const listetop = document.createElement('article');
            listetop.classList.add('w-[15%]', 'flex', 'flex-col', 'items-center', 'bg-[#131326]', 'text-center', 'mb-1', 'rounded-md', 'p-2', 'text-white', 'shadow-[0_3px_6px_0_rgba(0,0,0,1)]');
            listetop.innerHTML =
                `<h3 class="text-sm truncate w-[100%]" id="stocklist" title="` + forex[j].name + `">` + forex[j].name + `</h3>
    <p class="text-sm" id="pricelist">Prix : <span class="text-[#F07338]" title="`+ forex[j].price + `">` + forex[j].price + `</span>$</p>
    <p class="text-sm" id="typelist">Type : <span class="text-[#F07338]">`+ forex[j].type + `</span></p>`;
            const stockarticle = document.getElementById('stockarticle');
            stockarticle.appendChild(listetop);

        }
    } else {
        for (let i = 0; i < 3; i++) {

            j = getRandomInt(forex.length - 1);
            const listetop = document.createElement('article');
            listetop.classList.add('w-[25%]', 'flex', 'flex-col', 'items-center', 'bg-[#131326]', 'text-center', 'mb-1', 'rounded-md', 'p-2', 'text-white', 'shadow-[0_3px_6px_0_rgba(0,0,0,1)]');
            listetop.innerHTML =
                `<h3 class="text-sm truncate w-[100%]" id="stocklist" title="` + forex[j].name + `">` + forex[j].name + `</h3>
    <p class="text-sm" id="pricelist">Prix : <span class="text-[#F07338]" title="`+ forex[j].price + `">` + forex[j].price + `</span>$</p>
    <p class="text-sm" id="typelist">Type : <span class="text-[#F07338]">`+ forex[j].type + `</span></p>`;
            const stockarticle = document.getElementById('stockarticle');
            stockarticle.appendChild(listetop);

        }
    }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


async function carrouselnews() {
    const carrousel = await fetch("json/article.json");
    news = await carrousel.json();

    for (let i = 0; i < 4; i++) {

        j = getRandomInt(news.feed.length - 1);
        const carrousel1 = document.createElement('div');
        carrousel1.classList.add('w-[100%]', 'lg:w-[25%]', 'bg-[url(' + news.feed[j].banner_image + ')]', 'h-[25vh]', 'bg-cover', 'object-fill');
        carrousel1.innerHTML =
            `<a href="` + news.feed[j].url + `" target="_blank" class="flex flex-row justify-center items-center h-[25vh]">
            <p class="relative w-[100%] top-0 text-white bg-[#131326]/50 backdrop-blur-2xl p-2 h-auto md:h-[6.5vh] line-clamp-1 md:line-clamp-2" title="`+ news.feed[j].title + `">` + news.feed[j].title + `</p></a>`;
        const carrouselarticle = document.getElementById('carrousel');
        carrouselarticle.appendChild(carrousel1);
    }
}


async function tickerandinfos() {
    const tickerinfo = await fetch("json/ticker.json");
    let tickerandinfo = await tickerinfo.json();

    // Obtenez la valeur actuellement sélectionnée
    const selectedOption = document.getElementById('sortOptions').value;

    // Triez en fonction de l'option sélectionnée
    tickerandinfo.sort((a, b) => {
        if (selectedOption === "price") {
            return a[selectedOption] - b[selectedOption];
        } else {
            return a[selectedOption].localeCompare(b[selectedOption]);
        }
    });

    const ticketinfo = document.getElementById('tickerandinfo');

    // Supprimez les entrées précédentes
    ticketinfo.innerHTML = '';

    // Créez et ajoutez les nouvelles entrées triées
    for (let i = 0; i < tickerandinfo.length; i++) {

        const ticker1 = document.createElement('tr');
        ticker1.classList.add('bg-[#131326]', 'hover:bg-gray-50', 'hover:bg-gray-800', 'text-white', 'tickerandinfo');
        ticker1.setAttribute("id", i);
        ticker1.innerHTML =
            `<th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap text-white company">
            `+ tickerandinfo[i].companyName.toUpperCase() + `
        </th>
        <td class="px-6 py-4 symbol">
        `+ tickerandinfo[i].symbol.toUpperCase() + `
        </td>
        <td class="px-6 py-4 isin">
        `+ tickerandinfo[i].isin.toUpperCase() + `
        </td>
        <td class="px-6 py-4">
        `+ tickerandinfo[i].price + `
        $</td>`;
        const ticketinfo = document.getElementById('tickerandinfo');
        ticker1.addEventListener('click', function () { cardInfo(i) });
        ticker1.addEventListener('click', function () { graph(tickerandinfo[i].symbol) });
        ticker1.addEventListener('click', function () { document.getElementById('charts').style.display = ""; });
        ticketinfo.appendChild(ticker1);
    }
}


async function searchticker() {
    let input = document.getElementById('search').value;
    input = input.toLowerCase();
    let trtab = document.getElementsByClassName('tickerandinfo');
    let company = document.getElementsByClassName('company');
    let symbol = document.getElementsByClassName('symbol');
    let isin = document.getElementsByClassName('isin');


    for (j = 0; j < trtab.length; j++) {
        if (!company[j].innerHTML.toLowerCase().includes(input) && !symbol[j].innerHTML.toLowerCase().includes(input) && !isin[j].innerHTML.toLowerCase().includes(input)) {
            trtab[j].style.display = "none";
        }
        else {
            trtab[j].style.display = "";
        }
    }
    // tickerandinfos();
}


function reset() {
    const searchInput = document.getElementById('search');
    const tickerandinfo = document.getElementsByClassName('tickerandinfo');

    // Pour clear le champ de saisie
    searchInput.value = "";

    // Pour réafficher tous les lignes de la table 
    for (let i = 0; i < tickerandinfo.length; i++) {
        tickerandinfo[i].style.display = "";
    }
}


async function cardInfo(index) {
    const tickerinfo = await fetch("json/ticker.json");
    let tickerandinfo = await tickerinfo.json();


    // Obtenez la valeur actuellement sélectionnée
    const selectedOption = document.getElementById('sortOptions').value;

    // Triez en fonction de l'option sélectionnée
    tickerandinfo.sort((a, b) => {
        if (selectedOption === "price") {
            return a[selectedOption] - b[selectedOption];
        } else {
            return a[selectedOption].localeCompare(b[selectedOption]);
        }
    });

    const card1 = document.getElementById('cardInfos');
    card1.innerHTML = '';

    let i = index;

    const createCard = document.createElement('article');
    createCard.classList.add('w-[100%]', 'p-2', 'flex', 'flex-col', 'items-center', 'bg-[#131326]', 'text-white', 'border', 'rounded-lg', 'shadow', 'md:flex-row');
    createCard.innerHTML =
        ` <img class="m-4 object-fit w-[20%] lg:w-full lg:h-auto rounded-t-lg md:h-auto md:rounded-none md:rounded-l-lg"
        src="`
        + tickerandinfo[i].image +
        `" alt="logo" title=""><div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight cardCompanyName">
        `+ tickerandinfo[i].companyName + `
        </h5>
        <p class="mb-3 font-normal cardSector" id="cardSector">`
        + tickerandinfo[i].sector +
        `</p><p class="mb-3 font-normal cardIndustry" id="cardIndustry">`
        + tickerandinfo[i].industry +
        `</p><p class="mb-3 font-normal text-sm cardCompanyDescription line-clamp-[10]">`
        + tickerandinfo[i].description +
        `</p>
        <span class="flex justify-end">
        <p class="mb-3 font-normal cardCompanyDescription bg-[#F07338] w-[100%] p-2 rounded flex justify-center items-center gap-4" id="infoplus">En savoir plus <i class="fa-solid fa-arrow-right"></i></p>
        </span>
        `;
    card1.appendChild(createCard);

    if (tickerandinfo[i].sector == "" || tickerandinfo[i].industry == null) {
        document.getElementById('cardSector').style.display = "none";
        document.getElementById('cardIndustry').style.display = "none";
    } else {
        document.getElementById('cardSector').style.display = "";
        document.getElementById('cardIndustry').style.display = "";
    }

    if (tickerandinfo[i].website === null) {
        document.getElementById('infoplus').style.display = "none";
    } else {
        document.getElementById('infoplus').addEventListener('click', () => {
            window.open(tickerandinfo[i].website, "_blank")
        });
    }
}


async function graph(index) {
    i = index;
    document.getElementById('charts').innerHTML = "";

    const MonGraph = document.createElement('canvas');
    MonGraph.setAttribute('id', 'myChart');
    MonGraph.setAttribute("style", "width:100%; max-width: 700px;");
    const DivMonGraph = document.getElementById('charts');
    DivMonGraph.appendChild(MonGraph);

    let dateApi = new Date();
    let Jour = dateApi.getDate();
    let Mois = dateApi.getMonth();
    let Annee = dateApi.getFullYear();
    Mois = Mois + 1;
    let JourMoins = Jour - 10;
    console.log(Jour, Mois, Annee);
    const graphdata = await fetch("https://financialmodelingprep.com/api/v3/historical-price-full/" + i + "?from=" + Annee + "-" + Mois + "-" + JourMoins + "&to=" + Annee + "-" + Mois + "-" + Jour + "&apikey=45d176bd77e428255cbe08d1c1e7503f");
    // const graphdata = await fetch("json/datahistory.json");
    let graphvar = await graphdata.json();
    console.log(graphdata);
    let date = [];
    let highPrice = [];

    for (let i = 0; i < 7; i++) {

        date.push(graphvar.historical[i].date);
        date.sort();

        highPrice.push(graphvar.historical[i].high);
        highPrice.sort();
        const xValues = date;

        new Chart("myChart", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    label: 'Prix du ' + graphvar.symbol + ' en Dollar',
                    data: highPrice,
                    borderColor: "blue",
                    fill: false
                }]
            },
            options: {
                legend: { display: true }
            }
        });
    }
}