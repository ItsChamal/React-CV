import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function CvView() {
  const { id } = useParams();
  const [cv, setCv] = useState(null);

  useEffect(() => {
    api.get('/cvs').then(res => {
      setCv(res.data.find(c => c.id === id));
    });
  }, [id]);

  if (!cv) return <p>Loading…</p>;

  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{cv.firstName} {cv.lastName}</h1>
      <div className="grid grid-cols-2 gap-4">
        <Detail label="Age" value={cv.age} />
        <Detail label="Phone" value={cv.phoneNo} />
        <Detail label="Address" value={cv.address} />
      </div>
      <h2 className="text-xl font-semibold mt-6">Preferred languages</h2>
      <ul className="list-disc list-inside">{cv.preferredLanguages.map(l => <li key={l}>{l}</li>)}</ul>
      <h2 className="text-xl font-semibold mt-6">Work experience</h2>
      <ul className="list-disc list-inside">{cv.workExperience.map((w,i)=><li key={i}>{w.place} - {w.years} years</li>)}</ul>
      <Link to={`/cvs/${cv.id}/edit`} className="inline-block mt-6 px-4 py-2 rounded-md bg-indigo-600 text-white">Edit</Link>
    </div>
  );
}

function Detail({ label, value }) {
  return <p><span className="font-medium">{label}: </span>{value}</p>;
}
