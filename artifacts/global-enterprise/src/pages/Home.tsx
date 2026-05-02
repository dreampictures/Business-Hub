import { Link } from "wouter";
import { FaPlane, FaTrain, FaBoxOpen, FaIdCard, FaFingerprint, FaAddressCard, FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    id: "Air Ticket Booking",
    title: "Air Ticket Booking",
    description: "Domestic and international flight tickets with competitive pricing and dedicated support.",
    icon: FaPlane,
  },
  {
    id: "Train Ticket Booking",
    title: "Train Ticket Booking",
    description: "Hassle-free IRCTC train reservations, tatkal bookings, and PNR status checks.",
    icon: FaTrain,
  },
  {
    id: "International Parcel Booking",
    title: "International Parcel Booking",
    description: "Secure and timely document and parcel delivery across the globe.",
    icon: FaBoxOpen,
  },
  {
    id: "PAN Card Apply",
    title: "PAN Card Apply",
    description: "New PAN card applications, corrections, and duplicate card processing.",
    icon: FaIdCard,
  },
  {
    id: "Aadhaar Card Services",
    title: "Aadhaar Card Services",
    description: "Aadhaar updates, address change, and demographic corrections.",
    icon: FaFingerprint,
  },
  {
    id: "Voter Card Apply",
    title: "Voter Card Apply",
    description: "New voter ID registration and electoral roll corrections.",
    icon: FaAddressCard,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Professional Services for Everyday Needs
          </h1>
          <p className="text-lg md:text-xl mb-10 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Your trusted local partner for travel ticketing, international parcels, and government document processing. We make complex procedures simple.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-100 w-full sm:w-auto font-semibold px-8 h-14 text-base">
              <Link href="/services">Explore Services</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white text-primary bg-white hover:bg-white/90 font-semibold px-8 h-14 text-base">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Primary Services</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
                      <Icon className="text-2xl" />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={`/apply?service=${encodeURIComponent(service.id)}`}
                      className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase tracking-wider"
                    >
                      Apply Now <FaArrowRight />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
