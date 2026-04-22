import React, { useState, useEffect, useRef } from 'react'

// ─── BRAND TOKENS ─────────────────────────────────────────────────────────────
const BLUE   = '#1E73D8'
const CYAN   = '#2FC7D6'
const LCYAN  = '#57D6C7'
const GRAD   = 'linear-gradient(135deg,#1E73D8,#2FC7D6)'

const BG_WHITE  = '#FFFFFF'
const BG_LIGHT  = '#F0F7FF'
const T_MAIN    = '#0B1726'
const T_MUTED   = '#5B7A9B'
const BORDER    = '#D8E6F2'
const SHADOW    = '0 4px 24px rgba(16,63,115,0.09)'

const BG_DARK  = '#0B1726'
const BG_DARK2 = '#0E1C35'
const BG_FOOT  = '#070E1A'

const EL_KEY   = import.meta.env.VITE_ELEVENLABS_API_KEY
const EL_VOICE = import.meta.env.VITE_ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB'
const DEMO_TEXT = "Bonjour, vous avez bien joint le garage. Je suis l'assistant Omnira. Je suis disponible pour vous aider à toute heure, tous les jours. Comment puis-je vous aider ? Je peux prendre un rendez-vous, vous renseigner sur nos services, ou transmettre un message à l'équipe."

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PROBLEMS = [
  { icon:'📞', title:"Des appels qui se perdent",       stat:"1 appel sur 3 n'aboutit pas",         desc:"Quand l'atelier tourne à plein régime, le téléphone sonne dans le vide. Chaque appel sans réponse est une opportunité qui part chez le concurrent." },
  { icon:'🔧', title:"L'atelier interrompu",            stat:"Jusqu'à 3h perdues / jour",            desc:"Un technicien dérangé toutes les 20 minutes perd le fil de son travail. La productivité s'effondre à cause de demandes qui auraient pu être filtrées." },
  { icon:'📋', title:"Les rappels mal gérés",            stat:"Rappels non suivis = clients perdus",   desc:"Les demandes notées à la volée, oubliées ou mal transmises créent frustration côté client et occasions ratées côté garage." },
  { icon:'🕐', title:"Les hors-horaires non couverts",  stat:"60 % des appels sont répétitifs",      desc:"Horaires, tarifs, disponibilités : des demandes simples qui ne trouvent jamais de réponse en dehors des heures de bureau." },
]

const FEATURES = [
  { icon:'📞', title:'Décroché 24h/24',            desc:"L'agent répond immédiatement, même hors horaires. Aucun appel ne sonne dans le vide — jamais." },
  { icon:'🎯', title:'Qualification de la demande', desc:"Comprend le motif de l'appel, pose les bonnes questions, collecte les informations utiles dès le premier contact." },
  { icon:'🔁', title:'Filtrage du répétitif',        desc:"Horaires, tarifs, disponibilités — traités automatiquement, sans interrompre votre équipe une seule fois." },
  { icon:'📅', title:'Prise de rendez-vous',         desc:"Propose et confirme des créneaux directement dans votre agenda selon vos disponibilités réelles." },
  { icon:'📊', title:'Résumés & dashboard',          desc:"Chaque appel important arrive avec un résumé structuré. Votre équipe sait exactement quoi faire, sans rien relire." },
  { icon:'🔗', title:'Intégrations simples',         desc:"Google Calendar, CRM, Google Sheets. Onboarding guidé inclus — aucune compétence technique requise." },
]

const STEPS = [
  { num:'01', title:'Audit & configuration',       tag:'15 min',               desc:"On fait le point ensemble sur vos flux d'appels, votre planning, vos services. On configure l'agent selon vos règles. Opérationnel le jour même." },
  { num:'02', title:"L'agent traite les appels",   tag:'IA conversationnelle',  desc:"Dès qu'un client appelle, l'agent décroche, comprend la demande, répond aux questions simples et prend un rendez-vous si nécessaire. Votre équipe n'est pas dérangée." },
  { num:'03', title:"Votre équipe reçoit l'utile", tag:'Transmission guidée',   desc:"Les cas qui méritent votre attention arrivent avec un résumé clair : motif, coordonnées, action à faire. Rien d'autre. Jamais de bruit inutile." },
]

const TRANSCRIPT_DEMO = [
  { role:'client', text:"Bonjour, j'aurais voulu savoir si vous faites les vidanges sur Peugeot 308 ?" },
  { role:'agent',  text:"Bonjour ! Tout à fait, nous réalisons les vidanges sur Peugeot 308. Votre véhicule est diesel ou essence ?" },
  { role:'client', text:"Diesel, le 1.6 HDi." },
  { role:'agent',  text:"Parfait — huile 5W-30 longlife, environ 45 minutes de prestation. Souhaitez-vous prendre rendez-vous ?" },
  { role:'client', text:"Oui, vous auriez quelque chose cette semaine ?" },
  { role:'agent',  text:"Nous avons jeudi à 10h ou vendredi à 14h30. Laquelle vous convient ?" },
  { role:'client', text:"Jeudi 10h, c'est parfait !" },
  { role:'agent',  text:"Noté. RDV confirmé jeudi à 10h pour la vidange de votre 308 HDi. Votre nom pour finaliser ?" },
]

const TESTIMONIALS = [
  { name:'Patrick M.', role:'Gérant',              garage:'Garage Martin — Lyon',        stars:5, initials:'PM', color:BLUE,  rotate:'-2.5deg', offsetY:'0px',   text:"Depuis Omnira, on ne perd plus un appel. Avant on en ratait 3 ou 4 par jour en atelier. Maintenant tout est capté et résumé. Le ROI est immédiat." },
  { name:'Sylvie R.',  role:'Responsable accueil', garage:'Auto Expert — Bordeaux',      stars:5, initials:'SR', color:CYAN,  rotate:'1.8deg',  offsetY:'40px',  text:"L'agent est bluffant de naturel. Mes clients ne réalisent même pas qu'ils parlent à une IA. Et moi j'ai enfin du temps pour ce qui compte vraiment." },
  { name:'Karim B.',   role:'Propriétaire',        garage:'Mécano Plus — Marseille',     stars:5, initials:'KB', color:LCYAN, rotate:'-1.2deg', offsetY:'-16px', text:"La prise de RDV la nuit, c'est un vrai plus. On a récupéré plusieurs clients qui auraient appelé la concurrence. Rentable dès le premier mois." },
]

const FAQS = [
  { q:"Est-ce que ça remplace mon accueil humain ?",         a:"Non. Omnira prend en charge les demandes répétitives et les appels simples. Votre équipe garde la main sur tout ce qui nécessite jugement, relation ou technicité. L'humain n'est pas retiré — il est préservé pour les cas importants." },
  { q:"Et si l'agent se trompe ou ne comprend pas ?",         a:"L'agent est configuré pour reconnaître ses limites. En cas de doute ou de demande complexe, il transfère vers votre équipe avec un contexte clair. Il ne prend jamais de décisions qui dépassent son périmètre." },
  { q:"Est-ce que mes clients vont aimer parler à une IA ?",  a:"L'agent se présente clairement comme assistant Omnira. Les clients apprécient la réactivité immédiate. La plupart préfèrent une réponse instantanée à un téléphone qui sonne dans le vide." },
  { q:"Est-ce que c'est compliqué à mettre en place ?",       a:"La mise en place est guidée et dure en moyenne 15 à 30 minutes. Aucune compétence technique requise. L'agent est opérationnel le jour même de la configuration." },
  { q:"Est-ce que ça fonctionne hors horaires ?",             a:"C'est là où Omnira est le plus utile. L'agent répond 24h/24, 7j/7 — la nuit, le week-end, les jours fériés. Chaque appel est capté et résumé pour le lendemain." },
  { q:"Comment mesure-t-on l'impact ?",                       a:"Chaque appel est tracé dans votre tableau de bord : motif, durée, action prise, résumé. Vous avez une visibilité complète sur votre flux téléphonique et pouvez mesurer le nombre d'appels captés, qualifiés et traités." },
  { q:"Peut-on commencer sur un périmètre réduit ?",          a:"Oui — c'est même la recommandation. L'offre Start couvre le premier niveau : décroché automatique, qualification de base, FAQ simple, capture hors horaires. On commence sur un périmètre clair, on mesure, on adapte." },
]

// ─── SHARED ATOMS ─────────────────────────────────────────────────────────────

function OmniraLogo({ height = 40, dark = false }) {
  const img = (
    <img src="/logo.png" alt="Omnira" style={{ height: `${height}px`, width: 'auto', display: 'block' }}/>
  )
  if (dark) {
    return (
      <div style={{ background:'white', borderRadius:'10px', padding:'3px 10px', display:'inline-flex', alignItems:'center', boxShadow:'0 2px 12px rgba(0,0,0,0.18)' }}>
        {img}
      </div>
    )
  }
  return img
}

function Star() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="#FBBF24"><path d="M7 1l1.76 3.57L13 5.27l-3 2.93.71 4.13L7 10.4l-3.71 1.93.71-4.13-3-2.93 4.24-.7z"/></svg>
}

function Arrow({ color = 'white', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Chip({ children, color = CYAN }) {
  return (
    <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-[0.15em]"
      style={{ color, background:`${color}14`, border:`1px solid ${color}28`, fontFamily:'JetBrains Mono,monospace' }}>
      {children}
    </span>
  )
}

// Glass-shimmer button with inner gradient overlay
function GBtn({ href = '#', onClick, children, variant = 'primary', size = 'md', className = '' }) {
  const sizes = {
    sm: { padding:'10px 20px', fontSize:'13px' },
    md: { padding:'13px 28px', fontSize:'14px' },
    lg: { padding:'16px 36px', fontSize:'15px' },
  }
  const variants = {
    primary: { background:GRAD, color:'white', boxShadow:'0 8px 28px rgba(30,115,216,0.42),inset 0 1px 0 rgba(255,255,255,0.22)' },
    outline:  { background:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.18)' },
    white:    { background:'white', color:'#103F73', boxShadow:'0 8px 28px rgba(0,0,0,0.14),inset 0 1px 0 rgba(255,255,255,0.9)' },
    light:    { background:BG_LIGHT, color:T_MAIN, border:`1px solid ${BORDER}`, boxShadow:SHADOW },
  }
  const style = {
    position:'relative', overflow:'hidden', display:'inline-flex', alignItems:'center', gap:'10px',
    fontFamily:'Sora,sans-serif', fontWeight:700, borderRadius:'12px',
    transition:'all 0.18s ease', cursor:'pointer', textDecoration:'none',
    ...sizes[size], ...variants[variant],
  }
  const up   = e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.opacity = '0.92' }
  const down = e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.opacity = '1' }
  const inner = (
    <>
      <div className="absolute inset-0 pointer-events-none" style={{ background:'linear-gradient(180deg,rgba(255,255,255,0.16) 0%,transparent 55%)' }}/>
      <span style={{ position:'relative' }}>{children}</span>
    </>
  )
  if (onClick) return <button onClick={onClick} style={style} className={className} onMouseEnter={up} onMouseLeave={down}>{inner}</button>
  return <a href={href} style={style} className={className} onMouseEnter={up} onMouseLeave={down}>{inner}</a>
}

// ─── INLINE CTA STRIP ─────────────────────────────────────────────────────────

function InlineCTA({ text, sub, bg = BG_WHITE }) {
  return (
    <div style={{ background:bg, paddingBottom:'48px' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background:`linear-gradient(130deg,${BG_DARK} 0%,${BG_DARK2} 100%)`, border:'1px solid rgba(255,255,255,0.07)' }}>
          <div className="absolute top-0 inset-x-0 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)' }}/>
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full" style={{ background:`radial-gradient(circle,rgba(47,199,214,0.12),transparent 70%)` }}/>
          <div>
            <p className="text-base font-bold text-white" style={{ fontFamily:'Sora,sans-serif' }}>{text}</p>
            {sub && <p className="text-sm mt-1" style={{ color:'rgba(255,255,255,0.45)', fontFamily:'Inter,sans-serif' }}>{sub}</p>}
          </div>
          <GBtn href="#contact" variant="white" size="sm" className="flex-shrink-0">
            Réserver une démo <Arrow color="#103F73" size={13}/>
          </GBtn>
        </div>
      </div>
    </div>
  )
}

// ─── HERO ANIMATED BACKGROUND ─────────────────────────────────────────────────

function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0" style={{ backgroundImage:'linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)', backgroundSize:'60px 60px' }}/>
      {/* Top radial glow */}
      <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse 80% 55% at 50% -8%,rgba(30,115,216,0.25) 0%,transparent 65%)' }}/>
      {/* Right cyan accent */}
      <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse 50% 60% at 75% 55%,rgba(47,199,214,0.07) 0%,transparent 60%)' }}/>
      {/* Animated concentric rings centered on the card side */}
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="absolute rounded-full"
          style={{
            width:`${160 + i*110}px`, height:`${160 + i*110}px`,
            top:'50%', right:`calc(8% - ${i*20}px)`,
            transform:'translateY(-50%)',
            border:`1px solid rgba(30,115,216,${Math.max(0.02, 0.13 - i*0.018)})`,
            animation:`ringPulse ${2.8 + i*0.55}s ease-in-out infinite`,
            animationDelay:`${i*0.38}s`,
          }}/>
      ))}
      {/* Wave lines */}
      <svg className="absolute bottom-12 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ opacity:0.05 }}>
        <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40" stroke={CYAN} strokeWidth="2.5" fill="none"/>
        <path d="M0 55 Q360 15 720 55 Q1080 95 1440 55" stroke={BLUE} strokeWidth="1.5" fill="none"/>
        <path d="M0 70 Q360 30 720 70 Q1080 110 1440 70" stroke={LCYAN} strokeWidth="1" fill="none"/>
      </svg>
    </div>
  )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = [['Démo audio','#demo'],['Comment ça marche','#comment'],['Calculateur','#roi'],['FAQ','#faq']]
  return (
    <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{ background:scrolled?'rgba(255,255,255,0.96)':'transparent', backdropFilter:scrolled?'blur(22px)':'none', borderBottom:scrolled?`1px solid ${BORDER}`:'none', boxShadow:scrolled?SHADOW:'none' }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <OmniraLogo height={36} dark={!scrolled}/>
          {scrolled && <span className="font-bold text-base tracking-tight hidden sm:block" style={{ fontFamily:'Sora,sans-serif', color:T_MAIN }}>OMNIRA</span>}
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(([l,h]) => (
            <a key={l} href={h} className="text-sm font-medium transition-colors"
              style={{ color:scrolled?T_MUTED:'rgba(255,255,255,0.65)', fontFamily:'Sora,sans-serif' }}
              onMouseEnter={e => e.currentTarget.style.color = scrolled ? BLUE : 'white'}
              onMouseLeave={e => e.currentTarget.style.color = scrolled ? T_MUTED : 'rgba(255,255,255,0.65)'}>{l}</a>
          ))}
        </div>
        <GBtn href="#contact" variant="primary" size="sm" className="hidden md:inline-flex">
          Réserver une démo <Arrow size={12}/>
        </GBtn>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open
              ? <path d="M4 4l14 14M18 4L4 18" stroke={scrolled?T_MAIN:'white'} strokeWidth="1.6" strokeLinecap="round"/>
              : <path d="M3 6h16M3 11h16M3 16h16" stroke={scrolled?T_MAIN:'white'} strokeWidth="1.6" strokeLinecap="round"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white px-6 pb-5 flex flex-col gap-4" style={{ borderTop:`1px solid ${BORDER}` }}>
          {links.map(([l,h]) => <a key={l} href={h} className="text-sm font-medium py-1" style={{ color:T_MAIN, fontFamily:'Sora,sans-serif' }} onClick={() => setOpen(false)}>{l}</a>)}
          <GBtn href="#contact" variant="primary" size="sm" onClick={() => setOpen(false)}>Réserver une démo <Arrow size={12}/></GBtn>
        </div>
      )}
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroVisual() {
  const bars = [3,5,8,12,15,10,14,9,12,7,14,10,6,11,4,9,13,7]
  return (
    <div className="relative w-full max-w-[340px] mx-auto animate-floatY">
      <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background:`radial-gradient(circle at 50% 50%,rgba(47,199,214,0.14),transparent 70%)`, transform:'scale(1.6)' }}/>
      <div className="relative rounded-3xl p-6"
        style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.11)', backdropFilter:'blur(28px)', boxShadow:'0 32px 80px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.1)' }}>
        <div className="absolute top-0 inset-x-0 h-px rounded-t-3xl" style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)' }}/>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:GRAD, boxShadow:'0 4px 14px rgba(30,115,216,0.45)' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 12 19.79 19.79 0 011.49 3.37 2 2 0 013.48 1h3a2 2 0 012 1.72c.127.96.361 1.9.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px]" style={{ color:'rgba(255,255,255,0.38)', fontFamily:'JetBrains Mono,monospace' }}>Agent Omnira · Actif</p>
            <p className="text-sm font-semibold text-white" style={{ fontFamily:'Sora,sans-serif' }}>Accueil vocal intelligent</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/><span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"/></span>
            <span className="text-xs text-green-400 font-medium">En ligne</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[3px] h-12 px-3 mb-5 rounded-xl" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)' }}>
          {bars.map((h,i) => (
            <div key={i} className="rounded-full" style={{ width:'3px', height:`${h*2}px`, background:`linear-gradient(to top,${BLUE},${CYAN})`, animation:`barwave ${0.5+i*0.055}s ease-in-out infinite`, animationDelay:`${i*0.04}s`, transformOrigin:'center' }}/>
          ))}
        </div>
        <div className="rounded-xl p-3 mb-4" style={{ background:'rgba(30,115,216,0.12)', border:'1px solid rgba(30,115,216,0.22)' }}>
          <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color:'rgba(255,255,255,0.38)', fontFamily:'JetBrains Mono,monospace' }}>Appel en cours</p>
          <p className="text-sm font-semibold text-white" style={{ fontFamily:'Sora,sans-serif' }}>Demande de rendez-vous · 06 XX XX XX</p>
          <p className="text-xs mt-0.5" style={{ color:CYAN }}>Qualification en cours...</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[['94%','Captés'],['3h','Gagnées'],['24/7','Actif']].map(([v,l]) => (
            <div key={l} className="text-center py-2 rounded-xl" style={{ background:'rgba(255,255,255,0.04)' }}>
              <p className="text-sm font-bold" style={{ fontFamily:'JetBrains Mono,monospace', color:CYAN }}>{v}</p>
              <p className="text-[10px] mt-0.5" style={{ color:'rgba(255,255,255,0.32)' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -top-4 -right-3 flex items-center gap-2 px-3 py-2 rounded-2xl" style={{ background:'rgba(11,23,38,0.92)', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(14px)', boxShadow:'0 8px 24px rgba(0,0,0,0.3)' }}>
        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background:`rgba(87,214,199,0.18)` }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4.5-4.5" stroke={LCYAN} strokeWidth="1.4" strokeLinecap="round"/></svg>
        </div>
        <span className="text-xs font-semibold text-white">Appel qualifié</span>
      </div>
      <div className="absolute -bottom-4 -left-3 flex items-center gap-2 px-3 py-2 rounded-2xl" style={{ background:'rgba(11,23,38,0.92)', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(14px)', boxShadow:'0 8px 24px rgba(0,0,0,0.3)' }}>
        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background:`rgba(30,115,216,0.2)` }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="1" width="8" height="8" rx="1.5" stroke={BLUE} strokeWidth="1.2"/><path d="M2.5 4h5M2.5 6h3" stroke={BLUE} strokeWidth="1.2" strokeLinecap="round"/></svg>
        </div>
        <span className="text-xs font-semibold text-white">Résumé envoyé</span>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20" style={{ background:BG_DARK }}>
      <HeroBackground/>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          <div className="mb-7"><Chip>Agent vocal IA · Garages indépendants</Chip></div>
          <h1 className="text-[42px] md:text-5xl lg:text-[58px] font-extrabold leading-[1.06] mb-6 text-white"
            style={{ fontFamily:'Sora,sans-serif', letterSpacing:'-0.026em' }}>
            Ne perdez plus les appels utiles{' '}
            <span style={{ background:`linear-gradient(135deg,${BLUE},${CYAN},${LCYAN})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              de votre garage.
            </span>
          </h1>
          <p className="text-lg leading-relaxed mb-10" style={{ color:'rgba(255,255,255,0.52)', maxWidth:'500px', fontFamily:'Inter,sans-serif', lineHeight:'1.72' }}>
            Omnira décroche, qualifie et filtre vos appels pour protéger votre planning atelier et soulager l'équipe — sans retirer l'humain des cas importants.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <GBtn href="#demo" variant="primary" size="md">Écouter l'agent <Arrow size={13}/></GBtn>
            <GBtn href="#roi" variant="outline" size="md">Calculer mes pertes</GBtn>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_,i) => <Star key={i}/>)}
              <span className="ml-2 text-sm font-semibold text-white">5 / 5</span>
            </div>
            <div className="w-px h-4" style={{ background:'rgba(255,255,255,0.14)' }}/>
            <span className="text-sm" style={{ color:'rgba(255,255,255,0.35)', fontFamily:'Inter,sans-serif' }}>Déjà utilisé par des garages indépendants</span>
          </div>
        </div>
        <div className="flex items-center justify-center px-6"><HeroVisual/></div>
      </div>
      <div className="absolute bottom-0 inset-x-0 pointer-events-none z-10">
        <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0 36 Q360 0 720 36 Q1080 72 1440 36 L1440 72 L0 72 Z" fill={BG_WHITE}/>
        </svg>
      </div>
    </section>
  )
}

// ─── PAIN ─────────────────────────────────────────────────────────────────────

function Pain() {
  return (
    <section className="py-24" style={{ background:BG_WHITE }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="mb-4"><Chip color={BLUE}>Le quotidien du garage</Chip></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily:'Sora,sans-serif', color:T_MAIN, letterSpacing:'-0.022em' }}>
            Le téléphone ne devrait pas<br/>désorganiser votre atelier.
          </h2>
          <p className="max-w-xl mx-auto leading-relaxed" style={{ color:T_MUTED, fontFamily:'Inter,sans-serif' }}>
            Dans beaucoup de garages, le téléphone est encore géré "par celui qui peut décrocher". Résultat : interruptions, rappels perdus, appels utiles ratés.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROBLEMS.map(({ icon, title, stat, desc }) => (
            <div key={title} className="flex flex-col p-6 rounded-2xl relative overflow-hidden transition-all duration-200 hover:-translate-y-1 cursor-default"
              style={{ background:BG_DARK, border:'1px solid rgba(255,255,255,0.07)', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow='0 16px 48px rgba(0,0,0,0.32),0 0 0 1px rgba(30,115,216,0.22)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.2)'}>
              <div className="absolute top-0 inset-x-0 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)' }}/>
              <span className="text-3xl mb-4">{icon}</span>
              <h3 className="text-sm font-bold text-white mb-2" style={{ fontFamily:'Sora,sans-serif' }}>{title}</h3>
              <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color:'rgba(255,255,255,0.42)', fontFamily:'Inter,sans-serif' }}>{desc}</p>
              <div className="pt-3" style={{ borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                <span className="text-[11px] font-medium" style={{ color:CYAN, fontFamily:'JetBrains Mono,monospace' }}>{stat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── AUDIO DEMO ───────────────────────────────────────────────────────────────

function AudioDemo() {
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState('0:00')
  const [dur,  setDur]  = useState('0:00')
  const audioRef = useRef(null)
  const blobUrl  = useRef(null)
  const fmt = s => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime  = () => { setProgress(a.duration ? a.currentTime/a.duration : 0); setTime(fmt(a.currentTime)) }
    const onMeta  = () => setDur(fmt(a.duration))
    const onEnded = () => { setStatus('done'); setProgress(0) }
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('ended', onEnded)
    return () => { a.removeEventListener('timeupdate',onTime); a.removeEventListener('loadedmetadata',onMeta); a.removeEventListener('ended',onEnded) }
  }, [])

  const handlePlay = async () => {
    const a = audioRef.current
    if (status === 'playing') { a.pause(); setStatus('paused'); return }
    if (status === 'paused')  { a.play();  setStatus('playing'); return }
    if (status === 'done')    { a.currentTime = 0; a.play(); setStatus('playing'); return }
    setStatus('loading')
    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${EL_VOICE}`, {
        method:'POST',
        headers:{ 'xi-api-key':EL_KEY, 'Content-Type':'application/json', 'Accept':'audio/mpeg' },
        body:JSON.stringify({ text:DEMO_TEXT, model_id:'eleven_multilingual_v2', voice_settings:{ stability:0.52, similarity_boost:0.82, style:0.25, use_speaker_boost:true } }),
      })
      if (!res.ok) throw new Error('ElevenLabs error')
      const blob = await res.blob()
      blobUrl.current = URL.createObjectURL(blob)
      a.src = blobUrl.current
      await a.play()
      setStatus('playing')
    } catch (err) { console.error(err); setStatus('idle') }
  }

  const isPlaying = status === 'playing'
  const bars = [4,7,11,15,12,9,14,8,12,6,13,10,7,11,5,8,14,9,12,7,10,13,6,9,5]

  return (
    <section id="demo" className="py-24" style={{ background:BG_LIGHT }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="mb-4"><Chip color={BLUE}>Démo audio</Chip></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily:'Sora,sans-serif', color:T_MAIN, letterSpacing:'-0.022em' }}>
            Écoutez votre futur agent en action.
          </h2>
          <p className="max-w-xl mx-auto leading-relaxed" style={{ color:T_MUTED, fontFamily:'Inter,sans-serif' }}>
            Un aperçu réaliste de ce que vos clients entendent dès qu'ils appellent le garage. Naturel, fluide, immédiatement disponible.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Player */}
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              {isPlaying && (
                <>
                  <div className="absolute inset-0 rounded-full" style={{ background:`rgba(30,115,216,0.15)`, animation:'pulseRing 2s ease-out infinite' }}/>
                  <div className="absolute inset-0 rounded-full" style={{ background:`rgba(47,199,214,0.1)`, animation:'pulseRing 2s ease-out infinite 0.65s' }}/>
                </>
              )}
              <button onClick={handlePlay}
                className="relative w-28 h-28 rounded-full flex items-center justify-center overflow-hidden"
                style={{ background:GRAD, boxShadow:isPlaying?'0 16px 48px rgba(30,115,216,0.55)':'0 12px 40px rgba(30,115,216,0.4)', transition:'all 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform='scale(1.06)'}
                onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
                <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,rgba(255,255,255,0.2) 0%,transparent 55%)' }}/>
                {status==='loading' ? (
                  <svg className="animate-spin relative" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="11" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/>
                    <path d="M14 3a11 11 0 0111 11" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                ) : isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="relative"><rect x="6" y="5" width="4" height="14" rx="1.5"/><rect x="14" y="5" width="4" height="14" rx="1.5"/></svg>
                ) : (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white" className="relative" style={{ marginLeft:'3px' }}><path d="M5 3l14 9-14 9V3z"/></svg>
                )}
              </button>
            </div>
            <p className="text-sm font-semibold mb-2" style={{ color:T_MAIN, fontFamily:'Sora,sans-serif' }}>
              {status==='idle' ? "Cliquez pour écouter l'agent" : status==='loading' ? "Génération en cours..." : isPlaying ? "Lecture en cours..." : status==='paused' ? "En pause — cliquez pour reprendre" : "Lecture terminée"}
            </p>
            <p className="text-xs mb-6" style={{ color:T_MUTED, fontFamily:'JetBrains Mono,monospace' }}>{time} / {dur||'—'}</p>
            <div className="w-full flex items-center justify-center gap-[3px] h-12 px-4 rounded-2xl mb-4"
              style={{ background:BG_WHITE, border:`1px solid ${BORDER}`, boxShadow:'inset 0 2px 8px rgba(16,63,115,0.04)' }}>
              {bars.map((h,i) => (
                <div key={i} className="rounded-full transition-all"
                  style={{ width:'3px', height:isPlaying?`${h*1.9}px`:`${Math.max(h*0.5,4)}px`,
                    background:i/bars.length<=progress?`linear-gradient(to top,${BLUE},${CYAN})`:BORDER,
                    animation:isPlaying?`barwave ${0.5+i*0.05}s ease-in-out infinite`:'none',
                    animationDelay:`${i*0.04}s`, transformOrigin:'center' }}/>
              ))}
            </div>
            <div className="w-full h-1 rounded-full mb-8" style={{ background:BORDER }}>
              <div className="h-full rounded-full transition-all duration-300" style={{ width:`${progress*100}%`, background:GRAD }}/>
            </div>
            <GBtn href="#contact" variant="primary" size="md" className="w-full justify-center">
              Tester l'agent dans mon garage <Arrow size={13}/>
            </GBtn>
            <audio ref={audioRef}/>
          </div>

          {/* Transcript */}
          <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background:BG_WHITE, border:`1px solid ${BORDER}`, boxShadow:SHADOW }}>
            <div className="absolute top-0 inset-x-0 h-px" style={{ background:`linear-gradient(90deg,transparent,rgba(30,115,216,0.18),transparent)` }}/>
            <div className="flex items-center gap-2 mb-5 pb-4" style={{ borderBottom:`1px solid ${BORDER}` }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background:GRAD, boxShadow:'0 2px 8px rgba(30,115,216,0.35)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 12 19.79 19.79 0 011.49 3.37 2 2 0 013.48 1h3a2 2 0 012 1.72c.127.96.361 1.9.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color:T_MAIN, fontFamily:'Sora,sans-serif' }}>Exemple d'appel entrant</p>
                <p className="text-[11px]" style={{ color:T_MUTED, fontFamily:'JetBrains Mono,monospace' }}>Demande de vidange · scénario réel</p>
              </div>
            </div>
            <div className="space-y-3">
              {TRANSCRIPT_DEMO.map(({ role, text }, i) => {
                const isAgent = role === 'agent'
                return (
                  <div key={i} className={`flex gap-2.5 ${isAgent?'flex-row-reverse':''}`}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5"
                      style={{ background:isAgent?GRAD:BG_LIGHT, color:isAgent?'white':T_MUTED, boxShadow:isAgent?'0 2px 6px rgba(30,115,216,0.3)':'none' }}>
                      {isAgent?'AI':'C'}
                    </div>
                    <div className="max-w-[78%] px-3 py-2 rounded-xl text-xs leading-relaxed"
                      style={{ background:isAgent?'rgba(30,115,216,0.07)':BG_LIGHT, border:isAgent?`1px solid rgba(30,115,216,0.15)`:`1px solid ${BORDER}`, color:T_MAIN, fontFamily:'Inter,sans-serif' }}>
                      {text}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-5 pt-4 flex items-center gap-2" style={{ borderTop:`1px solid ${BORDER}` }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background:`rgba(47,199,214,0.12)` }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4.5-4.5" stroke={CYAN} strokeWidth="1.4" strokeLinecap="round"/></svg>
              </div>
              <span className="text-[11px] font-medium" style={{ color:CYAN, fontFamily:'JetBrains Mono,monospace' }}>RDV confirmé · Résumé envoyé à l'équipe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────

function Features() {
  return (
    <section className="py-24" style={{ background:BG_WHITE }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="mb-4"><Chip color={BLUE}>Ce qu'Omnira met en place</Chip></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily:'Sora,sans-serif', color:T_MAIN, letterSpacing:'-0.022em' }}>
            Une surcouche utile,<br/>pas une révolution à gérer.
          </h2>
          <p className="max-w-xl mx-auto leading-relaxed" style={{ color:T_MUTED, fontFamily:'Inter,sans-serif' }}>
            Omnira ne remplace pas votre accueil. Il l'épargne pour ce qui compte : les cas complexes, les clients qui méritent votre attention, les situations qui demandent du jugement.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} className="p-7 rounded-2xl relative overflow-hidden transition-all duration-200 hover:-translate-y-1 group cursor-default"
              style={{ background:BG_WHITE, border:`1px solid ${BORDER}`, boxShadow:SHADOW }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 20px 48px rgba(30,115,216,0.12),0 0 0 1px rgba(30,115,216,0.18)`; e.currentTarget.style.borderColor='rgba(30,115,216,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow=SHADOW; e.currentTarget.style.borderColor=BORDER }}>
              <div className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background:`linear-gradient(90deg,transparent,rgba(30,115,216,0.25),transparent)` }}/>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-xl" style={{ background:BG_LIGHT, border:`1px solid ${BORDER}` }}>{icon}</div>
              <h3 className="text-sm font-bold mb-2" style={{ fontFamily:'Sora,sans-serif', color:T_MAIN }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color:T_MUTED, fontFamily:'Inter,sans-serif' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────

function HowItWorks() {
  return (
    <section id="comment" className="py-24" style={{ background:BG_LIGHT }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="mb-4"><Chip color={BLUE}>Méthode</Chip></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily:'Sora,sans-serif', color:T_MAIN, letterSpacing:'-0.022em' }}>
            Opérationnel en 15 minutes.<br/>Mesurable dès la première semaine.
          </h2>
          <p className="max-w-md mx-auto" style={{ color:T_MUTED, fontFamily:'Inter,sans-serif' }}>Un périmètre clair, une mise en place guidée, un agent configuré selon vos règles. Votre équipe n'a rien à changer.</p>
        </div>
        <div className="space-y-5">
          {STEPS.map(({ num, title, tag, desc }, i) => (
            <div key={num} className="grid grid-cols-1 md:grid-cols-[88px_1fr] gap-6 p-8 rounded-2xl relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background:BG_WHITE, border:`1px solid ${BORDER}`, boxShadow:SHADOW }}>
              <div className="absolute top-0 inset-x-0 h-px" style={{ background:i===1?`linear-gradient(90deg,transparent,rgba(30,115,216,0.2),transparent)`:'transparent' }}/>
              <div className="flex items-start justify-center md:justify-start pt-0.5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                  style={{ background:i===1?GRAD:`rgba(30,115,216,0.07)`, border:i===1?'none':`1.5px solid rgba(30,115,216,0.16)`, boxShadow:i===1?'0 8px 24px rgba(30,115,216,0.32)':'none' }}>
                  {i===1 && <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,rgba(255,255,255,0.2) 0%,transparent 55%)' }}/>}
                  <span className="text-sm font-bold relative" style={{ fontFamily:'JetBrains Mono,monospace', color:i===1?'white':BLUE }}>{num}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-base font-bold" style={{ fontFamily:'Sora,sans-serif', color:T_MAIN }}>{title}</h3>
                  <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold" style={{ background:`rgba(47,199,214,0.1)`, color:CYAN, border:`1px solid rgba(47,199,214,0.22)`, fontFamily:'JetBrains Mono,monospace' }}>{tag}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color:T_MUTED, fontFamily:'Inter,sans-serif' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <GBtn href="#contact" variant="primary" size="lg">Démarrer la configuration <Arrow size={14}/></GBtn>
        </div>
      </div>
    </section>
  )
}

// ─── ROI CALCULATOR ───────────────────────────────────────────────────────────

function ROICalculator() {
  const [missed,  setMissed]  = useState(10)
  const [rate,    setRate]    = useState(30)
  const [basket,  setBasket]  = useState(150)
  const monthly = Math.round(missed * 4 * (rate/100))
  const revenue = monthly * basket
  const annual  = revenue * 12
  const sliders = [
    { label:'Appels manqués par semaine', value:missed,  set:setMissed,  min:1,  max:50,  unit:'appels', color:BLUE  },
    { label:'Taux de conversion estimé',  value:rate,    set:setRate,    min:5,  max:80,  unit:'%',      color:CYAN  },
    { label:'Panier moyen par client',    value:basket,  set:setBasket,  min:50, max:500, unit:'€',      color:LCYAN },
  ]
  return (
    <section id="roi" className="py-24" style={{ background:BG_WHITE }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="mb-4"><Chip color={BLUE}>Calculateur ROI</Chip></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily:'Sora,sans-serif', color:T_MAIN, letterSpacing:'-0.022em' }}>
            Combien vous coûtent<br/>vos appels manqués ?
          </h2>
          <p className="max-w-md mx-auto leading-relaxed" style={{ color:T_MUTED, fontFamily:'Inter,sans-serif' }}>Ajustez les curseurs selon votre situation et découvrez ce qu'Omnira peut récupérer pour vous chaque mois.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="p-8 rounded-2xl space-y-8" style={{ background:BG_LIGHT, border:`1px solid ${BORDER}`, boxShadow:'inset 0 2px 12px rgba(16,63,115,0.04)' }}>
            {sliders.map(({ label, value, set, min, max, unit, color }) => {
              const pct = ((value-min)/(max-min))*100
              return (
                <div key={label}>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-semibold" style={{ color:T_MAIN, fontFamily:'Sora,sans-serif' }}>{label}</label>
                    <span className="text-sm font-bold tabular-nums" style={{ color, fontFamily:'JetBrains Mono,monospace' }}>{value}{unit}</span>
                  </div>
                  <input type="range" min={min} max={max} value={value} onChange={e => set(Number(e.target.value))}
                    className="omnira-slider w-full" style={{ '--pct':`${pct}%`, '--color':color }}/>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[11px]" style={{ color:T_MUTED, fontFamily:'JetBrains Mono,monospace' }}>{min}{unit}</span>
                    <span className="text-[11px]" style={{ color:T_MUTED, fontFamily:'JetBrains Mono,monospace' }}>{max}{unit}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="space-y-4">
            {[
              { label:'Clients récupérables / mois', value:`${monthly}`,                        unit:'clients', color:BLUE,  hi:false },
              { label:'Revenus récupérables / mois', value:`${revenue.toLocaleString('fr-FR')}`, unit:'€',       color:CYAN,  hi:false },
              { label:'Revenus récupérables / an',   value:`${annual.toLocaleString('fr-FR')}`,  unit:'€ / an',  color:LCYAN, hi:true  },
            ].map(({ label, value, unit, color, hi }) => (
              <div key={label} className="p-6 rounded-2xl relative overflow-hidden"
                style={{ background:hi?`linear-gradient(135deg,#0D3665,${BLUE})`:BG_LIGHT, border:hi?'none':`1px solid ${BORDER}`, boxShadow:hi?'0 20px 56px rgba(30,115,216,0.24)':'none' }}>
                {hi && <div className="absolute top-0 inset-x-0 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)' }}/>}
                <p className="text-xs mb-2" style={{ color:hi?'rgba(255,255,255,0.48)':T_MUTED, fontFamily:'JetBrains Mono,monospace' }}>{label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold" style={{ fontFamily:'JetBrains Mono,monospace', color:hi?'white':color }}>{value}</span>
                  <span className="text-sm font-medium" style={{ color:hi?'rgba(255,255,255,0.5)':color, fontFamily:'JetBrains Mono,monospace' }}>{unit}</span>
                </div>
              </div>
            ))}
            <GBtn href="#contact" variant="primary" size="md" className="w-full justify-center">
              Commencer à récupérer ces revenus <Arrow size={13}/>
            </GBtn>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS — SCATTERED CARDS ───────────────────────────────────────────

function Testimonials() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ background:BG_DARK }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse 70% 50% at 50% 50%,rgba(30,115,216,0.07),transparent 70%)' }}/>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)' }}/>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="mb-4"><Chip>Ce que disent les garages</Chip></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily:'Sora,sans-serif', letterSpacing:'-0.022em' }}>
            Des résultats concrets,<br/>des équipes soulagées.
          </h2>
          <p className="mt-4 max-w-md mx-auto" style={{ color:'rgba(255,255,255,0.4)', fontFamily:'Inter,sans-serif' }}>
            Garages indépendants qui ont récupéré leurs appels et leur sérénité.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pb-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="relative"
              style={{ transform:`rotate(${t.rotate})`, marginTop:t.offsetY, transition:'transform 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform='rotate(0deg) translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform=`rotate(${t.rotate}) translateY(0px)`}>
              <div className="p-6 rounded-2xl relative overflow-hidden"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)', backdropFilter:'blur(16px)', boxShadow:'0 16px 48px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                <div className="absolute top-0 inset-x-0 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)' }}/>
                <div className="flex gap-0.5 mb-4">{[...Array(t.stars)].map((_,j) => <Star key={j}/>)}</div>
                <p className="text-sm leading-relaxed mb-5 text-white" style={{ fontFamily:'Inter,sans-serif', opacity:0.85 }}>"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                    style={{ background:`linear-gradient(135deg,${t.color},${i===0?CYAN:i===1?LCYAN:BLUE})`, boxShadow:`0 4px 12px ${t.color}44` }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white" style={{ fontFamily:'Sora,sans-serif' }}>{t.name}</p>
                    <p className="text-[11px]" style={{ color:'rgba(255,255,255,0.35)', fontFamily:'JetBrains Mono,monospace' }}>{t.role} · {t.garage}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <GBtn href="#contact" variant="primary" size="lg">Rejoindre ces garages <Arrow size={14}/></GBtn>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" className="py-24" style={{ background:BG_LIGHT }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="mb-4"><Chip color={BLUE}>Questions fréquentes</Chip></div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily:'Sora,sans-serif', color:T_MAIN, letterSpacing:'-0.022em' }}>
            Les vraies questions<br/>avant de se décider.
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map(({ q, a }, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background:BG_WHITE, border:`1px solid ${BORDER}`, boxShadow:SHADOW }}>
              <button className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open===i?null:i)} style={{ background:open===i?BG_LIGHT:'transparent' }}>
                <span className="text-sm font-semibold" style={{ color:T_MAIN, fontFamily:'Sora,sans-serif' }}>{q}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 transition-transform duration-200" style={{ transform:open===i?'rotate(180deg)':'none' }}>
                  <path d="M5 7.5l5 5 5-5" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {open===i && (
                <div className="px-6 pb-5 pt-1">
                  <p className="text-sm leading-relaxed" style={{ color:T_MUTED, fontFamily:'Inter,sans-serif' }}>{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-sm" style={{ color:T_MUTED, fontFamily:'Inter,sans-serif' }}>
            Autre question ?{' '}
            <a href="mailto:contact@omnira.ai" className="font-semibold hover:underline" style={{ color:BLUE }}>Contactez-nous directement</a>
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name,  setName]  = useState('')
  const [sent,  setSent]  = useState(false)
  return (
    <section id="contact" className="py-24" style={{ background:BG_WHITE }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="mb-5"><Chip color={BLUE}>Voir si ça s'applique à vous</Chip></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily:'Sora,sans-serif', color:T_MAIN, letterSpacing:'-0.022em' }}>
              Demandez une démo<br/>adaptée à votre garage.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color:T_MUTED, fontFamily:'Inter,sans-serif' }}>
              On vous montre exactement comment l'agent fonctionnerait dans votre contexte — vos horaires, vos services, vos règles de transfert.
            </p>
            {["Démo personnalisée, pas une présentation générique","Aucun engagement, aucun contrat à signer","Opérationnel dès la première semaine si vous voulez avancer"].map(l => (
              <div key={l} className="flex items-start gap-3 mb-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background:`rgba(47,199,214,0.12)`, border:`1px solid rgba(47,199,214,0.2)` }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4.5-4.5" stroke={CYAN} strokeWidth="1.4" strokeLinecap="round"/></svg>
                </div>
                <span className="text-sm" style={{ color:T_MUTED, fontFamily:'Inter,sans-serif' }}>{l}</span>
              </div>
            ))}
            <div className="mt-10 grid grid-cols-3 gap-4 pt-8" style={{ borderTop:`1px solid ${BORDER}` }}>
              {[['94%','Appels captés'],['15 min','Configuration'],['24/7','Disponible']].map(([v,l]) => (
                <div key={l} className="text-center">
                  <p className="text-2xl font-bold" style={{ fontFamily:'JetBrains Mono,monospace', color:BLUE }}>{v}</p>
                  <p className="text-xs mt-1" style={{ color:T_MUTED, fontFamily:'Inter,sans-serif' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          {sent ? (
            <div className="p-10 rounded-2xl text-center relative overflow-hidden" style={{ background:`rgba(47,199,214,0.04)`, border:`1px solid rgba(47,199,214,0.18)` }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden" style={{ background:GRAD, boxShadow:'0 8px 24px rgba(30,115,216,0.38)' }}>
                <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,rgba(255,255,255,0.22) 0%,transparent 55%)' }}/>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="relative"><path d="M4 11l5 5 9-9" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <p className="text-lg font-bold mb-2" style={{ fontFamily:'Sora,sans-serif', color:T_MAIN }}>Demande reçue !</p>
              <p className="text-sm" style={{ color:T_MUTED, fontFamily:'Inter,sans-serif' }}>Notre équipe vous contactera dans les 24h pour organiser la démo personnalisée.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true) }}
              className="p-8 rounded-2xl space-y-4 relative overflow-hidden"
              style={{ background:BG_LIGHT, border:`1px solid ${BORDER}`, boxShadow:SHADOW }}>
              <div className="absolute top-0 inset-x-0 h-px" style={{ background:`linear-gradient(90deg,transparent,rgba(30,115,216,0.15),transparent)` }}/>
              {[
                { label:'Votre nom',       type:'text',  val:name,  set:setName,  ph:'Jean Dupont',    req:true  },
                { label:'Votre email',     type:'email', val:email, set:setEmail, ph:'vous@garage.fr', req:true  },
                { label:'Votre téléphone', type:'tel',   val:phone, set:setPhone, ph:'06 XX XX XX XX', req:false },
              ].map(({ label, type, val, set, ph, req }) => (
                <div key={label}>
                  <label className="text-[11px] font-semibold block mb-1.5" style={{ color:T_MUTED, fontFamily:'JetBrains Mono,monospace' }}>{label}</label>
                  <input type={type} required={req} value={val} onChange={e => set(e.target.value)} placeholder={ph}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background:BG_WHITE, border:`1.5px solid ${BORDER}`, color:T_MAIN, fontFamily:'Inter,sans-serif' }}
                    onFocus={e => { e.target.style.borderColor=BLUE; e.target.style.boxShadow=`0 0 0 3px rgba(30,115,216,0.1)` }}
                    onBlur={e  => { e.target.style.borderColor=BORDER; e.target.style.boxShadow='none' }}/>
                </div>
              ))}
              <button type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white relative overflow-hidden transition-all hover:opacity-90"
                style={{ background:GRAD, boxShadow:'0 8px 24px rgba(30,115,216,0.32),inset 0 1px 0 rgba(255,255,255,0.2)', fontFamily:'Sora,sans-serif', marginTop:'8px' }}>
                <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,rgba(255,255,255,0.16) 0%,transparent 55%)' }}/>
                <span className="relative">Réserver ma démo →</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="py-24" style={{ background:BG_LIGHT }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative p-12 md:p-20 rounded-3xl text-center overflow-hidden"
          style={{ background:`linear-gradient(135deg,#0D3665 0%,${BLUE} 55%,rgba(47,199,214,0.8) 100%)`, boxShadow:'0 48px 120px rgba(30,115,216,0.38)' }}>
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full" style={{ background:'rgba(255,255,255,0.05)' }}/>
          <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full" style={{ background:'rgba(255,255,255,0.04)' }}/>
          <div className="absolute top-0 inset-x-0 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)' }}/>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <OmniraLogo height={48} dark/>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily:'Sora,sans-serif', letterSpacing:'-0.025em' }}>
              Voyez si Omnira peut fonctionner<br/>dans votre garage.
            </h2>
            <p className="mb-10 text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color:'rgba(255,255,255,0.6)', fontFamily:'Inter,sans-serif' }}>
              Une démo concrète. Votre contexte, vos services, vos horaires. Pas une présentation générique.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <GBtn href="#contact" variant="white" size="lg">Demander un échange <Arrow color="#103F73" size={15}/></GBtn>
              <GBtn href="#demo" variant="outline" size="lg">Écouter l'agent d'abord</GBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    { title:'Produit',    links:[['Démo audio','#demo'],['Comment ça marche','#comment'],['Calculateur ROI','#roi'],['Offres','#']] },
    { title:'Ressources', links:[['FAQ','#faq'],['Blog','#'],['Cas clients','#'],['Contact','#contact']] },
  ]
  return (
    <footer style={{ background:BG_FOOT, borderTop:'1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="inline-block mb-4"><OmniraLogo height={36} dark/></a>
            <p className="text-sm leading-relaxed mb-5" style={{ color:'rgba(255,255,255,0.3)', maxWidth:'260px', fontFamily:'Inter,sans-serif' }}>
              Agent vocal IA pour garages indépendants. Ne perdez plus les appels utiles. Protégez le planning atelier.
            </p>
            <a href="mailto:contact@omnira.ai" className="text-sm font-medium hover:underline" style={{ color:CYAN }}>contact@omnira.ai</a>
          </div>
          {cols.map(({ title, links }) => (
            <div key={title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color:'rgba(255,255,255,0.22)', fontFamily:'JetBrains Mono,monospace' }}>{title}</p>
              <ul className="space-y-3">
                {links.map(([l,h]) => <li key={l}><a href={h} className="text-sm transition-colors hover:text-white" style={{ color:'rgba(255,255,255,0.36)', fontFamily:'Inter,sans-serif' }}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop:'1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs" style={{ color:'rgba(255,255,255,0.2)', fontFamily:'Inter,sans-serif' }}>© {new Date().getFullYear()} Omnira. Tous droits réservés.</p>
          <div className="flex gap-6">
            {['Mentions légales','Confidentialité','CGU'].map(l => <a key={l} href="#" className="text-xs transition-colors hover:text-white" style={{ color:'rgba(255,255,255,0.2)', fontFamily:'Inter,sans-serif' }}>{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── STICKY FAB ───────────────────────────────────────────────────────────────

function StickyFab() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300"
      style={{ opacity:show?1:0, transform:show?'translateY(0)':'translateY(16px)', pointerEvents:show?'auto':'none' }}>
      <a href="#contact" className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold text-white relative overflow-hidden"
        style={{ background:GRAD, boxShadow:'0 8px 32px rgba(30,115,216,0.55),inset 0 1px 0 rgba(255,255,255,0.22)', fontFamily:'Sora,sans-serif' }}>
        <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,rgba(255,255,255,0.18) 0%,transparent 55%)' }}/>
        <span className="relative">Réserver une démo</span>
        <Arrow size={12}/>
      </a>
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background:BG_WHITE }}>
      <Nav/>
      <Hero/>
      <Pain/>
      <InlineCTA
        text="Chaque appel non décroché est une opportunité perdue."
        sub="Découvrez ce qu'Omnira peut capturer pour vous dès cette semaine."
        bg={BG_WHITE}
      />
      <AudioDemo/>
      <Features/>
      <InlineCTA
        text="Prêt à transformer votre accueil téléphonique ?"
        sub="Configuration guidée en 15 minutes. Opérationnel le jour même."
        bg={BG_WHITE}
      />
      <HowItWorks/>
      <ROICalculator/>
      <Testimonials/>
      <FAQ/>
      <ContactForm/>
      <FinalCTA/>
      <Footer/>
      <StickyFab/>
    </div>
  )
}
