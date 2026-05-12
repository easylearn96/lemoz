import { useEffect, useRef } from 'react';
import { MapPin, Car, Sparkles } from 'lucide-react';

import { Card } from '@/components/ui/card';
import Navbar from '@/components/user/Navbar';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { findLocation } from '@/services/user/locationService';
import VehicleSearchBar from '@/components/user/VehicleSearchBar';
import { setLocation } from '@/store/slice/user/locationSlice';
import { resetSearchDate } from '@/store/slice/user/SearchDateSlice';
import Particles from '@/components/common/Particles';

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { latitude, longitude } = useSelector((state) => state.location)
  const fetchLocation = async (latitude, longitude) => {
    const data = await findLocation(latitude, longitude);
    return data.display_name;
  }

  useEffect(() => {
    dispatch(resetSearchDate())
    if (latitude && longitude) {
      (async () => {
        const address = await fetchLocation(latitude, longitude);
        setLocation(address);
      })();
    }
  }, [latitude, longitude, dispatch]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 z-0 h-screen w-full bg-black">
        {/* Abstract glowing orb background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen opacity-40"></div>
        <Particles className='absolute inset-0 z-0 animate-fade-in opacity-70' ease={80} quantity={120} staticity={30} />
      </div>

      <Navbar />

      <main className="relative px-6 pt-32 pb-16 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 animate-fade-in">
            <span className="text-white">Next generation</span>
            <br />
            <span className="text-gradient">mobility platform</span>
          </h1>
          <p className="text-xl text-zinc-400 font-light mb-8 max-w-2xl mx-auto animate-fade-in">
            Experience the future of personal transport with precision and elegance.
          </p>
        </div>
        <div className="h-30"></div>
        <VehicleSearchBar />
        <div className="max-w-7xl mx-auto pb-24 relative z-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="glow-border p-8 rounded-2xl bg-black/40 backdrop-blur-xl border-white/5 shadow-2xl hover:bg-black/60 transition-all duration-500 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,240,255,0.1)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <Car className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Precision Fleet</h3>
              <p className="text-zinc-400">Luxury vehicles maintained to technological perfection.</p>
            </Card>

            <Card className="glow-border p-8 rounded-2xl bg-black/40 backdrop-blur-xl border-white/5 shadow-2xl hover:bg-black/60 transition-all duration-500 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(139,92,246,0.1)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <MapPin className="text-purple-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Access</h3>
              <p className="text-zinc-400">Seamlessly deploy vehicles exactly where you need them.</p>
            </Card>

            <Card className="glow-border p-8 rounded-2xl bg-black/40 backdrop-blur-xl border-white/5 shadow-2xl hover:bg-black/60 transition-all duration-500 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Sparkles className="text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">White Glove</h3>
              <p className="text-zinc-400">Personalized attention down to the millimeter.</p>
            </Card>
          </div>
        </div>
      </main>

      <div className="fixed bottom-8 right-8 z-30">
        <div 
          onClick={() => navigate('/vehicle-list')}
          className="glow-border bg-black/80 backdrop-blur-md text-white border border-white/10 px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 cursor-pointer"
        >
          <span className="text-sm font-semibold tracking-wide text-gradient uppercase">Initialize booking →</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
