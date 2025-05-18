
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import Dashboard from './pages/Dashboard';
import CvList from './pages/Cv/CvList';
import CvForm from './pages/Cv/CvForm';
import CvView from './pages/Cv/CvView';
import { ArrowLeft } from 'lucide-react';

// Back button component to use on internal pages
function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show back button on dashboard (main page)
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
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="*"
            element={
              <>
                <Sidebar />
                <div className="flex-1 overflow-auto">
                  <div className="container mx-auto px-6 py-8">
                    <BackButton />
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
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