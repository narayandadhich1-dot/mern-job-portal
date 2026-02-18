import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#0b0d17] text-gray-400 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div>
          <h2 className="text-2xl font-bold text-white">Job<span className='text-[#F83002]'>Portal</span></h2>
          <p className="mt-4 text-sm leading-relaxed">
            Connecting talent with opportunity. Explore thousands of
            job openings from top companies across India.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Job Seekers</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#F83002] cursor-pointer transition-colors">Find Jobs</li>
            <li className="hover:text-[#F83002] cursor-pointer transition-colors">Upload Resume</li>
            <li className="hover:text-[#F83002] cursor-pointer transition-colors">Career Tips</li>
            <li className="hover:text-[#F83002] cursor-pointer transition-colors">Saved Jobs</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Employers</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#F83002] cursor-pointer transition-colors">Post a Job</li>
            <li className="hover:text-[#F83002] cursor-pointer transition-colors">Browse Candidates</li>
            <li className="hover:text-[#F83002] cursor-pointer transition-colors">Pricing Plans</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#F83002] cursor-pointer transition-colors">Help Center</li>
            <li className="hover:text-[#F83002] cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-[#F83002] cursor-pointer transition-colors">Terms & Conditions</li>
          </ul>
        </div>

      </div>
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer