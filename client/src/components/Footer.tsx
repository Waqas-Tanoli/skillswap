
import { Link } from "react-router-dom";
import {
  Sparkles,
  X,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { to: "/browse", label: "Browse Skills" },
      { to: "/how-it-works", label: "How It Works" },
      { to: "/pricing", label: "Pricing" },
      { to: "/faq", label: "FAQ" },
    ],
    Community: [
      { to: "/community", label: "Community Hub" },
      { to: "/blog", label: "Blog" },
      { to: "/events", label: "Events" },
      { to: "/forum", label: "Forum" },
    ],
    Company: [
      { to: "/about", label: "About Us" },
      { to: "/careers", label: "Careers" },
      { to: "/press", label: "Press Kit" },
      { to: "/contact", label: "Contact" },
    ],
    Legal: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
      { to: "/cookies", label: "Cookie Policy" },
      { to: "/security", label: "Security" },
    ],
  };

  const socialLinks = [
    { icon: X, href: "https://twitter.com", label: "Twitter" },
    // { icon: Github, href: "https://github.com", label: "Github" },
    // { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@skillswap.com", label: "Email" },
  ];

  return (
    <footer className="bg-white border-t border-slate-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 group mb-4"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                SkillSwap
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm mb-6">
              Connect with people around the world, exchange skills, and build
              meaningful relationships through learning.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Mail className="h-4 w-4 text-slate-400" />
                <a
                  href="mailto:hello@skillswap.com"
                  className="hover:text-slate-700 transition-colors"
                >
                  hello@skillswap.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Phone className="h-4 w-4 text-slate-400" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-slate-700 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-all duration-200 hover:scale-105"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-500 hover:text-slate-900 transition-colors hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 flex items-center gap-1">
            © {currentYear} SkillSwap. All rights reserved.
            <span className="hidden sm:inline">•</span>
          </p>

          {/* Language & Region Selector */}
          <div className="flex items-center gap-4">
            <select
              className="text-sm text-slate-500 bg-transparent border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-200"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
            <select
              className="text-sm text-slate-500 bg-transparent border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-200"
              defaultValue="us"
            >
              <option value="us">USD ($)</option>
              <option value="eu">EUR (€)</option>
              <option value="uk">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}