"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>('');
  const [isResponsiveVoiceLoaded, setIsResponsiveVoiceLoaded] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    if (typeof window !== "undefined") { // Asegúrate de que esto se ejecute solo en el cliente
      const script = document.createElement("script");
      script.src = "https://code.responsivevoice.org/responsivevoice.js?key=YNDBmHzj"; // Reemplaza TU_API_KEY con tu clave
      script.onload = () => {
        setIsResponsiveVoiceLoaded(true);
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script); // Limpia el script al desmontar el componente
      };
    }
  }, []);

  const speak = () => {
    if (inputValue.trim() !== "" && isResponsiveVoiceLoaded) {
      // Usa ResponsiveVoice.js para reproducir el texto
      (window as any).responsiveVoice.speak(inputValue, "Spanish Female", {
        rate: 0.8, // Velocidad más lenta
        pitch: 0.9, // Tono más bajo
      });
    } else {
      console.error("Ingrese texto en el campo o espere a que ResponsiveVoice se cargue");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      speak();
    }
  };

  return (
    <main className="w-svw h-svh flex justify-center items-center">
      <section className="flex flex-col gap-2 px-10 py-6 h-[60svh] w-[60svw] content bg-zinc-900 pb-20">
        <header>
          <h1 className="font-bold text-white text-xl">Insert a text:</h1>
        </header>
        <article className="flex flex-col gap-4 items-center justify-center h-full">
          <input
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={handleKeyPress}
            className="border-green-500 border w-[40svw] rounded-lg text-white px-2.5 py-1.5 focus:outline-0 input"
            placeholder="text"
            id="text"
            type="text"
          />
          <button
            onClick={speak}
            className="bg-green-500 rounded-lg button cursor-pointer w-[40svw] font-bold text-white py-1.5 px-2.5"
            id="submit"
          >
            submit
          </button>
        </article>
      </section>
    </main>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */