import React, { useState } from 'react';
import { Search, Star, Wind, Waves, Navigation, Clock, TrendingUp, Droplets, Eye, Sun, MapPin } from 'lucide-react';

const SpotcastApp = () => {
  const [beach, setBeach] = useState('');
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('surf');
  const [showCameras, setShowCameras] = useState(false);
  const [showBeachList, setShowBeachList] = useState(true);

  const getDirectionName = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  const getCurrentTideHeight = (tideData) => {
    const currentHour = new Date().getHours();
    return tideData[currentHour]?.height || tideData[0]?.height || 1.5;
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getRatingBg = (rating) => {
    if (rating >= 4) return 'bg-green-500';
    if (rating >= 3) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const surfcams = {
    'La Isla': null,
    'Punta Rocas': null,
    'Barranquito': null,
    'Makaha': null,
    'La Herradura': 'https://www.skylinewebcams.com/es/webcam/peru/lima/lima/chorrillos-playa-la-herradura.html',
    'Señoritas': null,
    'Caballeros': null,
    'Cabo Blanco': null,
    'Chicama': null,
    'Pacasmayo': null,
    'Pimentel': null,
    'Huanchaco': null,
    'Máncora': null
  };

  const beachInfo = {
    'La Isla': {
      level: 'Intermedio - Avanzado',
      bestTide: 'Marea Media a Baja',
      bottom: 'Fondo de piedra y roca',
      recommendations: 'Esta playa es perfecta para correrla con marea baja pero solo si eres avanzado o intermedio ya que hay bastantes piedras. Las olas son consistentes y tubulares. Se recomienda usar botines de neopreno para protección.',
      bestSwell: 'Sur - Suroeste',
      crowd: 'Moderado a Alto',
      parking: 'Disponible cerca',
      facilities: 'Restaurantes y baños cercanos'
    },
    'Punta Rocas': {
      level: 'Avanzado',
      bestTide: 'Marea Media',
      bottom: 'Fondo rocoso con arrecife',
      recommendations: 'Una de las mejores olas de Lima, ideal para surfistas avanzados. La ola rompe sobre un fondo rocoso con arrecife, por lo que se requiere experiencia. Mejor en marea media con swell del sur. Puede ser muy peligrosa en marea baja.',
      bestSwell: 'Sur',
      crowd: 'Alto',
      parking: 'Estacionamiento disponible',
      facilities: 'Zona con servicios completos'
    },
    'Barranquito': {
      level: 'Principiante - Intermedio',
      bestTide: 'Marea Media a Alta',
      bottom: 'Fondo de arena',
      recommendations: 'Playa ideal para principiantes y surfistas intermedios que buscan olas suaves y consistentes. Fondo de arena completamente seguro. Las olas son más pequeñas que en otros spots del sur, perfectas para aprender y mejorar técnica. Buen ambiente familiar.',
      bestSwell: 'Sur - Suroeste',
      crowd: 'Moderado',
      parking: 'Estacionamiento disponible cercano',
      facilities: 'Baños y algunos restaurantes en la zona'
    },
    'Makaha': {
      level: 'Intermedio - Avanzado',
      bestTide: 'Marea Baja a Media',
      bottom: 'Arena y piedras',
      recommendations: 'Ola potente ideal para maniobras. Funciona mejor con marea baja a media. Hay secciones con piedras que requieren cuidado. Ola rápida perfecta para surfistas intermedios que buscan progresar.',
      bestSwell: 'Sur',
      crowd: 'Moderado',
      parking: 'Estacionamiento cerca',
      facilities: 'Servicios básicos disponibles'
    },
    'La Herradura': {
      level: 'Intermedio - Avanzado',
      bestTide: 'Marea Media a Alta',
      bottom: 'Fondo mixto',
      recommendations: 'Ola larga y consistente, perfecta para longboard y tablas grandes. Mejor con marea media a alta. Spot muy popular con buen ambiente. Puede haber corrientes fuertes, se recomienda precaución.',
      bestSwell: 'Sur - Suroeste',
      crowd: 'Alto',
      parking: 'Amplio estacionamiento',
      facilities: 'Zona turística con todos los servicios'
    },
    'Chicama': {
      level: 'Intermedio - Avanzado',
      bestTide: 'Marea Media',
      bottom: 'Fondo de piedra',
      recommendations: 'La ola izquierda más larga del mundo con hasta 2km de recorrido. Requiere buen nivel de surf y resistencia física. Mejor con mareas medias y swell grande del suroeste. Experiencia única para surfistas experimentados.',
      bestSwell: 'Sur - Suroeste',
      crowd: 'Bajo a Moderado',
      parking: 'Disponible',
      facilities: 'Hospedajes y restaurantes en la zona'
    },
    'Huanchaco': {
      level: 'Principiante - Intermedio',
      bestTide: 'Marea Media a Alta',
      bottom: 'Arena',
      recommendations: 'Famosa por sus caballitos de totora tradicionales. Olas suaves ideales para principiantes. Fondo de arena seguro. Ambiente relajado y cultural. Perfecta para familias y quienes están aprendiendo.',
      bestSwell: 'Suroeste',
      crowd: 'Moderado',
      parking: 'Estacionamiento disponible',
      facilities: 'Pueblo con servicios completos'
    },
    'Máncora': {
      level: 'Todos los niveles',
      bestTide: 'Todas las mareas',
      bottom: 'Arena',
      recommendations: 'Spot versátil con diferentes picos para todos los niveles. Agua cálida todo el año. Olas constantes y fondo de arena. Ideal para aprender o perfeccionar técnica. Ambiente playero y turístico excelente.',
      bestSwell: 'Sur - Suroeste',
      crowd: 'Alto (temporada)',
      parking: 'Varios puntos de acceso',
      facilities: 'Resort completo con todos los servicios'
    },
    'Señoritas': {
      level: 'Principiante - Intermedio',
      bestTide: 'Marea Media a Alta',
      bottom: 'Arena',
      recommendations: 'Playa perfecta para principiantes con olas suaves y consistentes. Ubicada cerca de Máncora, ofrece un ambiente más tranquilo. Fondo de arena seguro y agua cálida. Ideal para escuelas de surf y quienes están aprendiendo.',
      bestSwell: 'Sur - Suroeste',
      crowd: 'Moderado',
      parking: 'Estacionamiento disponible',
      facilities: 'Escuelas de surf y restaurantes'
    },
    'Caballeros': {
      level: 'Intermedio - Avanzado',
      bestTide: 'Marea Media',
      bottom: 'Fondo mixto',
      recommendations: 'Ola más poderosa que Señoritas, ideal para surfistas con experiencia. Ofrece secciones rápidas y tubulares. Requiere buen nivel de surf. Menos concurrida que otras playas de la zona.',
      bestSwell: 'Sur - Suroeste',
      crowd: 'Bajo a Moderado',
      parking: 'Acceso limitado',
      facilities: 'Servicios básicos'
    },
    'Cabo Blanco': {
      level: 'Intermedio - Avanzado',
      bestTide: 'Marea Baja a Media',
      bottom: 'Roca y arrecife',
      recommendations: 'Legendario spot de big wave, famoso mundialmente. Olas potentes y consistentes sobre fondo rocoso. Requiere experiencia y conocimiento del spot. Mejor con swells grandes del suroeste. Cuna del surf peruano.',
      bestSwell: 'Suroeste',
      crowd: 'Bajo a Moderado',
      parking: 'Disponible',
      facilities: 'Pueblo pesquero con servicios básicos'
    },
    'Pacasmayo': {
      level: 'Intermedio - Avanzado',
      bestTide: 'Marea Media a Baja',
      bottom: 'Arena y piedra',
      recommendations: 'Una de las olas izquierdas más largas del mundo, puede llegar hasta 2km. Requiere buen nivel de surf y resistencia física. Ola consistente y predecible. Funciona mejor con swell grande del suroeste.',
      bestSwell: 'Suroeste',
      crowd: 'Bajo',
      parking: 'Disponible en el puerto',
      facilities: 'Ciudad con todos los servicios'
    },
    'Pimentel': {
      level: 'Principiante - Intermedio',
      bestTide: 'Marea Media a Alta',
      bottom: 'Arena',
      recommendations: 'Playa familiar perfecta para principiantes e intermedios. Ubicada en Lambayeque, ofrece olas suaves y consistentes. Fondo de arena seguro. Menos conocida que otros spots del norte pero con buenas condiciones. Ideal para aprender y pasar el día con la familia.',
      bestSwell: 'Suroeste',
      crowd: 'Bajo a Moderado',
      parking: 'Amplio estacionamiento disponible',
      facilities: 'Malecón con restaurantes y servicios'
    },
    'Pasamayo': {
      level: 'Avanzado',
      bestTide: 'Marea Baja a Media',
      bottom: 'Fondo de piedra y roca',
      recommendations: 'Spot legendario de olas grandes al norte de Lima. Solo para surfistas muy experimentados. Olas potentes y huecas que rompen sobre fondo rocoso. Acceso complicado por acantilados. Requiere excelente condición física y conocimiento del spot. Puede ser muy peligroso.',
      bestSwell: 'Suroeste',
      crowd: 'Bajo',
      parking: 'Limitado, requiere caminata',
      facilities: 'Sin servicios en la playa'
    },
    'Conchitas': {
      level: 'Intermedio',
      bestTide: 'Marea Media',
      bottom: 'Arena y piedras',
      recommendations: 'Playa tranquila cerca de Punta Rocas. Olas consistentes ideales para surfistas intermedios. Menos concurrida que sus vecinas. Fondo mixto con algunas piedras. Buen spot para progresar sin tanta presión de crowd. Ambiente relajado.',
      bestSwell: 'Sur - Suroeste',
      crowd: 'Bajo a Moderado',
      parking: 'Disponible cerca',
      facilities: 'Servicios básicos'
    },
    'Pico Alto': {
      level: 'Experto',
      bestTide: 'Marea Media a Alta',
      bottom: 'Arrecife de roca',
      recommendations: '¡EXTREMADAMENTE PELIGROSO! Una de las olas más grandes y peligrosas de Sudamérica. Solo para surfistas profesionales y expertos en big waves. Rompe sobre un arrecife rocoso en mar abierto. Requiere jet ski de apoyo y equipo de seguridad. Olas pueden superar los 10 metros. No apto para surfistas sin experiencia en big waves.',
      bestSwell: 'Sur - Suroeste',
      crowd: 'Muy Bajo (solo expertos)',
      parking: 'Limitado',
      facilities: 'Mínimos, zona remota'
    }
  };

  const beaches = [
    { name: 'La Isla', lat: -12.3353, lng: -76.8783, rating: 4.5 },
    { name: 'Punta Rocas', lat: -12.3458, lng: -76.8858, rating: 4.8 },
    { name: 'Barranquito', lat: -12.1500, lng: -77.0200, rating: 3.8 },
    { name: 'Makaha', lat: -12.3225, lng: -76.8736, rating: 4.2 },
    { name: 'La Herradura', lat: -12.3569, lng: -76.8892, rating: 4.6 },
    { name: 'Señoritas', lat: -4.0833, lng: -81.0500, rating: 4.4 },
    { name: 'Caballeros', lat: -4.0817, lng: -81.0483, rating: 4.3 },
    { name: 'Cabo Blanco', lat: -4.2333, lng: -81.1333, rating: 4.7 },
    { name: 'Chicama', lat: -7.8442, lng: -79.4447, rating: 5.0 },
    { name: 'Pacasmayo', lat: -7.4006, lng: -79.5714, rating: 4.4 },
    { name: 'Pimentel', lat: -6.8367, lng: -79.9342, rating: 3.9 },
    { name: 'Huanchaco', lat: -8.0667, lng: -79.1167, rating: 3.8 },
    { name: 'Máncora', lat: -4.1039, lng: -81.0472, rating: 4.3 },
    { name: 'Pasamayo', lat: -11.7333, lng: -77.1833, rating: 4.1 },
    { name: 'Conchitas', lat: -12.3156, lng: -76.8653, rating: 3.7 },
    { name: 'Pico Alto', lat: -12.3503, lng: -76.8908, rating: 4.9 },
  ];

  const cameraBeaches = [
    ...beaches,
    { name: 'Chicama 2', lat: -7.8442, lng: -79.4447, rating: 5.0, camera: 2 },
    { name: 'El Silencio', lat: -12.3400, lng: -76.8800, rating: 4.0, camera: true }
  ];

  const getForecast = async () => {
    if (!beach) return;
    
    setLoading(true);
    setShowBeachList(false);
    
    try {
      const selectedBeach = beaches.find(b => b.name.toLowerCase() === beach.toLowerCase());
      
      if (!selectedBeach) {
        setLoading(false);
        return;
      }

      // Fetch real wave data from Open-Meteo Marine API
      const marineResponse = await fetch(
        `https://marine-api.open-meteo.com/v1/marine?latitude=${selectedBeach.lat}&longitude=${selectedBeach.lng}&current=wave_height,wave_direction,wave_period,wind_wave_height,swell_wave_height&hourly=wave_height,wave_direction,wave_period&daily=wave_height_max&timezone=America/Lima&forecast_days=7`
      );
      const marineData = await marineResponse.json();

      // Fetch weather data
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedBeach.lat}&longitude=${selectedBeach.lng}&current=temperature_2m,wind_speed_10m,wind_direction_10m&timezone=America/Lima`
      );
      const weatherData = await weatherResponse.json();

      // Process hourly forecast
      const hourlyForecast = Array.from({ length: 24 }, (_, i) => {
        const waveHeight = marineData.hourly.wave_height[i] || 1.0;
        const rating = Math.min(5, Math.max(1, Math.floor((waveHeight / 2) * 5)));
        return {
          hour: i,
          rating: rating,
          waveHeight: waveHeight.toFixed(1)
        };
      });

      // Process weekly forecast
      const weeklyForecast = Array.from({ length: 7 }, (_, i) => {
        const waveHeight = marineData.daily.wave_height_max[i] || 1.0;
        const rating = Math.min(5, Math.max(1, Math.floor((waveHeight / 2) * 5)));
        return {
          day: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][(new Date().getDay() + i) % 7],
          rating: rating,
          waveHeight: waveHeight.toFixed(1)
        };
      });

      // Generate tide data (still simulated as tide APIs require specific data)
      const tideData = Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        height: Math.sin(i * Math.PI / 6) * 1.5 + 1.5
      }));

      // Water temperature estimate (simplified - varies by region)
      const waterTemp = selectedBeach.lat < -8 ? 
        Math.floor(Math.random() * 3 + 14) : // Cold water (north coast warmer)
        Math.floor(Math.random() * 5 + 18);   // Warmer water (Lima)

      const forecast = {
        beach: selectedBeach.name,
        rating: selectedBeach.rating,
        swellHeight: (marineData.current.swell_wave_height || 1.0).toFixed(1),
        swellDirection: Math.round(marineData.current.wave_direction || 180),
        swellPeriod: Math.round(marineData.current.wave_period || 10),
        waveHeight: (marineData.current.wave_height || 1.0).toFixed(1),
        windSpeed: Math.round(weatherData.current.wind_speed_10m || 10),
        windDirection: Math.round(weatherData.current.wind_direction_10m || 180),
        waterTemp: waterTemp,
        airTemp: Math.round(weatherData.current.temperature_2m || 20),
        location: selectedBeach,
        hourlyForecast: hourlyForecast,
        weeklyForecast: weeklyForecast,
        tideData: tideData,
        dataSource: 'Open-Meteo Marine API'
      };
      
      setForecast(forecast);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching forecast:', error);
      // Fallback to mock data if API fails
      const selectedBeach = beaches.find(b => b.name.toLowerCase() === beach.toLowerCase());
      const mockForecast = {
        beach: selectedBeach?.name || beach,
        rating: selectedBeach?.rating || 4.0,
        swellHeight: (Math.random() * 2 + 1).toFixed(1),
        swellDirection: Math.floor(Math.random() * 360),
        swellPeriod: Math.floor(Math.random() * 8 + 8),
        waveHeight: (Math.random() * 2.5 + 0.8).toFixed(1),
        windSpeed: Math.floor(Math.random() * 15 + 5),
        windDirection: Math.floor(Math.random() * 360),
        waterTemp: Math.floor(Math.random() * 5 + 18),
        airTemp: Math.floor(Math.random() * 8 + 20),
        location: selectedBeach || { lat: -12.1167, lng: -77.0333 },
        hourlyForecast: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          rating: Math.floor(Math.random() * 3 + 2),
          waveHeight: (Math.random() * 1.5 + 1).toFixed(1)
        })),
        weeklyForecast: Array.from({ length: 7 }, (_, i) => ({
          day: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][i],
          rating: Math.floor(Math.random() * 3 + 2),
          waveHeight: (Math.random() * 2 + 1).toFixed(1)
        })),
        tideData: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          height: Math.sin(i * Math.PI / 6) * 1.5 + 1.5
        })),
        dataSource: 'Datos simulados (error en API)'
      };
      setForecast(mockForecast);
      setLoading(false);
    }
  };

  const getBestSectionNow = (beachName, tideHeight, swellHeight, windSpeed) => {
    // Determinar si la marea está baja, media o alta
    const tideStatus = tideHeight < 1 ? 'baja' : tideHeight > 2 ? 'alta' : 'media';
    const swellSize = parseFloat(swellHeight) > 2 ? 'grande' : 'moderado';
    const windCondition = windSpeed < 10 ? 'suave' : 'fuerte';

    const sections = {
      'La Isla': {
        baja: 'El Punto Sur está encendido con esta marea baja. Las olas están rompiendo perfectas sobre las rocas. ¡Cuidado con el fondo!',
        media: 'El Centro y El Punto están funcionando bien. Elige El Punto para olas más potentes o el centro para olas más amigables.',
        alta: 'Con marea alta, quédate en el centro de la playa donde el fondo es más seguro. Las piedras están cubiertas pero las olas son más suaves.'
      },
      'Punta Rocas': {
        baja: '¡PELIGRO! Marea muy baja - evita surfear. Las rocas están expuestas. Espera a que suba la marea.',
        media: '¡PERFECTO! El arrecife principal está funcionando de lujo. Posiciónate en el canal y espera las series del outside.',
        alta: 'El inside está funcionando pero sin mucha fuerza. Si hay swell grande, el outside todavía rompe bien.'
      },
      'Barranquito': {
        baja: 'Los picos están dispersos. Busca las series en el centro, ideal para practicar.',
        media: '¡EXCELENTE! Toda la playa está funcionando. Múltiples picos para elegir. Perfecto para todos los niveles.',
        alta: 'Las olas están más cerca de la orilla. Bueno para principiantes, pero menos potencia.'
      },
      'Makaha': {
        baja: '¡LA DERECHA ESTÁ ON FIRE! Con esta marea las olas están rápidas y tubulares. Solo para surfistas experimentados.',
        media: 'La derecha sigue funcionando bien. Buen balance entre potencia y seguridad.',
        alta: 'Las olas pierden fuerza. El inside funciona para intermedios.'
      },
      'La Herradura': {
        baja: 'El spot pierde calidad con marea baja. Espera a que suba.',
        media: '¡IDEAL! El muelle está funcionando perfecto. Olas largas para longboard y shortboard.',
        alta: '¡EXCELENTE! Las olas más largas del día. Perfecto para longboard. Las series conectan hasta la orilla.'
      },
      'Señoritas': {
        baja: 'Funciona pero las olas son pequeñas. Bueno para principiantes absolutos.',
        media: 'Condiciones perfectas para aprender. Olas consistentes frente a las escuelas.',
        alta: 'Las mejores olas del día. Más potencia pero sigue siendo seguro para principiantes.'
      },
      'Caballeros': {
        baja: 'Los picos del outside están rompiendo hueco. Solo para surfistas avanzados.',
        media: '¡ÓPTIMO! El pico principal está trabajando perfecto. Olas rápidas y tubulares.',
        alta: 'Pierde un poco de fuerza pero sigue funcionando bien para intermedios.'
      },
      'Cabo Blanco': {
        baja: swellSize === 'grande' ? '¡EL POINT ESTÁ ÉPICO! Olas grandes y perfectas. Solo expertos.' : 'Necesitas más swell. Espera las series grandes.',
        media: swellSize === 'grande' ? '¡CONDICIONES PREMIUM! El point está rompiendo de lujo.' : 'Funciona decente con las series.',
        alta: 'El spot pierde calidad con marea alta. Mejor esperar que baje.'
      },
      'Chicama': {
        baja: 'Los points 2 y 3 están funcionando. Recorridos más cortos.',
        media: '¡PERFECTO! Point 1 conecta hasta Point 4. ¡Olas de 2km! Condiciones ideales.',
        alta: 'Solo Point 1 está funcionando bien. Recorridos más cortos.'
      },
      'Pacasmayo': {
        baja: 'El muelle está funcionando pero cuidado con las piedras. Solo para expertos.',
        media: '¡LA OLA ESTÁ INTERMINABLE! Desde el muelle hasta la playa. Condiciones perfectas.',
        alta: 'Funciona pero las olas son más cortas. Todavía vale la pena.'
      },
      'Pimentel': {
        baja: 'Picos dispersos. Busca donde rompe mejor.',
        media: '¡TODO FUNCIONANDO! El malecón está consistente con múltiples picos.',
        alta: 'Las mejores olas cerca del malecón. Buenas condiciones para todos.'
      },
      'Huanchaco': {
        baja: 'Olas pequeñas. Perfecto para caballitos de totora.',
        media: 'El centro de la bahía está funcionando bien. Bueno para aprender.',
        alta: '¡MEJOR MOMENTO DEL DÍA! Olas más grandes y consistentes.'
      },
      'Máncora': {
        baja: 'La Punta Norte tiene las mejores olas. Derechas largas.',
        media: 'Toda la playa funcionando. La Punta para avanzados, centro para principiantes.',
        alta: 'Las olas están grandes. La Punta tiene las mejores derechas del día.'
      }
    };

    return sections[beachName]?.[tideStatus] || 'Información de sección no disponible para estas condiciones.';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.imgur.com/3ZzofqO.png"
                alt="Spotcast" 
                className="w-16 h-16"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Crect width='500' height='500' fill='%23e8f4f8'/%3E%3Cpath d='M 80 350 Q 100 280 130 310 Q 160 340 180 320 Q 200 300 220 315 Q 240 330 260 310 Q 280 290 300 305 Q 320 320 340 300 Q 360 280 380 290 Q 400 300 420 350 L 80 350 Z' fill='%232563eb' stroke='%231d4ed8' stroke-width='3'/%3E%3Cpath d='M 120 200 Q 135 185 150 195 Q 165 205 180 195 Q 195 185 210 195' fill='%23bfdbfe' stroke='%2393c5fd' stroke-width='2'/%3E%3Cpath d='M 180 210 Q 192 200 205 210 Q 218 220 230 210 Q 243 200 255 210' fill='%23bfdbfe' stroke='%2393c5fd' stroke-width='2'/%3E%3Cpath d='M 250 225 Q 262 215 275 225 Q 288 235 300 225 Q 313 215 325 225' fill='%23bfdbfe' stroke='%2393c5fd' stroke-width='2'/%3E%3Ccircle cx='110' cy='310' r='4' fill='%23dbeafe'/%3E%3Ccircle cx='150' cy='295' r='4' fill='%23dbeafe'/%3E%3Ccircle cx='190' cy='320' r='4' fill='%23dbeafe'/%3E%3Ccircle cx='240' cy='305' r='4' fill='%23dbeafe'/%3E%3Ccircle cx='290' cy='315' r='4' fill='%23dbeafe'/%3E%3Ccircle cx='340' cy='295' r='4' fill='%23dbeafe'/%3E%3Cpath d='M 350 320 Q 360 315 370 320 Q 380 325 390 315' fill='white' stroke='none'/%3E%3C/svg%3E";
                }}
              />
              <h1 className="text-2xl font-bold text-gray-900">Spotcast</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowBeachList(true);
                  setForecast(null);
                  setBeach('');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                <Waves size={20} />
                Pronóstico
              </button>
              <button
                onClick={() => setShowCameras(!showCameras)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                <Eye size={20} />
                Cámaras
              </button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={beach}
              onChange={(e) => setBeach(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && getForecast()}
              placeholder="Buscar playa..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              list="beaches"
            />
            <datalist id="beaches">
              {beaches.map(b => (
                <option key={b.name} value={b.name} />
              ))}
            </datalist>
          </div>
        </div>
      </div>

      {/* Cameras Modal */}
      {showCameras && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-6xl w-full my-8" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-2xl font-bold text-gray-900">Surfcams en Vivo</h2>
              <button
                onClick={() => setShowCameras(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {cameraBeaches.map((b) => (
                <div key={b.name} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  <div className="p-4 bg-white border-b border-gray-200">
                    <h3 className="font-bold text-lg text-gray-900">{b.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">En Vivo</span>
                    </div>
                  </div>
                  <div className="relative bg-gray-900 aspect-video overflow-hidden">
                    {b.name === 'La Herradura' ? (
                      <a href="https://www.skylinewebcams.com/es/webcam/peru/lima/lima/chorrillos-playa-la-herradura.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img 
                          src="https://embed.skylinewebcams.com/img/4796.jpg" 
                          alt="【LIVE】 Chorrillos - Playa La Herradura | SkylineWebcams"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ) : b.name === 'Pacasmayo' ? (
                      <a href="https://www.skylinewebcams.com/es/webcam/peru/department-of-la-libertad/pacasmayo/playa-de-pacasmayo.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img 
                          src="https://embed.skylinewebcams.com/img/4870.jpg" 
                          alt="【LIVE】 Playa de Pacasmayo | SkylineWebcams"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ) : b.name === 'Chicama' ? (
                      <a href="https://www.skylinewebcams.com/es/webcam/peru/department-of-la-libertad/ascope-province/playa-de-chicama.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img 
                          src="https://embed.skylinewebcams.com/img/5281.jpg" 
                          alt="【LIVE】 Playa de Chicama | SkylineWebcams"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ) : b.name === 'Chicama 2' ? (
                      <a href="https://www.skylinewebcams.com/es/webcam/peru/department-of-la-libertad/ascope-province/ascope-puerto-malabrigo-chicama.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img 
                          src="https://embed.skylinewebcams.com/img/1201.jpg" 
                          alt="【LIVE】 Ascope - Puerto Malabrigo Chicama | SkylineWebcams"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ) : b.name === 'Huanchaco' ? (
                      <a href="https://www.skylinewebcams.com/es/webcam/peru/department-of-la-libertad/trujillo/trujillo-huanchaco.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img 
                          src="https://embed.skylinewebcams.com/img/1191.jpg" 
                          alt="【LIVE】 Trujillo - Huanchaco | SkylineWebcams"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ) : b.name === 'Cabo Blanco' ? (
                      <a href="https://www.skylinewebcams.com/es/webcam/peru/piura/talara/cabo-blanco.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img 
                          src="https://embed.skylinewebcams.com/img/1691.jpg" 
                          alt="【LIVE】 Cabo Blanco | SkylineWebcams"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ) : b.name === 'Caballeros' ? (
                      <a href="https://www.skylinewebcams.com/es/webcam/peru/lima/lima/punta-hermosa.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img 
                          src="https://embed.skylinewebcams.com/img/4039.jpg" 
                          alt="【LIVE】 Punta Hermosa - Playa Caballeros | SkylineWebcams"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ) : b.name === 'El Silencio' ? (
                      <a href="https://www.skylinewebcams.com/es/webcam/peru/lima/lima/playa-el-silencio.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img 
                          src="https://embed.skylinewebcams.com/img/4748.jpg" 
                          alt="【LIVE】 Lima - Playa el Silencio | SkylineWebcams"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ) : b.name === 'Pimentel' ? (
                      <a href="https://www.skylinewebcams.com/es/webcam/peru/lambayeque/chiclayo/pimentel.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img 
                          src="https://embed.skylinewebcams.com/img/1295.jpg" 
                          alt="【LIVE】 Pimentel | SkylineWebcams"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ) : surfcams[b.name] ? (
                      <iframe
                        src={surfcams[b.name]}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Eye className="mx-auto mb-2 text-gray-600" size={48} />
                          <p className="text-gray-500 text-sm">Cámara no disponible</p>
                          <p className="text-gray-600 text-xs mt-1">Próximamente</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-white">
                    <button 
                      onClick={() => {
                        const beachName = b.name === 'Chicama 2' ? 'Chicama' : b.name === 'El Silencio' ? 'La Isla' : b.name;
                        setBeach(beachName);
                        setShowCameras(false);
                        getForecast();
                      }}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      Ver Pronóstico
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Beach List */}
        {showBeachList && !forecast && !loading && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Selecciona una Playa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {beaches.map((b) => (
                <button
                  key={b.name}
                  onClick={() => {
                    setBeach(b.name);
                    setTimeout(() => getForecast(), 100);
                  }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{b.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="text-sm font-semibold text-gray-700">{b.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Ver pronóstico completo →</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-20">
            <Waves className="animate-bounce mx-auto mb-4 text-blue-500" size={48} />
            <p className="text-gray-600 text-lg">Cargando pronóstico...</p>
          </div>
        )}

        {forecast && !loading && (
          <div>
            {/* Beach Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">{forecast.beach}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      {forecast.rating}/5
                    </span>
                    <span>Lima, Perú</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 mb-6 border-b border-gray-200">
              <button 
                onClick={() => setActiveTab('surf')}
                className={`pb-3 px-1 font-semibold border-b-2 transition-colors ${
                  activeTab === 'surf' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Surf
              </button>
              <button 
                onClick={() => setActiveTab('wind')}
                className={`pb-3 px-1 font-semibold border-b-2 transition-colors ${
                  activeTab === 'wind' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Viento
              </button>
              <button 
                onClick={() => setActiveTab('tide')}
                className={`pb-3 px-1 font-semibold border-b-2 transition-colors ${
                  activeTab === 'tide' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Marea
              </button>
              <button 
                onClick={() => setActiveTab('info')}
                className={`pb-3 px-1 font-semibold border-b-2 transition-colors ${
                  activeTab === 'info' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Información
              </button>
            </div>

            {/* Surf Tab */}
            {activeTab === 'surf' && (
              <>
                {/* Beach Camera - Only show if camera exists */}
                {(forecast.beach === 'La Herradura' || forecast.beach === 'Pacasmayo' || 
                  forecast.beach === 'Chicama' || forecast.beach === 'Huanchaco' || 
                  forecast.beach === 'Cabo Blanco' || forecast.beach === 'Caballeros' || 
                  forecast.beach === 'Pimentel') && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 flex items-center gap-2">
                      <Eye className="text-blue-600" size={20} />
                      Cámara en Vivo
                    </h3>
                    <div className="relative bg-gray-900 aspect-video rounded-lg overflow-hidden">
                      {forecast.beach === 'La Herradura' ? (
                        <a href="https://www.skylinewebcams.com/es/webcam/peru/lima/lima/chorrillos-playa-la-herradura.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                          <img 
                            src="https://embed.skylinewebcams.com/img/4796.jpg" 
                            alt="【LIVE】 Chorrillos - Playa La Herradura | SkylineWebcams"
                            className="w-full h-full object-cover"
                          />
                        </a>
                      ) : forecast.beach === 'Pacasmayo' ? (
                        <a href="https://www.skylinewebcams.com/es/webcam/peru/department-of-la-libertad/pacasmayo/playa-de-pacasmayo.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                          <img 
                            src="https://embed.skylinewebcams.com/img/4870.jpg" 
                            alt="【LIVE】 Playa de Pacasmayo | SkylineWebcams"
                            className="w-full h-full object-cover"
                          />
                        </a>
                      ) : forecast.beach === 'Chicama' ? (
                        <a href="https://www.skylinewebcams.com/es/webcam/peru/department-of-la-libertad/ascope-province/playa-de-chicama.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                          <img 
                            src="https://embed.skylinewebcams.com/img/5281.jpg" 
                            alt="【LIVE】 Playa de Chicama | SkylineWebcams"
                            className="w-full h-full object-cover"
                          />
                        </a>
                      ) : forecast.beach === 'Huanchaco' ? (
                        <a href="https://www.skylinewebcams.com/es/webcam/peru/department-of-la-libertad/trujillo/trujillo-huanchaco.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                          <img 
                            src="https://embed.skylinewebcams.com/img/1191.jpg" 
                            alt="【LIVE】 Trujillo - Huanchaco | SkylineWebcams"
                            className="w-full h-full object-cover"
                          />
                        </a>
                      ) : forecast.beach === 'Cabo Blanco' ? (
                        <a href="https://www.skylinewebcams.com/es/webcam/peru/piura/talara/cabo-blanco.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                          <img 
                            src="https://embed.skylinewebcams.com/img/1691.jpg" 
                            alt="【LIVE】 Cabo Blanco | SkylineWebcams"
                            className="w-full h-full object-cover"
                          />
                        </a>
                      ) : forecast.beach === 'Caballeros' ? (
                        <a href="https://www.skylinewebcams.com/es/webcam/peru/lima/lima/punta-hermosa.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                          <img 
                            src="https://embed.skylinewebcams.com/img/4039.jpg" 
                            alt="【LIVE】 Punta Hermosa - Playa Caballeros | SkylineWebcams"
                            className="w-full h-full object-cover"
                          />
                        </a>
                      ) : forecast.beach === 'Pimentel' ? (
                        <a href="https://www.skylinewebcams.com/es/webcam/peru/lambayeque/chiclayo/pimentel.html" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                          <img 
                            src="https://embed.skylinewebcams.com/img/1295.jpg" 
                            alt="【LIVE】 Pimentel | SkylineWebcams"
                            className="w-full h-full object-cover"
                          />
                        </a>
                      ) : null}
                    </div>
                    <p className="text-sm text-gray-500 mt-3 text-center">
                      Click en la imagen para ver en pantalla completa
                    </p>
                  </div>
                )}

                {/* Current Conditions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Condiciones Actuales</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Waves className="text-blue-500" size={20} />
                        <span className="text-sm text-gray-600">Olas</span>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{forecast.waveHeight}m</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Wind className="text-gray-500" size={20} />
                        <span className="text-sm text-gray-600">Viento</span>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{forecast.windSpeed} km/h</p>
                      <p className="text-sm text-gray-500">{getDirectionName(forecast.windDirection)}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Droplets className="text-blue-400" size={20} />
                        <span className="text-sm text-gray-600">Agua</span>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{forecast.waterTemp}°C</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Sun className="text-yellow-500" size={20} />
                        <span className="text-sm text-gray-600">Aire</span>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{forecast.airTemp}°C</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-gray-600 text-center">
                      ⚠️ El tamaño de las olas no es exacto y es un valor muy aproximado
                    </p>
                    {forecast.dataSource && (
                      <p className="text-xs text-gray-500 text-center mt-1">
                        📡 Fuente: {forecast.dataSource}
                      </p>
                    )}
                  </div>
                </div>

                {/* Wave Height Visualization */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Altura de las Olas</h3>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      {/* SVG: 500px = 5m scale. Person is 1.90m = 190px from bottom */}
                      <svg width="120" height="350" viewBox="0 0 120 500" className="mx-auto">
                        {/* Feet - start at bottom (500) which is 0m */}
                        <ellipse cx="51" cy="495" rx="9" ry="6" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
                        <ellipse cx="69" cy="495" rx="9" ry="6" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
                        
                        {/* Legs - 75px tall (longer legs) */}
                        <rect x="45" y="420" width="13" height="75" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" rx="6"/>
                        <rect x="62" y="420" width="13" height="75" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" rx="6"/>
                        
                        {/* Body - 60px tall (longer torso) */}
                        <rect x="44" y="360" width="32" height="60" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" rx="5"/>
                        
                        {/* Arms */}
                        <rect x="18" y="365" width="26" height="13" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" rx="6"/>
                        <rect x="76" y="365" width="26" height="13" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" rx="6"/>
                        
                        {/* Neck */}
                        <rect x="54" y="350" width="12" height="10" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" rx="3"/>
                        
                        {/* Head - 18px radius for bigger head, center at 332 (500 - 190 + 18 + 4) */}
                        <circle cx="60" cy="332" r="18" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
                        <defs>
                          <clipPath id="waterClip">
                            <rect x="0" y={500 - (parseFloat(forecast.waveHeight) / 5) * 500} width="120" height={(parseFloat(forecast.waveHeight) / 5) * 500} />
                          </clipPath>
                        </defs>
                        <g clipPath="url(#waterClip)">
                          <ellipse cx="51" cy="495" rx="9" ry="6" fill="#3b82f6" stroke="#2563eb" strokeWidth="2"/>
                          <ellipse cx="69" cy="495" rx="9" ry="6" fill="#3b82f6" stroke="#2563eb" strokeWidth="2"/>
                          <rect x="45" y="420" width="13" height="75" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" rx="6"/>
                          <rect x="62" y="420" width="13" height="75" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" rx="6"/>
                          <rect x="44" y="360" width="32" height="60" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" rx="5"/>
                          <rect x="18" y="365" width="26" height="13" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" rx="6"/>
                          <rect x="76" y="365" width="26" height="13" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" rx="6"/>
                          <rect x="54" y="350" width="12" height="10" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" rx="3"/>
                          <circle cx="60" cy="332" r="18" fill="#3b82f6" stroke="#2563eb" strokeWidth="2"/>
                        </g>
                        <line 
                          x1="0" 
                          y1={500 - (parseFloat(forecast.waveHeight) / 5) * 500} 
                          x2="120" 
                          y2={500 - (parseFloat(forecast.waveHeight) / 5) * 500} 
                          stroke="#3b82f6" 
                          strokeWidth="3" 
                          strokeDasharray="5,5"
                        />
                        {/* Reference grid lines */}
                        <line x1="0" y1="400" x2="15" y2="400" stroke="#d1d5db" strokeWidth="1"/>
                        <line x1="0" y1="350" x2="10" y2="350" stroke="#e5e7eb" strokeWidth="1"/>
                        <line x1="0" y1="300" x2="15" y2="300" stroke="#d1d5db" strokeWidth="2"/>
                        <line x1="0" y1="250" x2="10" y2="250" stroke="#e5e7eb" strokeWidth="1"/>
                        <line x1="0" y1="200" x2="15" y2="200" stroke="#d1d5db" strokeWidth="1"/>
                        <line x1="0" y1="150" x2="10" y2="150" stroke="#e5e7eb" strokeWidth="1"/>
                        <line x1="0" y1="100" x2="15" y2="100" stroke="#d1d5db" strokeWidth="1"/>
                        <line x1="0" y1="50" x2="10" y2="50" stroke="#e5e7eb" strokeWidth="1"/>
                        <line x1="0" y1="0" x2="15" y2="0" stroke="#d1d5db" strokeWidth="2"/>
                      </svg>
                      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500" style={{transform: 'translateX(-35px)'}}>
                        <span className="font-semibold">5.00m</span>
                        <span className="text-[10px]">4.50m</span>
                        <span className="font-semibold">4.00m</span>
                        <span className="text-[10px]">3.50m</span>
                        <span className="font-semibold">3.00m</span>
                        <span className="text-[10px]">2.50m</span>
                        <span className="font-semibold">2.00m</span>
                        <span className="text-[10px]">1.50m</span>
                        <span className="font-semibold">1.00m</span>
                        <span className="text-[10px]">0.50m</span>
                        <span className="font-semibold">0.00m</span>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-2xl font-bold text-blue-600 mb-2">{forecast.waveHeight}m</p>
                      <p className="text-xl font-semibold text-gray-900 mb-2">
                        {(() => {
                          const height = parseFloat(forecast.waveHeight);
                          if (height >= 2.5) return "🌊🌊 GIGANTE";
                          if (height >= 1.90) return "🌊 Overhead+";
                          if (height >= 1.5) return "🏄 Cabeza";
                          if (height >= 1.2) return "💪 Hombros";
                          if (height >= 0.9) return "🤙 Pecho";
                          if (height >= 0.6) return "👍 Cintura";
                          if (height >= 0.3) return "🦵 Rodilla";
                          return "🦶 Tobillo";
                        })()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Las olas te llegan aproximadamente {(() => {
                          const height = parseFloat(forecast.waveHeight);
                          if (height >= 2.5) return `${height}m - ¡MUY PELIGROSO!`;
                          if (height >= 1.90) return "por encima de la cabeza";
                          if (height >= 1.5) return "a la cabeza";
                          if (height >= 1.2) return "a los hombros";
                          if (height >= 0.9) return "al pecho";
                          if (height >= 0.6) return "a la cintura";
                          if (height >= 0.3) return "a la rodilla";
                          return "al tobillo";
                        })()}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">Referencia: persona de 1.90m de altura</p>
                    </div>
                  </div>
                </div>

                {/* Hourly Forecast */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Pronóstico por Hora</h3>
                  <div className="overflow-x-auto">
                    <div className="flex gap-4 pb-2">
                      {forecast.hourlyForecast.slice(0, 12).map((hour) => (
                        <div key={hour.hour} className="flex flex-col items-center min-w-[60px]">
                          <span className="text-xs text-gray-500 mb-2">{hour.hour}:00</span>
                          <div className={`w-12 h-12 rounded-full ${getRatingBg(hour.rating)} flex items-center justify-center mb-2`}>
                            <Star className="text-white fill-white" size={20} />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{hour.waveHeight}m</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Weekly Forecast */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Pronóstico Semanal</h3>
                  <div className="space-y-3">
                    {forecast.weeklyForecast.map((day, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <span className="text-sm font-medium text-gray-900 w-16">{day.day}</span>
                        <div className="flex items-center gap-2 flex-1">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star 
                                key={j} 
                                size={16} 
                                className={j < day.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{day.waveHeight}m</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Swell Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Detalles del Swell</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Swell Stats */}
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Altura del Swell</p>
                        <p className="text-2xl font-bold text-gray-900">{forecast.swellHeight}m</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Dirección</p>
                        <p className="text-2xl font-bold text-gray-900">{forecast.swellDirection}° {getDirectionName(forecast.swellDirection)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Período</p>
                        <p className="text-2xl font-bold text-gray-900">{forecast.swellPeriod}s</p>
                      </div>
                    </div>

                    {/* Swell Direction Compass */}
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-sm text-gray-600 mb-4 font-semibold">Dirección del Swell</p>
                      <div className="relative w-64 h-64">
                        {/* Outer circle */}
                        <div className="absolute inset-0 border-4 border-blue-300 rounded-full bg-gradient-to-br from-blue-50 to-cyan-50"></div>
                        
                        {/* Inner circle */}
                        <div className="absolute inset-8 border-2 border-blue-200 rounded-full bg-white"></div>
                        
                        {/* Cardinal directions */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-700">N</div>
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-700">S</div>
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm font-bold text-gray-700">W</div>
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-bold text-gray-700">E</div>
                        
                        {/* Intercardinal directions */}
                        <div className="absolute top-8 left-8 text-xs font-semibold text-gray-500">NW</div>
                        <div className="absolute top-8 right-8 text-xs font-semibold text-gray-500">NE</div>
                        <div className="absolute bottom-8 left-8 text-xs font-semibold text-gray-500">SW</div>
                        <div className="absolute bottom-8 right-8 text-xs font-semibold text-gray-500">SE</div>
                        
                        {/* Center dot */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                        
                        {/* Swell direction arrow - centered and rotates from middle */}
                        <div 
                          className="absolute top-1/2 left-1/2 w-2 h-24"
                          style={{ 
                            transform: `translate(-50%, -50%) rotate(${forecast.swellDirection}deg)`,
                            transformOrigin: 'center center'
                          }}
                        >
                          {/* Arrow pointing up from center */}
                          <div className="absolute left-0 bottom-1/2 w-full h-1/2 bg-gradient-to-t from-red-600 to-red-400"></div>
                          
                          {/* Arrow head */}
                          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-3">
                            <svg width="20" height="24" viewBox="0 0 20 24">
                              <polygon points="10,0 20,24 10,18 0,24" fill="#dc2626" stroke="#991b1b" strokeWidth="1"/>
                            </svg>
                          </div>
                          
                          {/* Tail (opposite direction indicator) */}
                          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-3">
                            <div className="w-4 h-4 bg-red-300 rounded-full"></div>
                          </div>
                        </div>

                        {/* Degree marker */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {forecast.swellDirection}°
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-6 text-center max-w-xs">
                        La flecha roja indica desde dónde viene el swell
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Wind Tab */}
            {activeTab === 'wind' && (
              <>
                {/* Current Wind Conditions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Condiciones de Viento</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center justify-center p-8">
                      <Wind className="text-gray-400 mb-4" size={64} />
                      <p className="text-6xl font-bold text-gray-900 mb-2">{forecast.windSpeed}</p>
                      <p className="text-xl text-gray-600 mb-4">km/h</p>
                      <div className="flex items-center gap-2">
                        <Navigation className="text-blue-500" size={24} style={{ transform: `rotate(${forecast.windDirection}deg)` }} />
                        <p className="text-2xl font-semibold text-gray-900">{getDirectionName(forecast.windDirection)}</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{forecast.windDirection}°</p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="text-gray-600">Ráfagas</span>
                          <span className="text-xl font-bold text-gray-900">{forecast.windSpeed + 5} km/h</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="text-gray-600">Calidad</span>
                          <span className="text-xl font-bold text-green-600">Bueno</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="text-gray-600">Tipo</span>
                          <span className="text-xl font-bold text-gray-900">Offshore</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hourly Wind Forecast */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Pronóstico de Viento por Hora</h3>
                  <div className="overflow-x-auto">
                    <div className="flex gap-4 pb-2">
                      {forecast.hourlyForecast.slice(0, 12).map((hour) => (
                        <div key={hour.hour} className="flex flex-col items-center min-w-[70px]">
                          <span className="text-xs text-gray-500 mb-2">{hour.hour}:00</span>
                          <Navigation 
                            className="text-blue-500 mb-2" 
                            size={32}
                            style={{ transform: `rotate(${Math.random() * 360}deg)` }}
                          />
                          <span className="text-sm font-semibold text-gray-900">{Math.floor(forecast.windSpeed + Math.random() * 10 - 5)} km/h</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Wind Speed Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Velocidad del Viento (24h)</h3>
                  <div className="relative h-64 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg p-4">
                    <svg className="w-full h-full">
                      <defs>
                        <linearGradient id="windGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#6b7280" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#6b7280" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      <polyline
                        points={Array.from({ length: 24 }, (_, i) => {
                          const windVariation = Math.sin(i * Math.PI / 12) * 20 + 50;
                          return `${(i / 23) * 100},${100 - windVariation}`;
                        }).join(' ')}
                        fill="url(#windGradient)"
                        stroke="#6b7280"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-between text-xs text-gray-600 px-4">
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                      <span>24:00</span>
                    </div>
                  </div>
                </div>

                {/* Wind Direction Compass */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Rosa de los Vientos</h3>
                  <div className="flex justify-center items-center h-64">
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 border-2 border-gray-300 rounded-full"></div>
                      <div className="absolute inset-4 border border-gray-200 rounded-full"></div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs font-semibold text-gray-700">N</div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 text-xs font-semibold text-gray-700">S</div>
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 text-xs font-semibold text-gray-700">W</div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 text-xs font-semibold text-gray-700">E</div>
                      <Navigation 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500" 
                        size={64}
                        style={{ transform: `translate(-50%, -50%) rotate(${forecast.windDirection}deg)` }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Tide Tab */}
            {activeTab === 'tide' && (
              <>
                {/* Tide Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Tabla de Mareas (24 Horas)</h3>
                  <div className="relative h-80 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-6">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="tideGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      <polyline
                        points={forecast.tideData.map((d, i) => 
                          `${(i / 23) * 100},${100 - (d.height / 3) * 90}`
                        ).join(' ')}
                        fill="url(#tideGradient)"
                        stroke="#3b82f6"
                        strokeWidth="0.5"
                      />
                      {/* Rating indicators */}
                      {forecast.tideData.map((d, i) => {
                        const rating = Math.floor(Math.random() * 3 + 2);
                        const color = rating >= 4 ? '#22c55e' : rating >= 3 ? '#eab308' : '#f97316';
                        return (
                          <circle
                            key={i}
                            cx={(i / 23) * 100}
                            cy={100 - (d.height / 3) * 90}
                            r="1.5"
                            fill={color}
                            stroke="white"
                            strokeWidth="0.3"
                          />
                        );
                      })}
                    </svg>
                    <div className="absolute top-2 left-4 right-4 flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-gray-700">Excelente</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-gray-700">Bueno</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-gray-700">Regular</span>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-between text-xs text-gray-600 px-4">
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                      <span>24:00</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    Los puntos de colores indican la calidad del surf en cada hora
                  </p>
                </div>

                {/* Hourly Tide & Surf Forecast */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Pronóstico por Hora - Marea y Surf</h3>
                  <div className="overflow-x-auto">
                    <div className="flex gap-3 pb-2">
                      {forecast.tideData.slice(0, 12).map((tide, i) => {
                        const rating = Math.floor(Math.random() * 3 + 2);
                        const waveHeight = (Math.random() * 1.5 + 1).toFixed(1);
                        return (
                          <div key={i} className="flex flex-col items-center min-w-[80px] p-3 bg-gray-50 rounded-lg">
                            <span className="text-xs text-gray-500 mb-2 font-semibold">{i}:00</span>
                            <div className={`w-10 h-10 rounded-full ${getRatingBg(rating)} flex items-center justify-center mb-2`}>
                              <Star className="text-white fill-white" size={16} />
                            </div>
                            <span className="text-xs text-gray-600 mb-1">Ola: {waveHeight}m</span>
                            <span className="text-xs text-gray-600">Marea: {tide.height.toFixed(1)}m</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Tide Times */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Horarios de Marea</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Marea Alta</span>
                        <TrendingUp className="text-blue-600" size={20} />
                      </div>
                      <p className="text-3xl font-bold text-gray-900 mb-1">2.8m</p>
                      <p className="text-sm text-gray-600">06:24 AM</p>
                    </div>
                    <div className="p-6 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Marea Baja</span>
                        <TrendingUp className="text-orange-600 rotate-180" size={20} />
                      </div>
                      <p className="text-3xl font-bold text-gray-900 mb-1">0.4m</p>
                      <p className="text-sm text-gray-600">12:18 PM</p>
                    </div>
                    <div className="p-6 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Marea Alta</span>
                        <TrendingUp className="text-blue-600" size={20} />
                      </div>
                      <p className="text-3xl font-bold text-gray-900 mb-1">2.6m</p>
                      <p className="text-sm text-gray-600">06:42 PM</p>
                    </div>
                    <div className="p-6 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Marea Baja</span>
                        <TrendingUp className="text-orange-600 rotate-180" size={20} />
                      </div>
                      <p className="text-3xl font-bold text-gray-900 mb-1">0.6m</p>
                      <p className="text-sm text-gray-600">11:56 PM</p>
                    </div>
                  </div>
                </div>

                {/* Tide Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Información de Marea</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Rango de Marea</span>
                      <span className="text-xl font-bold text-gray-900">2.4m</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Tipo de Marea</span>
                      <span className="text-xl font-bold text-gray-900">Semi-diurna</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Próxima Marea</span>
                      <span className="text-xl font-bold text-blue-600">Alta - 2h 15min</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Info Tab */}
            {activeTab === 'info' && (
              <>
                {/* Beach Info Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Información de la Playa</h3>
                  <div className="space-y-6">
                    {/* Recommendations */}
                    <div className="p-6 bg-blue-50 rounded-lg">
                      <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Eye className="text-blue-600" size={24} />
                        Recomendaciones
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {beachInfo[forecast.beach]?.recommendations || 'Información no disponible para esta playa.'}
                      </p>
                    </div>

                    {/* Level & Conditions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Nivel Recomendado</p>
                        <p className="text-lg font-bold text-gray-900">{beachInfo[forecast.beach]?.level}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Mejor Marea</p>
                        <p className="text-lg font-bold text-gray-900">{beachInfo[forecast.beach]?.bestTide}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Tipo de Fondo</p>
                        <p className="text-lg font-bold text-gray-900">{beachInfo[forecast.beach]?.bottom}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Mejor Swell</p>
                        <p className="text-lg font-bold text-gray-900">{beachInfo[forecast.beach]?.bestSwell}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Facilities & Access */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Servicios y Acceso</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Nivel de Crowd</span>
                      <span className="text-lg font-bold text-gray-900">{beachInfo[forecast.beach]?.crowd}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Estacionamiento</span>
                      <span className="text-lg font-bold text-gray-900">{beachInfo[forecast.beach]?.parking}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Servicios</span>
                      <span className="text-lg font-bold text-gray-900">{beachInfo[forecast.beach]?.facilities}</span>
                    </div>
                  </div>
                </div>

                {/* Best Section NOW - Dynamic based on conditions */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg border-2 border-green-300 p-6 mb-6">
                  <h3 className="text-lg font-bold text-green-700 uppercase mb-4 flex items-center gap-2">
                    <MapPin className="text-green-600" size={28} />
                    🔥 MEJOR SECCIÓN AHORA
                  </h3>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <p className="text-gray-900 leading-relaxed text-lg font-semibold">
                      {getBestSectionNow(
                        forecast.beach, 
                        getCurrentTideHeight(forecast.tideData),
                        forecast.swellHeight,
                        forecast.windSpeed
                      )}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Marea</p>
                        <p className="text-sm font-bold text-gray-900">
                          {getCurrentTideHeight(forecast.tideData) < 1 ? '🔽 Baja' : 
                           getCurrentTideHeight(forecast.tideData) > 2 ? '🔼 Alta' : '➡️ Media'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Swell</p>
                        <p className="text-sm font-bold text-gray-900">
                          {parseFloat(forecast.swellHeight) > 2 ? '📈 Grande' : '📊 Moderado'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Viento</p>
                        <p className="text-sm font-bold text-gray-900">
                          {forecast.windSpeed < 10 ? '✅ Suave' : '💨 Fuerte'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Best Section to Surf - General Info */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-sm border-2 border-blue-200 p-6 mb-6">
                  <h3 className="text-sm font-semibold text-blue-700 uppercase mb-4 flex items-center gap-2">
                    <MapPin className="text-blue-600" size={24} />
                    📍 Mejor Sección para Surfear
                  </h3>
                  <div className="bg-white rounded-lg p-5">
                    <p className="text-gray-800 leading-relaxed text-base font-medium">
                      {beachInfo[forecast.beach]?.bestSection}
                    </p>
                  </div>
                </div>

                {/* Safety Tips */}
                <div className="bg-yellow-50 rounded-xl shadow-sm border border-yellow-200 p-6">
                  <h3 className="text-sm font-semibold text-yellow-800 uppercase mb-4">⚠️ Consejos de Seguridad</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      <span>Siempre revisa las condiciones antes de entrar al agua</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      <span>No surfees solo, especialmente en spots desconocidos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      <span>Respeta a los locales y las reglas de prioridad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      <span>Usa leash y considera un casco en spots rocosos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      <span>Conoce tus límites y no te arriesgues innecesariamente</span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {/* Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Ubicación</h3>
              <div className="rounded-lg overflow-hidden h-64">
                <iframe
                  className="w-full h-full"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${forecast.location.lng-0.02},${forecast.location.lat-0.02},${forecast.location.lng+0.02},${forecast.location.lat+0.02}&marker=${forecast.location.lat},${forecast.location.lng}`}
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotcastApp;
