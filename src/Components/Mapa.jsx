import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Search, Filter } from 'react-feather';
import MapPreview from './MapPreview';

const Mapa = () => {
  const [places, setPlaces] = useState([
    { name: 'Alcázar de Colón', lat: 18.4765, lng: -69.8835, category: 'histórico', description: 'Residencia del virrey Diego Colón' },
    { name: 'Catedral Primada', lat: 18.4729, lng: -69.8833, category: 'religioso', description: 'Primera catedral de América' },
    { name: 'Calle Las Damas', lat: 18.4748, lng: -69.8838, category: 'histórico', description: 'Primera calle pavimentada de América' },
    { name: 'Fortaleza Ozama', lat: 18.4751, lng: -69.8821, category: 'histórico', description: 'Primera fortaleza europea en América' },
    { name: 'Panteón Nacional', lat: 18.4742, lng: -69.8829, category: 'histórico', description: 'Mausoleo de héroes dominicanos' },
    { name: 'Casa de Bastidas', lat: 18.4756, lng: -69.8834, category: 'museo', description: 'Museo de la Familia Dominicana' }
  ]);
  
  const [filteredPlaces, setFilteredPlaces] = useState(places);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    filterPlaces();
  }, [places, selectedCategory, searchTerm]);

  const filterPlaces = () => {
    let filtered = places;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(place => place.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(place => 
        place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPlaces(filtered);
  };

  const categories = [
    { id: 'all', label: 'Todos los lugares' },
    { id: 'histórico', label: 'Sitios Históricos' },
    { id: 'religioso', label: 'Sitios Religiosos' },
    { id: 'museo', label: 'Museos' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Mapa Interactivo</h1>
          <p className="text-gray-600 mt-2">Explora los lugares más importantes de la Zona Colonial</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar lugares..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de lugares */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Lugares de Interés ({filteredPlaces.length})
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredPlaces.map((place, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-orange-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{place.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{place.description}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        place.category === 'histórico' ? 'bg-blue-100 text-blue-800' :
                        place.category === 'religioso' ? 'bg-purple-100 text-purple-800' :
                        place.category === 'museo' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {place.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Navigation className="text-orange-600" size={20} />
                  Zona Colonial - Santo Domingo
                </h2>
              </div>
              <div className="h-96">
                <MapPreview places={filteredPlaces} height={384} />
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">¿Sabías que...?</h2>
              <p className="text-orange-100 mb-4">
                La Zona Colonial de Santo Domingo fue declarada Patrimonio de la Humanidad por la UNESCO en 1990. 
                Es el asentamiento europeo más antiguo de América, fundado en 1498.
              </p>
              <a 
                href="/tours" 
                className="inline-block bg-white text-orange-600 px-6 py-3 rounded-xl font-medium hover:bg-orange-50 transition-colors"
              >
                Explorar Tours Guiados
              </a>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{places.length}</div>
              <div className="text-orange-100">Lugares de Interés</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapa;