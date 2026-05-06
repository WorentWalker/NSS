import { Link } from "react-router";
import { Mail, Phone, MapPin, Send, MessageCircle, Linkedin, Youtube } from "lucide-react";

const NSS_GREEN = "#2DC653";
const BG = "#F6F9FC";
const WHITE = "#FFFFFF";
const SURFACE = "#EEF2F8";
const BORDER = "#D4DEE9";
const TEXT = "#0F172A";
const MUTED = "#64748B";

export function Footer() {
  return (
    <footer style={{ backgroundColor: BG, borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 32px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div style={{ gridColumn: "span 2" }} className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44,
                background: "linear-gradient(135deg, #2DC653, #1DA040)",
                borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(45,198,83,0.25)",
              }}>
                <span style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 900, letterSpacing: "-0.02em" }}>NSS</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: TEXT, lineHeight: 1.1 }}>
                  <span style={{ color: NSS_GREEN }}>NSS</span>
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", color: MUTED, textTransform: "uppercase" }}>
                  New Solar System
                </div>
              </div>
            </div>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              Slimme zonne-energiesystemen voor woningen en bedrijven in Nederland en Europa.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { icon: <Send size={15} />, label: "Telegram", color: "#0088cc" },
                { icon: <MessageCircle size={15} />, label: "WhatsApp", color: "#25D366" },
                { icon: <Linkedin size={15} />, label: "LinkedIn", color: "#0077B5" },
                { icon: <Youtube size={15} />, label: "YouTube", color: "#FF0000" },
              ].map((social) => (
                <button
                  key={social.label}
                  title={social.label}
                  style={{
                    width: 36, height: 36,
                    backgroundColor: WHITE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    color: MUTED,
                    transition: "all 0.2s",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = social.color;
                    e.currentTarget.style.color = social.color;
                    e.currentTarget.style.backgroundColor = `${social.color}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.color = MUTED;
                    e.currentTarget.style.backgroundColor = WHITE;
                  }}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ color: TEXT, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
              Producten
            </h4>
            {["Zonnepanelen", "Omvormers", "Batterijopslag", "Complete Systemen"].map((item) => (
              <Link key={item} to="/products" style={{
                display: "block", color: MUTED, fontSize: 14, textDecoration: "none",
                marginBottom: 10, transition: "color 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = NSS_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Solutions */}
          <div>
            <h4 style={{ color: TEXT, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
              Oplossingen
            </h4>
            {["Particulier", "Zakelijk & Industrie", "Utiliteitsschaal", "Maatwerk"].map((item) => (
              <Link key={item} to="/solutions" style={{
                display: "block", color: MUTED, fontSize: 14, textDecoration: "none",
                marginBottom: 10, transition: "color 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = NSS_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: TEXT, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href="tel:+31201234567" style={{ display: "flex", alignItems: "center", gap: 10, color: MUTED, textDecoration: "none", fontSize: 14 }}>
                <Phone size={14} color={NSS_GREEN} />
                +31 (20) 123-45-67
              </a>
              <a href="mailto:info@nss.energy" style={{ display: "flex", alignItems: "center", gap: 10, color: MUTED, textDecoration: "none", fontSize: 14 }}>
                <Mail size={14} color={NSS_GREEN} />
                info@nss.energy
              </a>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, color: MUTED, fontSize: 14 }}>
                <MapPin size={14} color={NSS_GREEN} style={{ flexShrink: 0, marginTop: 2 }} />
                Amsterdam, Nederland<br />& Europa
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 32, marginBottom: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ color: MUTED, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Gecertificeerd:</span>
            {["IEC 61215", "IEC 61730", "ISO 9001", "CE", "TÜV"].map((cert) => (
              <span key={cert} style={{
                padding: "4px 10px",
                backgroundColor: WHITE,
                border: `1px solid ${BORDER}`,
                borderRadius: 4,
                color: MUTED,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.05em",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}>
                {cert}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
            <span style={{ color: MUTED, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Partners:</span>
            {["Q-Sun Solar", "GoodWe", "QCL Energy", "RochexEnergy"].map((partner) => (
              <span key={partner} style={{
                padding: "4px 12px",
                backgroundColor: "rgba(45,198,83,0.08)",
                border: "1px solid rgba(45,198,83,0.2)",
                borderRadius: 4,
                color: "#1A9E35",
                fontSize: 11,
                fontWeight: 700,
              }}>
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: `1px solid ${BORDER}`,
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <p style={{ color: MUTED, fontSize: 13 }}>
            © 2024 NSS — New Solar System. Alle rechten voorbehouden.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacybeleid", "Algemene Voorwaarden"].map((item) => (
              <span key={item} style={{ color: MUTED, fontSize: 13, cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = NSS_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
              >{item}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-brand { grid-column: span 1 !important; }
        }
      `}</style>
    </footer>
  );
}
