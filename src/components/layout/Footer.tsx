// src/components/layout/Footer.tsx
import Link from 'next/link';
// Optional: Import icons if you want to add social links
// import { Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Reusable link style
    const linkStyle = "text-sm text-gray-600 hover:text-black hover:underline transition-colors duration-200 ease-in-out";
    // Footer section heading style
    const headingStyle = "text-sm font-semibold text-black tracking-wide mb-4";

    return (
        <footer className="bg-white border-t border-gray-100 mt-24 sm:mt-32"> {/* Use white bg, subtle border */}
            <div className="container mx-auto px-6 lg:px-8 py-16"> {/* Generous padding */}

                {/* Main Footer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12 mb-16">
                    {/* Column 1: Brand/Logo (Optional) */}
                    <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1 lg:pr-8">
                        <h3 className="text-lg font-bold text-black mb-3">DevConnect</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            The professional platform connecting developers worldwide.
                        </p>
                        {/* Optional Social Icons */}
                         {/* <div className="flex space-x-5 mt-6">
                            <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-black"><Twitter size={18} /></Link>
                            <Link href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-black"><Linkedin size={18} /></Link>
                            <Link href="#" aria-label="GitHub" className="text-gray-400 hover:text-black"><Github size={18} /></Link>
                         </div> */}
                    </div>

                    {/* Link Columns */}
                    <div>
                        <h4 className={headingStyle}>Company</h4>
                        <ul className="space-y-3">
                            <li><Link href="/#" className={linkStyle}>About</Link></li>
                            <li><Link href="/#" className={linkStyle}>Blog</Link></li>
                            <li><Link href="/#" className={linkStyle}>Careers</Link></li>
                            <li><Link href="/#" className={linkStyle}>Press</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={headingStyle}>Product</h4>
                        <ul className="space-y-3">
                            <li><Link href="/#features" className={linkStyle}>Features</Link></li>
                            <li><Link href="/#" className={linkStyle}>Integrations</Link></li>
                            <li><Link href="/#" className={linkStyle}>Pricing</Link></li>
                            <li><Link href="/#" className={linkStyle}>Changelog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={headingStyle}>Resources</h4>
                        <ul className="space-y-3">
                            <li><Link href="/#" className={linkStyle}>Help Center</Link></li>
                            <li><Link href="/#" className={linkStyle}>Community</Link></li>
                            <li><Link href="/#" className={linkStyle}>Guidelines</Link></li>
                            <li><Link href="/#" className={linkStyle}>Support</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={headingStyle}>Legal</h4>
                        <ul className="space-y-3">
                            <li><Link href="/#" className={linkStyle}>Terms</Link></li>
                            <li><Link href="/#" className={linkStyle}>Privacy</Link></li>
                            <li><Link href="/#" className={linkStyle}>Cookies</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <p className="text-xs text-gray-500 text-center md:text-left">
                        © {currentYear} DevConnect Inc. All rights reserved.
                    </p>
                    {/* Essential Links */}
                    <div className="flex justify-center md:justify-end space-x-5 text-xs">
                        <Link href="#" className="text-gray-500 hover:text-black hover:underline">Terms of Service</Link>
                        <span className="text-gray-300">|</span>
                        <Link href="#" className="text-gray-500 hover:text-black hover:underline">Privacy Policy</Link>
                    </div>
                     {/* Optional: Language/Region Selector Placeholder */}
                     {/* <div className="text-center md:text-right mt-4 md:mt-0">
                         <button className="text-xs text-gray-500 hover:text-black flex items-center justify-center md:justify-end mx-auto md:mx-0">
                            <Globe size={14} className="mr-1"/> English (US)
                        </button>
                     </div> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;