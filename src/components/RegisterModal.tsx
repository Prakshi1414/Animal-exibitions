import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

interface RegisterModalProps {
  exhibition: Tables<"exhibitions">;
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal = ({ exhibition, isOpen, onClose }: RegisterModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petCategory, setPetCategory] = useState<"dog" | "cat">("dog");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  if (!user) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl p-8 max-w-md w-full shadow-card border border-border text-center"
          >
            <h3 className="font-display text-2xl font-bold mb-4">Sign In Required</h3>
            <p className="font-body text-muted-foreground mb-6">
              You need to sign in to register for exhibitions.
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="bg-gradient-hero text-primary-foreground px-6 py-3 rounded-xl font-body font-semibold"
            >
              Sign In / Sign Up
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("registrations").insert({
      user_id: user.id,
      exhibition_id: exhibition.id,
      pet_name: petName.trim(),
      pet_breed: petBreed.trim(),
      pet_category: petCategory,
      notes: notes.trim() || null,
    });

    if (error) {
      if (error.code === "23505") {
        toast.error("You're already registered for this exhibition!");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } else {
      toast.success(`Registered for ${exhibition.title}! 🎉`);
      onClose();
      setPetName("");
      setPetBreed("");
      setNotes("");
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card rounded-2xl p-8 max-w-lg w-full shadow-card border border-border"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-2xl font-bold">Register for Exhibition</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>
          </div>

          <p className="font-body text-muted-foreground mb-6">
            {exhibition.emoji} {exhibition.title}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Pet Name</label>
              <input
                type="text"
                required
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                maxLength={100}
                className="w-full bg-muted border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                placeholder="Your pet's name"
              />
            </div>

            <div>
              <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Breed</label>
              <input
                type="text"
                required
                value={petBreed}
                onChange={(e) => setPetBreed(e.target.value)}
                maxLength={100}
                className="w-full bg-muted border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                placeholder="e.g. Golden Retriever, Siamese"
              />
            </div>

            <div>
              <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Pet Type</label>
              <div className="flex gap-3">
                {(["dog", "cat"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPetCategory(type)}
                    className={`flex-1 py-3 rounded-xl font-body text-sm font-semibold transition-all ${
                      petCategory === type
                        ? "bg-gradient-hero text-primary-foreground shadow-soft"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {type === "dog" ? "🐕 Dog" : "🐈 Cat"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Notes (optional)</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={500}
                className="w-full bg-muted border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none"
                placeholder="Special requirements or notes..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-hero text-primary-foreground py-3.5 rounded-xl font-body font-semibold shadow-glow disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register My Pet 🐾"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RegisterModal;
