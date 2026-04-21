export default function Fuerza() {
  return (
    <div className="catalog-body">

      {/* ── HERO ── */}
      <section className="section-hero relative flex items-center overflow-hidden"
        style={{ backgroundColor: '#0a0a0a' }}>
        <div className="absolute inset-0 z-0">
          <img
            alt="Professional Gym Environment"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyFWCojLpZU5sMrajRy__X4AirT5abm6cLs0rMjjKvvqIa21AErFPPdu6kEsM67XEnfDMQQd0d8THD8rIIP8GEN_2ME3bV3ATN79yIgLsoKeuVGJw0egCvN8elWmDF00clsBkE_x7SEaWuSgFoi1V8eTzJEswq1F8y8h6sMNaNhWepQnuvaJJAX68inFOuoVyiizFX6dqsTRraQPxZdJxtBshd9XHIuv79NWkvbZnhwfLEikjxJ4ujK91J3BmDynHbmrq_6DeS9gY"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative z-10 container mx-auto" style={{ padding: '0 3rem', maxWidth: '80rem' }}>
          <div style={{ maxWidth: '48rem' }}>
            <span className="inline-block bg-brand-red" style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '10px', color: '#fff', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', padding: '4px 12px', marginBottom: '1.5rem' }}>
              ENGINEERING EXCELLENCE
            </span>
            <h1 className="italic-brand" style={{ fontFamily: 'Lexend,sans-serif', fontWeight: 800, fontSize: 'clamp(3rem,8vw,6rem)', color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              CATÁLOGO DE <br />FUERZA
            </h1>
            <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '36rem', fontWeight: 300, lineHeight: 1.7, borderLeft: '4px solid #E31837', paddingLeft: '1.5rem' }}>
              Ingeniería Superior diseñada para el máximo rendimiento. Donde la biomecánica se encuentra con
              la durabilidad legendaria.
            </p>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary btn-hero" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                Explorar Equipos
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section style={{ backgroundColor: '#111111', padding: '6rem 0' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 3rem' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: 'Lexend,sans-serif', fontSize: '2.25rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.025em', color: '#fff' }}>
                Selección de Élite
              </h2>
              <div style={{ height: '4px', width: '5rem', backgroundColor: '#E31837', marginTop: '0.5rem' }} />
            </div>
            <div className="hidden md:block" style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              4 Categorías Principales
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '1rem' }}>

            {[
              {
                brand: 'LIFE FITNESS',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqJZS6UwgYq75fkLkX_98fZht42QJPx_1z6sSmujF2I9Pea7h4Beu4vCKJirL26meY00nJV_xQOh8fczFqLUJZW9W5ydDSm1mQoRdkexgM49r7i4W2boO-VRiXZcJp5-tfGuCz8cJ4Y65rcHzTj5JdldfyLimamoPAUQMx8hxBbE2Vx0SmJuT3Po7M2nws7GXI7fEm7nZM65eMsE7YJWFvnlCAWilvXOzLuVIWjLywTDFHjN8jiFkhqqmiXy8N9P_shvBs58e-LgA',
                title: 'Insignia Series Selectioned',
                desc: 'Movimiento natural y estética premium. Diseñadas para una experiencia de usuario intuitiva con torres de peso optimizadas.',
              },
              {
                brand: 'HAMMER STRENGTH',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKH5c2i5lYcU6wBT_wSQ9zT6GCoW-RCISvV866RRkgDaitMEa3jyubUxi997b3d-eM71yNTSK4qH4GhbSm1t_w81QK_QP3mW1snC6kZpkM1nw8D0tF1vL7Aea9I4WOVrFx-5JOrxxf5_NC3-eJsE-KwsGFXBbT2ambCaE5Syc_URH2LM0M2pG8w1FkoQt46QGF8a0mgrise598apDZ_yZyT8w0uXXaiCgOtZ07lyIa3N788PtbYvEzqD2azKhLnD-XJlDTWu2JZOA',
                title: 'Hammer Strength Racks',
                desc: 'El estándar de oro para el entrenamiento atlético. Estructuras de acero macizo construidas para resistir el castigo más extremo.',
              },
              {
                brand: 'HAMMER STRENGTH',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDICOLedAptGMfAEw5yR2Njgjf_RLOcKXp89_JykPMDvgSTSyDZHR1Ukj7lbJ6m6t1_34VABRuwXKSPnaGKfBFkVlqZCrHMV5BbJwe3a0YBBq27mlr7EZDBWW9ot1smkH-axC37rv4Ih-4XjWBqCrrdKJGxtdTMQbOOtoFA0nbohP9qDym4Cp-OxZ8XQGV1Ss2VESoo9xp4Nr798ySm4EtZeL_g7Kd-09cJChA5cqW9J3eeMg02vklQg6aeqYaZZpCLdG83LmCZn7A',
                title: 'Hammer Strength Benches',
                desc: 'Estabilidad inquebrantable y ajustes de precisión. Diseñados para complementar cualquier área de entrenamiento de fuerza.',
              },
              {
                brand: 'PREMIUM ACCESSORIES',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8nQ3iF3oKSNesote91WqLX17CPlFye4BDtyNmDCkRVZjt5T-4eldHrBawxPV1VQxvGnxWOmllaywpGRF-JsqhfibJoaXKaCcLv3_dw8Ov2B1SHgk1IL1z560tSZeV_N6c4-Z5CvAOjP3RwWjiDwhWfpxpap4iek1w3Yar-u3X-a3jrTerhcq2s1cEIii4bt8Uoov4zhs0rWf8E6dxHu8Vnaz5lVUEkrFwsjIWjE3UzMWO506maWponVcThyM1CAzWN1nnBvCVVQo',
                title: 'Free Weights (Pesas Libres)',
                desc: 'Discos, mancuernas y barras de grado olímpico. Durabilidad superior con acabados de uretano y acero de alta resistencia.',
              },
            ].map(({ brand, img, title, desc }) => (
              <div
                key={title}
                className="zoom-card fuerza-card"
                style={{ position: 'relative', backgroundColor: '#141414', overflow: 'hidden', height: '500px', display: 'flex', flexDirection: 'column', borderLeft: '2px solid transparent', transition: 'border-color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.borderLeftColor = '#E31837'}
                onMouseLeave={e => e.currentTarget.style.borderLeftColor = 'transparent'}
              >
                {/* Image (top 2/3) */}
                <div style={{ height: '66.666%', overflow: 'hidden' }}>
                  <img alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} src={img} />
                </div>
                {/* Brand badge */}
                <span style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: 'rgba(42,42,42,0.85)', backdropFilter: 'blur(6px)', padding: '2px 10px', fontFamily: 'Montserrat,sans-serif', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#fff', letterSpacing: '0.05em' }}>
                  {brand}
                </span>
                {/* Content (bottom 1/3) */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'Lexend,sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#fff', lineHeight: 1.1, marginBottom: '0.75rem' }}>{title}</h3>
                    <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{desc}</p>
                  </div>
                  <button className="catalog-btn-cotizar" style={{ marginTop: '1rem' }}>Cotizar</button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── BRAND PHILOSOPHY ── */}
      <section style={{ backgroundColor: '#0a0a0a', padding: '6rem 0', borderTop: '1px solid rgba(51,51,51,0.15)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
          className="philosophy-grid">
          <div>
            <h2 className="italic-brand" style={{ fontFamily: 'Lexend,sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', marginBottom: '2rem', lineHeight: 1.1 }}>
              EL ESTÁNDAR DE LOS CAMPEONES.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'Manrope,sans-serif', fontSize: '1.0625rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75 }}>
              <p>En Life Fitness Venezuela, no solo vendemos máquinas; equipamos visiones de grandeza. Hammer
                Strength es la marca elegida por los atletas profesionales de todo el mundo.</p>
              <p>Nuestra línea de fuerza combina una ergonomía avanzada con una resistencia estructural que
                sobrepasa los límites de la industria, asegurando que cada repetición cuente.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(51,51,51,0.25)' }}>
              {[{ val: '45+', lbl: 'Años de Innovación' }, { val: '100%', lbl: 'Acero Industrial' }].map(({ val, lbl }) => (
                <div key={lbl}>
                  <div className="brand-red" style={{ fontFamily: 'Lexend,sans-serif', fontWeight: 700, fontSize: '2rem' }}>{val}</div>
                  <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem' }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img
              alt="Hammer Strength Detail"
              className="philosophy-img"
              style={{ width: '100%', height: '600px', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.7s' }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaciBFxOhA5aMD6niPm0zXqyptPjo_Bb0hDDRuotyEQ6xKWPFx0WdOEfWbpxYtz1UgOREfgcRKN6jRdwJpkxxG4aDUlLxlgfa8WduyHJbXFBYSp7qRfpPZ8TukPqMr0x7VdOc139qUnHI1qzR774wyrB0CawkatHrrZb5NgC_ZPxJwJnP5j6lGOWzFuITdhpdv12f0lkywjnC8OgIAgZ6wnUZlJjpDzo51pDnrEjZburiFqjMV-x3NBhWgBPGeTyaa0a9YuFcnGws"
              onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(100%)'}
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(51,51,51,0.2)', padding: '5rem 0' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '3rem', marginBottom: '4rem' }}>
            <div>
              <h3 style={{ fontFamily: 'Lexend,sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="bg-brand-red" style={{ width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat,sans-serif', fontSize: '0.625rem', fontWeight: 900 }}>LF</span>
                Life Fitness Venezuela
              </h3>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                Líderes mundiales en equipamiento de fitness comercial y residencial. Representación exclusiva en Venezuela.
              </p>
            </div>
            {[
              { label: 'Navegación', items: ['About Us', 'Products', 'Solutions', 'Support'] },
              { label: 'Social', items: ['Instagram', 'Facebook', 'LinkedIn'] },
            ].map(({ label, items }) => (
              <div key={label}>
                <h4 className="brand-red" style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2rem' }}>{label}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {items.map(i => (
                    <li key={i} style={{ marginBottom: '1rem' }}>
                      <a href="#" className="footer-link">{i}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="brand-red" style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2rem' }}>Newsletter</h4>
              <div style={{ position: 'relative' }}>
                <input
                  placeholder="Email Address"
                  type="email"
                  style={{ width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid rgba(51,51,51,0.4)', padding: '0.75rem 2rem 0.75rem 0', fontFamily: 'Manrope,sans-serif', fontSize: '0.875rem', color: '#fff', outline: 'none' }}
                />
                <button className="brand-red" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(51,51,51,0.15)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)' }}>
              © 2024 Life Fitness Venezuela. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Privacy Policy', 'Terms of Service'].map(l => (
                <a key={l} href="#" style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.3s' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
