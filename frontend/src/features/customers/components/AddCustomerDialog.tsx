import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { useCustomerStore } from '@/features/customers/hooks/useCustomerStore';
import { useToast } from "@/components/ui/use-toast";
import { useError } from '@/context/ErrorContext';
import axios from 'axios';

const customerSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .regex(/^[a-zA-Z\s]*$/, { message: "Name must contain only alphabetic characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters long." }),
});

const AddCustomerDialog: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
    },
  });

  const { addCustomer, fetchCustomers } = useCustomerStore();
  const { toast } = useToast();
  const { setError } = useError();

  const onSubmit = async (data: z.infer<typeof customerSchema>) => {
    setIsSubmitting(true);

    try {
      await addCustomer(data);
      await fetchCustomers();
      form.reset();
      setIsSubmitting(false);
      setOpen(false);
      // Close the dialog programmatically
      (document.querySelector('[data-state="open"] [data-state="closed"]') as HTMLElement)?.click();
      toast({
        title: "Success",
        description: "Customer added successfully.",
      });
    } catch (error: any) {

      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data && error.response.data.errors) {
          error.response.data.errors.forEach((err: { message: string }) => {
            toast({
              title: "Error",
              description: err.message || "Failed to add customer.",
            });
          });
        } else {
          toast({
            title: "Error",
            description: error.message || "Failed to add customer.",
          });
        }
      } else {
        setError(error.message || "Failed to add customer");
        toast({
          title: "Error",
          description: error.message || "Failed to add customer.",
        });
      }
      setIsSubmitting(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className='rounded-lg h-8 shadow-lg'>Add New Customer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Enter the details of the new customer.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter the full name of the customer.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter the email address of the customer.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter the address of the customer.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {!isSubmitting ? 'Submit' : (
                  <div className="flex items-center">
                    <div role="status">
                      <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                    Adding Customer...
                  </div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerDialog;


