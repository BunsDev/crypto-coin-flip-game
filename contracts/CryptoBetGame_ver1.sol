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





// Heads or tails game contract
contract BullBear {
  address payable owner;
  string public name;

  struct Game {
    address addr;
    uint amountBet;
    uint8 guess;
    bool winner;
    uint ethInJackpot;
  }

  Game[] lastPlayedGames;

  //Log game result (heads 0 or tails 1) in order to display it on frontend
  event GameResult(uint8 side);

  // Contract constructor run only on contract creation. Set owner.
  constructor() public {
    owner = msg.sender;
    name = "Crypro Bet Game dApp";
    
  }
 IBEP20 GAME_TOKEN = IBEP20(0x680A702b15E20F710D92Ca50A53F1F596474C2D3);
  //add this modifier to functions, which should only be accessible by the owner
  modifier onlyOwner {
    require(msg.sender == owner, "This function can only be launched by the owner");
    _;
  }

  //Play the game!
  function playgame(uint8 guess, uint256 amount) public payable returns(bool){
    require(guess == 0 || guess == 1, "Variable 'guess' should be either 0 ('Bull') or 1 ('Bear')");
    //require(msg.value > 0, "Bet more than 0");
    amount = amount*100000000;
    //require(amount <= address(this).balance - amount, "You cannot bet more than what is available in the jackpot");
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

    emit GameResult(result);
    lastPlayedGames.push(Game(msg.sender, amount, guess, won, IBEP20(GAME_TOKEN).balanceOf(address(this))));
    return won; //Return value can only be used by other functions, but not within web3.js (as of 2019)
  }

  //Get amount of games played so far
  function getGameCount() public view returns(uint) {
    return lastPlayedGames.length;
  }

  //Get stats about a certain played game, e.g. address of player, amount bet, won or lost, and ETH in the jackpot at this point in time
  function getGameEntry(uint index) public view returns(address addr, uint amountBet, uint8 guess, bool winner, uint ethInJackpot) {
    return (
      lastPlayedGames[index].addr,
      lastPlayedGames[index].amountBet,
      lastPlayedGames[index].guess,
      lastPlayedGames[index].winner,
      lastPlayedGames[index].ethInJackpot
    );
  }

  // Contract destructor (Creator of contract can also destroy it and receives remaining ether of contract address).
  //Advantage compared to "withdraw": SELFDESTRUCT opcode uses negative gas because the operation frees up space on
  //the blockchain by clearing all of the contract's data
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
