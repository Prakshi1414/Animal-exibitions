import { motion } from "framer-motion";
import { Award, Heart, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Expert Judging",
    description: "Certified judges from international kennel and feline clubs evaluate each competitor.",
  },
  {
    icon: Heart,
    title: "Adoption Corner",
    description: "Every exhibition features rescue animals looking for their forever homes.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Exhibitions span 30+ countries connecting breeders and enthusiasts worldwide.",
  },
  {
    icon: Shield,
    title: "Animal Welfare",
    description: "Strict welfare standards ensure every animal is treated with love and respect.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-secondary/10 text-secondary px-4 py-1.5 rounded-full font-body text-sm font-semibold mb-4">
              About Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Celebrating <span className="text-gradient-hero">Excellence</span> in Pets
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              For over 25 years, PawShow has been the premier destination for dog and cat exhibitions.
              We bring together breeders, handlers, and pet lovers to celebrate the beauty, agility,
              and companionship of our beloved animals.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Our mission is to promote responsible breeding, animal welfare, and the joy of pet
              ownership through world-class events that inspire and educate.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <div className="bg-gradient-hero w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <f.icon size={22} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2 text-foreground">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
