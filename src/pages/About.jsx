export default function About() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">

      {/* Historia */}
      <section className="mb-20">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Quiénes somos</span>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Nuestra historia
        </h1>
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center">
          <p className="text-lg text-slate-600 leading-relaxed">
            Fundado en <strong>1994</strong>, el Colegio San José nació con la convicción de que
            cada estudiante merece una educación integral que combine excelencia académica,
            formación en valores y desarrollo humano. A lo largo de más de tres décadas hemos
            acompañado a miles de familias en el camino hacia el futuro de sus hijos.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-lg h-64 bg-slate-200">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=75"
              alt="Historia del colegio"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-3">Misión</h2>
          <p className="text-slate-700 leading-relaxed">
            Brindar una educación de calidad fundamentada en principios éticos y cristianos,
            que forme personas íntegras, críticas y comprometidas con su comunidad y con el
            desarrollo sostenible del país.
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-indigo-900 mb-3">Visión</h2>
          <p className="text-slate-700 leading-relaxed">
            Ser reconocidos como una institución educativa líder a nivel regional, destacada
            por la excelencia académica, la innovación pedagógica y la formación de ciudadanos
            capaces de transformar positivamente su entorno.
          </p>
        </div>
      </section>
    </main>
  );
}
