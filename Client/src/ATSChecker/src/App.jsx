import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Analysis from "./pages/analysis";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ats-checker/analysis" element={<Analysis />} />
        <Route path="/interview-prep" element={<Interview />} />
      </Route>
    </Routes>
  );
}