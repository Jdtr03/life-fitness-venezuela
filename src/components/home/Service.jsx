import React, { useState, useRef, useEffect } from 'react';
import servicioTecnicoImg from '../../assets/Servicio_Tecnico.jpeg';

const Service = () => {
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const formRef = useRef(null);
  const buttonRef = useRef(null);

  const points = [
    "Mantenimiento preventivo integral",
    "Repuestos originales importados",
    "Diagnóstico y soporte especializado",
    "Asesoría técnica en todos nuestros equipos"
  ];

  // EFECTO 1: Scroll automático al abrir el formulario
  useEffect(() => {
    if (isFormExpanded && formRef.current) {
      const timer = setTimeout(() => {
        // Obtenemos el ID directamente del elemento que tiene el ref
        const idDestino = formRef.current.id;
        const elemento = document.getElementById(idDestino);

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

  // No olvides el efecto de limpieza que hablamos al inicio (para cerrar al navegar)
  useEffect(() => {
    return () => setIsFormExpanded(false);
  }, []);
  // --- NUEVO EFECTO: Resetear al cambiar de sección/página ---
  useEffect(() => {
    // Al desmontar el componente (navegar a otra parte), el formulario se cierra
    return () => {
      setIsFormExpanded(false);
    };
  }, []);

  const toggleForm = () => setIsFormExpanded(!isFormExpanded);

  return (
    <section id="servicio-tecnico" className="service" style={{ padding: '60px 0' }}>
      <style>{`
        .service-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
          align-items: center;
          padding: 0 2rem;
        }

        .service-img {
          width: 100%;
          height: auto;
          max-width: 500px;
          border-radius: 8px;
        }

        .form-expansion-area {
          grid-column: 1 / -1;
          width: 100%;
          display: flex;
          justify-content: center;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          height: 0;
          opacity: 0;
        }

        .form-expansion-area.expanded {
          height: auto;
          opacity: 1;
          margin-top: 3rem;
          padding-bottom: 5rem;
        }

        .service-form-card {
          width: 100%;
          max-width: 700px;
          background: #0f0f0f;
          padding: 3rem;
          border-radius: 12px;
          border: 1px solid #222;
          box-sizing: border-box;
        }

        .actual-service-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }

        .actual-service-form input, 
        .actual-service-form select, 
        .actual-service-form textarea {
          padding: 1.1rem;
          background: #000;
          border: 1px solid #333;
          color: white;
          border-radius: 4px;
          width: 100%;
          box-sizing: border-box;
          font-size: 1rem;
        }

        .btn-confirm {
          background: #a6192e;
          color: white;
          padding: 1.2rem;
          border: none;
          border-radius: 4px;
          font-weight: 800;
          cursor: pointer;
          text-transform: uppercase;
          transition: background 0.3s;
        }

        .btn-confirm:hover {
          background: #8b1426;
        }

        @media (max-width: 992px) {
          .service-grid { grid-template-columns: 1fr; gap: 2rem; }
          .service-visual { order: -1; display: flex; justify-content: center; }
          .service-content { text-align: center; }
          .service-list { display: inline-block; text-align: left; }
        }

        @media (max-width: 768px) {
          .service-form-card { padding: 2rem 1.5rem; }
          .form-row { grid-template-columns: 1fr; gap: 1.2rem; }
          .section-title { font-size: 1.8rem; }
        }

        @media (max-width: 480px) {
          .form-expansion-area.expanded { padding-bottom: 2rem; }
          .btn-confirm { font-size: 0.9rem; padding: 1rem; }
        }
      `}</style>

      <div className="container service-grid">
        <div className="service-content">
          <h2 className="section-title text-white">
            SERVICIO <span style={{ color: '#a6192e' }}>TÉCNICO OFICIAL</span>
          </h2>
          <p className="service-desc text-white" style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
            Garantizamos la vida útil y el máximo rendimiento de sus equipos con soporte certificado.
          </p>
          <ul className="service-list" style={{ listStyle: 'none', padding: 0 }}>
            {points.map((p, i) => (
              <li key={i} className="text-white" style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <svg fill="#a6192e" viewBox="0 0 20 20" style={{ width: '20px', minWidth: '20px', marginRight: '10px' }}>
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
          <button ref={buttonRef} className="btn btn-primary" onClick={toggleForm} style={{ marginTop: '2rem' }}>
            {isFormExpanded ? 'CANCELAR' : 'AGENDAR SERVICIO TÉCNICO'}
          </button>
        </div>

        <div className="service-visual">
          <img src={servicioTecnicoImg} alt="Service" className="service-img" />
        </div>

        <div
          className={`form-expansion-area ${isFormExpanded ? 'expanded' : ''}`}
          style={{ height: isFormExpanded ? 'auto' : '0' }}
        >
          <div className="service-form-card">
            <h3
              id="titulo-servicio"
              ref={formRef}
              style={{
                color: 'white',
                textAlign: 'center',
                marginBottom: '2.5rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '1.4rem',
                scrollMarginTop: '120px' // Esto soluciona el solapamiento con el menú
              }}
            >
              Datos de la solicitud
            </h3>
            <form className="actual-service-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <input type="text" placeholder="Nombre" required />
                <input type="text" placeholder="Apellido" required />
              </div>
              <input type="text" placeholder="Empresa o Gimnasio (Opcional)" />
              <div className="form-row">
                <input type="tel" placeholder="Celular" required />
                <input type="email" placeholder="Correo electrónico" required />
              </div>
              <select required translate="no" style={{ borderLeft: '4px solid #a6192e' }}>
                <option value="" disabled selected>Seleccione Marca</option>
                <option value="LifeFitness">LifeFitness</option>
                <option value="Hammer Strength">Hammer Strength</option>
              </select>
              <input type="text" placeholder="Nombre de la máquina" required />
              <textarea placeholder="Descripción de la falla" rows="3" required></textarea>
              <input type="text" placeholder="Dirección del servicio" required />
              <button type="submit" className="btn-confirm">Confirmar Agendamiento</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;