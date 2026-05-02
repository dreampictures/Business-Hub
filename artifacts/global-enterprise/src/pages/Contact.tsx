import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaClock, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-full">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Reach us anytime — we are here to assist you Monday through Saturday.
          </p>
        </div>
      </section>

      <section className="flex-1 bg-slate-50 py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-md p-8 border border-slate-100 space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Get in Touch</h2>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-primary text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                    <a href="tel:+919876543210" className="text-xl font-bold text-slate-900 hover:text-primary transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-[#25D366] text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">WhatsApp</p>
                    <a
                      href="https://wa.me/919876543210?text=Hello%20Global%20Enterprise%2C%20I%20need%20assistance"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold py-2 px-5 rounded-xl hover:bg-[#20bd5a] transition-colors text-sm mt-1"
                    >
                      <FaWhatsapp />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:info@globalenterprise.in" className="text-slate-800 hover:text-primary transition-colors font-medium">
                      info@globalenterprise.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-primary text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Address</p>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      123 Business Plaza,<br />
                      Connaught Place,<br />
                      New Delhi - 110001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-primary text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Business Hours</p>
                    <p className="text-slate-800 font-medium">Mon – Sat: 9:00 AM – 7:00 PM</p>
                    <p className="text-slate-500 text-sm">Sundays &amp; Public Holidays: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
                <iframe
                  title="Global Enterprise Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9104282093516!2d77.21887631508358!3d28.632890082419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd18d91c3b99%3A0xb8cb427e3ef48c2e!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="380"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="bg-primary text-primary-foreground rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2">Need immediate assistance?</h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  Our team is available on WhatsApp for quick queries and status updates on your applications.
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Global%20Enterprise%2C%20I%20need%20immediate%20assistance"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-primary font-semibold py-2.5 px-6 rounded-xl hover:bg-slate-100 transition-colors text-sm"
                >
                  <FaWhatsapp className="text-[#25D366] text-lg" />
                  Message Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
