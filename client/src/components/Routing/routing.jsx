import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  ProjectsPage,
  SkillsPage,
  ContactPage,
  Admin,
  ProjectPage,
} from "@pages";
import ProtectedRoute from "../Wrapper/ProtectedRote";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/projects" />} />
      <Route path="*" element={<Navigate to="/projects" />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:id" element={<ProjectPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/contacts" element={<ContactPage />} />
    </Routes>
  );
};

export default Routing;
