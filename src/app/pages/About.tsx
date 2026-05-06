import { CheckCircle2, Award, Users, Globe, Target } from "lucide-react";
import uniformImg from "figma:asset/ea61d0fe1462718c0219330a5459f4f6456c98e2.png";

const NSS_GREEN = "#2DC653";
const DARK_GREEN = "#1A9E35";
const BG = "#F6F9FC";
const WHITE = "#FFFFFF";
const SURFACE = "#EEF2F8";
const BORDER = "#D4DEE9";
const TEXT = "#0F172A";
const MUTED = "#64748B";

function SectionTitle({ overline, title, subtitle, center = false }: { overline: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, justifyContent: center ? "center" : "flex-start" }}>
        <div style={{ width: 32, height: 2, backgroundColor: NSS_GREEN }} />
        <span style={{ color: NSS_GREEN, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>{overline}</span>
        <div style={{ width: 32, height: 2, backgroundColor: NSS_GREEN }} />
      </div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: TEXT, lineHeight: 1.2, marginBottom: subtitle ? 12 : 0 }}>{title}</h2>
      {subtitle && <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, maxWidth: center ? 560 : "100%", margin: center ? "0 auto" : "0" }}>{subtitle}</p>}
    </div>
  );
}

const team = [
  { name: "Oleksiy Marchenko", role: "CEO & Oprichter", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", desc: "10+ jaar in de duurzame energiesector" },
  { name: "Darya Kovalenko", role: "Hoofd Engineering", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", desc: "MSc Elektrotechniek, Kyiv Polytechnisch" },
  { name: "Ivan Petrenko", role: "Verkoopdirecteur", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", desc: "B2B zonne-oplossingen expert, EU markten" },
  { name: "Maria Sydorenko", role: "Projectmanager", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", desc: "PMP gecertificeerd, 200+ projecten beheerd" },
];

const certifications = [
  { name: "IEC 61215", desc: "Kristallijn Silicium PV Modules", color: NSS_GREEN },
  { name: "IEC 61730", desc: "PV Module Veiligheid", color: "#0EA5E9" },
  { name: "ISO 9001", desc: "Kwaliteitsbeheersysteem", color: "#6366F1" },
  { name: "ISO 14001", desc: "Milieubeheer", color: "#10B981" },
  { name: "CE Markering", desc: "Europese Conformiteit", color: "#8B5CF6" },
  { name: "TÜV", desc: "Technische Inspectie", color: "#F97316" },
];

const partners = [
  { name: "Q-Sun Solar", desc: "Tier-1 N-Type bifaciale panelenfabrikant", country: "🇨🇳 China" },
  { name: "GoodWe", desc: "Wereldleidende string omvormerfabrikant", country: "🇨🇳 China / Globaal" },
  { name: "QCL Energy", desc: "LFP batterijopslagspecialist", country: "🇨🇳 China" },
  { name: "RochexEnergy", desc: "BNEF Tier-1 ESS kastenfabrikant", country: "🇨🇳 China / EU" },
];

const markets = [
  { flag: "🇳🇱", name: "Nederland", status: "Primaire Markt" },
  { flag: "🇩🇪", name: "Duitsland", status: "Actief" },
  { flag: "🇧🇪", name: "België", status: "Actief" },
  { flag: "🇵🇱", name: "Polen", status: "Actief" },
  { flag: "🇨🇿", name: "Tsjechië", status: "Actief" },
  { flag: "🇸🇰", name: "Slowakije", status: "Actief" },
  { flag: "🇭🇺", name: "Hongarije", status: "Actief" },
  { flag: "🇷🇴", name: "Roemenië", status: "Groeiend" },
];

export function About() {
  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh", paddingTop: 72 }}>
      {/* Header */}
      <div style={{
        padding: "60px 24px 40px",
        background: "linear-gradient(135deg, #F0FDF4, #ECFDF5, #EFF6FF)",
        borderBottom: `1px solid ${BORDER}`,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,198,83,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: TEXT, marginBottom: 12 }}>
            Over{" "}<span style={{ background: "linear-gradient(135deg, #2DC653, #1DA040)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NSS</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 16, maxWidth: 560 }}>
            New Solar System — leidende zonne-energie integrator, die premium zonnetechnologie brengt naar woningen en bedrijven door heel Europa.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
        {/* Company story */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="about-grid">
            <div>
              <SectionTitle overline="Ons Verhaal" title="NEDERLAND'S ZONNE-ENERGIE TOEKOMST" />
              <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
                NSS (New Solar System) is opgericht met een visie om de energietransitie in Nederland en Europa te versnellen. We werken op het snijvlak van geavanceerde zonnetechnologie en praktische engineering expertise.
              </p>
              <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
                Als geautoriseerde integrator van Tier-1 fabrikanten — Q-Sun Solar, GoodWe, QCL Energy en RochexEnergy — leveren we complete zonne-energiesystemen van ontwerp tot installatie en langdurige ondersteuning.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { icon: <Target size={18} />, text: "500+ projecten gerealiseerd" },
                  { icon: <Globe size={18} />, text: "8 Europese landen" },
                  { icon: <Award size={18} />, text: "4 Tier-1 partnerships" },
                  { icon: <Users size={18} />, text: "Expert engineeringsteam" },
                ].map((item) => (
                  <div key={item.text} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}>
                    <span style={{ color: NSS_GREEN }}>{item.icon}</span>
                    <span style={{ color: TEXT, fontSize: 13, fontWeight: 500 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src={uniformImg}
                alt="NSS Team Uniform"
                style={{ width: "100%", borderRadius: 16, height: 400, objectFit: "cover", boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
              />
            </div>
          </div>
        </section>

        {/* Team */}
        <section style={{ marginBottom: 80 }}>
          <SectionTitle overline="Ons Team" title="DE MENSEN ACHTER NSS" center />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {team.map((member) => (
              <div key={member.name} style={{
                backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: "hidden",
                transition: "all 0.3s", boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(45,198,83,0.4)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(45,198,83,0.12)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ height: 200, overflow: "hidden" }}>
                  <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ color: TEXT, fontSize: 16, fontWeight: 700 }}>{member.name}</h3>
                  <p style={{ color: NSS_GREEN, fontSize: 12, fontWeight: 600, marginTop: 4, marginBottom: 8 }}>{member.role}</p>
                  <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}>{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section style={{ marginBottom: 80 }}>
          <SectionTitle overline="Kwaliteitsborging" title="CERTIFICERINGEN & NORMEN" center />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {certifications.map((cert) => (
              <div key={cert.name} style={{
                backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, textAlign: "center",
                transition: "all 0.3s", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = cert.color + "55"; e.currentTarget.style.boxShadow = `0 8px 24px ${cert.color}15`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{
                  width: 48, height: 48,
                  backgroundColor: `${cert.color}15`,
                  border: `1px solid ${cert.color}33`,
                  borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 12px",
                }}>
                  <Award size={22} color={cert.color} />
                </div>
                <div style={{ color: TEXT, fontSize: 16, fontWeight: 800, fontFamily: "'Syne', sans-serif", marginBottom: 6 }}>{cert.name}</div>
                <div style={{ color: MUTED, fontSize: 12 }}>{cert.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section style={{ marginBottom: 80 }}>
          <SectionTitle overline="Onze Partners" title="TIER-1 FABRIKANT PARTNERSHIPS" center />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {partners.map((partner) => (
              <div key={partner.name} style={{
                backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24,
                transition: "all 0.3s", boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(45,198,83,0.4)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(45,198,83,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <h3 style={{ color: TEXT, fontSize: 18, fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>{partner.name}</h3>
                  <span style={{ color: MUTED, fontSize: 18 }}>{partner.country.split(" ")[0]}</span>
                </div>
                <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{partner.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={14} color={NSS_GREEN} />
                  <span style={{ color: DARK_GREEN, fontSize: 11, fontWeight: 600 }}>Geautoriseerd Distributeur</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market coverage */}
        <section>
          <SectionTitle overline="Dekking" title="ONZE MARKTEN" center />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {markets.map((market) => (
              <div key={market.name} style={{
                backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 16px", textAlign: "center",
                transition: "all 0.3s", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(45,198,83,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 36, marginBottom: 10 }}>{market.flag}</div>
                <div style={{ color: TEXT, fontSize: 15, fontWeight: 700 }}>{market.name}</div>
                <div style={{ color: market.status === "Primaire Markt" ? NSS_GREEN : market.status === "Groeiend" ? "#F97316" : DARK_GREEN, fontSize: 11, fontWeight: 600, marginTop: 6 }}>
                  {market.status}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
