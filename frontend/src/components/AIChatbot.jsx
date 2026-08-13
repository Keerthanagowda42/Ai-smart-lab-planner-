import React, { useState, useRef, useEffect } from "react";
import "./AIChatbot.css";

const quickPrompts = [
  "📐 Suggest 3D layout for 24 PCs",
  "⚡ What UPS size do I need?",
  "🌐 Explain Star vs Mesh topology",
  "💰 Estimate budget for 24 PCs",
  "🧊 How to change 3D room themes?",
];

function getBotResponse(userMsg) {
  const msg = userMsg.toLowerCase();

  if (msg.includes("layout") || msg.includes("3d") || msg.includes("room")) {
    return "🤖 **3D Room Layout Assistant**: HKBK College of Engineering Lab Planner supports **6 3D Room Layout Modes**:\n1. 📐 **Grid Columns**: Dual 4x3 blocks (2.35 ft corridor clearance).\n2. 🔄 **U-Shape**: Perimeter workshop setup.\n3. 🧩 **Team Pods**: 6 Island clusters (4 PCs per pod).\n4. 🏢 **High Density**: Dual continuous back-to-back rows.\n5. 👔 **Boardroom Square**: Executive hollow perimeter.\n6. 📐 **Chevron**: 25° angled sightlines facing front screen.";
  }

  if (msg.includes("ups") || msg.includes("power") || msg.includes("electrical")) {
    return "⚡ **Electrical & Power Analysis**: For a 24-PC Computer Lab at HKBK Engg:\n• Total Power Load: **18.5 kW** (450W per PC peak + server + ACs).\n• Recommended UPS: **10 kVA Compact Floor-standing UPS** (30 Min Backup).\n• Circuit Breakers: **5x 16A MCB Units**.\n• Air Conditioners: **2x 2.0 Ton Split Inverter ACs**.";
  }

  if (msg.includes("network") || msg.includes("star") || msg.includes("mesh") || msg.includes("switch")) {
    return "🌐 **Network Infrastructure**: Recommended **1 Gbps Star Network Topology**:\n• Core Switch: **24-Port Managed Gigabit PoE+ Switch** mounted in 42U Server Rack.\n• Fiber Trunking: High-speed Cat6 UTP cabling & glowing fiber optic data conduits.\n• Redundancy: Dual uplink channels connected to HKBK Campus Backbone.";
  }

  if (msg.includes("budget") || msg.includes("cost") || msg.includes("price") || msg.includes("bom")) {
    return "💰 **Estimated Bill of Materials (BOM)** for 24 PCs at HKBK Engg:\n• Workstation Hardware: **₹9.12 Lakhs** (Intel i7 13700K / 16GB DDR5 / 512GB SSD / RTX 3050).\n• Network Infrastructure: **₹85,000** (Switch, Cables, Rack).\n• Electrical & UPS: **₹1.80 Lakhs** (10 kVA UPS + Wiring).\n• Furniture & Desks: **₹1.20 Lakhs**.\n• **Total Estimated Budget**: **₹13.02 Lakhs**.";
  }

  if (msg.includes("hkbk") || msg.includes("college") || msg.includes("keerthana")) {
    return "🎓 **HKBK College of Engineering AI Engine**: Customized for Manyata Tech Park, Nagawara, Bangalore campus. Direct hotline support available at **+91 80507 42738** (`hkbk.admin@hkbk.edu.in`).";
  }

  return "🤖 **AI Lab Planning Assistant**: I can help you with 3D Spatial Layouts (6 modes), Electrical UPS Sizing (10 kVA), 1 Gbps Star Network Topology, or Bill of Materials Budget Estimation for HKBK College of Engineering!";
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I am your **AI Smart Lab Planning Assistant** for HKBK College of Engineering. How can I help you design your computer lab today?",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputVal("");

    setTimeout(() => {
      const botReply = { sender: "bot", text: getBotResponse(text) };
      setMessages((prev) => [...prev, botReply]);
    }, 500);
  };

  return (
    <div className="ai-chatbot-wrapper">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button className="ai-chatbot-trigger" onClick={() => setIsOpen(true)}>
          <span className="ai-bot-icon">🤖</span>
          <span>AI Lab Assistant</span>
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="ai-chat-window">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <span className="ai-status-dot"></span>
              <div>
                <h4>AI Smart Lab Assistant</h4>
                <small>HKBK Engg Lab Engine Online</small>
              </div>
            </div>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          {/* Messages Stream */}
          <div className="ai-chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`ai-msg ${msg.sender}`}>
                {msg.text.split("\n").map((line, idx) => (
                  <p key={idx} style={{ margin: "2px 0" }}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="ai-quick-prompts">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                className="ai-prompt-pill"
                onClick={() => handleSend(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form Bar */}
          <form
            className="ai-chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Ask AI about 3D layouts, UPS, budget..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button type="submit" className="ai-send-btn">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
