// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import Dashboard from './pages/Dashboard';
import CvList from './pages/Cv/CvList';
import CvForm from './pages/Cv/CvForm';
import CvView from './pages/Cv/CvView';
import { ArrowLeft } from 'lucide-react';

// Back button (unchanged)
function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === '/dashboard') return null;
  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
    >
      <ArrowLeft size={20} className="mr-2" />
      <span>Back</span>
    </button>
  );
}

// Layout that guards everything under "/*"
function ProtectedLayout() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    // Not signed in → send to signin
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <BackButton />
          <Routes>
            {/* Now these are only matched if token exists */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cvs" element={<CvList />} />
            <Route path="/cvs/new" element={<CvForm />} />
            <Route path="/cvs/:id/edit" element={<CvForm />} />
            <Route path="/cvs/:id" element={<CvView />} />
            {/* Fallback within protected */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root now goes to signin */}
        <Route path="/" element={<Navigate to="/signin" replace />} />

        {/* Public auth pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Everything else requires a token */}
        <Route path="/*" element={<ProtectedLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
