import React from "react";
import gorro from './../../assets/images/gorro-loader.png'
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";

const CookingLoader = () => {
    const { lang } = useLanguage();
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-screen bg-white/80 backdrop-blur-sm gap-6">
      
      <img 
        src={gorro} 
        alt="Gorro de Chef Cargando" 
        className="w-32 h-32 md:w-40 md:h-40 object-contain animate-bounce drop-shadow-xl" 
      />

      <div className="flex items-center gap-1 text-gray-500 font-bold text-xl md:text-2xl tracking-wider animate-pulse">
        <span>{ texts[lang].loading }</span>
        <span className="animate-[bounce_1s_infinite_100ms]">.</span>
        <span className="animate-[bounce_1s_infinite_200ms]">.</span>
        <span className="animate-[bounce_1s_infinite_300ms]">.</span>
      </div>
      
    </div>
  );
};

export default CookingLoader;