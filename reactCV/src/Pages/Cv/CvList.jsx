import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function CvList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/cvs').then(res => setData(res.data));
  }, []);

  function deleteCv(id) {
    api.delete(`/cvs/${id}`).then(() => setData(d => d.filter(cv => cv.id !== id)));
  }

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">CVs</h1>
        <Link to="/cvs/new" className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">+ New CV</Link>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-gray-100 text-left text-sm font-medium">
            <tr><th className="p-3">Name</th><th className="p-3">Age</th><th className="p-3">Phone</th><th className="p-3 w-40">Actions</th></tr>
          </thead>
          <tbody>
            {data.map(cv => (
              <tr key={cv.id} className="border-t">
                <td className="p-3">{cv.firstName} {cv.lastName}</td>
                <td className="p-3">{cv.age}</td>
                <td className="p-3">{cv.phoneNo}</td>
                <td className="p-3 flex gap-2">
                  <Link to={`/cvs/${cv.id}`} className="text-indigo-600 hover:underline">View</Link>
                  <Link to={`/cvs/${cv.id}/edit`} className="text-green-600 hover:underline">Edit</Link>
                  <button onClick={() => deleteCv(cv.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan="4" className="p-6 text-center text-gray-500">No CVs yet</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
