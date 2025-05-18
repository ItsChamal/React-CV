
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Database } from 'lucide-react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  
  const getLinkClass = (path) => {
    const baseClass = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";
    return isActive(path)
      ? `${baseClass} bg-indigo-100 text-indigo-700 font-medium`
      : `${baseClass} text-gray-600 hover:bg-gray-100`;
  };

  return (
    <div 
      className={`${
        collapsed ? "w-16" : "w-64"
      } h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ease-in-out shadow-sm`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {!collapsed && <Link to="/dashboard" className="font-bold text-lg text-indigo-600">CV Manager</Link>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="flex-1 py-4 flex flex-col">
        <Link to="/dashboard" className={getLinkClass("/dashboard")}>
          <Database size={20} />
          {!collapsed && <span>Dashboard</span>}
        </Link>
        <Link to="/cvs" className={getLinkClass("/cvs")}>
          <MapPin size={20} />
          {!collapsed && <span>CVs</span>}
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <Link 
          to="/signin" 
          className={`${getLinkClass("/signin")} ${collapsed ? "justify-center" : ""}`}
        >
          {!collapsed && <span>Logout</span>}
          {collapsed && "🚪"}
        </Link>
      </div>
    </div>
  );
}
