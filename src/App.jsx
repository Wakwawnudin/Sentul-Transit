import React, { useState, useEffect } from 'react';
import { 
  Home, MapPin, Maximize, Bed, Bath, Clock, Calendar, Shield, Building, 
  Phone, ChevronLeft, ChevronRight, CheckCircle2, MessageCircle, Tv, 
  Wind, Coffee, Utensils, Waves, Sparkles, UtensilsCrossed
} from 'lucide-react';

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
  const [currentImgIndex, setCurrentImgIndex] = useState(0); // State untuk slider

  const waNumber = "6283830033717";
  const mapsLink = "https://share.google/490MII2W8A99899m7";

  useEffect(() => {
    const handlePopState = () => { if (selectedRoom) setSelectedRoom(null); };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedRoom]);

  const openRoomDetail = (room) => {
    setSelectedRoom(room);
    setCurrentImgIndex(0); // Reset index saat buka modal
    window.history.pushState({ modalOpen: true }, "");
  };

  const closeRoomDetail = () => {
    setSelectedRoom(null);
    if (window.history.state?.modalOpen) window.history.back();
  };

  const nextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % selectedRoom.images.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + selectedRoom.images.length) % selectedRoom.images.length);
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

  const rooms = [
    {
      id: 1,
      name: 'STUDIO',
      type: 'Studio',
      size: '24m²',
      beds: 1,
      // SEKARANG MENGGUNAKAN ARRAY IMAGES
      images: [
        'https://images.unsplash.com/photo-1768383550694-adb7ddddad7d?q=80&w=1335&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1380&auto=format&fit=crop'
      ],
      description: 'Unit studio minimalis dengan interior modern yang sangat nyaman untuk istirahat sejenak atau staycation harian.',
      startFrom: '150rb',
      transit: defaultTransit,
      fullday: defaultFullday,
      specs: [
        { icon: <Bed size={16}/>, text: 'Queen Size Bed' },
        { icon: <Wind size={16}/>, text: 'Full AC' },
        { icon: <Tv size={16}/>, text: 'Smart TV (Netflix)' },
        { icon: <Utensils size={16}/>, text: 'Kitchen Set' }
      ]
    },
    {
      id: 2,
      name: '1 Bedroom',
      type: '1BR',
      size: '38m²',
      beds: 1,
      images: [
        'https://images.unsplash.com/photo-1768384554121-339e5c56b0e2?q=80&w=1335&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1470&auto=format&fit=crop'
      ],
      description: 'Unit dengan kamar tidur terpisah dan ruang tamu yang luas untuk privasi maksimal.',
      startFrom: '150rb',
      transit: defaultTransit,
      fullday: defaultFullday,
      specs: [
        { icon: <Bed size={16}/>, text: 'King Size Bed' },
        { icon: <Wind size={16}/>, text: 'Full AC' },
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
          'https://images.unsplash.com/photo-1768383550621-89197b8b9705?q=80&w=1335&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1470&auto=format&fit=crop'
        ],
        description: 'Unit paling luas dengan 2 kamar tidur, sangat pas untuk keluarga atau grup kecil.',
        startFrom: '200rb',
        transit: [
            { label: '3 Jam', price: 'Rp 200.000' },
            { label: '6 Jam', price: 'Rp 250.000' },
            { label: '9 Jam', price: 'Rp 300.000' },
            { label: '12 Jam', price: 'Rp 350.000' },
        ],
        fullday: [
            { label: 'Weekday (Sen-Kam)', price: 'Rp 650.000' },
            { label: 'Weekend (Jum-Min)', price: 'Rp 700.000' },
        ],
        specs: [
          { icon: <Bed size={16}/>, text: '1 Queen + 1 Single' },
          { icon: <Wind size={16}/>, text: 'Full AC tiap Kamar' },
          { icon: <Maximize size={16}/>, text: 'Balkon Luas' }
        ]
      }
  ];

  const filteredRooms = activeFilter === 'Semua' ? rooms : rooms.filter(r => r.type === activeFilter);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      {/* Navbar & Hero (Sama seperti sebelumnya) */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white shadow-lg shadow-indigo-200">
            <Building size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-indigo-950 uppercase">Sentul Tower</span>
        </div>
        <button onClick={() => handleWaClick()} className="bg-green-50 text-green-600 p-2.5 rounded-full border border-green-100 active:scale-90 transition-transform">
          <Phone size={18} />
        </button>
      </nav>

      {/* Katalog Unit */}
      <section className="px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest">Katalog Unit</h2>
          <div className="flex gap-1.5">
            {['Semua', 'Studio', '1BR', '2BR'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`text-[9px] font-black px-3.5 py-2 rounded-full border transition-all ${activeFilter === f ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredRooms.map(room => (
            <div key={room.id} onClick={() => openRoomDetail(room)} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer group">
              <div className="relative h-56 overflow-hidden">
                {/* Menampilkan gambar pertama dari array */}
                <img src={room.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={room.name} />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest">{room.type}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-slate-900 mb-1.5 uppercase tracking-tight">{room.name}</h3>
                <div className="flex justify-between items-end pt-5 border-t border-slate-50">
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Harga Mulai</p>
                    <p className="text-2xl font-black text-indigo-600 tracking-tight">Rp {room.startFrom}</p>
                  </div>
                  <button className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-2xl text-[11px] uppercase tracking-widest shadow-lg shadow-indigo-100">Detail Kamar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Detail dengan SLIDER */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeRoomDetail}></div>
          <div className="bg-white w-full max-w-md rounded-t-[40px] relative z-10 p-7 animate-slide-up overflow-y-auto max-h-[95vh] no-scrollbar shadow-2xl">
            
            <div className="flex items-center justify-between mb-6">
              <button onClick={closeRoomDetail} className="flex items-center gap-1.5 text-indigo-600 font-black text-[11px] uppercase tracking-widest bg-indigo-50 px-4 py-2.5 rounded-2xl active:scale-95 transition-all">
                <ChevronLeft size={18} /> Kembali
              </button>
              <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
              <div className="w-20"></div>
            </div>
            
            {/* --- BAGIAN SLIDER GAMBAR --- */}
            <div className="relative mb-6 group">
               <div className="overflow-hidden rounded-[32px] shadow-lg h-64 relative">
                  <img 
                    src={selectedRoom.images[currentImgIndex]} 
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out" 
                    alt={`Slide ${currentImgIndex}`} 
                  />
                  
                  {/* Tombol Navigasi Slider */}
                  {selectedRoom.images.length > 1 && (
                    <>
                      <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/50">
                        <ChevronLeft size={20} />
                      </button>
                      <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/50">
                        <ChevronRight size={20} />
                      </button>
                      
                      {/* Indikator Titik (Dots) */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {selectedRoom.images.map((_, idx) => (
                          <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === currentImgIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}></div>
                        ))}
                      </div>
                    </>
                  )}
               </div>
               <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase shadow-lg">
                  {currentImgIndex + 1} / {selectedRoom.images.length}
               </div>
            </div>
            {/* --- AKHIR BAGIAN SLIDER --- */}
            
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">{selectedRoom.name}</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">{selectedRoom.description}</p>

            {/* Paket Harga (Sama seperti sebelumnya) */}
            <div className="space-y-6 mb-8">
              <div className="bg-slate-50 p-5 rounded-[32px] border border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 flex items-center gap-2 mb-5 uppercase tracking-widest"><Clock size={14} className="text-indigo-600"/> Paket Harga Transit</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedRoom.transit.map((p, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/50 flex flex-col items-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{p.label}</p>
                      <p className="text-sm font-black text-indigo-700">{p.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => handleWaClick(selectedRoom.name)} className="w-full bg-green-600 text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all uppercase tracking-widest text-xs">
              <MessageCircle size={20} /> Hubungi Lewat WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Footer & Style tetap sama */}
      <footer className="bg-slate-900 text-white p-8 mx-4 rounded-[40px] mb-8 relative overflow-hidden">
         <h3 className="text-2xl font-black mb-3 uppercase italic">Sentul Tower</h3>
         <div className="flex gap-4 mt-6">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="bg-white p-3 rounded-2xl shadow-xl"><GoogleMapsLogo /></a>
            <button onClick={() => handleWaClick()} className="bg-green-600 p-3 rounded-2xl shadow-xl"><MessageCircle className="text-white" size={24} /></button>
         </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default App;
