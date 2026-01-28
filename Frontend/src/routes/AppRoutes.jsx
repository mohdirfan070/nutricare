import { lazy } from "react";
const Home = lazy(() => import(".../pages/Home.jsx"));
const Disclaimer = lazy(() => import("../pages/Disclaimer.jsx"));

const delayFunction = (factory, delay = 2000) =>
  new Promise((res) => setTimeout(() => res(factory()), delay));

const Scanner = lazy(() =>
  delayFunction(() => import("../pages/Scanner.jsx"), 500)
);
const History = lazy(() => import("../pages/History.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Signup = lazy(() => import("../pages/Signup.jsx"));
const BarcodeScanner = lazy(() => import("../pages/BarcodeScan.jsx"));
const IngredientsScan = lazy(() => import("../pages/IngredientsScan.jsx"));
const ChatWithAi = lazy(() => import("../pages/Chatwithai.jsx"));
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Outlet.jsx";
import Profile from "../pages/Profile.jsx";

export default function AppRoutes() {
  return (
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
  );
}
