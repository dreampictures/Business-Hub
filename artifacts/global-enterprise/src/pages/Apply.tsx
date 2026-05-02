import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearch } from "wouter";
import { useCreateApplication } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";

const SERVICES = [
  "Air Ticket Booking",
  "Train Ticket Booking",
  "International Parcel Booking",
  "PAN Card Apply",
  "Aadhaar Card Services",
  "Voter Card Apply",
] as const;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(10, "Enter a valid phone number").max(15),
  service: z.enum(SERVICES, { required_error: "Please select a service" }),
  message: z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Apply() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const preSelectedService = params.get("service") as (typeof SERVICES)[number] | null;

  const [submitted, setSubmitted] = useState(false);
  const [submittedService, setSubmittedService] = useState("");
  const createApplication = useCreateApplication();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: (SERVICES.includes(preSelectedService as any) ? preSelectedService : undefined) as (typeof SERVICES)[number] | undefined,
      message: "",
    },
  });

  useEffect(() => {
    if (preSelectedService && SERVICES.includes(preSelectedService as any)) {
      form.setValue("service", preSelectedService as (typeof SERVICES)[number]);
    }
  }, [preSelectedService, form]);

  async function onSubmit(values: FormValues) {
    createApplication.mutate(
      { data: { name: values.name, phone: values.phone, service: values.service, message: values.message || undefined } },
      {
        onSuccess: () => {
          setSubmittedService(values.service);
          setSubmitted(true);
          form.reset();
        },
      }
    );
  }

  const waLink = `https://wa.me/919876543210?text=${encodeURIComponent(`Hello Global Enterprise, I have submitted a request for ${submittedService}. Please assist me.`)}`;

  if (submitted) {
    return (
      <div className="flex flex-col min-h-full bg-slate-50">
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Application Submitted</h1>
          </div>
        </section>
        <section className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Thank You!</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Your application for <strong>{submittedService}</strong> has been received. Our team will contact you shortly.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#20bd5a] transition-colors"
              >
                <FaWhatsapp className="text-xl" />
                Follow up on WhatsApp
              </a>
              <Button variant="outline" onClick={() => setSubmitted(false)} className="w-full">
                Submit Another Application
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Apply for a Service</h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Fill in your details below and our team will reach out within 24 hours.
          </p>
        </div>
      </section>

      <section className="flex-1 bg-slate-50 py-16">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="bg-white rounded-2xl shadow-md p-8 border border-slate-100">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 98765 43210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SERVICES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional details or special requirements..."
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold"
                  disabled={createApplication.isPending}
                >
                  {createApplication.isPending ? "Submitting..." : "Submit Application"}
                </Button>

                {createApplication.isError && (
                  <p className="text-destructive text-sm text-center">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
