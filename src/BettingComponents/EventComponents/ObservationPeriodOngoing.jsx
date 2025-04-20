import React, { useState, useEffect } from "react";
import {
  useActiveAccount,
  useReadContract,
  TransactionButton,
  useSendTransaction,
} from "thirdweb/react";
import { ethers } from "ethers";
import { prepareContractCall } from "thirdweb";
import { Clock, Activity, Info } from "lucide-react";

export default function BettingPeriodOngoing({ contract, event, betState }) {
  const [betSide, setBetSide] = useState(null);
  const [localTimeRemaining, setLocalTimeRemaining] = useState(null);
  const account = useActiveAccount();

  const accountAddress = account?.address;
  const { mutate: sendTransaction } = useSendTransaction();
  const { data: usdToFLRinWei, isPending: isPendingUSDtoFLRinWei } =
    useReadContract({
      contract,
      method:
        "function convertUSDtoFLRinWei(uint256 amountUSD) view returns (uint256)",
      params: [2],
    });
  const _usdToFLRinWei = usdToFLRinWei ? Number(usdToFLRinWei) : 0;
  const {
    data: amountBettedAgainstByUser,
    isPending: isPendingAmountBettedAgainstByUser,
  } = useReadContract({
    contract,
    method:
      "function getAmountBettedAgainstByAddress(address Address) view returns (uint256)",
    params: [accountAddress],
  });
  const _amountBettedAgainstByUser = amountBettedAgainstByUser
    ? Number(amountBettedAgainstByUser)
    : 0;
  const {
    data: amountBettedForByUser,
    isPending: isPendingAmountBettedForByUser,
  } = useReadContract({
    contract,
    method:
      "function getAmountBettedForByAddress(address Address) view returns (uint256)",
    params: [accountAddress],
  });
  const _amountBettedForByUser = amountBettedForByUser
    ? Number(amountBettedForByUser)
    : 0;
  const { data: betStatus, isPending: isPendingBetStatus } = useReadContract({
    contract,
    method: "function getBetStatus() view returns (uint8)",
    params: [],
  });
  const _betStatus = betStatus ? Number(betStatus) : 0;
  const { data: bettingFeesInUSD, isPending: isPendingBettingFeesInUSD } =
    useReadContract({
      contract,
      method: "function getBettingFeesInUSD() view returns (uint256)",
      params: [],
    });
  const _bettingFeesInUSD = bettingFeesInUSD ? Number(bettingFeesInUSD) : 0;
  const { data: valueOfFLRinUSD, isPending: isPendingValueOfFLRinUSD } =
    useReadContract({
      contract,
      method:
        "function getFtsoV2CurrentFeedValues() view returns (uint256 _feedValues, uint64 _timestamp)",
      params: [],
    });
  const _valueOfFLRinUSD = valueOfFLRinUSD ? Number(valueOfFLRinUSD) : 0;
  const {
    data: ifBetPlacingIntervalIsOver,
    isPending: isPendingIfBetPlacingIntervalIsOver,
  } = useReadContract({
    contract,
    method: "function getIfBetPlacingIntervalIsOver() view returns (bool)",
    params: [],
  });
  const _ifBetPlacingIntervalIsOver = ifBetPlacingIntervalIsOver
    ? Boolean(ifBetPlacingIntervalIsOver)
    : false;
  const { data: maximumSpreadInUSD, isPending: isPendingMaximumSpreadInUSD } =
    useReadContract({
      contract,
      method: "function getMaximumSpreadInUSD() view returns (uint256)",
      params: [],
    });
  const _maximumSpreadInUSD = maximumSpreadInUSD
    ? Number(maximumSpreadInUSD)
    : 0;
  const {
    data: numberOfAgainstBetters,
    isPending: isPendingNumberOfAgaisntBetters,
  } = useReadContract({
    contract,
    method: "function getNumberOfAgainstBetters() view returns (uint256)",
    params: [],
  });
  const _numberOfAgainstBetters = numberOfAgainstBetters
    ? Number(numberOfAgainstBetters)
    : 0;
  const { data: numberOfForBetters, isPending: isPendingNumberOfForBetters } =
    useReadContract({
      contract,
      method: "function getNumberOfForBetters() view returns (uint256)",
      params: [],
    });
  const _numberOfForBetters = numberOfForBetters
    ? Number(numberOfForBetters)
    : 0;
  const { data: randomRewardInUSD, isPending: isPendingRandomRewardInUSd } =
    useReadContract({
      contract,
      method: "function getRandomRewardInUSd() view returns (uint256)",
      params: [],
    });
  const _randomRewardInUSD = randomRewardInUSD ? Number(randomRewardInUSD) : 0;

  const { data: timeLeftToPlaceBets, isPending: isPendingTimeLeftToPlaceBet } =
    useReadContract({
      contract,
      method:
        "function getTimeLeftToPlaceBetInSeconds() view returns (uint256)",
      params: [],
    });
  const _timeLeftToPlaceBets = timeLeftToPlaceBets
    ? Number(timeLeftToPlaceBets)
    : 0;

  const {
    data: totalAgainstBettedAmountInUSD,
    isPending: isPendingTotalAgainstBettedAmountInUSD,
  } = useReadContract({
    contract,
    method:
      "function getTotalAgainstBettedAmountInUSD() view returns (uint256)",
    params: [],
  });
  const _totalAgainstBettedAmountInUSD = totalAgainstBettedAmountInUSD
    ? Number(totalAgainstBettedAmountInUSD)
    : 0;
  const {
    data: totalForBettedAmountInUSD,
    isPending: isPendingTotalForBettedAmountInUSD,
  } = useReadContract({
    contract,
    method: "function getTotalForBettedAmountInUSD() view returns (uint256)",
    params: [],
  });
  const _totalForBettedAmountInUSD = totalForBettedAmountInUSD
    ? Number(totalForBettedAmountInUSD)
    : 0;
  const { data: totalPoolInUSD, isPending: isPendingTotalPoolInUSD } =
    useReadContract({
      contract,
      method: "function getTotalPool() view returns (uint256)",
      params: [],
    });
  const _totalPoolInUSD = totalPoolInUSD ? Number(totalPoolInUSD) : 0;
  const {
    data: maximumBetFromEitherTeamInUSD,
    isPending: isPendingMaximumBetFromEitherTeamInUSD,
  } = useReadContract({
    contract,
    method:
      "function getmaximumBetFromEitherTeamInUSD() view returns (uint256)",
    params: [],
  });
  const _maximumBetFromEitherTeamInUSD = maximumBetFromEitherTeamInUSD
    ? Number(maximumBetFromEitherTeamInUSD)
    : 0;
  const {
    data: timeRemainingInSecondsTillResult,
    isPending: isPendingTimeRemainingInSecondsTillResult,
  } = useReadContract({
    contract,
    method:
      "function timeRemainingInSecondsTillResult() view returns (uint256)",
    params: [],
  });
  const _timeRemainingInSecondsTillResult = timeRemainingInSecondsTillResult
    ? Number(timeRemainingInSecondsTillResult)
    : 0;

  const { data: totalPool } = useReadContract({
    contract,
    method: "function getTotalPool() view returns (uint256)",
    params: [],
  });

  const { data: forPool } = useReadContract({
    contract,
    method: "function getForPool() view returns (uint256)",
    params: [],
  });

  const { data: againstPool } = useReadContract({
    contract,
    method: "function getAgainstPool() view returns (uint256)",
    params: [],
  });

  const { data: userForBet } = useReadContract({
    contract,
    method: "function getUserForBet(address) view returns (uint256)",
    params: [account?.address || ethers.constants.AddressZero],
  });

  const { data: userAgainstBet } = useReadContract({
    contract,
    method: "function getUserAgainstBet(address) view returns (uint256)",
    params: [account?.address || ethers.constants.AddressZero],
  });

  // Format time remaining
  const formatTimeRemaining = (seconds) => {
    if (!seconds && seconds !== 0) return "Loading...";
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  // Format amounts for display
  const formatAmount = (amount) => {
    if (!amount) return "0";
    return ethers.utils.formatEther(amount);
  };

  // Use effect to initialize and update the local time every second
  useEffect(() => {
    // Initial setup - get time from contract
    if (
      timeRemainingInSecondsTillResult !== undefined &&
      localTimeRemaining === null
    ) {
      setLocalTimeRemaining(Number(timeRemainingInSecondsTillResult));
    }

    // Set up interval to decrement the time every second
    const timer = setInterval(() => {
      setLocalTimeRemaining((prevTime) => {
        // Only decrement if we have a valid time and it's greater than 0
        if (prevTime !== null && prevTime > 0) {
          return prevTime - 1;
        }
        return prevTime;
      });
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, [timeRemainingInSecondsTillResult]);

  const handleBetSubmit = (side) => {
    // Logic to be implemented
    console.log(`Placing bet on ${side}`);
  };

  const fixedBetAmount = 2;
  const potentialWinnings = (fixedBetAmount * 1.5).toFixed(2);

  // Use the local time if available, otherwise fall back to contract time
  const displayTime =
    localTimeRemaining !== null
      ? formatTimeRemaining(localTimeRemaining)
      : formatTimeRemaining(_timeRemainingInSecondsTillResult);

  return (
    <div className="px-4 py-3 bg-slate-950 border-t border-gray-800">
      <p className="text-gray-300 mb-4">{event.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-400 mb-1">
            Total Pool
          </div>
          <div className="text-xl font-bold text-white">${_totalPoolInUSD}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-400 mb-1">
            Time Remaining
          </div>
          <div className="text-xl font-bold text-white flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {displayTime}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-400 mb-1">
            Total "For" Bets
          </div>
          <div className="text-xl font-bold text-blue-400">
            ${_totalForBettedAmountInUSD}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-400 mb-1">
            Total "Against" Bets
          </div>
          <div className="text-xl font-bold text-red-400">
            ${_totalAgainstBettedAmountInUSD}
          </div>
        </div>
      </div>

      {account && (
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <h4 className="text-white text-lg mb-2">Your Bets</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-1">
                Your "For" Bet
              </div>
              <div className="text-xl font-bold text-blue-400">
                ${_amountBettedForByUser}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-1">
                Your "Against" Bet
              </div>
              <div className="text-xl font-bold text-red-400">
                ${_amountBettedAgainstByUser}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
