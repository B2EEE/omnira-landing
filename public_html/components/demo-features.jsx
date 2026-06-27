// ─── DEMO (4 cards with placeholder audio) ────────────────────────────────────
const DEMO_CARDS = [
  {
    id: 'garage',
    Icon: Ico.Car,
    title: 'Démo garage',
    context: 'Prise de rendez-vous pour une vidange ou une panne',
    color: B.blue,
    duration: '0:48',
  },
  {
    id: 'restaurant',
    Icon: Ico.Utensils,
    title: 'Démo restaurant',
    context: 'Réservation pour plusieurs personnes un samedi soir',
    color: B.cyan,
    duration: '0:35',
  },
  {
    id: 'artisan',
    Icon: Ico.Wrench,
    title: 'Démo artisan',
    context: 'Demande de devis pour une intervention à domicile',
    color: B.lcyan,
    duration: '0:52',
  },
  {
    id: 'urgence',
    Icon: Ico.Zap,
    title: 'Démo urgence',
    context: 'Appel sensible transféré à un humain avec contexte',
    color: '#f59e0b',
    duration: '0:41',
  },
];

function DemoCard({ card }) {
  const [playing, setPlaying] = React.useState(false);
  const bars = [4,7,11,15,12,9,14,8,12,6,13,10,7,11];
  return (
    <div style={{borderRadius:'20px',padding:'24px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow,transition:'all 0.22s ease',position:'relative',overflow:'hidden'}}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 16px 40px rgba(16,63,115,0.12),0 0 0 1px rgba(30,115,216,0.18)`;e.currentTarget.style.transform='translateY(-3px)';}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.transform='translateY(0)';}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:`linear-gradient(90deg,${card.color},transparent)`,opacity:0.6}}/>
      {/* Header */}
      <div style={{display:'flex',alignItems:'flex-start',gap:'12px',marginBottom:'16px'}}>
        <div style={{width:'38px',height:'38px',borderRadius:'11px',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:`${card.color}14`,border:`1px solid ${card.color}28`,color:card.color}}>
          <card.Icon/>
        </div>
        <div>
          <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:B.tMain,margin:'0 0 4px'}}>{card.title}</h3>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:B.tMuted,margin:0,lineHeight:1.5}}>{card.context}</p>
        </div>
      </div>
      {/* Waveform placeholder */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'3px',height:'40px',padding:'0 12px',borderRadius:'12px',marginBottom:'14px',background:B.bgL,border:`1px solid ${B.border}`}}>
        {bars.map((h,i)=>(
          <div key={i} style={{width:'3px',borderRadius:'99px',height:playing?`${h*1.8}px`:'4px',background:`linear-gradient(${card.color},${card.color}66)`,animation:playing?`barwave ${0.5+i*0.06}s ease-in-out infinite`:'none',animationDelay:`${i*0.04}s`,transformOrigin:'center',transition:'height 0.3s'}}/>
        ))}
      </div>
      {/* Duration + play */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:B.tMuted}}>Durée : {card.duration}</span>
        <button onClick={()=>setPlaying(p=>!p)} style={{display:'flex',alignItems:'center',gap:'7px',padding:'9px 18px',borderRadius:'99px',border:'none',cursor:'pointer',fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,transition:'all 0.18s',background:playing?`${card.color}18`:`linear-gradient(135deg,${card.color},${card.color}cc)`,color:playing?card.color:'white',boxShadow:playing?'none':`0 4px 14px ${card.color}44`}}
          onMouseEnter={e=>{if(!playing)e.currentTarget.style.transform='translateY(-1px)';}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';}}>
          {playing ? (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1" width="3" height="10" rx="1"/><rect x="7" y="1" width="3" height="10" rx="1"/></svg>
              Pause
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 1.5l9 4.5-9 4.5V1.5z"/></svg>
              Écouter la démo
            </>
          )}
        </button>
      </div>
      {/* Clean state — no audio file yet */}
      <div style={{marginTop:'12px',padding:'10px 14px',borderRadius:'10px',background:`${card.color}08`,border:`1px solid ${card.color}18`}}>
        <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:B.tMuted,margin:0,lineHeight:1.5}}>
          Démo personnalisée disponible sur demande — choisissez votre activité et nous préparons un scénario adapté.
        </p>
      </div>
    </div>
  );
}

function Demo() {
  return (
    <section id="demo" style={{padding:'96px 24px',background:B.bgW}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Démo"
            chipColor={B.blue}
            title="Écoutez Omnira en situation réelle"
            sub="Quatre scénarios par secteur d'activité. Chaque démo illustre comment l'agent gère un appel de A à Z."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'40px'}} className="solution-grid">
          {DEMO_CARDS.map((card,i)=>(
            <FadeIn key={card.id} delay={i*0.08}>
              <DemoCard card={card}/>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.25}>
          <div style={{textAlign:'center'}}>
            <GBtn href="/prendre-rendez-vous" variant="primary" size="md">Créer une démo pour mon activité</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.Demo = Demo;

// ─── CALL SUMMARY (visual mock) ───────────────────────────────────────────────
function CallSummary() {
  const fields = [
    { label:'Nom',              value:'Julien Martin',                  Icon: Ico.Users,    color: B.blue },
    { label:'Téléphone',        value:'06 XX XX XX XX',                  Icon: Ico.Phone,    color: B.blue },
    { label:'Motif',            value:'Demande de devis',                Icon: Ico.Filter,   color: B.cyan },
    { label:'Urgence',          value:'Moyenne',                         Icon: Ico.Zap,      color: '#f59e0b' },
    { label:'Action recommandée', value:'Rappeler aujourd\'hui',         Icon: Ico.Clock,    color: B.lcyan },
    { label:'Statut',           value:'À traiter',                       Icon: Ico.Chart,    color: B.cyan },
  ];

  return (
    <section style={{padding:'96px 24px',background:B.bgL}}>
      <div style={{maxWidth:'860px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Résumé d'appel"
            chipColor={B.blue}
            title="Chaque appel devient une information exploitable"
            sub=""
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <div style={{borderRadius:'24px',overflow:'hidden',border:`1px solid ${B.border}`,boxShadow:'0 24px 64px rgba(16,63,115,0.1)'}}>
            {/* Header */}
            <div style={{padding:'18px 28px',background:B.bgD,display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <div style={{width:'32px',height:'32px',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',background:B.grad,color:'white',flexShrink:0,boxShadow:'0 4px 14px rgba(30,115,216,0.35)'}}><Ico.Chart/></div>
                <div>
                  <p style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:'white',margin:'0 0 2px'}}>Résumé d'appel automatique</p>
                  <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'rgba(255,255,255,0.32)',margin:0}}>Généré après l'appel · aucune saisie manuelle</p>
                </div>
              </div>
              <div style={{padding:'4px 12px',borderRadius:'99px',background:'rgba(47,199,214,0.12)',border:'1px solid rgba(47,199,214,0.25)',fontFamily:'JetBrains Mono,monospace',fontSize:'10px',fontWeight:600,color:B.cyan,flexShrink:0}}>Automatique</div>
            </div>

            {/* Fields grid */}
            <div style={{padding:'24px 28px',background:B.bgW}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px',marginBottom:'20px'}} className="summary-grid">
                {fields.map(({label,value,Icon,color})=>(
                  <div key={label} style={{padding:'14px 16px',borderRadius:'14px',background:B.bgL,border:`1px solid ${B.border}`}}>
                    <div style={{display:'flex',alignItems:'center',gap:'7px',marginBottom:'7px'}}>
                      <div style={{color,opacity:0.75,flexShrink:0}}><Icon/></div>
                      <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:B.tMuted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em'}}>{label}</span>
                    </div>
                    <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMain,margin:0,lineHeight:1.4,fontWeight:600}}>{value}</p>
                  </div>
                ))}
              </div>
              {/* Résumé texte */}
              <div style={{padding:'16px 20px',borderRadius:'14px',background:B.bgL,border:`1px solid ${B.border}`}}>
                <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:B.tMuted,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'8px'}}>Résumé</p>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:B.tMain,lineHeight:1.65,margin:0}}>Le client souhaite recevoir une estimation pour une prestation à domicile et être recontacté dans la journée. Il est disponible en matinée.</p>
              </div>
            </div>

            {/* Footer note */}
            <div style={{padding:'14px 28px',background:B.bgL,borderTop:`1px solid ${B.border}`,display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{width:'20px',height:'20px',borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(47,199,214,0.12)',color:B.cyan}}><Ico.Check/></div>
              <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:B.tMuted}}>Exemple illustratif — aucun vrai client</span>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{marginTop:'28px',padding:'20px 28px',borderRadius:'16px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow,textAlign:'center'}}>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'15px',color:B.tMain,lineHeight:1.7,margin:0}}>
              <strong>Votre équipe ne reçoit plus seulement "un message à rappeler"</strong>, mais un résumé clair, structuré et exploitable.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.CallSummary = CallSummary;
