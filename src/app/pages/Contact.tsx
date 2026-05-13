import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from "lucide-react";
import { useI18n } from "../i18n";

const NSS_GREEN = "#2DC653";
const DARK_GREEN = "#1A9E35";
const BG = "#F6F9FC";
const WHITE = "#FFFFFF";
const SURFACE = "#EEF2F8";
const BORDER = "#D4DEE9";
const TEXT = "#0F172A";
const MUTED = "#64748B";

export function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "", company: "", phone: "", email: "", type: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: SURFACE,
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    padding: "12px 16px",
    color: TEXT,
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    color: MUTED,
    fontSize: 13,
    fontWeight: 600,
    display: "block",
    marginBottom: 8,
  };

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
            {t("contactPage.titlePrefix")}<span style={{ background: "linear-gradient(135deg, #2DC653, #1DA040)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t("contactPage.titleHighlight")}</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 16, maxWidth: 500 }}>
            {t("contactPage.subtitle")}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "start" }} className="contact-grid">
          {/* Left — info */}
          <div>
            <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 32, marginBottom: 24, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <h3 style={{ color: TEXT, fontSize: 18, fontWeight: 700, fontFamily: "'Onest', sans-serif", marginBottom: 24 }}>
                {t("contactPage.detailsTitle")}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <a href="tel:+31201234567" style={{ display: "flex", alignItems: "flex-start", gap: 16, textDecoration: "none" }}>
                  <div style={{ width: 42, height: 42, backgroundColor: "rgba(45,198,83,0.1)", border: "1px solid rgba(45,198,83,0.25)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Phone size={18} color={NSS_GREEN} />
                  </div>
                  <div>
                    <div style={{ color: MUTED, fontSize: 12, marginBottom: 4 }}>{t("contactPage.phoneLbl")}</div>
                    <div style={{ color: TEXT, fontSize: 15, fontWeight: 600 }}>+31 (20) 123-45-67</div>
                  </div>
                </a>

                <a href="mailto:info@nss.energy" style={{ display: "flex", alignItems: "flex-start", gap: 16, textDecoration: "none" }}>
                  <div style={{ width: 42, height: 42, backgroundColor: "rgba(45,198,83,0.1)", border: "1px solid rgba(45,198,83,0.25)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Mail size={18} color={NSS_GREEN} />
                  </div>
                  <div>
                    <div style={{ color: MUTED, fontSize: 12, marginBottom: 4 }}>{t("contactPage.emailLbl")}</div>
                    <div style={{ color: TEXT, fontSize: 15, fontWeight: 600 }}>info@nss.energy</div>
                  </div>
                </a>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 42, height: 42, backgroundColor: "rgba(45,198,83,0.1)", border: "1px solid rgba(45,198,83,0.25)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin size={18} color={NSS_GREEN} />
                  </div>
                  <div>
                    <div style={{ color: MUTED, fontSize: 12, marginBottom: 4 }}>{t("contactPage.addrLbl")}</div>
                    <div style={{ color: TEXT, fontSize: 15, fontWeight: 600 }}>{t("contactPage.addrLine")}</div>
                    <div style={{ color: MUTED, fontSize: 13 }}>{t("contactPage.addrGlobe")}</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 42, height: 42, backgroundColor: "rgba(45,198,83,0.1)", border: "1px solid rgba(45,198,83,0.25)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Clock size={18} color={NSS_GREEN} />
                  </div>
                  <div>
                    <div style={{ color: MUTED, fontSize: 12, marginBottom: 4 }}>{t("contactPage.hoursLbl")}</div>
                    <div style={{ color: TEXT, fontSize: 15, fontWeight: 600 }}>{t("contactPage.hoursMain")}</div>
                    <div style={{ color: MUTED, fontSize: 13 }}>{t("contactPage.hoursSat")}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick contact buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              <button style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                backgroundColor: "rgba(37, 211, 102, 0.08)",
                border: "1px solid rgba(37, 211, 102, 0.3)",
                borderRadius: 10,
                padding: "14px",
                color: "#1BA848",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(37,211,102,0.16)"; e.currentTarget.style.borderColor = "rgba(37,211,102,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(37,211,102,0.08)"; e.currentTarget.style.borderColor = "rgba(37,211,102,0.3)"; }}
              >
                <MessageCircle size={18} /> WhatsApp
              </button>
              <button style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                backgroundColor: "rgba(0, 136, 204, 0.08)",
                border: "1px solid rgba(0, 136, 204, 0.3)",
                borderRadius: 10,
                padding: "14px",
                color: "#0077B6",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,136,204,0.16)"; e.currentTarget.style.borderColor = "rgba(0,136,204,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,136,204,0.08)"; e.currentTarget.style.borderColor = "rgba(0,136,204,0.3)"; }}
              >
                <Send size={18} /> Telegram
              </button>
            </div>

            {/* Map placeholder */}
            <div style={{
              backgroundColor: WHITE,
              border: `1px solid ${BORDER}`,
              borderRadius: 16,
              height: 220,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}>
              <MapPin size={32} color={NSS_GREEN} />
              <div style={{ color: MUTED, fontSize: 14, textAlign: "center" }}>
                {t("contactPage.mapHint")}<br />
                {t("contactPage.addrGlobe")}
              </div>
              <a
                href="https://maps.google.com/?q=Kyiv,Ukraine"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: NSS_GREEN, fontSize: 13, fontWeight: 600, textDecoration: "none" }}
              >
                {t("contactPage.mapsLink")}
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {!submitted ? (
              <div style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 40, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
                <h3 style={{ color: TEXT, fontSize: 20, fontWeight: 700, fontFamily: "'Onest', sans-serif", marginBottom: 8 }}>
                  {t("contactPage.msgTitle")}
                </h3>
                <p style={{ color: MUTED, fontSize: 14, marginBottom: 28 }}>
                  {t("contactPage.msgBody")}
                </p>

                <form onSubmit={handleSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="form-two-col">
                    <div>
                      <label style={labelStyle}>{t("contactPage.fldName")}</label>
                      <input
                        type="text"
                        required
                        placeholder={t("home.phName")}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = NSS_GREEN)}
                        onBlur={(e) => (e.target.style.borderColor = BORDER)}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>{t("contactPage.fldCompany")}</label>
                      <input
                        type="text"
                        placeholder={t("contactPage.fldCompanyPlaceholder")}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = NSS_GREEN)}
                        onBlur={(e) => (e.target.style.borderColor = BORDER)}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>{t("contactPage.fldPhone")}</label>
                      <input
                        type="tel"
                        required
                        placeholder={t("home.phPhone")}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = NSS_GREEN)}
                        onBlur={(e) => (e.target.style.borderColor = BORDER)}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>{t("contactPage.fldEmail")}</label>
                      <input
                        type="email"
                        required
                        placeholder={t("home.phEmail")}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = NSS_GREEN)}
                        onBlur={(e) => (e.target.style.borderColor = BORDER)}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>{t("contactPage.fldType")}</label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={(e) => (e.target.style.borderColor = NSS_GREEN)}
                      onBlur={(e) => (e.target.style.borderColor = BORDER)}
                    >
                      <option value="">{t("contactPage.selTypePh")}</option>
                      <option value="residential">{t("contactPage.selRes")}</option>
                      <option value="ci-small">{t("contactPage.selSmall")}</option>
                      <option value="ci-medium">{t("contactPage.selMed")}</option>
                      <option value="industrial">{t("contactPage.selLarge")}</option>
                      <option value="utility">{t("contactPage.selMw")}</option>
                      <option value="other">{t("contactPage.selOther")}</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={labelStyle}>{t("contactPage.fldMessage")}</label>
                    <textarea
                      rows={4}
                      placeholder={t("contactPage.msgPlaceholder")}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                      onFocus={(e) => (e.target.style.borderColor = NSS_GREEN)}
                      onBlur={(e) => (e.target.style.borderColor = BORDER)}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg, #2DC653, #1DA040)",
                      color: "#fff",
                      padding: "15px",
                      borderRadius: 8,
                      border: "none",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      letterSpacing: "0.03em",
                      boxShadow: "0 6px 20px rgba(45,198,83,0.3)",
                      transition: "all 0.2s",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(45,198,83,0.4)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(45,198,83,0.3)"; }}
                  >
                    {t("contactPage.submit")}
                  </button>

                  <p style={{ color: MUTED, fontSize: 12, marginTop: 12, textAlign: "center" }}>
                    {t("contactPage.legalNote")}
                  </p>
                </form>
              </div>
            ) : (
              <div style={{
                backgroundColor: WHITE, border: "1px solid rgba(45,198,83,0.3)", borderRadius: 16, padding: 60,
                textAlign: "center",
                boxShadow: "0 8px 40px rgba(45,198,83,0.1)",
              }}>
                <div style={{
                  width: 72, height: 72,
                  backgroundColor: "rgba(45,198,83,0.1)",
                  border: "1px solid rgba(45,198,83,0.4)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px",
                }}>
                  <CheckCircle2 size={32} color={NSS_GREEN} />
                </div>
                <h3 style={{ color: TEXT, fontSize: 22, fontWeight: 800, fontFamily: "'Onest', sans-serif", marginBottom: 12 }}>
                  {t("contactPage.thanksTitle")}
                </h3>
                <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                  {t("contactPage.thanksBody")}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{
                    border: `1px solid ${NSS_GREEN}`,
                    backgroundColor: "transparent",
                    color: NSS_GREEN,
                    padding: "10px 24px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {t("contactPage.thanksAgain")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
