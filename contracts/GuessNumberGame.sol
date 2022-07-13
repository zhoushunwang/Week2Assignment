

pragma solidity ^0.4.22;

interface GuessNumberInterface {

  function guess(uint16 number) external payable;

  function reveal(bytes32 nonce, uint16 number) external payable;
}


pragma solidity ^0.4.22;

contract GuessNumberGame is GuessNumberInterface{

    uint256 public totalBet;
    uint256 public numberOfBets;
    //player number
    uint256 constant public maxAmountOfBets=2;
    uint256 public winnerEtherAmount;
    address[] public players;

    bytes32 public nonceHash;
    bytes32 public nonceNumHash;
    uint256 public depositValue;
    bool gameEnd;

    struct Player{
        uint256 amontBets;
        uint256 numberSelected;
    }

    mapping(address=>Player) public playerInfo;


    constructor(bytes32 nonce,uint16 num) conditional() public payable{
        nonceHash = keccak256(bytes32ToString(nonce));
        nonceNumHash = keccak256(appendUintToString(bytes32ToString(nonce),num));
        gameEnd = false;
    }



    function guess(uint16 number) external payable{
        require(number >= 1 && number <1000, 'Guess Number [0,1000)');
        require(msg.value > 0,'Must bet some money');
        require(!checkPlayerExists(msg.sender),'The same person cannot bet multiple times');
        require(!checkGuessNumberExists(number),'mustguess different numbers');
        require(msg.value == depositValue,'The bet amount must the same with depositValue');
        require(!gameEnd,'Game is come over');
        ++numberOfBets;
        require(numberOfBets<=maxAmountOfBets,'Player is full');
        playerInfo[msg.sender].amontBets = msg.value;
        playerInfo[msg.sender].numberSelected = number;
        players.push(msg.sender);
        totalBet = totalBet + msg.value;
    }


    function reveal(bytes32 nonce, uint16 number) public payable{
       require(keccak256(bytes32ToString(nonce)) == nonceHash,'nonce different not allowed');
       require(keccak256(appendUintToString(bytes32ToString(nonce),number)) == nonceNumHash,'guess number not correct');
        if(number < 0 || number >= 1000){
            gameEnd = true;
            winnerEtherAmount = totalBet/numberOfBets;
            for(uint16 j = 0; j < numberOfBets; j ++){
                if(players[j]!=address(0)){
                  players[j].transfer(winnerEtherAmount);
                }
            }
            return;
         }
        distributePrizze(number);
    }


    function checkGuessNumberExists(uint256 guessNumber) public constant returns(bool){
        for(uint8 i = 0 ; i < players.length ; i++ ){
            uint256 numberSelect = playerInfo[players[i]].numberSelected;
            if(numberSelect == guessNumber ){
                return true;
            }
        }
        return false;
    }


    function checkPlayerExists(address player) public constant returns(bool){
        for(uint8 i = 0 ; i < players.length ; i++ ){
            if( players[i]==player ) return true;
        }
        return false;
    }


    function distributePrizze(uint16 numberWinner) private{
        address[maxAmountOfBets] memory winners;
        uint256 count = 0;
        int256  minValue = 10000;
        for(uint16 i = 0 ; i<players.length;++i){
            uint256 numberSelected = playerInfo[players[i]].numberSelected;
            int256 value = int256(numberSelected - numberWinner);
            if(value < 0){
                value = int256(numberWinner - numberSelected);
            }
            if(value < minValue){
              minValue = value;
            }
        }

        for(uint16 j = 0 ; j<players.length;++j){
            uint256 numberSelected1 = playerInfo[players[j]].numberSelected;
            int256 value1 = int256(numberSelected1 - numberWinner);
            if(value1 < 0){
                value1 = int256(numberWinner - numberSelected1);
            }

            if(value1 == minValue){
                winners[count]=players[j];
                count++;
            }
            delete playerInfo[players[j]];
        }

        if(count > 0){
             winnerEtherAmount = totalBet/count;
             for(uint16 jj = 0; jj < count ; jj ++){
                if(winners[jj]!=address(0)){
                   winners[jj].transfer(winnerEtherAmount);
                 }
             }
        }
        players.length = 0;
        totalBet=0;
        numberOfBets=0;
    }


    modifier conditional() {
        require(msg.value > 0,'Need some ether to contracts');
        _;
        depositValue = address(this).balance;
        totalBet = address(this).balance;
    }


    function bytes32ToString(bytes32 x) pure public returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }


   function appendUintToString(string inStr, uint v) pure public returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory inStrb = bytes(inStr);
        bytes memory s = new bytes(inStrb.length + i);
        uint j;
        for (j = 0; j < inStrb.length; j++) {
            s[j] = inStrb[j];
        }
        for (j = 0; j < i; j++) {
            s[j + inStrb.length] = reversed[i - 1 - j];
        }
        str = string(s);
    }

}
