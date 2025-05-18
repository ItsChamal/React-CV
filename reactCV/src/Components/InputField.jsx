
import React from 'react';

export default function InputField({ label, type='text', name, value, onChange, placeholder='', icon, ...rest }) {
  return (
    <div className="mb-1">
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all pl-10"
          {...rest}
        />
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
