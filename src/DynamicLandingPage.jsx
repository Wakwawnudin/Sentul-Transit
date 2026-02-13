import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { roomsData } from './roomsData';
import { 
  MapPin, Bed, Shield, Maximize, CheckCircle2, ChevronLeft, ChevronRight, Sparkles 
} from 'lucide-react';

// --- KOMPONEN SCROLL TO TOP ---
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

// --- MINI IMAGE SLIDER (Mandiri agar tidak error) ---
const ImageSlider = ({ images, heightClass = "h-56", roundedClass = "rounded-[32px]", altPrefix = "Apartemen Sentul" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { clientWidth } = scrollRef.current;
        const nextIndex = (activeIndex + 1) % images.length;
        scrollRef.current.scrollTo({ left: nextIndex * clientWidth, behavior: 'smooth' });
      }
    }, 3500); 
    return () => clearInterval(interval);
  }, [activeIndex, images.length]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  return (
    <div className={`relative w-full ${heightClass} group`}>
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className={`flex overflow-x-auto snap-x snap-mandatory w-full h-full no-scrollbar ${roundedClass}`}
        style={{ scrollBehavior: 'smooth' }}
      >
        {images.map((img, idx) => (
          <img key={idx} src={img} loading="lazy" className="w-full h-full object-cover shrink-0 snap-center" alt={`${altPrefix} ${idx + 1}`} />
        ))}
      </div>
      <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none ${roundedClass}`}></div>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, idx) => (
          <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${activeIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};

// --- KOMPONEN UTAMA ---
const DynamicLandingPage = () => {
  const { seoSlug } = useParams(); 
  const navigate = useNavigate();

  // 1. DECODE URL SLUG (Misal: "transit-3-jam-murah" jadi "transit 3 jam murah")
  const slug = seoSlug ? seoSlug.toLowerCase().replace(/-/g, ' ') : '';

  // 2. DETEKSI INTENSI USER
  const isMurah = slug.includes('murah') || slug.includes('budget');
  const isKeluarga = slug.includes('keluarga') || slug.includes('2br') || slug.includes('luas');
  const isTransit = slug.includes('transit');

  // 3. FILTER UNIT CERDAS
  // Karena semua unit ada di Sentul Tower, kita atur prioritas tampilannya
  let displayRooms = [...roomsData];

  if (isMurah) {
    // Jika cari murah, tampilkan Studio & 1BR saja
    displayRooms = displayRooms.filter(r => r.type === 'Studio' || r.type === '1BR');
  } else if (isKeluarga) {
    // Jika cari untuk keluarga, tampilkan 2BR dan 1BR
    displayRooms = displayRooms.filter(r => r.type === '2BR' || r.type === '1BR');
  }

  // Batasi hanya tampilkan 6 unit terbaik di halaman SEO ini agar loading cepat
  displayRooms = displayRooms.slice(0, 6);

  // 4. FORMAT JUDUL HALAMAN (Cantik & SEO Friendly)
  const pageTitle = seoSlug
    ? seoSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Sewa Apartemen Sentul Tower';

  // 👇 5. COPYWRITING DINAMIS (JURUS BUNGLON)
  let dynamicDesc = "Pilihan unit apartemen Sentul Tower terbaik yang sesuai dengan pencarian Anda. Privasi terjamin, higienis, dan nyaman untuk staycation atau istirahat sejenak.";
  if (isTransit) {
    dynamicDesc = `Layanan ${pageTitle.toLowerCase()} dengan fasilitas lengkap. Sangat cocok untuk Anda yang butuh tempat istirahat sementara yang bersih, aman, dan tanpa ribet di sekitar Sentul.`;
  } else if (isMurah) {
    dynamicDesc = `Mencari ${pageTitle.toLowerCase()}? Kami menawarkan unit dengan harga paling terjangkau di Sentul Tower tanpa mengorbankan kenyamanan dan kebersihan.`;
  } else if (isKeluarga) {
    dynamicDesc = `Nikmati momen kebersamaan dengan ${pageTitle.toLowerCase()}. Unit luas, fasilitas lengkap seperti di rumah sendiri, dengan pemandangan pegunungan yang menenangkan.`;
  } else {
    dynamicDesc = `Temukan ${pageTitle.toLowerCase()} dengan pelayanan bintang 5. Bebas ribet, privasi 100% aman, dan berdekatan langsung dengan pusat kuliner serta AEON Mall Sentul City.`;
  }

  // Jika URL error/aneh, batalkan render
  if (seoSlug && seoSlug.includes('.')) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      <Helmet>
        <title>{pageTitle} | Apartemen Sentul Tower</title>
        {/* 👇 Meta Description akan berubah sesuai paragraf bunglon */}
        <meta name="description" content={dynamicDesc} />
        <link rel="canonical" href={`https://apartemensentultower.com/${seoSlug}`} />
      </Helmet>

      {/* HEADER SECTION */}
      <div className="bg-slate-900 text-white pt-24 pb-16 px-6 rounded-b-[48px] mb-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/10 hover:bg-white/20 transition-colors text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
            <ChevronLeft size={14} /> Kembali ke Beranda
          </button>
          
          <h1 className="text-3xl md:text-5xl font-black capitalize mb-4 leading-tight tracking-tight">
            {pageTitle}
          </h1>
          
          {/* 👇 Paragraf layar akan berubah sesuai keyword */}
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed font-medium">
            {dynamicDesc}
          </p>
        </div>
      </div>

      {/* LISTING GRID */}
      <div className="max-w-6xl mx-auto px-4 space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {displayRooms.map(room => (
          <Link to={`/unit/${room.slug}`} key={room.id} className="block bg-white rounded-[32px] p-3 shadow-sm border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer group">
            <div className="relative">
              <ImageSlider images={room.images} heightClass="h-64" roundedClass="rounded-[24px]" altPrefix={room.altPrefix} />
              <div className="absolute top-4 left-4 flex gap-2 pointer-events-none z-20">
                <span className="bg-black/70 backdrop-blur-md text-[#D4AF37] text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest">{room.type}</span>
                {room.type === '2BR' && <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg">PREMIUM</span>}
              </div>
              <div className="absolute top-4 right-4 pointer-events-none z-20">
                <span className="bg-white/90 backdrop-blur text-slate-800 text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg border border-slate-100 uppercase tracking-wider">
                  {room.floorLevel}
                </span>
              </div>
            </div>

            <div className="pt-5 px-3 pb-3">
              <h3 className="text-xl font-black text-slate-900 mb-1.5 uppercase tracking-tight group-hover:text-[#D4AF37] transition-colors">{room.name}</h3>
              <div className="flex items-center gap-4 text-slate-400 text-[11px] font-bold mb-4 uppercase tracking-wide">
                <div className="flex items-center gap-1.5"><Maximize size={14}/> {room.size}</div>
                <div className="flex items-center gap-1.5"><Bed size={14}/> {room.beds} Bed</div>
                <div className="flex items-center gap-1.5"><Shield size={14}/> 24/7 Aman</div>
              </div>
              <div className="flex items-center gap-1.5 mb-4">
                 <CheckCircle2 size={12} className="text-green-500" fill="currentColor" color="white" />
                 <span className="text-[10px] font-bold text-slate-500 tracking-tight">Verified • Higienis • Nyaman</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-slate-50">
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Harga Mulai</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">Rp {room.startFrom}</p>
                </div>
                <button className="bg-slate-900 text-white font-bold px-6 py-3 rounded-2xl text-[11px] uppercase tracking-widest shadow-lg shadow-slate-200 group-hover:bg-[#D4AF37] transition-colors">Detail</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {displayRooms.length === 0 && (
        <div className="text-center py-20 px-6">
            <div className="bg-white rounded-[32px] p-8 max-w-md mx-auto shadow-xl border border-slate-100">
                <p className="text-slate-900 font-black text-xl mb-2 tracking-tight">Belum ada unit yang persis.</p>
                <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed">Pencarian spesifik ini belum tersedia, namun kami punya banyak opsi lain yang mungkin Anda suka.</p>
                <button onClick={() => navigate('/')} className="bg-slate-900 text-[#D4AF37] w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-colors">
                    Lihat Semua Katalog
                </button>
            </div>
        </div>
      )}

      <div className="text-center mt-12">
        <button onClick={() => navigate('/')} className="text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-[#D4AF37] hover:underline transition-all">
            KEMBALI KE HALAMAN UTAMA
        </button>
      </div>
    </div>
  );
};

export default DynamicLandingPage;
