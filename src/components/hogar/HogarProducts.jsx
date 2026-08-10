import React from 'react';

const HogarProducts = () => {
  const products = [
    {
      name: "Integrity Series Treadmill",
      tag: "Top Seller",
      isPremium: true,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZM7NaLlQ1r4tGb9d_kIbCGUGEbmz-wxqYy8kSTfkMHRzg58Oppogf_mhB82fWLG3gg6xazb10z8S4RmvFi5KZ6qirqRzDASy13CjvIhwKRGrqKMKByo3nq4nzE1GDBKFeU-5g4JbLchQVBGSxnKGP--9DtA1jYBbsqMl2TaJ_Ee2rEJP83IBZTt6xR06xpVh64O9y0slee0hygcLD2Ox02t37a9P220VLiWRI2CmcHiGTShpKgPkdxohg7Rs_TosM5sdjES3rmpE",
      desc: "La caminadora preferida por los clubes de élite. Con tecnología FlexDeck® que reduce el impacto en las articulaciones hasta en un 30%."
    },
    {
      name: "Platinum Club Series",
      tag: "Premium",
      isPremium: true,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdqL2FhsQoaUfP-uJqZWaZk5OI6Az0-3K1InE0sHT3rq5smejCFI7uo-Klz9jMPLztp5bXQkwpEbVTkCzWwEoUM9SoPdyBC7runzZk1s5njtiqcd7vph_BXvMr5ATuxJkUlO5IfgqtUiyzZANhpjt_O_JzE-G7dIHTu6Op8AvKHHPdEaZhH7O_wQKjLUk-zRfsm7BDmiqcHGq7NDHLGv1NcJO75FyAuWvoPJt2aAW47ZtQq8dM0vPylPnWUPsptvsxwixvwYQitP0",
      desc: "Lleva la experiencia del gimnasio profesional a tu hogar. Conectividad absoluta y entretenimiento inmersivo de última generación."
    },
    {
      name: "Integrity Elliptical",
      tag: "Ergonómica",
      isPremium: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb793tzba29I4xKOvYqNRbR6jdfqF7qjm8b7DjUbncmx84s91Xf6zJBqzvBDnL9DepVETCwDJiBUcsgk9rlTh5T9H1WLMeyebSomWXbYHLEN_YljIXEvfkTgq4R-HIPwOKQx_mlSUaVk-OHBtnpyTdgQZkUxh7KLeudn_pOZ3d2fsjPz0xCRceN-J56VfMo4PUZsPrV8ogmYEDV7He1sqMbk93XcwrpC6Jfyb2An9FKe4Q4xKYcH6MOMJmJ7hJpnMoNU3Obl_waeo",
      desc: "Movimiento suave y natural. Ergonómicamente superior para proporcionar un entrenamiento de cuerpo completo sin estrés articular."
    },
    {
      name: "Life Fitness IC7 Indoor Cycle",
      tag: "Performance",
      isPremium: true,
      img: "https://images.unsplash.com/photo-1591741535018-d042766c62eb?q=80&w=2070&auto=format&fit=crop",
      desc: "La bicicleta de ciclo indoor más avanzada del mercado. Medición de potencia WattRate® de alta precisión para ciclistas serios."
    }
  ];

  return (
    <section id="productos" className="product-section light">
      <div className="container">
        <div className="cat-header" style={{textAlign: 'left', marginBottom: '2rem'}}>
          <h2 className="section-title">Tu Gimnasio <span>Privado</span></h2>
          <div style={{height: '4px', width: '60px', backgroundColor: 'var(--primary)', marginTop: '1rem'}}></div>
        </div>

        <div className="carousel-container">
          <div className="product-carousel">
            {products.map((p, i) => (
              <div key={i} className="carousel-item">
                <div className="product-card">
                  <div className="product-img-wrapper">
                    <img src={p.img} alt={p.name} />
                    <span className={`product-tag ${p.isPremium ? 'premium' : ''}`}>{p.tag}</span>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name" style={{ fontSize: '1.2rem' }}>{p.name}</h3>
                    <p className="product-description" style={{ fontSize: '0.85rem' }}>{p.desc}</p>
                    <div className="product-actions">
                      <a href="https://wa.me/584123361549" target="_blank" rel="noreferrer" className="btn-cotizar">Cotizar</a>
                      <button className="btn-info">Info</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-legend">
            Deslice para más
          </div>
        </div>
      </div>
    </section>
  );
};

export default HogarProducts;
