export const smartContractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
/* THIS IS A TEST IMPORT, in production use: import {FtsoV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/FtsoV2Interface.sol"; */
import {TestFtsoV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/TestFtsoV2Interface.sol";
import {FtsoV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/FtsoV2Interface.sol";
import {RandomNumberV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/RandomNumberV2Interface.sol";

contract FlareBetting {

    /*
    ===================================
    ===================================
    ===================================
    ===========FTSO Contracts==========
    ===================================
    ===================================
    ===================================
    */
    // FTSO contract to get FLR/USD price feed
    TestFtsoV2Interface internal ftsoV2;
    // FTSO contract to get Secure random Number
    RandomNumberV2Interface internal randomV2;

    /* 
    ===========================
    ===========================
    ===========================
    ===========Errors==========
    ===========================
    ===========================
    ===========================
    */
    error Betting_upKeepNotNeeded();
    error Betting__transferFailed();
    error Betting__sendMoreGasToStartBet();

    /* 
    ======================================
    ======================================
    ======================================
    ===========Type Declarations==========
    ======================================
    ======================================
    ======================================
    */
    enum BetStatus {
        YetToBeStarted, 
        BettingPeriodOngoing,
        ObservationPeriodOnGoing,
        BetBeingResolved,
        BetEnded
    }

    /* 
    ====================================
    ====================================
    ====================================
    ===========State Variables==========
    ====================================
    ====================================
    ====================================
    */

    uint256 private immutable i_betFeesInUSD ;
    uint256 private immutable i_betPlacingInterval ;
    uint256 private i_observationInterval = 1 days ;
    uint256 private immutable i_maximumSpreadInUSD ;
    uint256 private immutable i_maximumBetFromEitherTeamInUSD ;
    uint256 private s_randomRewardInUSD ;
    mapping  (address => uint256 ) private s_forBettersToAmountBetInUSD ;
    mapping (address => uint256) private s_againstBettersToAmountBetInUSD ;
    address payable [] s_forBettersAddresses ;
    address payable [] s_againstBettersAddresses ;
    uint256 private s_betCreationTimeStamp ;
    address payable s_owner ;
    bool public s_isBetCreated ;
    uint256 private s_amountBettedForInUSD ;
    uint256 private s_amountBettedAgainstInUSD ;
    BetStatus public _betStatus ;

    /* 
    ============================
    ============================
    ============================
    =========Events=============
    ============================
    ============================
    ============================
    */
    event BetsExpired();
    event BetPlaced(address indexed player);
    event winnersPicked(bool isFor);
    event randomWinnerPicked(address indexed player);

    /* 
    =============================
    =============================
    =============================
    ==========Modifiers==========
    =============================
    =============================
    =============================
     */
     modifier onlyOwner () {
        require(msg.sender == s_owner , "Only the deployer of the contract may send this transaction");
        _;
     }
    modifier onlyAfterBetHasStarted () {
        require(s_isBetCreated == true , "The bet hasnt been created yet");
        _;
     }
    modifier whileBetIsBettingPeriodOngoing () {
        require((s_isBetCreated == true) && (_betStatus == BetStatus.BettingPeriodOngoing) , "The bet isnt running");
        _;
     }
    modifier whileObservationPeriodOngoing () {
        require((s_isBetCreated == true) && (_betStatus == BetStatus.ObservationPeriodOnGoing) , "The bet isnt running");
        _;
     }
    modifier whileBetBeingResolved () {
        require((s_isBetCreated == true) && (_betStatus == BetStatus.BetBeingResolved) , "The bet is being resolved");
        _;
    }
    modifier afterBetHasBeenResolved () {
        require((s_isBetCreated == true) && (_betStatus == BetStatus.BetEnded) , "The bet has been resolved");
        _;
    }



    /*
    ===============================
    =============================== 
    ===============================  
    ===========Functions===========
    =============================== 
    =============================== 
    =============================== 
    */

    /* Constructor */
    constructor (
        uint256 _betFeesInUSD ,
        uint256 _betPlacingIntervalInDays ,
        uint256 _maximumSpreadInUSD ,
        uint256 _maximumBetFromEitherTeamInUSD
    ) {
        i_betFeesInUSD = _betFeesInUSD ;
        i_betPlacingInterval = _betPlacingIntervalInDays * 1 days;
        i_maximumSpreadInUSD = _maximumSpreadInUSD ;
        i_maximumBetFromEitherTeamInUSD = _maximumBetFromEitherTeamInUSD ;
        s_isBetCreated = false ;
        s_owner = payable(msg.sender);
        ftsoV2 = ContractRegistry.getTestFtsoV2();
        randomV2 = ContractRegistry.getRandomNumberV2();
        _betStatus = BetStatus.YetToBeStarted ;
        s_randomRewardInUSD = _betFeesInUSD ;
    }


    /* StartBet Function - Lets the deployer of the contract to start the bet */
    function startBet () external payable onlyOwner {
        if(msg.value < (convertUSDtoFLRinWei(i_maximumBetFromEitherTeamInUSD)/2 + convertUSDtoFLRinWei(s_randomRewardInUSD))){
        revert Betting__sendMoreGasToStartBet(); }
        s_betCreationTimeStamp = block.timestamp ;
        s_isBetCreated = true ;
        _betStatus = BetStatus.BettingPeriodOngoing ;
    }  

    /* Functions that let the user bet for and against */
    function betFor (uint256 amountToBetInUSD) external payable onlyAfterBetHasStarted whileBetIsBettingPeriodOngoing{
        require(s_amountBettedForInUSD + amountToBetInUSD <= i_maximumBetFromEitherTeamInUSD , "Maximum bet Amounts have been accepted");
        require(msg.value >= convertUSDtoFLRinWei(amountToBetInUSD), "Send more") ;
        if(s_forBettersToAmountBetInUSD[msg.sender] == 0) {
            s_forBettersAddresses.push(payable (msg.sender));
        }
        s_forBettersToAmountBetInUSD[msg.sender] += amountToBetInUSD ;
        s_amountBettedForInUSD += amountToBetInUSD ;

    }
    function betAgainst (uint256 amountToBetInUSD) external payable onlyAfterBetHasStarted whileBetIsBettingPeriodOngoing{
        require(s_amountBettedAgainstInUSD + amountToBetInUSD <= i_maximumBetFromEitherTeamInUSD , "Maximum bet Amounts have been accepted");
        require(msg.value >= convertUSDtoFLRinWei(amountToBetInUSD), "Send more") ;
        if(s_againstBettersToAmountBetInUSD[msg.sender] == 0) {
            s_againstBettersAddresses.push(payable (msg.sender));
        }
        s_againstBettersToAmountBetInUSD[msg.sender] += amountToBetInUSD ;
        s_amountBettedAgainstInUSD += amountToBetInUSD;

    }



    /*
     * Get the current value of FLR/USD
     */
    function getFtsoV2CurrentFeedValues()
        public 
        view
        returns (
            uint256 _feedValues,
            uint64 _timestamp
        )
    {
        /* THIS IS A TEST METHOD, in production use: ftsoV2 = ContractRegistry.getFtsoV2(); */
        /* Your custom feed consumption logic. In this example the values are just returned. */
        return ftsoV2.getFeedByIdInWei(bytes21(0x01464c522f55534400000000000000000000000000));
    }

    /* Convert USD to equivalent FLR tokens */
    function convertUSDtoFLRinWei (uint256 amountUSD) public view returns (uint256) {
        (uint256 priceOfFLRinUSD , ) = getFtsoV2CurrentFeedValues();
        return (amountUSD * 1e18 * 1e18)/priceOfFLRinUSD ;
    }

    /*
    * Get secure random number from Flare secure random number generator
    */ 
    function getSecureRandomNumber()
        public 
        view
        returns (uint256 randomNumber, bool isSecure, uint256 timestamp)
    {
        (randomNumber, isSecure, timestamp) = randomV2.getRandomNumber();
        /* DO NOT USE THE RANDOM NUMBER IF isSecure=false. */
        require(isSecure, "Random number is not secure");
        /* Your custom RNG consumption logic. In this example the values are just returned. */
        return (randomNumber, isSecure, timestamp);
    }

    /* function to resolve the bet */
    function resolveBetWithFDC(uint256 maxPriceInUSD , uint256 minPriceInUSD) external whileBetBeingResolved returns (bool isForSideWinner ){
    // Compare against target
    bool conditionMet = (maxPriceInUSD - minPriceInUSD >= i_maximumSpreadInUSD);
    if(conditionMet) {
        if(s_forBettersAddresses.length != 0){
        // picking and rewarding the bonus at random 
        (uint256 randomNumber , , ) = getSecureRandomNumber();
        uint256 randomIndex = randomNumber % s_forBettersAddresses.length ;
        address payable randomRewardWinner = s_forBettersAddresses[randomIndex] ;
        s_forBettersToAmountBetInUSD[randomRewardWinner] += s_randomRewardInUSD ;
        emit randomWinnerPicked(randomRewardWinner);        
        }
        for(uint256 i=0 ; i<s_forBettersAddresses.length ; i++) {
            address payable winner = s_forBettersAddresses[i] ;
            uint256 amountToBePaid = s_forBettersToAmountBetInUSD[winner] ;
            s_forBettersToAmountBetInUSD[winner] += amountToBePaid/2 ;

        }
        for(uint256 i=0 ; i<s_againstBettersAddresses.length ; i++) {
            address payable loser = s_againstBettersAddresses[i] ;
            s_againstBettersToAmountBetInUSD[loser] = 0;

        }

        emit winnersPicked(true);
        isForSideWinner = true ;


    } else {

        if(s_againstBettersAddresses.length != 0){
        // picking and rewarding the bonus at random 
        (uint256 randomNumber , , ) = getSecureRandomNumber();
        uint256 randomIndex = randomNumber % s_againstBettersAddresses.length ;
        address payable randomRewardWinner = s_againstBettersAddresses[randomIndex] ;
        s_againstBettersToAmountBetInUSD[randomRewardWinner] += s_randomRewardInUSD ;
        emit randomWinnerPicked(randomRewardWinner);
                    
        }
        for(uint256 i=0 ; i<s_againstBettersAddresses.length ; i++) {
            address payable winner = s_againstBettersAddresses[i] ;
            uint256 amountToBePaid = s_againstBettersToAmountBetInUSD[winner] ;
            s_againstBettersToAmountBetInUSD[winner] += amountToBePaid/2 ;

        }
        for(uint256 i=0 ; i<s_forBettersAddresses.length ; i++) {
            address payable loser = s_forBettersAddresses[i] ;
            s_forBettersToAmountBetInUSD[loser] =0 ;

        }

        emit winnersPicked(false);
        isForSideWinner = false ;
    }


    _betStatus = BetStatus.BetEnded ;
    return isForSideWinner;
    }


    /* 
    Function to withdraw the amounts of user
    */
    function withdrawAmount (address payable user) external payable afterBetHasBeenResolved {
        if(s_forBettersToAmountBetInUSD[user] !=0 ) {
            (bool sent , ) = user.call{value : convertUSDtoFLRinWei(s_forBettersToAmountBetInUSD[user])}("") ;
            require(sent , "Transfer failed") ;
        }
        if(s_againstBettersToAmountBetInUSD[user] !=0 ) {
            (bool sent , ) = user.call{value : convertUSDtoFLRinWei(s_againstBettersToAmountBetInUSD[user])}("") ;
            require(sent , "Transfer failed") ;
        }
    }


    /* 
    Functions to change bet state
    */
    function changeBetStateToBetBeingResolved () external whileObservationPeriodOngoing onlyOwner {
        require(block.timestamp >= s_betCreationTimeStamp + i_betPlacingInterval + i_observationInterval , "Still in observation time");
        _betStatus = BetStatus.BetBeingResolved ;
    }

    function changeBetStateToObservationPeriodOngoing() external whileBetIsBettingPeriodOngoing onlyOwner
    {
        require(block.timestamp >= s_betCreationTimeStamp + i_betPlacingInterval , "Still in betting time");
        _betStatus = BetStatus.ObservationPeriodOnGoing;
    }



    /* View and pure */
    /* 
    Getter Functions */

    function getBettingFeesInUSD () external view returns (uint256) {
        return i_betFeesInUSD ;
    }

    function getmaximumBetFromEitherTeamInUSD () external view returns (uint256) {
        return i_maximumBetFromEitherTeamInUSD ;
    }

    function timeRemainingInSecondsTillResult () external view onlyAfterBetHasStarted returns (uint256) { 
        return block.timestamp - (s_betCreationTimeStamp + i_betPlacingInterval) ;
    }

    function getNumberOfForBetters () external view onlyAfterBetHasStarted returns (uint256) {
        return s_forBettersAddresses.length ;
    }

    function getNumberOfAgainstBetters () external view onlyAfterBetHasStarted returns (uint256) {
        return s_againstBettersAddresses.length ;
    }

    function getTotalForBettedAmountInUSD () external view onlyAfterBetHasStarted returns (uint256) {
        return s_amountBettedForInUSD ;
    }

    function getTotalAgainstBettedAmountInUSD () external view onlyAfterBetHasStarted returns (uint256) {
        return s_amountBettedAgainstInUSD ;
    }

    function getTotalPool () external view onlyAfterBetHasStarted returns (uint256) {
        return s_amountBettedAgainstInUSD +  s_amountBettedForInUSD;
    }

    function getBetStatus () external view returns (BetStatus) {
        return _betStatus ;
    }

    function getTimeLeftToPlaceBetInSeconds () external view returns (uint256) {
        return i_betPlacingInterval - (block.timestamp - s_betCreationTimeStamp);
    }
    function getMaximumSpreadInUSD () external view returns (uint256) {
        return i_maximumSpreadInUSD ;
    }
    function getRandomRewardInUSd () external view returns (uint256) {
        return s_randomRewardInUSD;
    }
    function getIfBetPlacingIntervalIsOver () external view onlyAfterBetHasStarted returns  (bool) {
        return block.timestamp - s_betCreationTimeStamp > i_betPlacingInterval ;
    }

    function getAmountBettedForByAddress(address payable Address) external  view returns (uint256) {
        return s_forBettersToAmountBetInUSD[Address];
    }
    function getAmountBettedAgainstByAddress(address payable Address) external  view returns (uint256) {
        return s_againstBettersToAmountBetInUSD[Address];
    }
}`;
