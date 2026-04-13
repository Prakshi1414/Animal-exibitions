import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import pawIcon from "@/assets/paw-icon.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Exhibitions", href: "#exhibitions" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      signOut();
    } else {
      navigate("/auth");
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <a href="#home" className="flex items-center gap-2">
          <img src={pawIcon} alt="PawShow" className="w-8 h-8" />
          <span className="font-display text-2xl font-bold text-gradient-hero">PawShow</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {user && (
            <span className="font-body text-xs text-muted-foreground flex items-center gap-1">
              <User size={14} />
              {user.email}
            </span>
          )}

          <button
            onClick={handleAuth}
            className="bg-gradient-hero text-primary-foreground px-5 py-2 rounded-lg font-body text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            {user ? (
              <>
                <LogOut size={14} /> Sign Out
              </>
            ) : (
              <>
                <LogIn size={14} /> Sign In
              </>
            )}
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-base text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  handleAuth();
                }}
                className="bg-gradient-hero text-primary-foreground px-5 py-2 rounded-lg font-body text-sm font-semibold text-center flex items-center justify-center gap-2"
              >
                {user ? (
                  <>
                    <LogOut size={14} /> Sign Out
                  </>
                ) : (
                  <>
                    <LogIn size={14} /> Sign In
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
