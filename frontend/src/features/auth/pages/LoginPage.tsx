import { HeartHandshake } from 'lucide-react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="h-screen flex">
      <div className="w-1/2 flex flex-col items-start justify-start pl-20 py-10">
        {/* First column content */}
        <h1 className="text-3xl font-bold mb-4 text-[#2dd4bf]">Access Your Dashboard!</h1>
        <p className="mb-6">Fill out the form below to log into your admin account.</p>
        <LoginForm />
      </div>
      <div className="w-1/2 flex items-center justify-center bg-green-400/20">
        {/* Second column content */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Welcome Back to My CMS ASSESSMENT</h1>
          <p className="mb-8 font-semibold">Please login to continue.</p>
          <HeartHandshake color="#2dd4bf" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
