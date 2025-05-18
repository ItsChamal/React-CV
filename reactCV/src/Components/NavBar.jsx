import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between">
        <Link to="/dashboard" className="font-bold text-lg">CV Manager</Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/cvs" className="hover:underline">CVs</Link>
          <Link to="/signin" className="hover:underline">Logout</Link>
        </div>
      </div>
    </nav>
  );
}
