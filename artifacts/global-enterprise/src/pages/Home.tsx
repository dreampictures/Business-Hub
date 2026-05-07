import { Link } from "wouter";
import {
  FaPlane, FaIdCard, FaClipboardList, FaPrint,
  FaUniversity, FaShippingFast,
  FaArrowRight, FaCheckCircle, FaUsers, FaClock, FaHeadset,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICE_CATEGORIES } from "@/lib/services";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  travel: FaPlane,
  documents: FaIdCard,
  forms: FaClipboardList,
  digital: FaPrint,
  financial: FaUniversity,
  parcel: FaShippingFast,
};

const CATEGORY_COLORS: Record<string, { bg: string; icon: string; badge: string }> = {
  travel:    { bg: "bg-blue-50",    icon: "text-blue-600",    badge: "bg-blue-100 text-blue-700" },
  documents: { bg: "bg-emerald-50", icon: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
  forms:     { bg: "bg-violet-50",  icon: "text-violet-600",  badge: "bg-violet-100 text-violet-700" },
  digital:   { bg: "bg-amber-50",   icon: "text-amber-600",   badge: "bg-amber-100 text-amber-700" },
  financial: { bg: "bg-rose-50",    icon: "text-rose-600",    badge: "bg-rose-100 text-rose-700" },
  parcel:    { bg: "bg-cyan-50",    icon: "text-cyan-600",    badge: "bg-cyan-100 text-cyan-700" },
};

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
            Your trusted local partner for travel ticketing, government documents, online forms, printing, finance, and international parcels. We make complex procedures simple.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto font-semibold px-8 h-14 text-base border-0 text-slate-900" style={{background: "hsl(43 88% 42%)", hover: "hsl(43 88% 36%)"}}>
              <Link href="/services">Explore Services</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white text-white bg-transparent hover:bg-white/10 font-semibold px-8 h-14 text-base">
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
              <p className="font-semibold uppercase tracking-widest text-sm mb-3" style={{color: "hsl(43 88% 42%)"}}>About Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Your Trusted Partner for Every Service Need
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Apna Enterprise is a trusted multi-service centre in Firozepur, Punjab, dedicated to making essential government and travel services accessible to everyone. We started with a simple belief — no one should struggle with paperwork, long queues, or confusing processes.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                From booking air and train tickets to processing PAN cards, Aadhaar updates, Voter IDs, passports, GST registration, and international parcels, we handle it all with speed, accuracy, and a personal touch.
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
              <Button asChild size="lg" className="font-semibold px-8 h-12 border-0 text-slate-900" style={{background: "hsl(43 88% 42%)"}}>
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

      {/* Service Categories Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              We offer {SERVICE_CATEGORIES.reduce((acc, c) => acc + c.services.length, 0)}+ services across 6 categories to meet all your needs.
            </p>
            <div className="w-24 h-1 mx-auto rounded-full mt-4" style={{background: "hsl(43 88% 42%)"}} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id] ?? FaIdCard;
              const colors = CATEGORY_COLORS[cat.id] ?? { bg: "bg-slate-50", icon: "text-slate-600", badge: "bg-slate-100 text-slate-700" };
              return (
                <Card key={cat.id} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-4`}>
                      <Icon className={`text-2xl ${colors.icon}`} />
                    </div>
                    <CardTitle className="text-xl mb-1">{cat.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {cat.services.length} service{cat.services.length !== 1 ? "s" : ""} available
                    </CardDescription>
                    {/* Show first 3 service names as tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {cat.services.slice(0, 3).map((s) => (
                        <span key={s.id} className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
                          {s.name}
                        </span>
                      ))}
                      {cat.services.length > 3 && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-500">
                          +{cat.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href="/services"
                      className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase tracking-wider"
                    >
                      View All <FaArrowRight />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="font-semibold px-10 h-12 border-0 text-slate-900" style={{background: "hsl(43 88% 42%)"}}>
              <Link href="/apply">Apply for Any Service</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
