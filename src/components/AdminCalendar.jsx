import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Mail, Phone } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function midnight(d) {
  const c = new Date(d); c.setHours(0, 0, 0, 0); return c;
}

function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const totalDays = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay + 6) % 7; // convert to Mon-first

  const grid = [];
  for (let i = 0; i < startOffset; i++) grid.push(null);
  for (let d = 1; d <= totalDays; d++) grid.push(new Date(year, month, d));
  while (grid.length % 7 !== 0) grid.push(null);
  return grid;
}

const AdminCalendar = ({ bookings }) => {
  const today = useMemo(() => midnight(new Date()), []);
  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => today.getMonth());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const grid = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const navigate = (dir) => {
    if (dir === 'next') {
      if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
      else { setViewMonth(m => m + 1); }
    } else {
      if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
      else { setViewMonth(m => m - 1); }
    }
    setSelectedEvent(null);
  };

  const goToToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelectedEvent(null);
  };

  // Group bookings by date string (YYYY-MM-DD)
  const bookingsByDate = useMemo(() => {
    const map = {};
    bookings.forEach(b => {
      const d = new Date(b.date);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!map[key]) map[key] = [];
      map[key].push(b);
    });
    return map;
  }, [bookings]);

  return (
    <div className="flex flex-col h-full w-full bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/[0.05] p-6 shadow-2xl relative overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#FFFDF8]">{MONTH_NAMES[viewMonth]} {viewYear}</h3>
          <p className="text-[10px] text-[#FFFDF8]/50 uppercase tracking-[0.2em] mt-1">Manage your schedule</p>
        </div>
        <div className="flex gap-2">
          <button onClick={goToToday} className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold uppercase tracking-wider text-[#C5A059] transition-colors border border-white/[0.05]">
            Today
          </button>
          <button onClick={() => navigate('prev')} className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#FFFDF8] transition-colors border border-white/[0.05]">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => navigate('next')} className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#FFFDF8] transition-colors border border-white/[0.05]">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFFDF8]/40 pb-2 border-b border-white/[0.05]">
            {day}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 flex-1 border-l border-t border-white/[0.02] overflow-y-auto min-h-0">
        {grid.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} className="border-r border-b border-white/[0.02] bg-white/[0.01]"></div>;
          
          const isToday = date.getTime() === today.getTime();
          const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
          const dayBookings = bookingsByDate[key] || [];

          return (
            <div key={idx} className="border-r border-b border-white/[0.02] p-2 min-h-[100px] flex flex-col hover:bg-white/[0.02] transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-[#C5A059] text-[#12100E] font-bold shadow-[0_0_10px_rgba(197,160,89,0.5)]' : 'text-[#FFFDF8]/70'}`}>
                  {date.getDate()}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                {dayBookings.map((b, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedEvent(b)}
                    className={`w-full text-left px-2 py-1.5 rounded text-[10px] truncate transition-all duration-300 hover:scale-[1.02] ${
                      b.status === 'confirmed' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20'
                    }`}
                  >
                    <span className="font-bold">{b.firstName}</span> - {b.sessionType}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Details Overlay */}
      {selectedEvent && (
        <div className="absolute top-0 right-0 h-full w-80 bg-[#12100E]/95 backdrop-blur-xl border-l border-white/[0.05] p-6 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] transition-transform z-20 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-serif text-xl font-bold text-[#FFFDF8]">Event Details</h4>
            <button onClick={() => setSelectedEvent(null)} className="text-[#FFFDF8]/40 hover:text-[#FFFDF8] text-2xl leading-none">&times;</button>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.2em] mb-1">Client</p>
              <p className="text-lg font-medium text-[#FFFDF8]">{selectedEvent.firstName} {selectedEvent.lastName}</p>
            </div>
            
            <div>
              <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.2em] mb-2">Session Info</p>
              <div className="bg-white/[0.02] rounded-lg p-4 border border-white/[0.05] space-y-3">
                <p className="text-xs text-[#FFFDF8]/80 flex items-center gap-2 capitalize">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059]"></span> {selectedEvent.sessionType}
                </p>
                <p className="text-xs text-[#FFFDF8]/80 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" /> {new Date(selectedEvent.date).toLocaleDateString()}
                </p>
                <p className="text-xs flex items-center gap-2">
                   Status: {selectedEvent.status === 'confirmed' 
                    ? <span className="text-green-400 font-bold ml-1 uppercase tracking-wider text-[10px]">Confirmed</span> 
                    : <span className="text-yellow-400 font-bold ml-1 uppercase tracking-wider text-[10px]">Pending</span>}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.2em] mb-2">Contact</p>
              <div className="space-y-2">
                <p className="text-xs text-[#FFFDF8]/70 flex items-center gap-2 bg-white/[0.02] p-2 rounded">
                  <Mail className="w-3.5 h-3.5 text-[#C5A059]" /> {selectedEvent.email}
                </p>
                <p className="text-xs text-[#FFFDF8]/70 flex items-center gap-2 bg-white/[0.02] p-2 rounded">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" /> {selectedEvent.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCalendar;
