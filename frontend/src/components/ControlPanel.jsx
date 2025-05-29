import React from "react";
import "./ControlPanel.css";

const ControlPanel = () => {
  const handleStartCrawl = async () => {
    await fetch("http://localhost:5000/api/start-crawl", { method: "POST" });
    alert("Crawling started!");
  };

  return (
    <div className="crawler-panel p-6 mb-6">
      <div className="crawler-controls-vertical">
        <button
          className="crawler-btn bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-5 py-2 rounded-lg shadow-lg"
          onClick={handleStartCrawl}
        >
          ▶ Start Crawl
        </button>
        <button className="crawler-btn bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white px-5 py-2 rounded-lg shadow-lg">
          ⏹ Stop Crawl
        </button>
        <select className="crawler-select px-4 py-2 rounded-lg text-indigo-700 font-semibold">
          <option value="daily">Run Daily</option>
          <option value="weekly">Run Weekly</option>
        </select>
      </div>
    </div>
  );
};

export default ControlPanel;
