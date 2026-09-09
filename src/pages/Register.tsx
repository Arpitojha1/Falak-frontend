import React, { useState, ChangeEvent, FormEvent } from 'react';

export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // clear error when typing
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    console.log('Form submitted:', formData);
    // Placeholder handler
    alert('Form state logged to console (frontend-only build)');
  };

  return (
    <div className="w-full min-h-screen pt-32 pb-16 px-6 flex items-center justify-center font-['Archivo',_sans-serif]">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Form Box */}
        <div className="bg-midnight-indigo border border-silver/20 p-8 rounded-lg shadow-[8px_8px_0_0_var(--color-convergence-magenta)] relative z-10 w-full max-w-md mx-auto md:ml-auto md:mr-12">
          <h1 className="text-3xl font-bold text-silver mb-2">Register</h1>
          <p className="text-silver/60 mb-8">Join Falak '26. Create your account before picking a track.</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-silver font-medium" htmlFor="name">Name</label>
              <input 
                required
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent border border-silver/30 rounded p-3 text-silver focus:outline-none focus:border-convergence-magenta transition-colors"
                placeholder="Your full name"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-silver font-medium" htmlFor="email">Email</label>
              <input 
                required
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent border border-silver/30 rounded p-3 text-silver focus:outline-none focus:border-convergence-magenta transition-colors"
                placeholder="you@example.com"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-silver font-medium" htmlFor="password">Password</label>
              <input 
                required
                type="password" 
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent border border-silver/30 rounded p-3 text-silver focus:outline-none focus:border-convergence-magenta transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-silver font-medium" htmlFor="confirmPassword">Confirm Password</label>
              <input 
                required
                type="password" 
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-transparent border border-silver/30 rounded p-3 text-silver focus:outline-none focus:border-convergence-magenta transition-colors"
                placeholder="••••••••"
              />
              {error && <span className="text-convergence-magenta text-xs font-semibold mt-1">{error}</span>}
            </div>
            
            <button 
              type="submit"
              className="mt-4 w-full bg-convergence-magenta text-white font-bold py-4 rounded hover:bg-opacity-90 transition-opacity uppercase tracking-wider cursor-pointer"
            >
              Register
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-silver/60">
            Already have an account? <a href="#login" className="text-convergence-magenta hover:underline ml-1">Log in</a>
          </div>
        </div>

        {/* Decorative Logo Treatment */}
        <div className="hidden md:flex flex-col gap-4 items-start justify-center relative pointer-events-none md:mr-auto">
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
             <img src="/assets/logo/Falak-1.jpeg" alt="Falak '26 Logo 1" className="w-full h-auto object-cover border border-silver/20 rounded grayscale opacity-40 mix-blend-screen" />
             <img src="/assets/logo/Falak-2.jpeg" alt="Falak '26 Logo 2" className="w-full h-auto object-cover border border-silver/20 rounded grayscale opacity-40 mix-blend-screen" />
             <img src="/assets/logo/Falak-4.jpeg" alt="Falak '26 Logo 4" className="w-full h-auto object-cover border border-silver/20 rounded grayscale opacity-40 mix-blend-screen" />
             <img src="/assets/logo/Falak-7.jpeg" alt="Falak '26 Logo 7" className="w-full h-auto object-cover border border-silver/20 rounded grayscale opacity-40 mix-blend-screen" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-midnight-indigo via-transparent to-midnight-indigo z-10 pointer-events-none opacity-80" />
        </div>
        
      </div>
    </div>
  );
}
