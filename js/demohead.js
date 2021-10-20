// The Contract interface
const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "MinerAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBullBearGameCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "startMiner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getOneTwoThreeGameEntry",
		"outputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountBet",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "guess",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "winner",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "ContractBalance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLotteryGameCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "checkMiner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint8",
				"name": "guess",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "OneTwoThreeGame",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getOneTwoThreeGameCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "checkGetCash",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "CalReward",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "EndMiner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "GetAdress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getBullBearGameEntry",
		"outputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountBet",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "guess",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "winner",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "ContractBalance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "AproveContract",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint8",
				"name": "guess",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "LotteryGame",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "destroy",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdrawCash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "StartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Cash",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "GetCashTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "GetFreeCash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "OneDayTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getLotteryGameEntry",
		"outputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountBet",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "guess",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "winner",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "ContractBalance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "EndTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint8",
				"name": "guess",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BullBearGame",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "side",
				"type": "uint8"
			}
		],
		"name": "BullBearGameResult",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "side",
				"type": "uint8"
			}
		],
		"name": "LotteryGameResult",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "side",
				"type": "uint8"
			}
		],
		"name": "OneTwoThreeGameResult",
		"type": "event"
	}
];

const TokenAbi =[
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];


//Global variables
let Bullbear;
let ethUsd;
const deployedNetwork = 97;//To which network is the contract deployed? Ganache: 5777, Ropsten: 3, Mainnet: 1
const contractAddress = "0xFf060274C43Bb79536688b2D3C728907C9A16334";//Contract address on Ropsten
// const contractAddress = "0x1e03A56F8bcb6f7F40288d630AB5f8Db0C6aa327";//Contract address on Ganache
let provider;
let signer;
let swissFranc;
let headsOrTailsSelection;
const tokenAddress = "0x680A702b15E20F710D92Ca50A53F1F596474C2D3";
//let decimals = web3.toBigNumber(8);
//const checkapprove=0;
//const ethereum = window.ethereum;
//const web3 = window.web3;
//const web3Instance = new Web3(ethereum);
//const enabledWeb3 = await ethereum.enable();
let ApproveContract;



//Reload web3 on network change (setTimeout needed, because else "window.ethereum.on('networkChanged',..."
//would be triggered on page load --> loadWeb3() would be fired twice)
setTimeout(() => {
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

//const accounts = await ether.getAccounts();
//const Accountaddress = accounts[0];
  Bullbear = new ethers.Contract(contractAddress, abi, signer);
  TokenContract = new ethers.Contract(tokenAddress, TokenAbi, provider.getSigner());
  //document.querySelector("#demo-button").innerText = "accounts";
  // console.log(headsOrTails);

  //Populate table of last played games & Display amount of ETH in jackpot
   let adr = await Bullbear.GetAdress();
  let cash = await Bullbear.Cash(adr);
  //let checkMiner = await ;
  let tkbalance = await TokenContract.balanceOf(adr);
  ApproveContract=await Bullbear.AproveContract(adr);	
  document.querySelector("#user-address").innerHTML = adr.slice(0, 4) + "..." + adr.slice(-4);
  
  document.querySelector("#address-balance").innerHTML = (tkbalance/100000000).toFixed(2);
  //Set the max bet value to contract balance (i.e money in jackpot)
  //document.querySelector("#amount-to-bet").max = 1000000;
  //document.querySelector("#amount-to-bet").max = currentBalanceEth;
  let getcashtime = await Bullbear.GetCashTime(adr);
  let datenext= getcashtime+ 864000;
  let date_now = new Date();
  let timcount=datenext-date_now;
  let minutes = Math.floor(timcount/60);
  let hours = Math.floor(minutes/60);
  let adr = await Bullbear.GetAdress();
  let cash = await Bullbear.Cash(adr);
  let tkbalance = await TokenContract.balanceOf(adr);
  ApproveContract=await Bullbear.AproveContract(adr);	
  document.querySelector("#user-address").innerHTML = adr.slice(0, 4) + "..." + adr.slice(-4);
  document.querySelector("#cash-balance").innerHTML = cash;
  document.querySelector("#address-balance").innerHTML = (tkbalance/100000000).toFixed(2);
}
//const web3 = new Web3(window.ethereum);
//await window.ethereum.enable();
//const TokenContract = web3.eth.Contract(TokenAbi, tokenAddress);
//Bullbear = new ethers.Contract(contractAddress, abi, provider.getSigner());
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
