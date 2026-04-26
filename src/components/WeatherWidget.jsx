import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, Loader2 } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Caracas coordinates
  const lat = 10.4880;
  const lon = -66.8791;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const data = await response.json();
        setWeather(data.current_weather);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 30 mins
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code) => {
    // WMO Weather interpretation codes
    if (code === 0) return <Sun size={20} className="text-yellow-400" />;
    if (code > 0 && code <= 3) return <Cloud size={20} className="text-gray-300" />;
    if (code >= 51 && code <= 67) return <CloudRain size={20} className="text-blue-300" />;
    if (code >= 80 && code <= 82) return <CloudRain size={20} className="text-blue-400" />;
    if (code >= 95) return <CloudLightning size={20} className="text-yellow-500" />;
    return <Cloud size={20} className="text-gray-300" />;
  };

  const getWeatherText = (code) => {
    if (code === 0) return "Despejado";
    if (code > 0 && code <= 3) return "Nublado";
    if (code >= 51 && code <= 67) return "Lluvia";
    if (code >= 80 && code <= 82) return "Lluvia fuerte";
    if (code >= 95) return "Tormenta";
    return "Nublado";
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-2 w-fit">
        <Loader2 size={16} className="animate-spin text-blue-200" />
        <span className="text-xs text-blue-200">Cargando clima...</span>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="group flex items-center gap-3 py-2 transition-all cursor-help relative" title="Clima actual en la institución">
      {getWeatherIcon(weather.weathercode)}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="font-bold text-sm text-white">{Math.round(weather.temperature)}°C</span>
        </div>
        <span className="text-[10px] text-blue-200 leading-none tracking-wider uppercase">{getWeatherText(weather.weathercode)}</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
