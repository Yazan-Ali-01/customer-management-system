import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useAuthStore } from '@/features/auth/hooks/useAuthStore'
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

const RegisterForm: React.FC = () => {
  const { register: authRegister } = useAuthStore()
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await authRegister(values.email, values.password);
      toast({
        title: 'Registration Successful',
        description: 'You have been registered successfully. Please login.',
      });
      navigate('/auth/login');
    } catch (error) {
      console.error('Failed to register', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
        <Link to="/auth/login">
          <div className="text-center text-slate-850/20 underline text-sm mt-4">
            <p>
              Already have an account? <span className="font-semibold">
                Login
              </span>
            </p>
          </div>
        </Link>
      </form>
    </Form>
  )
}

export default RegisterForm