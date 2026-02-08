import { Link } from "react-router-dom";
import { BsFillSaveFill } from "react-icons/bs";
import { useProductContext } from "../context/ProductContext.jsx";
import axios from "axios";
import { useAuthContext } from "../context/Auth.jsx";
export default function ProductDetailsCard({ productData, result }) {
  const { setProductContext } = useProductContext();
  const { productContext } = useProductContext();
  const { currentUser } = useAuthContext();
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
    nutriscore_data,
    nutrient_levels,
    image_front_thumb_url
  } = productData;

  const handleSaveProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/products/saveproduct",
        {
          email: currentUser?.email,
          barcodeNumber: productContext?.id,
          productName: productData?.product_name,
          severityScore,
          image_url:productData?.image_front_small_url
        },
        { withCredentials: true },
      );
      alert(response.data.message);
    } catch (error) {
      console.error("❌ Error saving product:", error);
      alert("Failed to save product. Check console for details.");
    }
  };
  const medicalRiskRules = [
    { label: "High sugar content", condition: nutriments?.sugars_100g > 15 },
    {
      label: "High saturated fat",
      condition: nutriments?.saturated_fat_100g > 5,
    },
    {
      label: "High calorie density",
      condition: nutriments?.energy_kcal_100g > 400,
    },
    {
      label: "Contains palm oil",
      condition: ingredients_analysis_tags?.includes("en:palm-oil"),
    },
    {
      label: "Not suitable for vegan diets",
      condition: ingredients_analysis_tags?.includes("en:non-vegan"),
    },
  ];
  const attentionCount = medicalRiskRules.filter(
    (rule) => rule.condition,
  ).length;
  const allergenCount = allergens_tags?.length || 0;
  const severityScore = attentionCount + allergenCount;
  const getSeverityColor = (score) => {
    if (score === 0) return "bg-blue-500";
    if (score <= 2) return "bg-green-500";
    if (score <= 4) return "bg-yellow";
    if (score <= 6) return "bg-orange";
    if (score >= 7) return "bg-red";
  };
  const severityColor = getSeverityColor(severityScore);
  const allergenList = allergens_tags?.length
    ? allergens_tags.map((tag) => tag.replace("en:", "")).join(", ")
    : allergens || "None listed";
  const sortedIngredients = ingredients
    ? [...ingredients]
        .sort((a, b) => (b.percent_estimate || 0) - (a.percent_estimate || 0))
        .filter(
          (item, index, self) =>
            index === self.findIndex((i) => i.id === item.id),
        )
    : [];
  return (
    <div className="relative bg-white rounded-md shadow-md p-4 border border-gray-200 w-[95%] max-h-[79.5dvh] overflow-auto mt-[5.7dvh]">
      <h2 className="text-lg font-bold mb-[1dvh]">
        Scanned Barcode:
        <span className="text-lg font-semibold text-green-600">{result}</span>
      </h2>
      {/* 🟢 Circular Severity Indicator */}
      <div className="absolute top-4 right-4 flex gap-x-[1dvh] items-center">
        <BsFillSaveFill
          onClick={handleSaveProduct}
          className="text-dimgreen scale-150 cursor-pointer"
        />
        <div
          title="Product Score"
          className={`${severityColor} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md`}
        >
          {severityScore}
        </div>
      </div>
      <img
        src={image_front_url || image_url}
        alt={product_name || "Product Image"}
        className="w-full h-auto rounded-md mb-3 aspect-square border"
      />
      <p>
        <strong>Name:</strong> {product_name || "N/A"}
      </p>
      <p>
        <strong>Brand:</strong> {brands || "N/A"}
      </p>
      <p>
        <strong>Quantity:</strong> {quantity || "N/A"}
      </p>
      <p>
        <strong>Categories:</strong> {categories || "N/A"}
      </p>
      <p>
        <strong>Sources:</strong>
        <a
          className="text-blue-700 underline font-semibold"
          href="https://world.openfoodfacts.org/"
        >
          Open Food Facts
        </a>
      </p>
      {/* 🩺 Medical Risk Flags */}
      {medicalRiskRules.some((rule) => rule.condition) && (
        <div className="mt-4">
          <h2 className="font-bold text-red-700">Attentions:</h2>
          <ol className="list-decimal list-inside text-sm text-red-600">
            {medicalRiskRules.map((rule, index) =>
              rule.condition ? <li key={index}>⚠️ {rule.label}</li> : null,
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
                      {item.percent_estimate > 0
                        ? `${item.percent_estimate.toFixed(1)}%`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">
            No detailed ingredient data available.
          </p>
        )}
      </div>
      {/* 🧬 Allergens */}
      <div className="mt-4">
        <p>
          <strong>Allergens:</strong> {allergenList}
        </p>
      </div>
      {/* 🟢 Nutri-Score Breakdown */}
      {nutriscore_data?.components && (
        <div className="mt-6">
          <h2 className="font-bold text-green-700 mb-2">
            Nutri-Score Breakdown
          </h2>
          {/* Negative Components */}
          <div className="mb-4">
            <p className="font-semibold text-red-600">Negative Points</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-300 rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Component</th>
                    <th className="px-4 py-2 text-left">Value</th>
                    <th className="px-4 py-2 text-left">Unit</th>
                    <th className="px-4 py-2 text-left">Points</th>
                    <th className="px-4 py-2 text-left">Max Points</th>
                  </tr>
                </thead>
                <tbody>
                  {nutriscore_data.components.negative.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 capitalize">{item.id}</td>
                      <td className="px-4 py-2">{item.value}</td>
                      <td className="px-4 py-2">{item.unit}</td>
                      <td className="px-4 py-2">{item.points}</td>
                      <td className="px-4 py-2">{item.points_max}</td>
                    </tr>
                  ))}
                  <tr className="border-t bg-red-50 font-semibold">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2">—</td>
                    <td className="px-4 py-2">—</td>
                    <td className="px-4 py-2">
                      {nutriscore_data.components.negative.reduce(
                        (sum, item) => sum + item.points,
                        0,
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {nutriscore_data.components.negative.reduce(
                        (sum, item) => sum + item.points_max,
                        0,
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Positive Components */}
          <div>
            <p className="font-semibold text-green-600">Positive Points</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-300 rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Component</th>
                    <th className="px-4 py-2 text-left">Value</th>
                    <th className="px-4 py-2 text-left">Unit</th>
                    <th className="px-4 py-2 text-left">Points</th>
                    <th className="px-4 py-2 text-left">Max Points</th>
                  </tr>
                </thead>
                <tbody>
                  {nutriscore_data.components.positive.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 capitalize">{item.id}</td>
                      <td className="px-4 py-2">{item.value}</td>
                      <td className="px-4 py-2">{item.unit}</td>
                      <td className="px-4 py-2">{item.points}</td>
                      <td className="px-4 py-2">{item.points_max}</td>
                    </tr>
                  ))}
                  {/* ✅ Summary Row for Positive */}
                  <tr className="border-t bg-green-50 font-semibold">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2">—</td>
                    <td className="px-4 py-2">—</td>
                    <td className="px-4 py-2">
                      {nutriscore_data.components.positive.reduce(
                        (sum, item) => sum + item.points,
                        0,
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {nutriscore_data.components.positive.reduce(
                        (sum, item) => sum + item.points_max,
                        0,
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* 🥗 Nutrient Levels */}{" "}
              <div className="mt-6">
                {" "}
                <h2 className="font-bold text-purple-700 mb-2">
                  Nutrient Levels
                </h2>{" "}
                {productData?.nutrient_levels ? (
                  <div className="overflow-x-auto">
                    {" "}
                    <table className="min-w-full text-sm border border-gray-300 rounded-md">
                      {" "}
                      <thead className="bg-gray-100">
                        {" "}
                        <tr>
                          {" "}
                          <th className="px-4 py-2 text-left">Nutrient</th>{" "}
                          <th className="px-4 py-2 text-left">Level</th>{" "}
                        </tr>{" "}
                      </thead>{" "}
                      <tbody>
                        {" "}
                        {Object.entries(productData.nutrient_levels).map(
                          ([nutrient, level], index) => (
                            <tr key={index} className="border-t">
                              {" "}
                              <td className="px-4 py-2 capitalize">
                                {nutrient}
                              </td>{" "}
                              <td
                                className={`px-4 py-2 font-semibold ${level === "high" ? "text-red" :(( level === "moderate" )? "text-yellow" : "text-green-600")}`}
                              >
                                {" "}
                                {level.toString().toUpperCase()}{" "}
                              </td>{" "}
                            </tr>
                          ),
                        )}{" "}
                      </tbody>{" "}
                    </table>{" "}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No nutrient level data available.
                  </p>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 🔗 Ask AI Button */}
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
