import LoginForm from "@/app/admin/login/LoginForm";

export default function Login() {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{width: '100vw', height: '100vh'}}>
      <div className='border border-gray-200 p-3 rounded' style={{width: 300}}>
        <LoginForm />
      </div>
    </div>
  );
}