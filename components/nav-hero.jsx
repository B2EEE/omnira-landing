// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  // "Problèmes" replaced by "ROI" per request
  const links = [['ROI Calculateur','#roi'],['Démo','#demo'],['Comment','#process'],['FAQ','#faq']];
  const navStyle = {
    position:'fixed',top:0,left:0,right:0,zIndex:50,transition:'all 0.3s ease',
    background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? `1px solid ${B.border}` : 'none',
    boxShadow: scrolled ? B.shadow : 'none',
  };
  return (
    <nav style={navStyle}>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'70px'}}>
        <a href="#" style={{display:'flex',alignItems:'center',textDecoration:'none'}}>
          {scrolled ? <OmniraLogoColor height={62}/> : <OmniraLogo height={68}/>}
        </a>
        <div style={{display:'flex',alignItems:'center',gap:'36px'}} className="nav-links">
          {links.map(([l,h]) => (
            <a key={l} href={h} style={{fontSize:'13px',fontWeight:600,fontFamily:'Sora,sans-serif',color:scrolled?B.tMuted:'rgba(255,255,255,0.6)',textDecoration:'none',transition:'color 0.15s'}}
              onMouseEnter={e=>e.currentTarget.style.color=scrolled?B.blue:'white'}
              onMouseLeave={e=>e.currentTarget.style.color=scrolled?B.tMuted:'rgba(255,255,255,0.6)'}>{l}</a>
          ))}
        </div>
        <GBtn href="#contact" variant={scrolled?'primary':'outline'} size="sm">Réserver une démo</GBtn>
      </div>
    </nav>
  );
}
window.Nav = Nav;

// ─── HERO BACKGROUND ──────────────────────────────────────────────────────────
function HeroBg() {
  return (
    <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',backgroundSize:'64px 64px'}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 55% at 50% -5%,rgba(30,115,216,0.28) 0%,transparent 65%)'}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 55% 65% at 78% 50%,rgba(47,199,214,0.08) 0%,transparent 60%)'}}/>
      {/* Animated rings */}
      {[1,2,3,4,5].map(i=>(
        <div key={i} style={{position:'absolute',borderRadius:'50%',width:`${180+i*120}px`,height:`${180+i*120}px`,top:'50%',right:`calc(6% - ${i*18}px)`,transform:'translateY(-50%)',border:`1px solid rgba(30,115,216,${Math.max(0.02,0.12-i*0.02)})`,animation:`ringPulse ${3+i*0.6}s ease-in-out infinite`,animationDelay:`${i*0.4}s`}}/>
      ))}
      {/* Particle dots */}
      {[...Array(12)].map((_,i)=>(
        <div key={i} style={{position:'absolute',width:'3px',height:'3px',borderRadius:'50%',background:i%2===0?B.blue:B.cyan,opacity:0.35,left:`${10+i*7}%`,top:`${20+Math.sin(i)*40}%`,animation:`particleDrift ${4+i*0.7}s ease-in-out infinite alternate`,animationDelay:`${i*0.3}s`}}/>
      ))}
      <svg style={{position:'absolute',bottom:'60px',left:0,width:'100%',opacity:0.06}} viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40" stroke={B.cyan} strokeWidth="2.5" fill="none"/>
        <path d="M0 55 Q360 15 720 55 Q1080 95 1440 55" stroke={B.blue} strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  );
}

// ─── GARAGE CAROUSEL ──────────────────────────────────────────────────────────
const CAROUSEL_IMAGES = [
  { src: 'uploads/gragiste caroussel 1.png', caption: 'Gérant de garage · Tablette connectée' },
  { src: 'uploads/GARAGISTE CAROUSSEL 2.png', caption: "Technicien en action · L'atelier tourne" },
  { src: 'uploads/GARAGISTE CAROUSSEL 3.png', caption: "Accueil client · Agenda toujours à jour" },
];

function GarageCarousel() {
  const [active, setActive] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const [dir, setDir] = React.useState(1); // 1 = forward, -1 = backward

  const goTo = React.useCallback((idx) => {
    if (animating) return;
    setDir(idx > active ? 1 : -1);
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 420);
  }, [active, animating]);

  React.useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setAnimating(true);
      setTimeout(() => {
        setActive(a => (a + 1) % CAROUSEL_IMAGES.length);
        setAnimating(false);
      }, 420);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const img = CAROUSEL_IMAGES[active];

  return (
    <div style={{position:'relative',width:'100%',maxWidth:'520px',margin:'0 auto'}}>
      {/* Main frame */}
      <div style={{
        position:'relative',
        borderRadius:'24px',
        overflow:'hidden',
        boxShadow:'0 40px 100px rgba(0,0,0,0.55),0 0 0 1px rgba(255,255,255,0.08)',
        aspectRatio:'16/10',
        background:'#0B1726',
      }}>
        {/* Image */}
        <img
          key={active}
          src={img.src}
          alt={img.caption}
          style={{
            width:'100%',height:'100%',objectFit:'cover',
            opacity: animating ? 0 : 1,
            transform: animating ? `scale(1.04) translateX(${dir*20}px)` : 'scale(1) translateX(0)',
            transition: 'opacity 0.42s ease, transform 0.42s ease',
          }}
        />
        {/* Gradient overlay */}
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(7,14,26,0.72) 0%,rgba(7,14,26,0.1) 50%,transparent 100%)',pointerEvents:'none'}}/>
        {/* Caption */}
        <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'20px 24px'}}>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.7)',margin:0,opacity: animating?0:1,transition:'opacity 0.42s ease 0.1s'}}>{img.caption}</p>
        </div>
        {/* Top gradient for frame feel */}
        <div style={{position:'absolute',top:0,left:0,right:0,height:'60px',background:'linear-gradient(to bottom,rgba(11,23,38,0.3),transparent)',pointerEvents:'none'}}/>
        {/* Nav arrows */}
        <button onClick={()=>goTo((active-1+CAROUSEL_IMAGES.length)%CAROUSEL_IMAGES.length)}
          style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',width:'34px',height:'34px',borderRadius:'50%',background:'rgba(255,255,255,0.12)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.18)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',transition:'all 0.15s',color:'white'}}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.22)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)';}}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={()=>goTo((active+1)%CAROUSEL_IMAGES.length)}
          style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',width:'34px',height:'34px',borderRadius:'50%',background:'rgba(255,255,255,0.12)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.18)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',transition:'all 0.15s',color:'white'}}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.22)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)';}}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div style={{display:'flex',justifyContent:'center',gap:'8px',marginTop:'20px'}}>
        {CAROUSEL_IMAGES.map((_,i)=>(
          <button key={i} onClick={()=>goTo(i)} style={{width: i===active?'28px':'8px',height:'8px',borderRadius:'99px',border:'none',cursor:'pointer',transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',background: i===active?B.cyan:'rgba(255,255,255,0.2)',padding:0}}/>
        ))}
      </div>

      {/* Live indicator badge */}
      <div style={{position:'absolute',top:'-14px',right:'-14px',display:'flex',alignItems:'center',gap:'8px',padding:'8px 14px',borderRadius:'14px',background:'rgba(11,23,38,0.94)',border:'1px solid rgba(255,255,255,0.1)',backdropFilter:'blur(14px)',boxShadow:'0 8px 24px rgba(0,0,0,0.3)',zIndex:2}}>
        <span style={{position:'relative',display:'inline-flex',width:'8px',height:'8px'}}>
          <span style={{position:'absolute',inset:0,borderRadius:'50%',background:'#4ade80',animation:'ping 1.5s ease-out infinite',opacity:0.75}}/>
          <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#4ade80',display:'inline-flex'}}/>
        </span>
        <span style={{fontSize:'12px',fontWeight:700,color:'white',fontFamily:'Sora,sans-serif'}}>Agent actif 24/7</span>
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden',paddingTop:'80px',background:B.bgD}}>
      <HeroBg/>
      <div style={{position:'relative',zIndex:10,maxWidth:'1200px',margin:'0 auto',padding:'80px 24px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'center',width:'100%'}} className="hero-grid">
        {/* Left copy */}
        <div>
          <div style={{marginBottom:'20px',opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(20px)',transition:'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s'}}>
            <Chip color={B.cyan}>Agent vocal IA · Garages indépendants</Chip>
          </div>
          {/* Stars — just below the chip */}
          <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'10px',marginBottom:'24px',opacity:loaded?1:0,transition:'opacity 0.7s ease 0.18s'}}>
            <div style={{display:'flex',gap:'2px'}}>{[...Array(5)].map((_,i)=><Ico.Star key={i}/>)}</div>
            <span style={{fontSize:'13px',fontWeight:600,color:'rgba(255,255,255,0.55)',fontFamily:'Inter,sans-serif'}}>5/5 · Garages indépendants</span>
          </div>
          <h1 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(36px,5vw,60px)',fontWeight:800,lineHeight:1.06,letterSpacing:'-0.026em',color:'white',marginBottom:'24px',opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(24px)',transition:'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s'}}>
            Ne perdez plus les appels utiles{' '}
            <span style={{background:`linear-gradient(135deg,${B.blue},${B.cyan},${B.lcyan})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              de votre garage.
            </span>
          </h1>
          <p style={{fontSize:'17px',lineHeight:1.75,color:'rgba(255,255,255,0.5)',maxWidth:'500px',fontFamily:'Inter,sans-serif',marginBottom:'40px',opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(24px)',transition:'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s'}}>
            Omnira décroche, qualifie et filtre vos appels — pour protéger votre planning atelier et soulager votre équipe, sans retirer l'humain des cas importants.
          </p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'14px',marginBottom:'48px',opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(24px)',transition:'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s'}}>
            <GBtn href="#demo" variant="primary" size="md">Écouter l'agent</GBtn>
            <GBtn href="#roi" variant="outline" size="md">Calculer mes pertes</GBtn>
          </div>
          
        </div>
        {/* Right — Garage Carousel */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(32px)',transition:'opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s'}}>
          <GarageCarousel/>
        </div>
      </div>
      {/* Wave separator */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,pointerEvents:'none',zIndex:10}}>
        <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none" style={{width:'100%',height:'64px',display:'block'}}>
          <path d="M0 36 Q360 0 720 36 Q1080 72 1440 36 L1440 72 L0 72 Z" fill={B.bgW}/>
        </svg>
      </div>
    </section>
  );
}
window.Hero = Hero;
