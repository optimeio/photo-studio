/**
 * BookingCalendar.jsx — Compact inline calendar
 * Pure custom React (no library dependency).
 * Fixed 26×26 px circular day cells, centred in card.
 */

import React, { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Constants ──────────────────────────────────────────────────────────── */

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const WEEKDAYS = ['Mo','Tu','We','Th','Fr','Sa','Su'];

/* ─── Utilities ──────────────────────────────────────────────────────────── */

function midnight(d) {
  const c = new Date(d); c.setHours(0,0,0,0); return c;
}

function toKey(d) {
  return [
    d.getFullYear(),
    String(d.getMonth()+1).padStart(2,'0'),
    String(d.getDate()).padStart(2,'0'),
  ].join('-');
}

function isSameDay(a, b) {
  return a && b &&
    a.getFullYear()===b.getFullYear() &&
    a.getMonth()===b.getMonth() &&
    a.getDate()===b.getDate();
}

/** Mon-first 7-column grid: Date | null for padding cells */
function buildMonthGrid(year, month) {
  const firstDay  = new Date(year, month, 1).getDay(); // 0=Sun
  const totalDays = new Date(year, month+1, 0).getDate();
  const startOffset = (firstDay + 6) % 7; // convert to Mon-first

  const grid = [];
  for (let i = 0; i < startOffset; i++) grid.push(null);
  for (let d = 1; d <= totalDays; d++) grid.push(new Date(year, month, d));
  while (grid.length % 7 !== 0) grid.push(null);
  return grid;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

function BookingCalendar({ selectedDate, onSelectDate, availMap = {} }) {
  const today   = useMemo(() => midnight(new Date()), []);
  const minDate = useMemo(() => { const d = new Date(today); d.setDate(d.getDate()+1); return d; }, [today]);
  const maxDate = useMemo(() => { const d = new Date(today); d.setDate(d.getDate()+90); return d; }, [today]);

  const [viewYear,  setViewYear]  = useState(() => minDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => minDate.getMonth());
  const [slideDir,  setSlideDir]  = useState('next');
  const [slideKey,  setSlideKey]  = useState(0);

  const wrapperRef = useRef(null);
  const gridKey = `${viewYear}-${viewMonth}-${slideKey}`;

  /* Mount animation: fade + scale */
  useEffect(() => {
    if (!wrapperRef.current) return;
    gsap.from(wrapperRef.current, {
      opacity: 0, scale: 0.96, y: 12,
      duration: 0.25, ease: 'power3.out', clearProps: 'all',
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Month navigation */
  const navigate = useCallback((dir) => {
    setSlideDir(dir);
    setSlideKey(k => k+1);
    if (dir === 'next') {
      if (viewMonth===11) { setViewMonth(0); setViewYear(y=>y+1); }
      else                { setViewMonth(m=>m+1); }
    } else {
      if (viewMonth===0)  { setViewMonth(11); setViewYear(y=>y-1); }
      else                { setViewMonth(m=>m-1); }
    }
  }, [viewMonth]);

  const goToToday = useCallback(() => {
    setSlideDir('next'); setSlideKey(k=>k+1);
    setViewYear(minDate.getFullYear());
    setViewMonth(minDate.getMonth());
  }, [minDate]);

  const grid = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const canGoPrev = viewYear > minDate.getFullYear() ||
    (viewYear===minDate.getFullYear() && viewMonth > minDate.getMonth());
  const canGoNext = viewYear < maxDate.getFullYear() ||
    (viewYear===maxDate.getFullYear() && viewMonth < maxDate.getMonth());

  return (
    <div className="bc-wrapper" ref={wrapperRef} aria-label="Appointment calendar">

      {/* Header */}
      <div className="bc-header">
        <div className="bc-header-left">
          <h3 className="bc-month-name">{MONTH_NAMES[viewMonth]}</h3>
          <span className="bc-year">{viewYear}</span>
        </div>
        <div className="bc-nav-group">
          <button type="button" className="bc-today-btn" onClick={goToToday} aria-label="Today">
            Today
          </button>
          <button
            type="button"
            className={`bc-nav-btn ${!canGoPrev ? 'disabled' : ''}`}
            onClick={() => canGoPrev && navigate('prev')}
            disabled={!canGoPrev}
            aria-label="Previous month"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            type="button"
            className={`bc-nav-btn ${!canGoNext ? 'disabled' : ''}`}
            onClick={() => canGoNext && navigate('next')}
            disabled={!canGoNext}
            aria-label="Next month"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="bc-weekdays" role="row">
        {WEEKDAYS.map(d => (
          <span key={d} className="bc-weekday" role="columnheader">{d}</span>
        ))}
      </div>

      {/* Legend */}
      <div className="bc-legend">
        <span className="bc-legend-item"><span className="bc-dot available" />Available</span>
        <span className="bc-legend-item"><span className="bc-dot few" />Few</span>
        <span className="bc-legend-item"><span className="bc-dot booked" />Booked</span>
      </div>

      {/* Day grid — key forces remount → CSS slide animation */}
      <div
        key={gridKey}
        className={`bc-grid bc-slide-${slideDir}`}
        role="grid"
        aria-label={`${MONTH_NAMES[viewMonth]} ${viewYear}`}
      >
        {grid.map((date, idx) => {
          if (!date) return <span key={`e-${idx}`} className="bc-cell-empty" aria-hidden="true" />;

          const key      = toKey(date);
          const disabled = date < minDate || date > maxDate;
          const isToday  = isSameDay(date, today);
          const isSel    = isSameDay(date, selectedDate);
          const avail    = availMap[key] ?? 'available';

          return (
            <button
              key={key}
              type="button"
              role="gridcell"
              className={[
                'bc-day',
                isToday  ? 'is-today'    : '',
                isSel    ? 'is-selected' : '',
                disabled ? 'is-disabled' : '',
              ].filter(Boolean).join(' ')}
              disabled={disabled}
              aria-selected={isSel}
              aria-label={date.toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' })}
              onClick={() => !disabled && onSelectDate(date)}
            >
              <span className="bc-day-num">{date.getDate()}</span>
              {!disabled && <span className={`bc-dot ${avail}`} aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default memo(BookingCalendar);
