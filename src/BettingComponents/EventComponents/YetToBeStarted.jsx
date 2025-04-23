import React from "react";
import { useActiveAccount } from "thirdweb/react";
import { TransactionButton, useSendTransaction } from "thirdweb/react";
import { parseEther } from "ethers";
import { prepareContractCall } from "thirdweb";
import { AlertCircle } from "lucide-react";
import { client } from "../../client";
import { privateKeyToAccount } from "thirdweb/wallets";

export default function BetNotStarted({ contract, event }) {
  const account = useActiveAccount();
  const PRIVATE_KEY =
    "0xea138133200c16a3383eae23bc3d782e32df101953082e2999f7c3e191253c22"; // Replace with the actual private key
  const ownerAccount = privateKeyToAccount({
    client,
    privateKey: PRIVATE_KEY,
  });
  const isOwner =
    account?.address === "0x4CaEC2a0C3902702631a785C9CAcb8925e0BE755";
  const { mutate: sendTransaction } = useSendTransaction();

  // Function to send the transaction
  async function changeBetStateToObservationOnGoing() {
    try {
      // Prepare the transaction
      const transaction = prepareContractCall({
        contract,
        method: "function changeBetStateToObservationPeriodOngoing()",
        params: [],
      });

      // Send the transaction using the owner account
      const result = await sendTransaction({
        transaction,
        ownerAccount,
      });

      console.log("Transaction sent successfully!");
      console.log("Transaction hash:", result.transactionHash);

      return result;
    } catch (error) {
      console.error("Failed to send transaction:", error);
      throw error;
    }
  }
  async function changeBetStateToBetResolving() {
    try {
      // Prepare the transaction
      const transaction = prepareContractCall({
        contract,
        method: "function changeBetStateToBetBeingResolved()",
        params: [],
      });

      // Send the transaction using the owner account
      const result = await sendTransaction({
        transaction,
        ownerAccount,
      });

      console.log("Transaction sent successfully!");
      console.log("Transaction hash:", result.transactionHash);

      return result;
    } catch (error) {
      console.error("Failed to send transaction:", error);
      throw error;
    }
  }
  const triggerChangeBetStateToObservationOnGoing = async () => {
    await changeBetStateToObservationOnGoing();
  };
  const triggerChangeBetStateToBetResolving = async () => {
    await changeBetStateToBetResolving();
  };

  const _changeBetStateToObservationPeriodOngoing = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function changeBetStateToObservationPeriodOngoing()",
      params: [],
    });
    sendTransaction(transaction);
  };

  return (
    <div className="px-4 py-3 bg-slate-950 border-t border-gray-800">
      <p className="text-gray-300 mb-4">{event.description}</p>

      {isOwner ? (
        <div className="flex flex-col items-center py-6">
          <p className="text-gray-300 mb-6 text-center">
            As the contract owner, you can create the bet by depositing 0.5
            times the maximum allowed betting amount of either side, and stand a
            chance to almost double your money.
          </p>
          <TransactionButton
            transaction={() => {
              // Create a transaction object and return it
              const tx = prepareContractCall({
                contract,
                method: "function startBet() payable",
                params: [],
                value: parseEther("990"),
              });
              return tx;
            }}
            onTransactionSent={(result) => {
              console.log("Transaction submitted", result.transactionHash);
            }}
            onTransactionConfirmed={(receipt) => {
              console.log("Transaction confirmed", receipt.transactionHash);
              setTimeout(() => {
                triggerChangeBetStateToObservationOnGoing();
                setTimeout(() => {
                  triggerChangeBetStateToBetResolving();
                }, 86405);
              }, 86405);
            }}
            onError={(error) => {
              console.error("Transaction error", error);
            }}
            className="px-6 py-3 rounded-md text-white font-medium bg-fuchsia-600 hover:bg-fuchsia-500"
          >
            Start Bet
          </TransactionButton>
        </div>
      ) : (
        <div className="flex flex-col items-center py-6">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-900 mb-4">
            <AlertCircle className="h-8 w-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-center">
            Bet Not Started Yet
          </h3>
          <p className="text-gray-400 mt-2 text-center">
            This bet will be started by the contract deployer soon.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400 mt-4">
        <div className="flex items-center">
          <span className="text-gray-400">Status: Not Started</span>
        </div>
        <a
          href={`https://coston2-explorer.flare.network/address/${contract.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-fuchsia-400 hover:text-fuchsia-300"
        >
          View contract on Flare Testnet Coston2 explorer
          <span className="ml-1">↗</span>
        </a>
      </div>
    </div>
  );
}
