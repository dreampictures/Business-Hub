import { Link } from "wouter";
import { FaPlane, FaTrain, FaBoxOpen, FaIdCard, FaFingerprint, FaAddressCard, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "Air Ticket Booking",
    title: "Air Ticket Booking",
    description: "Book domestic and international flights at competitive prices with dedicated support. We handle everything from searching the best fares to issuing tickets.",
    icon: FaPlane,
    features: ["Domestic & International flights", "Tatkal & emergency booking", "Group bookings", "Ticket rescheduling support"],
  },
  {
    id: "Train Ticket Booking",
    title: "Train Ticket Booking",
    description: "Hassle-free IRCTC train reservations across all classes. We manage tatkal bookings, waitlisted tickets, and PNR tracking for your peace of mind.",
    icon: FaTrain,
    features: ["All IRCTC classes", "Tatkal & Premium Tatkal", "PNR status tracking", "Cancellation support"],
  },
  {
    id: "International Parcel Booking",
    title: "International Parcel Booking",
    description: "Reliable and secure parcel and document delivery worldwide. We partner with top courier networks to ensure your shipments reach on time.",
    icon: FaBoxOpen,
    features: ["Worldwide delivery", "Document & commercial parcels", "Real-time tracking", "Insurance coverage available"],
  },
  {
    id: "PAN Card Apply",
    title: "PAN Card Apply",
    description: "Fast and accurate PAN card application processing. Whether it's a new application, correction, or duplicate, we handle the entire procedure.",
    icon: FaIdCard,
    features: ["New PAN application", "PAN correction/update", "Duplicate PAN card", "Status tracking"],
  },
  {
    id: "Aadhaar Card Services",
    title: "Aadhaar Card Services",
    description: "Comprehensive Aadhaar services including address updates, mobile number linking, and demographic corrections through authorised channels.",
    icon: FaFingerprint,
    features: ["Address update", "Mobile number linking", "Demographic corrections", "Aadhaar download assistance"],
  },
  {
    id: "Voter Card Apply",
    title: "Voter Card Apply",
    description: "Register yourself as a voter or correct your electoral roll details. We assist with new registrations, name corrections, and address transfers.",
    icon: FaAddressCard,
    features: ["New voter registration", "Name & address correction", "Constituency transfer", "EPIC card download"],
  },
];

export default function Services() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Everything you need — from travel to government documents — handled professionally under one roof.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-slate-50 flex-1">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col gap-6 border border-slate-100"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon className="text-3xl text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h2>
                      <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </div>

                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                        <FaCheckCircle className="text-primary flex-shrink-0 text-xs" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <Button asChild className="w-full sm:w-auto group">
                      <Link href={`/apply?service=${encodeURIComponent(service.id)}`}>
                        Apply Now
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
