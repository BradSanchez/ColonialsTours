import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Map, Menu, User, LogOut, Settings, TrendingUp } from 'react-feather';

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="/" className="flex items-center py-4 px-2">
                <Map className="text-amber-600 mr-2" size={24} />
                <span className="font-semibold text-gray-500 text-lg">Colonials Tours</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <a href="/" className="py-4 px-2 text-gray-500 font-medium hover:text-amber-600 transition duration-300">
                Inicio
              </a>
              <a href="/tours" className="py-4 px-2 text-gray-500 font-medium hover:text-amber-600 transition duration-300">
                Tours
              </a>
              <a href="/mapa" className="py-4 px-2 text-gray-500 font-medium hover:text-amber-600 transition duration-300">
                Mapa
              </a>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'admin' && (
                  <a 
                    href="/admin" 
                    className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm"
                  >
                    <TrendingUp size={14} />
                    Dashboard
                  </a>
                )}
                <a 
                  href="/profile" 
                  className="px-3 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm"
                >
                  <User size={14} />
                  Perfil
                </a>
                <button
                  onClick={logout}
                  className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                >
                  <LogOut size={14} />
                  Salir
                </button>
              </div>
            ) : (
              <>
                <a href="/login" className="py-2 px-4 font-medium text-gray-500 rounded hover:bg-amber-500 hover:text-white transition duration-300">
                  Iniciar Sesión
                </a>
                <a href="/register" className="py-2 px-4 font-medium text-white bg-amber-600 rounded hover:bg-amber-500 transition duration-300">
                  Registrarse
                </a>
              </>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              className="outline-none mobile-menu-button" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} mobile-menu md:hidden`}>
        <ul className="bg-white border-t">
          <li><a href="/" className="block text-sm px-4 py-3 hover:bg-amber-50 transition duration-300">Inicio</a></li>
          <li><a href="/tours" className="block text-sm px-4 py-3 hover:bg-amber-50 transition duration-300">Tours</a></li>
          <li><a href="/mapa" className="block text-sm px-4 py-3 hover:bg-amber-50 transition duration-300">Mapa</a></li>
          {user ? (
            <>
              {user.role === 'admin' && (
                <li><a href="/admin" className="block text-sm px-4 py-3 hover:bg-amber-50 transition duration-300">Dashboard</a></li>
              )}
              <li><a href="/profile" className="block text-sm px-4 py-3 hover:bg-amber-50 transition duration-300">Perfil</a></li>
              <li><button onClick={logout} className="block w-full text-left text-sm px-4 py-3 hover:bg-red-50 text-red-600 transition duration-300">Cerrar Sesión</button></li>
            </>
          ) : (
            <>
              <li><a href="/login" className="block text-sm px-4 py-3 hover:bg-amber-50 transition duration-300">Iniciar Sesión</a></li>
              <li><a href="/register" className="block text-sm px-4 py-3 hover:bg-amber-50 transition duration-300">Registrarse</a></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;