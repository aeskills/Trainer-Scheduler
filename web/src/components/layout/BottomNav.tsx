import React from "react";
import { NavLink } from "react-router-dom";
import { Calendar, PlusCircle, Bell, User, LayoutDashboard, Users, FileText, Settings, TrendingUp } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const BottomNav: React.FC = () => {
  const { role } = useAuth();
  const isAdmin = role === "admin";

  const trainerLinks = [
    { to: "/", label: "Calendar", icon: <Calendar className="w-5 h-5" />, end: true },
    { to: "/today", label: "Today", icon: <PlusCircle className="w-5 h-5" /> },
    { to: "/my-performance", label: "Impact", icon: <TrendingUp className="w-5 h-5" /> },
    { to: "/notifications", label: "Alerts", icon: <Bell className="w-5 h-5" /> },
    { to: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  const adminLinks = [
    { to: "/admin", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" />, end: true },
    { to: "/admin/performance", label: "Analytics", icon: <TrendingUp className="w-5 h-5" /> },
    { to: "/admin/trainers", label: "Trainers", icon: <Users className="w-5 h-5" /> },
    { to: "/admin/visits", label: "Visits", icon: <FileText className="w-5 h-5" /> },
  ];

  const links = isAdmin ? adminLinks : trainerLinks;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 sm:hidden pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full gap-1 text-[11px] font-semibold transition-colors ${
                isActive
                  ? "text-violet-600 dark:text-violet-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
