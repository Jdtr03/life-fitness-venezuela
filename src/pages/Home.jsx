import { useRef } from 'react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────
   Category overlay card — all inline styles so
   Tailwind preflight can never break the layout
───────────────────────────────────────────────*/
function CategoryCard({ img, title, desc, linkLabel, to, href }) {
  const imgRef = useRef(null);
  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#000', height: '500px', cursor: 'pointer' }}
      onMouseEnter={() => { if (imgRef.current) imgRef.current.style.transform = 'scale(1.1)'; }}
      onMouseLeave={() => { if (imgRef.current) imgRef.current.style.transform = 'scale(1)'; }}
    >
      {/* Full-bleed background image */}
      <img
        ref={imgRef}
        alt={title}
        src={img}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          opacity: 0.75,
          transition: 'transform 0.7s ease',
        }}
      />
      {/* Bottom gradient for text legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 35%, transparent 100%)',
      }} />
      {/* Text content pinned to bottom-left */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: '2.5rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}>
        <h3 style={{
          fontFamily: 'Montserrat, sans-serif',
          color: '#fff', fontSize: '1.875rem', fontWeight: 800,
          textTransform: 'uppercase', marginBottom: '0.5rem',
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          color: '#e5e7eb', marginBottom: '1.5rem', fontWeight: 300, fontSize: '0.9rem',
        }}>
          {desc}
        </p>
        {to ? (
          <Link to={to} style={{
            color: '#fff', fontWeight: 700, fontSize: '0.75rem',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            textDecoration: 'none',
          }}>
            {linkLabel}
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <a href={href || '#'} style={{
            color: '#fff', fontWeight: 700, fontSize: '0.75rem',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            textDecoration: 'none',
          }}>
            {linkLabel}
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Trust item
───────────────────────────────────────────────*/
function TrustItem({ icon, title, desc }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ color: '#E31837', marginBottom: '1rem' }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase',
        marginBottom: '0.5rem', color: '#111',
      }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#6b7280', fontSize: '0.875rem' }}>
        {desc}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────*/
export default function Home() {
  return (
    <main>

      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '85dvh',
        minHeight: '520px',
        overflow: 'hidden',
      }}>
        {/* Background image — ALL inline so Tailwind cannot override height */}
        <img
          alt="High-end Gym Facility"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4U7_rBZpoeJ2PY85s7RWnSSWLfipw5MXkgxuEA7xXRPu58iM5cn-IJ6DwMlF-kxGKGR-S7vcw-aVY8QV6ABcjRTgyWATGu8IkgS4SGMqsIxYf9MsmHqYwfsofifKEiAvjsWu-GDhuVhr4R9lulb_dyK0RYPDCPdiqAbncMe6wYJknt-Q-kOQHSw4qJHWf-z7iRG-VQJ-TrH57ZjxoHfMdCfNTjiEMv87k6blUjc-HAkklsu1R-mIpL4Uvre8cXRffzKlX7gjnuhuU"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
          }}
        />
        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)',
          display: 'flex', alignItems: 'center',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
            <div style={{ maxWidth: '49rem' }}>
              <h1 style={{
                fontFamily: 'Montserrat, sans-serif',
                color: '#fff', fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
                fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem',
              }}>
                EL ESTÁNDAR GLOBAL EN{' '}
                <span style={{ color: '#E31837', fontStyle: 'italic' }}>FITNESS</span>
              </h1>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                color: '#fff', fontSize: '1.125rem',
                marginBottom: '2rem', fontWeight: 300, maxWidth: '42rem',
              }}>
                Transformamos espacios deportivos en Venezuela con tecnología de vanguardia y diseño
                ergonómico superior.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href="#products"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#E31837', color: '#fff',
                    padding: '1rem 2rem',
                    fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
                    fontSize: '0.875rem', textTransform: 'uppercase',
                    letterSpacing: '0.05em', textDecoration: 'none',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#000')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E31837')}
                >
                  Explorar Productos
                </a>
                <a
                  href="#"
                  style={{
                    display: 'inline-block',
                    border: '2px solid #fff', color: '#fff',
                    padding: '1rem 2rem',
                    fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
                    fontSize: '0.875rem', textTransform: 'uppercase',
                    letterSpacing: '0.05em', textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fff'; }}
                >
                  Nuestra Historia
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ TRUST BAR ══════════════════ */}
      <section style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #f3f4f6',
        padding: '3rem 0',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
          }}>
            <TrustItem
              title="Diseño de Instalaciones"
              desc="Creamos espacios optimizados para el máximo rendimiento."
              icon={
                <svg style={{ width: '2.5rem', height: '2.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />
            <TrustItem
              title="Soporte Global"
              desc="Servicio técnico especializado y repuestos originales en Venezuela."
              icon={
                <svg style={{ width: '2.5rem', height: '2.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              }
            />
            <TrustItem
              title="Innovación"
              desc="Equipos conectados con la última tecnología biométrica."
              icon={
                <svg style={{ width: '2.5rem', height: '2.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ══════════════════ CATEGORY GRID ══════════════════ */}
      <section id="products" style={{ backgroundColor: '#f9fafb', padding: '5rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Heading */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(1.875rem, 3vw, 2.25rem)',
              fontWeight: 800, textTransform: 'uppercase',
              letterSpacing: '-0.025em', color: '#111',
            }}>
              Categorías <span style={{ color: '#E31837' }}>Premium</span>
            </h2>
            {/* Red underline */}
            <div style={{ width: '5rem', height: '0.25rem', backgroundColor: '#E31837', marginTop: '1rem' }} />
          </div>

          {/* 3 overlay cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            <CategoryCard
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuD60RsB_Z4BhiISUepjPpBQ2VBS5VqQFRHYfBBOY5vi36KOpGJetYg48JG12WpLcVYyFwKLq8BVhbBCkEbeKsdJhvmFAy2Id8mWhUsgsjTA13s3hwhTO-Z_Vgfj3B5booB7tP7RUwPtvMJQ7gr6ZpVzlhjFhghcXCiQwiJBEwEiIev3QBVUKatEYXyfdrbZpvDxwAwlxXAaxWlTy_ZChqzxus1fcHhzLQ3eFEQhbLPt6CGOY3AcyXYZYru3OVJwHkWVvOWDoBnRHXMH"
              title="Cardio"
              desc="Cintas de correr, elípticas y bicicletas diseñadas para durar."
              linkLabel="Ver Equipos"
              to="/cardio"
            />
            <CategoryCard
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuDNA_v7YWaRhHYS_DKa1dZTNND8kditSK3-TEPBQRN4Hhn_RQbBVcbNyYT99o3ZHw6epKnsWOCJmRBTWmsBZGBPBFHZ3u0MrIi4MUTA5TI0QjkM-EOOZzEdSQ5plNfrcQ4hBAuQZks-COHtRrYPdzJuGTw5v9PbIElgUWpH9LiTr2L6xqom2drAZBecPwNMAOEFy-3KEVdBqTuL35GjuBb5uXlWCKcEjMOZcMzHLelY5dCuTPnaiHkfM8CVKDT79vYBNKak27g38gYb"
              title="Fuerza"
              desc="Ingeniería de vanguardia para entrenamiento de resistencia."
              linkLabel="Ver Equipos"
              to="/fuerza"
            />
            <CategoryCard
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuC-T2RuvcgMU8zZScpAphGP-rDJmi5fxwPBFbApVGnp697Lj6SJqz8Uch9jco-WfQsvbvxxXfachl_Ja6aNS5xMEIt8NPTh_lJlfte5pe96lusiZ93Xc0Btwq7RNxFSWXtoVn32VXmaeCZBAZOFn-aMtXi_1ZetyCk7QI3RsKURRPn_Av1oBbWUTP4yWm_p_oFD4QTn_pu7DRAoU6aiGPWEGCH6fixVm_VDsrrIJXy2tRK0d95ER3dplsnQB-IYfNfzJ9_IogAFsaOz"
              title="Digital"
              desc="Ecosistemas conectados y gestión inteligente de gimnasios."
              linkLabel="Más información"
              href="#"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '5rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{
            backgroundColor: '#111',
            color: '#fff',
            padding: '3rem 4rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}>
            <div style={{ maxWidth: '34rem' }}>
              <h2 style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(1.875rem, 3vw, 3rem)',
                fontWeight: 800, textTransform: 'uppercase',
                fontStyle: 'italic', marginBottom: '1rem',
              }}>
                ¿Listo para elevar tu gimnasio?
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: 1.65 }}>
                Nuestros consultores en Caracas están listos para ayudarte a diseñar la mejor experiencia
                para tus usuarios.
              </p>
            </div>
            <a
              href="mailto:info@lifefitness.com.ve"
              style={{
                display: 'inline-block',
                backgroundColor: '#E31837', color: '#fff',
                padding: '1.25rem 2.5rem',
                fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
                fontSize: '0.875rem', textTransform: 'uppercase',
                letterSpacing: '0.05em', textDecoration: 'none',
                whiteSpace: 'nowrap', transition: 'background-color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c0152f')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E31837')}
            >
              Hablar con un Experto
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{ backgroundColor: '#111', color: '#fff', paddingTop: '4rem', paddingBottom: '2rem', borderTop: '1px solid #1f2937' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* 4-column grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}>
            {/* Brand */}
            <div>
              <div style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 800, fontSize: '1.5rem',
                textTransform: 'uppercase', fontStyle: 'italic',
                marginBottom: '1.5rem',
              }}>
                Life<span style={{ color: '#E31837' }}>Fitness</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.625 }}>
                Líder mundial en la fabricación de equipos de fitness comerciales y para el hogar.
                Innovando para cada cuerpo en movimiento.
              </p>
            </div>

            {/* Equipos */}
            <div>
              <h4 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.5rem', fontSize: '0.875rem', letterSpacing: '0.1em' }}>
                Equipos
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Hammer Strength', 'Cybex', 'ICG', 'Equipamiento Cardio'].map(l => (
                  <li key={l} style={{ marginBottom: '1rem' }}>
                    <a href="#" style={{ color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#E31837')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soporte */}
            <div>
              <h4 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.5rem', fontSize: '0.875rem', letterSpacing: '0.1em' }}>
                Soporte
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Servicio Técnico', 'Manuales de Usuario', 'Garantía', 'Repuestos'].map(l => (
                  <li key={l} style={{ marginBottom: '1rem' }}>
                    <a href="#" style={{ color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.3s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#E31837')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Venezuela */}
            <div>
              <h4 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.5rem', fontSize: '0.875rem', letterSpacing: '0.1em' }}>
                Venezuela
              </h4>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#E31837', flexShrink: 0, marginTop: '2px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Calle Orinoco, Las Mercedes.<br />Caracas, Distrito Capital 1060.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#9ca3af', fontSize: '0.875rem' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#E31837', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+58 (212) 000-0000</span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid #1f2937', paddingTop: '2rem',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-between', gap: '1rem',
            fontSize: '10px', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: '#6b7280',
            fontFamily: 'Montserrat, sans-serif',
          }}>
            <div>© 2023 Life Fitness Venezuela. Todos los derechos reservados.</div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Política de Privacidad', 'Términos de Uso', 'Accesibilidad'].map(l => (
                <a key={l} href="#" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#E31837')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
