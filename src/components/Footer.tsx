import pawIcon from "@/assets/paw-icon.png";

const Footer = () => (
  <footer className="bg-earth text-earth-foreground py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={pawIcon} alt="PawShow" className="w-7 h-7" />
            <span className="font-display text-xl font-bold">PawShow</span>
          </div>
          <p className="font-body text-sm opacity-70 leading-relaxed">
            The world's premier platform for dog and cat exhibitions since 2001.
          </p>
        </div>
        {[
          { title: "Quick Links", links: ["Home", "Exhibitions", "Gallery", "About"] },
          { title: "Categories", links: ["Dog Shows", "Cat Shows", "Mixed Events", "Agility"] },
          { title: "Support", links: ["FAQ", "Contact", "Terms", "Privacy"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm font-bold mb-4 uppercase tracking-wider opacity-60">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-earth-foreground/10 pt-8 text-center">
        <p className="font-body text-sm opacity-50">© 2026 PawShow. All rights reserved. 🐾</p>
      </div>
    </div>
  </footer>
);

export default Footer;
