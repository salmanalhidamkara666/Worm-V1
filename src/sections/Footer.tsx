import { Bug } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4 text-red-500" />
          <span className="text-gray-500 text-sm">
            &copy; 2026 WORMGPT. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://t.me/dark0_101"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-red-400 text-sm transition-colors"
          >
            Support
          </a>
          <a
            href="https://t.me/wormgpt4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-red-400 text-sm transition-colors"
          >
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}
