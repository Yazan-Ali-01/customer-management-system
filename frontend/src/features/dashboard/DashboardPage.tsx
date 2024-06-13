// src/features/dashboard/DashboardPage.tsx
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center gradient-bg">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-[#2dd4bf] mb-4">Welcome to the Customer Management System</h1>
        <p className="text-lg text-gray-700 mb-8">
          This system allows you to efficiently manage customer records with features to add, update, and delete customer information. Navigate to the Customer Management page to start managing your customers.
        </p>
        <Link to="/customers">
          <button className="px-6 py-2 bg-[#2dd4bf] text-slate-800 font-semibold font-sans rounded-lg hover:bg-[#25bfa3] transition duration-300">
            Go to Customer Management
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
