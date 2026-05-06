import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle2, ArrowRight, Zap, Battery, Sun, TrendingUp, Shield, Wifi } from "lucide-react";

const NSS_GREEN = "#2DC653";
const DARK_GREEN = "#1A9E35";
const BG = "#F6F9FC";
const WHITE = "#FFFFFF";
const SURFACE = "#EEF2F8";
const ELEVATED = "#E4EBF5";
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

function SystemDiagram({ nodes }: { nodes: { label: string; icon: React.ReactNode; color: string }[] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", margin: "32px 0" }}>
      {nodes.map((node, i) => (
        <>
          <div key={node.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 56, height: 56,
              backgroundColor: `${node.color}18`,
              border: `1px solid ${node.color}55`,
              borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: node.color,
              boxShadow: `0 4px 12px ${node.color}15`,
            }}>
              {node.icon}
            </div>
            <span style={{ color: MUTED, fontSize: 11, fontWeight: 600, textAlign: "center", maxWidth: 70 }}>{node.label}</span>
          </div>
          {i < nodes.length - 1 && (
            <div key={`arrow-${i}`} style={{
              width: 32, height: 2,
              background: `linear-gradient(90deg, ${nodes[i].color}, ${nodes[i + 1].color})`,
              position: "relative",
            }}>
              <div style={{
                position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)",
                width: 0, height: 0,
                borderLeft: `6px solid ${nodes[i + 1].color}`,
                borderTop: "4px solid transparent",
                borderBottom: "4px solid transparent",
              }} />
            </div>
          )}
        </>
      ))}
    </div>
  );
}

function ResidentialBuilder() {
  const [panels, setPanels] = useState(10);
  const panelWatts = 590;
  const systemKw = (panels * panelWatts / 1000).toFixed(1);
  const annualKwh = Math.round(panels * panelWatts * 1.3);
  const savings = Math.round(annualKwh * 0.10);

  return (
    <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 32, marginTop: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
      <h3 style={{ color: TEXT, fontSize: 18, fontWeight: 700, marginBottom: 20, fontFamily: "'Syne', sans-serif" }}>
        Systeem Pakket Builder
      </h3>

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ color: MUTED, fontSize: 14 }}>Aantal Panelen (Q-Sun 590W)</span>
          <span style={{ color: NSS_GREEN, fontSize: 18, fontWeight: 800 }}>{panels} panelen</span>
        </div>
        <input
          type="range"
          min={4} max={40} value={panels}
          onChange={(e) => setPanels(Number(e.target.value))}
          style={{ width: "100%", accentColor: NSS_GREEN }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", color: MUTED, fontSize: 11, marginTop: 4 }}>
          <span>4 panelen (min)</span>
          <span>40 panelen (max)</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Systeemvermogen", value: `${systemKw} kW`, color: NSS_GREEN },
          { label: "Jaarproductie", value: `${(annualKwh / 1000).toFixed(1)} MWh`, color: DARK_GREEN },
          { label: "CO₂ Bespaard/jr", value: `${Math.round(annualKwh * 0.4)} kg`, color: "#6366F1" },
          { label: "Geschatte Besparing", value: `€${savings}`, color: "#F97316" },
        ].map((stat) => (
          <div key={stat.label} style={{ backgroundColor: SURFACE, borderRadius: 10, padding: "14px 16px", textAlign: "center", border: `1px solid ${BORDER}` }}>
            <div style={{ color: stat.color, fontSize: 20, fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>{stat.value}</div>
            <div style={{ color: MUTED, fontSize: 11, marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: SURFACE, borderRadius: 12, padding: 20, marginBottom: 20, border: `1px solid ${BORDER}` }}>
        <div style={{ color: NSS_GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
          Aanbevolen Pakket
        </div>
        {[
          `${panels}× Q-Sun QN-590HT-06 panelen (${systemKw} kW totaal)`,
          panels <= 15 ? "GoodWe GW35K-SMT Omvormer" : panels <= 25 ? "GoodWe GW60K-SMT Omvormer" : "GoodWe GW80K-SMT Omvormer",
          panels <= 10 ? "QCL 10kWh Batterijopslag" : panels <= 20 ? "QCL 15kWh Batterijopslag" : "QCL 2× 15kWh Batterijopslag",
          "WiFi/4G Remote Monitoring Systeem",
          "Volledige Installatie & Inbedrijfstelling",
        ].map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <CheckCircle2 size={14} color={NSS_GREEN} />
            <span style={{ color: TEXT, fontSize: 13 }}>{item}</span>
          </div>
        ))}
      </div>

      <Link to="/contact" style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: "linear-gradient(135deg, #2DC653, #1DA040)",
        color: "#fff",
        padding: "14px",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 700,
        textDecoration: "none",
        boxShadow: "0 4px 16px rgba(45,198,83,0.3)",
      }}>
        Offerte voor dit Pakket <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function ResidentialTab() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="sol-grid">
        <div>
          <h3 style={{ color: TEXT, fontSize: 26, fontWeight: 800, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>
            Thuiszonnesystemen
          </h3>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
            Bereik energieonafhankelijkheid met een complete thuiszonne-oplossing. Verlaag uw elektriciteitsrekening met tot 90% en bouw een back-up bij stroomuitval.
          </p>

          <SystemDiagram nodes={[
            { label: "Zonnepanelen", icon: <Sun size={20} />, color: NSS_GREEN },
            { label: "Omvormer", icon: <Zap size={20} />, color: DARK_GREEN },
            { label: "Batterij", icon: <Battery size={20} />, color: "#6366F1" },
            { label: "Huisverbruik", icon: <Shield size={20} />, color: "#8B5CF6" },
          ]} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { icon: <TrendingUp size={16} />, text: "Tot 90% rekening besparing" },
              { icon: <Battery size={16} />, text: "Back-up bij stroomuitval" },
              { icon: <Wifi size={16} />, text: "App-gebaseerde monitoring" },
              { icon: <Shield size={16} />, text: "30 jaar paneel garantie" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, backgroundColor: WHITE, borderRadius: 8, border: `1px solid ${BORDER}`, boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                <span style={{ color: NSS_GREEN }}>{item.icon}</span>
                <span style={{ color: MUTED, fontSize: 12 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1771479755055-6a305f50845e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700"
            alt="Residential solar"
            style={{ width: "100%", borderRadius: 16, height: 260, objectFit: "cover", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
          />
          <ResidentialBuilder />
        </div>
      </div>
    </div>
  );
}

function CITab() {
  const benefits = [
    "Piekvraagvermindering — verlaag piekuurtarieven",
    "TOU-arbitrage — opladen bij lage tarieven, verbruiken tijdens piek",
    "Zero-export optie — verbruik alle opgewekte energie",
    "Driefasig 400V netaansluiting",
    "EMS dashboard met afstandsbediening",
    "Snelle laad/ontlaad overgang <100ms",
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="sol-grid">
        <div>
          <h3 style={{ color: TEXT, fontSize: 26, fontWeight: 800, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>
            Zakelijk & Industrieel
          </h3>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
            Grootschalige systemen voor fabrieken, magazijnen en kantoorgebouwen. Verlaag bedrijfskosten en bereik energiezekerheid.
          </p>

          <SystemDiagram nodes={[
            { label: "PV Panelen", icon: <Sun size={20} />, color: NSS_GREEN },
            { label: "GoodWe 80kW", icon: <Zap size={20} />, color: DARK_GREEN },
            { label: "261kWh ESS", icon: <Battery size={20} />, color: "#6366F1" },
            { label: "400V Net", icon: <TrendingUp size={20} />, color: "#0EA5E9" },
          ]} />

          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ color: NSS_GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Kernvoordelen
            </div>
            {benefits.map((benefit) => (
              <div key={benefit} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                <CheckCircle2 size={14} color={NSS_GREEN} style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1726866492047-7f9516558c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700"
            alt="Commercial solar"
            style={{ width: "100%", borderRadius: 16, height: 260, objectFit: "cover", marginBottom: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
          />

          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ color: NSS_GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Referentiepakket — 261kWh Systeem
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { label: "PV Capaciteit", value: "120× 590W = 70.8kW" },
                { label: "Omvormer", value: "GoodWe 80kW SMT G2" },
                { label: "Batterij", value: "261kWh ESS Kast" },
                { label: "Net", value: "Driefasig 400V" },
              ].map((spec) => (
                <div key={spec.label} style={{ backgroundColor: SURFACE, borderRadius: 8, padding: "10px 12px", border: `1px solid ${BORDER}` }}>
                  <div style={{ color: MUTED, fontSize: 10, marginBottom: 2 }}>{spec.label}</div>
                  <div style={{ color: TEXT, fontSize: 12, fontWeight: 700 }}>{spec.value}</div>
                </div>
              ))}
            </div>
            <Link to="/contact" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "linear-gradient(135deg, #2DC653, #1DA040)",
              color: "#fff",
              padding: "12px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(45,198,83,0.3)",
            }}>
              Zakelijke Offerte <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function UtilityTab() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="sol-grid">
        <div>
          <h3 style={{ color: TEXT, fontSize: 26, fontWeight: 800, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>
            Utiliteitsschaal Projecten
          </h3>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
            Megawatt-schaal containergebaseerde BESS en zonneparkoplossingen. Netstabilisatie, frequentieregeling en hernieuwbare integratie op schaal.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            {[
              { title: "5MWh Container", desc: "RochexEnergy containerized BESS, SCADA-klaar, HV 35kV aansluiting", badge: "5MWh" },
              { title: "2MWh Module", desc: "1MW/2MWh RochexEnergy container voor medium utiliteitsprojecten", badge: "2MWh" },
              { title: "Maatwerk Schaal", desc: "Meerdere containers, onbeperkte capaciteit, aangepaste netintegratie", badge: "∞ MW" },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div>
                  <div style={{ color: TEXT, fontSize: 14, fontWeight: 700 }}>{item.title}</div>
                  <div style={{ color: MUTED, fontSize: 12, marginTop: 4 }}>{item.desc}</div>
                </div>
                <span style={{ backgroundColor: "rgba(45,198,83,0.12)", border: "1px solid rgba(45,198,83,0.3)", color: DARK_GREEN, padding: "4px 12px", borderRadius: 6, fontSize: 13, fontWeight: 700, flexShrink: 0, marginLeft: 16 }}>
                  {item.badge}
                </span>
              </div>
            ))}
          </div>

          <Link to="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, #2DC653, #1DA040)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(45,198,83,0.3)",
          }}>
            Utiliteitsproject Bespreken <ArrowRight size={14} />
          </Link>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1585735140520-c51cbbebe03b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700"
            alt="Utility solar"
            style={{ width: "100%", borderRadius: 16, height: 300, objectFit: "cover", marginBottom: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
          />

          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ color: NSS_GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Utiliteitsschaal Specs
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Container Capaciteit", value: "5MWh" },
                { label: "Netaansluiting", value: "HV 35kV" },
                { label: "Monitoring", value: "SCADA" },
                { label: "Certificering", value: "CE / TÜV" },
                { label: "Panelen", value: "Q-Sun 590W ×2000+" },
                { label: "Responstijd", value: "<100ms" },
              ].map((spec) => (
                <div key={spec.label} style={{ backgroundColor: SURFACE, borderRadius: 8, padding: "10px 12px", border: `1px solid ${BORDER}` }}>
                  <div style={{ color: MUTED, fontSize: 10, marginBottom: 2 }}>{spec.label}</div>
                  <div style={{ color: TEXT, fontSize: 12, fontWeight: 700 }}>{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Solutions() {
  const [activeTab, setActiveTab] = useState("residential");
  const tabs = [
    { id: "residential", label: "Particulier Zonne-energie", icon: <Sun size={16} /> },
    { id: "ci", label: "Zakelijk & Industrieel", icon: <Zap size={16} /> },
    { id: "utility", label: "Utiliteitsschaal", icon: <Battery size={16} /> },
  ];

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
            Zonne-energie{" "}<span style={{ background: "linear-gradient(135deg, #2DC653, #1DA040)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Oplossingen</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 16, maxWidth: 500 }}>
            Op maat gemaakte zonne-energiesystemen voor elke schaal — van woningen tot utiliteitsparken.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 24px",
                borderRadius: 8,
                border: `1px solid ${activeTab === tab.id ? NSS_GREEN : BORDER}`,
                backgroundColor: activeTab === tab.id ? "rgba(45,198,83,0.1)" : WHITE,
                color: activeTab === tab.id ? DARK_GREEN : MUTED,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: activeTab === tab.id ? "0 4px 12px rgba(45,198,83,0.15)" : "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "residential" && <ResidentialTab />}
        {activeTab === "ci" && <CITab />}
        {activeTab === "utility" && <UtilityTab />}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sol-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
