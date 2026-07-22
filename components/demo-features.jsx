// ─── DEMO (4 cards with real audio) ────────────────────────────────────────────
const DEMO_CARDS = [
  {
    id: 'garage',
    Icon: Ico.Car,
    title: 'Démo garage',
    context: 'Prise de rendez-vous pour une vidange ou une panne',
    color: B.blue,
    src: '/uploads/demos/garage.mp3',
    transcript: [
      { sp: 'Agent', t: 'Bonjour, Garage Martin, je suis votre assistant vocal Omnira. Comment puis-je vous aider ?' },
      { sp: 'Client', t: 'Bonjour, je voudrais prendre rendez-vous pour une vidange. C\'est une Renault Clio diesel.' },
      { sp: 'Agent', t: 'Pas de problème. Vous êtes disponible quand cette semaine ?' },
      { sp: 'Client', t: 'Jeudi ou vendredi matin si possible.' },
      { sp: 'Agent', t: 'Je vous propose jeudi à 9h pour la vidange. C\'est à quel nom ?' },
      { sp: 'Client', t: 'Dubois, Thomas Dubois.' },
      { sp: 'Agent', t: 'Parfait. Rendez-vous jeudi à 9h au nom de Thomas Dubois pour une vidange Clio diesel. Vous recevrez une confirmation par SMS. À jeudi !' },
    ],
  },
  {
    id: 'restaurant',
    Icon: Ico.Utensils,
    title: 'Démo restaurant',
    context: 'Réservation pour plusieurs personnes un samedi soir',
    color: B.cyan,
    src: '/uploads/demos/restaurant.mp3',
    transcript: [
      { sp: 'Agent', t: 'Bonsoir, Restaurant Le Provençal, votre assistant vocal. Comment puis-je vous aider ?' },
      { sp: 'Client', t: 'Bonsoir, je voudrais réserver une table pour samedi soir, pour cinq personnes.' },
      { sp: 'Agent', t: 'Bien sûr. À quelle heure souhaitez-vous dîner ?' },
      { sp: 'Client', t: 'Vers 20h si c\'est possible.' },
      { sp: 'Agent', t: 'J\'ai une table disponible à 20h pour cinq personnes samedi soir. C\'est à quel nom ?' },
      { sp: 'Client', t: 'Lecomte.' },
      { sp: 'Agent', t: 'Réservation confirmée : cinq personnes samedi à 20h au nom de Lecomte. Vous recevrez un SMS de confirmation. Bonne soirée !' },
    ],
  },
  {
    id: 'artisan',
    Icon: Ico.Wrench,
    title: 'Démo artisan',
    context: 'Demande de devis pour une intervention à domicile',
    color: B.lcyan,
    src: '/uploads/demos/artisan.mp3',
    transcript: [
      { sp: 'Agent', t: 'Bonjour, Plomberie Lambert, votre assistant vocal Omnira. Comment puis-je vous aider ?' },
      { sp: 'Client', t: 'Bonjour, j\'aurais besoin d\'un devis pour la pose de carrelage dans ma cuisine, environ vingt mètres carrés.' },
      { sp: 'Agent', t: 'Très bien. Vous êtes disponible pour une visite technique cette semaine ?' },
      { sp: 'Client', t: 'Oui, je suis à Lyon, disponible mercredi après-midi.' },
      { sp: 'Agent', t: 'Je transmets votre demande de devis à l\'artisan : pose de carrelage à Lyon, vingt mètres carrés, visite mercredi après-midi. Il vous contacte dans la journée pour confirmer. Bonne journée !' },
    ],
  },
  {
    id: 'urgence',
    Icon: Ico.Zap,
    title: 'Démo urgence',
    context: 'Appel sensible transféré à un humain avec contexte',
    color: '#f59e0b',
    src: '/uploads/demos/urgence.mp3',
    transcript: [
      { sp: 'Agent', t: 'Bonjour, Cabinet médical Rousseau, votre assistant vocal. Comment puis-je vous aider ?' },
      { sp: 'Client', t: 'Bonjour, j\'ai besoin de parler à quelqu\'un rapidement, c\'est urgent. Mon père a des douleurs thoraciques depuis ce matin.' },
      { sp: 'Agent', t: 'Je comprends. Je transfère immédiatement votre appel à notre équipe avec le contexte complet. Restez en ligne, quelqu\'un vous répond dans les secondes qui suivent.' },
      { sp: 'Note', t: '[Transfert effectué avec résumé automatique : "Appel urgent — douleurs thoraciques, patient âgé, famille en ligne."]' },
    ],
  },
];

function fmtTime(s) {
  if (!isFinite(s) || isNaN(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

function DemoCard({ card, activeId, setActiveId }) {
  const audioRef  = React.useRef(null);
  const [progress, setProgress]   = React.useState(0);
  const [current,  setCurrent]    = React.useState(0);
  const [duration, setDuration]   = React.useState(0);

  const isPlaying = activeId === card.id;

  React.useEffect(() => {
    const audio = new Audio(card.src);
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onMeta    = () => setDuration(audio.duration);
    const onTime    = () => {
      setCurrent(audio.currentTime);
      if (audio.duration > 0) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnded   = () => { setActiveId(null); setCurrent(0); setProgress(0); audio.currentTime = 0; };

    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio.src = '';
    };
  }, [card.src]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.play().catch(() => {}); }
    else           { audio.pause(); }
  }, [isPlaying]);

  const toggle = () => setActiveId(isPlaying ? null : card.id);

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
  };

  const bars = [4,7,11,15,12,9,14,8,12,6,13,10,7,11];

  return (
    <div style={{borderRadius:'20px',padding:'24px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow,transition:'all 0.22s ease',position:'relative',overflow:'hidden'}}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 16px 40px rgba(16,63,115,0.12),0 0 0 1px rgba(30,115,216,0.18)`;e.currentTarget.style.transform='translateY(-3px)';}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.transform='translateY(0)';}}>

      {/* Color accent top bar */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:`linear-gradient(90deg,${card.color},transparent)`,opacity:isPlaying?1:0.6,transition:'opacity 0.3s'}}/>

      {/* Header */}
      <div style={{display:'flex',alignItems:'flex-start',gap:'12px',marginBottom:'16px'}}>
        <div style={{width:'38px',height:'38px',borderRadius:'11px',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:isPlaying?`${card.color}22`:`${card.color}14`,border:`1px solid ${isPlaying?card.color+'55':card.color+'28'}`,color:card.color,transition:'all 0.3s'}}>
          <card.Icon/>
        </div>
        <div>
          <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:B.tMain,margin:'0 0 4px'}}>{card.title}</h3>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:B.tMuted,margin:0,lineHeight:1.5}}>{card.context}</p>
        </div>
      </div>

      {/* Waveform + progress bar */}
      <div onClick={seek} role="slider" aria-label={`Progression ${card.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}
        style={{display:'flex',alignItems:'center',gap:'3px',height:'40px',padding:'0 12px',borderRadius:'12px',marginBottom:'14px',background:B.bgL,border:`1px solid ${isPlaying?card.color+'33':B.border}`,cursor:'pointer',position:'relative',transition:'border-color 0.3s'}}>
        {bars.map((h,i)=>(
          <div key={i} style={{width:'3px',borderRadius:'99px',height:isPlaying?`${h*1.8}px`:'4px',background:`linear-gradient(${card.color},${card.color}66)`,animation:isPlaying?`barwave ${0.5+i*0.06}s ease-in-out infinite`:'none',animationDelay:`${i*0.04}s`,transformOrigin:'center',transition:'height 0.3s',flexShrink:0}}/>
        ))}
        {/* Clickable progress line */}
        <div style={{position:'absolute',left:'12px',right:'12px',bottom:'6px',height:'2px',background:'rgba(0,0,0,0.07)',borderRadius:'99px'}}>
          <div style={{width:`${progress}%`,height:'100%',background:card.color,borderRadius:'99px',transition:'width 0.1s linear'}}/>
        </div>
      </div>

      {/* Time + play/pause button */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:B.tMuted}}>
          {fmtTime(current)} / {duration > 0 ? fmtTime(duration) : '—'}
        </span>
        <button
          onClick={toggle}
          aria-label={isPlaying ? `Mettre en pause : ${card.title}` : `Écouter : ${card.title}`}
          style={{display:'flex',alignItems:'center',gap:'7px',padding:'9px 18px',borderRadius:'99px',border:'none',cursor:'pointer',fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,transition:'all 0.18s',background:isPlaying?`${card.color}18`:`linear-gradient(135deg,${card.color},${card.color}cc)`,color:isPlaying?card.color:'white',boxShadow:isPlaying?'none':`0 4px 14px ${card.color}44`}}
          onMouseEnter={e=>{if(!isPlaying)e.currentTarget.style.transform='translateY(-1px)';}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';}}>
          {isPlaying ? (
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

      {/* Transcription (visible par Googlebot, masquée visuellement) */}
      {card.transcript && (
        <details style={{marginTop:'14px',borderTop:`1px solid ${B.border}`,paddingTop:'12px'}}>
          <summary style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:B.tMuted,textTransform:'uppercase',letterSpacing:'0.08em',cursor:'pointer',userSelect:'none',listStyle:'none',display:'flex',alignItems:'center',gap:'6px'}}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 3l4 4 4-4"/></svg>
            Transcription
          </summary>
          <div style={{marginTop:'10px',display:'flex',flexDirection:'column',gap:'6px'}}>
            {card.transcript.map((line, i) => (
              <p key={i} style={{margin:0,fontFamily:'Inter,sans-serif',fontSize:'11px',lineHeight:1.55,color: line.sp === 'Agent' ? B.tMain : B.tMuted}}>
                <strong style={{fontWeight:600,color:line.sp === 'Agent' ? card.color : B.tMuted}}>{line.sp} : </strong>{line.t}
              </p>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

function Demo() {
  const [activeId, setActiveId] = React.useState(null);
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
              <DemoCard card={card} activeId={activeId} setActiveId={setActiveId}/>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.25}>
          <div style={{textAlign:'center'}}>
            <GBtn onClick={() => window.openCalModal('decouverte')} variant="primary" size="md">Créer une démo pour mon activité</GBtn>
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
              <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:B.tMuted}}>Exemple illustratif · aucun vrai client</span>
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
