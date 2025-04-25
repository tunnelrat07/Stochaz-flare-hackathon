import { useState, useEffect } from "react";
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
  const [betSide, setBetSide] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  // Add state for active section
  const [activeSection, setActiveSection] = useState("information");

  // Handle scroll progress and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);

      // Determine active section based on scroll position
      const sections = ["information", "events", "footer"];
      const sectionElements = sections.map((id) => document.getElementById(id));

      // Find which section is currently most visible
      const viewportHeight = window.innerHeight;
      const viewportMiddle = window.scrollY + viewportHeight / 2;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;

          if (viewportMiddle >= elementTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section when dot is clicked
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

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
    <div className="min-h-screen bg-slate-950 text-white animate-fadeIn opacity-1 relative overflow-hidden">
      {/* Animated background gradient - blue/black theme */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-800 to-black opacity-50"
        style={{
          transform: `rotate(${scrollProgress * 0.3}deg) scale(${
            1.05 + scrollProgress * 0.002
          })`,
          transition: "transform 0.2s ease-out",
        }}
      />

      {/* Floating elements in background - with blue theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-700 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div
          className="absolute top-1/4 -right-20 w-80 h-80 bg-cyan-600 rounded-full filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 -left-20 w-72 h-72 bg-blue-900 rounded-full filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-sky-800 rounded-full filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Navigation dots - same style as the App component */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center justify-center space-y-6">
        {/* Information dot */}
        <button
          onClick={() => scrollToSection("information")}
          className="group flex items-center space-x-2"
        >
          <div
            className={`w-3 h-3 rounded-full ${
              activeSection === "information"
                ? "bg-blue-500 scale-125"
                : "bg-gray-500 hover:bg-gray-400"
            } transition-all duration-300 ease-in-out relative`}
          >
            {activeSection === "information" && (
              <span className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-75"></span>
            )}
            <span className="absolute left-5 ml-1 whitespace-nowrap text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Information
            </span>
          </div>
        </button>

        {/* Events dot */}
        <button
          onClick={() => scrollToSection("events")}
          className="group flex items-center space-x-2"
        >
          <div
            className={`w-3 h-3 rounded-full ${
              activeSection === "events"
                ? "bg-blue-500 scale-125"
                : "bg-gray-500 hover:bg-gray-400"
            } transition-all duration-300 ease-in-out relative`}
          >
            {activeSection === "events" && (
              <span className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-75"></span>
            )}
            <span className="absolute left-5 ml-1 whitespace-nowrap text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Events
            </span>
          </div>
        </button>

        {/* Footer dot */}
        <button
          onClick={() => scrollToSection("footer")}
          className="group flex items-center space-x-2"
        >
          <div
            className={`w-3 h-3 rounded-full ${
              activeSection === "footer"
                ? "bg-blue-500 scale-125"
                : "bg-gray-500 hover:bg-gray-400"
            } transition-all duration-300 ease-in-out relative`}
          >
            {activeSection === "footer" && (
              <span className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-75"></span>
            )}
            <span className="absolute left-5 ml-1 whitespace-nowrap text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Contact
            </span>
          </div>
        </button>
      </div>

      {/* Subtle grid overlay for depth */}
      {/* <div
        className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"
        style={{
          backgroundSize: "50px 50px",
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
        }}
      ></div> */}

      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Information Section with ID for scroll tracking */}
          <section id="information">
            <Information />
          </section>

          {/* Tabs */}
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Filters */}
          <Filters />

          {/* Events List Section with ID for scroll tracking */}
          <section id="events">
            <Events
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              betSide={betSide}
              setBetSide={setBetSide}
              handleBetSideSelect={handleBetSideSelect}
              handleBetSubmit={handleBetSubmit}
            />
          </section>
        </main>

        {/* Footer with ID for scroll tracking */}
        <section id="footer">
          <Footer />
        </section>
      </div>
    </div>
  );
}
