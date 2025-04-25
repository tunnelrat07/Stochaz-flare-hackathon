import { useState } from "react";
import {
  AlertCircle,
  Clock,
  Activity,
  Info,
  RefreshCw,
  Award,
  ExternalLink,
  Dices,
} from "lucide-react";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
import { client } from "../client";
export default function Header() {
  return (
    <>
      <header className="bg-slate-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <a href="/" className="px-10">
                <div className="flex-shrink-0 flex items-center">
                  <Dices className="h-10 w-10" />
                  <span className="ml-2 text-xl font-bold">Stochaz</span>
                </div>
              </a>
              <a
                href="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-fuchsia-400 hover:text-fuchsia-300"
              >
                Home
              </a>
              <a
                href="https://coinmarketcap.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-fuchsia-300"
              >
                Markets
              </a>
              <a
                href="/learnmore"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-fuchsia-300"
              >
                Learn More
              </a>
            </div>

            <div className="flex items-center space-x-4 ">
              <ConnectButton
                theme={{
                  colors: {
                    primaryButtonBg: "oklch(54.6% 0.245 262.881)",
                    modalBg: "oklch(21% 0.034 264.665)",
                    secondaryText: "asdasda",
                  },
                }}
                connectButton={{
                  label: "Connect Wallet",
                }}
                client={client}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
