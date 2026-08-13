import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import RequirementForm from "./pages/RequirementForm";
import AIRecommendation from "./pages/AIRecommendation";
import Budget from "./pages/Budget";
import Network from "./pages/Network";
import Electrical from "./pages/Electrical";
import Viewer3D from "./pages/Viewer3D";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/requirements" element={<RequirementForm />} />
        <Route path="/ai" element={<AIRecommendation />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/network" element={<Network />} />
        <Route path="/electrical" element={<Electrical />} />
        <Route path="/viewer3d" element={<Viewer3D />} />

        {/* Emergency shortcut */}
        <Route path="*" element={<Viewer3D />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;