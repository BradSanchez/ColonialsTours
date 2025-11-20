import { useState, useEffect } from 'react';
import Footer from './Footer';
import MapPreview from './MapPreview';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'leaflet/dist/leaflet.css';
import { Map, Menu, Compass, ArrowRight, Star, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'react-feather';
import apiService from '../services/api';

import '../../src/App'

// Fix Leaflet marker icons (default icon issue in react-leaflet)
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerIconRetina,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tours, setTours] = useState([]);
  const [stats, setStats] = useState({ totalTours: 0, totalUsers: 0 });

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
    loadTours();
    loadStats();
  }, []);

  const loadTours = async () => {
    try {
      const response = await apiService.request('/tours');
      setTours(response.tours?.slice(0, 3) || []);
    } catch (error) {
      console.error('Error loading tours');
    }
  };

  const loadStats = async () => {
    try {
      const response = await apiService.request('/admin/stats');
      setStats(response.stats || { totalTours: 0, totalUsers: 0 });
    } catch (error) {
      console.error('Error loading stats');
    }
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Map data
  const places = [
    { name: 'Alcázar de Colón', lat: 18.4765, lng: -69.8835 },
    { name: 'Catedral Primada', lat: 18.4729, lng: -69.8833 },
    { name: 'Calle Las Damas', lat: 18.4748, lng: -69.8838 },
  ];

  return (
    <div className="font-sans bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <a href="#" className="flex items-center py-4 px-2">
                  <Map className="text-amber-600 mr-2" size={24} />
                  <span className="font-semibold text-gray-500 text-lg">Zona Colonial</span>
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <a href="/" className="py-4 px-2 text-amber-600 border-b-4 border-amber-600 font-medium">
                  Inicio
                </a>
                <a href="/tours" className="py-4 px-2 text-gray-500 font-medium hover:text-amber-600 transition duration-300">
                  Tours
                </a>
                <a href="/mapa" className="py-4 px-2 text-gray-500 font-medium hover:text-amber-600 transition duration-300">
                  Mapa
                </a>
                <a href="#" className="py-4 px-2 text-gray-500 font-medium hover:text-amber-600 transition duration-300">
                  Lugares
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <a href="/login" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-amber-500 hover:text-white transition duration-300">
                Iniciar Sesión
              </a>
              <a href="/register" className="py-2 px-2 font-medium text-white bg-amber-600 rounded hover:bg-amber-500 transition duration-300">
                Registrarse
              </a>
            </div>
            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button" onClick={toggleMobileMenu}>
                <Menu className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} mobile-menu`}>
          <ul>
            <li className="active">
              <a href="#" className="block text-sm px-2 py-4 text-white bg-amber-600 font-semibold">
                Inicio
              </a>
            </li>
            <li>
              <a href="/tours" className="block text-sm px-2 py-4 hover:bg-amber-500 transition duration-300">
                Tours
              </a>
            </li>
            <li>
              <a href="/mapa" className="block text-sm px-2 py-4 hover:bg-amber-500 transition duration-300">
                Mapa
              </a>
            </li>
            <li>
              <a href="#" className="block text-sm px-2 py-4 hover:bg-amber-500 transition duration-300">
                Lugares
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-image py-20 px-4">
        <div className="max-w-6xl mx-auto text-center text-white" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Descubre la Zona Colonial</h1>
          <p className="text-xl md:text-2xl mb-8">El corazón histórico de Santo Domingo, primera ciudad del Nuevo Mundo</p>
          <a href="/tours" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center">
            <Compass className="mr-2" size={20} /> Explorar Tours
          </a>
        </div>
      </div>

      {/* Highlights Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Lo más destacado</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden" data-aos="fade-up">
            <img
              src="https://cdn.abacus.ai/images/ef0d2c8f-7280-418c-ab46-34604952f390.png"
              alt="Alcázar de Colón en Zona Colonial, Santo Domingo"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Alcázar de Colón</h3>
              <p className="text-gray-600 mb-4">Residencia del virrey Diego Colón, hijo de Cristóbal Colón, construida entre 1510-1514.</p>
              <a href="#" className="text-amber-600 font-medium inline-flex items-center">
                Ver más <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="100">
            <img
              src="https://cdn.abacus.ai/images/b0d3ed17-1d20-4396-865a-39b3bd7ef7c3.png"
              alt="Catedral Primada de América en Zona Colonial, Santo Domingo"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Catedral Primada</h3>
              <p className="text-gray-600 mb-4">Primera catedral de América, construida entre 1514-1540 con estilo gótico y renacentista.</p>
              <a href="#" className="text-amber-600 font-medium inline-flex items-center">
                Ver más <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="200">
            <img
              src="https://cdn.abacus.ai/images/968eb585-5414-40b7-8268-0f477ae7de61.png"
              alt="Calle Las Damas en Zona Colonial, Santo Domingo"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Calle Las Damas</h3>
              <p className="text-gray-600 mb-4">Primera calle pavimentada de América, con impresionantes edificios coloniales.</p>
              <a href="#" className="text-amber-600 font-medium inline-flex items-center">
                Ver más <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Preview */}
    <section className="bg-gray-100 py-12">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 items-start">
      <div data-aos="fade-right">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Explora en nuestro mapa interactivo
        </h2>
        <p className="text-gray-600 mb-6">
          Descubre todos los puntos de interés de la Zona Colonial con nuestro mapa detallado. Filtra por categorías como museos, restaurantes, iglesias y más.
        </p>
        <a
          href="/mapa"
          className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
        >
          <Map className="mr-2" size={20} />
          Ver Mapa Completo
        </a>
      </div>

      <div className="w-full" data-aos="fade-left">
        <div className="w-full rounded-lg shadow-lg overflow-hidden">
          <MapPreview places={places} height={420} />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Tours Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Tours disponibles ({stats.totalTours})</h2>
          <a href="/tours" className="text-amber-600 font-medium inline-flex items-center">
            Ver todos <ArrowRight className="ml-1 w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.length > 0 ? tours.map((tour, index) => (
            <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay={index * 100}>
              {tour.image_url && (
                <img
                  src={tour.image_url}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{tour.title}</h3>
                  <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded">{tour.duration}</span>
                </div>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">${tour.price}</span>
                  <a href="/login" className="text-white bg-amber-600 hover:bg-amber-700 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
                    Reservar
                  </a>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No hay tours disponibles en este momento</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-amber-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Lo que dicen nuestros visitantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up">
              <div className="flex items-center mb-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt="María G."
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">María G.</h4>
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "El tour histórico fue increíble. Nuestro guía conocía cada detalle de los edificios y la historia colonial. ¡Altamente recomendado!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center mb-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt="Carlos R."
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Carlos R.</h4>
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "La comida en el tour gastronómico fue excepcional. Probé platos que nunca hubiera encontrado por mi cuenta. ¡Volveré!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center mb-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt="Laura M."
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Laura M.</h4>
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "El mapa interactivo fue muy útil para planificar nuestro día. Pudimos ver todos los lugares importantes sin perdernos."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Recibe nuestras ofertas especiales</h2>
          <p className="text-gray-300 mb-6">
            Suscríbete a nuestro boletín para recibir descuentos en tours y las últimas novedades sobre la Zona Colonial.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-grow px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2 rounded-full transition duration-300">
              Suscribirse
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
    <Footer/>
    </div>
  );
}
export default Landing