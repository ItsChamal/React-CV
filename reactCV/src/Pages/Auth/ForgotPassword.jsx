import {useState} from'react'; import {Link} from'react-router-dom'; import InputField from'../../components/InputField';
export default function ForgotPassword(){
  const[email,setEmail]=useState('');
  function submit(e){e.preventDefault(); alert('Password reset link sent to '+email);}
  return (
    <div className="max-w-sm mx-auto bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
      <form onSubmit={submit}>
        <InputField label="E-mail" type="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <button className="w-full py-2 mt-4 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Send reset link</button>
        <p className="text-sm text-center mt-4"><Link to="/signin" className="text-indigo-600 hover:underline">Back to Sign In</Link></p>
      </form>
    </div>
  );
}
