// const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/";

const myApiKey = '55d7e844352e090171a6c94a';

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");

const fromCurrency = document.querySelector(".from select");
const fromCurr = fromCurrency.value;
const toCurrency = document.querySelector(".to select");
const toCurr = toCurrency.value;

const msg = document.querySelector(".msg");

//accessing countryList and it's country code from codes.js file
// for(code in countryList){
//     console.log(code, countryList[code]);
// }

//in this for loop create a variable as select which options from the dropdowns selectors. 
for (let select of dropdowns){

    for(currCode in countryList){

        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) =>{
    // element hold select 
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
    // console.log(countryCode);   
}

btn.addEventListener("click", async (evt) =>{
    evt.preventDefault(); // i could not understand this method?
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 1){
        amtValue = 1;
        amount.value = "1";
    }

    const URL = `https://v6.exchangerate-api.com/v6/${myApiKey}/latest/${fromCurrency.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    const rate = data.conversion_rates[toCurrency.value];
    
    let conversion = amtValue * rate; 

    msg.innerText = `${amtValue} ${fromCurrency.value} = ${conversion} ${toCurrency.value}`;
    
    console.log("Api response "+response);
    console.log(data);
    console.log("To_currency value "+rate);
    console.log("from-to currency conversion "+conversion);
    console.log(fromCurrency.value);
    
})


