import { motion } from "framer-motion";
import heroDog from "@/assets/hero-dog.jpg";
import heroCat from "@/assets/hero-cat.jpg";
import pawIcon from "@/assets/paw-icon.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background decorative paws */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.img
            key={i}
            src={pawIcon}
            alt=""
            className="absolute w-8 h-8 opacity-10"
            style={{
              top: `${15 + i * 15}%`,
              left: `${10 + i * 14}%`,
              rotate: `${i * 30}deg`,
            }}
            animate={{ y: [0, -10, 0], rotate: [i * 30, i * 30 + 10, i * 30] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full font-body text-sm font-semibold mb-6"
          >
            🐾 Premier Pet Exhibitions 2026
          </motion.span>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Where <span className="text-gradient-hero">Champions</span> Shine
          </h1>

          <p className="font-body text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            Discover the world's most prestigious dog and cat exhibitions. From Best in Show to rare breeds,
            experience the beauty and grace of our furry companions.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#exhibitions"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-hero text-primary-foreground px-8 py-3.5 rounded-xl font-body font-semibold shadow-glow hover:opacity-90 transition-opacity"
            >
              Explore Exhibitions
            </motion.a>
            <motion.a
              href="#gallery"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-primary text-primary px-8 py-3.5 rounded-xl font-body font-semibold hover:bg-primary/5 transition-colors"
            >
              View Gallery
            </motion.a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            {[
              { num: "500+", label: "Breeds" },
              { num: "120+", label: "Events" },
              { num: "50K+", label: "Visitors" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
              >
                <div className="font-display text-3xl font-bold text-gradient-hero">{stat.num}</div>
                <div className="font-body text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Images */}
        <div className="relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10"
          >
            <img
              src={heroDog}
              alt="Champion dog at exhibition"
              className="rounded-2xl shadow-card w-80 h-96 object-cover"
              width={1280}
              height={720}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-16 left-40 z-20"
          >
            <img
              src={heroCat}
              alt="Champion cat at exhibition"
              className="rounded-2xl shadow-card w-72 h-80 object-cover border-4 border-background"
              width={1280}
              height={720}
            />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 left-10 z-30 bg-background rounded-xl shadow-card px-5 py-3 flex items-center gap-3"
          >
            <div className="bg-gradient-warm w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground font-bold">🏆</div>
            <div>
              <div className="font-body text-sm font-semibold text-foreground">Best in Show</div>
              <div className="font-body text-xs text-muted-foreground">2026 Championship</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
