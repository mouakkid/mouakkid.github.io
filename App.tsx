import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Icons } from './components/Icons';
import { InstallGuide } from './components/InstallGuide';
import { BeforeInstallPromptEvent } from './types';

const App: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showClientArea, setShowClientArea] = useState(false);

  const MANAGEMENT_URL = "https://shop-from-london-management-system-final-266603318435.us-west1.run.app/";
  const INSTAGRAM_URL = "https://www.instagram.com/shop_from__london";

  useEffect(() => {
    // Animation trigger
    setIsLoaded(true);

    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(isStandaloneMode);

    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleCloseInstallGuide = () => {
    setShowInstallGuide(false);
    setShowClientArea(true);
  };

  const handleClientLogin = async () => {
    if (isStandalone) {
      setShowClientArea(true);
      return;
    }

    if (isIOS) {
      setShowInstallGuide(true);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
      setShowClientArea(true);
    } else {
      setShowClientArea(true);
    }
  };

  if (showClientArea) {
    return (
      <div className="fixed inset-0 z-[100] bg-london-dark animate-fade-in">
        <iframe
          src={MANAGEMENT_URL}
          className="w-full h-full border-0"
          title="Espace Client"
          allow="fullscreen"
        ></iframe>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans bg-london-dark">
      <Navbar />
      
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-london-blue/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-london-red/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[30vw] h-[30vw] bg-london-gold/5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {showInstallGuide && (
        <InstallGuide 
          onClose={handleCloseInstallGuide} 
          isIOS={isIOS} 
        />
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
        {/* Background Image with enhanced gradient */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-b from-london-dark via-london-dark/90 to-london-dark z-10"></div>
           <img 
            src="https://images.unsplash.com/photo-1520986606214-8b456906c813?q=80&w=2070&auto=format&fit=crop" 
            alt="London Fashion" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
          
          {/* Floating Badge */}
          <div className={`glass-panel inline-flex items-center gap-3 px-5 py-2 rounded-full mb-10 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-london-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-london-gold"></span>
            </span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
              Importation Directe <span className="text-london-gold mx-1">|</span> UK - Maroc
            </span>
          </div>

          {/* Main Typography */}
          <h1 className="mb-8 relative">
             <span className={`block text-4xl md:text-6xl text-white font-light tracking-tight mb-2 transform transition-all duration-1000 delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
               Shop From
             </span>
             <span className={`block text-6xl md:text-9xl font-serif font-bold text-gold-gradient italic transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
               London
             </span>
             {/* Decorative graphic element */}
             <div className={`absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-london-gold/10 to-transparent blur-3xl transition-opacity duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
          </h1>

          <p className={`text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            L'élégance à votre portée. Nous importons vos vêtements, chaussures et accessoires favoris directement d'Angleterre.
          </p>

          {/* Interactive Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 w-full max-w-lg mx-auto transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Instagram Button */}
            <a 
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-1/2 overflow-hidden rounded-xl p-[1px] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/20"
            >
               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="relative h-full bg-london-dark/90 backdrop-blur-sm rounded-[11px] flex items-center justify-center gap-3 px-6 py-4 group-hover:bg-transparent transition-colors duration-300">
                  <Icons.Instagram className="w-5 h-5 text-white" />
                  <span className="text-white font-bold tracking-wide text-sm">INSTAGRAM</span>
               </div>
            </a>

            {/* Login Button */}
            <button 
              onClick={handleClientLogin}
              className="group relative w-full sm:w-1/2 overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-london-blue/30"
            >
               <div className="absolute inset-0 bg-white"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
               <div className="relative h-full flex flex-col items-center justify-center px-6 py-3 text-london-dark">
                  <div className="flex items-center gap-2 font-bold tracking-wide text-sm">
                    <Icons.User className="w-5 h-5" />
                    <span>ESPACE CLIENT</span>
                  </div>
                  {!isStandalone && (
                    <span className="text-[10px] font-medium text-london-blue mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                      + Installer l'App
                    </span>
                  )}
               </div>
            </button>
          </div>
          
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 delay-1000 ${isLoaded ? 'opacity-70' : 'opacity-0'}`}>
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-london-gold to-transparent"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              delay={0}
              icon={<Icons.Bag className="w-6 h-6 text-london-gold" />}
              title="Personal Shopper"
              description="Accédez aux marques internationales sans quitter votre salon."
            />
            <FeatureCard 
              delay={200}
              icon={<Icons.Star className="w-6 h-6 text-london-gold" />}
              title="100% Authentique"
              description="Produits originaux garantis, achetés directement dans les boutiques officielles."
            />
            <FeatureCard 
              delay={400}
              icon={<Icons.Plane className="w-6 h-6 text-london-gold" />}
              title="Livraison Express"
              description="Logistique optimisée pour un acheminement rapide et sécurisé vers le Maroc."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 text-center border-t border-white/5 bg-london-dark z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-london-blue/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center justify-center gap-4">
          {/* Footer Logo Replaced here */}
           <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 relative group">
            <div className="absolute inset-0 bg-london-red rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
             <img 
              src="./logo.png" 
              alt="Shop From London" 
              className="relative w-full h-full object-contain p-1 bg-white/90 rounded-full shadow-lg border border-white/10"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.currentTarget;
                target.onerror = null; 
                target.style.display = 'none';
                const nextSibling = target.nextElementSibling as HTMLElement;
                if (nextSibling) {
                  nextSibling.style.display = 'flex';
                }
              }}
            />
            {/* Fallback */}
            <div className="hidden absolute inset-0 w-full h-full bg-london-red rounded-full items-center justify-center text-white font-serif font-bold text-xl shadow-lg">
              S
            </div>
          </div>
          <div className="font-serif text-xl text-white tracking-wide">
             Shop From <span className="text-london-gold italic">London</span>
          </div>
          <p className="text-slate-500 text-xs uppercase tracking-widest mt-4">&copy; {new Date().getFullYear()} Shop from london. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay + 800);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`glass-panel p-8 rounded-2xl text-center group hover:-translate-y-2 transition-all duration-500 border-t border-white/10 hover:border-london-gold/30 relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="mb-6 p-4 bg-white/5 w-16 h-16 mx-auto rounded-2xl rotate-3 flex items-center justify-center shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 border border-white/10">
          {icon}
        </div>
        <h3 className="text-lg font-serif font-bold text-white mb-4 tracking-wide">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
};

export default App;