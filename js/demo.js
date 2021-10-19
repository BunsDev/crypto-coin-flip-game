window.addEventListener('load', () => {
  // swissFranc = three(); //initialize coin
  //setTimeout(1000); ////initialize coin 1sec after load. Without the timeout there are issues due to div resizing
  //setTimeout(() => swissFranc.stopAnimation("heads"), 2000); //stop initial coin animation after 2sec
  setTimeout(() => toggleBlur(), 1000);
  getEthFiatRate(); //Get current ETH-fiat exchange rate from Cryptocompare
  getLatestGameData();
  getContractBalance();
});

//Launch play() when user clicks on play button
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  //Find out which radio button is selected and how much money is bet.
  const amountToBetEther = document.querySelector("#amount-to-bet").value;
  headsOrTailsSelection = parseInt(document.querySelector(":checked").value);
  // console.log("0 or 1: " + headsOrTailsSelection);
  // console.log("Amount to bet (ETH): " + amountToBetEther);
  play(headsOrTailsSelection, amountToBetEther);
});
document.getElementById('btO').onclick = function()
   {
	const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(0, amountToBetEther);
       headsOrTailsSelection=0;
   }
document.getElementById('bt1').onclick = function()
   {
	const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(1, amountToBetEther);
       headsOrTailsSelection=1;
   }
document.getElementById('bt2').onclick = function()
   {
	const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(2, amountToBetEther);
       headsOrTailsSelection=2;
   }
document.getElementById('bt3').onclick = function()
   {
	const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(3, amountToBetEther);
       headsOrTailsSelection=3;
   }
document.getElementById('bt4').onclick = function()
   {
	const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(4, amountToBetEther);
       headsOrTailsSelection=4;
   }
document.getElementById('bt5').onclick = function()
   {
	const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(5, amountToBetEther);
       headsOrTailsSelection=5;
   }
document.getElementById('bt6').onclick = function()
   {
	const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(6, amountToBetEther);
       headsOrTailsSelection=6;
   }
document.getElementById('bt7').onclick = function()
   {
	const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(7, amountToBetEther);
       headsOrTailsSelection=7;
   }
document.getElementById('bt8').onclick = function()
   {
	const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(8, amountToBetEther);
       headsOrTailsSelection=8;
   }
document.getElementById('bt9').onclick = function()
   {
	const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(9, amountToBetEther);
       headsOrTailsSelection=9;
   }
document.getElementById("form3").addEventListener("submit", (event) => {
  event.preventDefault();
  Approve();
});


//Calculate fiat value during input of bet amount and show on page
document.getElementById("amount-to-bet").addEventListener("input", () => {
  const amountToBetEther = document.querySelector("#amount-to-bet").value;
  // console.log(amountToBetEther);
  document.querySelector("#bet-in-dollar").innerText = calcFiat(amountToBetEther);
  document.querySelector("#bet-in-eth2").innerText = amountToBetEther * 2;
  document.querySelector("#bet-in-dollar2").innerText = calcFiat(amountToBetEther) * 2;
});

//Reload web3 on network change (setTimeout needed, because else "window.ethereum.on('networkChanged',..."
//would be triggered on page load --> loadWeb3() would be fired twice)
/*setTimeout(() => {
  if(!window.ethereum) return;//ignore this function in case of non-ethereum browser
  window.ethereum.on('networkChanged', function (netId) {
    console.log("network has changed. New id: " + netId);
    loadWeb3(); //load all relevant infos in order to interact with Ethereum
  })
}, 500);

//Load web3 interface or get read access via Infura
async function loadWeb3() {
  // Connect to the network
  // Modern dapp browsers...
  if (window.ethereum) {
    try {
      // Request account access if needed
      await ethereum.enable();//If this doesn't work an error is thrown
      console.log("User has a MODERN dapp browser!");
      showAlert("You are ready to play!", "success");
      provider = new ethers.providers.Web3Provider(ethereum);
      // console.log(provider);
	
      // Acccounts now exposed. Load the contract!
      // loadBlockchainData();
    } catch (error) {
      console.log("There was and error: ", error.message);//In case user denied access
      showAlert("App needs access your account in order to play", "fail");
      //Load blockchain and contract data (jackpot, last games) via ethers default provider (Infura, Etherscan)
      provider = ethers.getDefaultProvider('ropsten');
    }
  }
  // Legacy dapp browsers (acccounts always exposed)...
  else if (window.web3) {
    provider = new ethers.providers.Web3Provider(web3.currentProvider);
    console.log("User has a LEGACY dapp browser!");
    showAlert("You are ready to play!", "success");
    // loadBlockchainData();
  }
  // Non-dapp browsers...
  else {
    //Load blockchain and contract data (jackpot, last games) via ethers default provider (Infura, Etherscan)
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    showAlert("Non-Ethereum browser detected. You should consider trying MetaMask in order to play", "fail");
    provider = ethers.getDefaultProvider('ropsten');
    // console.log(provider);
    // loadBlockchainData();
  }
  loadBlockchainData();
}
//const account = await web3Instance.eth.getAccounts();
//const accountAddress = await account[0];
//Load contract information and define signer & provider
async function loadBlockchainData() {
  //Show link to contract on Etherscan and link to Github repository
  contractAddressShortened = contractAddress.slice(0, 4) + "..." + contractAddress.slice(-4);
  document.querySelector(".contract-address").innerHTML = '<a href="https://testnet.bscscan.com/address/' + contractAddress + '">' + contractAddressShortened + '</a> Code on Github: <a href="https://github.com/rene78/Heads-Or-Tails">Heads or Tails</a>';

  //First check if contract is deployed to the network
  let activeNetwork = await provider.getNetwork(provider);
  // console.log(activeNetwork);

  if (activeNetwork.chainId === deployedNetwork) {
    //When connected via Metamask (i.e. "provider.connection" defined) define a signer (for read-write access),
    //else (i.e. non-ethereum browser) use provider (read access only)
    if (provider.connection) signer = provider.getSigner(); else signer = provider;

  } else {
    //Ethereum enabled browser, but wrong network selected.
    showAlert("Please switch to Ropsten test net in order to play", "fail");
    provider = ethers.getDefaultProvider('ropsten');//switch back to default provider in order to read game data and jackpot
    signer = provider; //read only
  }

  Bullbear = new ethers.Contract(contractAddress, abi, signer);
  TokenContract = new ethers.Contract(tokenAddress, TokenAbi, provider.getSigner());
  document.querySelector(".infotext").innerHTML = "<b>Select 1 unique numbers from 0 to 9</b>";
  //Populate table of last played games & Display amount of ETH in jackpot
  getLatestGameData();
  getContractBalance();
}

async function Approve() {
  //Reload contract variable in case user has changed account in Metamask after page load.
  //Define some custom settings when initiating the contract function
  try {
    TokenContract.approve(contractAddress,1000000000000000);  
    document.cookie=await Bullbear.GetAdress();
    ApproveContract=1;
  } catch (err) {
    console.log(err.message); // Error message in case user rejected transfer
  }
		 
}

*/

//Launch game
async function play(headsOrTailsSelection, amountToBetEther) {
  const amountToBetWei = ethers.utils.parseEther(amountToBetEther);
  console.log("Amount to bet (Wei): " + amountToBetWei);
  //Reload contract variable in case user has changed account in Metamask after page load.
  //Define some custom settings when initiating the contract function
  let overrides = {
    // The maximum units of gas for the transaction to use
    gasLimit: 500000,

    // The price (in wei) per unit of gas
    gasPrice: ethers.utils.parseUnits('50.0', 'gwei'),
	  

    // The amount to send with the transaction (i.e. msg.value)
    value: 0
  };

  try {
    toggleBlur(); //blur all irrelevant divs
    let tx = await Bullbear.LotteryGame(headsOrTailsSelection,amountToBetEther, overrides);//In case of failure it jumps straight to catch()
    togglePlayButton(); //deactivate play button functionality
    document.querySelector(".imgresult").innerHTML = "<img src='img/numberrun.gif' width='150' height='150'>";
    console.log(tx.hash);
    logEvent();
  } catch (err) {
    console.log(err.message); // Error message in case user rejected transfer
    toggleBlur();
  }
}

//Await GameResult event. Then stop coin animation on right side, update game history and jackpot.
function logEvent() {
  Bullbear.once("LotteryGameResult", (side, event) => {
    const msg = (side === headsOrTailsSelection) ? "<b style='color:MediumSeaGreen;'>You won!</b>" : "<h1 style='color:Tomato;'>You lost!</h1>";
    let imgrs="<img src='img/n0" + side + ".png' width='150' height='150'>";
    togglePlayButton(); //activate play button functionality
    //getLatestGameData();
      getContractBalance(); //Display current amount of ETH in jackpot
      document.querySelector(".imgresult").innerHTML = imgrs //Show image result 
      document.querySelector(".infotext").innerHTML = msg //Show message
  });
}

//Scroll down to coin animation after click on "Play"
function scrollDown() {
  const coinAnimation = document.querySelector(".result-coin");
  setTimeout(function () { coinAnimation.scrollIntoView(); }, 10); //Without delay scrollIntoView does not work.
}

//Get current contract balance (jackpot balance)
async function getContractBalance() {
	//TokenContract = new ethers.Contract(tokenAddress, TokenAbi, provider.getSigner());
  const currentBalanceWei = await provider.getBalance(contractAddress);
  const currentBalanceEth = ethers.utils.formatEther(currentBalanceWei);
   let adr = await Bullbear.GetAdress();
  let cash = await Bullbear.Cash(adr);
  let tkbalance = await TokenContract.balanceOf(adr);
  ApproveContract=await Bullbear.AproveContract(adr);	
  document.querySelector("#user-address").innerHTML = adr.slice(0, 4) + "..." + adr.slice(-4);
  document.querySelector("#cash-balance").innerHTML = cash;
  document.querySelector("#address-balance").innerHTML = (tkbalance/100000000).toFixed(2);

  //Set the max bet value to contract balance (i.e money in jackpot)
  document.querySelector("#amount-to-bet").max = 5000;
	
 if(ApproveContract == 1 || (document.cookie).slice(0, 42)==adr)
  {
	ApproveContract=1;
	document.querySelector("#approve-contract").innerHTML="<b style='color:MediumSeaGreen;'>Account is approval!</b>";
  }
  else 
  {
	togglePlayButton();
	document.querySelector("#approve-contract").innerHTML="<b style='color:Tomato;'>Account is not approved, click approve button below to play game!</b>";
  }
}

//Fill out table with latest games
async function getLatestGameData() {
  const gameCount = await Bullbear.getLotteryGameCount();
  //Purge table before populating
  
  document.querySelector("#table-body").innerHTML = "";
  //Populate table
  let t = document.querySelector('#productrow');
  let td = t.content.querySelectorAll("td");
  const maxEntriesToDisplay = 5;
  for (let i = gameCount - 1; i >= 0; i--) {
    const gameEntry = await Bullbear.getLotteryGameEntry(i);
    let result = gameEntry.winner ? "Won" : "Lost";
    let resultClass = gameEntry.winner ? "won" : "lost";//define class to color text red or green
    let guess = gameEntry.guess;
    //Shorten player address
    const addressShortened = gameEntry.addr.slice(0, 3) + "..." + gameEntry.addr.slice(-3);
    td[0].textContent = addressShortened;
    td[1].textContent = gameEntry.amountBet/100000000;
    td[2].textContent = guess;
    td[3].textContent = result;
    td[3].className = "";//remove old class first
    td[3].classList.add(resultClass);
    td[4].textContent = gameEntry.ContractBalance/100000000;

    let tb = document.querySelector("#table-body");
    let clone = document.importNode(t.content, true);
    //Show only the last five games max 
    tb.appendChild(clone);
    if (i <= gameCount - maxEntriesToDisplay) break;
  }
	
}

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

//Toggle activate/deactivate of play button
function togglePlayButton() {
  const playButton = document.querySelector(".play-button");
  if (playButton.disabled) playButton.disabled = "";
  else playButton.disabled = "disabled";
}
