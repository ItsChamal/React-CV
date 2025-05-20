import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '../../components/InputField';
import AddressInput from '../../components/AddressInput';
import api from '../../api/axios';
import { validateCv } from '../../utils/validators';

const blank = {
  firstName: '', lastName: '', age: '', phoneNo: '',
  address: '', lat: null, lng: null,
  dob: '', isActive: false,
  nationality: '', employeeStatus: '',
  preferredLanguages: [], workExperience: [],
  terms: false,
};

export default function CvForm() {
  const nav = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});
  const [languageInput, setLanguageInput] = useState('');
  const [work, setWork] = useState({place:'',address:'',years:''});

  useEffect(() => {
    if (!id) return;
    api.get('/cvs').then(res => {
      const cv = res.data.find(c => c.id === id);
      if (cv) {
        setForm(cv);
        setWork({place:'',address:'',years:''});
      }
    });
  }, [id]);

  function change(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  function onAddressSelect(addr) {
    setForm(f => ({ ...f, address: addr.address, lat: addr.lat, lng: addr.lng }));
  }

  function addLanguage() {
    if (languageInput.trim()) {
      setForm(f => ({ ...f, preferredLanguages: [...(f.preferredLanguages||[]), languageInput.trim()] }));
      setLanguageInput('');
    }
  }

  function addWork() {
    if(work.place && work.years){
      setForm(f => ({ ...f, workExperience: [...(f.workExperience||[]), work] }));
      setWork({place:'',address:'',years:''});
    }
  }

  function submit(e) {
    e.preventDefault();
    const errs = validateCv(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const method = id ? api.put : api.post;
    method(id ? `/cvs/${id}` : '/cvs', form).then(() => nav('/cvs'));
  }

  return (
    <form onSubmit={submit} className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">{id ? 'Edit CV' : 'Create CV'}</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <InputField label="First name" name="firstName" value={form.firstName} onChange={change} required />
        <InputField label="Last name" name="lastName" value={form.lastName} onChange={change} required />
        <InputField label="Age" type="number" name="age" value={form.age} onChange={change} min="0" required />
        <InputField label="Phone number" name="phoneNo" value={form.phoneNo} onChange={change} required />
      </div>

      <div className="mt-6">
        <label className="block mb-1 font-medium">Address (Google Maps)</label>
        <AddressInput value={form.address} onSelect={onAddressSelect} />
        {form.address && <p className="text-sm text-gray-500 mt-1">{form.address}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <InputField label="Date of Birth" type="date" name="dob" value={form.dob} onChange={change} />
        <div className="flex items-center mt-6 md:mt-0">
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={change} className="mr-2" />
          Active
        </div>
        <InputField label="Nationality" name="nationality" value={form.nationality} onChange={change} />
        <InputField label="Employment status" name="employeeStatus" value={form.employeeStatus} onChange={change} />
      </div>

      {/* Preferred languages */}
      <div className="mt-6">
        <label className="block mb-1 font-medium">Preferred languages</label>
        <div className="flex gap-2">
          <input value={languageInput} onChange={e=>setLanguageInput(e.target.value)} className="flex-1 rounded-md border-gray-300 shadow-sm px-3 py-2" />
          <button type="button" onClick={addLanguage} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Add</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {form.preferredLanguages?.map(lang=>(
            <span key={lang} className="px-2 py-1 bg-gray-200 rounded">{lang}</span>
          ))}
        </div>
      </div>

      {/* Work experience */}
      <div className="mt-6">
        <label className="block mb-1 font-medium">Work experience</label>
        <div className="grid md:grid-cols-3 gap-2">
          <input placeholder="Place" value={work.place} onChange={e=>setWork(w=>({...w,place:e.target.value}))} className="rounded-md border-gray-300 shadow-sm px-2 py-2" />
          <input placeholder="Address" value={work.address} onChange={e=>setWork(w=>({...w,address:e.target.value}))} className="rounded-md border-gray-300 shadow-sm px-2 py-2" />
          <input placeholder="Years" type="number" value={work.years} onChange={e=>setWork(w=>({...w,years:e.target.value}))} className="rounded-md border-gray-300 shadow-sm px-2 py-2" />
        </div>
        <button type="button" onClick={addWork} className="mt-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Add experience</button>
        <ul className="list-disc list-inside mt-2">
          {form.workExperience?.map((w,i)=>(
            <li key={i}>{w.place} - {w.years} years</li>
          ))}
        </ul>
      </div>

      <label className="flex items-center mt-6">
        <input type="checkbox" name="terms" checked={form.terms} onChange={change} className="mr-2" />
        I accept the terms &amp; conditions
      </label>

      {Object.values(errors).length > 0 && (
        <ul className="text-red-700 mt-4 list-disc list-inside">
          {Object.values(errors).map(e => <li key={e}>{e}</li>)}
        </ul>
      )}

      <button className="mt-8 px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" disabled={!form.terms}>
        {id ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
