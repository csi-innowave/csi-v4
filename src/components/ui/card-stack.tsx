"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; 
        newArray.unshift(newArray.pop()!); 
        return newArray;
      });
    }, 4000);
  };

  return (
    <div className="relative h-60 w-72 md:h-72 md:w-[450px] flex justify-center items-center">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-[#111111] border border-white/[0.1] shadow-xl shadow-black/50 rounded-3xl p-8 flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
              width: "100%",
              height: "100%",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="font-normal text-white/70 h-full flex flex-col justify-center pb-4">{card.content}</div>
            <div>
              <p className="text-violet-500 font-bold text-lg">
                {card.name}
              </p>
              <p className="text-white/40 font-medium text-sm mt-1">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
