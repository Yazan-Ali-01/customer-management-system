
import { create } from 'zustand';
import * as customerService from '@/features/customers/services/customerService';
import { Customer } from '@/features/customers/types/CustomerTypes';

interface CustomerState {
  customers: Customer[];
  loading: boolean;
  fetchCustomers: () => Promise<void>;
  addCustomer: (customer: Omit<Customer, 'id'>) => Promise<void>;
  updateCustomer: (id: string, customer: Omit<Customer, 'id'>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  setCustomers: (customers: Customer[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  loading: false,
  setLoading: (loading) => set({ loading }),
  fetchCustomers: async () => {
    set({ loading: true });
    try {
      const customers = await customerService.fetchCustomers();
      set({ customers });
    } catch (error) {
      console.error('Fetch customers error:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  addCustomer: async (customer) => {
    try {
      const newCustomer = await customerService.createCustomer(customer);
      set((state) => ({ customers: [...state.customers, newCustomer] }));
    } catch (error) {
      console.error('Add customer error:', error);
      throw error;
    }
  },
  updateCustomer: async (id, customer) => {
    try {
      const updatedCustomer = await customerService.updateCustomer(id, customer);
      set((state) => ({
        customers: state.customers.map((c) => (c.id === id ? updatedCustomer : c)),
      }));
    } catch (error) {
      console.error('Update customer error:', error);
      throw error;
    }
  },
  deleteCustomer: async (id) => {
    try {
      await customerService.deleteCustomer(id);

      set((state) => ({
        customers: state.customers.filter((customer) => customer.id !== id),
      }));
    } catch (error) {
      console.error('Delete customer error:', error);
      throw error;
    }
  },
  setCustomers: (customers) => set({ customers }),
}));
