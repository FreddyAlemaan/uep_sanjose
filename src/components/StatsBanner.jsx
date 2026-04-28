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
    <div className="w-full px-2 sm:px-6 lg:px-8 relative z-20 mt-8 mb-4 md:mt-20 md:mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl shadow-blue-900/20 border border-white/5">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8 gap-x-4 md:gap-4 text-center divide-white/10">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-3xl md:text-5xl font-extrabold text-[#FFD700] mb-1 drop-shadow-sm">
                <AnimatedCounter endValue={3800} prefix="+" />
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-sm uppercase tracking-widest font-bold">Graduados</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center border-l border-white/10 sm:border-l-0 md:border-l">
              <h3 className="text-3xl md:text-5xl font-extrabold text-[#FFD700] mb-1 drop-shadow-sm">
                <AnimatedCounter endValue={1500} prefix="+" />
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-sm uppercase tracking-widest font-bold">Familias</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center sm:border-l border-white/10">
              <h3 className="text-3xl md:text-5xl font-extrabold text-[#FFD700] mb-1 drop-shadow-sm">
                <AnimatedCounter endValue={69} />
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-sm uppercase tracking-widest font-bold">Años</p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center border-l border-white/10 sm:border-l-0 md:border-l">
              <h3 className="text-3xl md:text-5xl font-extrabold text-[#FFD700] mb-1 drop-shadow-sm">
                <AnimatedCounter endValue={43} />
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-sm uppercase tracking-widest font-bold">Docentes</p>
            </div>

            {/* Stat 5 */}
            <div className="flex flex-col items-center justify-center sm:border-l border-white/10 col-span-2 sm:col-span-1 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
              <h3 className="text-3xl md:text-5xl font-extrabold text-[#FFD700] mb-1 drop-shadow-sm">
                <AnimatedCounter endValue={100} suffix="%" />
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-sm uppercase tracking-widest font-bold">Excelencia</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;

