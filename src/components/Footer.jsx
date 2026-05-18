import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-black border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-serif text-primary">Omotesho</span>
              <span className="text-2xl font-serif text-foreground">Bisola</span>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Strategy-led digital marketing for pesonal brand and businesses
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground mb-6 font-sans">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground mb-6 font-sans">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="text-muted-foreground">Ife, Osun state, Nigeria</li>
              <li>
                <a
                  href="mailto:omoteshobisola08@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300
                        relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
                        after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  omoteshobisola08@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary/10">
          <p className="text-muted-foreground text-center text-sm">
            © {new Date().getFullYear()} Omotesho Bisola. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}