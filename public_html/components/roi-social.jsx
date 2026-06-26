// ─── HUMAN CONTROL ────────────────────────────────────────────────────────────
const CONTROL_POINTS = [
  { text: 'Les règles sont définies avec vous avant la mise en ligne' },
  { text: "L'agent respecte votre manière de travailler et votre vocabulaire" },
  { text: 'Les cas sensibles sont transférés à un humain selon vos critères' },
  { text: 'Les urgences peuvent être priorisées et traitées en priorité' },
  { text: 'Les scénarios peuvent être modifiés à tout moment' },
  { text: 'Chaque appel peut être résumé et archivé' },
  { text: "L'agent ne promet pas de prix ou de délai non validé par vous" },
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

function OnBoarding() {
  return (
    <section style={{padding:'96px 24px',background:B.bgL}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Mise en place"
            chipColor={B.blue}
            title="Une mise en place simple,<br/>cadrée et suivie"
            sub="Pas de prérequis technique, pas de migration lourde. On configure ensemble — phase par phase."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px'}} className="how-grid">
          {ONBOARDING_PHASES.map(({num,tag,title,desc,details,Icon,color},i)=>(
            <FadeIn key={num} delay={i*0.1}>
              <div style={{
                borderRadius:'20px',padding:'24px',
                background:B.bgW,border:`1px solid ${B.border}`,
                boxShadow:B.shadow,height:'100%',
                transition:'all 0.22s ease',position:'relative',overflow:'hidden',
              }}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 16px 40px rgba(30,115,216,0.1)`;e.currentTarget.style.borderColor='rgba(30,115,216,0.2)';e.currentTarget.style.transform='translateY(-3px)';}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.borderColor=B.border;e.currentTarget.style.transform='translateY(0)';}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:`linear-gradient(90deg,${color},${color}44)`}}/>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
                  <div style={{width:'40px',height:'40px',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',background:`${color}14`,border:`1.5px solid ${color}28`,color}}>
                    <Icon/>
                  </div>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'22px',fontWeight:700,color:`${B.border}`,letterSpacing:'-0.04em'}}>{num}</span>
                </div>
                <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',padding:'3px 10px',borderRadius:'99px',fontWeight:600,background:`${color}12`,color,border:`1px solid ${color}28`,display:'inline-block',marginBottom:'12px'}}>{tag}</span>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'15px',fontWeight:700,color:B.tMain,marginBottom:'8px'}}>{title}</h3>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMuted,lineHeight:1.6,marginBottom:'14px'}}>{desc}</p>
                <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
                  {details.map((d,j)=>(
                    <div key={j} style={{display:'flex',alignItems:'flex-start',gap:'7px'}}>
                      <div style={{width:'4px',height:'4px',borderRadius:'50%',background:color,flexShrink:0,marginTop:'6px'}}/>
                      <span style={{fontFamily:'Inter,sans-serif',fontSize:'11px',color:B.tMuted,lineHeight:1.5}}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div style={{textAlign:'center',marginTop:'40px'}}>
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
