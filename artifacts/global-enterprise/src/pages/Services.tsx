import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  FaPlane, FaTrain, FaIdCard, FaFingerprint, FaAddressCard, FaPassport,
  FaCar, FaIdBadge, FaFileAlt, FaUserFriends, FaHome, FaMoneyBill,
  FaStore, FaBuilding, FaBriefcase, FaGraduationCap, FaSchool,
  FaTrophy, FaAward, FaClipboardList, FaPrint, FaLaptopCode,
  FaUniversity, FaCreditCard, FaBoxOpen, FaShippingFast,
  FaGlobe, FaSearch, FaTimes, FaArrowRight,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { SERVICE_CATEGORIES } from "@/lib/services";
import { FaWalking, FaClock } from "react-icons/fa";

const WALKIN_SERVICES = new Set([
  "AEPS (Aadhaar Enabled Payment System)",
  "Online Payments",
]);

const COMING_SOON_SERVICES = new Set([
  "GST Registration",
]);

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "Air Ticket Booking": FaPlane,
  "Train Ticket Booking": FaTrain,
  "PAN Card Apply": FaIdCard,
  "Aadhaar Card Services": FaFingerprint,
  "Voter Card Apply": FaAddressCard,
  "Passport Apply": FaPassport,
  "Learning License": FaCar,
  "Driving License": FaCar,
  "UDID Certificate Apply": FaIdBadge,
  "E-Shram Card": FaUserFriends,
  "Schedule Caste Certificate": FaFileAlt,
  "Punjab Resident Certificate": FaHome,
  "Income Certificate": FaMoneyBill,
  "UDYAM Certificate (MSME)": FaStore,
  "GST Registration": FaBuilding,
  "Job Application Forms (Govt Naukri)": FaBriefcase,
  "College Admission Forms": FaGraduationCap,
  "School Admission Forms": FaSchool,
  "Competitive Exam Forms": FaTrophy,
  "Scholarship Forms": FaAward,
  "General Online Form Filling": FaClipboardList,
  "Document Scanning": FaFileAlt,
  "Printing Services": FaPrint,
  "Website Design Services": FaLaptopCode,
  "AEPS (Aadhaar Enabled Payment System)": FaUniversity,
  "Online Payments": FaCreditCard,
  "International Parcel Booking": FaBoxOpen,
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  travel: FaGlobe,
  documents: FaIdCard,
  forms: FaClipboardList,
  digital: FaPrint,
  financial: FaUniversity,
  parcel: FaShippingFast,
};

const CATEGORY_BG: Record<string, string> = {
  travel: "bg-blue-600",
  documents: "bg-emerald-600",
  forms: "bg-violet-600",
  digital: "bg-amber-600",
  financial: "bg-rose-600",
  parcel: "bg-cyan-600",
};

const CATEGORY_LIGHT: Record<string, string> = {
  travel: "bg-blue-50 text-blue-600",
  documents: "bg-emerald-50 text-emerald-600",
  forms: "bg-violet-50 text-violet-600",
  digital: "bg-amber-50 text-amber-600",
  financial: "bg-rose-50 text-rose-600",
  parcel: "bg-cyan-50 text-cyan-600",
};

export default function Services() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return SERVICE_CATEGORIES.map((cat) => ({
      ...cat,
      services: cat.services.filter(
        (s) =>
          (!q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) &&
          (!activeCategory || cat.id === activeCategory)
      ),
    })).filter((cat) => cat.services.length > 0);
  }, [search, activeCategory]);

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Travel, government documents, online forms, printing, finance, and more — all under one roof.
          </p>
        </div>
      </section>

      {/* Search + Category Filter */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 bg-slate-50"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <FaTimes className="text-sm" />
                </button>
              )}
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  activeCategory === null
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary"
                }`}
              >
                All
              </button>
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    activeCategory === cat.id
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="py-12 bg-slate-50 flex-1">
        <div className="container mx-auto px-4 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-500">
              <FaSearch className="text-4xl mx-auto mb-4 text-slate-300" />
              <p className="font-semibold text-lg">No services found</p>
              <p className="text-sm mt-1">Try a different search term or clear the filter.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory(null); }}
                className="mt-4 text-primary text-sm font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {filtered.map((cat) => {
                const CatIcon = CATEGORY_ICONS[cat.id] ?? FaFileAlt;
                const catBg = CATEGORY_BG[cat.id] ?? "bg-primary";
                return (
                  <div key={cat.id}>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${catBg}`}>
                        <CatIcon className="text-lg" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900">{cat.name}</h2>
                      <span className="text-xs text-slate-400 font-medium">
                        {cat.services.length} service{cat.services.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* Services grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {cat.services.map((service) => {
                        const Icon = SERVICE_ICONS[service.id] ?? FaFileAlt;
                        const lightClass = CATEGORY_LIGHT[cat.id] ?? "bg-primary/10 text-primary";
                        return (
                          <div
                            key={service.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col gap-4 border border-slate-100"
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${lightClass}`}>
                                <Icon className="text-xl" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1">
                                  {service.name}
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                            <div className="pt-1">
                              {COMING_SOON_SERVICES.has(service.id) ? (
                                <div className="w-full h-9 flex items-center justify-center gap-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 text-xs font-semibold">
                                  <FaClock className="text-sm" />
                                  Coming Soon
                                </div>
                              ) : WALKIN_SERVICES.has(service.id) ? (
                                <div className="w-full h-9 flex items-center justify-center gap-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-xs font-semibold">
                                  <FaWalking className="text-sm" />
                                  Walk-in / Visit Us
                                </div>
                              ) : (
                                <Button asChild size="sm" className="w-full group text-xs h-9">
                                  <Link href={`/apply?service=${encodeURIComponent(service.id)}`}>
                                    Apply Now
                                    <FaArrowRight className="ml-2 group-hover:translate-x-0.5 transition-transform" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
