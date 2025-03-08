const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");

dropdowns.forEach((select) => {
  for (const currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currencyCode;
    newOption.innerText = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currencyCode === "BDT") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", function (evt) {
    updateFlag(evt.target);
  });
});

// update flag
function updateFlag(element) {
  const flagImg = element.parentElement.querySelector("img");
  const countryCode = countryList[element.value];
  flagImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// exchange rate btn handler
btn.addEventListener("click", function (evt) {
  evt.preventDefault();
  updateExchangeRate();
});

// update exchange rate function
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");

  if (amount.value < 1 || amount.value === "") {
    amount.value = 1;
  }

  //   get currency api
  const url = `https://open.er-api.com/v6/latest/${fromCurrency.value}`;
  const response = await fetch(url);
  const data = await response.json();
  const rate = data.rates[toCurrency.value];
  let finalAmount = rate * amount.value;
  msg.innerText = `${amount.value} ${fromCurrency.value} = ${toCurrency.value} ${finalAmount}`;
};

window.addEventListener("load", function () {
  updateExchangeRate();
});
