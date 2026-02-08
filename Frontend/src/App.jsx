import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { lazy } from "react";
import { Suspense } from "react";
import Layout from "./components/Outlet.jsx";
import Profile from "./pages/Profile.jsx";
import ProductContextComponent from "./context/ProductContext.jsx";

import AuthContextComponent from "./context/Auth";

if (localStorage.getItem("token")) {
  console.log(localStorage.getItem("token"));
} else {
  // localStorage.setItem("token", "123456789");
}

// Delay function
const delayFunction = (factory, delay = 2000) =>
  new Promise((res) => setTimeout(() => res(factory()), delay));

import { Circles } from "react-loader-spinner";

// Delay in Loading the component for dev purpose
// const Scanner = lazy(() => delayFunction(() => import("./pages/Scanner.jsx"), 3000));
// const Chatwithai = lazy(() => import("./pages/Chatwithai.jsx"));

const Home = lazy(() => import("./pages/Home.jsx"));
const Disclaimer = lazy(() => import("./pages/Disclaimer.jsx"));
const Scanner = lazy(() =>
  delayFunction(() => import("./pages/Scanner.jsx"), 500),
);
const History = lazy(() => import("./pages/History.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const BarcodeScanner = lazy(() => import("./pages/BarcodeScan.jsx"));
const IngredientsScan = lazy(() => import("./pages/IngredientsScan.jsx"));
const ChatWithAi = lazy(() => import("./pages/ChatWithAi.jsx"));

function App() {
  return (
    <>
      {/* <TopNavbar /> */}
      <BrowserRouter>
        <AuthContextComponent>
          {" "}
          {/* 👈 ADD THIS */}
          <Suspense
            fallback={
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center ">
                Loading...
                <br />
                <Circles
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass="scale-75"
                  visible={true}
                />
              </div>
            }
          >
            <ProductContextComponent>
              <Routes>
                <Route path="/" element={<Layout />}>
                  {/* DEFAULT ROUTE */}
                  <Route index element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="disclaimer" element={<Disclaimer />} />
                  <Route path="scanner" element={<Scanner />} />
                  <Route path="barcode" element={<BarcodeScanner />} />
                  <Route path="ingredient" element={<IngredientsScan />} />
                  <Route path="chatwithai" element={<ChatWithAi />} />
                  <Route path="history" element={<History />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="login" element={<Login />} />
                </Route>
              </Routes>
            </ProductContextComponent>
          </Suspense>
        </AuthContextComponent>{" "}
        {/* 👈 CLOSE HERE */}
      </BrowserRouter>
    </>
  );
}

export default App;
