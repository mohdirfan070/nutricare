import { Link } from "react-router-dom";

function Scanner() {
  return (
    <div className="flex flex-col justify-start gap-y-[4dvh] h-[70dvh] p-[3dvh]">
      <section className="">
        <h2 className="text-[26px] font-medium font-3-regular text-center ">
          Select to <span className="text-darkgreen">Scan</span>
        </h2>
      </section>
      <section className="flex flex-col gapy-[1dvh]">
        <Link
          to={"/barcode"}
          className="px-[8dvh] py-[1.3dvh] text-[2.3dvh]  text-white font-semibold font-3-regular  bg-dimgreen rounded-[1dvh] border-[0.1rem]  hover:border-black  mb-[2dvh] text-center"
        >
         Barcode <br />
        </Link>
        <Link
          to={"/ingredient"}
          className="px-[8dvh] py-[1.3dvh] text-[2.3dvh] text-darkgreen font-semibold font-3-regular bg-white rounded-[1dvh] border-[0.1rem] border-sharpgreen  hover:border-black text-center"
        >
          Ingredients
        </Link>
      </section>
    </div>
  );
}

export default Scanner;
