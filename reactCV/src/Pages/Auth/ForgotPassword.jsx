
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../components/InputField';
import { Mail, ArrowRight } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus({ type: 'error', message: 'Email is required' });
      return;
    }
    
    setStatus({ type: 'loading', message: 'Processing your request...' });
    
    try {
      const res = await fetch('http://localhost:5000/api/auth/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus({ 
          type: 'success', 
          message: data.msg || 'Check your email for reset link' 
        });
        
        // For demo purposes only - would be removed in production
        if (data.resetToken) {
          setResetToken(data.resetToken);
        }
      } else {
        setStatus({ 
          type: 'error', 
          message: data.msg || 'Something went wrong' 
        });
      }
    } catch (err) {
      console.error('Error requesting password reset:', err);
      setStatus({ 
        type: 'error', 
        message: 'Server error. Try again later.' 
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold gradient-text mb-2">CV Manager</h1>
          </Link>
          <p className="text-gray-600">Forgot your password? We'll send you a reset link.</p>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-xl">
          <div className="gradient-bg p-6">
            <h2 className="text-2xl font-bold text-white text-center">Reset Password</h2>
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
            
            {resetToken && (
              <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg">
                <p className="font-medium">Demo Mode</p>
                <p className="text-xs mt-1">Reset token (for demo only):</p>
                <code className="block mt-1 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                  {resetToken}
                </code>
                <p className="text-xs mt-2">
                  In a real application, this token would be sent via email with a link to reset your password.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={20} className="text-gray-400" />}
                required
              />

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-6 rounded-xl gradient-bg text-white font-semibold hover:opacity-90 transition"
                disabled={status.type === 'loading'}
              >
                {status.type === 'loading' ? (
                  'Processing...'
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight size={20} className="ml-2" />
                  </>
                )}
              </button>
            </form>
            <p className="text-center text-sm mt-6">
              Remember your password?{' '}
              <Link to="/signin" className="text-indigo-600 hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
