// Version of Solidity compiler this program was written for
pragma solidity ^0.5.11;

interface IBEP20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
     
    function transfer(address recipient, uint256 amount) external returns (bool);
    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}





// Crypto mini game contract
contract CryptoMiniGame {
  address payable owner;
  string public name;

  struct Game {
    address addr;
    uint amountBet;
    uint8 guess;
    bool winner;
    uint ContractBalance;
  }
  struct stOneTwoThreeGame {
    address addr;
    uint amountBet;
    uint8 guess;
    uint8 winner;
    uint ContractBalance;
  }
  

  Game[] lastPlayedBullBearGames;
  stOneTwoThreeGame[] lastPlayedOneTwoThreeGames;
  Game[] lastPlayedLotteryGames;
  //Log game result  
  //Bull bear game: (Bull 0 or bear 1) in order to display it on frontend
  //Lottery game: (00 => 0 or 01 => 1 .... 09 => 9) in order to display it on frontend
  //One two three game: (Rock 0 or Paper 1 or Scissors 2) in order to display it on frontend
  event BullBearGameResult(uint8 side);
  event LotteryGameResult(uint8 side);
  event OneTwoThreeGameResult(uint8 side);

  // Contract constructor run only on contract creation. Set owner.
  constructor() public {
    owner = msg.sender;
    name = "Crypro Mini Game dApp";
    
  }
 IBEP20 GAME_TOKEN = IBEP20(0x680A702b15E20F710D92Ca50A53F1F596474C2D3);
  //add this modifier to functions, which should only be accessible by the owner
  modifier onlyOwner {
    require(msg.sender == owner, "This function can only be launched by the owner");
    _;
  }

  //Play the Bull Bear game!
  function BullBearGame(uint8 guess, uint256 amount) public payable returns(bool){
    require(guess == 0 || guess == 1, "Variable 'guess' should be either 0 ('Bull') or 1 ('Bear')");
    //require(msg.value > 0, "Bet more than 0");
    amount = amount*100000000;
    //require(amount <= address(this).balance - amount, "You cannot bet more than what is available in the Contract Balance");
    //require(IERC20(GAME_TOKEN).allowance(address(msg.sender), address(this)) >= amount, "insufficient allowance amount");
    IBEP20(GAME_TOKEN).transferFrom(address(msg.sender),address(this), amount);
    //address(this).balance is increased by msg.value even before code is executed. Thus "address(this).balance-msg.value"
    //Create a random number. Use the mining difficulty & the player's address, hash it, convert this hex to int, divide by modulo 2 which results in either 0 or 1 and return as uint8
    uint8 result = uint8(uint256(keccak256(abi.encodePacked(block.difficulty, msg.sender, block.timestamp)))%2);
    bool won = false;
    if (guess == result) {
      //Won!
      IBEP20(GAME_TOKEN).transfer(address(msg.sender), amount*18/10);
      won = true;
    }

    emit BullBearGameResult(result);
    lastPlayedBullBearGames.push(Game(msg.sender, amount, guess, won, IBEP20(GAME_TOKEN).balanceOf(address(this))));
    return won; //Return value can only be used by other functions, but not within web3.js (as of 2019)
  }

  //Get amount of games played so far
  function getBullBearGameCount() public view returns(uint) {
    return lastPlayedBullBearGames.length;
  }

  //Get stats about a certain played game, e.g. address of player, amount bet, won or lost, and CMG Token in the contract balance at this point in time
  function getBullBearGameEntry(uint index) public view returns(address addr, uint amountBet, uint8 guess, bool winner, uint ContractBalance) {
    return (
      lastPlayedBullBearGames[index].addr,
      lastPlayedBullBearGames[index].amountBet,
      lastPlayedBullBearGames[index].guess,
      lastPlayedBullBearGames[index].winner,
      lastPlayedBullBearGames[index].ContractBalance
    );
  }
  
  
  //Play the Lottery game!
  function LotteryGame(uint8 guess, uint256 amount) public payable returns(bool){
    require(guess == 0 || guess == 1 || guess == 2 || guess == 3 || guess == 4 || guess == 5 || guess == 6 || guess == 7 || guess == 8 || guess == 9, "Variable 'guess' should be either 0 ('00') or 1 ('01') or 2 ('02') or 3 ('03') or 4 ('04') or 5 ('05') or 6 ('06') or 7 ('07') or 8 ('08') or 9 ('09')");
    //require(msg.value > 0, "Bet more than 0");
    amount = amount*100000000;
    //require(amount <= address(this).balance - amount, "You cannot bet more than what is available in the Contract balance");
    //require(IERC20(GAME_TOKEN).allowance(address(msg.sender), address(this)) >= amount, "insufficient allowance amount");
    IBEP20(GAME_TOKEN).transferFrom(address(msg.sender),address(this), amount);
    //address(this).balance is increased by msg.value even before code is executed. Thus "address(this).balance-msg.value"
    //Create a random number. Use the mining difficulty & the player's address, hash it, convert this hex to int, divide by modulo 2 which results in either 0 or 1 and return as uint8
    uint8 result = uint8(uint256(keccak256(abi.encodePacked(block.difficulty, msg.sender, block.timestamp)))%10);
    bool won = false;
    if (guess == result) {
      //Won!
      IBEP20(GAME_TOKEN).transfer(address(msg.sender), amount*180/10);
      won = true;
    }

    emit LotteryGameResult(result);
    lastPlayedLotteryGames.push(Game(msg.sender, amount, guess, won, IBEP20(GAME_TOKEN).balanceOf(address(this))));
    return won; //Return value can only be used by other functions, but not within web3.js (as of 2019)
  }

  //Get amount of Lottery games played so far
  function getLotteryGameCount() public view returns(uint) {
    return lastPlayedLotteryGames.length;
  }

  //Get stats about a certain played game, e.g. address of player, amount bet, won or lost, and CMG Token in the Contract balance at this point in time
  function getLotteryGameEntry(uint index) public view returns(address addr, uint amountBet, uint8 guess, bool winner, uint ContractBalance) {
    return (
      lastPlayedLotteryGames[index].addr,
      lastPlayedLotteryGames[index].amountBet,
      lastPlayedLotteryGames[index].guess,
      lastPlayedLotteryGames[index].winner,
      lastPlayedLotteryGames[index].ContractBalance
    );
  }
  
   //Play the One two three game!
  function OneTwoThreeGame(uint8 guess, uint256 amount) public payable returns(uint8){
    require(guess == 0 || guess == 1 || guess == 2, "Variable 'guess' should be either 0 ('Rock') or 1 ('Paper') or 2 ('Scissors')");
    //require(msg.value > 0, "Bet more than 0");
    amount = amount*100000000;
    //require(amount <= address(this).balance - amount, "You cannot bet more than what is available in the Contract balance");
    //require(IERC20(GAME_TOKEN).allowance(address(msg.sender), address(this)) >= amount, "insufficient allowance amount");
    IBEP20(GAME_TOKEN).transferFrom(address(msg.sender),address(this), amount);
    //address(this).balance is increased by msg.value even before code is executed. Thus "address(this).balance-msg.value"
    //Create a random number. Use the mining difficulty & the player's address, hash it, convert this hex to int, divide by modulo 2 which results in either 0 or 1 and return as uint8
    uint8 result = uint8(uint256(keccak256(abi.encodePacked(block.difficulty, msg.sender, block.timestamp)))%3);
    uint8 won = 0;
    if (guess == result) {
      //Draw!
      IBEP20(GAME_TOKEN).transfer(address(msg.sender), amount);
      won = 0;
    }
    else if ((guess == 0 &&  result == 1)||(guess == 1 &&  result == 2)||(guess == 2 &&  result == 0))
    {
        //Lost
        won = 2;
    }
    else if ((guess == 0 &&  result == 2)||(guess == 1 &&  result == 0)||(guess == 2 &&  result == 1))
    {
        //win 
        IBEP20(GAME_TOKEN).transfer(address(msg.sender), amount*19/10);
        won = 1;
    }

    emit OneTwoThreeGameResult(result);
    lastPlayedOneTwoThreeGames.push(stOneTwoThreeGame(msg.sender, amount, guess, won, IBEP20(GAME_TOKEN).balanceOf(address(this))));
    return won; //Return value can only be used by other functions, but not within web3.js (as of 2019)
  }

  //Get amount of One two three games played so far
  function getOneTwoThreeGameCount() public view returns(uint) {
    return lastPlayedOneTwoThreeGames.length;
  }

  //Get stats about a certain played One two three game, e.g. address of player, amount bet, won or lost, and CMG Token in the Contract balance at this point in time
  function getOneTwoThreeGameEntry(uint index) public view returns(address addr, uint amountBet, uint8 guess, uint8 winner, uint ContractBalance) {
    return (
      lastPlayedOneTwoThreeGames[index].addr,
      lastPlayedOneTwoThreeGames[index].amountBet,
      lastPlayedOneTwoThreeGames[index].guess,
      lastPlayedOneTwoThreeGames[index].winner,
      lastPlayedOneTwoThreeGames[index].ContractBalance
    );
  }
  

  // Contract destructor (Creator of contract can also destroy it and receives remaining ether of contract address).
  //Advantage compared to "withdraw": SELFDESTRUCT opcode uses negative gas because the operation frees up space on
  //the blockchain by clearing all of the contract's data
  
   function GetAdress() public view returns(address){
      return address(msg.sender);
  } 
  
  function destroy() external onlyOwner {
    selfdestruct(owner);
  }

  //Withdraw money from contract
  function withdraw(uint amount) external onlyOwner {
    require(amount < address(this).balance, "You cannot withdraw more than what is available in the contract");
    owner.transfer(amount);
  }

  // Accept any incoming amount
  function () external payable {}
}
