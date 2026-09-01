'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Shared, fully-themed filter controls used by both the yacht fleet and the
// villa list. Purely controlled — no data fetching happens here.

export const filterLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-tenor)',
  fontSize: 10,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#b8974a',
  display: 'block',
  marginBottom: 12,
}

export const rangeInputStyles = `
  .fleet-range-input {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    margin: 0;
    background: transparent;
    pointer-events: none;
    -webkit-appearance: none;
    appearance: none;
  }
  .fleet-range-input::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background: transparent;
  }
  .fleet-range-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    pointer-events: auto;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #d4b472;
    border: 2px solid #06090f;
    box-shadow: 0 0 0 1px rgba(184,151,74,0.6);
    cursor: pointer;
    margin-top: 0;
  }
  .fleet-range-input::-moz-range-track {
    background: transparent;
  }
  .fleet-range-input::-moz-range-thumb {
    pointer-events: auto;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #d4b472;
    border: 2px solid #06090f;
    box-shadow: 0 0 0 1px rgba(184,151,74,0.6);
    cursor: pointer;
  }
`

export function CustomSelect({
  label, value, options, onChange, placeholder,
}: {
  label: string
  value: string | null
  options: { value: string; label: string }[]
  onChange: (value: string | null) => void
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const [focusIntent, setFocusIntent] = useState<'first' | 'last' | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const triggerId = `select-${label.replace(/\s+/g, '-').toLowerCase()}`
  const listboxId = `${triggerId}-listbox`

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (!open || !focusIntent) return
    const optionEls = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? [])
    const target = focusIntent === 'last' ? optionEls[optionEls.length - 1] : optionEls[0]
    target?.focus()
    setFocusIntent(null)
  }, [open, focusIntent])

  const selectedLabel = options.find(o => o.value === value)?.label || placeholder

  return (
    <div
      ref={ref}
      style={{ position: 'relative' }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          setOpen(false)
          ref.current?.querySelector<HTMLButtonElement>('button')?.focus()
          return
        }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault()
          if (!open) {
            setOpen(true)
            setFocusIntent(e.key === 'ArrowDown' ? 'first' : 'last')
            return
          }
          const optionEls = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? [])
          if (optionEls.length === 0) return
          const currentIndex = optionEls.indexOf(document.activeElement as HTMLButtonElement)
          const nextIndex = e.key === 'ArrowDown'
            ? (currentIndex + 1) % optionEls.length
            : (currentIndex - 1 + optionEls.length) % optionEls.length
          optionEls[nextIndex]?.focus()
          return
        }
        if (open && (e.key === 'Home' || e.key === 'End')) {
          e.preventDefault()
          const optionEls = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? [])
          const target = e.key === 'Home' ? optionEls[0] : optionEls[optionEls.length - 1]
          target?.focus()
        }
      }}
    >
      <label id={`${triggerId}-label`} style={filterLabelStyle}>{label}</label>
      <button
        id={triggerId}
        type="button"
        onClick={(e) => {
          setOpen(o => {
            const next = !o
            if (next && e.detail === 0) setFocusIntent('first')
            return next
          })
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={`${triggerId}-label ${triggerId}`}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '13px 16px',
          fontFamily: 'var(--font-tenor)',
          fontSize: 12,
          textAlign: 'left',
          color: value ? '#f5eedd' : 'rgba(245,238,221,0.5)',
          background: open ? 'rgba(184,151,74,0.1)' : 'rgba(184,151,74,0.05)',
          border: `1px solid ${open ? '#b8974a' : 'rgba(184,151,74,0.25)'}`,
          borderRadius: 4,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedLabel}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ flexShrink: 0 }}
        >
          <path d="M1 1L5 5L9 1" stroke="#b8974a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            id={listboxId}
            aria-labelledby={`${triggerId}-label`}
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              zIndex: 30,
              maxHeight: 280,
              overflowY: 'auto',
              background: '#0b0e15',
              border: '1px solid rgba(184,151,74,0.35)',
              borderRadius: 4,
              boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
            }}
          >
            <button
              type="button"
              role="option"
              aria-selected={value === null}
              onClick={() => { onChange(null); setOpen(false) }}
              style={{
                width: '100%',
                textAlign: 'left',
                font: 'inherit',
                border: 'none',
                padding: '11px 16px',
                fontFamily: 'var(--font-tenor)',
                fontSize: 12,
                color: value === null ? '#b8974a' : 'rgba(245,238,221,0.55)',
                background: value === null ? 'rgba(184,151,74,0.1)' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(184,151,74,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = value === null ? 'rgba(184,151,74,0.1)' : 'transparent')}
            >
              {placeholder}
            </button>
            {options.map(o => (
              <button
                key={o.value}
                type="button"
                role="option"
                aria-selected={value === o.value}
                onClick={() => { onChange(o.value); setOpen(false) }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  font: 'inherit',
                  border: 'none',
                  borderTop: '1px solid rgba(184,151,74,0.08)',
                  padding: '11px 16px',
                  fontFamily: 'var(--font-tenor)',
                  fontSize: 12,
                  color: value === o.value ? '#b8974a' : 'rgba(245,238,221,0.8)',
                  background: value === o.value ? 'rgba(184,151,74,0.1)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(184,151,74,0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = value === o.value ? 'rgba(184,151,74,0.1)' : 'transparent')}
              >
                {o.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function DualRangeSlider({
  label, min, max, valueMin, valueMax, format, onChange,
}: {
  label: string
  min: number
  max: number
  valueMin: number
  valueMax: number
  format: (v: number) => string
  onChange: (min: number, max: number) => void
}) {
  const span = Math.max(max - min, 1)
  const percentMin = ((valueMin - min) / span) * 100
  const percentMax = ((valueMax - min) / span) * 100

  return (
    <div>
      <label style={filterLabelStyle}>{label}</label>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontFamily: 'var(--font-cormorant)', fontSize: 16, fontWeight: 300, color: '#d4b472' }}>
        <span>{format(valueMin)}</span>
        <span>{format(valueMax)}</span>
      </div>
      <div className="fleet-range" style={{ position: 'relative', height: 20, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'rgba(184,151,74,0.2)', borderRadius: 1 }} />
        <div
          style={{
            position: 'absolute',
            height: 2,
            background: 'linear-gradient(to right, #b8974a, #d4b472)',
            borderRadius: 1,
            left: `${percentMin}%`,
            width: `${Math.max(percentMax - percentMin, 0)}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={valueMin}
          onChange={(e) => onChange(Math.min(Number(e.target.value), valueMax), valueMax)}
          className="fleet-range-input"
          style={{ zIndex: valueMin > max - 5 ? 5 : 3 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={valueMax}
          onChange={(e) => onChange(valueMin, Math.max(Number(e.target.value), valueMin))}
          className="fleet-range-input"
          style={{ zIndex: 4 }}
        />
      </div>
    </div>
  )
}
