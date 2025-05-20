
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const { token } = useParams();
  const navigate = useNavigate();

  // Validate token on component mount
  useEffect(() => {
    if (!token) {
      setStatus({
        type: 'error',
        message: 'Invalid reset token. Please request a new password reset.'
      });
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    if (password.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters long' });
      return;
    }

    setStatus({ type: 'loading', message: 'Resetting your password...' });

    try {
      const res = await fetch(`http://localhost:5000/api/auth/resetpassword/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Password reset successful!' });
        // Redirect to sign in after 2 seconds
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        setStatus({ type: 'error', message: data.msg || 'Error resetting password' });
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setStatus({ type: 'error', message: 'Server error. Please try again later.' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex-1 flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold gradient-text mb-2">CV Manager</h1>
          </Link>
          <p className="text-gray-600">Create a new password for your account</p>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-xl">
          <div className="gradient-bg p-6">
            <h2 className="text-2xl font-bold text-white text-center">Reset Your Password</h2>
          </div>

          <div className="bg-white p-6 sm:p-8">
            {status.message && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                status.type === 'error' 
                  ? 'bg-red-50 text-red-700' 
                  : status.type === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-blue-50 text-blue-700'
              }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <InputField
                  label="New Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock size={20} className="text-gray-400" />}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-400"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <InputField
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock size={20} className="text-gray-400" />}
                required
              />

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl gradient-bg text-white font-semibold hover:opacity-90 transition"
                disabled={status.type === 'loading' || status.type === 'success'}
              >
                {status.type === 'loading' ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
