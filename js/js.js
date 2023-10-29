let forex;
let ticker = "AAA";
let tickerandinfo;


async function init() {
    const reponseinit = await fetch("../json/list.json");
    forex = await reponseinit.json();

    listetop();
    carrouselnews();
    tickerandinfos();

    document.getElementById('search').addEventListener('keyup', () => { searchticker() });
    document.getElementById('reset').addEventListener('click', () => { reset() });
    document.getElementById('Tri').addEventListener('click', () => { Tri() });
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
    const carrousel = await fetch("../json/article.json");
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

    //https://financialmodelingprep.com/api/v3/profile/"+ticker+"?apikey=fDWc2uOdhCZfmUNgorsLSIRk4rOYBNyd
    const tickerinfo = await fetch("../json/ticker.json");
    tickerandinfo = await tickerinfo.json();

    for (let i = 0; i < tickerandinfo.length; i++) {

        const ticker1 = document.createElement('tr');
        ticker1.classList.add('bg-white', 'dark:bg-[#131326]', 'hover:bg-gray-50', 'dark:hover:bg-gray-800', 'text-white', 'tickerandinfo');
        ticker1.innerHTML =
            `<th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white company">
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
        ticketinfo.appendChild(ticker1)

    }
}

async function searchticker() {
    // ticker = document.getElementById('search').value;
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

async function Tri() {

}