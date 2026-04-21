export default function Cardio() {

  /* Reuse the hover border effect without JS-only handlers */
  const cardHover = {
    style: { borderLeft: '2px solid transparent', transition: 'border-left-color 0.25s' },
    onMouseEnter: e => (e.currentTarget.style.borderLeftColor = '#E31837'),
    onMouseLeave: e => (e.currentTarget.style.borderLeftColor = 'transparent'),
  };

  const products = [
    {
      badge: 'Integrity', badgePremium: false,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZM7NaLlQ1r4tGb9d_kIbCGUGEbmz-wxqYy8kSTfkMHRzg58Oppogf_mhB82fWLG3gg6xazb10z8S4RmvFi5KZ6qirqRzDASy13CjvIhwKRGrqKMKByo3nq4nzE1GDBKFeU-5g4JbLchQVBGSxnKGP--9DtA1jYBbsqMl2TaJ_Ee2rEJP83IBZTt6xR06xpVh64O9y0slee0hygcLD2Ox02t37a9P220VLiWRI2CmcHiGTShpKgPkdxohg7Rs_TosM5sdjES3rmpE',
      title: 'Integrity Series Treadmill',
      desc: 'Diseñada para un uso comercial intensivo. Cuenta con tecnología FlexDeck® para reducir el impacto en las articulaciones y consolas conectadas de última generación.',
    },
    {
      badge: 'Premium', badgePremium: true,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdqL2FhsQoaUfP-uJqZWaZk5OI6Az0-3K1InE0sHT3rq5smejCFI7uo-Klz9jMPLztp5bXQkwpEbVTkCzWwEoUM9SoPdyBC7runzZk1s5njtiqcd7vph_BXvMr5ATuxJkUlO5IfgqtUiyzZANhpjt_O_JzE-G7dIHTu6Op8AvKHHPdEaZhH7O_wQKjLUk-zRfsm7BDmiqcHGq7NDHLGv1NcJO75FyAuWvoPJt2aAW47ZtQq8dM0vPylPnWUPsptvsxwixvwYQitP0',
      title: 'Platinum Club Series Treadmill',
      desc: 'La cima del cardio en casa y clubes exclusivos. Ofrece entretenimiento inmersivo y personalización absoluta en cada zancada.',
    },
    {
      badge: 'Integrity', badgePremium: false,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb793tzba29I4xKOvYqNRbR6jdfqF7qjm8b7DjUbncmx84s91Xf6zJBqzvBDnL9DepVETCwDJiBUcsgk9rlTh5T9H1WLMeyebSomWXbYHLEN_YljIXEvfkTgq4R-HIPwOKQx_mlSUaVk-OHBtnpyTdgQZkUxh7KLeudn_pOZ3d2fsjPz0xCRceN-J56VfMo4PUZsPrV8ogmYEDV7He1sqMbk93XcwrpC6Jfyb2An9FKe4Q4xKYcH6MOMJmJ7hJpnMoNU3Obl_waeo',
      title: 'Integrity Series Elliptical',
      desc: 'Movimiento suave y natural. Ergonómicamente superior para proporcionar un entrenamiento de cuerpo completo sin estrés articular.',
    },
    {
      badge: 'Variety', badgePremium: false,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGNWpaL_kEZlq7Uz-CNF1IBrX3j1sXEyk_ZgRHALsHF_wWOhSZj2C-929XaPTOQ1uZL22T3NSA0ko2IrmEyNvwfq2vm1VJDgyGAjm1TQqelm3ZWwuhmU5hH9sTEaS6YK1cx8iAtuiNXhzbCR3zsqMQdbtNinLBjUfEH_T1M0dokUy6dut8oXQiXr95jPdZUT1H-kX4XSToSdLj5O_Tck7gtjbndXFnwmPrxu516Xqk9k7gDRNXkvdeLqmK6N7DD8n-hyql9bOrVyI',
      title: 'Bicicletas Verticales y Reclinadas',
      desc: 'Ingeniería biomecánica precisa. Asientos ajustables y controles intuitivos para un confort excepcional durante recorridos largos.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100dvh' }}>

      {/* ══════════════════════════════
          HERO  — diagonal clip
      ══════════════════════════════ */}
      <header
        className="section-hero hero-diagonal"
        style={{ position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden', backgroundColor: '#0a0a0a' }}
      >
        {/* BG Image */}
        <img
          alt="Cardio Catalog Background"
          className="catalog-fill-img"
          style={{
            position: 'absolute', inset: 0,
            filter: 'grayscale(100%)', opacity: 0.4,
          }}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCivvfW_ts9MofmQbqbKudqTpaIkQXDQV1ZuottFBEPGnTekWrEvAYdPAQqkcCumeLf3xS6avHkLN8tRYYcieJ7_6xLAtWQy8zzEZDXV7b30DFXNdn6XO82qTtCRf8xX2IoIa6_TjenPAUJNqeBZHKvCr_E9KrIym1FYpTWhHsX8GKvoUmBRW3wHYlKIMjCZnuRWq_poo3qICbeOOwsQ2fgUQgb5_Kl1_AUclPRHcx8O1DWbs__1DmgEMj6xT4M1p_-45mUb2mjoCw"
        />
        {/* Left→Right gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,#0a0a0a 0%,rgba(10,10,10,.75) 55%,transparent 100%)', zIndex: 1 }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '80rem', margin: '0 auto', padding: '0 3rem' }}>
          <div style={{ maxWidth: '54rem' }}>
            <div style={{ display: 'inline-block', backgroundColor: '#E31837', padding: '3px 12px', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#fff' }}>
                Equipamiento Elite
              </span>
            </div>
            <h1 style={{ fontFamily: 'Lexend,sans-serif', fontWeight: 800, fontSize: 'clamp(3rem,8vw,6rem)', color: '#fff', lineHeight: 1, marginBottom: '2rem' }}>
              CATÁLOGO DE <br />
              <span style={{ color: '#E31837' }}>CARDIO</span>
            </h1>
            <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: '1.125rem', color: 'rgba(255,255,255,.7)', maxWidth: '42rem', lineHeight: 1.7, marginBottom: '2.5rem', borderLeft: '4px solid #E31837', paddingLeft: '1.5rem' }}>
              Ingeniería premium diseñada para el máximo rendimiento. Nuestra línea de cardio redefine la
              experiencia del usuario con tecnología de vanguardia y durabilidad industrial.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-hero">Explorar Serie Integrity</button>
              <button className="btn btn-outline">Ver Platinum Club</button>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════
          PRODUCTS
      ══════════════════════════════ */}
      <section style={{ backgroundColor: '#111111', padding: '6rem 0' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 3rem' }}>

          {/* Section header */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem', gap: '1rem' }}>
            <div>
              <span style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#E31837', display: 'block', marginBottom: '0.4rem' }}>
                Selección Profesional
              </span>
              <h2 style={{ fontFamily: 'Lexend,sans-serif', fontWeight: 700, fontSize: '2.25rem', color: '#fff', textTransform: 'uppercase' }}>
                EQUIPOS DE ALTO RENDIMIENTO
              </h2>
            </div>
            <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>Filtrar por serie</span>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>expand_more</span>
            </div>
          </div>

          {/* 4-column product grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1.5rem' }}>
            {products.map(({ badge, badgePremium, img, title, desc }) => (
              <div
                key={title}
                className="product-card-zoom"
                {...cardHover}
                style={{ ...cardHover.style, display: 'flex', flexDirection: 'column', backgroundColor: '#1a1a1a' }}
              >
                {/* Image region */}
                <div style={{ aspectRatio: '4/5', position: 'relative', overflow: 'hidden', backgroundColor: '#141414' }}>
                  <img
                    alt={title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    src={img}
                  />
                  <span style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    backgroundColor: badgePremium ? '#E31837' : 'rgba(42,42,42,.85)',
                    backdropFilter: badgePremium ? 'none' : 'blur(6px)',
                    padding: '2px 10px',
                    fontFamily: 'Montserrat,sans-serif', fontSize: '10px', fontWeight: 900,
                    textTransform: 'uppercase', color: '#fff',
                  }}>
                    {badge}
                  </span>
                </div>
                {/* Text region */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontFamily: 'Lexend,sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#fff', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                    {title}
                  </h3>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: '0.8125rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.65, flex: 1 }}>
                    {desc}
                  </p>
                  <button className="catalog-btn-cotizar">Cotizar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          SPECS / BENTO
      ══════════════════════════════ */}
      <section style={{ backgroundColor: '#0a0a0a', padding: '6rem 0' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 3rem' }}>
          <div className="specs-bento">
            {/* Stats card */}
            <div className="glass-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ fontFamily: 'Lexend,sans-serif', fontWeight: 800, fontSize: '2.25rem', color: '#fff', marginBottom: '1.5rem' }}>
                INGENIERÍA SIN LÍMITES
              </h2>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Cada componente de nuestras máquinas de cardio ha sido probado bajo las condiciones más
                extremas. Desde el motor de tracción industrial hasta el software de conectividad global.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem' }}>
                {[['24/7', 'Ciclo de Uso'], ['15%', 'Inclinación Máx.'], ['4.0 HP', 'Motor AC'], ['21"', 'Consola HD']].map(([v, l]) => (
                  <div key={l}>
                    <span style={{ display: 'block', fontFamily: 'Lexend,sans-serif', fontWeight: 700, fontSize: '1.875rem', color: '#E31837', marginBottom: '0.25rem' }}>{v}</span>
                    <span style={{ display: 'block', fontFamily: 'Montserrat,sans-serif', fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Detail image */}
            <div style={{ minHeight: '400px', overflow: 'hidden' }}>
              <img
                alt="Technical Detail"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMT-gmxLHvE73BxP_x7hoa9kBiYkaOoyGsiDaRPrBLkOVg3zM22SQ_7YlT9gjcQbzeQcMeaqwOQHifYscsFx_YD_0aX1EFed0E8FO8id-Zf3Qf3ZilP1YxN3XxHJ-eX1TRk0d7Uu2EeV9GkqAET8VzwbhriJOiARIfto0zDc5VPE9KYSsWJ-mXr4FwRLrdtKbvLmxzrJfGMTtjZvLw6_a_8lORzRHmV9A0YNLOVQeQnnfpcM3wyiGRWuYOPWnXeimHibi3NjrFTkk"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer style={{ backgroundColor: '#111111', borderTop: '1px solid rgba(51,51,51,.15)', padding: '5rem 0' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '3rem', marginBottom: '4rem' }}>

            {/* Brand */}
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ width: '3rem', height: '4px', backgroundColor: '#E31837', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Lexend,sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#fff', letterSpacing: '-0.025em' }}>
                  LIFE FITNESS | VENEZUELA
                </span>
              </div>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,.5)', lineHeight: 1.7, maxWidth: '24rem' }}>
                Líderes mundiales en equipamiento de fitness comercial y residencial. Transformamos el
                movimiento humano a través de la innovación constante.
              </p>
            </div>

            {/* Explorar */}
            <div>
              <h4 style={{ fontFamily: 'Lexend,sans-serif', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '2rem' }}>
                Explorar
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['About Us', 'Products', 'Solutions', 'Support'].map(l => (
                  <li key={l} style={{ marginBottom: '0.875rem' }}>
                    <a href="#" className="footer-link">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Síguenos */}
            <div>
              <h4 style={{ fontFamily: 'Lexend,sans-serif', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '2rem' }}>
                Síguenos
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {['Instagram', 'Facebook', 'LinkedIn'].map(l => (
                  <a key={l} href="#" className="footer-link">{l}</a>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(51,51,51,.15)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.35)' }}>
              © 2024 Life Fitness Venezuela. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {['Privacy Policy', 'Terms of Service'].map(l => (
                <span key={l} style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.35)', cursor: 'pointer' }}>
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
