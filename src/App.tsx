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

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-whit animate-fadeIn opacity-1">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between h-16 px-3 py-5">
            <div className="flex items-center">
              <a href="/">
                <div className="flex-shrink-0 flex items-center">
                  <Dices className="h-10 w-10" />
                  <span className="ml-2 text-xl font-bold">Stochaz</span>
                </div>
              </a>

              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  <a
                    href="#"
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
                    href="#"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-fuchsia-300"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center">
              <a
                href="/playground"
                className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-500 flex items-center"
              >
                <CircleDollarSign className="mr-2 h-4 w-4" />
                Start Betting
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {menuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-fuchsia-400"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-fuchsia-300"
              >
                Markets
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-fuchsia-300"
              >
                How It Works
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-fuchsia-300"
              >
                About
              </a>
              <button className="mt-4 w-full px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-500 flex items-center justify-center">
                <CircleDollarSign className="mr-2 h-4 w-4" />
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
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

      {/* Features Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Why Choose Stochaz?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-300">
              Our platform combines the best of blockchain technology with an
              intuitive betting experience.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-slate-950 rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-fuchsia-600 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white">
                  Trustless Security
                </h3>
                <p className="mt-2 text-gray-300">
                  Smart contracts eliminate middlemen, guaranteeing that all
                  bets are executed exactly as agreed with full transparency.
                </p>
              </div>

              <div className="bg-slate-950 rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-fuchsia-600 text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white">
                  Real-World Data Feeds
                </h3>
                <p className="mt-2 text-gray-300">
                  Flare’s FTSO provides decentralized, real-time data feeds to
                  settle bets accurately and securely without relying on
                  centralized data sources.
                </p>
              </div>

              <div className="bg-slate-950 rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-fuchsia-600 text-white">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white">
                  Verified External Data
                </h3>
                <p className="mt-2 text-gray-300">
                  With Flare Data Connector, you can bet on events using secure,
                  verified data from other blockchains and the internet.
                </p>
              </div>

              <div className="bg-slate-950 rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-fuchsia-600 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white">
                  Fair Randomness
                </h3>
                <p className="mt-2 text-gray-300">
                  Random rewards and outcomes are generated using Flare’s secure
                  and verifiable random number generator, ensuring provable
                  fairness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              How Stochaz Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-300">
              Getting started is simple, secure, and only takes a few minutes.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  title: "Connect Your Wallet",
                  description:
                    "Link your crypto wallet to access the platform. We support MetaMask, WalletConnect, and more.",
                  step: "1",
                },
                {
                  title: "Choose Your Market",
                  description:
                    "Browse available betting markets or create your own with customizable parameters.",
                  step: "2",
                },
                {
                  title: "Place Your Bet",
                  description:
                    "Stake your crypto and confirm your position. Smart contracts handle the rest.",
                  step: "3",
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="pl-16">
                    <h3 className="text-xl font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start betting?</span>
            <span className="block text-fuchsia-300">
              Join thousands of users today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/playground"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-gray-100"
              >
                Place your first Bet
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-700 hover:bg-fuchsia-600"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="mt-8 flex justify-center space-x-6">
            {/* Social Media Icons */}
            {["Twitter", "GitHub", "Discord", "Telegram"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-400 hover:text-fuchsia-400"
              >
                <span className="sr-only">{social}</span>
                <div className="h-6 w-6 rounded-full bg-gray-800"></div>
              </a>
            ))}
          </div>
          <div className="mt-8 flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-fuchsia-400 text-sm"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-fuchsia-400 text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-fuchsia-400 text-sm"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-fuchsia-400 text-sm"
            >
              Contact
            </a>
          </div>
          <p className="mt-8 text-center text-gray-400">
            &copy; 2025 Stochaz. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
