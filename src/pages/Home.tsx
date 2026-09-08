import { Hero } from '../components/Hero';
import { RecapSection } from '../components/RecapSection';
import { StoryChapters } from '../components/landing/StoryChapters';

export function Home() {
  return (
    <main className="w-full">
      {/*
        Hero block
      */}
      <div className="relative">
        <Hero />
      </div>
      <StoryChapters />
      <RecapSection />
    </main>
  );
}
