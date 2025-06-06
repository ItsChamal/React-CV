
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import Dashboard from './Pages/Dashboard';
import CvList from './Pages/Cv/CvList';
import CvForm from './Pages/Cv/CvForm';
import CvView from './Pages/Cv/CvView';
import { ArrowLeft } from 'lucide-react';

// Back button component to use on Inside pages
function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // No back button on dashboard (main page)
  if (location.pathname === '/dashboard') {
    return null;
  }

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

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="*"
            element={
              <>
                <Sidebar />
                <div className="flex-1 overflow-auto">
                  <div className="container mx-auto px-6 py-8">
                    <BackButton />
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/cvs" element={<CvList />} />
                      <Route path="/cvs/new" element={<CvForm />} />
                      <Route path="/cvs/:id/edit" element={<CvForm />} />
                      <Route path="/cvs/:id" element={<CvView />} />
                      <Route path="*" element={<p className="text-center mt-10">Page Not Found</p>} />
                    </Routes>
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
