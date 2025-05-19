import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import { Mail, Key, User, ArrowRight } from 'lucide-react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ← marked async and added just the fetch + localStorage + navigate
  const handleSubmit = async (e) => {
    e.preventDefault();

    // assemble payload
    const payload = {
      name:     `${formData.firstName} ${formData.lastName}`,
      email:    formData.email,
      password: formData.password,
    };

    // call your signup endpoint
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    const data = await res.json();

    // store token and redirect
    localStorage.setItem('token', data.token);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold gradient-text mb-2">CV Manager</h1>
          </Link>
          <p className="text-gray-600">Create an account to get started</p>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-xl">
          {/* Card header with gradient */}
          <div className="gradient-bg p-6">
            <h2 className="text-2xl font-bold text-white text-center">Join Us</h2>
          </div>

          {/* Card body */}
          <div className="bg-white p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <InputField
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    icon={<User size={20} className="text-gray-400" />}
                  />
                </div>
                <div className="relative">
                  <InputField
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    icon={<User size={20} className="text-gray-400" />}
                  />
                </div>
              </div>

              <div className="relative">
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  icon={<Mail size={20} className="text-gray-400" />}
                />
              </div>

              <div className="relative">
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  icon={<Key size={20} className="text-gray-400" />}
                />
              </div>

              <div className="relative">
                <InputField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  icon={<Key size={20} className="text-gray-400" />}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white gradient-bg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                <span className="flex items-center">
                  Create Account
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
