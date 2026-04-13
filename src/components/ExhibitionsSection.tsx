import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import RegisterModal from "./RegisterModal";
import type { Tables } from "@/integrations/supabase/types";

const categoryColor: Record<string, string> = {
  Dogs: "bg-primary/10 text-primary",
  Cats: "bg-accent/10 text-accent",
  Both: "bg-secondary/10 text-secondary",
};

const ExhibitionsSection = () => {
  const [selectedExhibition, setSelectedExhibition] = useState<Tables<"exhibitions"> | null>(null);

  const { data: exhibitions = [], isLoading } = useQuery({
    queryKey: ["exhibitions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exhibitions")
        .select("*")
        .order("date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const formatDateRange = (start: string, end: string | null) => {
    const startDate = new Date(start);
    if (!end) return format(startDate, "MMMM d, yyyy");
    const endDate = new Date(end);
    return `${format(startDate, "MMMM d")}-${format(endDate, "d, yyyy")}`;
  };

  return (
    <section id="exhibitions" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full font-body text-sm font-semibold mb-4">
            Upcoming Events
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient-hero">Exhibitions</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Browse our curated selection of world-class dog and cat exhibitions happening around the globe.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-6 shadow-card border border-border animate-pulse h-64" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exhibitions.map((ex, i) => (
              <motion.div
                key={ex.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-glow transition-shadow cursor-pointer group"
                onClick={() => setSelectedExhibition(ex)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{ex.emoji}</span>
                  <span className={`px-3 py-1 rounded-full font-body text-xs font-semibold ${categoryColor[ex.category] || ""}`}>
                    {ex.category}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {ex.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">
                  {ex.description}
                </p>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={14} />
                    <span className="font-body text-sm">{formatDateRange(ex.date, ex.end_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={14} />
                    <span className="font-body text-sm">{ex.location}</span>
                  </div>
                  {ex.expected_attendees && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={14} />
                      <span className="font-body text-sm">{ex.expected_attendees} expected</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 text-primary font-body text-sm font-semibold group-hover:gap-2 transition-all">
                  Register Now <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {selectedExhibition && (
        <RegisterModal
          exhibition={selectedExhibition}
          isOpen={!!selectedExhibition}
          onClose={() => setSelectedExhibition(null)}
        />
      )}
    </section>
  );
};

export default ExhibitionsSection;
