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
  const [highlightedCode, setHighlightedCode] = useState("");
  const codeContainerRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(smartContractCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen text-white animate-fadeIn opacity-1">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* About the Project */}
          <AboutProject />
          {/* Smart Contract */}
          <SmartContract
            handleCopy={handleCopy}
            toggleContract={toggleContract}
            contractExpanded={contractExpanded}
            highlightedCode={highlightedCode}
            copied={copied}
            codeContainerRef={codeContainerRef}
          />
          {/* About the Creator */}
          <AboutTheCreator />
        </main>
      </div>
    </>
  );
}
