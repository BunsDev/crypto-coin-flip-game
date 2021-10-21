window.addEventListener('load', () => {
 setTimeout(() => {
  if(!window.ethereum) return;//ignore this function in case of non-ethereum browser
  window.ethereum.on('networkChanged', function (netId) {
    console.log("network has changed. New id: " + netId);
    loadWeb3(3); //load all relevant infos in order to interact with Ethereum
  })
}, 500);
  loadWeb3(3);
  setTimeout(() => toggleBlur(), 1000);
  getEthFiatRate(); //Get current ETH-fiat exchange rate from Cryptocompare
  document.querySelector("#amount-to-bet").max = 5000;
  
});

document.getElementById('rock').onclick = function()
   {
       const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(0, amountToBetEther);
       headsOrTailsSelection=0;
   }
document.getElementById('paper').onclick = function()
   {
       const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(1, amountToBetEther);
       headsOrTailsSelection=1;
   }
document.getElementById('scissor').onclick = function()
   {
       const amountToBetEther = document.querySelector("#amount-to-bet").value;
       play(2, amountToBetEther);
       headsOrTailsSelection=2;
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

//Await GameResult event. Then stop coin animation on right side, update game history and jackpot.
function logEvent() {
  Bullbear.once("OneTwoThreeGameResult", (side, event) => {
    console.log("Bet on: " + ((headsOrTailsSelection === 0) ? 'Bull' : 'Bear'));
    console.log("Result: " + ((side === 0) ? 'Bull' : 'Bear'));
    let msg = "";
    let imgrs="";
    if (headsOrTailsSelection == side) {
      //Draw!
	msg = "<b>Draw!</b>";
    }
    else if ((headsOrTailsSelection == 0 &&  side == 1)||(headsOrTailsSelection == 1 &&  side == 2)||(headsOrTailsSelection == 2 &&  side == 0))
    {
        //Lost
        msg = "<b style='color:Tomato;'>You lost!</b>";
    }
    else if ((headsOrTailsSelection == 0 &&  side == 2)||(headsOrTailsSelection == 1 &&  side == 0)||(headsOrTailsSelection == 2 &&  side == 1))
    {
        //win 
        msg = "<b style='color:MediumSeaGreen;'>You won!</b>";
    }
    if(side==0) imgrs="<img src='img/Rock.png' alt='rock'>";
    else if(side == 1) imgrs="<img src='img/Paper.png' alt='paper'>";
    else if(side == 2) imgrs="<img src='img/Scissors.png' alt='scissors'>";
      getOneTwoThreeLatestGameData();
      document.querySelector(".imgresult").innerHTML = imgrs //Show image result 
      document.querySelector(".infotext").innerHTML = msg //Show message
 
  });
}



//Launch game
async function play(headsOrTailsSelection, amountToBetEther) {
  const amountToBetWei = ethers.utils.parseEther(amountToBetEther);
  console.log("Amount to bet (Wei): " + amountToBetWei);
  let overrides = {
    // The maximum units of gas for the transaction to use
    gasLimit: 500000,
    // The price (in wei) per unit of gas
    gasPrice: ethers.utils.parseUnits('50.0', 'gwei'),
    // The amount to send with the transaction (i.e. msg.value)
    value: 0
  };

  try {
    let tx = await Bullbear.OneTwoThreeGame(headsOrTailsSelection,amountToBetEther, overrides);//In case of failure it jumps straight to catch()
    document.querySelector(".imgresult").innerHTML="";
    document.querySelector(".infotext").innerHTML = "<b>Game starting!</b><br>Please wailt for result";
    console.log(tx.hash);
    logEvent();
  } catch (err) {
    console.log(err.message); // Error message in case user rejected transfer
    toggleBlur();
  }
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
