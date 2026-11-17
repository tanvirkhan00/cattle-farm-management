import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { FarmProvider } from './context/FarmContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { QuickActionModal } from './components/common/QuickActionModal';

// 18 Pages
import { Dashboard } from './pages/Dashboard';
import { AiAdvisor } from './pages/AiAdvisor';
import { BusinessPlanning } from './pages/BusinessPlanning';
import { SeasonalPlanner } from './pages/SeasonalPlanner';
import { SpacePlanner } from './pages/SpacePlanner';
import { CattleManagement } from './pages/CattleManagement';
import { BreedIntelligence } from './pages/BreedIntelligence';
import { FeedNutrition } from './pages/FeedNutrition';
import { HealthVeterinary } from './pages/HealthVeterinary';
import { DiseaseIntelligence } from './pages/DiseaseIntelligence';
import { VaccinationCalendar } from './pages/VaccinationCalendar';
import { PurchasePlanner } from './pages/PurchasePlanner';
import { FinancialManagement } from './pages/FinancialManagement';
import { DailyOperations } from './pages/DailyOperations';
import { InventoryManagement } from './pages/InventoryManagement';
import { KnowledgeCenter } from './pages/KnowledgeCenter';
import { ReportsAnalytics } from './pages/ReportsAnalytics';
import { SettingsPage } from './pages/Settings';

export const AppContent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col antialiased">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 min-h-screen
          ${collapsed ? 'lg:pl-20' : 'lg:pl-72'}
        `}
      >
        {/* Top Header */}
        <Header 
          onMenuClick={() => setMobileOpen(true)}
          onOpenQuickAction={() => setQuickActionOpen(true)}
        />

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 lg:p-6 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/advisor" element={<AiAdvisor />} />
            <Route path="/business-planning" element={<BusinessPlanning />} />
            <Route path="/seasonal-planner" element={<SeasonalPlanner />} />
            <Route path="/space-planner" element={<SpacePlanner />} />
            <Route path="/cattle" element={<CattleManagement />} />
            <Route path="/breeds" element={<BreedIntelligence />} />
            <Route path="/feed" element={<FeedNutrition />} />
            <Route path="/health" element={<HealthVeterinary />} />
            <Route path="/diseases" element={<DiseaseIntelligence />} />
            <Route path="/vaccination" element={<VaccinationCalendar />} />
            <Route path="/purchase-planner" element={<PurchasePlanner />} />
            <Route path="/financials" element={<FinancialManagement />} />
            <Route path="/operations" element={<DailyOperations />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/knowledge" element={<KnowledgeCenter />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Quick Action Modal Accessible From Everywhere */}
      <QuickActionModal
        isOpen={quickActionOpen}
        onClose={() => setQuickActionOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <FarmProvider>
          <AppContent />
        </FarmProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
