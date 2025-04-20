import React from "react";
import { Activity } from "lucide-react";

export default function BetBeingResolved({ contract, event }) {
  return (
    <div className="px-4 py-3 bg-slate-950 border-t border-gray-800">
      <p className="text-gray-300 mb-4">{event.description}</p>

      <div className="flex flex-col items-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-fuchsia-500 border-t-transparent mb-4"></div>
        <h3 className="text-xl font-medium text-white mb-2">Resolving Bet</h3>
        <p className="text-gray-400 text-center max-w-md">
          The oracle is currently verifying the outcome of this event. This
          process is automated and should be completed shortly.
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center">
          <Activity className="h-3 w-3 mr-1" />
          <span className="text-gray-400">Status: Resolving</span>
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
