import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar.jsx';
import Sidebar from './components/Layout/Sidebar.jsx';
import HomePage from './pages/HomePage.jsx';
import GeneratePage from './pages/GeneratePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-bg-primary bg-grid-pattern flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/generate"
          element={
            <AppLayout>
              <GeneratePage />
            </AppLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
