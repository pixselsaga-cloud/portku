import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ToastProvider } from '@/context/ToastContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Otajon Jahongirov — Graphic Designer & Creative Digital Artist',
  description: 'World-class personal creative studio platform showcasing visual brand identities, 3D CGI artwork, hypercar posters, and digital studio solutions.',
  openGraph: {
    title: 'Otajon Jahongirov — Creative Studio',
    description: 'World-class visual brand identities, 3D art & digital studio platform.',
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="bg-background text-foreground font-sans antialiased selection:bg-accent-purple selection:text-white min-h-screen flex flex-col">
        <LanguageProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-grow pt-24">{children}</main>
            <Footer />
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
