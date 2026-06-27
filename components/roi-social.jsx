// ─── HUMAN CONTROL ────────────────────────────────────────────────────────────
const CONTROL_POINTS = [
  { text: 'Les règles sont définies avec vous avant la mise en ligne' },
  { text: 'Les cas sensibles sont transférés à un humain selon vos critères' },
  { text: 'Les scénarios peuvent être modifiés à tout moment' },
  { text: 'Chaque appel peut être résumé et archivé' },
];

function HumanControl() {
  return (
    <section style={{padding:'96px 24px',background:B.bgD,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 50% at 50% 50%,rgba(30,115,216,0.06),transparent 70%)',pointerEvents:'none'}}/>
      <div style={{maxWidth:'1100px',margin:'0 auto',position:'relative',zIndex:1}}>
        <FadeIn>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'80px',alignItems:'center'}} className="solution-grid">
            {/* Left copy */}
            <div>
              <div style={{marginBottom:'18px'}}><Chip color={B.cyan}>Contrôle humain</Chip></div>
              <h2 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(26px,3.5vw,38px)',fontWeight:800,letterSpacing:'-0.022em',color:'white',lineHeight:1.15,marginBottom:'20px'}}>
                L'IA agit,<br/>mais vous gardez le contrôle.
              </h2>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'16px',lineHeight:1.75,color:'rgba(255,255,255,0.45)',marginBottom:'36px'}}>
                Omnira est conçu pour soulager votre équipe, pas pour remplacer brutalement l'humain. Chaque règle est définie avec vous. Chaque transfert respecte vos critères.
              </p>
              <GBtn href="/devis" variant="outline" size="md">Voir comment ça fonctionne</GBtn>
            </div>
            {/* Right: points list */}
            <FadeIn delay={0.1}>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {CONTROL_POINTS.map(({text},i)=>(
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'12px',padding:'14px 18px',borderRadius:'14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',transition:'all 0.2s ease'}}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(30,115,216,0.07)';e.currentTarget.style.borderColor='rgba(30,115,216,0.2)';}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.borderColor='rgba(255,255,255,0.07)';}}>
                    <div style={{width:'20px',height:'20px',borderRadius:'50%',flexShrink:0,marginTop:'1px',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(47,199,214,0.12)',border:'1px solid rgba(47,199,214,0.25)'}}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-5" stroke={B.cyan} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:'rgba(255,255,255,0.65)',lineHeight:1.55,margin:0}}>{text}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.HumanControl = HumanControl;

// ─── ONBOARDING (4 phases) ────────────────────────────────────────────────────
const ONBOARDING_PHASES = [
  {
    num:'01', tag:'Diagnostic', Icon: Ico.Chart,
    title:'Diagnostic',
    desc:"Comprendre vos appels, vos horaires, vos demandes fréquentes et vos points de friction au téléphone.",
    details:['Analyse du volume d\'appels','Identification des motifs fréquents','Cartographie des horaires','Points de friction actuels'],
    color: B.blue,
  },
  {
    num:'02', tag:'Configuration', Icon: Ico.Settings,
    title:'Configuration',
    desc:"Créer les scénarios, les règles, les questions et les actions que l'agent doit suivre selon votre activité.",
    details:['Rédaction des scénarios vocaux','Définition des règles de transfert','Questions à poser par motif','Connexion aux outils existants'],
    color: B.cyan,
  },
  {
    num:'03', tag:'Tests', Icon: Ico.Shield,
    title:'Tests',
    desc:"Vérifier les réponses, les transferts, les résumés et les connexions en conditions proches du réel.",
    details:['Tests des scénarios clés','Vérification des transferts','Contrôle des résumés générés','Ajustements avant lancement'],
    color: B.lcyan,
  },
  {
    num:'04', tag:'Lancement + suivi', Icon: Ico.Zap,
    title:'Lancement + suivi',
    desc:"Mettre en ligne, observer les premiers appels et optimiser les scénarios selon les retours terrain.",
    details:['Mise en ligne de l\'agent','Suivi des premiers appels','Optimisation continue des scénarios','Dashboard de performance accessible'],
    color: '#4ade80',
  },
];

const ONBOARDING_SIMPLE = [
  { num:'01', title:'Diagnostic',        desc:"On analyse vos appels, vos horaires et vos points de friction.", color: B.blue },
  { num:'02', title:'Configuration',     desc:"On crée les scénarios, les règles et les connexions adaptés à votre activité.", color: B.cyan },
  { num:'03', title:'Tests',             desc:"On vérifie les réponses, les transferts et les résumés avant mise en ligne.", color: B.lcyan },
  { num:'04', title:'Lancement & suivi', desc:"On démarre, on suit les premiers appels et on ajuste en continu.", color: '#4ade80' },
];

function OnBoarding() {
  return (
    <section style={{padding:'96px 24px',background:B.bgL}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Mise en place"
            chipColor={B.blue}
            title="Une mise en place simple,<br/>cadrée et suivie"
            sub="Pas de prérequis technique. On configure ensemble — phase par phase."
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <div style={{position:'relative',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0'}} className="how-grid">
            {/* Ligne de connexion */}
            <div style={{position:'absolute',top:'19px',left:'calc(12.5% + 4px)',right:'calc(12.5% + 4px)',height:'2px',background:`linear-gradient(90deg,${B.blue},${B.cyan},${B.lcyan},'#4ade80')`,opacity:0.2,zIndex:0,pointerEvents:'none'}}/>
            {ONBOARDING_SIMPLE.map(({num,title,desc,color},i)=>(
              <div key={num} style={{padding:'0 20px',textAlign:'center',position:'relative',zIndex:1}}>
                <div style={{width:'40px',height:'40px',borderRadius:'50%',background:B.bgW,border:`2px solid ${color}55`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 18px',boxShadow:`0 0 0 4px ${color}0d`}}>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'12px',fontWeight:700,color}}>{num}</span>
                </div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:B.tMain,marginBottom:'8px'}}>{title}</h3>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:B.tMuted,lineHeight:1.65,margin:0}}>{desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.35}>
          <div style={{textAlign:'center',marginTop:'48px'}}>
            <GBtn href="/devis" variant="primary" size="lg">Demander un devis personnalisé</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.OnBoarding = OnBoarding;

// stubs
window.Testimonials = () => null;
