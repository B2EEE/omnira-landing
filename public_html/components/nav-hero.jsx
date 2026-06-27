// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen]         = React.useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // lock body scroll when menu is open
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    ['Fonctionnement','#process'],
    ['Démo','#demo'],
    ["Cas d'usage",'#scenarios'],
    ['Simulation','#roi'],
  ];

  const light = !scrolled && !open; // white-on-dark mode (transparent nav)
  const navBg = scrolled || open ? 'rgba(255,255,255,0.97)' : 'transparent';

  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:50,
      transition:'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      background: navBg,
      backdropFilter: scrolled || open ? 'blur(20px)' : 'none',
      borderBottom: scrolled || open ? `1px solid ${B.border}` : 'none',
      boxShadow: scrolled || open ? B.shadow : 'none',
    }}>
      {/* ── Desktop bar ── */}
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'70px'}}>
        <a href="/" style={{display:'flex',alignItems:'center',textDecoration:'none'}}>
          {light ? <OmniraLogo height={64}/> : <OmniraLogoColor height={58}/>}
        </a>

        {/* Desktop links */}
        <div style={{display:'flex',alignItems:'center',gap:'32px'}} className="nav-links">
          {links.map(([l,h]) => (
            <a key={l} href={h}
              style={{fontSize:'13px',fontWeight:600,fontFamily:'Sora,sans-serif',color:light?'rgba(255,255,255,0.6)':B.tMuted,textDecoration:'none',transition:'color 0.15s'}}
              onMouseEnter={e=>e.currentTarget.style.color=light?'white':B.blue}
              onMouseLeave={e=>e.currentTarget.style.color=light?'rgba(255,255,255,0.6)':B.tMuted}>{l}</a>
          ))}
        </div>

        {/* Desktop right — un seul CTA, "Écouter une démo" est dans les liens nav */}
        <div style={{display:'flex',alignItems:'center',gap:'10px'}} className="nav-links">
          <GBtn href="/devis" variant={light?'outline':'primary'} size="sm">Demander un devis</GBtn>
        </div>

        {/* Hamburger — mobile only, shown via CSS */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          style={{background:'none',border:'none',cursor:'pointer',padding:'7px',borderRadius:'8px',lineHeight:0}}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 4l14 14M18 4L4 18" stroke={B.tMain} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 6h16M3 11h16M3 16h16" stroke={light?'white':B.tMain} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile menu panel ── */}
      {open && (
        <div style={{
          padding:'8px 24px 32px',
          borderTop:`1px solid ${B.border}`,
          background:'rgba(255,255,255,0.97)',
          backdropFilter:'blur(20px)',
          maxHeight:'calc(100vh - 70px)',
          overflowY:'auto',
        }}>
          {links.map(([l,h]) => (
            <a key={l} href={h}
              onClick={() => setOpen(false)}
              style={{
                display:'flex',alignItems:'center',justifyContent:'space-between',
                fontFamily:'Sora,sans-serif',fontSize:'17px',fontWeight:700,
                color:B.tMain,textDecoration:'none',
                padding:'16px 0',
                borderBottom:`1px solid ${B.border}`,
                transition:'color 0.15s',
              }}
              onMouseEnter={e=>e.currentTarget.style.color=B.blue}
              onMouseLeave={e=>e.currentTarget.style.color=B.tMain}>
              {l}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
          <div style={{marginTop:'24px',display:'flex',flexDirection:'column',gap:'10px'}}>
            <GBtn href="/demo"  variant="light"   size="md" full onClick={()=>setOpen(false)}>Écouter une démo</GBtn>
            <GBtn href="/devis" variant="primary"  size="md" full onClick={()=>setOpen(false)}>Demander un devis</GBtn>
          </div>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:B.tMuted,textAlign:'center',marginTop:'20px'}}>
            Agents vocaux IA pour entreprises locales
          </p>
        </div>
      )}
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
      {[1,2,3,4,5].map(i=>(
        <div key={i} style={{position:'absolute',borderRadius:'50%',width:`${160+i*110}px`,height:`${160+i*110}px`,top:'50%',right:`calc(6% - ${i*14}px)`,transform:'translateY(-50%)',border:`1px solid rgba(30,115,216,${Math.max(0.02,0.12-i*0.02)})`,animation:`ringPulse ${3+i*0.6}s ease-in-out infinite`,animationDelay:`${i*0.4}s`}}/>
      ))}
      {[...Array(10)].map((_,i)=>(
        <div key={i} style={{position:'absolute',width:'3px',height:'3px',borderRadius:'50%',background:i%2===0?B.blue:B.cyan,opacity:0.3,left:`${8+i*8}%`,top:`${22+Math.sin(i)*38}%`,animation:`particleDrift ${4+i*0.7}s ease-in-out infinite alternate`,animationDelay:`${i*0.3}s`}}/>
      ))}
    </div>
  );
}

// ─── HERO VISUAL (animated call processing) ───────────────────────────────────
const SECTOR_DATA = {
  restaurant: {
    label: 'Restaurant',
    steps: [
      { label: 'Appel entrant', sub: 'Brasserie du Lac · 20h14' },
      { label: 'Agent Omnira répond', sub: 'Réponse en 0.7 seconde' },
      { label: 'Demande identifiée', sub: 'Réservation × 4 personnes' },
      { label: 'Action exécutée', sub: 'Créneau préparé · samedi 20h' },
      { label: 'Résumé transmis', sub: 'Équipe notifiée automatiquement' },
    ],
    summary: [
      { l:'Client', v:'Martin G. — 06 XX XX XX XX' },
      { l:'Motif', v:'Réservation restaurant' },
      { l:'Date souhaitée', v:'Samedi 28 juin · 20h' },
      { l:'Action', v:'Confirmer la réservation' },
    ],
  },
  garage: {
    label: 'Garage',
    steps: [
      { label: 'Appel entrant', sub: 'Garage Auto Roussel · 09h47' },
      { label: 'Agent Omnira répond', sub: 'Réponse en 0.6 seconde' },
      { label: 'Demande identifiée', sub: 'Devis freins · Peugeot 308' },
      { label: 'Action exécutée', sub: "Demande transmise à l'atelier" },
      { label: 'Résumé transmis', sub: "Chef d'atelier notifié" },
    ],
    summary: [
      { l:'Client', v:'Dupont J. — 06 XX XX XX XX' },
      { l:'Motif', v:'Devis freins avant' },
      { l:'Véhicule', v:'Peugeot 308 · 2019' },
      { l:'Action', v:'Rappeler pour chiffrer' },
    ],
  },
  artisan: {
    label: 'Artisan',
    steps: [
      { label: 'Appel entrant', sub: 'Plomberie & Chauffage · 14h22' },
      { label: 'Agent Omnira répond', sub: 'Réponse en 0.8 seconde' },
      { label: 'Demande identifiée', sub: 'Fuite sous-évier · urgent' },
      { label: 'Action exécutée', sub: 'Rappel prioritaire planifié' },
      { label: 'Résumé transmis', sub: 'Chef de chantier notifié' },
    ],
    summary: [
      { l:'Client', v:'Bernard L. — 06 XX XX XX XX' },
      { l:'Motif', v:'Fuite sous-évier' },
      { l:'Urgence', v:"À traiter aujourd'hui" },
      { l:'Action', v:'Rappel prioritaire' },
    ],
  },
  cabinet: {
    label: 'Cabinet',
    steps: [
      { label: 'Appel entrant', sub: 'Cabinet Médical Santé · 10h33' },
      { label: 'Agent Omnira répond', sub: 'Réponse en 0.7 seconde' },
      { label: 'Demande identifiée', sub: 'RDV général · nouveau patient' },
      { label: 'Action exécutée', sub: 'Créneau préparé · vendredi 11h' },
      { label: 'Résumé transmis', sub: 'Secrétariat notifié' },
    ],
    summary: [
      { l:'Patient', v:'Garcia M. — 06 XX XX XX XX' },
      { l:'Motif', v:'Consultation générale' },
      { l:'Créneau', v:'Vendredi 11h00' },
      { l:'Action', v:'Confirmer le rendez-vous' },
    ],
  },
};

function HeroVisual({ sector = 'restaurant' }) {
  const [phase, setPhase] = React.useState(1);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    setPhase(1);
    const delays = [1000, 950, 950, 1000, 2200];
    let p = 1;
    const tick = () => {
      p = p >= 5 ? 1 : p + 1;
      setPhase(p);
      timerRef.current = setTimeout(tick, delays[p - 1]);
    };
    timerRef.current = setTimeout(tick, delays[0]);
    return () => clearTimeout(timerRef.current);
  }, [sector]);

  const { steps, summary: summaryFields } = SECTOR_DATA[sector];

  return (
    <div style={{position:'relative',width:'100%',maxWidth:'440px',margin:'0 auto'}}>
      <div style={{
        borderRadius:'24px',
        overflow:'hidden',
        background:'rgba(7,14,26,0.9)',
        border:'1px solid rgba(255,255,255,0.1)',
        backdropFilter:'blur(24px)',
        boxShadow:'0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
      }}>
        {/* Header */}
        <div style={{padding:'14px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:'7px'}}>
          <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#ef4444'}}/>
          <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#f59e0b'}}/>
          <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#22c55e'}}/>
          <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:'rgba(255,255,255,0.28)',marginLeft:'8px',flex:1}}>Agent Omnira · Appel en cours</span>
          <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
            <span style={{position:'relative',display:'inline-flex',width:'7px',height:'7px'}}>
              <span style={{position:'absolute',inset:0,borderRadius:'50%',background:'#4ade80',animation:'ping 1.5s ease-out infinite'}}/>
              <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#4ade80',display:'inline-flex'}}/>
            </span>
            <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'#4ade80',fontWeight:600}}>Live</span>
          </div>
        </div>

        {/* Steps */}
        <div style={{padding:'22px 20px'}}>
          {steps.map(({label,sub},i) => {
            const visible = i < phase;
            const active  = i === phase - 1;
            const done    = i < phase - 1;
            return (
              <div key={i} style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:i<steps.length-1?'0':'0'}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0}}>
                  <div style={{
                    width:'28px',height:'28px',borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',
                    background: done ? 'rgba(47,199,214,0.15)' : active ? B.grad : 'rgba(255,255,255,0.04)',
                    border: done ? '1px solid rgba(47,199,214,0.3)' : active ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    transition:'all 0.5s ease',
                    boxShadow: active ? '0 4px 14px rgba(30,115,216,0.4)' : 'none',
                  }}>
                    {done ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5 5.5-5" stroke={B.cyan} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : active ? (
                      <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'white'}}/>
                    ) : (
                      <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'rgba(255,255,255,0.15)'}}/>
                    )}
                  </div>
                  {i < steps.length-1 && (
                    <div style={{width:'2px',height:'22px',background:done?`linear-gradient(${B.cyan},rgba(47,199,214,0.3))`:'rgba(255,255,255,0.06)',transition:'background 0.5s ease',margin:'4px 0'}}/>
                  )}
                </div>
                <div style={{paddingTop:'4px',opacity:visible?1:0.22,transition:'opacity 0.5s ease',paddingBottom:i<steps.length-1?'0':'0'}}>
                  <p style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:active?'white':done?'rgba(255,255,255,0.65)':'rgba(255,255,255,0.25)',margin:'0 0 3px',transition:'color 0.5s'}}>{label}</p>
                  <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'rgba(255,255,255,0.25)',margin:0}}>{sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary card (appears at phase 5) */}
        <div style={{
          margin:'0 16px 16px',
          padding:'14px 16px',
          borderRadius:'14px',
          background:phase>=5?'rgba(30,115,216,0.1)':'transparent',
          border:phase>=5?'1px solid rgba(30,115,216,0.22)':'1px solid transparent',
          transition:'all 0.5s ease',
          overflow:'hidden',
          maxHeight:phase>=5?'200px':'0',
        }}>
          <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:B.cyan,textTransform:'uppercase',letterSpacing:'0.12em',marginBottom:'10px',opacity:phase>=5?1:0,transition:'opacity 0.4s ease 0.2s'}}>Résumé transmis à l'équipe</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',opacity:phase>=5?1:0,transition:'opacity 0.4s ease 0.3s'}}>
            {summaryFields.map(({l,v})=>(
              <div key={l}>
                <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'rgba(255,255,255,0.28)',margin:'0 0 2px'}}>{l}</p>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.72)',fontWeight:600,margin:0,lineHeight:1.4}}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div style={{position:'absolute',top:'-16px',right:'-16px',display:'flex',alignItems:'center',gap:'7px',padding:'8px 14px',borderRadius:'14px',background:'rgba(7,14,26,0.95)',border:'1px solid rgba(255,255,255,0.1)',backdropFilter:'blur(12px)',boxShadow:'0 8px 24px rgba(0,0,0,0.35)',zIndex:2}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={B.cyan} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span style={{fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,color:'white'}}>Réponse en &lt;1s</span>
      </div>
      <div style={{position:'absolute',bottom:'-14px',left:'-14px',display:'flex',alignItems:'center',gap:'7px',padding:'8px 14px',borderRadius:'14px',background:'rgba(7,14,26,0.95)',border:'1px solid rgba(255,255,255,0.1)',backdropFilter:'blur(12px)',boxShadow:'0 8px 24px rgba(0,0,0,0.35)',zIndex:2}}>
        <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#4ade80',flexShrink:0}}/>
        <span style={{fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,color:'white'}}>Agent actif 24/7</span>
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = React.useState(false);
  const [sector, setSector] = React.useState('restaurant');
  React.useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const benefits = [
    'Réponse 24/7 ou selon vos horaires',
    "Demandes qualifiées avant d'interrompre l'équipe",
    'Rendez-vous, devis et rappels mieux suivis',
    'Résumé clair après chaque appel',
  ];

  return (
    <section style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden',paddingTop:'80px',background:B.bgD}}>
      <HeroBg/>
      <div style={{position:'relative',zIndex:10,maxWidth:'1200px',margin:'0 auto',padding:'80px 24px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'center',width:'100%'}} className="hero-grid">
        {/* Left copy */}
        <div>
          <div style={{marginBottom:'20px',opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(20px)',transition:'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s'}}>
            <Chip color={B.cyan}>Agents vocaux IA · PME en France</Chip>
          </div>
          <h1 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(30px,3.8vw,50px)',fontWeight:800,lineHeight:1.1,letterSpacing:'-0.026em',color:'white',marginBottom:'24px',opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(24px)',transition:'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s'}}>
            Vos appels non traités coûtent de l'argent. Omnira les transforme en{' '}
            <span style={{background:`linear-gradient(135deg,${B.blue},${B.cyan},${B.lcyan})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              rendez-vous et devis.
            </span>
          </h1>
          <p style={{fontSize:'16px',lineHeight:1.75,color:'rgba(255,255,255,0.5)',maxWidth:'500px',fontFamily:'Inter,sans-serif',marginBottom:'32px',opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(20px)',transition:'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s'}}>
            Omnira répond à vos appels, qualifie les demandes, filtre les urgences, prépare les rendez-vous ou les devis, puis transmet à votre équipe un résumé clair de chaque échange.
          </p>
          <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'24px',opacity:loaded?1:0,transition:'opacity 0.7s ease 0.35s'}}>
            {benefits.map((b,i)=>(
              <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                <div style={{width:'18px',height:'18px',borderRadius:'50%',flexShrink:0,marginTop:'2px',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(47,199,214,0.14)',border:'1px solid rgba(47,199,214,0.28)'}}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-5" stroke={B.cyan} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:'rgba(255,255,255,0.62)',lineHeight:1.55}}>{b}</span>
              </div>
            ))}
          </div>
          {/* Social proof */}
          <div style={{display:'flex',alignItems:'center',flexWrap:'wrap',gap:'6px 14px',padding:'10px 14px',borderRadius:'10px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',marginBottom:'28px',opacity:loaded?1:0,transition:'opacity 0.7s ease 0.38s'}}>
            <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
              <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#4ade80',flexShrink:0}}/>
              <span style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.45)'}}>Conçu pour les PME en France</span>
            </div>
            <span style={{color:'rgba(255,255,255,0.18)',fontSize:'11px'}}>·</span>
            <span style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.32)'}}>Essai 7 jours</span>
            <span style={{color:'rgba(255,255,255,0.18)',fontSize:'11px'}}>·</span>
            <span style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.32)'}}>Réponse sous 24h</span>
          </div>
          {/* CTAs */}
          <div style={{opacity:loaded?1:0,transition:'opacity 0.7s ease 0.42s'}}>
            <div style={{display:'flex',flexWrap:'wrap',gap:'12px',marginBottom:'14px'}}>
              <MagneticButton distance={0.55}>
                <GBtn href="/demo" variant="primary" size="md">Écouter une démo</GBtn>
              </MagneticButton>
              <MagneticButton distance={0.35}>
                <GBtn href="/devis" variant="outline" size="md">Demander un devis personnalisé</GBtn>
              </MagneticButton>
            </div>
            <a href="#roi"
              style={{fontFamily:'Inter,sans-serif',fontSize:'13px',fontWeight:500,color:'rgba(255,255,255,0.38)',textDecoration:'underline',textDecorationColor:'rgba(255,255,255,0.15)',textUnderlineOffset:'3px',cursor:'pointer',transition:'color 0.15s',display:'inline-block'}}
              onMouseEnter={e=>{e.currentTarget.style.color='rgba(255,255,255,0.65)';e.currentTarget.style.textDecorationColor='rgba(255,255,255,0.35)';}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.38)';e.currentTarget.style.textDecorationColor='rgba(255,255,255,0.15)';}}>
              → Calculer le coût de mes appels manqués
            </a>
          </div>
          {/* Note contrôle humain */}
          <div style={{marginTop:'20px',opacity:loaded?1:0,transition:'opacity 0.7s ease 0.52s'}}>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.22)',lineHeight:1.55,maxWidth:'460px'}}>
              Vous gardez la main : Omnira suit vos règles, transfère les cas sensibles et ne promet jamais ce que vous n'avez pas validé.
            </p>
          </div>
        </div>
        {/* Right — Sector tabs + HeroVisual */}
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'14px',opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(32px)',transition:'opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s',width:'100%'}}>
          {/* Sector selector */}
          <div style={{display:'flex',gap:'4px',padding:'4px',borderRadius:'12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',width:'100%',maxWidth:'440px'}}>
            {Object.entries(SECTOR_DATA).map(([key,{label}])=>(
              <button key={key} onClick={()=>setSector(key)}
                style={{
                  flex:1,padding:'7px 6px',borderRadius:'8px',border:'none',cursor:'pointer',
                  fontFamily:'Sora,sans-serif',fontSize:'11px',fontWeight:700,letterSpacing:'0.01em',
                  background: sector===key ? B.grad : 'transparent',
                  color: sector===key ? 'white' : 'rgba(255,255,255,0.32)',
                  transition:'all 0.2s ease',
                  boxShadow: sector===key ? '0 4px 12px rgba(30,115,216,0.3)' : 'none',
                }}>
                {label}
              </button>
            ))}
          </div>
          <HeroVisual sector={sector}/>
        </div>
      </div>
      <div style={{position:'absolute',bottom:0,left:0,right:0,pointerEvents:'none',zIndex:10}}>
        <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none" style={{width:'100%',height:'64px',display:'block'}}>
          <path d="M0 36 Q360 0 720 36 Q1080 72 1440 36 L1440 72 L0 72 Z" fill={B.bgW}/>
        </svg>
      </div>
    </section>
  );
}
window.Hero = Hero;
