/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/Footer';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Schedule = lazy(() => import('./pages/Schedule').then(module => ({ default: module.Schedule })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const SportsPage = lazy(() => import('./pages/Sports').then(module => ({ default: module.SportsPage })));
const CulturePage = lazy(() => import('./pages/Culture').then(module => ({ default: module.CulturePage })));

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-midnight-indigo selection:bg-convergence-magenta selection:text-white">
      <div className="flex-grow pb-16 md:pb-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-midnight-indigo flex items-center justify-center text-silver font-mono text-sm tracking-widest uppercase">Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/cultural" element={<CulturePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
