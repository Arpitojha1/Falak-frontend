/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Schedule } from './pages/Schedule';
import { Profile } from './pages/Profile';
import { SportsPage } from './pages/Sports';

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-midnight-indigo selection:bg-convergence-magenta selection:text-white">
      <Navigation />
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
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/sports" element={<SportsPage />} />
      </Routes>
    </Router>
  );
}
