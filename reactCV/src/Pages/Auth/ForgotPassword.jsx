
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../components/InputField';
import { Mail, ArrowRight } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Email is required');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/auth/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.msg || 'Check your email for reset link');
      } else {
        setMessage(data.msg || 'Something went wrong');
      }
    } catch (err) {
      setMessage('Server error. Try again later.');
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
              />

              {message && <p className="text-sm text-center text-red-500">{message}</p>}

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-6 rounded-xl gradient-bg text-white font-semibold hover:opacity-90 transition"
              >
                Send Reset Link
                <ArrowRight size={20} className="ml-2" />
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
