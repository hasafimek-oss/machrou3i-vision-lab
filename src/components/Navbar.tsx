import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Sparkles } from "lucide-react";

const languages = [
  { code: "en", label: "EN", dir: "ltr" },
  { code: "fr", label: "FR", dir: "ltr" },
  { code: "ar", label: "عربي", dir: "rtl" },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const switchLang = (code: string, dir: string) => {
    i18n.changeLanguage(code);
    document.documentElement.dir = dir;
    document.documentElement.lang = code;
    setLangOpen(false);
  };

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/pricing", label: t("nav.pricing") },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-neon" />
          <span className="text-xl font-bold font-heading text-gradient-neon">
            {t("brand")}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-neon ${
                isActive(link.to) ? "text-neon" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:text-foreground transition-colors glass-panel"
            >
              <Globe className="h-4 w-4" />
              {languages.find((l) => l.code === i18n.language)?.label || "EN"}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full mt-2 right-0 glass-panel rounded-lg overflow-hidden min-w-[80px]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLang(lang.code, lang.dir)}
                      className={`block w-full px-4 py-2 text-sm text-start hover:bg-primary/20 transition-colors ${
                        i18n.language === lang.code ? "text-neon" : "text-muted-foreground"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.login")}
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-neon text-accent-foreground hover:opacity-90 transition-opacity glow-neon"
          >
            {t("nav.signup")}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass-panel border-t border-border/50"
          >
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium ${
                    isActive(link.to) ? "text-neon" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { switchLang(lang.code, lang.dir); setMobileOpen(false); }}
                    className={`px-3 py-1 text-xs rounded-md ${
                      i18n.language === lang.code
                        ? "bg-neon text-accent-foreground"
                        : "glass-panel text-muted-foreground"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
