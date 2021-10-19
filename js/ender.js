//Get ETH-USD/EUR exchange rate from cryptocompare
function getEthFiatRate() {
  const url = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR";
  fetch(url)
    .then(handleErrors)
    .then(res => {
      return res.json();
    })
    .then(data => {
      // console.log(data.USD);
      ethUsd = data.USD;
      // return (data.EUR);
    })
    .catch(error => {
      console.error(error);
      ethUsd = 170; //Define static value, if download didn't work
    });
}

//Handle errors from fetch operation
function handleErrors(response) {

  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

//Convert ETH in USD
function calcFiat(etherToConvert) {
  return (etherToConvert * ethUsd).toFixed(2);
}

//Show alert with custom message
function showAlert(text, colorClass) {
  var contractInfo = document.querySelector(".contract-info");
  contractInfo.innerHTML = text;
  contractInfo.style.display = "block";
  contractInfo.className = "contract-info to-blur"; //remove all former classnames, i.e. success, fail
  contractInfo.classList.add(colorClass);
}

//Blur all elements with class "to-blur"
function toggleBlur() {
  const elements = document.querySelectorAll(".to-blur");
  // console.log(elements);
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.toggle("wait");
  }
}
