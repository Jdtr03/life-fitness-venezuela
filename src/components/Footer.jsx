export default function Footer() {
  return (
    <footer className="footer">
        <div className="container mx-auto px-4">
            <div className="footer-grid">
                <div>
                    <div className="footer-logo">
                        Life<span className="logo-accent text-[#E31837]">Fitness</span>
                    </div>
                    <p className="footer-desc">
                        Líder mundial en la fabricación de equipos de fitness comerciales y para el hogar. Innovando
                        para cada cuerpo en movimiento.
                    </p>
                </div>
                <div>
                    <h4 className="footer-col-title">Equipos</h4>
                    <ul className="footer-links">
                        <li><a className="footer-link" href="#">Hammer Strength</a></li>
                        <li><a className="footer-link" href="#">Cybex</a></li>
                        <li><a className="footer-link" href="#">ICG</a></li>
                        <li><a className="footer-link" href="#">Equipamiento Cardio</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="footer-col-title">Soporte</h4>
                    <ul className="footer-links">
                        <li><a className="footer-link" href="#">Servicio Técnico</a></li>
                        <li><a className="footer-link" href="#">Manuales de Usuario</a></li>
                        <li><a className="footer-link" href="#">Garantía</a></li>
                        <li><a className="footer-link" href="#">Repuestos</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="footer-col-title">Venezuela</h4>
                    <div className="footer-links">
                        <div className="footer-contact-item">
                            <svg className="h-5 w-5 brand-red flex-shrink-0 text-[#E31837]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>Calle Orinoco, Las Mercedes.<br />Caracas, Distrito Capital 1060.</span>
                        </div>
                        <div className="footer-contact-item">
                            <svg className="h-5 w-5 brand-red flex-shrink-0 text-[#E31837]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span>+58 (212) 000-0000</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div>
                    © 2023 Life Fitness Venezuela. Todos los derechos reservados.
                </div>
                <div className="flex space-x-6">
                    <a className="footer-link" href="#">Política de Privacidad</a>
                    <a className="footer-link" href="#">Términos de Uso</a>
                    <a className="footer-link" href="#">Accesibilidad</a>
                </div>
            </div>
        </div>
    </footer>
  );
}
