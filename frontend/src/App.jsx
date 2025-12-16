import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import UploadPage from './pages/Upload';
import DocumentViewer from './pages/DocumentViewer';
import Settings from './pages/Settings';
import Team from './pages/Team';
import Contact from './pages/Contact';
import About from './pages/About';
import AdminMessages from './pages/AdminMessages';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import StaticPage from './pages/StaticPage';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const PrivateLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 dark:from-slate-900 dark:via-indigo-900/20 dark:to-purple-900/20">
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main className="flex-1 w-full min-h-[calc(100vh-73px)] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto overflow-x-hidden overflow-y-auto">
          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center hover:shadow-indigo-500/40 transition-shadow"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const isAuthed = Boolean(user?.token);

  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }

  return <PrivateLayout>{children}</PrivateLayout>;
};

// Public Route wrapper - redirects to dashboard if already logged in
const PublicRoute = ({ children, redirectIfAuthenticated = false }) => {
  const { user } = useAuth();
  const isAuthed = Boolean(user?.token);

  if (redirectIfAuthenticated && isAuthed) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  const { user } = useAuth();
  const isAuthed = Boolean(user?.token);
  const location = useLocation();

  return (
    <Routes>
      {/* Public routes - show to everyone */}
      <Route path="/about" element={<About />} />
      <Route path="/team" element={<Team />} />
      <Route path="/contact" element={<Contact />} />

      {/* Static Product Pages */}
      <Route path="/features" element={<StaticPage title="Features" contentKey="features" />} />
      <Route path="/pricing" element={<StaticPage title="Pricing" contentKey="pricing" />} />
      <Route path="/security" element={<StaticPage title="Security" contentKey="security" />} />

      {/* Static Legal Pages */}
      <Route path="/privacy-policy" element={<StaticPage title="Privacy Policy" contentKey="privacy" />} />
      <Route path="/terms-of-service" element={<StaticPage title="Terms of Service" contentKey="terms" />} />
      <Route path="/cookie-policy" element={<StaticPage title="Cookie Policy" contentKey="cookies" />} />

      {/* Auth routes - redirect to dashboard if logged in */}
      <Route
        path="/login"
        element={
          <PublicRoute redirectIfAuthenticated={true}>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute redirectIfAuthenticated={true}>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute redirectIfAuthenticated={true}>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute redirectIfAuthenticated={true}>
            <ResetPassword />
          </PublicRoute>
        }
      />

      {/* Landing page - redirect to dashboard if logged in */}
      <Route
        path="/landing"
        element={
          <PublicRoute redirectIfAuthenticated={true}>
            <Landing />
          </PublicRoute>
        }
      />

      {/* Root path - redirect based on auth status */}
      <Route
        path="/"
        element={
          isAuthed ? <Navigate to="/dashboard" replace /> : <Landing />
        }
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/:id"
        element={
          <ProtectedRoute>
            <DocumentViewer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute>
            <AdminMessages />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
