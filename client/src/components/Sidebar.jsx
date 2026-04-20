import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { dummyProfileData } from '../assets/assets'
import {
  Calendar,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
  ChevronRightIcon,
} from 'lucide-react'

export const Sidebar = () => {
  const { pathname } = useLocation()
  const [userName, setUserName] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setUserName(
      dummyProfileData.firstName + ' ' + dummyProfileData.lastName
    )
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const role = 'ADMIN' || 'EMPLOYEE'

  const navitems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutGridIcon },
    role === 'ADMIN'
      ? { name: 'Employee', href: '/employee', icon: UserIcon }
      : { name: 'Attendance', href: '/attendance', icon: Calendar },
    { name: 'Leave', href: '/leave', icon: FileTextIcon },
    { name: 'Payslips', href: '/payslips', icon: DollarSignIcon },
    { name: 'Settings', href: '/setting', icon: SettingsIcon },
  ]


  const handalLogout=()=>{

    window.location.href="/login"
  }
  const sidebarContent = (
    <>
      {/* brand Header */}
      <div className='px-5 pt-6 pb-5 border-b border-white/10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-3'>
            <UserIcon className='text-white w-7 h-7' />
            <div>
              <p className='font-semibold text-[13px] text-white tracking-wide'>
                Employee MS
              </p>
              <p className='text-[11px] text-slate-400 font-medium'>
                Management System
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className='lg:hidden text-slate-400 hover:text-white p-1'
          >
            <XIcon />
          </button>
        </div>
      </div>

      {/* user profile card */}
      {userName && (
        <div className='mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/5 border border-white/10'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-semibold'>
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className='min-w-0'>
              <p className='text-sm text-white font-medium truncate'>
                {userName}
              </p>
              <p className='text-xs text-slate-400'>
                {role === 'ADMIN' ? 'Administrator' : 'Employee'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* section label */}
      <div className='px-5 mt-6 mb-2'>
        <p className='text-xs text-slate-400 uppercase tracking-wider'>
          Navigation
        </p>
      </div>

      {/* Navigation List */}
      <div className='flex flex-col gap-1 px-3'>
        {navitems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`relative flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
              ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'}`}
            >
              {isActive && (
                <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-indigo-500' />
              )}

              <Icon className='w-[17px] h-[17px] shrink-0' />

              <span className='flex-1'>{item.name}</span>

              {isActive && <ChevronRightIcon size={16} />}
            </Link>
          )
        })}
      </div>

      {/*logout*/}
     <div className='p-3 mt-auto border-t border-white/10'>
  <button
    onClick={handalLogout}
    className='w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition'
  >
    <XIcon className='w-4 h-4' />
    <span>Logout</span>
  </button>
</div>
    </>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className='lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md border border-slate-300 bg-white shadow-md'
      >
        <MenuIcon size={20} />
      </button>

      {/* mobile overlay */}
      {mobileOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40'
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* desktop sidebar */}
      <aside className='hidden lg:flex flex-col h-screen w-[260px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white shrink-0 border-r border-white/10'>
        {sidebarContent}
      </aside>

      {/* mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[260px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white z-50 transform transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}