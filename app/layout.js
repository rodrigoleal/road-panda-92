
import { Poppins } from 'next/font/google';
import "./globals.css";
import ThemeProvider from '../components/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import Script from 'next/script';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '600', '700', '900'],
  variable: "--font-main",
  display: 'swap',
});

export const metadata = {
  title: "Road Panda 92 | Cultura Automóvel Outdoor",
  description: "Comunidade e loja para entusiastas de carros, viagens e aventuras ao ar livre.",
};

// Set Lang to pt-PT
export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT" className={`${poppins.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9RNB8EKR3E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9RNB8EKR3E');
          `}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
