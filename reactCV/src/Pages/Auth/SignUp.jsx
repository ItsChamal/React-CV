import {useState} from'react'; import {Link,useNavigate} from'react-router-dom'; import InputField from'../../components/InputField';
export default function SignUp(){
  const[email,setEmail]=useState(''); const[pwd,setPwd]=useState(''); const nav=useNavigate();
  function submit(e){e.preventDefault(); nav('/signin');}
  return (
    <div className="max-w-sm mx-auto bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <form onSubmit={submit}>
        <InputField label="E-mail" type="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <InputField label="Password" type="password" name="password" value={pwd} onChange={e=>setPwd(e.target.value)} required/>
        <button className="w-full py-2 mt-4 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Create account</button>
        <p className="text-sm text-center mt-4"><Link to="/signin" className="text-indigo-600 hover:underline">Back to Sign In</Link></p>
      </form>
    </div>
  );
}
