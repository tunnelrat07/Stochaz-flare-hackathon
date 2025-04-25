import { useState, useEffect, useRef } from "react";
import {
  Pyramid,
  Shield,
  Zap,
  Dices,
  Github,
  Twitter,
  Mail,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Navbar from "./AppComponents/Navigation";
import AboutProject from "./LearnMoreComponents/AboutTheProject.jsx";
import SmartContract from "./LearnMoreComponents/SmartContract.jsx";
import AboutTheCreator from "./LearnMoreComponents/AboutTheCreator.jsx";

export function LearnMore() {
  const [contractExpanded, setContractExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const codeContainerRef = useRef(null);

  // Handle scroll progress for fancy background effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);

      // Determine active section based on scroll position
      const sections = ["about", "contract", "creator"];
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

  const handleCopy = () => {
    if (codeContainerRef.current) {
      navigator.clipboard.writeText(codeContainerRef.current.textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleContract = () => {
    setContractExpanded(!contractExpanded);
  };

  // Load Prism.js and highlight the code
  useEffect(() => {
    // Define a function to load Prism.js
    const loadPrism = async () => {
      if (typeof window !== "undefined" && contractExpanded) {
        // Create and append Prism.js script if it doesn't exist
        if (!document.getElementById("prism-script")) {
          const prismScript = document.createElement("script");
          prismScript.id = "prism-script";
          prismScript.src =
            "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js";
          prismScript.async = true;
          document.body.appendChild(prismScript);

          // Add Solidity language support
          const solidityScript = document.createElement("script");
          solidityScript.src =
            "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-solidity.min.js";
          solidityScript.async = true;
          document.body.appendChild(solidityScript);

          // Add CSS
          if (!document.getElementById("prism-css")) {
            const prismCss = document.createElement("link");
            prismCss.id = "prism-css";
            prismCss.rel = "stylesheet";
            prismCss.href =
              "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-okaidia.min.css";
            document.head.appendChild(prismCss);
          }

          // Wait for scripts to load
          prismScript.onload = () => {
            if (window.Prism && codeContainerRef.current) {
              window.Prism.highlightElement(codeContainerRef.current);
            }
          };
        } else if (window.Prism && codeContainerRef.current) {
          // If Prism is already loaded, just highlight
          window.Prism.highlightElement(codeContainerRef.current);
        }
      }
    };

    loadPrism();
  }, [contractExpanded]);

  // Handle section navigation
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen text-white relative overflow-hidden animate-fadeIn opacity-1 ">
        {/* Animated background gradient - updated to blue/black */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-800 to-black opacity-50"
          style={{
            transform: `rotate(${scrollProgress * 0.3}deg) scale(${
              1 + scrollProgress * 0.003
            })`,
            transition: "transform 0.2s ease-out",
          }}
        />

        {/* Floating elements in background - updated colors */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-700 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          <div
            className="absolute top-1/4 -right-20 w-80 h-80 bg-cyan-600 rounded-full filter blur-3xl opacity-10 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/4 -left-20 w-72 h-72 bg-blue-900 rounded-full filter blur-3xl opacity-10 animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        {/* Navigation dots - updated active dot color to blue */}
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-10 hidden lg:flex flex-col items-center justify-center space-y-6">
          {/* About dot */}
          <button
            onClick={() => scrollToSection("about")}
            className="group flex items-center space-x-2"
          >
            <div
              className={`w-3 h-3 rounded-full ${
                activeSection === "about"
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-500 hover:bg-gray-400"
              } transition-all duration-300 ease-in-out relative`}
            >
              {activeSection === "about" && (
                <span className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-75"></span>
              )}
              <span className="absolute left-5 ml-1 whitespace-nowrap text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                About
              </span>
            </div>
          </button>

          {/* Contract dot */}
          <button
            onClick={() => scrollToSection("contract")}
            className="group flex items-center space-x-2"
          >
            <div
              className={`w-3 h-3 rounded-full ${
                activeSection === "contract"
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-500 hover:bg-gray-400"
              } transition-all duration-300 ease-in-out relative`}
            >
              {activeSection === "contract" && (
                <span className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-75"></span>
              )}
              <span className="absolute left-5 ml-1 whitespace-nowrap text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Contract
              </span>
            </div>
          </button>

          {/* Creator dot */}
          <button
            onClick={() => scrollToSection("creator")}
            className="group flex items-center space-x-2"
          >
            <div
              className={`w-3 h-3 rounded-full ${
                activeSection === "creator"
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-500 hover:bg-gray-400"
              } transition-all duration-300 ease-in-out relative`}
            >
              {activeSection === "creator" && (
                <span className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-75"></span>
              )}
              <span className="absolute left-5 ml-1 whitespace-nowrap text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Creator
              </span>
            </div>
          </button>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="space-y-20">
            {/* About the Project */}
            <section id="about" className="scroll-mt-20">
              <AboutProject />
            </section>

            {/* Smart Contract */}
            <section id="contract" className="scroll-mt-20">
              <SmartContract
                handleCopy={handleCopy}
                toggleContract={toggleContract}
                contractExpanded={contractExpanded}
                copied={copied}
                codeContainerRef={codeContainerRef}
              />
            </section>

            {/* About the Creator */}
            <section id="creator" className="scroll-mt-20">
              <AboutTheCreator />
            </section>
          </div>
        </main>

        {/* Footer with gradient - updated to match blue theme */}
        <footer className="bg-gradient-to-t from-gray-900 to-transparent py-8 mt-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} • Built with ❤️ on the Flare
                blockchain
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="https://github.com/tunnelrat07"
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://x.com/mundane_league7"
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="mailto:reachashish2004@gmail.com"
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
