import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    // Changed py-10 to py-6 to make the footer shorter and more compact
    <footer className="bg-gray-200 border-t-2 border-t-black py-6 mt-auto">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">

            {/* LEFT SIDE: Logo & Copyright */}
            <div className="w-full md:w-1/3 flex flex-col items-start">
                <div className="mb-2">
                    <Logo width="80px" />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    &copy; 2026. All Rights Reserved by MeowBlog.
                </p>
            </div>

            {/* RIGHT SIDE: Forced Horizontal Flexbox (No more stacking!) */}
            <div className="w-full md:w-2/3 flex flex-row justify-between gap-4 text-left">
                
                {/* Box 1: Company */}
                <div>
                    <h3 className="mb-3 text-xs font-bold uppercase text-gray-500 tracking-wider">Company</h3>
                    <ul className="space-y-2">
                        <li><Link className="text-sm font-medium text-gray-800 hover:text-black" to="/">Features</Link></li>
                        <li><Link className="text-sm font-medium text-gray-800 hover:text-black" to="/">Pricing</Link></li>
                        <li><Link className="text-sm font-medium text-gray-800 hover:text-black" to="/">Affiliate</Link></li>
                    </ul>
                </div>

                {/* Box 2: Support */}
                <div>
                    <h3 className="mb-3 text-xs font-bold uppercase text-gray-500 tracking-wider">Support</h3>
                    <ul className="space-y-2">
                        <li><Link className="text-sm font-medium text-gray-800 hover:text-black" to="/">Account</Link></li>
                        <li><Link className="text-sm font-medium text-gray-800 hover:text-black" to="/">Help</Link></li>
                        <li><Link className="text-sm font-medium text-gray-800 hover:text-black" to="/">Contact</Link></li>
                    </ul>
                </div>

                {/* Box 3: Legals */}
                <div>
                    <h3 className="mb-3 text-xs font-bold uppercase text-gray-500 tracking-wider">Legals</h3>
                    <ul className="space-y-2">
                        <li><Link className="text-sm font-medium text-gray-800 hover:text-black" to="/">Terms</Link></li>
                        <li><Link className="text-sm font-medium text-gray-800 hover:text-black" to="/">Privacy</Link></li>
                    </ul>
                </div>

            </div>
        </div>
    </footer>
  )
}

export default Footer