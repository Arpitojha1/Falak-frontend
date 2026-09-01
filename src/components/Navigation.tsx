import { NavLink } from 'react-router-dom';
import { Home, Calendar, User } from 'lucide-react';
import { LogoImage } from './LogoImage';

export function Navigation() {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Schedule', path: '/schedule', icon: Calendar },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Desktop Top Nav */}
      <nav className="hidden md:flex fixed top-0 w-full z-50 bg-midnight-indigo/90 backdrop-blur-md border-b border-silver/10 px-8 py-4 items-center justify-between">
        <LogoImage className="h-8 md:h-10" />
        <div className="flex gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-mono text-sm uppercase tracking-widest transition-colors ${
                  isActive ? 'text-convergence-magenta' : 'text-silver hover:text-white'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-midnight-indigo/90 backdrop-blur-md border-t border-silver/10 px-6 py-4 flex justify-between items-center pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-convergence-magenta' : 'text-silver hover:text-white'
                }`
              }
            >
              <Icon size={24} strokeWidth={1.5} />
              {/* Tab label: tag/label role — Space Mono */}
              <span className="font-mono text-[10px] uppercase tracking-wider">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
