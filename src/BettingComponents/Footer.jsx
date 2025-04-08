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
export default function Footer() {
  return (
    <>
      <footer className="border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-gray-400 text-sm">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="hover:text-fuchsia-400">
                About
              </a>
              <a href="#" className="hover:text-fuchsia-400">
                Terms
              </a>
              <a href="#" className="hover:text-fuchsia-400">
                Privacy
              </a>
              <a href="#" className="hover:text-fuchsia-400">
                FAQ
              </a>
            </div>
            <div>Oracle powered by Chainlink & Flare Data Contract</div>
          </div>
        </div>
      </footer>
    </>
  );
}
