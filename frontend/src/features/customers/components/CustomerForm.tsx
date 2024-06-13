import { useState } from 'react';
import { Customer } from '@/features/customers/types/CustomerTypes';
import { useCustomerStore } from '../hooks/useCustomerStore';

interface CustomerFormProps {
  customer?: Customer;
  onClose: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onClose }) => {
  const { addCustomer, updateCustomer } = useCustomerStore();
  const [formData, setFormData] = useState<Customer>(
    customer || { id: '', name: '', email: '', address: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (customer && customer.id) {
        await updateCustomer(customer.id, formData)
      } else {
        await addCustomer(formData);
      }
      onClose();
    } catch (error) {
      throw error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <button type="submit">{customer ? 'Update' : 'Add'} Customer</button>
    </form>
  );
};

export default CustomerForm;
