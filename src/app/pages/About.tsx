import { CheckCircle2, Award, Users, Globe, Target } from "lucide-react";
import uniformImg from "figma:asset/ea61d0fe1462718c0219330a5459f4f6456c98e2.png";
import { useI18n } from "../i18n";

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
        <span style={{ color: NSS_GREEN, fontSize: 12, fontWeight: 700, letterSpacing: "var(--tracking-caps-md, 0.058em)", textTransform: "uppercase" }}>{overline}</span>
        <div style={{ width: 32, height: 2, backgroundColor: NSS_GREEN }} />
      </div>
      <h2 style={{ fontFamily: "'Onest', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: TEXT, lineHeight: 1.2, marginBottom: subtitle ? 12 : 0 }}>{title}</h2>
      {subtitle && <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, maxWidth: center ? 560 : "100%", margin: center ? "0 auto" : "0" }}>{subtitle}</p>}
    </div>
  );
}

const team = [
  { nameKey: "about.nameOleksiy", roleKey: "about.role0", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", descKey: "about.role0Desc" },
  { nameKey: "about.nameDarya", roleKey: "about.role1", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", descKey: "about.role1Desc" },
  { nameKey: "about.nameIvan", roleKey: "about.role2", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", descKey: "about.role2Desc" },
  { nameKey: "about.nameMaria", roleKey: "about.role3", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300", descKey: "about.role3Desc" },
];

const certifications = [
  { name: "IEC 61215", descKey: "about.c0", color: NSS_GREEN },
  { name: "IEC 61730", descKey: "about.c1", color: "#0EA5E9" },
  { name: "ISO 9001", descKey: "about.c2", color: "#6366F1" },
  { name: "ISO 14001", descKey: "about.c3", color: "#10B981" },
  { name: "CE Markering", descKey: "about.c4", color: "#8B5CF6" },
  { name: "TÜV", descKey: "about.c5", color: "#F97316" },
];

const partners = [
  { name: "Q-Sun Solar", descKey: "about.p0", country: "🇨🇳 China" },
  { name: "GoodWe", descKey: "about.p1", country: "🇨🇳 China / Globaal" },
  { name: "QCL Energy", descKey: "about.p2", country: "🇨🇳 China" },
  { name: "RochexEnergy", descKey: "about.p3", country: "🇨🇳 China / EU" },
];

const markets = [
  { flag: "🇺🇦", nameKey: "about.ua", statusKey: "about.uaStat" },
  { flag: "🇪🇺", nameKey: "about.eu", statusKey: "about.euStat" },
  { flag: "🇵🇱", nameKey: "about.pl", statusKey: "about.euStat" },
  { flag: "🇩🇪", nameKey: "about.de", statusKey: "about.euStat" },
  { flag: "🇷🇴", nameKey: "about.ro", statusKey: "about.roStat" },
];

export function About() {
  const { t } = useI18n();

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
            {t("about.titlePrefix")}<span style={{ background: "linear-gradient(135deg, #2DC653, #1DA040)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t("about.titleBrand")}</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 16, maxWidth: 620, lineHeight: 1.7, marginBottom: 28 }}>
            {t("about.subtitle")}
          </p>
          <div style={{ maxWidth: 720 }}>
            <div style={{ color: NSS_GREEN, fontSize: 12, fontWeight: 700, letterSpacing: "var(--tracking-caps-md, 0.058em)", textTransform: "uppercase", marginBottom: 8 }}>{t("about.missionOverline")}</div>
            <h2 style={{ fontFamily: "'Onest', sans-serif", fontSize: 22, fontWeight: 800, color: TEXT, marginBottom: 12 }}>{t("about.missionLead")}</h2>
            <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.85 }}>{t("about.missionBody")}</p>
            <p style={{ color: DARK_GREEN, fontWeight: 700, marginTop: 14 }}>{t("about.missionTagline")}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
        {/* Company story */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="about-grid">
            <div>
              <SectionTitle overline={t("about.storyOverline")} title={t("about.storyTitle")} />
              <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
                {t("about.storyP1")}
              </p>
              <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
                {t("about.storyP2")}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { icon: <Target size={18} />, textKey: "about.box1" },
                  { icon: <Globe size={18} />, textKey: "about.box0" },
                  { icon: <Award size={18} />, textKey: "about.box2" },
                  { icon: <Users size={18} />, textKey: "about.box3" },
                ].map((item) => (
                  <div key={item.textKey} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}>
                    <span style={{ color: NSS_GREEN }}>{item.icon}</span>
                    <span style={{ color: TEXT, fontSize: 13, fontWeight: 500 }}>{t(item.textKey)}</span>
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
          <SectionTitle overline={t("about.teamOverline")} title={t("about.teamTitle")} center />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {team.map((member) => (
              <div key={member.nameKey} style={{
                backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: "hidden",
                transition: "all 0.3s", boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(45,198,83,0.4)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(45,198,83,0.12)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ height: 200, overflow: "hidden" }}>
                  <img src={member.img} alt={t(member.nameKey)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ color: TEXT, fontSize: 16, fontWeight: 700 }}>{t(member.nameKey)}</h3>
                  <p style={{ color: NSS_GREEN, fontSize: 12, fontWeight: 600, marginTop: 4, marginBottom: 8 }}>{t(member.roleKey)}</p>
                  <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.5 }}>{t(member.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section style={{ marginBottom: 80 }}>
          <SectionTitle overline={t("about.certOverline")} title={t("about.certTitle")} center />
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
                <div style={{ color: TEXT, fontSize: 16, fontWeight: 800, fontFamily: "'Onest', sans-serif", marginBottom: 6 }}>{cert.name}</div>
                <div style={{ color: MUTED, fontSize: 12 }}>{t(cert.descKey)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section style={{ marginBottom: 80 }}>
          <SectionTitle overline={t("about.partnerOverline")} title={t("about.partnerTitle")} center />
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
                  <h3 style={{ color: TEXT, fontSize: 18, fontWeight: 800, fontFamily: "'Onest', sans-serif" }}>{partner.name}</h3>
                  <span style={{ color: MUTED, fontSize: 18 }}>{partner.country.split(" ")[0]}</span>
                </div>
                <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{t(partner.descKey)}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={14} color={NSS_GREEN} />
                  <span style={{ color: DARK_GREEN, fontSize: 11, fontWeight: 600 }}>{t("about.authDist")}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market coverage */}
        <section>
          <SectionTitle overline={t("about.marketOverline")} title={t("about.marketTitle")} center />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {markets.map((market) => (
              <div key={market.nameKey} style={{
                backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 16px", textAlign: "center",
                transition: "all 0.3s", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(45,198,83,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 36, marginBottom: 10 }}>{market.flag}</div>
                <div style={{ color: TEXT, fontSize: 15, fontWeight: 700 }}>{t(market.nameKey)}</div>
                <div style={{
                  color: market.nameKey === "about.ua" ? NSS_GREEN : market.nameKey === "about.ro" ? "#F97316" : DARK_GREEN,
                  fontSize: 11, fontWeight: 600, marginTop: 6,
                }}>
                  {t(market.statusKey)}
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
