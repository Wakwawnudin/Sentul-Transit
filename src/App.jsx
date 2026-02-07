import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { 
  Home, MapPin, Maximize, Bed, Bath, Clock, Calendar, Shield, 
  Building, ChevronLeft, ChevronRight, CheckCircle2, 
  MessageCircle, Tv, Wind, Coffee, Utensils, Waves, Sparkles, 
  UtensilsCrossed, Key, Wallet, HelpCircle, ChevronDown, ChevronUp,
  ShoppingBag, Palmtree, ShieldCheck, Search
} from 'lucide-react';

// --- HELPER: AUTO IMAGE OPTIMIZER (IMAGEKIT) ---
const getOptimizedUrl = (url, width = 600) => {
  if (!url) return "";
  if (url.includes('ik.imagekit.io')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}tr=w-${width},q-80,f-auto`;
  }
  return url; 
};

// --- DATA GENERATOR (24 UNIT DUMMY) ---
const generateDummyRooms = () => {
  const baseImages = [
    'https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/20260206_023946.jpg', 
    'https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/20260206_023934.jpg', 
    'https://images.unsplash.com/photo-1768383550694-adb7ddddad7d?q=80&w=1335&auto=format&fit=crop',
    'https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/20260125_155132.jpg',
    'https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/20260125_155244.jpg',
    'https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/20260206_023956.jpg', 
    'https://images.unsplash.com/photo-1768384554121-339e5c56b0e2?q=80&w=1335&auto=format&fit=crop',
    'https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/20260125_155148.jpg',
    'https://images.unsplash.com/photo-1768383550621-89197b8b9705?q=80&w=1335&auto=format&fit=crop'
  ];

  const types = ['Studio', '1BR', '2BR'];
  const rooms = [];

  for (let i = 1; i <= 24; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const floor = Math.floor(Math.random() * 16) + 1; // Lantai 1 - 16
    const unitNum = Math.floor(Math.random() * 50) + 1; // Nomor Pintu Acak
    const formattedFloor = floor < 10 ? `0${floor}` : floor;
    const formattedUnit = unitNum < 10 ? `0${unitNum}` : unitNum;
    
    // Ambil 3 foto acak
    const shuffledImgs = [...baseImages].sort(() => 0.5 - Math.random());
    const selectedImgs = shuffledImgs.slice(0, 3);

    let price = '150rb';
    let size = '24m²';
    let beds = 1;
    let desc = 'Unit nyaman untuk istirahat.';

    if (type === '1BR') { price = '200rb'; size = '36m²'; desc = 'Unit luas dengan ruang tamu terpisah.'; }
    if (type === '2BR') { price = '300rb'; size = '52m²'; beds = 2; desc = 'Cocok untuk keluarga besar.'; }

    rooms.push({
      id: i,
      name: `${type} - VIEW GUNUNG`,
      type: type,
      size: size,
      beds: beds,
      // FORMAT BARU: LANTAI - UNIT
      roomNumber: `Lantai ${formattedFloor} - Unit ${formattedUnit}`, 
      images: selectedImgs,
      description: desc,
      startFrom: price,
      transit: [
        { label: '3 Jam', price: 'Rp 150.000' },
        { label: '6 Jam', price: 'Rp 200.000' },
      ],
      fullday: [
        { label: 'Weekday', price: 'Rp 300.000' },
        { label: 'Weekend', price: 'Rp 350.000' },
      ],
      specs: [
        { icon: <Bed size={16}/>, text: `${beds} Bed` }, 
        { icon: <Wind size={16}/>, text: 'Full AC' },
        { icon: <Tv size={16}/>, text: 'Smart TV' }, 
        { icon: <Waves size={16}/>, text: 'Water Heater' }
      ]
    });
  }
  return rooms;
};

// --- KOMPONEN UNIT BADGE ---
const UnitBadge = ({ unit }) => (
  <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-slate-200/50 px-2.5 py-1.5 rounded-xl shadow-lg w-fit">
    <Key size={12} className="text-[#D4AF37]" />
    <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">{unit}</span>
  </div>
);

// --- KOMPONEN IMAGE SLIDER ---
const ImageSlider = ({ images, heightClass = "h-56", roundedClass = "rounded-[32px]", altPrefix = "Apartemen Sentul Tower" }) => {
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

  const scrollNext = (e) => {
    e.stopPropagation();
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
    }
  };

  const scrollPrev = (e) => {
    e.stopPropagation();
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' });
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
          <img 
            key={idx}
            src={getOptimizedUrl(img)} 
            loading="lazy"      
            decoding="async"    
            className="w-full h-full object-cover shrink-0 snap-center" 
            alt={`${altPrefix} - View ${idx + 1}`} 
          />
        ))}
      </div>
      <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none ${roundedClass}`}></div>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, idx) => (
          <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${activeIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />
        ))}
      </div>
      <div className="absolute inset-y-0 left-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity md:flex hidden">
        <button onClick={scrollPrev} className="bg-white/30 hover:bg-white/50 backdrop-blur text-white p-1 rounded-full"><ChevronLeft size={20}/></button>
      </div>
      <div className="absolute inset-y-0 right-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity md:flex hidden">
        <button onClick={scrollNext} className="bg-white/30 hover:bg-white/50 backdrop-blur text-white p-1 rounded-full"><ChevronRight size={20}/></button>
      </div>
    </div>
  );
};

// --- KOMPONEN FAQ ITEM ---
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-700/50 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className={`text-sm font-bold transition-colors ${isOpen ? 'text-[#D4AF37]' : 'text-slate-200'}`}>
          {question}
        </span>
        {isOpen ? <ChevronUp size={18} className="text-[#D4AF37]" /> : <ChevronDown size={18} className="text-slate-500 group-hover:text-[#D4AF37]" />}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-xs text-slate-400 leading-relaxed pr-4 font-medium">
          {answer}
        </p>
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
  const [refCode, setRefCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  // GENERATE ROOMS (Hanya sekali saat load)
  // Menggunakan useState agar data tidak berubah-ubah saat re-render
  const [rooms] = useState(generateDummyRooms());

  const waNumber = "6283830033717";
  const mapsLink = "https://share.google/490MII2W8A99899m7";

  useEffect(() => {
    if (window.location.hostname.includes('apartsentul.cloud')) {
      window.location.replace("https://apartemensentultower.com/?ref=Lani");
      return; 
    }
    const queryParams = new URLSearchParams(window.location.search);
    const ref = queryParams.get('ref');
    if (ref) setRefCode(ref);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  useEffect(() => {
    const handlePopState = () => {
      if (selectedRoom) setSelectedRoom(null);
    };
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

  const handleWaClick = (messageType = "general", roomName = "", roomNumber = "") => {
    let text = "";
    const refTag = refCode ? `\n\n(Info by ${refCode})` : "";
    const roomInfo = roomNumber ? ` (${roomNumber})` : "";
    
    switch (messageType) {
      case "booking": text = `Halo, saya tertarik dengan unit ${roomName}${roomInfo} di Apartemen Sentul Tower.${refTag}`; break;
      case "chat": text = `Halo, saya mau tanya-tanya tentang sewa Apartemen Sentul Tower.${refTag}`; break;
      case "key": text = `Halo, saya sudah sampai di lokasi dan ingin AMBIL KUNCI.${refTag}`; break;
      case "payment": text = `Halo, saya ingin melakukan PEMBAYARAN DI TEMPAT.${refTag}`; break;
      default: text = `Halo, saya mau tanya sewa Apartemen Sentul Tower.${refTag}`;
    }
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const nearbyData = [
    { name: "AEON Mall", dist: "2 Mnt", icon: <ShoppingBag size={14}/> },
    { name: "IKEA Sentul", dist: "5 Mnt", icon: <ShoppingBag size={14}/> },
    { name: "SICC", dist: "7 Mnt", icon: <Building size={14}/> },
    { name: "RS EMC", dist: "3 Mnt", icon: <Shield size={14}/> },
    { name: "JungleLand", dist: "15 Mnt", icon: <Palmtree size={14}/> },
    { name: "Pasar Bersih", dist: "1 Mnt", icon: <Utensils size={14}/> },
  ];

  const faqData = [
    { q: "Bisa sewa transit?", a: "Bisa! Tersedia paket 3, 6, 12 jam. Cocok untuk istirahat singkat." },
    { q: "Harga mulai berapa?", a: "Transit mulai 150rb, Fullday weekday mulai 300rb." },
    { q: "Fasilitas apa saja?", a: "Full AC, Netflix, Water Heater, Alat Mandi." },
    { q: "Ada kolam renang?", a: "Ya, kolam renang tersedia di lantai podium untuk tamu." },
    { q: "Privasi aman?", a: "Sangat aman. Akses lift pakai kartu khusus & security 24 jam." },
    { q: "Parkir tersedia?", a: "Ada gedung parkir luas (mobil & motor) tarif resmi gedung." },
    { q: "Apa Perlu Jaminan?", a: "Foto KTP atau SIM saja cukup. KTP & SIM tidak ditahan" },
    { q: "Cara booking?", a: "Chat WA, pilih jadwal, datang. Bayar bisa Cash/Transfer di lokasi." }
  ];

  // --- LOGIC PAGINATION & FILTER ---
  const allFilteredRooms = activeFilter === 'Semua' ? rooms : rooms.filter(r => r.type === activeFilter);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = allFilteredRooms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allFilteredRooms.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.getElementById('katalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-32">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg">
            <span className="font-black text-2xl text-[#D4AF37] tracking-tighter drop-shadow-sm leading-none">ST</span>
          </div>
          <span className="font-bold text-sm md:text-lg tracking-tight text-slate-800 uppercase">Apartemen Sentul Tower</span>
        </div>
        <div className="flex items-center gap-2">
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="bg-white p-2.5 rounded-full border border-slate-200 shadow-sm active:scale-90 transition-transform flex items-center justify-center">
             <GoogleMapsLogo />
          </a>
          <button onClick={() => handleWaClick("general")} className="bg-green-50 text-green-600 p-2.5 rounded-full border border-green-100 active:scale-90 transition-transform">
            <MessageCircle size={18} />
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative h-[450px] overflow-hidden">
        <img 
            src={getOptimizedUrl("https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/AIEnhancer_20260206_022711.png")} 
            className="w-full h-full object-cover" 
            alt="Apartemen Sentul Tower View Gunung"
            loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-[#D4AF37] text-[10px] font-bold px-3 py-1.5 rounded-full w-fit mb-3 shadow-lg">
            <MapPin size={10} /> DEKAT AEON MALL SENTUL
          </div>
          <h1 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">Apartemen Sentul Tower</h1>
          <p className="text-slate-200 text-xs italic font-medium">Solusi Staycation Nyaman di Sentul City</p>
        </div>
      </header>

      {/* Ringkasan Harga */}
      <section className="px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-[24px] shadow-2xl shadow-slate-200/50 border border-slate-100 p-4 grid grid-cols-2 gap-3">
          <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center border border-slate-100">
            <Clock className="text-[#D4AF37] mb-1.5" size={18} />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transit</span>
            <span className="text-sm font-black text-slate-800 underline decoration-[#D4AF37]/50 decoration-2 underline-offset-4 tracking-tight">Mulai 150rb</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center border border-slate-100">
            <Calendar className="text-[#D4AF37] mb-1.5" size={18} />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fullday</span>
            <span className="text-sm font-black text-slate-800 underline decoration-[#D4AF37]/50 decoration-2 underline-offset-4 tracking-tight">Mulai 300rb</span>
          </div>
        </div>
      </section>

      {/* Katalog (ID untuk Scroll) */}
      <section id="katalog-section" className="px-4 py-8">
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest">KATALOG APARTEMEN</h2>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {['Semua', 'Studio', '1BR', '2BR'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`text-[9px] font-black px-3.5 py-2 rounded-full border transition-all whitespace-nowrap ${activeFilter === f ? 'bg-slate-900 border-slate-900 text-[#D4AF37] shadow-lg' : 'bg-white border-slate-200 text-slate-500 hover:border-[#D4AF37] hover:text-[#D4AF37]'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {currentRooms.map(room => (
            <div key={room.id} onClick={() => openRoomDetail(room)} className="bg-white rounded-[32px] p-3 shadow-sm border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer group">
              <div className="relative">
                <ImageSlider images={room.images} heightClass="h-72" roundedClass="rounded-[24px]" altPrefix={`Interior ${room.name} Sentul Tower`} />
                
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-20">
                  <div className="flex gap-2">
                     <span className="bg-black/70 backdrop-blur-md text-[#D4AF37] text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest">{room.type}</span>
                     {room.type === '2BR' && <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg">PREMIUM</span>}
                  </div>
                  
                  <UnitBadge unit={room.roomNumber} />
                </div>
              </div>
              
              <div className="pt-5 px-3 pb-3">
                <div className="flex justify-between items-start mb-4">
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{room.name}</h3>
                </div>

                <div className="flex items-center gap-4 text-slate-400 text-[11px] font-bold mb-5 uppercase tracking-wide">
                  <div className="flex items-center gap-1.5"><Maximize size={14}/> {room.size}</div>
                  <div className="flex items-center gap-1.5"><Bed size={14}/> {room.beds} Bed</div>
                  <div className="flex items-center gap-1.5"><Shield size={14}/> 24/7 Aman</div>
                </div>

                <div className="w-fit flex items-center gap-1.5 bg-blue-50/70 border border-blue-100/50 px-2.5 py-1.5 rounded-lg mb-4">
                   <ShieldCheck size={14} className="text-blue-500" />
                   <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Verified • Higienis • Aman</span>
                </div>

                <div className="flex justify-between items-end pt-5 border-t border-slate-50">
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Harga Mulai</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tight">Rp {room.startFrom}</p>
                  </div>
                  <button className="bg-slate-900 text-white font-bold px-6 py-3 rounded-2xl text-[11px] uppercase tracking-widest shadow-lg shadow-slate-200">Detail Kamar</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {allFilteredRooms.length > itemsPerPage && (
          <div className="flex flex-col items-center gap-4 mt-10">
            <div className="flex justify-center items-center gap-2">
              <button 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-xl border ${currentPage === 1 ? 'border-slate-100 text-slate-300' : 'border-slate-200 text-slate-600 hover:bg-slate-100'} transition-all`}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                      currentPage === i + 1 
                        ? 'bg-slate-900 text-[#D4AF37] shadow-lg scale-110' 
                        : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-xl border ${currentPage === totalPages ? 'border-slate-100 text-slate-300' : 'border-slate-200 text-slate-600 hover:bg-slate-100'} transition-all`}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {totalPages > 3 && (
               <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Lompat ke Hal</span>
                  <select 
                    value={currentPage} 
                    onChange={(e) => paginate(Number(e.target.value))}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-black rounded-lg py-1 px-2 focus:outline-none focus:border-[#D4AF37]"
                  >
                    {[...Array(totalPages)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
               </div>
            )}
          </div>
        )}
      </section>

      {/* --- MEGA FOOTER --- */}
      <footer className="bg-slate-900 text-white p-6 mx-4 rounded-[40px] mb-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          
          <div className="mb-10 pb-8 border-b border-slate-800/50">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="text-[#D4AF37]" size={16} />
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Tanya Jawab</h3>
            </div>
            <div className="bg-slate-800/20 rounded-2xl border border-slate-700/30 p-4">
              {faqData.map((item, index) => (
                <FaqItem key={index} question={item.q} answer={item.a} />
              ))}
              <div className="mt-4 pt-4 border-t border-slate-700/50 text-center">
                <button onClick={() => handleWaClick("chat")} className="text-[10px] font-bold text-[#D4AF37] hover:underline uppercase tracking-widest">
                    Chat Admin via WhatsApp
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
             <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter italic">Apartemen Sentul Tower</h3>
             <p className="text-slate-500 text-[10px] mb-8 italic">"Privasi & Kenyamanan Prioritas Kami"</p>
             
             <h4 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4">Cara Order Mudah</h4>
             
             <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div onClick={() => handleWaClick("chat")} className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all">
                   <MessageCircle className="text-[#D4AF37] mb-2" size={24} />
                   <span className="text-[10px] font-bold text-slate-300 uppercase">1. Chat WhatsApp</span>
                </div>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all">
                   <MapPin className="text-[#D4AF37] mb-2" size={24} />
                   <span className="text-[10px] font-bold text-slate-300 uppercase">2. Datang Lokasi</span>
                </a>
                <div onClick={() => handleWaClick("key")} className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all">
                   <Key className="text-[#D4AF37] mb-2" size={24} />
                   <span className="text-[10px] font-bold text-slate-300 uppercase">3. Ambil Kunci</span>
                </div>
                <div onClick={() => handleWaClick("payment")} className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all">
                   <Wallet className="text-[#D4AF37] mb-2" size={24} />
                   <span className="text-[10px] font-bold text-slate-300 uppercase">4. Bayar di Tempat</span>
                </div>
             </div>

             <div className="mt-8 pt-8 border-t border-slate-800/50">
                 <h4 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4">Lokasi Strategis</h4>
                 <div className="grid grid-cols-2 gap-2 text-left">
                   {nearbyData.map((item, idx) => (
                     <div key={idx} className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/30 flex items-center gap-2.5">
                        <div className="text-[#D4AF37]">{item.icon}</div>
                        <div>
                          <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">{item.dist}</p>
                          <p className="text-[10px] text-slate-200 font-bold leading-tight">{item.name}</p>
                        </div>
                     </div>
                   ))}
                 </div>
             </div>
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-800">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-xl flex items-center justify-center">
              <GoogleMapsLogo />
            </a>
            <button onClick={() => handleWaClick("general")} className="bg-[#25D366] p-2 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-xl shadow-green-900/30">
              <MessageCircle className="text-white" size={20} />
            </button>
            <div className="h-5 w-[1px] bg-slate-700"></div>
            <p className="text-[9px] font-black text-[#D4AF37] tracking-widest uppercase text-center leading-tight">
              Apartemen<br/>Sentul Tower
            </p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-800/50 text-center">
             <p className="text-[9px] text-slate-600 font-medium leading-relaxed">
               Melayani sewa apartemen harian Sentul City, transit 3 jam, 6 jam. Solusi penginapan murah alternatif hotel di Bogor.
             </p>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
      </footer>

      {/* Modal Detail */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeRoomDetail}></div>
          <div className="bg-white w-full max-w-md rounded-t-[40px] relative z-10 p-7 animate-slide-up overflow-y-auto max-h-[95vh] no-scrollbar shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={closeRoomDetail}
                className="flex items-center gap-1.5 text-slate-900 font-black text-[11px] uppercase tracking-widest bg-slate-100 px-4 py-2.5 rounded-2xl active:scale-95 transition-all"
              >
                <ChevronLeft size={18} /> Kembali
              </button>
              <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
              <div className="w-20"></div> 
            </div>
            
            <div className="relative mb-6">
               <ImageSlider images={selectedRoom.images} heightClass="h-72" roundedClass="rounded-[32px]" altPrefix={`Detail ${selectedRoom.name} Sentul`} />
               <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl shadow-sm z-20">
                  <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Pilihan {selectedRoom.type}</p>
               </div>
            </div>
            
            <div className="flex justify-between items-start mb-2">
               <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter tracking-tight">{selectedRoom.name}</h2>
            </div>
            
            <div className="mb-6 flex">
               <UnitBadge unit={selectedRoom.roomNumber} />
            </div>

            <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">{selectedRoom.description}</p>

            <div className="space-y-6 mb-8">
              <div className="bg-slate-50 p-5 rounded-[32px] border border-slate-100 shadow-inner">
                <h4 className="text-[10px] font-black text-slate-400 flex items-center gap-2 mb-5 uppercase tracking-[0.2em]"><Clock size={14} className="text-[#D4AF37]"/> Paket Harga Transit</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedRoom.transit.map((p, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/50 shadow-sm flex flex-col items-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{p.label}</p>
                      <p className="text-sm font-black text-slate-800 tracking-tight">{p.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#D4AF37]/10 p-5 rounded-[32px] border border-[#D4AF37]/20 shadow-sm">
                <h4 className="text-[10px] font-black text-[#D4AF37] flex items-center gap-2 mb-5 uppercase tracking-[0.2em]"><Calendar size={14}/> Paket Harga Fullday</h4>
                <div className="space-y-3">
                  {selectedRoom.fullday.map((p, i) => (
                    <div key={i} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#D4AF37]/10 shadow-sm">
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-tight">{p.label}</p>
                      <p className="text-sm font-black text-slate-900 tracking-tight">{p.price}</p>
                    </div>
                  ))}
                  <div className="pt-2">
                     <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 flex items-center justify-center gap-2">
                        <Clock size={14} className="text-amber-600" />
                        <p className="text-[10px] text-amber-700 font-black uppercase tracking-tighter">Checkout Fullday jam 12 Siang</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10 px-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] bg-slate-100 flex-1"></div>
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Spesifikasi Unit</h4>
                <div className="h-[2px] bg-slate-100 flex-1"></div>
              </div>
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                {selectedRoom.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-[#D4AF37] shadow-sm border border-slate-100">
                      {spec.icon}
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight tracking-tight uppercase">{spec.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => handleWaClick("booking", selectedRoom.name, selectedRoom.roomNumber)} className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-3 shadow-2xl shadow-green-200 active:scale-95 transition-all uppercase tracking-widest text-xs">
              <MessageCircle size={20} /> Hubungi Lewat WhatsApp
            </button>
          </div>
        </div>
      )}

      {!selectedRoom && (
        <div className="fixed bottom-6 left-0 right-0 px-6 z-40">
          <div onClick={() => handleWaClick("general")} className="bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl rounded-[24px] p-5 flex justify-between items-center max-w-sm mx-auto animate-bounce-subtle cursor-pointer active:scale-95 transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner"><MessageCircle size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Apartemen Sentul Tower</p>
                <p className="text-sm font-black tracking-tight">Booking Cepat Via WA</p>
              </div>
            </div>
            <ChevronRight size={24} />
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-bounce-subtle { animation: bounce-subtle 4s infinite ease-in-out; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .snap-mandatory { scroll-snap-type: x mandatory; }
        .snap-center { scroll-snap-align: center; }
      `}} />
      
      <Analytics />
    </div>
  );
};

export default App;
