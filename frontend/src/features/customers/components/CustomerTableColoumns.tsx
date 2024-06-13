import { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ClipboardList, FilePenLine, MoreHorizontal, UserX } from "lucide-react";
import { Customer } from "../types/CustomerTypes";
import { useCustomerStore } from '@/features/customers/hooks/useCustomerStore';
import { ColumnDef } from '@tanstack/react-table';
import { CustomerEditForm } from '@/components/CustomerEditForm';

// Define your columns
export const createColumns = (handleDelete: (id: string) => void): ColumnDef<Customer>[] => [
  {
    accessorKey: "id",
    header: "Customer ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
      const [isDrawerOpen, setIsDrawerOpen] = useState(false);
      const updateCustomer = useCustomerStore((state) => state.updateCustomer);

      const handleEditClick = () => {
        setIsDrawerOpen(true);
      };

      const handleDrawerClose = () => {
        setIsDrawerOpen(false);
      };

      const handleFormSubmit = async (data: Omit<Customer, 'id'>) => {
        try {
          if (customer.id) {
            await updateCustomer(customer.id, data);
          }
          setIsDrawerOpen(false);
        } catch (error) {
          console.error("Failed to update customer:", error);
        }
      };

      const submitForm = () => {
        const form = document.querySelector('form');
        if (form) {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex justify-between items-center hover:cursor-pointer" onClick={() => customer.id && navigator.clipboard.writeText(customer.id)}>
                <div className="flex">
                  Copy ID
                </div>
                <div className="flex ">
                  <ClipboardList size={16} color="#000000" />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between items-center hover:cursor-pointer" onClick={handleEditClick}>
                <div className="flex">
                  Edit
                </div>
                <div className="flex ">
                  <FilePenLine size={16} color="#000000" />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between items-center hover:cursor-pointer" onClick={() => customer.id && handleDelete(customer.id)}>
                <div className="flex">
                  Delete
                </div>
                <div className="flex ">
                  <UserX size={16} color="#e11d48" />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isDrawerOpen && (
            <Drawer open={isDrawerOpen} onOpenChange={handleDrawerClose}>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Edit Customer</DrawerTitle>
                  <DrawerDescription>Edit customer details</DrawerDescription>
                </DrawerHeader>
                <CustomerEditForm customer={customer} onSubmit={handleFormSubmit} />
                <DrawerFooter>
                  <Button onClick={submitForm}>Save</Button>
                  <DrawerClose asChild>
                    <Button variant="outline" onClick={handleDrawerClose}>Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
        </>
      );
    },
  },
];
