import { useEffect, useState } from 'react';
import api from '../api/LocalStorage';

export default function Dashboard() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    api.get('/cvs').then(res => setTotal(res.data.length));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-5 bg-white rounded-xl shadow">
          <p className="text-sm text-gray-500">Total CVs</p>
          <p className="text-4xl font-bold">{total}</p>
        </div>
      </div>
    </>
  );
}
