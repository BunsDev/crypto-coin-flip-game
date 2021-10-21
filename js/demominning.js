window.addEventListener('load', () => {
 setTimeout(() => {
  if(!window.ethereum) return;//ignore this function in case of non-ethereum browser
  window.ethereum.on('networkChanged', function (netId) {
    console.log("network has changed. New id: " + netId);
    loadWeb3(4); //load all relevant infos in order to interact with Ethereum
  })
}, 500);
  loadWeb3(4);
  setTimeout(() => toggleBlur(), 1000);
  getEthFiatRate(); //Get current ETH-fiat exchange rate from Cryptocompare
  document.querySelector("#amount-to-bet").max = 5000;
  
});

document.getElementById('startmining').onclick = function()
   {
       const amountToBetEther = document.querySelector("#amount-to-bet").value;
       Minning(amountToBetEther);
   }
document.getElementById('stopmining').onclick = function()
   {
       EndMinning();
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


//Launch game
async function Minning(amountToBetEther) {
  const amountToBetWei = ethers.utils.parseEther(amountToBetEther);
  
  //Reload contract variable in case user has changed account in Metamask after page load.
  //Define some custom settings when initiating the contract function
  try {
    let tx = await Bullbear.startMiner(amountToBetEther);//In case of failure it jumps straight to catch()
  } catch (err) {
    console.log(err.message); // Error message in case user rejected transfer
  }
		 
}


//Launch game
async function EndMinning() {
  //Reload contract variable in case user has changed account in Metamask after page load.
  //Define some custom settings when initiating the contract function

  try {
    let tx = await Bullbear.EndMiner();//In case of failure it jumps straight to catch()
  } catch (err) {
    console.log(err.message); // Error message in case user rejected transfer
  }
		 
}

//Await GameResult event. Then stop coin animation on right side, update game history and jackpot.
/*function logEvent() {
  Bullbear.once("BullBearGameResult", (side, event) => {
      getMinerStatus();
  });
}*/

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
function toggleApprove3Button() {
  const ApproveButton = document.querySelector(".play-button3");
  if (ApproveButton.disabled) ApproveButton.disabled = "";
  else ApproveButton.disabled = "disabled";
}
