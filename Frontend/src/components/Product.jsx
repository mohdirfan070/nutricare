import React from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext.jsx";

export default function ProductDetailsCard({ productData, result }) {
  const { setProductContext } = useProductContext();

  if (!productData) {
    return <p className="text-gray-500">Fetching Please Wait!</p>;
  }

  const {
    image_front_url,
    image_url,
    product_name,
    brands,
    quantity,
    categories,
    ingredients,
    allergens_tags,
    allergens,
    ingredients_analysis_tags,
    nutriments,
  } = productData;

  const medicalRiskRules = [
    { label: "High sugar content", condition: nutriments?.sugars_100g > 15 },
    { label: "High saturated fat", condition: nutriments?.saturated_fat_100g > 5 },
    { label: "High calorie density", condition: nutriments?.energy_kcal_100g > 400 },
    { label: "Contains palm oil", condition: ingredients_analysis_tags?.includes("en:palm-oil") },
    { label: "Not suitable for vegan diets", condition: ingredients_analysis_tags?.includes("en:non-vegan") },
  ];

  // ✅ Compute severity score
  const attentionCount = medicalRiskRules.filter((rule) => rule.condition).length;
  const allergenCount = allergens_tags?.length || 0;
  const severityScore = attentionCount + allergenCount;

  // ✅ Map severity to color
  const getSeverityColor = (score) => {
    if (score === 0) return "bg-blue-500"; // neutral
    if (score <= 2) return "bg-green-500";
    if (score <= 4) return "bg-yellow";
    if (score <= 6) return "bg-orange-500";
     if(score>=6) return "bg-red"; // severe
  };

  const severityColor = getSeverityColor(severityScore);

  const allergenList = allergens_tags?.length
    ? allergens_tags.map((tag) => tag.replace("en:", "")).join(", ")
    : allergens || "None listed";

  const sortedIngredients = ingredients
    ? [...ingredients]
        .sort((a, b) => (b.percent_estimate || 0) - (a.percent_estimate || 0))
        .filter((item, index, self) => index === self.findIndex((i) => i.id === item.id))
    : [];

  return (
    <div className="relative bg-white rounded-md shadow-md p-4 border border-gray-200 w-[95%] max-h-[79.5dvh] overflow-auto mt-[5.7dvh]">
      <h2 className="text-lg font-bold mb-[1dvh]">
        Scanned Barcode:{" "}
        <span className="text-lg font-semibold text-green-600">{result}</span>
      </h2>

      {/* 🟢 Circular Severity Indicator */}
      <div className="absolute top-4 right-4 flex flex-col items-center">
        <div
          className={` ${severityColor} w-8 h-8 rounded-full  flex items-center justify-center text-white font-bold shadow-md ` }
        >
          {severityScore}
        </div>
        {/* <span className="text-xs mt-1 text-gray-600">Risk Score</span> */}
      </div>

      <img
        src={image_front_url || image_url}
        alt={product_name || "Product Image"}
        className="w-full h-auto rounded-md mb-3 aspect-square border"
      />

      <p><strong>Name:</strong> {product_name || "N/A"}</p>
      <p><strong>Brand:</strong> {brands || "N/A"}</p>
      <p><strong>Quantity:</strong> {quantity || "N/A"}</p>
      <p><strong>Categories:</strong> {categories || "N/A"}</p>

      {/* 🩺 Medical Risk Flags */}
      {medicalRiskRules.some((rule) => rule.condition) && (
        <div className="mt-4">
          <h2 className="font-bold text-red-700">Attentions:</h2>
          <ol className="list-decimal list-inside text-sm text-red-600">
            {medicalRiskRules.map((rule, index) =>
              rule.condition ? <li key={index}>⚠️ {rule.label}</li> : null
            )}
          </ol>
        </div>
      )}

      {/* 🍽️ Ingredients Table */}
      <div className="mt-4">
        <p className="font-semibold mb-2">Ingredients Breakdown:</p>
        {sortedIngredients?.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Ingredient</th>
                  <th className="px-4 py-2 text-left">%(known)</th>
                </tr>
              </thead>
              <tbody>
                {sortedIngredients.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{item.text || "N/A"}</td>
                    <td className="px-4 py-2">
                      {item.percent_estimate > 0 ? `${item.percent_estimate.toFixed(1)}%` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No detailed ingredient data available.</p>
        )}
      </div>

      {/* 🧬 Allergens */}
      <div className="mt-4">
        <p><strong>Allergens:</strong> {allergenList}</p>
      </div>

      <Link to={"/chatwithai"}>
        {productData && (
          <button
            onClick={() => setProductContext({ ...productData })}
            className="w-[100%] mt-4 px-4 py-2 bg-[#149e52] text-white rounded hover:bg-green-400"
          >
            Ask AI
          </button>
        )}
      </Link>
    </div>
  );
}
