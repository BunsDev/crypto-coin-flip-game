window.addEventListener('load', () => {
  // swissFranc = three(); //initialize coin
  //setTimeout(1000); ////initialize coin 1sec after load. Without the timeout there are issues due to div resizing
  //setTimeout(() => swissFranc.stopAnimation("heads"), 2000); //stop initial coin animation after 2sec
  //Set the max bet value to contract balance (i.e money in jackpot)
  
 setTimeout(() => {
  if(!window.ethereum) return;//ignore this function in case of non-ethereum browser
  window.ethereum.on('networkChanged', function (netId) {
    console.log("network has changed. New id: " + netId);
    loadWeb3(1); //load all relevant infos in order to interact with Ethereum
  })
}, 500);
	loadWeb3(1);
  //checkapprove();
   setTimeout(() => toggleBlur(), 1000);
  getEthFiatRate(); //Get current ETH-fiat exchange rate from Cryptocompare
  //getLatestGameData();
  document.querySelector("#amount-to-bet").max = 5000;
  
});

//document.querySelector("#approve-contract").innerHTML="<b style='color:Tomato;'>demo on</b>";
//Launch play() when user clicks on play button
document.getElementById('bull').onclick = function()
   {
       const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(0, amountToBetEther);
       headsOrTailsSelection=0;
   }
document.getElementById('bear').onclick = function()
   {
       const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(1, amountToBetEther);
       headsOrTailsSelection=1;
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
async function play(headsOrTailsSelection, amountToBetEther) {
  const amountToBetWei = ethers.utils.parseEther(amountToBetEther);
  // console.log(amountToBetWei);
  console.log("Amount to bet (Wei): " + amountToBetWei);
  //Reload contract variable in case user has changed account in Metamask after page load.
  //Bullbear = new ethers.Contract(contractAddress, abi, provider.getSigner());
	
	
	
	//const data = TokenContract.transfer(contractAddress,amountToBetEther*100000000);
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
	//TokenContract.methods.approve(contractAddress,1000).send();
    // console.log("Side selection send to contract: " + headsOrTailsSelection);
	  //Bullbear.playgame(headsOrTailsSelection,amountToBetEther*100000000);
    let tx = await Bullbear.BullBearGame(headsOrTailsSelection,amountToBetEther, overrides);//In case of failure it jumps straight to catch()
    //scrollDown(); //Scroll to coin animation
    //swissFranc.animateCoin();//start coin animation
    //togglePlayButton(); //deactivate play button functionality
    document.querySelector(".imgresult").innerHTML = "<img src='img/bb.gif' alt='BullBear' width='300' height='300'>";
    //document.querySelector(".infotext").innerHTML = "<b>Game starting!</b><br>Please wailt for result";
    console.log(tx.hash);
    logEvent();
  } catch (err) {
    console.log(err.message); // Error message in case user rejected transfer
    toggleBlur();
  }
}

//Await GameResult event. Then stop coin animation on right side, update game history and jackpot.
function logEvent() {
  Bullbear.once("BullBearGameResult", (side, event) => {
    // console.log(event);
    console.log("Bet on: " + ((headsOrTailsSelection === 0) ? 'Bull' : 'Bear'));
    console.log("Result: " + ((side === 0) ? 'Bull' : 'Bear'));
    const msg = (side === headsOrTailsSelection) ? "<b style='color:MediumSeaGreen;'>You won!</b>" : "<b style='color:Tomato;'>You lost!</b>";
    // console.log(msg);
    let imgrs="";
    if(side==0) imgrs="<img src='img/bull.png' alt='bull' width='300' height='300'>";
    else if(side == 1) imgrs="<img src='img/bear.png' alt='bear' alt='bull' width='300' height='300'>";
   // loadWeb3(1);
      //togglePlayButton(); //activate play button functionality
      getBullBearLatestGameData();
      document.querySelector(".imgresult").innerHTML = imgrs //Show image result 
      document.querySelector(".infotext").innerHTML = msg //Show message
   
  });
}

//Scroll down to coin animation after click on "Play"
function scrollDown() {
  const coinAnimation = document.querySelector(".result-coin");
  setTimeout(function () { coinAnimation.scrollIntoView(); }, 10); //Without delay scrollIntoView does not work.
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
function toggleApprove3Button() {
  const ApproveButton = document.querySelector(".play-button3");
  if (ApproveButton.disabled) ApproveButton.disabled = "";
  else ApproveButton.disabled = "disabled";
}
