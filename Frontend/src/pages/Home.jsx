import { useEffect, useState } from "react";

const list = [
  "Chocolate contains antioxidants like flavonoids, which may support heart health.",
  "Pizza offers carbs, fats, and protein—balance depends on toppings and crust type.",
  "Bananas are rich in potassium, supporting muscle function and heart health.",
  "Purple carrots have more anthocyanins, powerful antioxidants than orange ones.",
  "Honey contains trace enzymes and antioxidants, but is mostly sugar.",
  "Apples provide fiber and vitamin C, aiding digestion and immunity.",
  "Garlic contains allicin, known for anti-inflammatory and cholesterol-lowering effects.",
  "Brown and white eggs have equal protein, fat, and vitamin content.",
  "Bread is a major source of carbohydrates and B vitamins.",
  "Milk offers calcium, protein, and vitamin D for bone strength.",
  "Pineapples contain bromelain, an enzyme that aids digestion and reduces inflammation.",
  "Tomatoes are high in lycopene, an antioxidant linked to reduced cancer risk.",
  "Broccoli packs fiber, vitamin C, and plant-based protein.",
  "Grapes contain resveratrol, which may support heart and brain health.",
  "Sushi rice provides carbs; fish adds omega-3s and lean protein.",
  "Oranges are loaded with vitamin C and flavonoids for immune support.",
  "Corn is a good source of fiber and B vitamins.",
  "Green tea is rich in catechins, antioxidants that may boost metabolism.",
  "Burgers offer protein and iron, but excess red meat may raise health risks.",
  "Cotton candy is pure sugar—zero nutritional value beyond calories.",
];

function getRandomFacts() {
  const result = new Set();
  while (result.size < 6) {
    const num = Math.floor(Math.random() * list.length);
    result.add(num);
  }
  return Array.from(result).map((index) => list[index]);
}

export default function Home() {
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    setFacts(getRandomFacts());
  }, []);

  return (
    <div className="bg-white mt-[1dvh] h-[75dvh] w-[43dvh] rounded-[12px] p-[24px]  overflow-x-auto scroll-smooth">
      <section className="flex flex-col">
        <div className="flex mb-[2dvh]">
          <img className="h-[38.25px]" src="./src/assets/document.svg" alt="" />
          <h2 className="text-darkgreen font-3-semibold text-[2.9dvh]">
            Did You Know?
          </h2>
        </div>
        <ul className="list-disc pl-[16px] text-[16px] text-gray-700 ">
          {facts.map((fact, idx) => (
            <li
              className="text-[2.5dvh]  font-3-regular  text-black text-justify"
              key={idx}
            >
              {fact}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
