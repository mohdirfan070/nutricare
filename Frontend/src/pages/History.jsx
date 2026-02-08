import { useEffect, useState } from "react";
import { useAuthContext } from "../context/Auth";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function History() {
  const { currentUser } = useAuthContext();
  const [savedProducts, setSavedProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // ✅ popup message

  const getSeverityColor = (score) => {
    if (score === 0) return "bg-blue-500";
    if (score <= 2) return "bg-green-500";
    if (score <= 4) return "bg-yellow";
    if (score <= 6) return "bg-orange";
    if (score >= 7) return "bg-red";
  };

  const fetchSavedProducts = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/products/savedproducts`,
        { email: currentUser?.email },
        { withCredentials: true },
      );
      setSavedProducts(res.data.savedProducts || []);
    } catch (err) {
      console.error("Error fetching saved products:", err);
    }
  };

  useEffect(() => {
    currentUser?.email && fetchSavedProducts();
  }, [currentUser?.email]);

 const handleDelete = async (barcodeNumber) => {
  try {
    const res = await axios.delete("http://localhost:8080/products/deletesavedproduct", {
      data: { email: currentUser?.email, barcodeNumber },
      withCredentials: true,
    });

    // Update local state with returned savedProducts
    setSavedProducts(res.data.savedProducts || []);

    // Show success popup
    setSuccessMessage("Product deleted successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  } catch (err) {
    console.error("Error deleting product:", err);
    alert("Failed to delete product.");
  }
};


  return (
    <div className="p-6 h-[75dvh] w-[98dvw] overflow-auto bg-white relative">
      {/* ✅ Success Popup */}
      {successMessage && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          {successMessage}
        </div>
      )}

      {savedProducts.length === 0 ? (
        <div className="h-[75dvh] w-[90dvw] bg-white flex justify-center items-center mt-3">
          <div className="text-center">
            <p className="text-lg mb-4">No saved products yet.</p>
            <Link
              className="text-white bg-dimgreen font-semibold px-4 py-2 rounded hover:bg-green-500"
              to={"/barcode"}
            >
              Add Product
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4 border-b-4 pb-4">
            Saved Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {savedProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col overflow-hidden"
              >
                <img
                  className="w-full h-48 object-cover border-b"
                  src={product.image_front_small_url || product.image_url}
                  alt={product.productName || "Product Image"}
                />

                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">
                        {product.productName?.toString().toUpperCase() ||
                          "Unnamed Product"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Barcode:{" "}
                        <span className="text-blue-700 font-semibold">
                          {product.barcodeNumber}
                        </span>
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-sm font-bold text-white ${getSeverityColor(
                        Number(product.severityScore),
                      )}`}
                    >
                      Score: {product.severityScore ?? "N/A"}
                    </span>
                  </div>

                  <div className="mt-auto flex justify-between gap-2">
                    <a
                      className="px-3 py-2 rounded text-sm font-bold text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                      href={`https://world.openfoodfacts.org/product/${product.barcodeNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                    <button
                      onClick={() => handleDelete(product.barcodeNumber)}
                      className="border-2 border-red text-red-500 px-3 py-2 flex items-center gap-2 rounded font-semibold hover:bg-red-50 text-red"
                    >
                      <MdDelete className="text-red-500 scale-125 text-red" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
