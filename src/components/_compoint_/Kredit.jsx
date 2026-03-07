import { useState } from "react";
import { useTranslation } from "react-i18next"; // i18n qo'shildi

const BOT_TOKEN = "TOKENNI_BACKENDGA_OLIB_OTING";
const CHAT_ID = "CHAT_ID";

export default function Kredit() {
  const { t } = useTranslation(); // t funksiyasini chaqiramiz

  // Kredit turlarini komponent ichiga oldik, chunki tarjima ishlatish kerak
  const kreditTurlari = [
    { id: 1, title: t("kredit.types.mortgage"), rate: "18%", max: t("kredit.max_values.1b"), term: t("kredit.terms.20y") },
    { id: 2, title: t("kredit.types.auto"), rate: "20%", max: t("kredit.max_values.500m"), term: t("kredit.terms.5y") },
    { id: 3, title: t("kredit.types.business"), rate: "22%", max: t("kredit.max_values.2b"), term: t("kredit.terms.10y") },
    { id: 4, title: t("kredit.types.consumer"), rate: "24%", max: t("kredit.max_values.200m"), term: t("kredit.terms.3y") },
  ];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [summa, setSumma] = useState(10000000);
  const [muddat, setMuddat] = useState(12);
  const [foiz, setFoiz] = useState(20);

  const oylikTolov = () => {
    const r = foiz / 100 / 12;
    const payment = ((summa * r) / (1 - Math.pow(1 + r, -muddat))).toFixed(0);
    return Number(payment).toLocaleString(); // Raqamlarni ajratib ko'rsatish (1,000,000)
  };

  const sendToTelegram = async () => {
    if (!name || !phone || !type) {
      alert(t("kredit.alert_fill"));
      return;
    }

    const message = `
📩 ${t("kredit.form_title")}
👤 ${t("kredit.placeholder_name")}: ${name}
📞 ${t("kredit.placeholder_phone")}: ${phone}
💳 ${t("kredit.select_type")}: ${type}
    `;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    alert(t("kredit.alert_success"));
    setName(""); setPhone(""); setType("");
  };

  return (
    <div className="bg-white pt-24  text-gray-800"> {/* Padding to'g'irlandi */}
      {/* HERO */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">{t("kredit.hero_title")}</h1>
          <p className="text-gray-600 mb-6 text-lg">{t("kredit.hero_subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-bold">{t("kredit.btn_get")}</button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-bold">{t("kredit.btn_calc")}</button>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c" alt="kredit" className="rounded-3xl w-full h-[300px] md:h-[450px] object-cover shadow-lg" />
      </section>

      {/* KREDIT TURLARI */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t("kredit.types_title")}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {kreditTurlari.map((item) => (
            <div key={item.id} className="bg-gray-50 p-6 rounded-2xl hover:shadow-xl transition border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-blue-600">{item.title}</h3>
              <p className="text-gray-600"><strong>{t("kredit.rate_label")}:</strong> {item.rate}</p>
              <p className="text-gray-600"><strong>{t("kredit.max_label")}:</strong> {item.max}</p>
              <p className="text-gray-600"><strong>{t("kredit.term_label")}:</strong> {item.term}</p>
              <button className="mt-4 bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg w-full transition font-semibold">
                {t("kredit.btn_more")}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* KALKULYATOR */}
      <section className="max-w-[900px] mx-auto px-4 py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{t("kredit.calc_title")}</h2>
        <div className="bg-blue-50 p-6 md:p-10 rounded-3xl space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">{t("kredit.placeholder_sum")}</label>
            <input type="number" value={summa} onChange={(e) => setSumma(+e.target.value)} className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t("kredit.placeholder_term")}</label>
              <input type="number" value={muddat} onChange={(e) => setMuddat(+e.target.value)} className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t("kredit.placeholder_percent")}</label>
              <input type="number" value={foiz} onChange={(e) => setFoiz(+e.target.value)} className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-center text-blue-700">
            {t("kredit.monthly_payment")}: {oylikTolov()} {t("kredit.currency")}
          </div>
        </div>
      </section>

      {/* ARIZA */}
      <section className="max-w-[550px] mx-auto px-4 py-12 md:pb-32">
        <div className="bg-white p-8 md:p-10 rounded-3xl space-y-6 shadow-2xl border border-gray-100">
          <h2 className="text-2xl font-bold text-center">{t("kredit.form_title")}</h2>
          <input type="text" placeholder={t("kredit.placeholder_name")} value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white transition outline-none" />
          <input type="text" placeholder={t("kredit.placeholder_phone")} value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white transition outline-none" />
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white transition outline-none">
            <option value="">{t("kredit.select_type")}</option>
            {kreditTurlari.map((item) => (
              <option key={item.id} value={item.title}>{item.title}</option>
            ))}
          </select>
          <button onClick={sendToTelegram} className="bg-blue-600 text-white w-full py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95 transition-all">
            {t("kredit.btn_send")}
          </button>
        </div>
      </section>
    </div>
  );
}