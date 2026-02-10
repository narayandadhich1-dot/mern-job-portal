import React from 'react'

const footer = () => {
  return (
    <div className="bg-gray-900 text-gray-300 mt-20">
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
    
    {/* Brand */}
    <div>
      <h2 className="text-2xl font-bold text-white">JobHunt</h2>
      <p className="mt-4 text-sm leading-relaxed">
        JobHunt helps you find the right job faster. Explore thousands of
        opportunities from top companies across India.
      </p>
    </div>

    {/* For Job Seekers */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Job Seekers</h3>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-white cursor-pointer">Find Jobs</li>
        <li className="hover:text-white cursor-pointer">Upload Resume</li>
        <li className="hover:text-white cursor-pointer">Career Tips</li>
        <li className="hover:text-white cursor-pointer">Saved Jobs</li>
      </ul>
    </div>

    {/* For Employers */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Employers</h3>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-white cursor-pointer">Post a Job</li>
        <li className="hover:text-white cursor-pointer">Browse Candidates</li>
        <li className="hover:text-white cursor-pointer">Pricing Plans</li>
        <li className="hover:text-white cursor-pointer">Recruitment Solutions</li>
      </ul>
    </div>

    {/* Support */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-white cursor-pointer">Help Center</li>
        <li className="hover:text-white cursor-pointer">Privacy Policy</li>
        <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
        <li className="hover:text-white cursor-pointer">Contact Us</li>
      </ul>
    </div>

  </div>

  {/* Bottom bar */}
  <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
    © {new Date().getFullYear()} JobHunt. All rights reserved.
  </div>
</div>

  )
}

export default footer
