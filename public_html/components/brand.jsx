// ─── BRAND TOKENS ─────────────────────────────────────────────────────────────
const B = {
  blue:   '#1E73D8',
  cyan:   '#2FC7D6',
  lcyan:  '#57D6C7',
  grad:   'linear-gradient(135deg,#1E73D8,#2FC7D6)',
  bgW:    '#FFFFFF',
  bgL:    '#E8F2FC',   // nettement plus distinct du blanc
  bgD:    '#0B1726',
  bgD2:   '#0E1C35',
  bgFoot: '#070E1A',
  tMain:  '#0B1726',
  tMuted: '#5B7A9B',
  border: '#CCE0F0',   // légèrement plus prononcé
  shadow: '0 4px 24px rgba(16,63,115,0.08)',
};
window.B = B;

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useOnScreen(ref, threshold = 0.15) {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVis(true); }, { threshold });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return vis;
}
window.useOnScreen = useOnScreen;

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Ico = {
  Phone: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 12 19.79 19.79 0 011.49 3.37 2 2 0 013.48 1h3a2 2 0 012 1.72c.127.96.361 1.9.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Clock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  Filter: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Chart: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  Link: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  ArrowR: ({size=14,color='white'}) => <svg width={size} height={size} viewBox="0 0 15 15" fill="none"><path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Star: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="#FBBF24"><path d="M7 1l1.76 3.57L13 5.27l-3 2.93.71 4.13L7 10.4l-3.71 1.93.71-4.13-3-2.93 4.24-.7z"/></svg>,
  Mic: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.6"/><path d="M5 10a7 7 0 0014 0M12 19v3M8 22h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  Shield: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Zap: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Building: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21V13h6v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  Play: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/><path d="M10 8l6 4-6 4V8z" fill="currentColor"/></svg>,
  Car: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 17H3v-4l2.5-7h11l2.5 7v4h-2M5 17h14M7.5 17a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM16.5 17a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Utensils: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Wrench: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Briefcase: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M12 12v.01M8 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  Message: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.6"/></svg>,
};
window.Ico = Ico;

// ─── ATOMS ────────────────────────────────────────────────────────────────────
// Logo — dark background
function OmniraLogo({ height = 68 }) {
  return (
    <img src="uploads/omnira-logo-transparent.png" alt="Omnira"
      style={{height:`${height}px`,width:'auto',display:'block',
        mixBlendMode:'screen',
        filter:'brightness(1.15) drop-shadow(0 0 12px rgba(47,199,214,0.45))',
      }}/>
  );
}
// Logo — light background
function OmniraLogoColor({ height = 68 }) {
  return (
    <img src="uploads/omnira-logo-transparent.png" alt="Omnira"
      style={{height:`${height}px`,width:'auto',display:'block',
        mixBlendMode:'multiply',
        filter:'saturate(1.1)',
      }}/>
  );
}
window.OmniraLogo = OmniraLogo;
window.OmniraLogoColor = OmniraLogoColor;

function Chip({ children, color = B.cyan }) {
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:'7px',fontSize:'10.5px',fontWeight:700,padding:'5px 14px',borderRadius:'99px',textTransform:'uppercase',letterSpacing:'0.12em',color,background:`${color}13`,border:`1px solid ${color}28`,fontFamily:'JetBrains Mono,monospace'}}>
      <span style={{width:'5px',height:'5px',borderRadius:'50%',background:color,flexShrink:0,opacity:0.85}}/>
      {children}
    </span>
  );
}
window.Chip = Chip;

function GBtn({ href='#', onClick, children, variant='primary', size='md', style:extraStyle={}, full=false }) {
  const pad = {sm:'10px 22px',md:'13px 28px',lg:'16px 36px'}[size];
  const fs  = {sm:'13px',md:'14px',lg:'15px'}[size];
  const variants = {
    primary: {
      background: B.grad,
      color: 'white',
      border: 'none',
      boxShadow: '0 6px 24px rgba(30,115,216,0.38), inset 0 1px 0 rgba(255,255,255,0.18)',
    },
    outline: {
      // gradient border: couleur du fond transparent, gradient en bordure
      background: 'rgba(11,23,38,0.35) padding-box, linear-gradient(135deg,#1E73D8,#2FC7D6) border-box',
      color: 'white',
      border: '1px solid transparent',
      backdropFilter: 'blur(10px)',
    },
    white: {
      background: 'white',
      color: B.tMain,
      border: '1px solid rgba(0,0,0,0.07)',
      boxShadow: '0 6px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)',
    },
    light: {
      background: B.bgW,
      color: B.tMain,
      border: `1px solid ${B.border}`,
      boxShadow: B.shadow,
    },
  };
  const base = {
    position:'relative', overflow:'hidden',
    display:'inline-flex', alignItems:'center', justifyContent:full?'center':'flex-start',
    gap:'8px', fontFamily:'Sora,sans-serif', fontWeight:700,
    borderRadius:'12px', padding:pad, fontSize:fs,
    cursor:'pointer', textDecoration:'none',
    transition:'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, filter 0.2s ease',
    width:full?'100%':'auto',
    ...variants[variant], ...extraStyle,
  };
  const onEnter = e => {
    const el = e.currentTarget;
    el.style.transform = 'translateY(-3px) scale(1.025)';
    if(variant==='primary') el.style.boxShadow = '0 16px 40px rgba(30,115,216,0.52), inset 0 1px 0 rgba(255,255,255,0.2)';
    if(variant==='white')   el.style.boxShadow = '0 14px 36px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,1)';
    if(variant==='outline') el.style.filter = 'brightness(1.12)';
    if(variant==='light')   el.style.boxShadow = '0 8px 28px rgba(16,63,115,0.12)';
    const s = el.querySelector('.btn-shimmer');
    if(s) s.style.left = '160%';
  };
  const onLeave = e => {
    const el = e.currentTarget;
    el.style.transform = 'translateY(0) scale(1)';
    if(variant==='primary') el.style.boxShadow = '0 6px 24px rgba(30,115,216,0.38), inset 0 1px 0 rgba(255,255,255,0.18)';
    if(variant==='white')   el.style.boxShadow = '0 6px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)';
    if(variant==='outline') el.style.filter = 'none';
    if(variant==='light')   el.style.boxShadow = B.shadow;
    const s = el.querySelector('.btn-shimmer');
    if(s) s.style.left = '-100%';
  };
  const onDown = e => {
    e.currentTarget.style.transform = 'translateY(1px) scale(0.97)';
    if(variant==='primary') e.currentTarget.style.boxShadow = '0 2px 12px rgba(30,115,216,0.3)';
  };
  const onUp = e => {
    e.currentTarget.style.transform = 'translateY(-3px) scale(1.025)';
    if(variant==='primary') e.currentTarget.style.boxShadow = '0 16px 40px rgba(30,115,216,0.52)';
  };
  const inner = (
    <>
      <div className="btn-shimmer" style={{
        position:'absolute', top:0, left:'-100%', width:'55%', height:'100%',
        background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)',
        transform:'skewX(-20deg)', pointerEvents:'none',
        transition:'left 0.52s ease',
      }}/>
      {variant==='primary' && (
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(255,255,255,0.13) 0%,transparent 52%)',pointerEvents:'none'}}/>
      )}
      <span style={{position:'relative',zIndex:1}}>{children}</span>
    </>
  );
  const evts = { onMouseEnter:onEnter, onMouseLeave:onLeave, onMouseDown:onDown, onMouseUp:onUp };
  if(onClick) return <button onClick={onClick} style={base} {...evts}>{inner}</button>;
  return <a href={href} style={base} {...evts}>{inner}</a>;
}
window.GBtn = GBtn;

function SectionHeader({ chip, chipColor, title, sub, light=false }) {
  const accent = chipColor || B.blue;
  return (
    <div style={{textAlign:'center',marginBottom:'52px'}}>
      {chip && (
        <div style={{marginBottom:'22px',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
          <Chip color={accent}>{chip}</Chip>
          <div style={{width:'28px',height:'2px',borderRadius:'99px',background:`linear-gradient(90deg,${accent},${B.cyan})`,opacity:0.5}}/>
        </div>
      )}
      <h2 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(26px,3.8vw,40px)',fontWeight:800,letterSpacing:'-0.024em',color:light?'white':B.tMain,lineHeight:1.13,marginBottom:'16px'}} dangerouslySetInnerHTML={{__html:title}}/>
      {sub && <p style={{maxWidth:'500px',margin:'0 auto',lineHeight:1.72,color:light?'rgba(255,255,255,0.44)':B.tMuted,fontFamily:'Inter,sans-serif',fontSize:'15.5px'}}>{sub}</p>}
    </div>
  );
}
window.SectionHeader = SectionHeader;

function FadeIn({ children, delay=0, style:s={} }) {
  const ref = React.useRef();
  const vis = useOnScreen(ref);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...s
    }}>
      {children}
    </div>
  );
}
window.FadeIn = FadeIn;

// ─── MAGNETIC BUTTON ──────────────────────────────────────────────────────────
// Spring physics: velocity-based attract toward cursor, snaps back on leave.
// Works in CDN/Babel env — no framer-motion required.
function MagneticButton({ children, distance = 0.52 }) {
  // Disable spring on touch devices — prevents RAF transform from blocking tap events
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  if (isTouch) return <div style={{display:'inline-block'}}>{children}</div>;

  const ref     = React.useRef(null);
  const animRef = React.useRef(null);
  const st      = React.useRef({ x:0, y:0, tx:0, ty:0, vx:0, vy:0, on:false });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tick = () => {
      const s = st.current;
      const stiff = 0.13, damp = 0.70;
      s.vx += (s.tx - s.x) * stiff; s.vx *= damp; s.x += s.vx;
      s.vy += (s.ty - s.y) * stiff; s.vy *= damp; s.y += s.vy;
      el.style.transform = `translate(${s.x.toFixed(2)}px,${s.y.toFixed(2)}px)`;
      animRef.current = requestAnimationFrame(tick);
    };

    const onMove = e => {
      if (!st.current.on) return;
      const r = el.getBoundingClientRect();
      st.current.tx = (e.clientX - (r.left + r.width  / 2)) * distance;
      st.current.ty = (e.clientY - (r.top  + r.height / 2)) * distance;
    };
    const onEnter = () => { st.current.on = true; };
    const onLeave = () => { st.current.on = false; st.current.tx = 0; st.current.ty = 0; };

    document.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    animRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(animRef.current);
    };
  }, [distance]);

  return (
    <div ref={ref} style={{display:'inline-block'}}>
      {children}
    </div>
  );
}
window.MagneticButton = MagneticButton;
