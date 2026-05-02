import { Link } from "wouter";
import { FaPlane, FaTrain, FaBoxOpen, FaIdCard, FaFingerprint, FaAddressCard, FaArrowRight, FaCheckCircle, FaUsers, FaClock, FaHeadset } from "react-icons/fa";
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

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">About Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Your Trusted Partner for Every Service Need
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Global Enterprise is a leading multi-service centre based in India, dedicated to making essential government and travel services accessible to everyone. We started with a simple belief — no one should struggle with paperwork, long queues, or confusing processes.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                From booking air and train tickets to processing PAN cards, Aadhaar updates, Voter IDs, and international parcels, we handle it all with speed, accuracy, and a personal touch. Our experienced team guides you through every step so you can focus on what matters most.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "100% transparent pricing — no hidden charges",
                  "Fast processing with real-time updates",
                  "Experienced team with deep local knowledge",
                  "Serving thousands of happy customers",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-slate-700">
                    <FaCheckCircle className="text-primary mt-1 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="font-semibold px-8 h-12">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>

            {/* Right: Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: FaUsers, value: "10,000+", label: "Happy Customers", bg: "bg-primary/10", color: "text-primary" },
                { icon: FaClock, value: "5+ Years", label: "In Business", bg: "bg-emerald-50", color: "text-emerald-600" },
                { icon: FaCheckCircle, value: "98%", label: "Success Rate", bg: "bg-amber-50", color: "text-amber-600" },
                { icon: FaHeadset, value: "6 Days", label: "Expert Support", bg: "bg-violet-50", color: "text-violet-600" },
              ].map(({ icon: Icon, value, label, bg, color }) => (
                <div key={label} className={`${bg} rounded-2xl p-8 flex flex-col items-center text-center shadow-sm`}>
                  <Icon className={`text-3xl ${color} mb-3`} />
                  <span className="text-3xl font-bold text-slate-900 mb-1">{value}</span>
                  <span className="text-sm text-slate-600 font-medium">{label}</span>
                </div>
              ))}
            </div>
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
