import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { useAuth } from "../../hooks/useAuth";
import { Calendar, PlusCircle, Bell, User, LayoutDashboard, Users, FileText, Settings, Database, Activity, TrendingUp } from "lucide-react";

export const AppShell: React.FC = () => {
  const { role } = useAuth();
  const isAdmin = role === "admin";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-[#090714]">
      <TopBar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 sm:pb-12 flex gap-8">
        {/* Desktop Sidebar Navigation for Admin & Trainer */}
        <aside className="hidden sm:flex flex-col w-60 shrink-0 gap-6">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-3 shadow-sm">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {isAdmin ? "Admin Console" : "Trainer Menu"}
            </div>

            <nav className="flex flex-col gap-1 mt-1">
              {isAdmin ? (
                <>
                  <SidebarLink to="/admin" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" end />
                  <SidebarLink to="/admin/calendar" icon={<Calendar className="w-4 h-4 text-violet-500" />} label="Trainer Calendar" />
                  <SidebarLink to="/admin/performance" icon={<TrendingUp className="w-4 h-4 text-violet-500" />} label="Performance & Analytics" />
                  <SidebarLink to="/admin/trainers" icon={<Users className="w-4 h-4" />} label="Trainers" />
                  <SidebarLink to="/admin/visits" icon={<FileText className="w-4 h-4" />} label="All Visits" />
                  <SidebarLink to="/admin/export" icon={<Database className="w-4 h-4" />} label="Export Data" />
                  <SidebarLink to="/admin/logs" icon={<Activity className="w-4 h-4" />} label="System Logs" />
                  <SidebarLink to="/admin/settings" icon={<Settings className="w-4 h-4" />} label="Settings" />
                </>
              ) : (
                <>
                  <SidebarLink to="/" icon={<Calendar className="w-4 h-4" />} label="Visit Calendar" end />
                  <SidebarLink to="/today" icon={<PlusCircle className="w-4 h-4" />} label="Today's Visit" />
                  <SidebarLink to="/my-performance" icon={<TrendingUp className="w-4 h-4 text-violet-500" />} label="My Performance" />
                  <SidebarLink to="/notifications" icon={<Bell className="w-4 h-4" />} label="Notifications" />
                  <SidebarLink to="/profile" icon={<User className="w-4 h-4" />} label="My Profile" />
                </>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  );
};

const SidebarLink: React.FC<{ to: string; icon: React.ReactNode; label: string; end?: boolean }> = ({
  to,
  icon,
  label,
  end,
}) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
        isActive
          ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);
