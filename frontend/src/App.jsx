import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "./context/ProjectContext";
import { lazy, Suspense } from "react";

// Eager-load lightweight pages (instant navigation)
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Viewer3D from "./pages/Viewer3D";
import AILabAssistant from "./components/AILabAssistant";

// Lazy-load heavier pages (code-split into separate chunks)
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateProject = lazy(() => import("./pages/CreateProject"));
const RequirementForm = lazy(() => import("./pages/RequirementForm"));
const AIRecommendation = lazy(() => import("./pages/AIRecommendation"));
const Budget = lazy(() => import("./pages/Budget"));
const Network = lazy(() => import("./pages/Network"));
const Electrical = lazy(() => import("./pages/Electrical"));
const Reports = lazy(() => import("./pages/Reports"));

// Minimal loading spinner for lazy routes
function PageLoader() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(160deg, #0f172a, #1e293b)",
      color: "#38bdf8",
      fontSize: 16,
      fontWeight: 700,
    }}>
      <div style={{
        width: 44, height: 44,
        border: "4px solid #334155",
        borderTopColor: "#38bdf8",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
        marginRight: 16,
      }} />
      Loading 3D Laboratory Viewer Engine...
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function App() {
  return (
    <ProjectProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/3d" element={<Viewer3D />} />
            <Route path="/viewer" element={<Viewer3D />} />
            <Route path="/reports" element={<Reports />} />

            {/* 404 fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>

        {/* Global Floating AI Assistant Chatbot */}
        <AILabAssistant />
      </BrowserRouter>
    </ProjectProvider>
  );
}

export default App;