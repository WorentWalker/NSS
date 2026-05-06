import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Solutions", path: "/solutions" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const NSS_GREEN = "#2DC653";
const TEXT = "#0F172A";
const MUTED = "#64748B";
const BORDER = "#E2EAF2";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("NL");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? BORDER : "rgba(226,234,242,0.5)"}`,
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40,
              background: "linear-gradient(135deg, #2DC653, #1DA040)",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(45,198,83,0.3)",
            }}>
              <span style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 900, letterSpacing: "-0.02em" }}>NSS</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: TEXT, lineHeight: 1.1 }}>
                <span style={{ color: NSS_GREEN }}>NSS</span>
              </div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", color: MUTED, textTransform: "uppercase", lineHeight: 1 }}>
                New Solar System
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  textDecoration: "none",
                  color: location.pathname === link.path ? NSS_GREEN : MUTED,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  transition: "color 0.2s",
                  borderBottom: location.pathname === link.path ? `2px solid ${NSS_GREEN}` : "2px solid transparent",
                  paddingBottom: 2,
                }}
                onMouseEnter={(e) => { if (location.pathname !== link.path) (e.target as HTMLElement).style.color = TEXT; }}
                onMouseLeave={(e) => { if (location.pathname !== link.path) (e.target as HTMLElement).style.color = MUTED; }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="hidden-mobile">
            {/* Language switcher */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {["NL", "EN"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    background: lang === l ? "rgba(45,198,83,0.1)" : "transparent",
                    border: lang === l ? "1px solid rgba(45,198,83,0.4)" : "1px solid transparent",
                    color: lang === l ? NSS_GREEN : MUTED,
                    padding: "4px 8px",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                    transition: "all 0.2s",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link
              to="/contact"
              style={{
                background: "linear-gradient(135deg, #2DC653, #1DA040)",
                color: "#fff",
                padding: "10px 22px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(45,198,83,0.3)",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(45,198,83,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(45,198,83,0.3)"; }}
            >
              Gratis Offerte
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              color: TEXT,
              cursor: "pointer",
              padding: 4,
            }}
            className="show-mobile"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          backgroundColor: "#fff",
          borderTop: `1px solid ${BORDER}`,
          padding: "20px 24px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: "block",
                padding: "12px 0",
                color: location.pathname === link.path ? NSS_GREEN : TEXT,
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 600,
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            style={{
              display: "block",
              marginTop: 16,
              background: "linear-gradient(135deg, #2DC653, #1DA040)",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Gratis Offerte
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
