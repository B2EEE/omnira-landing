// ─── SCENARIOS ────────────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    tab: 'Appel en atelier',
    context: "Il est 10h30, l'atelier est en pleine révision. Le téléphone sonne.",
    steps: [
      { who: 'client', text: "Bonjour, je voudrais un devis pour un changement de freins sur une Clio 4." },
      { who: 'agent',  text: "Bonjour ! Je note votre demande. Votre Clio est de quelle année et quel motorisation ?" },
      { who: 'client', text: "2018, essence 1.2." },
      { who: 'agent',  text: "Noté. Je transmets la demande à l'équipe avec vos informations. Vous serez rappelé dans la journée. Bonne journée !" },
    ],
    result: 'Devis transmis · Technicien non dérangé',
    color: B.blue,
  },
  {
    tab: 'Hors horaires',
    context: "Il est 20h15, le garage est fermé. Un client appelle pour un rendez-vous.",
    steps: [
      { who: 'client', text: "Bonsoir, je voudrais prendre rendez-vous pour une vidange demain matin si possible." },
      { who: 'agent',  text: "Bonsoir ! Nous avons un créneau demain à 9h ou à 11h. Lequel vous convient ?" },
      { who: 'client', text: "9h, c'est parfait." },
      { who: 'agent',  text: "RDV confirmé demain à 9h. Votre nom et numéro pour la fiche ?" },
    ],
    result: 'RDV pris à 20h15 · Agenda mis à jour',
    color: B.cyan,
  },
  {
    tab: 'Question répétitive',
    context: "Un client appelle pour connaître les horaires du garage.",
    steps: [
      { who: 'client', text: "Bonjour, vous êtes ouverts le samedi ?" },
      { who: 'agent',  text: "Bonjour ! Le garage est ouvert du lundi au vendredi de 8h à 18h30, et le samedi de 9h à 13h." },
      { who: 'client', text: "Très bien, merci !" },
      { who: 'agent',  text: "Avec plaisir. N'hésitez pas à rappeler si vous souhaitez prendre rendez-vous. Bonne journée !" },
    ],
    result: 'Demande traitée · Équipe non interrompue',
    color: B.lcyan,
  },
];

function Scenarios() {
  const [active, setActive] = React.useState(0);
  const sc = SCENARIOS[active];

  return (
    <section style={{padding:'96px 24px',background:B.bgW}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Cas d'usage"
            chipColor={B.blue}
            title="Omnira en situation réelle."
            sub="Trois appels typiques d'un garage indépendant. Dans chaque cas, votre équipe n'a rien eu à faire — et le client a eu une réponse immédiate."
          />
        </FadeIn>
        {/* Tabs */}
        <FadeIn delay={0.05}>
          <div style={{display:'flex',gap:'8px',marginBottom:'32px',justifyContent:'center',flexWrap:'wrap'}}>
            {SCENARIOS.map((s,i)=>(
              <button key={s.tab} onClick={()=>setActive(i)}
                style={{padding:'10px 22px',borderRadius:'99px',fontSize:'13px',fontWeight:700,fontFamily:'Sora,sans-serif',border:'none',cursor:'pointer',transition:'all 0.18s ease',
                  background: active===i ? B.grad : B.bgL,
                  color: active===i ? 'white' : B.tMuted,
                  boxShadow: active===i ? '0 6px 20px rgba(30,115,216,0.3)' : 'none',
                }}>
                {s.tab}
              </button>
            ))}
          </div>
        </FadeIn>
        {/* Scenario card */}
        <FadeIn delay={0.1}>
          <div style={{borderRadius:'24px',overflow:'hidden',border:`1px solid ${B.border}`,boxShadow:'0 20px 60px rgba(16,63,115,0.09)'}}>
            {/* Header */}
            <div style={{padding:'20px 28px',background:B.bgD,display:'flex',alignItems:'center',gap:'14px'}}>
              <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#ef4444'}}/>
              <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#f59e0b'}}/>
              <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#22c55e'}}/>
              <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:'rgba(255,255,255,0.28)',marginLeft:'8px'}}>Agent Omnira · {sc.tab}</span>
            </div>
            <div style={{padding:'32px 28px',background:B.bgW}}>
              {/* Context */}
              <div style={{padding:'14px 18px',borderRadius:'12px',background:B.bgL,border:`1px solid ${B.border}`,marginBottom:'28px'}}>
                <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:B.tMuted}}>Contexte · </span>
                <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMain}}>{sc.context}</span>
              </div>
              {/* Conversation */}
              <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'24px'}}>
                {sc.steps.map(({who,text},i)=>{
                  const isAgent = who==='agent';
                  return (
                    <div key={i} style={{display:'flex',gap:'10px',flexDirection:isAgent?'row-reverse':'row'}}>
                      <div style={{width:'28px',height:'28px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'10px',fontWeight:700,background:isAgent?B.grad:B.bgL,color:isAgent?'white':B.tMuted,boxShadow:isAgent?'0 2px 8px rgba(30,115,216,0.3)':'none'}}>
                        {isAgent?'AI':'C'}
                      </div>
                      <div style={{maxWidth:'70%',padding:'11px 15px',borderRadius:'14px',fontSize:'13px',lineHeight:1.6,fontFamily:'Inter,sans-serif',background:isAgent?`rgba(30,115,216,0.07)`:B.bgL,border:isAgent?`1px solid rgba(30,115,216,0.14)`:`1px solid ${B.border}`,color:B.tMain}}>
                        {text}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Result badge */}
              <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'14px 18px',borderRadius:'12px',background:`${sc.color}0e`,border:`1px solid ${sc.color}28`}}>
                <div style={{width:'22px',height:'22px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:`${sc.color}20`,color:sc.color,flexShrink:0}}><Ico.Check/></div>
                <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'12px',fontWeight:600,color:sc.color}}>{sc.result}</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.Scenarios = Scenarios;

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
const STEPS = [
  { num:'01', title:'Audit & configuration', tag:'15 min', desc:"On fait le point ensemble sur vos flux d'appels, votre planning, vos services. L'agent est configuré selon vos règles. Opérationnel le jour même.", Icon: Ico.Filter },
  { num:'02', title:"L'agent traite les appels", tag:'IA conversationnelle', desc:"Dès qu'un client appelle, l'agent décroche, comprend la demande, répond aux questions simples et prend un rendez-vous si nécessaire. Votre équipe n'est pas dérangée.", Icon: Ico.Mic },
  { num:'03', title:"Votre équipe reçoit l'utile", tag:'Transmission guidée', desc:"Les cas qui méritent votre attention arrivent avec un résumé clair : motif, coordonnées, action à faire. Rien d'autre. Jamais de bruit inutile.", Icon: Ico.Chart },
];

function HowItWorks() {
  return (
    <section id="process" style={{padding:'96px 24px',background:B.bgL}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Mise en place"
            chipColor={B.blue}
            title="Opérationnel en 15 minutes.<br/>Des résultats dès le premier appel."
            sub="Pas de formation, pas de migration, pas de prérequis technique. On configure tout ensemble — vous repartez avec un agent actif le jour même."
          />
        </FadeIn>
        <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          {STEPS.map(({num,title,tag,desc,Icon},i)=>(
            <FadeIn key={num} delay={i*0.1}>
              <div style={{display:'grid',gridTemplateColumns:'80px 1fr',gap:'24px',padding:'32px',borderRadius:'20px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow,transition:'all 0.22s',position:'relative',overflow:'hidden'}}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 16px 48px rgba(16,63,115,0.12)';e.currentTarget.style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.transform='translateY(0)';}}>
                {i===1 && <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:B.grad}}/>}
                <div style={{display:'flex',justifyContent:'center',paddingTop:'2px'}}>
                  <div style={{width:'52px',height:'52px',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,position:'relative',overflow:'hidden',
                    background: i===1 ? B.grad : `rgba(30,115,216,0.07)`,
                    border: i===1 ? 'none' : '1.5px solid rgba(30,115,216,0.18)',
                    boxShadow: i===1 ? '0 8px 24px rgba(30,115,216,0.32)' : 'none',
                    color: i===1 ? 'white' : B.blue,
                  }}>
                    {i===1 && <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(255,255,255,0.18) 0%,transparent 55%)'}}/>}
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'12px',fontWeight:700,position:'relative'}}>{num}</span>
                  </div>
                </div>
                <div>
                  <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'12px',marginBottom:'10px'}}>
                    <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'16px',fontWeight:700,color:B.tMain,margin:0}}>{title}</h3>
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',padding:'4px 12px',borderRadius:'99px',fontWeight:600,background:`rgba(47,199,214,0.1)`,color:B.cyan,border:`1px solid rgba(47,199,214,0.22)`}}>{tag}</span>
                  </div>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:B.tMuted,lineHeight:1.7,margin:0}}>{desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:'48px'}}>
          <GBtn href="#contact" variant="primary" size="lg">Démarrer la configuration</GBtn>
        </div>
      </div>
    </section>
  );
}
window.HowItWorks = HowItWorks;
