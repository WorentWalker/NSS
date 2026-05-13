import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle2, ArrowRight, Zap, Battery, Sun, TrendingUp, Shield, Wifi } from "lucide-react";
import { useI18n } from "../i18n";

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
        <span style={{ color: NSS_GREEN, fontSize: 12, fontWeight: 700, letterSpacing: "var(--tracking-caps-md, 0.058em)", textTransform: "uppercase" }}>{overline}</span>
        <div style={{ width: 32, height: 2, backgroundColor: NSS_GREEN }} />
      </div>
      <h2 style={{ fontFamily: "'Onest', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: TEXT, lineHeight: 1.2, marginBottom: subtitle ? 12 : 0 }}>{title}</h2>
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
  const { t } = useI18n();
  const [panels, setPanels] = useState(10);
  const panelWatts = 590;
  const systemKw = (panels * panelWatts / 1000).toFixed(1);
  const annualKwh = Math.round(panels * panelWatts * 1.3);
  const savings = Math.round(annualKwh * 0.10);

  const invText = panels <= 15 ? t("solutionsPage.inv35") : panels <= 25 ? t("solutionsPage.inv60") : t("solutionsPage.inv80");
  const batText = panels <= 10 ? t("solutionsPage.bat10") : panels <= 20 ? t("solutionsPage.bat15") : t("solutionsPage.bat302");
  const packLines = [
    t("solutionsPage.builderLinePanels", { count: panels, kw: systemKw }),
    invText,
    batText,
    t("solutionsPage.lineMon"),
    t("solutionsPage.lineInstall"),
  ];

  return (
    <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 32, marginTop: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
      <h3 style={{ color: TEXT, fontSize: 18, fontWeight: 700, marginBottom: 20, fontFamily: "'Onest', sans-serif" }}>
        {t("solutionsPage.builderTitle")}
      </h3>

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ color: MUTED, fontSize: 14 }}>{t("solutionsPage.builderPanels")}</span>
          <span style={{ color: NSS_GREEN, fontSize: 18, fontWeight: 800 }}>{t("solutionsPage.builderCount", { n: panels })}</span>
        </div>
        <input
          type="range"
          min={4} max={40} value={panels}
          onChange={(e) => setPanels(Number(e.target.value))}
          style={{ width: "100%", accentColor: NSS_GREEN }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", color: MUTED, fontSize: 11, marginTop: 4 }}>
          <span>{t("solutionsPage.builderMin")}</span>
          <span>{t("solutionsPage.builderMax")}</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { label: t("solutionsPage.bStatPower"), value: `${systemKw} kW`, color: NSS_GREEN },
          { label: t("solutionsPage.bStatYear"), value: `${(annualKwh / 1000).toFixed(1)} MWh`, color: DARK_GREEN },
          { label: t("solutionsPage.bStatCo2"), value: `${Math.round(annualKwh * 0.4)} kg`, color: "#6366F1" },
          { label: t("solutionsPage.bStatSave"), value: `€${savings}`, color: "#F97316" },
        ].map((stat) => (
          <div key={stat.label} style={{ backgroundColor: SURFACE, borderRadius: 10, padding: "14px 16px", textAlign: "center", border: `1px solid ${BORDER}` }}>
            <div style={{ color: stat.color, fontSize: 20, fontWeight: 800, fontFamily: "'Onest', sans-serif" }}>{stat.value}</div>
            <div style={{ color: MUTED, fontSize: 11, marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: SURFACE, borderRadius: 12, padding: 20, marginBottom: 20, border: `1px solid ${BORDER}` }}>
        <div style={{ color: NSS_GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "var(--tracking-caps-sm, 0.05em)", textTransform: "uppercase", marginBottom: 14 }}>
          {t("solutionsPage.recoPack")}
        </div>
        {packLines.map((item) => (
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
        {t("solutionsPage.quoteThisPkg")} <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function ResidentialTab() {
  const { t } = useI18n();
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="sol-grid">
        <div>
          <h3 style={{ color: TEXT, fontSize: 26, fontWeight: 800, fontFamily: "'Onest', sans-serif", marginBottom: 16 }}>
            {t("solutionsPage.resTitle")}
          </h3>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
            {t("solutionsPage.resBody")}
          </p>

          <SystemDiagram nodes={[
            { label: t("solutionsPage.nodePanels"), icon: <Sun size={20} />, color: NSS_GREEN },
            { label: t("solutionsPage.nodeInv"), icon: <Zap size={20} />, color: DARK_GREEN },
            { label: t("solutionsPage.nodeBat"), icon: <Battery size={20} />, color: "#6366F1" },
            { label: t("solutionsPage.nodeHome"), icon: <Shield size={20} />, color: "#8B5CF6" },
          ]} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { icon: <TrendingUp size={16} />, text: t("solutionsPage.perk0") },
              { icon: <Battery size={16} />, text: t("solutionsPage.perk1") },
              { icon: <Wifi size={16} />, text: t("solutionsPage.perk2") },
              { icon: <Shield size={16} />, text: t("solutionsPage.perk3") },
            ].map((item, ix) => (
              <div key={ix} style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, backgroundColor: WHITE, borderRadius: 8, border: `1px solid ${BORDER}`, boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                <span style={{ color: NSS_GREEN }}>{item.icon}</span>
                <span style={{ color: MUTED, fontSize: 12 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1771479755055-6a305f50845e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700"
            alt={t("solutionsPage.resTitle")}
            style={{ width: "100%", borderRadius: 16, height: 260, objectFit: "cover", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
          />
          <ResidentialBuilder />
        </div>
      </div>
    </div>
  );
}

function CITab() {
  const { t } = useI18n();
  const benefitKeys = ["ben0", "ben1", "ben2", "ben3", "ben4", "ben5"] as const;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="sol-grid">
        <div>
          <h3 style={{ color: TEXT, fontSize: 26, fontWeight: 800, fontFamily: "'Onest', sans-serif", marginBottom: 16 }}>
            {t("solutionsPage.ciTitle")}
          </h3>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
            {t("solutionsPage.ciBody")}
          </p>

          <SystemDiagram nodes={[
            { label: t("solutionsPage.nodePv"), icon: <Sun size={20} />, color: NSS_GREEN },
            { label: t("solutionsPage.nodeGw"), icon: <Zap size={20} />, color: DARK_GREEN },
            { label: t("solutionsPage.nodeEss"), icon: <Battery size={20} />, color: "#6366F1" },
            { label: t("solutionsPage.node400v"), icon: <TrendingUp size={20} />, color: "#0EA5E9" },
          ]} />

          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ color: NSS_GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "var(--tracking-caps-sm, 0.05em)", textTransform: "uppercase", marginBottom: 16 }}>
              {t("solutionsPage.keyBenefits")}
            </div>
            {benefitKeys.map((k) => (
              <div key={k} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                <CheckCircle2 size={14} color={NSS_GREEN} style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}>{t(`solutionsPage.${k}`)}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1726866492047-7f9516558c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700"
            alt={t("solutionsPage.ciTitle")}
            style={{ width: "100%", borderRadius: 16, height: 260, objectFit: "cover", marginBottom: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
          />

          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ color: NSS_GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "var(--tracking-caps-sm, 0.05em)", textTransform: "uppercase", marginBottom: 16 }}>
              {t("solutionsPage.refPkg")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { label: t("solutionsPage.specPvCap"), value: "120× 590W = 70.8kW" },
                { label: t("solutionsPage.specInv"), value: "GoodWe 80kW SMT G2" },
                { label: t("solutionsPage.specBatShort"), value: t("solutionsPage.ciSpecBatValue") },
                { label: t("solutionsPage.specNetShort"), value: t("solutionsPage.ciSpecNetValue") },
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
              {t("solutionsPage.bizQuoteBtn")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function UtilityTab() {
  const { t } = useI18n();

  const utilRows = [
    { titleKey: "u0t" as const, descKey: "u0d" as const, badge: "5MWh" },
    { titleKey: "u1t" as const, descKey: "u1d" as const, badge: "2MWh" },
    { titleKey: "u2t" as const, descKey: "u2d" as const, badge: "∞ MW" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="sol-grid">
        <div>
          <h3 style={{ color: TEXT, fontSize: 26, fontWeight: 800, fontFamily: "'Onest', sans-serif", marginBottom: 16 }}>
            {t("solutionsPage.utilTitle")}
          </h3>
          <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
            {t("solutionsPage.utilBody")}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            {utilRows.map((item) => (
              <div key={item.titleKey} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div>
                  <div style={{ color: TEXT, fontSize: 14, fontWeight: 700 }}>{t(`solutionsPage.${item.titleKey}`)}</div>
                  <div style={{ color: MUTED, fontSize: 12, marginTop: 4 }}>{t(`solutionsPage.${item.descKey}`)}</div>
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
            {t("solutionsPage.discussUtil")} <ArrowRight size={14} />
          </Link>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1585735140520-c51cbbebe03b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700"
            alt={t("solutionsPage.utilTitle")}
            style={{ width: "100%", borderRadius: 16, height: 300, objectFit: "cover", marginBottom: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
          />

          <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ color: NSS_GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "var(--tracking-caps-sm, 0.05em)", textTransform: "uppercase", marginBottom: 16 }}>
              {t("solutionsPage.utilSpecTitle")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: t("solutionsPage.specContainer"), value: "5MWh" },
                { label: t("solutionsPage.specGridConn"), value: "HV 35kV" },
                { label: t("home.specRowMon"), value: "SCADA" },
                { label: t("solutionsPage.certShort"), value: "CE / TÜV" },
                { label: t("home.specRowPanels"), value: "Q-Sun 590W ×2000+" },
                { label: t("solutionsPage.respTime"), value: "<100ms" },
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
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("residential");
  const tabs = [
    { id: "residential", label: t("solutionsPage.tabRes"), icon: <Sun size={16} /> },
    { id: "ci", label: t("solutionsPage.tabCi"), icon: <Zap size={16} /> },
    { id: "utility", label: t("solutionsPage.tabUtil"), icon: <Battery size={16} /> },
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
          <h1 style={{ fontFamily: "'Onest', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: TEXT, marginBottom: 12 }}>
            {t("solutionsPage.titleLead")}
            <span style={{ background: "linear-gradient(135deg, #2DC653, #1DA040)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t("solutionsPage.titleHighlight")}</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 16, maxWidth: 560 }}>
            {t("solutionsPage.subtitle")}
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
