// src/features/customers/components/CustomerList.tsx
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useCustomerStore } from '../hooks/useCustomerStore';
import { DataTable } from '../data-table';
import { createColumns } from './CustomerTableColoumns';

const CustomerList: React.FC = () => {
  const { customers, fetchCustomers, deleteCustomer, loading } = useCustomerStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomer(id);
      toast({
        title: 'Customer deleted',
        description: 'The customer was successfully deleted.',
      });
    } catch (error: any) {
      console.error('Error deleting customer:', error); // Log the error message
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete customer.',
      });
    }
  };

  const columns = createColumns(handleDelete);

  return (
    <div className='w-full'>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary"></div>
        </div>
      ) : (
        <DataTable columns={columns} data={customers} />
      )}
    </div>
  );
};

export default CustomerList;
