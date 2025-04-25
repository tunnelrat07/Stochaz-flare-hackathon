import { useState, useEffect } from "react";
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
import Navbar from "./AppComponents/Navigation.jsx";
import Hero from "./AppComponents/Hero.jsx";
import Features from "./AppComponents/Features.jsx";
import HowitWorks from "./AppComponents/HowItWorks.jsx";
import Cta from "./AppComponents/CTA.jsx";
import Footer from "./AppComponents/Footer.jsx";

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  // Handle scroll progress for dynamic background effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);

      // Determine active section based on scroll position
      const sections = ["hero", "features", "howItWorks", "cta"];
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

  return (
    <div className="min-h-screen bg-slate-950 text-white animate-fadeIn opacity-1 relative overflow-hidden">
      {/* Animated background gradient - updated to blue/black */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-800 to-black opacity-50"
        style={{
          transform: `rotate(${scrollProgress * 0.3}deg) scale(${
            1.05 + scrollProgress * 0.002
          })`,
          transition: "transform 0.2s ease-out",
        }}
      />

      {/* Floating elements in background - updated colors */}
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

      {/* Navigation dots - updated active dot color to blue */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center justify-center space-y-6">
        {/* Hero dot */}
        <button
          onClick={() => scrollToSection("hero")}
          className="group flex items-center space-x-2"
        >
          <div
            className={`w-3 h-3 rounded-full ${
              activeSection === "hero"
                ? "bg-blue-500 scale-125"
                : "bg-gray-500 hover:bg-gray-400"
            } transition-all duration-300 ease-in-out relative`}
          >
            {activeSection === "hero" && (
              <span className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-75"></span>
            )}
            <span className="absolute left-5 ml-1 whitespace-nowrap text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Home
            </span>
          </div>
        </button>

        {/* Features dot */}
        <button
          onClick={() => scrollToSection("features")}
          className="group flex items-center space-x-2"
        >
          <div
            className={`w-3 h-3 rounded-full ${
              activeSection === "features"
                ? "bg-blue-500 scale-125"
                : "bg-gray-500 hover:bg-gray-400"
            } transition-all duration-300 ease-in-out relative`}
          >
            {activeSection === "features" && (
              <span className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-75"></span>
            )}
            <span className="absolute left-5 ml-1 whitespace-nowrap text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Features
            </span>
          </div>
        </button>

        {/* How it Works dot */}
        <button
          onClick={() => scrollToSection("howItWorks")}
          className="group flex items-center space-x-2"
        >
          <div
            className={`w-3 h-3 rounded-full ${
              activeSection === "howItWorks"
                ? "bg-blue-500 scale-125"
                : "bg-gray-500 hover:bg-gray-400"
            } transition-all duration-300 ease-in-out relative`}
          >
            {activeSection === "howItWorks" && (
              <span className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-75"></span>
            )}
            <span className="absolute left-5 ml-1 whitespace-nowrap text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              How It Works
            </span>
          </div>
        </button>

        {/* CTA dot */}
        <button
          onClick={() => scrollToSection("cta")}
          className="group flex items-center space-x-2"
        >
          <div
            className={`w-3 h-3 rounded-full ${
              activeSection === "cta"
                ? "bg-blue-500 scale-125"
                : "bg-gray-500 hover:bg-gray-400"
            } transition-all duration-300 ease-in-out relative`}
          >
            {activeSection === "cta" && (
              <span className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-75"></span>
            )}
            <span className="absolute left-5 ml-1 whitespace-nowrap text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Get Started
            </span>
          </div>
        </button>
      </div>

      {/* Content with relative positioning and section IDs */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* Features Section */}
        <section id="features">
          <Features />
        </section>

        {/* How It Works */}
        <section id="howItWorks">
          <HowitWorks />
        </section>

        {/* CTA Section */}
        <section id="cta">
          <Cta />
        </section>

        {/* Footer */}
        <Footer />
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
    </div>
  );
}
