
export default function Disclaimer() {
  return (
     <div className="bg-white mt-[7dvh] h-[75dvh] w-[43dvh] rounded-[12px] p-[24px]  overflow-x-auto">
      <section className="flex flex-col">
        <div className="flex flex-col mb-[2dvh]">
          <h2 className="text-red font-3-semibold text-[2.9dvh]">
            Disclaimer
          </h2>
          <p className="text-justify">
           <b> Informational Use Only</b> The ingredient insights provided are for
            informational purposes and may not reflect the most current or
            complete data. Always consult packaging or professionals when in
            doubt. <br />
            <b> Best Effort Accuracy</b> We strive to deliver accurate and
            helpful ingredient analysis, but some data may be approximate or
            subject to change. Your feedback helps us improve!
             No Medical Advice <br />
            <b>This app does not offer medical or dietary advice</b> For
            health-related decisions, please consult a qualified professional.
            Dynamic Data Sources Ingredient details are sourced from various
            databases and may vary by region or brand. We’re continuously
            updating to serve you better.
            <br />
             <b>User-Aware Transparency</b> While we aim
            for precision, some ingredient interpretations may differ based on
            context. Use this tool as a guide, not a guarantee.
          </p>
          <button className="mt-[3dvh] bg-sharpgreen text-light font-4-regular p-[1dvh] rounded-[24px] text-[2dvh] hover:bg-dimgreen " >Agree & Continue</button>
        </div>
      </section>
    </div>
  )
}
