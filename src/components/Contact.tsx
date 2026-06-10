import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, PhoneCall, Envelope, Clock } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const CONTACT_INFO = [
  {
    Icon:  MapPin,
    label: 'Direccion',
    value: 'Parroquia San Jose, Av. Principal s/n',
  },
  {
    Icon:  PhoneCall,
    label: 'Telefono',
    value: '+593 (02) 000-0000',
  },
  {
    Icon:  Envelope,
    label: 'Correo electronico',
    value: 'informacion@uepsanjose.edu.ec',
  },
  {
    Icon:  Clock,
    label: 'Horario de atencion',
    value: 'Lunes a Viernes, 7:30 - 16:00',
  },
]

type FormData = {
  nombre:  string
  correo:  string
  telefono: string
  nivel:   string
  mensaje: string
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState<FormData>({
    nombre:   '',
    correo:   '',
    telefono: '',
    nivel:    '',
    mensaje:  '',
  })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-header', start: 'top 82%', once: true },
        }
      )
      gsap.fromTo(
        '.contact-form-col',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-form-col', start: 'top 80%', once: true },
        }
      )
      gsap.fromTo(
        '.contact-info-col',
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-info-col', start: 'top 80%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production this would POST to an API endpoint
    setSent(true)
  }

  const inputBase = [
    'w-full px-4 py-3 rounded-lg border border-gray-200 bg-white',
    'text-gray-900 placeholder:text-gray-400 text-sm',
    'focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand',
    'transition-colors duration-150',
  ].join(' ')

  return (
    <section id="contacto" ref={sectionRef} className="py-24 md:py-32 bg-brand-pale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="contact-header opacity-0 max-w-2xl mb-14">
          <h2 className="text-brand font-bold text-4xl md:text-5xl leading-tight tracking-tight mb-4">
            Hablemos sobre el futuro de tu hijo
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Nuestro equipo esta listo para orientarte en el proceso de inscripcion y
            responder todas tus preguntas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Form - 3 columns */}
          <div className="contact-form-col opacity-0 lg:col-span-3 bg-white rounded-2xl p-7 md:p-10 shadow-sm">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center gap-4">
                <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mb-2">
                  <Envelope size={28} weight="fill" className="text-white" />
                </div>
                <h3 className="text-brand font-bold text-2xl">Mensaje enviado</h3>
                <p className="text-gray-500 max-w-xs">
                  Gracias por contactarnos. Nos comunicaremos contigo a la brevedad.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 text-sm text-brand font-medium hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Maria Garcia"
                      required
                      className={inputBase}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="correo" className="text-sm font-medium text-gray-700">
                      Correo electronico <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="correo"
                      name="correo"
                      type="email"
                      value={form.correo}
                      onChange={handleChange}
                      placeholder="maria@correo.com"
                      required
                      className={inputBase}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="telefono" className="text-sm font-medium text-gray-700">
                      Telefono
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="+593 09X XXX XXXX"
                      className={inputBase}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nivel" className="text-sm font-medium text-gray-700">
                      Nivel de interes
                    </label>
                    <select
                      id="nivel"
                      name="nivel"
                      value={form.nivel}
                      onChange={handleChange}
                      className={inputBase}
                    >
                      <option value="">Selecciona un nivel</option>
                      <option value="preescolar">Preescolar</option>
                      <option value="primaria">Primaria</option>
                      <option value="bachillerato">Bachillerato</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mensaje" className="text-sm font-medium text-gray-700">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="Escribe tu consulta aqui..."
                    rows={5}
                    required
                    className={`${inputBase} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-shine w-full py-3.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-mid text-base"
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar - 2 columns */}
          <div className="contact-info-col opacity-0 lg:col-span-2 flex flex-col gap-6 justify-center">
            {CONTACT_INFO.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-11 h-11 bg-brand rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Icon size={20} weight="fill" className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="text-gray-800 font-medium text-sm leading-snug">{value}</p>
                </div>
              </div>
            ))}

            <div className="mt-2 rounded-2xl overflow-hidden h-48 bg-gray-100">
              <img
                src="https://picsum.photos/seed/school-building-exterior-blue/600/300"
                alt="Vista exterior de la U.E.P. San Jose"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
