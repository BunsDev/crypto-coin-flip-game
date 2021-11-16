//Global variables
let Bullbear;
let ethUsd;
const deployedNetwork = 97;//To which network is the contract deployed? Ganache: 5777, Ropsten: 3, Mainnet: 1
const contractAddress = "0xFf060274C43Bb79536688b2D3C728907C9A16334";//Contract address on Ropsten
let provider;
let signer;
let swissFranc;
let headsOrTailsSelection;
const tokenAddress = "0x680A702b15E20F710D92Ca50A53F1F596474C2D3";
let ApproveContract;

//Load web3 interface or get read access via Infura
async function loadWeb3(gameid) {
  // Connect to the network
  // Modern dapp browsers...
  if (window.ethereum) {
    try {
      // Request account access if needed
      await ethereum.enable();//If this doesn't work an error is thrown
      console.log("User has a MODERN dapp browser!");
      showAlert("You are ready to play!", "success");
      provider = new ethers.providers.Web3Provider(ethereum);
      // Acccounts now exposed. Load the contract!
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
  }
  // Non-dapp browsers...
  else {
    //Load blockchain and contract data (jackpot, last games) via ethers default provider (Infura, Etherscan)
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    showAlert("Non-Ethereum browser detected. You should consider trying MetaMask in order to play", "fail");
    provider = ethers.getDefaultProvider('ropsten');
  }
  loadBlockchainData(gameid);
}

//Load contract information and define signer & provider
async function loadBlockchainData(gameid) {
  //Show link to contract on Etherscan and link to Github repository
  contractAddressShortened = contractAddress.slice(0, 4) + "..." + contractAddress.slice(-4);
  document.querySelector(".contract-address").innerHTML = '<a href="https://testnet.bscscan.com/address/' + contractAddress + '">' + contractAddressShortened + '</a> © 2021 <a href="https://www.CryptoMiniGames.com">CryptoMiniGames.com</a>';

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
  //Populate table of last played games & Display amount of ETH in jackpot
   let adr = await Bullbear.GetAdress();
  let cash = await Bullbear.Cash(adr);
  //let tkbalance = await TokenContract.balanceOf(adr);
  ApproveContract=await Bullbear.AproveContract(adr);	
  ApproveContract=await Bullbear.AproveContract(adr);	
  document.querySelector("#user-address").innerHTML = adr.slice(0, 4) + "..." + adr.slice(-4);
  document.querySelector("#cash-balance").innerHTML = cash;
  //document.querySelector("#address-balance").innerHTML = (tkbalance/100000000).toFixed(2);
  document.getElementById('approve').onclick = function()
   {
       Approve();
   }
  checkapprove();	
  if(gameid==1) getBullBearLatestGameData();
  else if(gameid==2) getLotteryLatestGameData();
  else if(gameid==3) getOneTwoThreeLatestGameData();
  else if(gameid==4) getMinerStatus();
  else if(gameid==5) getCashStatus();	
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

//Fill out table with latest games
async function getBullBearLatestGameData() {
  const gameCount = await Bullbear.getBullBearGameCount();
  let adr = await Bullbear.GetAdress();
  document.querySelector("#address-balance").innerHTML = (await TokenContract.balanceOf(adr)/100000000).toFixed(2); 
  //Purge table before populating
  document.querySelector("#table-body").innerHTML = "";
  //Populate table
  let t = document.querySelector('#productrow');
  let td = t.content.querySelectorAll("td");
  const maxEntriesToDisplay = 5;
  for (let i = gameCount - 1; i >= 0; i--) {
    const gameEntry = await Bullbear.getBullBearGameEntry(i);
    let result = gameEntry.winner ? "Won" : "Lost";
    let resultClass = gameEntry.winner ? "won" : "lost";//define class to color text red or green
    // console.log(resultClass);
    let guess = gameEntry.guess == 0 ? "Bull" : "Bear";
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
    tb.appendChild(clone);
    //Show only the last five games max
    if (i <= gameCount - maxEntriesToDisplay) break;
  }
}


//Fill out table with Lottery latest games
async function getLotteryLatestGameData() {
  const gameCount = await Bullbear.getLotteryGameCount();
  let adr = await Bullbear.GetAdress();
  document.querySelector("#address-balance").innerHTML = (await TokenContract.balanceOf(adr)/100000000).toFixed(2); 
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

//Fill out table with OneTwoThree latest games
async function getOneTwoThreeLatestGameData() {
  const gameCount = await Bullbear.getOneTwoThreeGameCount();
  let adr = await Bullbear.GetAdress();
  document.querySelector("#address-balance").innerHTML = (await TokenContract.balanceOf(adr)/100000000).toFixed(2); 
  //Purge table before populating
  document.querySelector("#table-body").innerHTML = "";
  //Populate table
  let t = document.querySelector('#productrow');
  let td = t.content.querySelectorAll("td");
  const maxEntriesToDisplay = 5;
  for (let i = gameCount - 1; i >= 0; i--) {
    const gameEntry = await Bullbear.getOneTwoThreeGameEntry(i);
    let result = "";
    let resultClass = "";//define class to color text red or green
    if(gameEntry.winner==0) { result = "Draw"; resultClass = "won"}
    else if(gameEntry.winner==1) 
	    {
		    result = "won";
		    resultClass = "won";
	    }
    else if(gameEntry.winner==2) 
	    {
		    result = "lost";
		    resultClass = "lost";
	    }
    // console.log(resultClass);
    let guess ="";
    if(gameEntry.guess==0) { guess = "Rock"; }
    else if(gameEntry.guess==1) { guess = "Paper"; }
    else if(gameEntry.guess==2) { guess = "Scissors";}

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
    tb.appendChild(clone);
    //Show only the last five games max
    if (i <= gameCount - maxEntriesToDisplay) break;
  }
}

//Fill out table with OneTwoThree latest games
async function getMinerStatus() {
   let adr = await Bullbear.GetAdress();
   let amountMinning = await Bullbear.MinerAmount(adr);
   let Reward = await Bullbear.CalReward();
   let cash = await Bullbear.Cash(adr);
   let tkbalance = await TokenContract.balanceOf(adr);
   document.querySelector("#cash-balance").innerHTML = cash;
   document.querySelector("#address-balance").innerHTML = (tkbalance/100000000).toFixed(2);
   document.querySelector("#amount-minning").innerHTML = amountMinning/100000000;
   document.querySelector("#reward-minning").innerHTML = Reward/100000000;
   if(amountMinning>0) document.querySelector(".imgresult").innerHTML = "<img src='img/Mining.gif' width='500' height='250'>";
   else document.querySelector(".imgresult").innerHTML = "<img src='img/Miner.png' width='500' height='250'>";
}

//Fill out table with OneTwoThree latest games
async function getCashStatus() {
   let adr = await Bullbear.GetAdress();
   let amountMinning = await Bullbear.MinerAmount(adr);
   let Reward = await Bullbear.CalReward();
   let cash = await Bullbear.Cash(adr);
   let tkbalance = await TokenContract.balanceOf(adr);
   document.querySelector("#cash-balance").innerHTML = cash;
   document.querySelector("#address-balance").innerHTML = (tkbalance/100000000).toFixed(2);
   //document.querySelector("#amount-minning").innerHTML = amountMinning/100000000;
   //document.querySelector("#reward-minning").innerHTML = Reward/100000000;
   //if(amountMinning>0) document.querySelector(".imgresult").innerHTML = "<img src='img/Mining.gif' width='500' height='250'>";
   //else document.querySelector(".imgresult").innerHTML = "<img src='img/Miner.png' width='500' height='250'>";
   let getcashtime = await Bullbear.GetCashTime(adr); 
  let datenext= new Date();
	let options = {  
    weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
}; 
	//864000 getcashtime+864000)*1000
  let dates=Math.floor(datenext);
  let year=Math.floor(datenext.getFullYear());
  let mon=Math.floor(datenext.getMonth()+1);
  let day=Math.floor(datenext.getDate());
  let hour=Math.floor(datenext.getHours());
  let min=Math.floor(datenext.getMinutes());
  let sec=Math.floor(datenext.getSeconds());   
  //let date_now = Math.floor( new Date().getTime() / 1000);
  //let timcount=datenext-date_now;
  //let minutes = Math.floor(timcount/60);
  //let hours = Math.floor(minutes/60);
  document.querySelector(".infotext").innerHTML = datenext.toLocaleTimeString("en-us", options);
}


async function checkapprove() {
  let adr = await Bullbear.GetAdress();
  if(ApproveContract == 1 || (document.cookie).slice(0, 42)==adr)
  {
	ApproveContract=1;
	document.querySelector("#approve-contract").innerHTML="<b style='color:MediumSeaGreen;'>Account is approval!</b>";
	toggleApproveButton();
  }
  else 
  {
	document.querySelector("#approve-contract").innerHTML="<b style='color:Tomato;'>Account is not approved, click approve button below to mining CMB!</b>";
  }		 
}

//Toggle activate/deactivate of play button
function toggleApproveButton() {
  const approveButton = document.querySelector(".ApproveButton");
  approveButton.disabled = "disabled";
  approveButton.style.backgroundColor = "#DDDDDD";
}
