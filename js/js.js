let forex;
let ticker = "AAA";
let tickerandinfo;

async function init() {
    const reponseinit = await fetch("json/list.json");
    forex = await reponseinit.json();

    listetop();
    carrouselnews();
    tickerandinfos();

    document.getElementById('search').addEventListener('keyup', () => { searchticker() });
    document.getElementById('reset').addEventListener('click', () => { reset() });
    document.getElementById('sortOptions').addEventListener('change', () => { tickerandinfos() });
}

function listetop() {
    //forex.markets.length - 1 pour parcourir tout le tableau
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
        carrousel1.classList.add('w-[100%]', 'md:w-[25%]', 'bg-[url(' + news.feed[j].banner_image + ')]', 'h-[25vh]', 'bg-cover');
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
        `+ tickerandinfo[i].symbol.toUpperCase() +`
        </td>
        <td class="px-6 py-4 isin">
        `+ tickerandinfo[i].isin.toUpperCase() +`
        </td>
        <td class="px-6 py-4">
        `+ tickerandinfo[i].price +`
        $</td>`;
        const ticketinfo = document.getElementById('tickerandinfo');

        ticker1.addEventListener('click', function(){cardInfo(i)});
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
    if (document.getElementById('search').value != "") {
        document.getElementById('search').value = document.getElementById('search').defaultValue;
        location.reload();

    } else {
        document.getElementById('search').disabled;
    }
}

async function cardInfo(index) {
    const tickerinfo = await fetch("json/ticker.json");
    let tickerandinfo = await tickerinfo.json();
    
    const card1 = document.getElementById('cardInfos');
    card1.innerHTML = ''

    let i = index;
    const createCard = document.createElement('article');
    createCard.classList.add('md:w-[80%]', 'p-2');
    createCard.innerHTML = 
        `<a href="`
        + tickerandinfo[i].website +
        `"target="_blank" title=""
        class="flex flex-col items-center bg-[#131326] text-white border rounded-lg shadow md:flex-row">
        <img class="m-4 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src="`
        + tickerandinfo[i].image + 
        `" alt="logo" title=""><div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight cardCompanyName">`
        + tickerandinfo[i].companyName + 
        `</h5><p class="mb-3 font-normal cardSector">`
        + tickerandinfo[i].sector + 
        `</p><p class="mb-3 font-normal cardIndustry">`
        + tickerandinfo[i].industry + 
        `</p><p class="mb-3 font-normal cardCompanyDescription">`
        + tickerandinfo[i].description + 
        `</p>`;

        
        card1.appendChild(createCard);
        
}



