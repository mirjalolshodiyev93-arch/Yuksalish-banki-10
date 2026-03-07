import React, { useState } from "react";
import { motion } from "framer-motion";

const initialTestimonials = [
  {
    name: "Ali Rustam",
    role: "Kredit Foydalanuvchisi",
    message: "Yuksalish Bankdagi xizmatlar juda qulay va tezkor. Men omonatni ochishdan juda mamnunman.",
    img: "https://i.pravatar.cc/100?img=12"
  },
  {
    name: "Malika Karimova",
    role: "Kart Foydalanuvchisi",
    message: "Online banking interfeysi juda sodda va tushunarli. Mijozlarga xizmat darajasi a’lo.",
    img: "https://i.pravatar.cc/100?img=32"
  },
  {
    name: " Jumaqulva J",
    role: "Valyuta Savdogari",
    message: "Valyuta kurslari yangilanadi va har doim qulay. Men doimo bu bank bilan ishlayman.",
    img: "https://i.pravatar.cc/100?img=44"
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [form, setForm] = useState({ name: "", role: "", message: "", imgFile: null, imgPreview: "" });
  const [submitted, setSubmitted] = useState(false); // ✅ bu flag formani bloklash uchun

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        imgFile: file,
        imgPreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.message) return;

    const newTestimonial = {
      name: form.name,
      role: form.role,
      message: form.message,
      img: form.imgPreview || `https://i.pravatar.cc/100?u=${form.name}`
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setSubmitted(true); // ✅ yuborilgandan keyin formani bloklaymiz
  };

  return (
    <section className="bg-gray-50 py-24 px-4 sm:px-10 lg:px-20">
      <motion.div {...fadeIn} className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Mijozlarimiz Nima Deydi</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Bizning mijozlarimiz Yuksalish Bank bilan qanday muvaffaqiyatga erishganini o‘qing va o‘z fikringizni qoldiring.
        </p>
      </motion.div>

      {/* Input form */}
      <motion.form {...fadeIn} onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Ismingiz"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={submitted} // ✅ yuborilgandan keyin disable
        />
        <input
          type="text"
          placeholder="Rol / Qulaylik"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={submitted}
        />
        <textarea
          placeholder="Fikringiz..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          disabled={submitted}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={submitted}
        />
        <button
          type="submit"
          className={`bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-colors ${
            submitted ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={submitted} // ✅ tugmani ham disable qilamiz
        >
          Fikringizni yuboring
        </button>
        {submitted && <p className="text-green-600 mt-2 text-center">Sizning fikringiz yuborildi!</p>}
      </motion.form>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <motion.div 
            key={index} 
            {...fadeIn} 
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-4 border-blue-50 shadow-md">
              <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-gray-700 mb-4">&ldquo;{t.message}&rdquo;</p>
            <h4 className="font-bold text-lg">{t.name}</h4>
            <span className="text-blue-600 text-sm">{t.role}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}