"use client"
import { useRef, useEffect, useState } from "react";
import {
  Send,
  User,
  Bot,
  MessageCircle,
  X,
  Minimize2,
  Sparkles,
  Code,
  Trash2,
  Mic,
  Square,
  Volume2,
  ThumbsUp,
  ThumbsDown,
  Zap,
  BookOpen,
  Briefcase,
  Mail,
  Clock,
  Download,
  GraduationCap,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  feedback?: "helpful" | "not-helpful";
}

export const AIAssistant = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: string; content: string }>
  >([]);

  // Enhanced portfolio-specific quick suggestions with icons
  const quickSuggestions = [
    {
      text: "Tell me about your projects",
      icon: Briefcase,
      category: "projects",
    },
    { text: "What's your tech stack?", icon: Code, category: "skills" },
    { text: "What's your experience?", icon: BookOpen, category: "experience" },
    { text: "How can I contact you?", icon: Mail, category: "contact" },
    {
      text: "Show me your education",
      icon: GraduationCap,
      category: "education",
    },
    { text: "Latest project details", icon: Zap, category: "projects" },
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  // Auto-resize textarea and focus
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }

    // Focus input when chat opens
    if (isChatOpen && !isMinimized) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 300);
    }
  }, [inputMessage, isChatOpen, isMinimized]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target as Node) &&
        isChatOpen
      ) {
        setIsMinimized(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isChatOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      await onSendMessage();
    }
  };

  const onSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Call the actual portfolio assistant API
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          history: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Update conversation history for context
      setConversationHistory((prev) => [
        ...prev.slice(-8), // Keep last 4 exchanges
        { role: "user", content: inputMessage },
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      // Enhanced fallback responses based on message content
      const userMessageLower = inputMessage.toLowerCase();
      let fallbackResponse = "";

      if (
        userMessageLower.includes("project") ||
        userMessageLower.includes("work")
      ) {
        fallbackResponse =
          "I'd be happy to tell you about my projects! I've built several full-stack applications including:\n\n• 🛒 **E-commerce Platform** - Full-stack with Next.js, MongoDB, Stripe payments\n• 💬 **Real-time Chat App** - React, Node.js, Socket.io for instant messaging\n• 🌐 **Portfolio Website** - This site with AI integration (Next.js, TypeScript)\n\nWhich project would you like to know more about?";
      } else if (
        userMessageLower.includes("skill") ||
        userMessageLower.includes("tech") ||
        userMessageLower.includes("stack")
      ) {
        fallbackResponse =
          "**My Tech Stack:**\n\n🎨 **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Vue.js\n⚙️ **Backend**: Node.js, Python, Express, FastAPI, MongoDB, PostgreSQL\n🛠 **Tools**: Git, Docker, AWS, Vercel, Figma, Jest\n🌟 **Soft Skills**: Problem Solving, Team Collaboration, Agile Methodology\n\nI have 3+ years of experience with these technologies. Any specific area you're curious about?";
      } else if (
        userMessageLower.includes("experience") ||
        userMessageLower.includes("background") ||
        userMessageLower.includes("work history")
      ) {
        fallbackResponse =
          "**Professional Experience:**\n\n🏢 **Tech Innovations Ltd.** (2022-Present)\nSenior Full-Stack Developer - Leading project development\n\n🏢 **Startup Solutions Inc.** (2020-2022)  \nFull-Stack Developer - Client project delivery\n\n💼 **Freelance** (2019-2020)\nWeb Developer - 20+ successful projects\n\nI have experience across startups and established companies. Would you like details on a specific role?";
      } else if (
        userMessageLower.includes("contact") ||
        userMessageLower.includes("email") ||
        userMessageLower.includes("hire") ||
        userMessageLower.includes("reach")
      ) {
        fallbackResponse =
          "**Contact Information:**\n\n📧 Email: sorujmahmudb2h@gmail.com\n📱 Phone: +8801795397598\n📍 Location: Nagur Pur, Tangail, Dhaka, Bangladesh\n\n🌐 **Connect:**\n• GitHub: github.com/sorujmahmud\n• LinkedIn: linkedin.com/in/sorujmahmud\n• Portfolio: sorujmahmud.vercel.app\n\nI'm available for freelance projects and full-time opportunities!";
      } else if (
        userMessageLower.includes("education") ||
        userMessageLower.includes("degree") ||
        userMessageLower.includes("university")
      ) {
        fallbackResponse =
          "**Education & Certifications:**\n\n🎓 **University of Dhaka**\nBSc in Computer Science (2016-2020)\nFirst Class Honors, Dean's List\n\n📜 **Certifications:**\n• AWS Certified Developer Associate\n• Google Cloud Professional Developer\n• MongoDB Certified Developer\n\nI'm continuously learning and updating my skills!";
      } else {
        fallbackResponse =
          "Hello! I'm Soruj's AI assistant. I can help you learn about:\n\n• 🎨 **Projects** and technical implementations\n• 💻 **Skills** and technology expertise  \n• 💼 **Work Experience** and professional background\n• 📞 **Contact Information** and availability\n• 🎓 **Education** and certifications\n\nWhat would you like to know more about?";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: fallbackResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = (suggestion: {
    text: string;
    category: string;
  }) => {
    setInputMessage(suggestion.text);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const clearChat = () => {
    setMessages([]);
    setShowFeedback(null);
    setConversationHistory([]);
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, feedback: isPositive ? "helpful" : "not-helpful" }
          : msg
      )
    );
    setShowFeedback(null);

    // In a real app, you might want to send this feedback to your analytics
    console.log(
      `Feedback: ${
        isPositive ? "positive" : "negative"
      } for message ${messageId}`
    );
  };

  const handleSpeak = async () => {
    if (!isSpeaking) {
      // Start speech recognition (simulated for demo)
      setIsSpeaking(true);
      try {
        // In a real implementation, you would use the Web Speech API
        // For now, we'll simulate voice input with common questions
        const voiceQuestions = [
          "Can you show me your latest projects?",
          "What technologies do you use?",
          "Tell me about your work experience",
          "How can I contact you?",
          "What's your educational background?",
        ];

        await new Promise((resolve) => setTimeout(resolve, 2000));
        const randomQuestion =
          voiceQuestions[Math.floor(Math.random() * voiceQuestions.length)];
        setInputMessage(randomQuestion);
      } finally {
        setIsSpeaking(false);
      }
    } else {
      // Stop speech recognition
      setIsSpeaking(false);
    }
  };

  const readMessageAloud = (content: string) => {
    if ("speechSynthesis" in window) {
      // Stop any current speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onend = () => {
        console.log("Finished reading message aloud");
      };

      speechSynthesis.speak(utterance);
    }
  };

  const exportConversation = () => {
    const conversationText = messages
      .map(
        (msg) => `${msg.type === "user" ? "You" : "Assistant"}: ${msg.content}`
      )
      .join("\n\n");

    const blob = new Blob([conversationText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-chat-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Floating Chat Button
  if (!isChatOpen) {
    return (
      <button
        onClick={() => {
          setIsChatOpen(true);
          setIsMinimized(false);
        }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 group animate-bounce hover:animate-none"
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
          <Sparkles className="w-2 h-2 text-white" />
        </span>
      </button>
    );
  }

  // Minimized State
  if (isMinimized) {
    return (
      <div
        ref={chatContainerRef}
        className="fixed bottom-6 right-6 w-80 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 z-50 overflow-hidden animate-slide-up"
      >
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          onClick={() => setIsMinimized(false)}
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">
                  Soruj&apos;s Assistant
                </h3>
                <p className="text-xs opacity-90">
                  {messages.length > 0
                    ? `${messages.length} messages`
                    : "Ask me anything!"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearChat();
                }}
                className="text-white hover:text-gray-200 transition-colors p-1"
                title="Clear chat"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChatOpen(false);
                }}
                className="text-white hover:text-gray-200 transition-colors p-1"
                title="Close"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full Chat Interface
  return (
    <div
      ref={chatContainerRef}
      className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 z-50 animate-slide-up"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 rounded-t-2xl">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Code className="w-5 h-5" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Soruj&apos;s Assistant</h3>
              <p className="text-xs opacity-90 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Online • Ask me anything
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {messages.length > 0 && (
              <button
                onClick={exportConversation}
                className="text-white hover:text-gray-200 transition-colors p-2"
                title="Export conversation"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={clearChat}
              disabled={messages.length === 0}
              className="text-white hover:text-gray-200 transition-colors p-2 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-white hover:text-gray-200 transition-colors p-2"
              title="Minimize"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-gray-200 transition-colors p-2"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gradient-to-br from-gray-900 to-gray-800 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
        ref={messagesEndRef}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 px-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">
                Hello! I&apos;m Soruj&apos;s AI Assistant
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                I can help you learn about Soruj&apos;s projects, technical
                skills, work experience, education, and how to get in touch.
                What would you like to know?
              </p>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {quickSuggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-200 px-4 py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-md hover:border-blue-500 hover:text-blue-300 text-left group flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="flex-1">{suggestion.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 group ${
                  message.type === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : "bg-gradient-to-r from-green-500 to-green-600"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`flex-1 max-w-[85%] ${
                    message.type === "user" ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`inline-block rounded-2xl px-4 py-3 transition-all duration-200 ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none shadow-lg"
                        : "bg-gray-700 border border-gray-600 text-gray-200 rounded-bl-none shadow-sm hover:shadow-md"
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>

                  {/* Message Actions */}
                  <div
                    className={`flex items-center mt-2 space-x-2 ${
                      message.type === "user"
                        ? "justify-end"
                        : "justify-between"
                    }`}
                  >
                    <span className="text-xs text-gray-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </span>

                    {message.type === "ai" && !message.feedback && (
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => readMessageAloud(message.content)}
                          className="text-gray-500 hover:text-blue-400 transition-colors p-1"
                          title="Read aloud"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() =>
                            setShowFeedback(
                              showFeedback === message.id ? null : message.id
                            )
                          }
                          className="text-gray-500 hover:text-green-400 transition-colors p-1"
                          title="Provide feedback"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {message.type === "ai" && message.feedback && (
                      <div className="text-xs text-gray-400 italic flex items-center space-x-1">
                        {message.feedback === "helpful" ? (
                          <>
                            <ThumbsUp className="w-3 h-3 text-green-400" />
                            <span>Thank you!</span>
                          </>
                        ) : (
                          <>
                            <ThumbsDown className="w-3 h-3 text-red-400" />
                            <span>Noted, I&apos;ll improve!</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Feedback Buttons */}
                  {showFeedback === message.id && message.type === "ai" && (
                    <div className="flex items-center space-x-2 mt-2 animate-fade-in">
                      <span className="text-xs text-gray-400">Helpful?</span>
                      <button
                        onClick={() => handleFeedback(message.id, true)}
                        className="text-gray-500 hover:text-green-400 transition-colors p-1"
                        title="Yes, helpful"
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleFeedback(message.id, false)}
                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                        title="Not helpful"
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Enhanced Loading Animation */}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-r from-green-500 to-green-600">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-700 border border-gray-600 text-gray-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className="border-t border-gray-700 bg-gray-800/95 backdrop-blur-sm p-6 rounded-b-2xl">
        <form onSubmit={handleSubmit} className="flex space-x-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about projects, skills, experience, or contact info..."
              className="w-full px-4 py-3 border border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-24 bg-gray-700 text-white transition-all duration-200 placeholder-gray-400 scrollbar-thin"
              rows={1}
              disabled={isLoading}
              maxLength={500}
            />
            <div className="absolute right-3 bottom-3 flex items-center space-x-2">
              <span
                className={`text-xs ${
                  inputMessage.length > 450 ? "text-red-400" : "text-gray-400"
                }`}
              >
                {inputMessage.length}/500
              </span>
              <button
                type="button"
                onClick={handleSpeak}
                className={`p-1 rounded transition-colors ${
                  isSpeaking
                    ? "text-red-400 bg-red-900/50 animate-pulse"
                    : "text-gray-400 hover:text-blue-400 hover:bg-blue-900/50"
                }`}
                title={isSpeaking ? "Stop recording" : "Voice input"}
                disabled={isLoading}
              >
                {isSpeaking ? (
                  <Square className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white p-3 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:scale-100 min-w-[44px] min-h-[44px] group"
            title="Send message"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            )}
          </button>
        </form>

        {/* Enhanced Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
          <button
            onClick={clearChat}
            disabled={messages.length === 0}
            className="flex items-center space-x-1 text-xs text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear chat</span>
          </button>

          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Powered by AI</span>
          </div>

          {messages.length > 0 && (
            <button
              onClick={exportConversation}
              className="flex items-center space-x-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
              title="Export conversation"
            >
              <Download className="w-3 h-3" />
              <span>Export</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
