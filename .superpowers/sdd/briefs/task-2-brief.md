# Task 2: Router + Page Scaffold

## Context
This is part of building the `/sports` landing page for the Falak 26 fest site. The Sports page must not use the shared Navigation or Footer, so we need to set up its routing outside the main layout wrapper.

## What to do

### 1. Create `src/pages/Sports.tsx`
Create this file with a minimal page shell:
```tsx
export function SportsPage() {
  return (
    <main className="w-full min-h-screen bg-midnight-indigo font-sans text-silver selection:bg-electric-orange selection:text-midnight-indigo">
      {/* We will add Hero, Events, and Footer here in subsequent tasks */}
      <div className="pt-32 px-6 flex justify-center">
        <h1 className="font-headline-sports-section text-4xl text-electric-orange">SPORTS HUB COMING SOON</h1>
      </div>
    </main>
  );
}
```

### 2. Add `/sports` route to `src/App.tsx`
In `App.tsx`, we have:
```tsx
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
```

We want the `/sports` route to be rendered *completely independent* of `<Navigation>` and `<Footer>`.
To do this, we should lift `<Routes>` to the top level inside `<Router>`, and put the existing routes inside a wrapper route or simply restructure so that `/sports` doesn't get the Navigation and Footer.

Since React Router v7 is used (and `react-router-dom`), the easiest way without restructuring everything is to do:

```tsx
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
```
Modify `App.tsx` to this exact structure.

## Verification
Run `npx vite build` to ensure it compiles.

## Commit
```
git add src/App.tsx src/pages/Sports.tsx
git commit -m "feat(sports): setup isolated routing and scaffold page shell"
```

## Files touched
- **Create:** `src/pages/Sports.tsx`
- **Modify:** `src/App.tsx`
