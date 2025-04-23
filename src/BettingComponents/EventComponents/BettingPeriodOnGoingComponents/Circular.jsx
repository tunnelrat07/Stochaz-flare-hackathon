import React from "react";

const CircularIndicator = ({
  percentage,
  label,
  strokeColor,
  backgroundColor = "#1F2937",
  size = 168,
  strokeWidth = 14,
  textColor = "white",
  valueText = "",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius / 2}
            fill="#0F172A"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x={size / 2}
            y={size / 2 - 5}
            textAnchor="middle"
            fill={textColor}
            fontSize="24"
            fontWeight="bold"
          >
            {percentage.toFixed(0)}%
          </text>
          <text
            x={size / 2}
            y={size / 2 + 16}
            textAnchor="middle"
            fill={textColor}
            fontSize="10"
            opacity="0.7"
          >
            {valueText}
          </text>
        </svg>
      </div>
      <div className="mt-2 text-center">
        <span className="text-sm font-bold text-white tracking-widest">
          {label}
        </span>
      </div>
    </div>
  );
};

export default function DualCircularBetGraph({
  maximumBetFromEitherTeamInUSD,
  totalForBettedAmountInUSD,
  totalAgainstBettedAmountInUSD,
  amountBettedForByUser,
  amountBettedAgainstByUser,
}) {
  const totalForPercentage =
    maximumBetFromEitherTeamInUSD > 0
      ? (totalForBettedAmountInUSD / maximumBetFromEitherTeamInUSD) * 100
      : 0;
  const totalAgainstPercentage =
    maximumBetFromEitherTeamInUSD > 0
      ? (totalAgainstBettedAmountInUSD / maximumBetFromEitherTeamInUSD) * 100
      : 0;

  const userForPercentage =
    totalForBettedAmountInUSD > 0
      ? (amountBettedForByUser / totalForBettedAmountInUSD) * 100
      : 0;
  const userAgainstPercentage =
    totalAgainstBettedAmountInUSD > 0
      ? (amountBettedAgainstByUser / totalAgainstBettedAmountInUSD) * 100
      : 0;

  return (
    <div className="p-6 mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
            Betting Progress
          </span>
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 rounded-full"></span>
        </h3>

        <div className="bg-gray-800 py-1.5 px-4 rounded-lg border border-gray-700 shadow-lg">
          <span className="text-xs font-medium text-gray-400">
            Maximum Bet:{" "}
          </span>
          <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">
            ${maximumBetFromEitherTeamInUSD}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-4 justify-items-center">
        <CircularIndicator
          percentage={totalForPercentage}
          label="TOTAL FOR"
          strokeColor="#3B82F6"
          valueText={`$${totalForBettedAmountInUSD.toFixed(2)}`}
        />
        <CircularIndicator
          percentage={userForPercentage}
          label="YOUR FOR"
          strokeColor="#60A5FA"
          valueText={`$${amountBettedForByUser.toFixed(2)}`}
        />
        <CircularIndicator
          percentage={totalAgainstPercentage}
          label="TOTAL AGAINST"
          strokeColor="#EF4444"
          valueText={`$${totalAgainstBettedAmountInUSD.toFixed(2)}`}
        />
        <CircularIndicator
          percentage={userAgainstPercentage}
          label="YOUR AGAINST"
          strokeColor="#FB7185"
          valueText={`$${amountBettedAgainstByUser.toFixed(2)}`}
        />
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border border-gray-700 text-xs text-gray-400 flex items-center shadow-lg">
        <div className="w-5 h-5 mr-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
        Progress shows how close each side is to reaching the maximum allowed
        bet and how much you have contributed relative to each side's total.
      </div>
    </div>
  );
}
