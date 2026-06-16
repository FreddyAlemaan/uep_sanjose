import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const formRef = useRef(null);
  const [form,   setForm]   = useState(INITIAL);
  const [status, setStatus] = useState('idle');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.sendForm(
        'SERVICE_ID',
        'TEMPLATE_CONTACTO',
        formRef.current,
        'PUBLIC_KEY'
      );
      setStatus('success');
      setForm(INITIAL);
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Estamos aquí</span>
      <h1 className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl">Contáctanos</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">

        {/* Formulario */}
        <div>
          {status === 'success' ? (
            <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="mt-4 text-xl font-bold text-green-800">¡Mensaje enviado!</h2>
              <p className="mt-2 text-green-700">Te responderemos a la brevedad posible.</p>
              <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-semibold text-green-700 underline">
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre" name="name" value={form.name} onChange={handle} required />
                <Field label="Teléfono" name="phone" type="tel" value={form.phone} onChange={handle} />
              </div>
              <Field label="Correo electrónico" name="email" type="email" value={form.email} onChange={handle} required />
              <Field label="Asunto" name="subject" value={form.subject} onChange={handle} required />

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Mensaje *</label>
                <textarea
                  name="message" value={form.message} onChange={handle} rows={5} required
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-600 font-medium">
                  Error al enviar. Por favor intenta de nuevo.
                </p>
              )}

              <button
                type="submit" disabled={status === 'sending'}
                className="w-full rounded-xl bg-blue-700 py-4 text-base font-bold text-white
                  hover:bg-blue-600 transition-colors disabled:opacity-60"
              >
                {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
              </button>
            </form>
          )}
        </div>

        {/* Info de contacto + mapa */}
        <div className="space-y-6">
          <ContactCard
            icon={
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            }
            title="Teléfono"
            lines={['+58 (212) 000-0000', '+58 414-000-0000 (WhatsApp)']}
          />

          <ContactCard
            icon={
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            }
            title="Correo"
            lines={['info@colegiosanjose.edu', 'pagos@colegiosanjose.edu']}
          />

          <ContactCard
            icon={
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            }
            title="Dirección"
            lines={['Av. Principal de Los Jardines,', 'Caracas, Venezuela']}
          />

          {/* Mapa embebido */}
          <div className="rounded-2xl overflow-hidden shadow-md h-52 border border-slate-200">
            <iframe
              title="Ubicación Colegio San José"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.0!2d-66.9036!3d10.4806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDI4JzUwLjIiTiA2NsKwNTQnMTMuMCJX!5e0!3m2!1ses!2sve!4v1234567890"
              width="100%" height="100%" style={{ border: 0 }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, name, type = 'text', value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">
        {label} {required && '*'}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        required={required}
        className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
      />
    </div>
  );
}

function ContactCard({ icon, title, lines }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
          {icon}
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        {lines.map(l => <p key={l} className="text-sm text-slate-600">{l}</p>)}
      </div>
    </div>
  );
}
