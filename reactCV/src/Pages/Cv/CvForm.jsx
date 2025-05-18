import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '../../components/InputField';
import AddressInput from '../../components/AddressInput';
import api from '../../api/axios';
import { validateCv } from '../../utils/validators';

const blank = {
  firstName:'', lastName:'', age:'', phoneNo:'',
  address:'', lat:null, lng:null,
  preferredLanguages:[], workExperience:[],
  terms:false,
};

export default function CvForm() {
    const nav = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState(blank);
    const [errors, setErrors] = useState({});
    const [langInput, setLangInput] = useState('');
    const [work, setWork] = useState({place:'',years:''});
  
    useEffect(() => {
      if (!id) return;
      api.get('/cvs').then(res => {
        const cv = res.data.find(c => c.id === id);
        if (cv) setForm(cv);
      });
    }, [id]);
  
    function change(e) {
      const { name, value, type, checked } = e.target;
      setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    }