import Hero from '@/components/Hero';
import APIGrid from '@/components/APIGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Hero />
          <APIGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
