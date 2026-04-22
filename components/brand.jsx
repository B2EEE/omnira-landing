// ─── BRAND TOKENS ─────────────────────────────────────────────────────────────
const B = {
  blue:   '#1E73D8',
  cyan:   '#2FC7D6',
  lcyan:  '#57D6C7',
  grad:   'linear-gradient(135deg,#1E73D8,#2FC7D6)',
  bgW:    '#FFFFFF',
  bgL:    '#F0F7FF',
  bgD:    '#0B1726',
  bgD2:   '#0E1C35',
  bgFoot: '#070E1A',
  tMain:  '#0B1726',
  tMuted: '#5B7A9B',
  border: '#D8E6F2',
  shadow: '0 4px 24px rgba(16,63,115,0.09)',
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
    <span style={{display:'inline-block',fontSize:'11px',fontWeight:700,padding:'4px 14px',borderRadius:'99px',textTransform:'uppercase',letterSpacing:'0.14em',color,background:`${color}18`,border:`1px solid ${color}28`,fontFamily:'JetBrains Mono,monospace'}}>
      {children}
    </span>
  );
}
window.Chip = Chip;

function GBtn({ href='#', onClick, children, variant='primary', size='md', style:extraStyle={}, full=false }) {
  const pad = {sm:'11px 24px',md:'14px 30px',lg:'17px 38px'}[size];
  const fs  = {sm:'13px',md:'14px',lg:'15px'}[size];
  const variants = {
    primary: {background:B.grad,color:'white',boxShadow:`0 6px 24px rgba(30,115,216,0.4),inset 0 1px 0 rgba(255,255,255,0.2)`},
    outline: {background:'transparent',color:'white',border:'1px solid rgba(255,255,255,0.25)'},
    white:   {background:'white',color:'#0B1726',boxShadow:'0 8px 24px rgba(0,0,0,0.12)'},
    light:   {background:B.bgL,color:B.tMain,border:`1px solid ${B.border}`},
  };
  const base = {
    position:'relative',overflow:'hidden',display:'inline-flex',alignItems:'center',justifyContent:full?'center':'flex-start',
    gap:'8px',fontFamily:'Sora,sans-serif',fontWeight:700,borderRadius:'14px',padding:pad,fontSize:fs,
    cursor:'pointer',textDecoration:'none',transition:'transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease, opacity 0.18s ease',
    width:full?'100%':'auto',...variants[variant],...extraStyle
  };
  const up = e => {
    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
    if(variant==='primary') e.currentTarget.style.boxShadow = `0 14px 36px rgba(30,115,216,0.52),inset 0 1px 0 rgba(255,255,255,0.2)`;
  };
  const down = e => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    if(variant==='primary') e.currentTarget.style.boxShadow = `0 6px 24px rgba(30,115,216,0.4),inset 0 1px 0 rgba(255,255,255,0.2)`;
  };
  const inner = (
    <>
      {/* shimmer sweep */}
      <div className="btn-shimmer" style={{position:'absolute',top:0,left:'-100%',width:'60%',height:'100%',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)',transform:'skewX(-20deg)',pointerEvents:'none',transition:'left 0.55s ease'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(255,255,255,0.14) 0%,transparent 55%)',pointerEvents:'none'}}/>
      <span style={{position:'relative'}}>{children}</span>
    </>
  );
  const handleEnter = e => { up(e); const s=e.currentTarget.querySelector('.btn-shimmer'); if(s) s.style.left='160%'; };
  const handleLeave = e => { down(e); const s=e.currentTarget.querySelector('.btn-shimmer'); if(s) s.style.left='-100%'; };
  if(onClick) return <button onClick={onClick} style={base} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>{inner}</button>;
  return <a href={href} style={base} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>{inner}</a>;
}
window.GBtn = GBtn;

function SectionHeader({ chip, chipColor, title, sub, light=false }) {
  return (
    <div style={{textAlign:'center',marginBottom:'56px'}}>
      {chip && <div style={{marginBottom:'16px'}}><Chip color={chipColor||B.blue}>{chip}</Chip></div>}
      <h2 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(28px,4vw,40px)',fontWeight:800,letterSpacing:'-0.022em',color:light?'white':B.tMain,lineHeight:1.15,marginBottom:'16px'}} dangerouslySetInnerHTML={{__html:title}}/>
      {sub && <p style={{maxWidth:'520px',margin:'0 auto',lineHeight:1.7,color:light?'rgba(255,255,255,0.45)':B.tMuted,fontFamily:'Inter,sans-serif',fontSize:'16px'}}>{sub}</p>}
    </div>
  );
}
window.SectionHeader = SectionHeader;

function FadeIn({ children, delay=0, style:s={} }) {
  const ref = React.useRef();
  const vis = useOnScreen(ref);
  return (
    <div ref={ref} style={{opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(24px)',transition:`opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,...s}}>
      {children}
    </div>
  );
}
window.FadeIn = FadeIn;
