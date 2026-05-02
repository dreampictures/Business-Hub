import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useAdminLogin } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaGlobeAsia, FaLock } from "react-icons/fa";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const adminLogin = useAdminLogin();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setLocation("/admin/dashboard");
    }
  }, [setLocation]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  function onSubmit(values: FormValues) {
    adminLogin.mutate(
      { data: { username: values.username, password: values.password } },
      {
        onSuccess: (data) => {
          localStorage.setItem("adminToken", data.token);
          localStorage.setItem("adminUsername", data.username);
          setLocation("/admin/dashboard");
        },
      }
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaGlobeAsia className="text-4xl text-primary" />
            <span className="font-bold text-2xl text-slate-900">Global Enterprise</span>
          </div>
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaLock className="text-primary text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="text-slate-500 text-sm mt-2">Sign in to access the admin panel</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" autoComplete="username" {...field} />
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
                      <Input type="password" placeholder="••••••••" autoComplete="current-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {adminLogin.isError && (
                <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 text-center">
                  Invalid username or password. Please try again.
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                disabled={adminLogin.isPending}
              >
                {adminLogin.isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          This area is restricted to authorised administrators only.
        </p>
      </div>
    </div>
  );
}
