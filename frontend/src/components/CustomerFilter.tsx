// src/features/customers/components/CustomerFilter.tsx
import React from 'react';

interface CustomerFilterProps {
  limit: number;
  onLimitChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onApplyFilters: () => void;
}

const CustomerFilter: React.FC<CustomerFilterProps> = ({ limit, onLimitChange, onApplyFilters }) => {
  return (
    <div className='flex space-x-4'>
      <input
        type='number'
        name='limit'
        placeholder='Limit'
        value={limit}
        onChange={onLimitChange}
        className='input'
      />
      <button onClick={onApplyFilters} className='button'>Apply</button>
    </div>
  );
};

export default CustomerFilter;
