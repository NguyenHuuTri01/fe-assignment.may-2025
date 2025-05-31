import React, { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom"; // Thêm Outlet vào đây

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Administrations from "./pages/Administrations";
import Documentation from "./pages/Documentation";
import Overview from "./pages/Overview/Overview";
import Inquiries from "./pages/Inquiries/Inquiries";
import Estimator from "./pages/Estimator/Estimator";
import Projects from "./pages/Projects/Projects";
import AdminLayout from "./components/AdminLayout";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import ProjectSubDetail from "./pages/Projects/ProjectSubDetail";

function App() {
  const [contentKey, setContentKey] = useState("overview");

  const onSelectContent = (key) => {
    setContentKey(key);
  };

  return (
    <div className="flex h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex h-screen w-screen">
              <Sidebar onSelectContent={onSelectContent} />
              <div className="flex-1 flex flex-col ml-[22px]">
                <Header contentKey={contentKey} />
                <div className="flex-1 p-4 overflow-auto bg-gray-50">
                  <Outlet />
                </div>
              </div>
            </div>
          }
        >
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="estimator" element={<Estimator />} />
          <Route path="projects" element={<Projects />}>
            <Route path=":projectId" element={<ProjectDetail />}>
              <Route path=":detailId" element={<ProjectSubDetail />} />
            </Route>
          </Route>
        </Route>

        <Route path="/administration" element={<AdminLayout />}>
          <Route index element={<Administrations />} />
        </Route>
        <Route path="/documentation" element={<AdminLayout />}>
          <Route index element={<Documentation />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;