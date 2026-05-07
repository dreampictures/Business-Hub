import { Link, useLocation } from "wouter";
import { FaBuilding, FaWhatsapp } from "react-icons/fa";
import { useGetVisitorCount } from "@workspace/api-client-react";
import logoImg from "/logo.jpg";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/apply", label: "Apply Now" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <img src={logoImg} alt="Apna Enterprise" className="h-12 w-12 object-contain rounded-lg" />
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-tight">Apna Enterprise</span>
                <span className="text-xs text-primary-foreground/80 font-medium tracking-wider">PROFESSIONAL SERVICES</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                    location === item.href ? "text-white border-b-2 border-white pb-1" : "text-primary-foreground/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logoImg} alt="Apna Enterprise" className="h-10 w-10 object-contain rounded-md" />
              <span className="font-bold text-lg text-white">Apna Enterprise</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Your trusted partner for travel ticketing, government documents, online forms, printing, financial services, and international parcels in Firozepur, Punjab.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact Information</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FaBuilding className="mt-1 text-primary flex-shrink-0" />
                <span>Apna Enterprise, Dharamkot Road Jogewala,<br />Firozepur, Punjab – 142044</span>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-primary text-lg flex-shrink-0" />
                <span>+91 84375 66186</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs">&copy; {new Date().getFullYear()} Apna Enterprise. All rights reserved. | apnaenterprise.in</p>
          <VisitorCounter />
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918437566186?text=Hello%20Apna%20Enterprise%2C%20I%20want%20to%20enquire"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#20bd5a] transition-all z-50 flex items-center justify-center transform hover:scale-105"
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
}

function VisitorCounter() {
  const { data } = useGetVisitorCount();
  return (
    <div className="flex items-center gap-2 text-xs bg-slate-800 px-3 py-1.5 rounded text-slate-300 mt-4 md:mt-0">
      <span className="uppercase tracking-wider font-semibold text-slate-400">Visitors:</span>
      <span className="font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-700">{data?.count ?? "..."}</span>
    </div>
  );
}
