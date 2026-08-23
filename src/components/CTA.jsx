import React, { useState, useRef, useEffect } from 'react';

const CTA = () => {
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const formRef = useRef(null);

  // EFECTO 1: Scroll automático al abrir el formulario
  // EFECTO: Cerrar al navegar (Limpieza)
  useEffect(() => {
    return () => {
      setIsFormExpanded(false);
    };
  }, []);

  // EFECTO: Scroll al abrir
  useEffect(() => {
    if (isFormExpanded) {
      const timer = setTimeout(() => {
        // Buscamos directamente el ID que pusimos arriba
        const elemento = document.getElementById('titulo-contacto');

        if (elemento) {
          elemento.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isFormExpanded]);

  return (
    <section id="contacto" style={{ backgroundColor: '#f0f2f5', padding: '100px 20px' }}>
      <style>{`
        /* TARJETA NEGRA */
        .cta-card-black {
          background-color: #111;
          border-radius: 16px;
          padding: 70px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          color: white;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .cta-text-group {
          flex: 1;
          padding-right: 50px;
        }

        .cta-title-main {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1;
          margin: 0 0 20px 0;
          text-transform: uppercase;
          letter-spacing: -1px;
        }

        .cta-paragraph {
          font-size: 1.2rem;
          color: #aaa;
          margin: 0;
          max-width: 550px;
        }

        .cta-button-red {
          background-color: #a6192e;
          color: white;
          padding: 22px 45px;
          border: none;
          border-radius: 6px;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          white-space: nowrap;
          text-transform: uppercase;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(166, 25, 46, 0.4);
        }

        .cta-button-red:hover {
          background-color: #8b1426;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(166, 25, 46, 0.5);
        }

        /* FORMULARIO CLARO CON EFECTO 3D */
        .form-collapse-container {
          max-height: 0;
          overflow: hidden;
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          max-width: 1200px;
          margin: 0 auto;
        }

        .form-collapse-container.is-active {
          max-height: 1200px;
          opacity: 1;
          margin-top: 40px;
          padding-bottom: 20px;
        }

        .form-light-3d-box {
          background: linear-gradient(145deg, #ffffff, #f0f0f0);
          padding: 60px;
          border-radius: 20px;
          color: #1a1a1a;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.05);
          border: 1px solid rgba(255, 255, 255, 0.8);
          position: relative;
        }

        .form-title-center {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 900;
          margin-bottom: 40px;
          text-transform: uppercase;
          color: #000;
          letter-spacing: 1px;
        }

        .inputs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }

        .span-2 { grid-column: span 2; }

        .form-light-3d-box input, .form-light-3d-box select {
          width: 100%;
          padding: 18px;
          background: #ffffff;
          border: 2px solid #eee;
          color: #000;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }

        .form-light-3d-box input:focus, .form-light-3d-box select:focus {
          outline: none;
          border-color: #a6192e;
          box-shadow: 0 0 0 4px rgba(166, 25, 46, 0.1);
          transform: translateY(-2px);
        }

        .submit-final-btn {
          width: 100%;
          background: #a6192e;
          color: #fff;
          padding: 22px;
          border: none;
          border-radius: 8px;
          font-weight: 900;
          font-size: 1.1rem;
          cursor: pointer;
          margin-top: 20px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(166, 25, 46, 0.2);
        }

        .submit-final-btn:hover {
          background: #8b1426;
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(166, 25, 46, 0.4);
        }

        @media (max-width: 1024px) {
          .cta-card-black { flex-direction: column; text-align: center; padding: 50px 30px; }
          .cta-text-group { padding-right: 0; margin-bottom: 30px; }
          .cta-title-main { font-size: 2.8rem; }
          .inputs-grid { grid-template-columns: 1fr; }
          .span-2 { grid-column: span 1; }
          .form-light-3d-box { padding: 40px 25px; }
        }
      `}</style>

      <div className="cta-card-black">
        <div className="cta-text-group">
          <h2 className="cta-title-main">¿Listo para elevar tu gimnasio?</h2>
          <p className="cta-paragraph">
            Nuestros consultores expertos están listos para diseñar una solución a medida para su centro deportivo o espacio personal.
          </p>
        </div>
        <button className="cta-button-red" onClick={() => setIsFormExpanded(!isFormExpanded)}>
          {isFormExpanded ? 'CERRAR FORMULARIO' : 'Hablar con un Experto'}
        </button>
      </div>

      <div className={`form-collapse-container ${isFormExpanded ? 'is-active' : ''}`} ref={formRef}>
        <div className="form-light-3d-box">
          {/* Dentro del JSX de CTA */}

          <h3
            id="titulo-contacto" // ID específico para CTA
            ref={formRef}        // La referencia para el useEffect
            className="form-title-center"
            style={{
              scrollMarginTop: '120px' // Compensación para el menú
            }}
          >
            Solicitar Asesoría Experta
          </h3>
          <form className="inputs-grid" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const nombre = formData.get('nombre') || '';
            const apellido = formData.get('apellido') || '';
            const empresa = formData.get('empresa') || '';
            const celular = formData.get('celular') || '';
            const email = formData.get('email') || '';
            const interes = formData.get('interes') || '';
            const tipo = formData.get('tipo') || '';
            const msg = `Hola, me interesa solicitar asesoría experta.\n*Nombre:* ${nombre} ${apellido}\n*Empresa/Gimnasio:* ${empresa}\n*Celular:* ${celular}\n*Correo:* ${email}\n*Interés:* ${interes}\n*Tipo:* ${tipo}`;
            window.open(`https://wa.me/582129856316?text=${encodeURIComponent(msg)}`, '_blank');
          }}>
            <input type="text" name="nombre" placeholder="Nombre" required />
            <input type="text" name="apellido" placeholder="Apellido" required />

            <div className="span-2">
              <input type="text" name="empresa" placeholder="Empresa o Nombre del Gimnasio" required />
            </div>

            <input type="tel" name="celular" placeholder="Número de Celular" required />
            <input type="email" name="email" placeholder="Correo Electrónico" required />

            <select name="interes" required>
              <option value="">¿Cuál es tu interés principal?</option>
              <option value="Equipamiento para el Hogar">Equipamiento para el Hogar</option>
              <option value="Equipamiento Comercial / Gimnasio">Equipamiento Comercial / Gimnasio</option>
            </select>

            <select name="tipo" required>
              <option value="">Tipo de Equipamiento</option>
              <option value="Máquinas de Fuerza">Máquinas de Fuerza</option>
              <option value="Equipos de Cardio">Equipos de Cardio</option>
              <option value="Solución Integral (Ambas)">Solución Integral (Ambas)</option>
            </select>

            <div className="span-2">
              <button type="submit" className="submit-final-btn">Enviar mi Solicitud</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTA;