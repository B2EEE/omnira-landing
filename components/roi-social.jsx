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

// ─── ONBOARDING (7 steps) ─────────────────────────────────────────────────────
const ONBOARDING_STEPS = [
  { num:'01', title:'Diagnostic de vos appels',       tag:'Analyse',           desc:"On comprend vos volumes, vos horaires, vos demandes fréquentes et vos points de friction au téléphone.", Icon: Ico.Chart },
  { num:'02', title:'Création des scénarios',          tag:'Configuration',     desc:"On définit ce que l'agent doit dire, demander, faire ou transférer selon les types d'appels.", Icon: Ico.Filter },
  { num:'03', title:"Configuration de l'agent vocal",  tag:'IA vocale',         desc:"L'agent est adapté à votre activité, à votre vocabulaire et à votre façon de travailler.", Icon: Ico.Mic },
  { num:'04', title:'Connexion à vos outils',          tag:'Intégration',       desc:"Agenda, CRM, Google Sheets, email, SMS ou outil métier selon votre besoin.", Icon: Ico.Link },
  { num:'05', title:'Tests en conditions réelles',     tag:'Validation',        desc:"On vérifie les réponses, les transferts, les résumés et le comportement sur des cas réels.", Icon: Ico.Shield },
  { num:'06', title:'Mise en ligne',                   tag:'Go live',           desc:"L'agent commence à traiter les appels selon le périmètre validé ensemble.", Icon: Ico.Zap },
  { num:'07', title:'Suivi et optimisation',           tag:'Amélioration continue', desc:"Les scénarios peuvent être améliorés en continu selon les vrais appels reçus.", Icon: Ico.Settings },
];

function OnBoarding() {
  return (
    <section style={{padding:'96px 24px',background:B.bgL}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Mise en place"
            chipColor={B.blue}
            title="Une mise en place simple, cadrée et suivie"
            sub="Pas de prérequis technique, pas de migration lourde. On configure ensemble — étape par étape."
          />
        </FadeIn>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {ONBOARDING_STEPS.map(({num,title,tag,desc,Icon},i)=>(
            <FadeIn key={num} delay={i*0.07}>
              <div style={{display:'grid',gridTemplateColumns:'56px 1fr',gap:'18px',padding:'22px 26px',borderRadius:'18px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow,transition:'all 0.22s ease',position:'relative',overflow:'hidden'}}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 12px 40px rgba(16,63,115,0.1)';e.currentTarget.style.borderColor='rgba(30,115,216,0.22)';}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.borderColor=B.border;}}>
                {i===5 && <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:B.grad}}/>}
                <div style={{display:'flex',justifyContent:'center',paddingTop:'2px'}}>
                  <div style={{
                    width:'46px',height:'46px',borderRadius:'13px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
                    background: i===5 ? B.grad : 'rgba(30,115,216,0.07)',
                    border: i===5 ? 'none' : '1.5px solid rgba(30,115,216,0.18)',
                    boxShadow: i===5 ? '0 6px 20px rgba(30,115,216,0.3)' : 'none',
                    color: i===5 ? 'white' : B.blue,
                    position:'relative',overflow:'hidden',
                  }}>
                    {i===5 && <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(255,255,255,0.18) 0%,transparent 55%)'}}/>}
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',fontWeight:700,position:'relative'}}>{num}</span>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'14px',flexWrap:'wrap'}}>
                  <div style={{flex:1,minWidth:'180px'}}>
                    <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'10px',marginBottom:'6px'}}>
                      <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'15px',fontWeight:700,color:B.tMain,margin:0}}>{title}</h3>
                      <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',padding:'3px 10px',borderRadius:'99px',fontWeight:600,background:'rgba(47,199,214,0.1)',color:B.cyan,border:'1px solid rgba(47,199,214,0.22)'}}>{tag}</span>
                    </div>
                    <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMuted,lineHeight:1.65,margin:0}}>{desc}</p>
                  </div>
                  <div style={{color:B.blue,opacity:0.3,flexShrink:0}}><Icon/></div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.45}>
          <div style={{textAlign:'center',marginTop:'40px'}}>
            <GBtn href="/devis" variant="primary" size="lg">Démarrer la configuration</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.OnBoarding = OnBoarding;

// stubs
window.Testimonials = () => null;
