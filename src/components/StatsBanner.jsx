import { useEffect, useState, useRef } from 'react';

const AnimatedCounter = ({ endValue, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = parseInt(endValue, 10);
    if (start === end) return;

    // Use a fixed frame rate of 60fps for calculating total frames
    const totalFrames = Math.round(duration / (1000 / 60)); 
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      // easeOutQuart
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.round(end * easeOut);

      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [endValue, duration, isVisible]);

  return (
    <span ref={counterRef}>
      {prefix}{count}{suffix}
    </span>
  );
};

const StatsBanner = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 relative z-20 mt-12 mb-8 md:mt-20 md:mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-blue-900/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 sm:gap-8 md:gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center pt-0">
              <h3 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2 drop-shadow-sm flex items-center">
                <AnimatedCounter endValue={3800} prefix="+" />
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-widest font-medium">Graduados</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center pt-10 sm:pt-0">
              <h3 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2 drop-shadow-sm flex items-center">
                <AnimatedCounter endValue={1500} prefix="+" />
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-widest font-medium">Familias</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center pt-10 sm:pt-0">
              <h3 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2 drop-shadow-sm flex items-center">
                <AnimatedCounter endValue={69} />
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-widest font-medium">Años de Historia</p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center pt-10 sm:pt-0">
              <h3 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2 drop-shadow-sm flex items-center">
                <AnimatedCounter endValue={43} />
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-widest font-medium">Docentes</p>
            </div>

            {/* Stat 5 */}
            <div className="flex flex-col items-center justify-center pt-10 sm:pt-0">
              <h3 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2 drop-shadow-sm flex items-center">
                <AnimatedCounter endValue={100} suffix="%" />
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-widest font-medium">Excelencia</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;

