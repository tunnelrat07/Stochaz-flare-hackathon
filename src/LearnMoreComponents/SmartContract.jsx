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
import { smartContractCode } from "./smartContractCode.js";
export default function SmartContract({
  handleCopy,
  toggleContract,
  contractExpanded,
  highlightedCode,
  copied,
  codeContainerRef,
}) {
  return (
    <>
      <section className="mb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-8 flex items-center">
            <Shield className="h-8 w-8 text-fuchsia-500 mr-3" />
            The Smart Contract
          </h2>
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-gray-900">
              <div className="flex items-center">
                <span className="text-fuchsia-400 font-mono mr-2">
                  DecentralizedBetting.sol
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleContract}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {contractExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={handleCopy}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {contractExpanded && (
              <div className="relative overflow-auto p-4 bg-gray-900 max-h-200">
                <style>{`
                    .code-container {
                      border-radius: 0.5rem;
                      font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
                      font-size: 14px;
                      line-height: 1.5;
                      direction: ltr;
                      text-align: left;
                      white-space: pre;
                      word-spacing: normal;
                      word-break: normal;
                      word-wrap: normal;
                      tab-size: 4;
                      hyphens: none;
                      background: #282c34;
                      color: #abb2bf;
                      padding: 1em;
                      margin: 0;
                      overflow: auto;
                    }
                    /* Custom styles to enhance the code display */
                    .token.comment { color: #5c6370; font-style: italic; }
                    .token.keyword { color: #c678dd; }
                    .token.function { color: #61afef; }
                    .token.string { color: #98c379; }
                    .token.number { color: #d19a66; }
                    .token.operator { color: #56b6c2; }
                    .token.class-name { color: #e5c07b; }
                    .token.punctuation { color: #abb2bf; }
                    .token.boolean { color: #d19a66; }
                  `}</style>
                <pre className="code-container">
                  <code ref={codeContainerRef} className="language-solidity">
                    {smartContractCode}
                  </code>
                </pre>
              </div>
            )}
          </div>
          <div className="mt-6 text-gray-400 text-sm">
            <p>
              This smart contract showcases the core functionality of our
              decentralized betting platform. The actual implementation may
              vary.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
