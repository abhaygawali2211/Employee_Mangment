import React from 'react'
import { Loginleftside } from '../components/Loginleftside'
import { ArrowRight, ShieldIcon, UserIcon } from "lucide-react"
import { Link } from 'react-router-dom'

const portalOptions = [
  {
    to: "/login/admin",
    title: "Admin Portal",
    description: "Manage employee department, payroll and system configurations",
    icon: ShieldIcon
  },
  {
    to: "/login/employee",
    title: "Employee Portal",
    description: "View your profile, track attendance, request time off and access payslips",
    icon: UserIcon
  }
]

export const LoginLanding = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <Loginleftside />

      <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-16 relative overflow-auto'>
        <div className='w-full max-w-md relative z-10'>

          {/* Header */}
          <div className='mb-10 text-center md:text-left'>
            <h2 className='text-3xl font-medium text-slate-900 tracking-tight mb-3'>
              Welcome Back
            </h2>
            <p className='text-slate-500'>
              Select your portal to securely access the system
            </p>
          </div>

          {/* Portal List */}
          <div className='space-y-4'>
            {portalOptions.map((portal) => {
              const Icon = portal.icon
              return (
                <Link
                  key={portal.to}
                  to={portal.to}   // ✅ THIS WAS MISSING
                  className='group block bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50'
                >
                  <div className='flex items-start justify-between gap-4 sm:gap-5'>
                    <div>
                      <div className='flex items-center gap-3 mb-1'>
                        <Icon className='w-5 h-5 text-indigo-500' />
                        <h3 className='text-lg text-slate-800 group-hover:text-indigo-600 transition-colors'>
                          {portal.title}
                        </h3>
                      </div>
                      <p className='text-sm text-slate-500'>
                        {portal.description}
                      </p>
                    </div>

                    <ArrowRight className='w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-300' />
                  </div>
                </Link>
              )
            })}
          </div>
          {/*Footer*/}
{/* Footer */}
<div className="mt-12 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
  <p>
    © {new Date().getFullYear()} Employee Management System. All rights reserved.
  </p>

  <div className="mt-2 flex items-center justify-center gap-4">
    <span className="hover:text-indigo-600 cursor-pointer transition-colors">
      Privacy Policy
    </span>
    <span className="hover:text-indigo-600 cursor-pointer transition-colors">
      Terms of Service
    </span>
    <span className="hover:text-indigo-600 cursor-pointer transition-colors">
      Support
    </span>
  </div>
</div>

        </div>
      </div>
    </div>
  )
}