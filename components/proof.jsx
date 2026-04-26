// ─── STATS BAR ────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { val: '94%', label: 'des appels captés', icon: <Ico.Phone/> },
    { val: '3h',  label: 'récupérées / jour', icon: <Ico.Clock/> },
    { val: 'Simple', label: 'à mettre en place', icon: <Ico.Zap/> },
    { val: '24/7', label: 'sans interruption', icon: <Ico.Shield/> },
  ];
  return (
    <section style={{background:B.bgW,padding:'0 24px 48px'}}>
      <div style={{maxWidth:'1000px',margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:B.border,borderRadius:'20px',overflow:'hidden',boxShadow:B.shadow}} className="stats-grid">
          {stats.map(({val,label,icon},i)=>(
            <FadeIn key={val} delay={i*0.07}>
              <div style={{background:B.bgW,padding:'28px 20px',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
                <div style={{color:B.blue,opacity:0.5}}>{icon}</div>
                <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'28px',fontWeight:700,color:B.tMain,margin:0,lineHeight:1}}>{val}</p>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:B.tMuted,margin:0,lineHeight:1.4}}>{label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
window.StatsBar = StatsBar;

// ─── PAIN ─────────────────────────────────────────────────────────────────────
const PROBLEMS = [
  { Icon: Ico.Phone, title: "Des appels qui s'évaporent", stat: "Chaque appel raté, c'est un client offert à la concurrence", desc: "Pendant une révision ou en heure de pointe, personne ne peut décrocher. Le client raccroche. Il retente peut-être ou appelle directement le garage d'à côté." },
  { Icon: Ico.Zap,   title: "Un atelier sans cesse interrompu", stat: "Un technicien dérangé perd le fil à chaque fois", desc: "Demande de devis, question sur les horaires, relance pour un rappel… Des appels utiles, certes mais qui cassent le rythme de l'atelier plusieurs fois par heure." },
  { Icon: Ico.Calendar, title: "Des demandes qui tombent à l'eau", stat: "Un devis non suivi, c'est un client silencieusement perdu", desc: "Post-it, notes papier, mémos vocaux : les demandes captées à la volée finissent trop souvent sans suite. Sans mauvaise volonté juste faute de temps pour les retraiter." },
  { Icon: Ico.Clock, title: "Le téléphone s'arrête, pas vos clients", stat: "Un appel en soirée peut valoir plusieurs centaines d'euros", desc: "Le garage ferme à 18h. Les clients, eux, appellent aussi le soir, le week-end, entre deux réunions. Personne pour décrocher. L'opportunité disparaît sans laisser de trace." },
];

function Pain() {
  return (
    <section id="pain" style={{padding:'96px 24px',background:B.bgW}}>
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Le quotidien du garage"
            chipColor={B.blue}
            title="Le téléphone ne devrait pas<br/>coûter autant à votre garage."
            sub="Dans la plupart des garages, le téléphone est géré « par celui qui peut décrocher ». Ce bricolage silencieux coûte des clients, de la concentration et de l'énergie chaque jour."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'20px'}} className="pain-grid">
          {PROBLEMS.map(({Icon,title,stat,desc},i)=>(
            <FadeIn key={title} delay={i*0.08}>
              <div style={{display:'flex',flexDirection:'column',padding:'28px',borderRadius:'20px',position:'relative',overflow:'hidden',background:B.bgD,border:'1px solid rgba(255,255,255,0.07)',boxShadow:'0 8px 32px rgba(0,0,0,0.2)',transition:'all 0.22s ease',cursor:'default'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 20px 50px rgba(0,0,0,0.3),0 0 0 1px rgba(30,115,216,0.25)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.2)';}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)'}}/>
                <div style={{width:'40px',height:'40px',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'20px',background:'rgba(30,115,216,0.14)',border:'1px solid rgba(30,115,216,0.22)',color:B.blue}}>
                  <Icon/>
                </div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:'white',marginBottom:'10px'}}>{title}</h3>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.4)',lineHeight:1.65,flex:1,marginBottom:'20px'}}>{desc}</p>
                <div style={{paddingTop:'16px',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',fontWeight:600,color:B.cyan}}>{stat}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Pain = Pain;

// ─── SOLUTION OVERVIEW ────────────────────────────────────────────────────────
function Solution() {
  const items = [
    { Icon: Ico.Phone,    text: 'Décroche chaque appel, 24h/24' },
    { Icon: Ico.Filter,   text: 'Filtre les demandes répétitives' },
    { Icon: Ico.Calendar, text: 'Prend les rendez-vous automatiquement' },
    { Icon: Ico.Chart,    text: 'Résume chaque appel pour votre équipe' },
    { Icon: Ico.Shield,   text: "Protège votre planning et l'atelier" },
    { Icon: Ico.Link,     text: 'Se connecte à votre agenda existant' },
  ];
  return (
    <section style={{padding:'96px 24px',background:B.bgL}}>
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'80px',alignItems:'center'}} className="solution-grid">
          {/* Left copy */}
          <FadeIn>
            <div>
              <div style={{marginBottom:'20px'}}><Chip color={B.blue}>La solution Omnira</Chip></div>
              <h2 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(28px,3.5vw,40px)',fontWeight:800,letterSpacing:'-0.022em',color:B.tMain,lineHeight:1.15,marginBottom:'20px'}}>
                Une couche vocale utile,<br/>simple et rassurante.
              </h2>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'16px',lineHeight:1.75,color:B.tMuted,marginBottom:'40px'}}>
                Omnira ne remplace pas votre accueil. Il l'épargne pour ce qui compte vraiment les cas complexes, les clients fidèles, les situations qui demandent votre jugement.
              </p>
              <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
                {items.map(({Icon,text})=>(
                  <div key={text} style={{display:'flex',alignItems:'center',gap:'14px'}}>
                    <div style={{width:'36px',height:'36px',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow,color:B.blue}}>
                      <Icon/>
                    </div>
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:B.tMain,fontWeight:500}}>{text}</span>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'40px'}}>
                <GBtn href="#demo" variant="primary" size="md">Voir comment ça marche</GBtn>
              </div>
            </div>
          </FadeIn>
          {/* Right visual diagram */}
          <FadeIn delay={0.1}>
            <div style={{position:'relative'}}>
              {/* Call flow diagram */}
              <div style={{borderRadius:'24px',padding:'32px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:'0 20px 60px rgba(16,63,115,0.1)'}}>
                <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',textTransform:'uppercase',letterSpacing:'0.12em',color:B.tMuted,marginBottom:'24px'}}>Flux d'un appel entrant</p>
                {[
                  { label: 'Appel entrant', sub: 'Client appelle le garage', color: B.border, tc: B.tMuted, icon: <Ico.Phone/> },
                  { label: 'Agent Omnira décroche', sub: 'Immédiatement, sans attente', color: B.blue+'22', tc: B.blue, icon: <Ico.Mic/>, active: true },
                  { label: 'Qualification', sub: 'Motif, infos, type de demande', color: B.cyan+'18', tc: B.cyan, icon: <Ico.Filter/> },
                  { label: 'Traitement automatique', sub: 'RDV, FAQ, hors-horaires', color: B.lcyan+'18', tc: B.lcyan, icon: <Ico.Calendar/> },
                  { label: 'Résumé envoyé', sub: 'Votre équipe reçoit l\'essentiel', color: B.bgL, tc: B.tMain, icon: <Ico.Chart/> },
                ].map(({label,sub,color,tc,icon,active},i,arr)=>(
                  <React.Fragment key={label}>
                    <div style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px 16px',borderRadius:'12px',background:color,border:active?`1px solid ${B.blue}44`:'1px solid transparent',transition:'all 0.2s'}}>
                      <div style={{width:'34px',height:'34px',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,background:active?B.grad:B.bgL,color:active?'white':tc,boxShadow:active?'0 4px 14px rgba(30,115,216,0.35)':'none'}}>
                        {icon}
                      </div>
                      <div>
                        <p style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:active?B.tMain:B.tMain,margin:'0 0 2px'}}>{label}</p>
                        <p style={{fontFamily:'Inter,sans-serif',fontSize:'11px',color:B.tMuted,margin:0}}>{sub}</p>
                      </div>
                      {active && <div style={{marginLeft:'auto',padding:'3px 10px',borderRadius:'99px',background:B.grad,fontSize:'10px',fontWeight:700,color:'white',fontFamily:'JetBrains Mono,monospace',flexShrink:0}}>IA</div>}
                    </div>
                    {i < arr.length-1 && <div style={{width:'2px',height:'16px',background:`linear-gradient(${B.border},${B.blue}44)`,margin:'0 auto'}}/>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
window.Solution = Solution;
