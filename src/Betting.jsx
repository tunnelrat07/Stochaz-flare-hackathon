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
import { client } from "./client";
import Header from "./BettingComponents/Header";
import Footer from "./BettingComponents/Footer";
import Information from "./BettingComponents/Information";
import Tabs from "./BettingComponents/Tabs";
import Filters from "./BettingComponents/Filters";
import Events from "./BettingComponents/EventCard";
export function BettingPage() {
  const [activeTab, setActiveTab] = useState("live");

  // Sample data for betting events

  // Handle bet side selection
  const [betSide, setBetSide] = useState(null);

  const handleBetSideSelect = (side) => {
    setBetSide(side);
  };

  const handleBetSubmit = (eventId, side) => {
    // Here you would integrate with your smart contract
    console.log(`Placing bet on event ${eventId}, ${side} with $5`);
    // Reset form after submission
    setBetSide(null);
    // In a real implementation, you would show a loading state and success/error message
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white animate-fadeIn opacity-1">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Information />

        {/* Tabs */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Filters */}
        <Filters />

        {/* Events List */}
        <Events
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          betSide={betSide}
          setBetSide={setBetSide}
          handleBetSideSelect={handleBetSideSelect}
          handleBetSubmit={handleBetSubmit}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
