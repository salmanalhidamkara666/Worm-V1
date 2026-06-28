import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Menu, X, Bug } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Advertise", action: () => scrollToSection("pricing") },
    { label: "Pricing", action: () => scrollToSection("pricing") },
    { label: "Community", href: "https://t.me/wormgpt4", external: true },
    { label: "Support", href: "https://t.me/dark0_101", external: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Bug className="w-6 h-6 text-red-500 group-hover:rotate-12 transition-transform" />
            <span className="text-red-500 font-bold text-lg tracking-wider">
              WORMGPT
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isHome ? (
              <>
                {navLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      key={link.label}
                      onClick={link.action}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  )
                )}
              </>
            ) : (
              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isHome ? (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white hover:bg-white/5"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/chat">
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Chat Now
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5">
          <div className="px-4 py-4 space-y-3">
            {isHome &&
              navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-gray-400 hover:text-white py-2"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="block text-sm text-gray-400 hover:text-white py-2"
                  >
                    {link.label}
                  </button>
                )
              )}
            {!isHome && (
              <Link
                to="/"
                className="block text-sm text-gray-400 hover:text-white py-2"
              >
                Home
              </Link>
            )}
            <div className="flex gap-3 pt-3 border-t border-white/10">
              <Link to="/login" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-gray-300 hover:bg-white/5"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/chat" className="flex-1">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
