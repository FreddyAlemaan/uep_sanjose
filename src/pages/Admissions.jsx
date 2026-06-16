import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const GRADES = [
  '1er Grado', '2do Grado', '3er Grado', '4to Grado', '5to Grado', '6to Grado',
  '7mo Grado (1er Año)', '8vo Grado (2do Año)', '9no Grado (3er Año)',
  '10mo Grado (4to Año)', '11vo Grado (5to Año)',
];

const INITIAL = {
  studentName: '', studentLastname: '', birthdate: '',
  grade: '', parentName: '', parentPhone: '', parentEmail: '',
  message: '',
};

export default function Admissions() {
  const formRef = useRef(null);
  const [form,    setForm]    = useState(INITIAL);
  const [status,  setStatus]  = useState('idle'); // idle | sending | success | error

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Reemplazar con tus IDs de EmailJS
      await emailjs.sendForm(
        'SERVICE_ID',
        'TEMPLATE_INSCRIPCION',
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
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Proceso de admisión</span>
      <h1 className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl">
        Solicitud de inscripción
      </h1>
      <p className="mt-4 text-slate-600">
        Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas hábiles
        para continuar el proceso.
      </p>

      {status === 'success' ? (
        <div className="mt-10 rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-xl font-bold text-green-800">¡Solicitud enviada!</h2>
          <p className="mt-2 text-green-700">Revisaremos tu solicitud y te contactaremos pronto.</p>
          <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-semibold text-green-700 underline">
            Enviar otra solicitud
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={submit} className="mt-10 space-y-6">

          {/* Datos del estudiante */}
          <fieldset className="rounded-2xl border border-slate-200 p-6 space-y-4">
            <legend className="px-2 text-sm font-bold text-slate-700 uppercase tracking-wide">
              Datos del estudiante
            </legend>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre(s)" name="studentName"   value={form.studentName}   onChange={handle} required />
              <Field label="Apellido(s)" name="studentLastname" value={form.studentLastname} onChange={handle} required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Fecha de nacimiento" name="birthdate" type="date"
                value={form.birthdate} onChange={handle} required />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Grado a inscribir *</label>
                <select
                  name="grade" value={form.grade} onChange={handle} required
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                >
                  <option value="">Seleccionar grado…</option>
                  {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
          </fieldset>

          {/* Datos del representante */}
          <fieldset className="rounded-2xl border border-slate-200 p-6 space-y-4">
            <legend className="px-2 text-sm font-bold text-slate-700 uppercase tracking-wide">
              Datos del representante
            </legend>

            <Field label="Nombre completo" name="parentName" value={form.parentName} onChange={handle} required />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Teléfono / WhatsApp" name="parentPhone" type="tel"
                value={form.parentPhone} onChange={handle} required />
              <Field label="Correo electrónico" name="parentEmail" type="email"
                value={form.parentEmail} onChange={handle} required />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Mensaje adicional (opcional)</label>
              <textarea
                name="message" value={form.message} onChange={handle} rows={3}
                placeholder="Cualquier información relevante…"
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
              />
            </div>
          </fieldset>

          {status === 'error' && (
            <p className="text-sm text-red-600 font-medium">
              Ocurrió un error al enviar. Por favor intenta nuevamente o contáctanos directamente.
            </p>
          )}

          <button
            type="submit" disabled={status === 'sending'}
            className="w-full rounded-xl bg-blue-700 py-4 text-base font-bold text-white
              hover:bg-blue-600 active:bg-blue-800 transition-colors disabled:opacity-60"
          >
            {status === 'sending' ? 'Enviando…' : 'Enviar solicitud de inscripción'}
          </button>
        </form>
      )}

      {/* Sección de pagos */}
      <section id="pagos" className="mt-24">
        <h2 className="text-3xl font-extrabold text-slate-900">Pagos</h2>
        <p className="mt-3 text-slate-600">
          Realiza tu pago mediante transferencia bancaria y envía el comprobante a nuestro
          WhatsApp o correo institucional.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3 text-sm text-slate-700">
          <div className="flex justify-between"><span className="font-medium">Banco:</span><span>Banco Nacional</span></div>
          <div className="flex justify-between"><span className="font-medium">Titular:</span><span>Colegio San José C.A.</span></div>
          <div className="flex justify-between"><span className="font-medium">RIF / N° cuenta:</span><span>J-123456789 / 0102-0000-00-0000000000</span></div>
          <div className="flex justify-between"><span className="font-medium">Pago móvil:</span><span>0414-000-0000</span></div>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Envía el comprobante a <strong>pagos@colegiosanjose.edu</strong> o al WhatsApp
          {' '}<strong>+58 414-000-0000</strong> indicando el nombre del estudiante.
        </p>
      </section>
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
