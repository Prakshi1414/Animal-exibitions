import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import galleryDog1 from "@/assets/gallery-dog1.jpg";
import galleryCat1 from "@/assets/gallery-cat1.jpg";
import galleryDog2 from "@/assets/gallery-dog2.jpg";
import galleryCat2 from "@/assets/gallery-cat2.jpg";
import galleryDog3 from "@/assets/gallery-dog3.jpg";
import galleryCat3 from "@/assets/gallery-cat3.jpg";

const images = [
  { src: galleryDog1, alt: "German Shepherd", breed: "German Shepherd", category: "dogs", award: "Best Working Dog" },
  { src: galleryCat1, alt: "Siamese Cat", breed: "Siamese", category: "cats", award: "Best Oriental" },
  { src: galleryDog2, alt: "French Bulldog", breed: "French Bulldog", category: "dogs", award: "People's Choice" },
  { src: galleryCat2, alt: "Maine Coon", breed: "Maine Coon", category: "cats", award: "Best Longhair" },
  { src: galleryDog3, alt: "Husky", breed: "Siberian Husky", category: "dogs", award: "Best Northern Breed" },
  { src: galleryCat3, alt: "Bengal Cat", breed: "Bengal", category: "cats", award: "Best Exotic" },
];

type Filter = "all" | "dogs" | "cats";

const GallerySection = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full font-body text-sm font-semibold mb-4">
            Hall of Fame
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Champion <span className="text-gradient-hero">Gallery</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Meet the award-winning dogs and cats from our most recent exhibitions.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-10">
          {(["all", "dogs", "cats"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-body text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 ${
                filter === f
                  ? "bg-gradient-hero text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "🐾 All" : f === "dogs" ? "🐕 Dogs" : "🐈 Cats"}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((img) => (
              <motion.div
                key={img.breed}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden shadow-card cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width={640}
                  height={640}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="font-body text-xs font-semibold text-paw mb-1">{img.award}</div>
                  <div className="font-display text-xl font-bold text-card">{img.breed}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
