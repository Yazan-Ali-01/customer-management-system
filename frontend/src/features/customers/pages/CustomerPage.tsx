// src/features/customers/pages/CustomerPage.tsx
import CustomerList from '@/features/customers/components/CustomerList';
import AddCustomerDialog from '../components/AddCustomerDialog';
import Meteors from '@/components/magicui/meteors';

const CustomerPage: React.FC = () => {
  return (
    <div className="h-screen w-screen flex overflow-x-hidden ">
      <Meteors number={30} />
      <div className="w-full flex flex-col items-start justify-start p-10">
        <header className="w-full flex justify-between items-center mb-8">
          <div className='space-y-2'>
            <h1 className="text-3xl font-bold text-gray-800">Customer Management</h1>
            <p className="text-gray-600">Manage your customer records efficiently.</p>
          </div>
          <AddCustomerDialog />
        </header>
        <CustomerList />
      </div>
    </div>
  );
};

export default CustomerPage;
