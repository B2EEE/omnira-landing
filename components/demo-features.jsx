// ─── TRANSCRIPT DATA ──────────────────────────────────────────────────────────
const TRANSCRIPT = [
  { role:'client', text:"Bonjour, j'aurais voulu savoir si vous faites les vidanges sur Peugeot 308 ?" },
  { role:'agent',  text:"Bonjour ! Tout à fait, nous réalisons les vidanges sur Peugeot 308. Votre véhicule est diesel ou essence ?" },
  { role:'client', text:"Diesel, le 1.6 HDi." },
  { role:'agent',  text:"Parfait — huile 5W-30 longlife, environ 45 minutes de prestation. Souhaitez-vous prendre rendez-vous ?" },
  { role:'client', text:"Oui, vous auriez quelque chose cette semaine ?" },
  { role:'agent',  text:"Nous avons jeudi à 10h ou vendredi à 14h30. Laquelle vous convient ?" },
  { role:'client', text:"Jeudi 10h, c'est parfait !" },
  { role:'agent',  text:"Noté. RDV confirmé jeudi à 10h pour la vidange de votre 308 HDi. Votre nom pour finaliser ?" },
];

// ─── DEMO SECTION ─────────────────────────────────────────────────────────────
function Demo() {
  const [playing, setPlaying] = React.useState(false);
  const [shown, setShown]     = React.useState(0);
  const timerRef = React.useRef(null);

  const start = () => {
    if (playing) { clearInterval(timerRef.current); setPlaying(false); return; }
    setShown(0); setPlaying(true);
    let idx = 0;
    timerRef.current = setInterval(() => {
      idx++;
      if (idx >= TRANSCRIPT.length) { clearInterval(timerRef.current); setPlaying(false); return; }
      setShown(idx);
    }, 1600);
  };
  React.useEffect(() => () => clearInterval(timerRef.current), []);

  const bars = [4,7,11,15,12,9,14,8,12,6,13,10,7,11,5,8,14,9];

  return (
    <section id="demo" style={{padding:'96px 24px',background:B.bgW}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Démo interactive"
            chipColor={B.blue}
            title="Écoutez votre futur agent<br/>en action."
            sub="Un aperçu réel de ce que vos clients entendent dès qu'ils appellent. Naturel, fluide — et votre équipe n'a rien eu à faire."
          />
          <FadeIn delay={0.04}>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'12px',marginBottom:'40px',marginTop:'-8px'}}>
              {[
                { text:'Appel capté immédiatement', color: B.blue },
                { text:'Demande qualifiée sans effort', color: B.cyan },
                { text:'Atelier non interrompu', color: B.lcyan },
              ].map(({text,color})=>(
                <div key={text} style={{display:'flex',alignItems:'center',gap:'8px',padding:'7px 16px',borderRadius:'99px',background:`${color}0e`,border:`1px solid ${color}28`}}>
                  <div style={{width:'6px',height:'6px',borderRadius:'50%',background:color,flexShrink:0}}/>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',fontWeight:600,color}}>{text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'start'}} className="demo-grid">
          {/* Player */}
          <FadeIn>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <div style={{position:'relative',marginBottom:'32px'}}>
                {playing && <>
                  <div style={{position:'absolute',inset:0,borderRadius:'50%',background:'rgba(30,115,216,0.14)',animation:'pulseRing 2s ease-out infinite'}}/>
                  <div style={{position:'absolute',inset:0,borderRadius:'50%',background:'rgba(47,199,214,0.08)',animation:'pulseRing 2s ease-out infinite 0.65s'}}/>
                </>}
                <button onClick={start} style={{position:'relative',width:'112px',height:'112px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:B.grad,boxShadow:playing?'0 16px 48px rgba(30,115,216,0.5)':'0 12px 36px rgba(30,115,216,0.38)',border:'none',cursor:'pointer',transition:'all 0.2s ease',overflow:'hidden'}}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(255,255,255,0.18) 0%,transparent 55%)'}}/>
                  {playing
                    ? <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{position:'relative'}}><rect x="6" y="5" width="4" height="14" rx="1.5"/><rect x="14" y="5" width="4" height="14" rx="1.5"/></svg>
                    : <svg width="26" height="26" viewBox="0 0 24 24" fill="white" style={{position:'relative',marginLeft:'3px'}}><path d="M5 3l14 9-14 9V3z"/></svg>
                  }
                </button>
              </div>
              <p style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:600,color:B.tMain,marginBottom:'6px'}}>
                {playing ? 'Lecture en cours…' : shown === TRANSCRIPT.length-1 ? 'Conversation terminée' : 'Lancer la démo'}
              </p>
              <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:B.tMuted,marginBottom:'28px'}}>Scénario : demande de vidange</p>
              {/* Waveform */}
              <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:'3px',height:'48px',padding:'0 16px',borderRadius:'16px',marginBottom:'16px',background:B.bgL,border:`1px solid ${B.border}`}}>
                {bars.map((h,i)=>(
                  <div key={i} style={{width:'3px',borderRadius:'99px',transition:'height 0.2s',height:playing?`${h*1.9}px`:'4px',background:B.grad,animation:playing?`barwave ${0.5+i*0.055}s ease-in-out infinite`:'none',animationDelay:`${i*0.04}s`,transformOrigin:'center'}}/>
                ))}
              </div>
              {/* Progress */}
              <div style={{width:'100%',height:'4px',borderRadius:'99px',background:B.border,marginBottom:'32px'}}>
                <div style={{height:'100%',borderRadius:'99px',background:B.grad,transition:'width 0.4s',width:TRANSCRIPT.length>0?`${(shown/(TRANSCRIPT.length-1))*100}%`:'0%'}}/>
              </div>
              <GBtn href="#contact" variant="primary" size="md" full>
                Tester dans mon garage
              </GBtn>
            </div>
          </FadeIn>
          {/* Transcript */}
          <FadeIn delay={0.1}>
            <div style={{borderRadius:'20px',padding:'24px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow,position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:`linear-gradient(90deg,transparent,rgba(30,115,216,0.18),transparent)`}}/>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',paddingBottom:'16px',borderBottom:`1px solid ${B.border}`}}>
                <div style={{width:'30px',height:'30px',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',background:B.grad,boxShadow:'0 2px 8px rgba(30,115,216,0.35)',color:'white'}}><Ico.Phone/></div>
                <div>
                  <p style={{fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,color:B.tMain,margin:0}}>Appel entrant simulé</p>
                  <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:B.tMuted,margin:0}}>Vidange Peugeot 308 HDi · scénario réel</p>
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'12px',minHeight:'320px'}}>
                {TRANSCRIPT.slice(0, shown+1).map(({role,text},i)=>{
                  const isAgent = role==='agent';
                  return (
                    <div key={i} style={{display:'flex',gap:'10px',flexDirection:isAgent?'row-reverse':'row',animation:'slideIn 0.3s ease'}}>
                      <div style={{width:'26px',height:'26px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'10px',fontWeight:700,marginTop:'2px',background:isAgent?B.grad:B.bgL,color:isAgent?'white':B.tMuted,boxShadow:isAgent?'0 2px 6px rgba(30,115,216,0.3)':'none'}}>
                        {isAgent?'AI':'C'}
                      </div>
                      <div style={{maxWidth:'76%',padding:'10px 14px',borderRadius:'12px',fontSize:'12px',lineHeight:1.6,fontFamily:'Inter,sans-serif',background:isAgent?'rgba(30,115,216,0.07)':B.bgL,border:isAgent?`1px solid rgba(30,115,216,0.14)`:`1px solid ${B.border}`,color:B.tMain}}>
                        {text}
                      </div>
                    </div>
                  );
                })}
              </div>
              {shown >= TRANSCRIPT.length-1 && (
                <div style={{marginTop:'16px',paddingTop:'14px',borderTop:`1px solid ${B.border}`,display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:'20px',height:'20px',borderRadius:'50%',background:`rgba(47,199,214,0.12)`,display:'flex',alignItems:'center',justifyContent:'center',color:B.cyan}}><Ico.Check/></div>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',fontWeight:600,color:B.cyan}}>RDV confirmé · Résumé transmis à l'équipe</span>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
        {/* Ce que votre équipe reçoit */}
        <FadeIn delay={0.15}>
          <div style={{marginTop:'48px',padding:'32px',borderRadius:'20px',background:B.bgL,border:`1px solid ${B.border}`,boxShadow:B.shadow}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px',paddingBottom:'20px',borderBottom:`1px solid ${B.border}`}}>
              <div style={{width:'36px',height:'36px',borderRadius:'11px',display:'flex',alignItems:'center',justifyContent:'center',background:B.grad,color:'white',flexShrink:0,boxShadow:'0 4px 14px rgba(30,115,216,0.35)'}}><Ico.Chart/></div>
              <div>
                <p style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:B.tMain,margin:'0 0 2px'}}>Ce que votre équipe reçoit après chaque appel</p>
                <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:B.tMuted,margin:0}}>Résumé structuré · transmis en temps réel · aucune saisie manuelle</p>
              </div>
              <div style={{marginLeft:'auto',padding:'4px 12px',borderRadius:'99px',background:'rgba(47,199,214,0.1)',border:'1px solid rgba(47,199,214,0.22)',fontFamily:'JetBrains Mono,monospace',fontSize:'10px',fontWeight:600,color:B.cyan,flexShrink:0}}>Automatique</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px'}} className="summary-grid">
              {[
                { label:'Client', value:'Jean D. — 06 12 34 56 78', Icon: Ico.Phone, color: B.blue },
                { label:'Motif', value:'Vidange — Peugeot 308 HDi 1.6', Icon: Ico.Filter, color: B.blue },
                { label:'RDV confirmé', value:'Jeudi à 10h00', Icon: Ico.Calendar, color: B.cyan },
                { label:'Urgence', value:'Faible — pas de panne déclarée', Icon: Ico.Zap, color: B.lcyan },
                { label:'Action requise', value:'Aucune — traité automatiquement', Icon: Ico.Check, color: B.cyan },
                { label:'Résumé', value:'RDV pris, agenda mis à jour, client informé', Icon: Ico.Chart, color: B.blue },
              ].map(({label,value,Icon,color})=>(
                <div key={label} style={{padding:'14px 16px',borderRadius:'12px',background:B.bgW,border:`1px solid ${B.border}`}}>
                  <div style={{display:'flex',alignItems:'center',gap:'7px',marginBottom:'7px'}}>
                    <div style={{color,opacity:0.7,flexShrink:0}}><Icon/></div>
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:B.tMuted,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em'}}>{label}</span>
                  </div>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:B.tMain,margin:0,lineHeight:1.5,fontWeight:500}}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.Demo = Demo;

// ─── FEATURES GRID ────────────────────────────────────────────────────────────
const FEATURES = [
  { Icon: Ico.Phone,    title: 'Décroché 24h/24',             desc: "L'agent répond immédiatement, même hors horaires. Aucun appel ne sonne dans le vide — jamais." },
  { Icon: Ico.Filter,   title: 'Qualification de la demande', desc: "Comprend le motif de l'appel, pose les bonnes questions, collecte les informations utiles dès le premier contact." },
  { Icon: Ico.Zap,      title: 'Filtrage du répétitif',       desc: "Horaires, tarifs, disponibilités — traités automatiquement, sans interrompre votre équipe une seule fois." },
  { Icon: Ico.Calendar, title: 'Prise de rendez-vous',        desc: "Propose et confirme des créneaux selon vos disponibilités réelles. Votre agenda se remplit sans friction." },
  { Icon: Ico.Chart,    title: 'Résumés & tableau de bord',   desc: "Chaque appel important arrive avec un résumé structuré. Votre équipe sait exactement quoi faire." },
  { Icon: Ico.Link,     title: 'Intégrations simples',        desc: "Google Calendar, CRM, Google Sheets. Onboarding guidé inclus — aucune compétence technique requise." },
];

function Features() {
  return (
    <section style={{padding:'96px 24px',background:B.bgL}}>
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Fonctionnalités"
            chipColor={B.blue}
            title="Une surcouche utile,<br/>pas une révolution à gérer."
            sub="Omnira s'installe en 15 minutes et s'adapte à votre façon de travailler. Votre équipe n'a rien à changer."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px'}} className="feat-grid">
          {FEATURES.map(({Icon,title,desc},i)=>(
            <FadeIn key={title} delay={i*0.06}>
              <div style={{padding:'28px',borderRadius:'20px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow,transition:'all 0.22s ease',cursor:'default',position:'relative',overflow:'hidden'}}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 20px 48px rgba(30,115,216,0.12),0 0 0 1px rgba(30,115,216,0.2)`;e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.querySelector('.feat-line').style.opacity='1';}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.transform='translateY(0)';e.currentTarget.querySelector('.feat-line').style.opacity='0';}}>
                <div className="feat-line" style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:B.grad,opacity:0,transition:'opacity 0.2s'}}/>
                <div style={{width:'44px',height:'44px',borderRadius:'13px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'18px',background:B.bgL,border:`1px solid ${B.border}`,color:B.blue}}>
                  <Icon/>
                </div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:B.tMain,marginBottom:'10px'}}>{title}</h3>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMuted,lineHeight:1.65}}>{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Features = Features;
