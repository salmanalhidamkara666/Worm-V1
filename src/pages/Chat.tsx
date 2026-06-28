import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bug,
  Send,
  Plus,
  Menu,
  X,
  Trash2,
  MessageSquare,
  ChevronDown,
  Zap,
  Brain,
  Cpu,
  Code2,
  Rocket,
  Crown,
  LogOut,
  User,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { trpc } from "@/providers/trpc";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const modelOptions = [
  { id: "worm-v4.0", name: "Worm v4.0", tag: "FAST", icon: Zap },
  { id: "worm-v4.1", name: "Worm v4.1", tag: "DEEP", icon: Brain },
  { id: "worm-v4.3", name: "Worm v4.3", tag: "SMART", icon: Cpu },
  { id: "worm-coder", name: "Worm-Coder", tag: "ELITE", icon: Code2 },
  { id: "worm-v5.0", name: "Worm v5.0", tag: "SUPREME", icon: Rocket },
  { id: "worm-v5.1", name: "Worm v5.1", tag: "ULTRA", icon: Crown },
];

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("worm-v4.0");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const [chatTitle, setChatTitle] = useState("New Chat");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const createChat = trpc.chat.create.useMutation();
  const sendMessageMutation = trpc.chat.sendMessage.useMutation();

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setChatTitle("New Chat");
    setInput("");
    inputRef.current?.focus();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      let chatId = currentChatId;
      if (!chatId) {
        const result = await createChat.mutateAsync({
          title: userMessage.slice(0, 50) || "New Chat",
          model: selectedModel,
        });
        chatId = result.id;
        setCurrentChatId(chatId);
        setChatTitle(userMessage.slice(0, 50));
      }

      const history = messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

      const response = await sendMessageMutation.mutateAsync({
        chatId,
        content: userMessage,
        history,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.content },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error processing request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectedModelData = modelOptions.find((m) => m.id === selectedModel);

  return (
    <div className="h-screen flex bg-[hsl(var(--background))] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-50 w-72 h-full bg-[hsl(var(--card))] border-r border-white/5 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-2">
              <Bug className="w-5 h-5 text-red-500" />
              <span className="text-red-500 font-bold tracking-wider text-sm">
                WORMGPT
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <Button
            onClick={handleNewChat}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Chat History */}
        <ScrollArea className="flex-1 p-3">
          {currentChatId ? (
            <button
              onClick={() => {}}
              className="w-full text-left p-3 rounded-lg bg-white/5 border border-red-500/20 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-sm text-white truncate">{chatTitle}</span>
              </div>
            </button>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-8 h-8 text-gray-700 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">No conversations yet</p>
            </div>
          )}
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full min-w-0">
        {/* Chat Header */}
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-[hsl(var(--card))]/50 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Model Selector */}
            <div className="relative">
              <button
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors"
              >
                {selectedModelData && (
                  <selectedModelData.icon className="w-4 h-4 text-red-400" />
                )}
                <span className="text-sm text-white">
                  {selectedModelData?.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 font-medium">
                  {selectedModelData?.tag}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              {modelDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setModelDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-56 glass-card rounded-xl p-2 z-50 shadow-xl">
                    {modelOptions.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model.id);
                          setModelDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                          selectedModel === model.id
                            ? "bg-red-500/10 border border-red-500/20"
                            : "hover:bg-white/5"
                        }`}
                      >
                        <model.icon className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-white flex-1 text-left">
                          {model.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-400">
                          {model.tag}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {currentChatId && (
            <button
              onClick={handleNewChat}
              className="text-gray-500 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </header>

        {/* Messages Area */}
        <ScrollArea className="flex-1" ref={scrollRef}>
          <div className="max-w-3xl mx-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                  <Bug className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome to WORMGPT
                </h2>
                <p className="text-gray-400 text-center max-w-md mb-8">
                  Start a conversation with the most powerful unrestricted AI.
                  No filters, no limits.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  {[
                    "Explain quantum computing",
                    "Write a Python web scraper",
                    "Analyze this code for vulnerabilities",
                    "Help me debug this error",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setInput(suggestion);
                        inputRef.current?.focus();
                      }}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-white/[0.07] transition-all text-left"
                    >
                      <span className="text-sm text-gray-300">
                        {suggestion}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-6 space-y-1">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`px-4 sm:px-6 py-4 ${
                      msg.role === "assistant"
                        ? "bg-white/[0.02]"
                        : ""
                    }`}
                  >
                    <div className="max-w-3xl mx-auto flex gap-4">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          msg.role === "user"
                            ? "bg-white/10"
                            : "bg-red-500/10"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <User className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Bug className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                          {msg.role === "user" ? "You" : "WormGPT"}
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="px-4 sm:px-6 py-4 bg-white/[0.02]">
                    <div className="max-w-3xl mx-auto flex gap-4">
                      <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <Bug className="w-4 h-4 text-red-500 animate-pulse" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-white/5 bg-[hsl(var(--card))]/50 backdrop-blur-xl p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-600 pr-12 py-5 focus:border-red-500/50 focus:ring-red-500/20"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-red-600 hover:bg-red-700 text-white h-11 w-11 flex-shrink-0 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-gray-600 text-center mt-2">
              WORMGPT can make mistakes. Consider checking important
              information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
