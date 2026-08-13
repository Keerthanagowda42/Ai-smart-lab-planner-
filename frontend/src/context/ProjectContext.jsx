import React, { createContext, useContext, useState, useEffect } from "react";
import { generateLabPlan } from "../utils/aiPlanner";

const ProjectContext = createContext();

const initialProject = {
  id: "proj-001",
  name: "AI & Data Science Computer Lab",
  institution: "HKBK College of Engineering",
  roomLength: 40, // feet
  roomWidth: 30,  // feet
  roomHeight: 12, // feet
  numStudents: 28,
  numComputers: 28,
  budget: 2500000,
  doorPosition: "front-left",
  windowCount: 4,
  seatingPreference: "grid", // 'grid', 'u-shape', 'pods'
  labType: "ai-ds",          // 'basic', 'ai-ds', 'cad-graphics', 'networking'
  networkReq: "gigabit-redundant",
  upsBackup: "30-min",
  acUnits: 2,
};

export function ProjectProvider({ children }) {
  const [projectData, setProjectData] = useState(() => {
    const saved = localStorage.getItem("ai_lab_project_data");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Reset if saved data has outdated defaults
      if (parsed.numComputers === 36) {
        localStorage.removeItem("ai_lab_project_data");
        return initialProject;
      }
      return parsed;
    }
    return initialProject;
  });

  const [aiPlan, setAiPlan] = useState(() => {
    return generateLabPlan(projectData);
  });

  // Re-calculate plan whenever projectData changes
  useEffect(() => {
    const newPlan = generateLabPlan(projectData);
    setAiPlan(newPlan);
    localStorage.setItem("ai_lab_project_data", JSON.stringify(projectData));
  }, [projectData]);

  const updateProject = (newFields) => {
    setProjectData((prev) => ({
      ...prev,
      ...newFields,
    }));
  };

  const resetToDefault = () => {
    setProjectData(initialProject);
  };

  return (
    <ProjectContext.Provider
      value={{
        projectData,
        updateProject,
        resetToDefault,
        aiPlan,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
