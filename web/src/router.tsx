import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { useAuth } from "./hooks/useAuth";
import { Skeleton } from "./components/ui/Skeleton";
import { formatISTDate, getNowInIST } from "./lib/dates";

// Lazy-loaded pages for fast initial bundle
const Login = lazy(() => import("./pages/auth/Login").then((m) => ({ default: m.Login })));
const AdminLogin = lazy(() => import("./pages/auth/AdminLogin").then((m) => ({ default: m.AdminLogin })));
const Register = lazy(() => import("./pages/auth/Register").then((m) => ({ default: m.Register })));
const PendingApproval = lazy(() => import("./pages/auth/PendingApproval").then((m) => ({ default: m.PendingApproval })));

const CalendarPage = lazy(() => import("./pages/trainer/CalendarPage").then((m) => ({ default: m.CalendarPage })));
const VisitPage = lazy(() => import("./pages/trainer/VisitPage").then((m) => ({ default: m.VisitPage })));
const NotificationsPage = lazy(() => import("./pages/trainer/NotificationsPage").then((m) => ({ default: m.NotificationsPage })));
const ProfilePage = lazy(() => import("./pages/trainer/ProfilePage").then((m) => ({ default: m.ProfilePage })));
const MyPerformance = lazy(() => import("./pages/trainer/MyPerformance").then((m) => ({ default: m.MyPerformance })));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard").then((m) => ({ default: m.AdminDashboard })));
const AdminCalendar = lazy(() => import("./pages/admin/AdminCalendar").then((m) => ({ default: m.AdminCalendar })));
const AdminPerformance = lazy(() => import("./pages/admin/AdminPerformance").then((m) => ({ default: m.AdminPerformance })));
const AdminTrainers = lazy(() => import("./pages/admin/AdminTrainers").then((m) => ({ default: m.AdminTrainers })));
const AdminVisits = lazy(() => import("./pages/admin/AdminVisits").then((m) => ({ default: m.AdminVisits })));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings").then((m) => ({ default: m.AdminSettings })));
const AdminExport = lazy(() => import("./pages/admin/AdminExport").then((m) => ({ default: m.AdminExport })));
const AdminLogs = lazy(() => import("./pages/admin/AdminLogs").then((m) => ({ default: m.AdminLogs })));

const PageLoader = () => (
  <div className="p-6 flex flex-col gap-4 max-w-4xl mx-auto">
    <Skeleton className="h-14 w-full" />
    <Skeleton className="h-72 w-full" />
  </div>
);

// Route guards
const ProtectedTrainerRoute: React.FC = () => {
  const { firebaseUser, role, isApproved, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!firebaseUser) return <Navigate to="/login" replace />;
  if (role === "admin") return <Navigate to="/admin" replace />;
  if (!isApproved) return <Navigate to="/pending" replace />;
  return <Outlet />;
};

const ProtectedAdminRoute: React.FC = () => {
  const { firebaseUser, role, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!firebaseUser || role !== "admin") {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminLogin />
      </Suspense>
    );
  }
  return <Outlet />;
};

const TodayRedirect: React.FC = () => {
  const today = formatISTDate(getNowInIST());
  return <Navigate to={`/visit/${today}`} replace />;
};

export const router = createBrowserRouter([
  // Public Auth Routes
  {
    path: "/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/admin/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <AdminLogin />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/pending",
    element: (
      <Suspense fallback={<PageLoader />}>
        <PendingApproval />
      </Suspense>
    ),
  },

  // Trainer Protected Area
  {
    element: <ProtectedTrainerRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={<PageLoader />}>
                <CalendarPage />
              </Suspense>
            ),
          },
          {
            path: "/today",
            element: <TodayRedirect />,
          },
          {
            path: "/visit/:date",
            element: (
              <Suspense fallback={<PageLoader />}>
                <VisitPage />
              </Suspense>
            ),
          },
          {
            path: "/notifications",
            element: (
              <Suspense fallback={<PageLoader />}>
                <NotificationsPage />
              </Suspense>
            ),
          },
          {
            path: "/profile",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: "/my-performance",
            element: (
              <Suspense fallback={<PageLoader />}>
                <MyPerformance />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  // Admin Protected Area
  {
    path: "/admin",
    element: <ProtectedAdminRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          {
            path: "calendar",
            element: (
              <Suspense fallback={<PageLoader />}>
                <AdminCalendar />
              </Suspense>
            ),
          },
          {
            path: "performance",
            element: (
              <Suspense fallback={<PageLoader />}>
                <AdminPerformance />
              </Suspense>
            ),
          },
          {
            path: "analytics",
            element: <Navigate to="/admin/performance" replace />,
          },
          {
            path: "trainers",
            element: (
              <Suspense fallback={<PageLoader />}>
                <AdminTrainers />
              </Suspense>
            ),
          },
          {
            path: "visits",
            element: (
              <Suspense fallback={<PageLoader />}>
                <AdminVisits />
              </Suspense>
            ),
          },
          {
            path: "settings",
            element: (
              <Suspense fallback={<PageLoader />}>
                <AdminSettings />
              </Suspense>
            ),
          },
          {
            path: "export",
            element: (
              <Suspense fallback={<PageLoader />}>
                <AdminExport />
              </Suspense>
            ),
          },
          {
            path: "logs",
            element: (
              <Suspense fallback={<PageLoader />}>
                <AdminLogs />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  // Catch-all
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
], {
  basename: import.meta.env.BASE_URL,
});
