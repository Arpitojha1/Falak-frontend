/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/Footer';
import { AnimatePresence, motion } from 'motion/react';
import RouteTransitionController from './components/RouteTransitionController';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Schedule = lazy(() => import('./pages/Schedule').then(module => ({ default: module.Schedule })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const SportsPage = lazy(() => import('./pages/Sports').then(module => ({ default: module.SportsPage })));
const CulturePage = lazy(() => import('./pages/Culture').then(module => ({ default: module.CulturePage })));
const Passes = lazy(() => import('./pages/Passes').then(module => ({ default: module.Passes })));

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-midnight-indigo selection:bg-convergence-magenta selection:text-white">
      <div className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  // Determine wash color based on destination route if coming from Navbar state
  // But standard way is to use location.state
  const washColorClass = location.state?.washColor || '';
  const isWipe = location.state?.isWipe || false;
  const duration = isWipe ? 0 : 0.5;

  return (
    <div className="relative w-full min-h-screen">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: isWipe ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: isWipe ? 1 : 0 }}
          transition={{ duration, ease: 'easeInOut' }}
          className="w-full h-full"
        >
          {/* Wash overlay during crossfade */}
          {washColorClass && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className={`fixed inset-0 z-40 pointer-events-none mix-blend-color ${washColorClass}`}
            />
          )}
          <Suspense fallback={<div className="min-h-screen bg-midnight-indigo flex items-center justify-center text-silver font-mono text-sm tracking-widest uppercase">Loading...</div>}>
            <Routes location={location}>
              <Route element={<MainLayout />}>
                <Route element={<RouteTransitionController><Outlet /></RouteTransitionController>}>
                  <Route path="/" element={<Home />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/support" element={<div className="pt-32 px-6 min-h-screen text-center">Support Page Stub</div>} />
                  <Route path="/about" element={<div className="pt-32 px-6 min-h-screen text-center">About Page Stub</div>} />
                </Route>
                <Route path="/passes" element={<Passes />} />
                <Route path="/sports" element={<SportsPage />} />
                <Route path="/cultural" element={<CulturePage />} />
              </Route>
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}
