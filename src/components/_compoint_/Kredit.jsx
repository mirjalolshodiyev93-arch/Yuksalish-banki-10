import { useState } from "react";
import { useTranslation } from "react-i18next"; // i18n qo'shildi

const BOT_TOKEN = "8397312064:AAFoqmc2-7rbK7pSWIwZsLZWTEXcqp11Mgw";
const CHAT_ID = "8429418799";

export default function Kredit() {
  const { t } = useTranslation(); 

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
    return Number(payment).toLocaleString();
  };

  // 🔹 Ism birinchi harf katta qilish
  const capitalizeName = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // 🔹 Telefonni faqat raqam, maksimal 9 ta raqamga cheklash
  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, ""); // faqat raqam
    if (val.length > 9) val = val.slice(0, 9);
    setPhone(val);
  };

  const sendToTelegram = async () => {
    const formattedName = capitalizeName(name.trim());

    // 🔹 Ism tekshiruvi
    if (formattedName.length < 2) {
      alert("Ism kamida 2 ta harf bo‘lishi kerak!");
      return;
    }

    // 🔹 Telefon tekshiruvi
    if (!phone || phone.length !== 9) {
      alert("Iltimos, telefon raqamingizni 9 ta raqam kiriting!");
      return;
    }

    if (!type) {
      alert(t("kredit.alert_fill"));
      return;
    }

    const fullPhone = `+998${phone}`;

    const message = `
📩 ${t("kredit.form_title")}
👤 ${t("kredit.placeholder_name")}: ${formattedName}
📞 ${t("kredit.placeholder_phone")}: ${fullPhone}
💳 ${t("kredit.select_type")}: ${type}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      });

      alert(t("kredit.alert_success"));
      setName(""); setPhone(""); setType("");
    } catch (err) {
      console.error(err);
      alert("Xabar yuborilmadi, iltimos qayta urinib ko‘ring!");
    }
  };

  return (
    <div className="bg-white pt-24 text-gray-800">
      {/* ARIZA */}
      <section className="max-w-[550px] mx-auto px-4 py-12 md:pb-32">
        <div className="bg-white p-8 md:p-10 rounded-3xl space-y-6 shadow-2xl border border-gray-100">
          <h2 className="text-2xl font-bold text-center">{t("kredit.form_title")}</h2>

          <input
            type="text"
            placeholder={t("kredit.placeholder_name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white transition outline-none"
          />

          <input
            type="text"
            placeholder={t("kredit.placeholder_phone")}
            value={phone}
            onChange={handlePhoneChange}
            className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white transition outline-none"
          />

          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-4 rounded-xl border bg-gray-50 focus:bg-white transition outline-none">
            <option value="">{t("kredit.select_type")}</option>
            {kreditTurlari.map((item) => (
              <option key={item.id} value={item.title}>{item.title}</option>
            ))}
          </select>

          <button
            onClick={sendToTelegram}
            className="bg-blue-600 text-white w-full py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95 transition-all"
          >
            {t("kredit.btn_send")}
          </button>
        </div>
      </section>
    </div>
  );
}