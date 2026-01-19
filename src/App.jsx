import React, { useState, useEffect } from 'react';
import { 
  Home, MapPin, Maximize, Bed, Bath, Clock, Calendar, Shield, 
  Building, Phone, ChevronLeft, ChevronRight, CheckCircle2, 
  MessageCircle, Tv, Wind, Coffee, Utensils, Waves, Sparkles, 
  UtensilsCrossed 
} from 'lucide-react';

// --- KOMPONEN SLIDER BARU ---
const ImageSlider = ({ images, height = "h-56" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = (e) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={`relative group w-full ${height} overflow-hidden bg-slate-200`}>
      {/* Container Gambar */}
      <div 
        className="flex w-full h-full transition-transform duration-500 ease-out" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img key={index} src={img} className="w-full h-full object-cover flex-shrink-0" alt={`Slide ${index}`} />
        ))}
      </div>

      {/* Tombol Navigasi (Hanya muncul jika gambar > 1) */}
      {images.length > 1 && (
        <>
          <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100">
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Indikator Titik (Dots) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, index) => (
          <div 
            key={index} 
            className={`transition-all duration-300 h-1.5 rounded-full ${currentIndex === index ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`} 
          />
        ))}
      </div>
    </div>
  );
};

const GoogleMapsLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285F4"/>
    <path d="M12 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#FFFFFF"/>
    <path d="M12 2c-3.87 0-7 3.13-7 7 0 1.61.41 3.09 1.13 4.43L12 22l5.87-8.57C18.59 12.09 19 10.61 19 9c0-3.87-3.13-7-7-7z" fill="none" stroke="#FFFFFF" strokeWidth="0.5"/>
    <path d="M7.13 13.43c.72 1.34 3.87 5.57 4.87 8.57.1-.3.1-.3 0 0z" fill="#34A853"/>
    <path d="M16.87 13.43c-.72 1.34-3.87 5.57-4.87 8.57-.1-.3-.1-.3 0 0z" fill="#FBBC05"/>
    <path d="M12 2c-.34 0-.67.02-1 .07V9h1V2z" fill="#EA4335"/>
  </svg>
);

const App = () => {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const waNumber = "6283830033717";
  const mapsLink = "https://share.google/490MII2W8A99899m7";

  useEffect(() => {
    const handlePopState = () => { if (selectedRoom) setSelectedRoom(null); };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedRoom]);

  const openRoomDetail = (room) => {
    setSelectedRoom(room);
    window.history.pushState({ modalOpen: true }, "");
  };

  const closeRoomDetail = () => {
    setSelectedRoom(null);
    if (window.history.state?.modalOpen) window.history.back();
  };

  const handleWaClick = (roomName = "") => {
    const text = roomName ? `Halo, saya ingin booking unit ${roomName} di Sentul Tower Apartment.` : "Halo";
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const defaultTransit = [
    { label: '3 Jam', price: 'Rp 150.000' },
    { label: '6 Jam', price: 'Rp 200.000' },
    { label: '9 Jam', price: 'Rp 250.000' },
    { label: '12 Jam', price: 'Rp 300.000' },
  ];
  const defaultFullday = [
    { label: 'Weekday (Sen-Kam)', price: 'Rp 300.000' },
    { label: 'Weekend (Jum-Min)', price: 'Rp 350.000' },
  ];

  const specialTransit2BR = [
    { label: '3 Jam', price: 'Rp 200.000' },
    { label: '6 Jam', price: 'Rp 250.000' },
    { label: '9 Jam', price: 'Rp 300.000' },
    { label: '12 Jam', price: 'Rp 350.000' },
  ];
  const specialFullday2BR = [
    { label: 'Weekday (Sen-Kam)', price: 'Rp 650.000' },
    { label: 'Weekend (Jum-Min)', price: 'Rp 700.000' },
  ];

  const rooms = [
    {
      id: 1,
      name: 'STUDIO',
      type: 'Studio',
      size: '24m²',
      beds: 1,
      // UPDATE: Sekarang menggunakan array images
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000'
      ],
      description: 'Unit studio minimalis dengan interior modern yang sangat nyaman untuk istirahat sejenak atau staycation harian.',
      startFrom: '150rb',
      transit: defaultTransit,
      fullday: defaultFullday,
      specs: [
        { icon: <Bed size={16}/>, text: 'Queen Size Bed' },
        { icon: <Wind size={16}/>, text: 'Full AC' },
        { icon: <Tv size={16}/>, text: 'Smart TV (Netflix)' },
        { icon: <Utensils size={16}/>, text: 'Kitchen Set' },
        { icon: <Waves size={16}/>, text: 'Water Heater' },
        { icon: <Coffee size={16}/>, text: 'Complimentary Coffee' }
      ]
    },
    {
      id: 2,
      name: '1 Bedroom',
      type: '1BR',
      size: '38m²',
      beds: 1,
      images: [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000'
      ],
      description: 'Unit dengan kamar tidur terpisah dan ruang tamu yang luas untuk privasi maksimal.',
      startFrom: '150rb',
      transit: defaultTransit,
      fullday: defaultFullday,
      specs: [
        { icon: <Bed size={16}/>, text: 'King Size Bed' },
        { icon: <Building size={16}/>, text: 'Ruang Tamu Terpisah' },
        { icon: <Maximize size={16}/>, text: 'Balkon View Gunung' }
      ]
    },
    {
      id: 3,
      name: 'Family 2 Bedroom',
      type: '2BR',
      size: '56m²',
      beds: 2,
      images: [
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1000'
      ],
      description: 'Unit paling luas dengan 2 kamar tidur, sangat pas untuk keluarga atau grup kecil.',
      startFrom: '200rb',
      transit: specialTransit2BR,
      fullday: specialFullday2BR,
      specs: [
        { icon: <Bed size={16}/>, text: '1 Queen + 1 Single Bed' },
        { icon: <Tv size={16}/>, text: 'Smart TV & Home Theater' },
        { icon: <Maximize size={16}/>, text: 'Balkon Luas View Gunung' }
      ]
    }
  ];

  const filteredRooms = activeFilter === 'Semua' ? rooms : rooms.filter(r => r.type === activeFilter);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white shadow-lg">
            <Building size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-indigo-950 uppercase">Sentul Tower</span>
        </div>
        <button onClick={() => handleWaClick()} className="bg-green-50 text-green-600 p-2.5 rounded-full border border-green-100">
          <Phone size={18} />
        </button>
      </nav>

      {/* Hero */}
      <header className="relative h-[220px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Apartemen Sentul Tower" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center gap-1.5 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full w-fit mb-2">
            <MapPin size={10} /> SENTUL CITY, BOGOR
          </div>
          <h1 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">Sentul Tower Apartment</h1>
          <p className="text-slate-200 text-xs italic font-medium">Tempat terbaik untuk Transit & Staycation di Sentul</p>
        </div>
      </header>

      {/* Ringkasan Harga */}
      <section className="px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-[24px] shadow-2xl shadow-indigo-100/50 border border-slate-100 p-4 grid grid-cols-2 gap-3">
          <div className="bg-indigo-50/50 p-4 rounded-2xl flex flex-col items-center border border-indigo-100">
            <Clock className="text-indigo-600 mb-1.5" size={18} />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transit</span>
            <span className="text-sm font-black text-indigo-700 underline underline-offset-4 tracking-tight">Mulai 150rb</span>
          </div>
          <div className="bg-indigo-50/50 p-4 rounded-2xl flex flex-col items-center border border-indigo-100">
            <Calendar className="text-indigo-600 mb-1.5" size={18} />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fullday</span>
            <span className="text-sm font-black text-indigo-700 underline underline-offset-4 tracking-tight">Mulai 300rb</span>
          </div>
        </div>
      </section>

      {/* Katalog & Filter */}
      <section className="px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest">Katalog Unit</h2>
          <div className="flex gap-1.5">
            {['Semua', 'Studio', '1BR', '2BR'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`text-[9px] font-black px-3.5 py-2 rounded-full border transition-all ${activeFilter === f ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border-slate-200 text-slate-500'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredRooms.map(room => (
            <div key={room.id} onClick={() => openRoomDetail(room)} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer">
              {/* SLIDER DI KATALOG */}
              <ImageSlider images={room.images} />
              
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                   <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-lg uppercase">{room.type}</span>
                   {room.type === '2BR' && <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-lg">PREMIUM</span>}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1.5 uppercase tracking-tight">{room.name}</h3>
                <div className="flex items-center gap-4 text-slate-400 text-[11px] font-bold mb-5 uppercase tracking-wide">
                  <div className="flex items-center gap-1.5"><Maximize size={14}/> {room.size}</div>
                  <div className="flex items-center gap-1.5"><Bed size={14}/> {room.beds} Bed</div>
                </div>
                <div className="flex justify-between items-end pt-5 border-t border-slate-50">
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Harga Mulai</p>
                    <p className="text-2xl font-black text-indigo-600 tracking-tight">Rp {room.startFrom}</p>
                  </div>
                  <button className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-2xl text-[11px] uppercase tracking-widest">Detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Ringkas */}
      <footer className="bg-slate-900 text-white p-8 mx-4 rounded-[40px] mb-8 relative overflow-hidden text-center">
         <h3 className="text-2xl font-black mb-1 italic uppercase">Sentul Tower</h3>
         <p className="text-slate-500 text-[10px] mb-6 uppercase tracking-[0.3em]">Privasi & Kenyamanan Nomor 1</p>
         <div className="flex justify-center gap-4">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="bg-white p-3 rounded-2xl shadow-xl">
               <GoogleMapsLogo />
            </a>
            <button onClick={() => handleWaClick()} className="bg-green-600 p-3 rounded-2xl shadow-xl">
               <MessageCircle className="text-white" size={24} />
            </button>
         </div>
      </footer>

      {/* Modal Detail dengan Slider */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeRoomDetail}></div>
          <div className="bg-white w-full max-w-md rounded-t-[40px] relative z-10 p-7 animate-slide-up overflow-y-auto max-h-[95vh] no-scrollbar">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
            </div>
            
            {/* SLIDER DI MODAL DETAIL */}
            <div className="rounded-[32px] overflow-hidden shadow-lg mb-6">
               <ImageSlider images={selectedRoom.images} height="h-72" />
            </div>
            
            <button onClick={closeRoomDetail} className="absolute top-10 left-10 bg-white/50 backdrop-blur-md p-2 rounded-full text-slate-800">
               <ChevronLeft size={20} />
            </button>

            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">{selectedRoom.name}</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">{selectedRoom.description}</p>

            <div className="bg-slate-50 p-5 rounded-[32px] border border-slate-100 mb-6">
                <h4 className="text-[10px] font-black text-slate-400 flex items-center gap-2 mb-5 uppercase tracking-[0.2em]"><Clock size={14}/> Paket Transit</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedRoom.transit.map((p, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/50 flex flex-col items-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{p.label}</p>
                      <p className="text-sm font-black text-indigo-700">{p.price}</p>
                    </div>
                  ))}
                </div>
            </div>

            <div className="mb-10">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 text-center">Fasilitas Unit</h4>
               <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                {selectedRoom.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100/50">
                      {spec.icon}
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tighter">{spec.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => handleWaClick(selectedRoom.name)} className="w-full bg-green-600 text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all uppercase tracking-widest text-xs">
              <MessageCircle size={20} /> Hubungi Lewat WhatsApp
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default App;
