// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
/* THIS IS A TEST IMPORT, in production use: import {FtsoV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/FtsoV2Interface.sol"; */
import {TestFtsoV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/TestFtsoV2Interface.sol";
import {FtsoV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/FtsoV2Interface.sol";
import {RandomNumberV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/RandomNumberV2Interface.sol";

contract FlareBetting is AutomationCompatibleInterface {
    /* 
    ===========FTSO Contracts==========
    */
    // FTSO contract to get FLR/USD price feed
    TestFtsoV2Interface internal ftsoV2;
    // FTSO contract to get Secure random Number
    RandomNumberV2Interface internal randomV2;

    /* 
    ===========Errors==========
    */
    error Betting_upKeepNotNeeded();
    error Betting__transferFailed();
    /* 
    ===========Type Declarations==========
    */

    /* 
    ===========State Variables==========
     */
    uint256 private immutable i_betFeesInUSD;
    uint256 private immutable i_betPlacingInterval;
    uint256 private i_observationInterval = 7 days;
    uint256 private immutable i_maximumSpreadInUSD;
    uint256 private immutable i_maximumBetFromEitherTeamInUSD;
    uint256 private s_randomRewardInUSD;
    mapping(address => uint256) private s_forBettersToAmountBetInUSD;
    mapping(address => uint256) private s_againstBettersToAmountBetInUSD;
    address payable[] s_forBettersAddresses;
    address payable[] s_againstBettersAddresses;
    uint256 private s_betCreationTimeStamp;
    address payable s_owner;
    bool public s_isBetCreated;
    uint256 private s_amountBettedForInUSD;
    uint256 private s_amountBettedAgainstInUSD;

    /* 
    =========Events=============
    */
    event BetsExpired();
    event BetPlaced(address indexed player);
    event winnersPicked(bool isFor);
    event randomWinnerPicked(address indexed player);

    /* 
    ==========Modifiers==========
     */
    modifier onlyOwner() {
        require(
            msg.sender == s_owner,
            "Only the deployer of the contract may send this transaction"
        );
        _;
    }
    modifier onlyAfterBetHasStarted() {
        require(s_isBetCreated == true, "The bet hasnt been created yet");
        _;
    }

    /* 
    ===========Functions===========
     */

    /* Constructor */
    constructor(
        uint256 _betFeesInUSD,
        uint256 _betPlacingIntervalInDays,
        uint256 _maximumSpreadInUSD,
        uint256 _maximumBetFromEitherTeamInUSD
    ) {
        i_betFeesInUSD = _betFeesInUSD;
        i_betPlacingInterval = _betPlacingIntervalInDays * 1 days;
        i_maximumSpreadInUSD = _maximumSpreadInUSD;
        i_maximumBetFromEitherTeamInUSD = _maximumBetFromEitherTeamInUSD;
        s_randomRewardInUSD = i_betFeesInUSD / 2;
        s_isBetCreated = false;
        s_owner = payable(msg.sender);
        ftsoV2 = ContractRegistry.getTestFtsoV2();
        randomV2 = ContractRegistry.getRandomNumberV2();
    }

    /* StartBet Function - Lets the deployer of the contract to start the bet */
    function startBet() external payable onlyOwner {
        require(
            msg.value >= convertUSDtoFLRinWei(i_maximumBetFromEitherTeamInUSD),
            "Send sufficient funds so that you dont go insolvent"
        );
        s_betCreationTimeStamp = block.timestamp;
        s_isBetCreated = true;
    }

    function betFor(
        uint256 amountToBetInUSD
    ) external payable onlyAfterBetHasStarted {
        require(
            s_amountBettedForInUSD + amountToBetInUSD >=
                i_maximumBetFromEitherTeamInUSD,
            "Maximum bet Amounts have been accepted"
        );
        require(
            msg.value <= convertUSDtoFLRinWei(amountToBetInUSD),
            "Send more"
        );
        if (s_forBettersToAmountBetInUSD[msg.sender] == 0) {
            s_forBettersAddresses.push(payable(msg.sender));
        }
        s_forBettersToAmountBetInUSD[msg.sender] += amountToBetInUSD;
        s_amountBettedForInUSD += amountToBetInUSD;
    }

    function betAgainst(
        uint256 amountToBetInUSD
    ) external payable onlyAfterBetHasStarted {
        require(
            s_amountBettedAgainstInUSD + amountToBetInUSD >=
                i_maximumBetFromEitherTeamInUSD,
            "Maximum bet Amounts have been accepted"
        );
        require(
            msg.value <= convertUSDtoFLRinWei(amountToBetInUSD),
            "Send more"
        );
        if (s_againstBettersToAmountBetInUSD[msg.sender] == 0) {
            s_againstBettersAddresses.push(payable(msg.sender));
        }
        s_againstBettersToAmountBetInUSD[msg.sender] += amountToBetInUSD;
        s_amountBettedAgainstInUSD += amountToBetInUSD;
    }

    /**
    CheckUpkeep function 
    */
    function checkUpkeep(
        bytes memory /* checkData */
    )
        public
        view
        override
        returns (bool upKeepNeeded, bytes memory /* performData */)
    {
        bool timeHasPassed = block.timestamp >=
            s_betCreationTimeStamp +
                i_betPlacingInterval +
                i_observationInterval;
        bool hasBalance = address(this).balance > 0;
        bool hasPlayersOnBothSides = s_forBettersAddresses.length *
            s_againstBettersAddresses.length >
            0;

        // if all the above conditions are met then, the upKeepNeeded is true
        upKeepNeeded = (timeHasPassed && hasBalance && hasPlayersOnBothSides);
        return (upKeepNeeded, "");
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        (bool upKeepNeeded, ) = checkUpkeep("");
        if (!upKeepNeeded) {
            revert Betting_upKeepNotNeeded();
        }
        emit BetsExpired();
    }

    /**
     * Get the current value of FLR/USD
     */
    function getFtsoV2CurrentFeedValues()
        public
        view
        returns (uint256 _feedValues, uint64 _timestamp)
    {
        /* THIS IS A TEST METHOD, in production use: ftsoV2 = ContractRegistry.getFtsoV2(); */

        /* Your custom feed consumption logic. In this example the values are just returned. */
        return
            ftsoV2.getFeedByIdInWei(
                bytes21(0x01464c522f55534400000000000000000000000000)
            );
    }

    /* Convert USD to equivalent FLR tokens */
    function convertUSDtoFLRinWei(
        uint256 amountUSD
    ) public view returns (uint256) {
        (uint256 priceOfFLRinUSD, ) = getFtsoV2CurrentFeedValues();
        return (amountUSD * 1e18 * 1e18) / priceOfFLRinUSD;
    }

    /*     function convertFLRInWeitoUSD (uint256 amountFLR) public view returns (uint256) {
        (uint256 priceOfFLRinUSD , ) = getFtsoV2CurrentFeedValues();
        return (amountUSD * 1e18 * 1e18)/priceOfFLRinUSD ;
    } */

    /**
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
    function resolveBetWithFDC(
        uint256 maxPriceInUSD,
        uint256 minPriceInUSD
    ) external {
        // Compare against target
        bool conditionMet = (maxPriceInUSD - minPriceInUSD >=
            i_maximumSpreadInUSD);
        if (conditionMet) {
            for (uint256 i = 0; i < s_forBettersAddresses.length; i++) {
                address payable winner = s_forBettersAddresses[i];
                (bool success, ) = winner.call{
                    value: (3 *
                        convertUSDtoFLRinWei(
                            s_forBettersToAmountBetInUSD[winner]
                        )) / 2
                }(""); ////// convert to FLR
                if (!success) {
                    revert Betting__transferFailed();
                }
            }
            // picking and rewarding the bonus at random
            (uint256 randomNumber, , ) = getSecureRandomNumber();
            uint256 randomIndex = randomNumber % s_forBettersAddresses.length;
            address payable randomRewardWinner = s_forBettersAddresses[
                randomIndex
            ];
            (bool ifSucceeded, ) = randomRewardWinner.call{
                value: s_randomRewardInUSD
            }(""); //// convert to FLR
            if (!ifSucceeded) {
                revert Betting__transferFailed();
            }
            emit winnersPicked(true);
            emit randomWinnerPicked(randomRewardWinner);
        } else {
            for (uint256 i = 0; i < s_againstBettersAddresses.length; i++) {
                address payable winner = s_againstBettersAddresses[i];
                (bool success, ) = winner.call{
                    value: (3 *
                        convertUSDtoFLRinWei(
                            s_againstBettersToAmountBetInUSD[winner]
                        )) / 2
                }(""); /// convert to FLR
                if (!success) {
                    revert Betting__transferFailed();
                }
            }
            // picking and rewarding the bonus at random
            (uint256 randomNumber, , ) = getSecureRandomNumber();
            uint256 randomIndex = randomNumber %
                s_againstBettersAddresses.length;
            address payable randomRewardWinner = s_againstBettersAddresses[
                randomIndex
            ];
            (bool ifSucceeded, ) = randomRewardWinner.call{
                value: s_randomRewardInUSD
            }("");
            if (!ifSucceeded) {
                revert Betting__transferFailed();
            }
            emit winnersPicked(false);
            emit randomWinnerPicked(randomRewardWinner);
        }
    }

    /* View and pure */
    /* 
    Getter Functions */

    function getBettingFeesInUSD() external view returns (uint256) {
        return i_betFeesInUSD;
    }

    function timeRemainingInSeconds()
        external
        view
        onlyAfterBetHasStarted
        returns (uint256)
    {
        return
            block.timestamp - (s_betCreationTimeStamp + i_betPlacingInterval);
    }

    function getNumberOfForBetters()
        external
        view
        onlyAfterBetHasStarted
        returns (uint256)
    {
        return s_forBettersAddresses.length;
    }

    function getNumberOfAgainstBetters()
        external
        view
        onlyAfterBetHasStarted
        returns (uint256)
    {
        return s_againstBettersAddresses.length;
    }

    function getTotalForBettedAmountInUSD()
        external
        view
        onlyAfterBetHasStarted
        returns (uint256)
    {
        return s_amountBettedForInUSD;
    }

    function getTotalAgainstBettedAmountInUSD()
        external
        view
        onlyAfterBetHasStarted
        returns (uint256)
    {
        return s_amountBettedAgainstInUSD;
    }

    function getTotalPool()
        external
        view
        onlyAfterBetHasStarted
        returns (uint256)
    {
        return s_amountBettedAgainstInUSD + s_amountBettedForInUSD;
    }
}
