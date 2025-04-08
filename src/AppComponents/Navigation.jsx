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
export default function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <>
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
    </>
  );
}
