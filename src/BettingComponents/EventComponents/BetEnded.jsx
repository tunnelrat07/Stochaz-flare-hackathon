import React from "react";
import {
  useActiveAccount,
  useReadContract,
  TransactionButton,
  useSendTransaction,
} from "thirdweb/react";
import { ethers } from "ethers";
import { prepareContractCall } from "thirdweb";
import {
  Award,
  Activity,
  Trophy,
  Gift,
  ChevronRight,
  Star,
} from "lucide-react";

export default function BetEnded({ contract, event }) {
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
  const {
    data: amountBettedForOriginal,
    isPending: isPendingamountBettedForOriginal,
  } = useReadContract({
    contract,
    method:
      "function getAmountBettedForByAddress__(address Address) view returns (uint256)",
    params: [accountAddress],
  });
  const amountBettedForByUserOriginally = Number(amountBettedForOriginal);
  const {
    data: amountBettedAgainstOriginal,
    isPending: isPendingamountBettedAgainstOriginal,
  } = useReadContract({
    contract,
    method:
      "function getAmountBettedAgainstByAddress__(address Address) view returns (uint256)",
    params: [accountAddress],
  });
  const amountBettedAgainstByUserOriginally = Number(
    amountBettedAgainstOriginal
  );

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

  const { data: isFor, isPending: isPendingFor } = useReadContract({
    contract,
    method: "function getIsForSideWinner() view returns (bool)",
    params: [],
  });

  const isForSideWinner = Boolean(isFor);

  const { data: randomRewardWinner, isPending: isPendingRandomRewardWinner } =
    useReadContract({
      contract,
      method: "function getRandomRewardWinner() view returns (address)",
      params: [],
    });
  console.log(randomRewardWinner);
  const isUserRandomRewardWinner = randomRewardWinner === accountAddress;
  const isContractOwner =
    accountAddress === "0x4CaEC2a0C3902702631a785C9CAcb8925e0BE755"; // This should be determined based on contract ownership
  console.log(isUserRandomRewardWinner);
  // Format amounts for display
  const formatAmount = (amount) => {
    if (!amount) return "0";
    return ethers.utils.formatEther(amount);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Calculate winnings (approximate)
  const calculateWinnings = () => {
    if (isForSideWinner && _amountBettedForByUser > 0) {
      // Calculate proportion of winnings based on user's contribution to winning side
      const proportion = _amountBettedForByUser / _totalForBettedAmountInUSD;
      return proportion * _totalPoolInUSD * 0.95; // Assuming 5% platform fee
    } else if (!isForSideWinner && _amountBettedAgainstByUser > 0) {
      const proportion =
        _amountBettedAgainstByUser / _totalAgainstBettedAmountInUSD;
      return proportion * _totalPoolInUSD * 0.95; // Assuming 5% platform fee
    }
    return 0;
  };

  const estimatedWinnings = calculateWinnings();
  const didUserWin =
    (isForSideWinner && _amountBettedForByUser > 0) ||
    (!isForSideWinner && _amountBettedAgainstByUser > 0);

  return (
    <div className="px-6 py-6 bg-slate-950 border border-gray-800 rounded-xl">
      {/* Event Description */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Bet Event</h2>
        <p className="text-gray-300">{event.description}</p>
      </div>

      {/* Winner Banner Section */}
      <div
        className={`relative overflow-hidden bg-gradient-to-r ${
          isForSideWinner
            ? "from-blue-900/40 to-blue-700/30"
            : "from-red-900/40 to-red-700/30"
        } rounded-xl p-6 mb-8 border border-gray-700`}
      >
        <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
          <Trophy className="w-full h-full" />
        </div>

        <div className="flex items-center mb-4">
          <Trophy
            className={`h-10 w-10 mr-4 ${
              isForSideWinner ? "text-blue-400" : "text-red-400"
            }`}
          />
          <h3 className="text-2xl font-bold text-white">Winner Announced</h3>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <p className="text-lg text-gray-300 mb-2">
              {isForSideWinner
                ? "The event occurred as predicted."
                : "The event did not occur as predicted."}
            </p>
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full ${
                isForSideWinner
                  ? "bg-blue-600/30 text-blue-300 border border-blue-500/50"
                  : "bg-red-600/30 text-red-300 border border-red-500/50"
              } font-medium text-lg`}
            >
              <span className="mr-2">Winner:</span>
              <span className="font-bold">
                {isForSideWinner ? "FOR" : "AGAINST"}
              </span>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center">
            <div className="px-4 py-3 bg-gray-800/70 rounded-lg">
              <div className="text-sm text-gray-400">Total Pool</div>
              <div className="text-xl font-bold text-white">
                {formatCurrency(_totalPoolInUSD)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 transition-all hover:bg-gray-800/70">
          <div className="flex justify-between items-start mb-3">
            <div className="text-sm font-medium text-gray-400">Total Bets</div>
            <div className="bg-gray-700/50 rounded-full p-1">
              <Award className="h-4 w-4 text-fuchsia-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">
            {formatCurrency(_totalPoolInUSD)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {_numberOfForBetters + _numberOfAgainstBetters} participants
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 transition-all hover:bg-gray-800/70">
          <div className="flex justify-between items-start mb-3">
            <div className="text-sm font-medium text-gray-400">"For" Bets</div>
            <div className="bg-blue-900/50 rounded-full p-1">
              <Award className="h-4 w-4 text-blue-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {formatCurrency(_totalForBettedAmountInUSD)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {_numberOfForBetters} participants
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 transition-all hover:bg-gray-800/70">
          <div className="flex justify-between items-start mb-3">
            <div className="text-sm font-medium text-gray-400">
              "Against" Bets
            </div>
            <div className="bg-red-900/50 rounded-full p-1">
              <Award className="h-4 w-4 text-red-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-red-400">
            {formatCurrency(_totalAgainstBettedAmountInUSD)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {_numberOfAgainstBetters} participants
          </div>
        </div>
      </div>

      {/* User Results Section */}
      {account && (
        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 mb-8">
          <h4 className="text-white text-lg font-bold mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-fuchsia-400" />
            Your Results
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700">
              <div className="text-sm font-medium text-gray-400 mb-1">
                Your "For" Bet
              </div>
              <div className="text-xl font-bold text-blue-400">
                {formatCurrency(_amountBettedForByUser)}
              </div>
            </div>

            <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700">
              <div className="text-sm font-medium text-gray-400 mb-1">
                Your "Against" Bet
              </div>
              <div className="text-xl font-bold text-red-400">
                {formatCurrency(_amountBettedAgainstByUser)}
              </div>
            </div>
          </div>

          {/* Original Bet Amounts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700">
              <div className="text-sm font-medium text-gray-400 mb-1">
                Your Original "For" Bet
              </div>
              <div className="text-xl font-bold text-blue-400">
                {formatCurrency(amountBettedForByUserOriginally)}
              </div>
            </div>

            <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700">
              <div className="text-sm font-medium text-gray-400 mb-1">
                Your Original "Against" Bet
              </div>
              <div className="text-xl font-bold text-red-400">
                {formatCurrency(amountBettedAgainstByUserOriginally)}
              </div>
            </div>
          </div>

          {didUserWin && (
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 rounded-xl p-6 border border-green-700/50 mb-6">
              <div className="flex items-center mb-3">
                <Trophy className="h-8 w-8 mr-3 text-green-400" />
                <div className="flex-1">
                  <div className="text-green-400 font-bold text-lg">
                    Congratulations! You won!
                  </div>
                  <div className="text-gray-300">
                    Your bet on the {isForSideWinner ? '"For"' : '"Against"'}{" "}
                    side was successful.
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400">Estimated Winnings</div>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(estimatedWinnings)}
                </div>
              </div>
            </div>
          )}

          {!didUserWin &&
            (_amountBettedForByUser > 0 || _amountBettedAgainstByUser > 0) && (
              <div className="bg-gray-800/70 rounded-lg p-6 border border-gray-700 mb-6">
                <div className="text-center">
                  <div className="inline-block p-3 bg-gray-700/50 rounded-full mb-3">
                    <Activity className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="text-gray-300 font-medium text-lg">
                    Better luck next time!
                  </div>
                  <div className="text-gray-400 mt-2">
                    Your bet did not win this round.
                  </div>
                </div>
              </div>
            )}

          {/* Random Reward Section - Just announcement, no separate button */}
          {isUserRandomRewardWinner && (
            <div className="mt-6 mb-6 bg-gradient-to-r from-fuchsia-900/30 to-purple-900/20 rounded-xl p-6 border border-fuchsia-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10">
                <Star className="h-40 w-40" />
              </div>

              <div className="flex items-center mb-4">
                <Gift className="h-8 w-8 mr-3 text-fuchsia-400" />
                <div>
                  <div className="text-fuchsia-400 font-bold text-lg">
                    Bonus Reward!
                  </div>
                  <div className="text-gray-300">
                    You've won a random bonus reward! The reward will be
                    included with your withdrawal.
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400">Bonus Amount</div>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(_randomRewardInUSD)}
                </div>
              </div>
            </div>
          )}

          {/* Withdraw Button - Always displayed unless owner */}
          {!isContractOwner &&
            (_amountBettedAgainstByUser != 0 ||
              _amountBettedForByUser != 0) && (
              <div className="mt-4">
                <TransactionButton
                  transaction={() => {
                    const tx = prepareContractCall({
                      contract,
                      method: "function withdrawAmount(address user) payable",
                      params: [accountAddress],
                    });
                    return tx;
                  }}
                  onTransactionSent={(result) => {
                    console.log(
                      "Transaction submitted",
                      result.transactionHash
                    );
                  }}
                  onTransactionConfirmed={(receipt) => {
                    console.log(
                      "Transaction confirmed",
                      receipt.transactionHash
                    );
                  }}
                  onError={(error) => {
                    console.error("Transaction error", error);
                  }}
                  className="w-full px-4 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all flex items-center justify-center"
                >
                  <Award className="h-5 w-5 mr-2" />
                  Withdraw Your Funds
                  <ChevronRight className="h-4 w-4 ml-2" />
                </TransactionButton>
              </div>
            )}

          {/* Owner Withdraw Deposits Button */}
          {isContractOwner && (
            <div className="mt-4">
              <TransactionButton
                transaction={() => {
                  const tx = prepareContractCall({
                    contract,
                    method: "function withdrawDeposits() payable",
                    params: [],
                  });
                  return tx;
                }}
                onTransactionSent={(result) => {
                  console.log("Transaction submitted", result.transactionHash);
                }}
                onTransactionConfirmed={(receipt) => {
                  console.log("Transaction confirmed", receipt.transactionHash);
                }}
                onError={(error) => {
                  console.error("Transaction error", error);
                }}
                className="w-full px-4 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all flex items-center justify-center"
              >
                <Award className="h-5 w-5 mr-2" />
                Withdraw Deposits
                <ChevronRight className="h-4 w-4 ml-2" />
              </TransactionButton>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-gray-400 bg-gray-800/30 px-3 py-2 rounded-full">
          <Activity className="h-3 w-3 mr-1" />
          <span>Status: Bet Ended</span>
        </div>
        <a
          href={`https://coston2-explorer.flare.network/address/${contract.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-fuchsia-400 hover:text-fuchsia-300 transition-colors bg-gray-800/30 px-3 py-2 rounded-full"
        >
          View on Flare Explorer
          <ChevronRight className="h-3 w-3 ml-1" />
        </a>
      </div>
    </div>
  );
}
