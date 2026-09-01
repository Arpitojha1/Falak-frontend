/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Schedule } from './pages/Schedule';
import { Profile } from './pages/Profile';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-midnight-indigo selection:bg-convergence-magenta selection:text-white">
        <Navigation />
        <div className="flex-grow pb-16 md:pb-0"> {/* padding bottom for mobile nav */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
