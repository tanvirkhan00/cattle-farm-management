import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Bot, Briefcase, Calendar, Grid3X3,
  Boxes, Award, Apple, Stethoscope, ShieldAlert,
  Syringe, ShoppingCart, DollarSign, CheckSquare,
  Package, BookOpen, BarChart3, Settings, ChevronLeft,
  ChevronRight, Sparkles, AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useFarm } from '../../context/FarmContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) => {
  const { language, t } = useLanguage();
  const { metrics } = useFarm();
  const location = useLocation();

  const navigationItems = [
    { id: 'overview', path: '/', labelKey: 'nav.overview', icon: LayoutDashboard },
    { 
      id: 'ai-advisor', 
      path: '/advisor', 
      labelKey: 'nav.ai_advisor', 
      icon: Bot, 
      highlight: true,
      badge: 'AI'
    },
    { id: 'business-planning', path: '/business-planning', labelKey: 'nav.business_planning', icon: Briefcase },
    { id: 'seasonal-planner', path: '/seasonal-planner', labelKey: 'nav.seasonal_planner', icon: Calendar },
    { id: 'space-planner', path: '/space-planner', labelKey: 'nav.space_planner', icon: Grid3X3 },
    { 
      id: 'cattle-management', 
      path: '/cattle', 
      labelKey: 'nav.cattle_management', 
      icon: Boxes,
      badge: metrics.totalCattle ? `${metrics.totalCattle}` : undefined
    },
    { id: 'breed-intelligence', path: '/breeds', labelKey: 'nav.breed_intelligence', icon: Award },
    { id: 'feed-nutrition', path: '/feed', labelKey: 'nav.feed_nutrition', icon: Apple },
    { 
      id: 'health-veterinary', 
      path: '/health', 
      labelKey: 'nav.health_veterinary', 
      icon: Stethoscope,
      alertCount: metrics.underTreatmentCattle > 0 ? metrics.underTreatmentCattle : undefined
    },
    { id: 'disease-intelligence', path: '/diseases', labelKey: 'nav.disease_intelligence', icon: ShieldAlert },
    { 
      id: 'vaccination-calendar', 
      path: '/vaccination', 
      labelKey: 'nav.vaccination_calendar', 
      icon: Syringe,
      badge: metrics.upcomingVaccinationsCount > 0 ? `${metrics.upcomingVaccinationsCount}` : undefined
    },
    { id: 'purchase-planner', path: '/purchase-planner', labelKey: 'nav.purchase_planner', icon: ShoppingCart },
    { id: 'financial-management', path: '/financials', labelKey: 'nav.financial_management', icon: DollarSign },
    { 
      id: 'daily-operations', 
      path: '/operations', 
      labelKey: 'nav.daily_operations', 
      icon: CheckSquare,
      badge: metrics.pendingTasksCount > 0 ? `${metrics.pendingTasksCount}` : undefined
    },
    { 
      id: 'inventory', 
      path: '/inventory', 
      labelKey: 'nav.inventory', 
      icon: Package,
      alertCount: metrics.lowStockItemsCount > 0 ? metrics.lowStockItemsCount : undefined
    },
    { id: 'knowledge-center', path: '/knowledge', labelKey: 'nav.knowledge_center', icon: BookOpen },
    { id: 'reports-analytics', path: '/reports', labelKey: 'nav.reports_analytics', icon: BarChart3 },
    { id: 'settings', path: '/settings', labelKey: 'nav.settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white border-r border-stone-200 transition-all duration-300 shadow-soft lg:shadow-none
          ${collapsed ? 'w-20' : 'w-72'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-stone-100 bg-forest-900 text-white">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-forest-600 flex items-center justify-center text-white font-bold shadow-glow flex-shrink-0">
              🐄
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm tracking-tight text-white truncate">
                  {language === 'bn' ? 'স্মার্ট ক্যাটেল ফার্ম' : 'Smart Cattle Farm'}
                </span>
                <span className="text-[10px] text-forest-200 uppercase tracking-wider truncate font-medium">
                  {language === 'bn' ? 'খামার বুদ্ধিমত্তা ও পরিকল্পনা' : 'Farm Intelligence'}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-7 h-7 rounded-lg bg-forest-800 hover:bg-forest-700 text-forest-200 hover:text-white items-center justify-center transition"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center px-3 py-2.5 rounded-xl text-xs font-medium transition-all relative
                  ${isActive 
                    ? 'bg-forest-50 text-forest-800 font-semibold shadow-xs border border-forest-200/80' 
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'}
                  ${item.highlight && !isActive ? 'text-forest-700 font-semibold' : ''}
                `}
                title={collapsed ? t(item.labelKey) : undefined}
              >
                <div className={`flex items-center justify-center flex-shrink-0 ${collapsed ? 'w-full' : 'mr-3'}`}>
                  <Icon 
                    size={18} 
                    className={`transition-colors
                      ${isActive ? 'text-forest-700' : 'text-stone-400 group-hover:text-forest-600'}
                      ${item.highlight ? 'text-forest-600' : ''}
                    `} 
                  />
                </div>

                {!collapsed && (
                  <span className="truncate flex-1">
                    {t(item.labelKey)}
                  </span>
                )}

                {!collapsed && item.badge && (
                  <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-bold
                    ${item.highlight 
                      ? 'bg-forest-100 text-forest-800 border border-forest-300' 
                      : 'bg-stone-100 text-stone-600'}
                  `}>
                    {item.badge}
                  </span>
                )}

                {!collapsed && item.alertCount && (
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    {item.alertCount}
                  </span>
                )}

                {/* Active Indicator dot */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-forest-600 rounded-r-full" />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer info box */}
        {!collapsed && (
          <div className="p-3 border-t border-stone-100 bg-stone-50/50">
            <div className="p-2.5 rounded-xl bg-forest-900 text-white text-[11px] flex items-center space-x-2 shadow-xs">
              <Sparkles size={16} className="text-emerald-400 flex-shrink-0" />
              <div className="truncate">
                <p className="font-semibold">{language === 'bn' ? 'বাংলাদেশ কৃষি মানদণ্ড' : 'BD Agri Standards'}</p>
                <p className="text-[10px] text-forest-200">DLS & BLRI Verified</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
