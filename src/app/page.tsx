'use client'
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000); // Show the button after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);
  const words = [
    {
      text: "Click",
    },
    {
      text: "Below",
    },
    {
      text: "to Explore",
    },
    {
      text: "an Interactive",
    },
    {
      text: "List of To-Dos!",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center bg-slate-100 min-h-screen p-8 pb-20 gap-5 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text"><TypewriterEffectSmooth words={words} /></div>
      {showButton && (
        <div className="btn">
          <Link href={'/todos'}>
          <button className="px-8 py-2 rounded-md bg-yellow-500 text-white font-bold transition duration-200 hover:bg-yellow-100 hover:text-black border-2 border-transparent hover:border-yellow-500">
            Click Here
          </button>
          </Link>
          
        </div>
      )}

      
     
    </div>
  );
}
