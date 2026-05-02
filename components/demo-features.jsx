// ─── TRANSCRIPT DATA ──────────────────────────────────────────────────────────
const TRANSCRIPT = [
  { role:'client', text:"Bonjour, c'est pour une vidange sur une Peugeot 308." },
  { role:'agent',  text:"Bonjour ! Bien sûr, je suis là pour vous aider. C'est une 308 essence ou diesel ?" },
  { role:'client', text:"Diesel, 1.6 HDi." },
  { role:'agent',  text:"Parfait ! Donc pour une 308 1.6 HDi, on prévoit une vidange avec huile 5W-30, environ 45 minutes. Vous souhaitez un rendez-vous cette semaine ?" },
  { role:'client', text:"Oui, si possible." },
  { role:'agent',  text:"Très bien ! On a jeudi à 10h ou vendredi à 14h30. Lequel vous arrange le mieux ?" },
  { role:'client', text:"Jeudi 10h, c'est bien." },
  { role:'agent',  text:"Noté ! Je vous réserve jeudi à 10h pour la vidange de votre Peugeot 308 HDi. Je peux avoir votre nom pour finaliser la fiche ?" },
  { role:'client', text:"Martin Dupont." },
  { role:'agent',  text:"Merci Monsieur Dupont. C'est confirmé pour jeudi à 10h. Un récapitulatif part à l'équipe. Bonne journée !" },
];

// ─── DEMO SECTION ─────────────────────────────────────────────────────────────
// Bruit de fond téléphonique généré via Web Audio API
function createPhoneAmbiance(ctx) {
  const bufferSize = 2 * ctx.sampleRate;
  const buf = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.018;
  const source = ctx.createBufferSource();
  source.buffer = buf;
  source.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1800;
  filter.Q.value = 0.6;
  const gain = ctx.createGain();
  gain.gain.value = 0.07;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  return { source, gain };
}

function Demo() {
  const [playing, setPlaying] = React.useState(false);
  const [shown, setShown]     = React.useState(0);
  const timerRef  = React.useRef(null);
  const audioRef  = React.useRef(null);
  const msgRef    = React.useRef(null);
  const audioCtx  = React.useRef(null);
  const ambiRef   = React.useRef(null);

  React.useEffect(() => {
    if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight;
  }, [shown]);

  const stopAll = () => {
    clearTimeout(timerRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }
    if (ambiRef.current) {
      try { ambiRef.current.source.stop(); } catch(e) {}
      ambiRef.current = null;
    }
  };

  const startAmbiance = () => {
    try {
      if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioCtx.current;
      if (ctx.state === 'suspended') ctx.resume();
      ambiRef.current = createPhoneAmbiance(ctx);
      ambiRef.current.source.start();
    } catch(e) {}
  };

  const playStep = (idx) => {
    if (idx >= TRANSCRIPT.length) { setPlaying(false); stopAll(); return; }
    setShown(idx);
    const line = TRANSCRIPT[idx];
    if (line.role === 'agent') {
      const agentNum = TRANSCRIPT.slice(0, idx + 1).filter(l => l.role === 'agent').length;
      const audio = new Audio(`uploads/demo-agent-${agentNum}.mp3`);
      audioRef.current = audio;
      audio.play().catch(() => {});
      audio.onended = () => { timerRef.current = setTimeout(() => playStep(idx + 1), 500); };
      audio.onerror = () => { timerRef.current = setTimeout(() => playStep(idx + 1), 1800); };
    } else {
      const delay = Math.max(1400, Math.min(line.text.length * 38, 3000));
      timerRef.current = setTimeout(() => playStep(idx + 1), delay);
    }
  };

  const start = () => {
    if (playing) { stopAll(); setPlaying(false); return; }
    stopAll(); setShown(0); setPlaying(true);
    startAmbiance();
    playStep(0);
  };

  React.useEffect(() => () => stopAll(), []);

  const bars = [3,6,10,14,11,8,13,7,11,5,12,9,6,10,4,7,13,8,5,11,8,14,10,6,12,7,9,5];
  const pct  = Math.round((shown / (TRANSCRIPT.length - 1)) * 100);

  return (
    <section id="demo" style={{padding:'96px 24px',background:B.bgD,position:'relative',overflow:'hidden'}}>
      {/* Tech grid */}
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(30,115,216,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(30,115,216,0.04) 1px,transparent 1px)',backgroundSize:'52px 52px',pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 75% 55% at 50% 50%,rgba(30,115,216,0.1),transparent 70%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)',pointerEvents:'none'}}/>

      <div style={{maxWidth:'1100px',margin:'0 auto',position:'relative',zIndex:1}}>
        <FadeIn>
          <SectionHeader light chip="Démo interactive" chipColor={B.blue}
            title="Écoutez votre futur agent<br/>en action."
            sub="Un aperçu réel de ce que vos clients entendent dès qu'ils appellent. Naturel, fluide et votre équipe n'a rien eu à faire."
          />
        </FadeIn>
        <FadeIn delay={0.04}>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'10px',marginBottom:'48px',marginTop:'-8px'}}>
            {[
              {text:'Appel capté immédiatement',color:B.blue},
              {text:'Demande qualifiée sans effort',color:B.cyan},
              {text:'Atelier non interrompu',color:B.lcyan},
            ].map(({text,color})=>(
              <div key={text} style={{display:'flex',alignItems:'center',gap:'7px',padding:'6px 14px',borderRadius:'99px',background:`${color}12`,border:`1px solid ${color}30`}}>
                <div style={{width:'5px',height:'5px',borderRadius:'50%',background:color,boxShadow:`0 0 6px ${color}`,flexShrink:0}}/>
                <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',fontWeight:600,color,letterSpacing:'0.04em'}}>{text}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',alignItems:'start'}} className="demo-grid">

          {/* ── LEFT: Player ── */}
          <FadeIn>
            <div style={{borderRadius:'24px',padding:'36px 30px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',backdropFilter:'blur(20px)',position:'relative',overflow:'hidden',boxShadow:'0 32px 80px rgba(0,0,0,0.35)'}}>
              <div style={{position:'absolute',top:0,left:'15%',right:'15%',height:'1px',background:'linear-gradient(90deg,transparent,rgba(30,115,216,0.8),rgba(47,199,214,0.6),transparent)'}}/>
              <div style={{position:'absolute',top:0,right:0,width:'160px',height:'160px',background:'radial-gradient(circle at top right,rgba(47,199,214,0.07),transparent 65%)',pointerEvents:'none'}}/>
              <div style={{position:'absolute',bottom:0,left:0,width:'120px',height:'120px',background:'radial-gradient(circle at bottom left,rgba(30,115,216,0.07),transparent 65%)',pointerEvents:'none'}}/>

              {/* Status row */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'32px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <span style={{position:'relative',display:'inline-flex',width:'8px',height:'8px'}}>
                    {playing && <span style={{position:'absolute',inset:0,borderRadius:'50%',background:'#4ade80',animation:'ping 1.5s ease-out infinite',opacity:0.75}}/>}
                    <span style={{width:'8px',height:'8px',borderRadius:'50%',background: playing ? '#4ade80' : 'rgba(255,255,255,0.2)',display:'inline-flex',transition:'background 0.3s'}}/>
                  </span>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',letterSpacing:'0.14em',color:'rgba(255,255,255,0.35)',textTransform:'uppercase'}}>Omnira Voice AI</span>
                </div>
                <div style={{padding:'3px 10px',borderRadius:'99px',background: playing ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.04)',border: playing ? '1px solid rgba(74,222,128,0.3)' : '1px solid rgba(255,255,255,0.08)',fontFamily:'JetBrains Mono,monospace',fontSize:'9px',fontWeight:700,color: playing ? '#4ade80' : 'rgba(255,255,255,0.25)',letterSpacing:'0.12em',textTransform:'uppercase',transition:'all 0.3s'}}>
                  {playing ? '● EN LIGNE' : '○ VEILLE'}
                </div>
              </div>

              {/* Play button */}
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'32px'}}>
                <div style={{position:'relative',marginBottom:'20px'}}>
                  {playing && [1,2,3].map(n=>(
                    <div key={n} style={{position:'absolute',inset:`${-n*14}px`,borderRadius:'50%',border:`1px solid rgba(30,115,216,${0.35/n})`,animation:`ringPulse ${2+n*0.45}s ease-in-out infinite`,animationDelay:`${n*0.28}s`}}/>
                  ))}
                  <button onClick={start} style={{position:'relative',width:'96px',height:'96px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#1E73D8,#2FC7D6)',border:'none',cursor:'pointer',transition:'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',overflow:'hidden',boxShadow: playing ? '0 0 0 3px rgba(30,115,216,0.25),0 16px 52px rgba(30,115,216,0.65)' : '0 0 0 1px rgba(30,115,216,0.35),0 12px 40px rgba(30,115,216,0.45)'}}
                    onMouseEnter={e=>e.currentTarget.style.transform='scale(1.09)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
                    <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(255,255,255,0.25) 0%,transparent 55%)',borderRadius:'50%'}}/>
                    <div style={{position:'absolute',inset:'3px',borderRadius:'50%',border:'1px solid rgba(255,255,255,0.18)'}}/>
                    <div style={{position:'absolute',top:0,left:'10%',right:'10%',height:'40%',background:'linear-gradient(to bottom,rgba(255,255,255,0.12),transparent)',borderRadius:'50% 50% 0 0'}}/>
                    {playing
                      ? <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{position:'relative'}}><rect x="6" y="5" width="4" height="14" rx="2"/><rect x="14" y="5" width="4" height="14" rx="2"/></svg>
                      : <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{position:'relative',marginLeft:'3px'}}><path d="M5 3l14 9-14 9V3z"/></svg>
                    }
                  </button>
                </div>
                <p style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:600,color:'rgba(255,255,255,0.75)',margin:'0 0 4px',letterSpacing:'-0.01em'}}>
                  {playing ? 'Lecture en cours…' : shown===TRANSCRIPT.length-1 ? 'Conversation terminée' : 'Lancer la démo'}
                </p>
                <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'rgba(255,255,255,0.22)',margin:'0 0 12px'}}>Scénario · vidange Peugeot 308 HDi</p>
                <div style={{display:'flex',alignItems:'center',gap:'6px',padding:'5px 12px',borderRadius:'99px',background:'rgba(47,199,214,0.07)',border:'1px solid rgba(47,199,214,0.18)'}}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={B.cyan} strokeWidth="2.2" strokeLinecap="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:B.cyan,letterSpacing:'0.06em'}}>Voix personnalisable · +500 voix réalistes disponibles</span>
                </div>
              </div>

              {/* Waveform */}
              <div style={{marginBottom:'14px',padding:'10px 16px',borderRadius:'14px',background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.05)',display:'flex',alignItems:'center',justifyContent:'center',gap:'2px',height:'52px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',left:0,top:0,bottom:0,width:'32px',background:'linear-gradient(90deg,rgba(0,0,0,0.5),transparent)',pointerEvents:'none'}}/>
                <div style={{position:'absolute',right:0,top:0,bottom:0,width:'32px',background:'linear-gradient(270deg,rgba(0,0,0,0.5),transparent)',pointerEvents:'none'}}/>
                {bars.map((h,i)=>(
                  <div key={i} style={{
                    width:'2px',borderRadius:'99px',flexShrink:0,transformOrigin:'center',
                    height: playing ? `${h*2}px` : '3px',
                    background: playing ? `linear-gradient(to top,${B.blue},${B.cyan})` : 'rgba(255,255,255,0.08)',
                    boxShadow: playing ? `0 0 5px ${B.cyan}50` : 'none',
                    animation: playing ? `barwave ${0.4+i*0.05}s ease-in-out infinite` : 'none',
                    animationDelay:`${i*0.03}s`,
                    transition:'height 0.3s ease, background 0.3s',
                  }}/>
                ))}
              </div>

              {/* Progress */}
              <div style={{marginBottom:'28px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'7px'}}>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'rgba(255,255,255,0.22)',letterSpacing:'0.1em'}}>PROGRESSION</span>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',fontWeight:700,color:B.cyan}}>{pct}%</span>
                </div>
                <div style={{height:'3px',borderRadius:'99px',background:'rgba(255,255,255,0.07)',overflow:'hidden',position:'relative'}}>
                  <div style={{position:'absolute',inset:0,background:'rgba(255,255,255,0.03)',borderRadius:'99px'}}/>
                  <div style={{height:'100%',borderRadius:'99px',background:`linear-gradient(90deg,${B.blue},${B.cyan})`,transition:'width 0.4s ease',width:`${pct}%`,boxShadow:`0 0 8px ${B.cyan}70`}}/>
                </div>
              </div>

              <GBtn href="#contact" variant="primary" size="md" full>Tester dans mon garage</GBtn>
            </div>
          </FadeIn>

          {/* ── RIGHT: Transcript terminal ── */}
          <FadeIn delay={0.1}>
            <div style={{borderRadius:'24px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)',boxShadow:'0 32px 80px rgba(0,0,0,0.45)',position:'relative'}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)',zIndex:2,pointerEvents:'none'}}/>

              {/* Terminal header */}
              <div style={{padding:'12px 18px',background:'rgba(255,255,255,0.025)',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:'8px',backdropFilter:'blur(8px)'}}>
                <div style={{display:'flex',gap:'6px'}}>
                  {['#ef4444','#f59e0b','#22c55e'].map((c,i)=>(
                    <div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c,boxShadow:`0 0 5px ${c}80`}}/>
                  ))}
                </div>
                <span style={{marginLeft:'8px',fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'rgba(255,255,255,0.22)',flex:1}}>omnira_agent · appel_entrant.log</span>
                <div style={{display:'flex',alignItems:'center',gap:'5px',padding:'2px 9px',borderRadius:'6px',background:'rgba(30,115,216,0.15)',border:'1px solid rgba(30,115,216,0.28)'}}>
                  <span style={{position:'relative',display:'inline-flex',width:'6px',height:'6px'}}>
                    <span style={{position:'absolute',inset:0,borderRadius:'50%',background:'#4ade80',animation:'ping 1.5s ease-out infinite',opacity:0.75}}/>
                    <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#4ade80',display:'inline-flex'}}/>
                  </span>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:B.cyan,fontWeight:700,letterSpacing:'0.08em'}}>LIVE</span>
                </div>
              </div>

              {/* Messages */}
              <div ref={msgRef} className="demo-msg-scroll" style={{padding:'20px',minHeight:'360px',maxHeight:'360px',overflowY:'auto',background:'#070F1C',display:'flex',flexDirection:'column',gap:'14px'}}>
                {TRANSCRIPT.slice(0, shown+1).map(({role,text},i)=>{
                  const isAgent = role==='agent';
                  const isLast  = i===shown;
                  return (
                    <div key={i} style={{display:'flex',gap:'10px',flexDirection:isAgent?'row-reverse':'row',animation:'slideIn 0.25s ease'}}>
                      <div style={{width:'28px',height:'28px',borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9px',fontWeight:700,marginTop:'1px',fontFamily:'JetBrains Mono,monospace',
                        background: isAgent ? 'linear-gradient(135deg,#1E73D8,#2FC7D6)' : 'rgba(255,255,255,0.06)',
                        color: isAgent ? 'white' : 'rgba(255,255,255,0.35)',
                        border: isAgent ? 'none' : '1px solid rgba(255,255,255,0.09)',
                        boxShadow: isAgent ? '0 2px 12px rgba(30,115,216,0.45),inset 0 1px 0 rgba(255,255,255,0.2)' : 'none',
                      }}>
                        {isAgent ? 'AI' : 'C'}
                      </div>
                      <div style={{
                        maxWidth:'78%',padding:'10px 14px',
                        borderRadius: isAgent ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
                        fontSize:'12px',lineHeight:1.65,fontFamily:'Inter,sans-serif',position:'relative',overflow:'hidden',
                        background: isAgent ? 'linear-gradient(135deg,rgba(30,115,216,0.2),rgba(47,199,214,0.08))' : 'rgba(255,255,255,0.04)',
                        border: isAgent ? '1px solid rgba(30,115,216,0.28)' : '1px solid rgba(255,255,255,0.07)',
                        color: isAgent ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.55)',
                        boxShadow: isAgent ? 'inset 0 1px 0 rgba(255,255,255,0.08),0 4px 16px rgba(30,115,216,0.12)' : 'none',
                      }}>
                        {isAgent && <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,rgba(30,115,216,0.7),rgba(47,199,214,0.5),transparent)'}}/>}
                        {text}
                        {isLast && playing && isAgent && <span style={{display:'inline-block',width:'2px',height:'11px',background:B.cyan,marginLeft:'4px',verticalAlign:'middle',animation:'typing 1s step-end infinite',boxShadow:`0 0 4px ${B.cyan}`}}/>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              {shown >= TRANSCRIPT.length-1 ? (
                <div style={{padding:'11px 18px',background:'rgba(47,199,214,0.06)',borderTop:'1px solid rgba(47,199,214,0.14)',display:'flex',alignItems:'center',gap:'10px'}}>
                  <div style={{width:'20px',height:'20px',borderRadius:'6px',background:'rgba(47,199,214,0.15)',border:'1px solid rgba(47,199,214,0.3)',display:'flex',alignItems:'center',justifyContent:'center',color:B.cyan,flexShrink:0}}><Ico.Check/></div>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',fontWeight:600,color:B.cyan,letterSpacing:'0.06em'}}>RDV CONFIRMÉ · RÉSUMÉ TRANSMIS</span>
                </div>
              ) : (
                <div style={{padding:'10px 18px',background:'rgba(0,0,0,0.2)',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'rgba(255,255,255,0.15)',letterSpacing:'0.06em'}}>TRANSCRIPT · Vidange Peugeot 308 HDi</span>
                </div>
              )}
            </div>
          </FadeIn>
        </div>

        {/* ── Summary table ── */}
        <FadeIn delay={0.15}>
          <div style={{marginTop:'24px',borderRadius:'24px',overflow:'hidden',border:'1px solid rgba(30,115,216,0.22)',background:'linear-gradient(160deg,rgba(11,23,38,0.98),rgba(14,28,53,0.95))',boxShadow:'0 24px 64px rgba(0,0,0,0.35)',position:'relative'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:`linear-gradient(90deg,transparent,${B.blue},${B.cyan},transparent)`}}/>
            <div style={{position:'absolute',top:0,right:0,width:'200px',height:'120px',background:`radial-gradient(circle at top right,rgba(47,199,214,0.06),transparent 70%)`,pointerEvents:'none'}}/>

            {/* Table header */}
            <div style={{padding:'20px 26px',borderBottom:'1px solid rgba(255,255,255,0.05)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <div style={{width:'34px',height:'34px',borderRadius:'11px',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#1E73D8,#2FC7D6)',boxShadow:'0 4px 16px rgba(30,115,216,0.45),inset 0 1px 0 rgba(255,255,255,0.2)',color:'white',flexShrink:0}}><Ico.Chart/></div>
                <div>
                  <p style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:'white',margin:0}}>Résumé transmis à votre équipe</p>
                  <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'rgba(255,255,255,0.22)',margin:'3px 0 0',letterSpacing:'0.1em'}}>GÉNÉRÉ AUTOMATIQUEMENT · AUCUNE SAISIE MANUELLE</p>
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'6px',padding:'4px 12px',borderRadius:'99px',background:'rgba(74,222,128,0.1)',border:'1px solid rgba(74,222,128,0.25)'}}>
                <span style={{position:'relative',display:'inline-flex',width:'7px',height:'7px'}}>
                  <span style={{position:'absolute',inset:0,borderRadius:'50%',background:'#4ade80',animation:'ping 1.5s ease-out infinite',opacity:0.7}}/>
                  <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#4ade80',display:'inline-flex',boxShadow:'0 0 5px #4ade80'}}/>
                </span>
                <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',fontWeight:700,color:'#4ade80',letterSpacing:'0.1em'}}>TRANSMIS</span>
              </div>
            </div>

            {/* Data cells */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'rgba(255,255,255,0.04)'}} className="summary-grid">
              {[
                {label:'CLIENT',    value:'Martin Dupont',   sub:'06 12 34 56 78',                  Icon:Ico.Phone,    color:B.blue,   tag:null},
                {label:'MOTIF',     value:'Vidange',         sub:'Peugeot 308 · 1.6 HDi',            Icon:Ico.Filter,   color:B.cyan,   tag:null},
                {label:'RDV',       value:'Jeudi à 10h00',   sub:"Confirmé par l'agent",             Icon:Ico.Calendar, color:B.lcyan,  tag:'✓ OK'},
                {label:'URGENCE',   value:'Faible',          sub:'Pas de panne déclarée',            Icon:Ico.Zap,      color:'#4ade80',tag:null},
                {label:'ACTION',    value:'Aucune',          sub:'Traitement automatique complet',   Icon:Ico.Check,    color:B.cyan,   tag:null},
                {label:'STATUT',    value:'Clôturé',         sub:'RDV · agenda · client notifié',    Icon:Ico.Chart,    color:B.blue,   tag:'● FIN'},
              ].map(({label,value,sub,Icon,color,tag})=>(
                <div key={label} style={{padding:'20px 22px',background:'rgba(255,255,255,0.01)',transition:'background 0.2s,box-shadow 0.2s'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(30,115,216,0.07)';}}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.01)';}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
                      <div style={{width:'24px',height:'24px',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',background:`${color}15`,border:`1px solid ${color}28`,color,flexShrink:0,boxShadow:`0 2px 8px ${color}20`}}><Icon/></div>
                      <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'rgba(255,255,255,0.28)',fontWeight:600,letterSpacing:'0.12em'}}>{label}</span>
                    </div>
                    {tag && <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'8px',fontWeight:700,color,letterSpacing:'0.08em',opacity:0.85}}>{tag}</span>}
                  </div>
                  <p style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:'rgba(255,255,255,0.92)',margin:'0 0 3px'}}>{value}</p>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.3)',margin:0,lineHeight:1.4}}>{sub}</p>
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
  { Icon: Ico.Phone,    title: 'Décroché 24h/24',             desc: "L'agent répond immédiatement, même hors horaires. Aucun appel ne sonne dans le vide jamais." },
  { Icon: Ico.Filter,   title: 'Qualification de la demande', desc: "Comprend le motif de l'appel, pose les bonnes questions, collecte les informations utiles dès le premier contact." },
  { Icon: Ico.Zap,      title: 'Filtrage du répétitif',       desc: "Horaires, tarifs, disponibilités traités automatiquement, sans interrompre votre équipe une seule fois." },
  { Icon: Ico.Calendar, title: 'Prise de rendez-vous',        desc: "Propose et confirme des créneaux selon vos disponibilités réelles. Votre agenda se remplit sans friction." },
  { Icon: Ico.Chart,    title: 'Résumés & tableau de bord',   desc: "Chaque appel important arrive avec un résumé structuré. Votre équipe sait exactement quoi faire." },
  { Icon: Ico.Link,     title: 'Intégrations simples',        desc: "Google Calendar, CRM, Google Sheets. Onboarding guidé inclus aucune compétence technique requise." },
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
            sub="Omnira s'adapte à votre façon de travailler. Votre équipe n'a rien à changer."
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
