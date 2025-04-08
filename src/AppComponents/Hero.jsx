import { useState } from "react";
import {
  Bell,
  Clock,
  Shield,
  Zap,
  ChevronDown,
  Dices,
  BarChart3,
  Users,
  CircleDollarSign,
  Pyramid,
} from "lucide-react";
export default function Hero() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pt-16 pb-20 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-28">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Decentralized Betting</span>
                <span className="block text-fuchsia-500">
                  For The Digital Age
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Bet with complete transparency and security. Experience
                trustless betting powered by smart contracts, with verified
                real-world data from Flare Data Connector and decentralized
                price feeds via FTSO. Enjoy provably fair outcomes and random
                rewards using Flare’s secure random number generator.
              </p>
              <div className="mt-8 sm:mt-10 flex justify-center">
                <div className="rounded-md shadow">
                  <a
                    href="/playground"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 md:py-4 md:text-lg md:px-10"
                  >
                    Start Betting
                  </a>
                </div>
                <div className="ml-3 rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Betting Preview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-fuchsia-400" />
                <span className="ml-2 font-medium">Live Betting Markets</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                <span>Updated just now</span>
              </div>
            </div>
            <div className="divide-y divide-gray-800">
              {[
                {
                  event: "ETH Price above $5000",
                  odds: "1.95",
                  volume: "125 ETH",
                  endTime: "3h 24m",
                },
                {
                  event: "BTC halving price impact",
                  odds: "2.35",
                  volume: "89 ETH",
                  endTime: "2d 12h",
                },
                {
                  event: "NFL Championship Finals",
                  odds: "1.62",
                  volume: "215 ETH",
                  endTime: "5d 8h",
                },
              ].map((market, i) => (
                <div
                  key={i}
                  className="px-6 py-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{market.event}</h3>
                    <p className="text-sm text-gray-400">
                      Volume: {market.volume}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-4">
                      <div className="font-bold text-fuchsia-400">
                        {market.odds}x
                      </div>
                      <div className="text-sm text-gray-400">
                        Ends in {market.endTime}
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm">
                      Bet Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 bg-gray-900 border-t border-gray-800">
              <a
                href="#"
                className="text-fuchsia-400 text-sm flex items-center justify-center"
              >
                View All Markets
                <ChevronDown className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
