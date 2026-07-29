// ─── DASHBOARD 3D ─────────────────────────────────────────────────────────────

const _MENU = [
  { key:'overview', Icon: Ico.Chart,     label:"Vue d'ensemble", active:true },
  { key:'calls',    Icon: Ico.Phone,     label:'Appels' },
  { key:'rdv',      Icon: Ico.Calendar,  label:'Rendez-vous' },
  { key:'devis',    Icon: Ico.Briefcase, label:'Devis' },
  { key:'conv',     Icon: Ico.Message,   label:'Conversations' },
  { key:'perf',     Icon: Ico.Zap,       label:'Performance' },
  { key:'auto',     Icon: Ico.Link,      label:'Automatisations' },
  { key:'cfg',      Icon: Ico.Settings,  label:'Paramètres' },
];

const _KPIS = [
  { label:'Appels reçus',   value:'186', sub:'exemple fictif', color:B.blue },
  { label:'Traités',        value:'142', sub:'exemple fictif', color:B.cyan },
  { label:'Qualification',  value:'87%', sub:'exemple fictif', color:B.lcyan },
  { label:'Hors horaires',  value:'22',  sub:'exemple fictif', color:'#f59e0b' },
];

const _BARS = [
  {d:'L',v:24},{d:'M',v:31},{d:'M',v:28},
  {d:'J',v:35},{d:'V',v:22},{d:'S',v:19},{d:'D',v:27},
];
const _BAR_MAX = 35;

const _DR  = 28;
const _DC  = 2 * Math.PI * _DR;   // ≈ 175.93

const _DONUT = [
  {label:'Rendez-vous', pct:24, color:B.blue},
  {label:'Information',  pct:32, color:B.cyan},
  {label:'Devis',        pct:13, color:B.lcyan},
  {label:'Urgence',      pct:19, color:'#f59e0b'},
  {label:'Rappel',       pct:12, color:'#8b5cf6'},
];

// Pre-compute cumulative segment positions
const _SEGS = (() => {
  let cum = 0;
  return _DONUT.map(d => {
    const len  = (d.pct / 100) * _DC;
    const cum0 = cum;
    cum += len;
    return { ...d, len, cum0 };
  });
})();

const _CALLS = [
  { in:'JM', name:'Julien Martin', motif:'Demande de devis', st:'À rappeler', sc:'#f59e0b', sb:'rgba(245,158,11,0.12)' },
  { in:'SD', name:'Sarah Dupont',  motif:'Rendez-vous',      st:'Confirmé',   sc:'#10b981', sb:'rgba(16,185,129,0.12)' },
  { in:'KB', name:'Karim Benali',  motif:'Urgence',          st:'Transféré',  sc:'#2FC7D6', sb:'rgba(47,199,214,0.12)' },
  { in:'NL', name:'Nina Lopez',    motif:'Information',      st:'Traité',     sc:'rgba(255,255,255,0.4)', sb:'rgba(255,255,255,0.06)' },
];

function Dashboard() {
  const wrapRef = React.useRef(null);
  const tiltRef = React.useRef(null);
  const [on, setOn] = React.useState(false);   // animation triggered

  // IntersectionObserver to trigger chart animations
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // 3D tilt — updates DOM directly (no React re-renders on every mousemove)
  const onMove = React.useCallback((e) => {
    const el = wrapRef.current;
    const t  = tiltRef.current;
    if (!el || !t) return;
    const r  = el.getBoundingClientRect();
    const rx = ((e.clientX - r.left)  / r.width  - 0.5) * 16;
    const ry = ((e.clientY - r.top)   / r.height - 0.5) * -10;
    t.style.transform = `rotateY(${rx}deg) rotateX(${ry}deg)`;
  }, []);

  const onEnter = React.useCallback(() => {
    if (tiltRef.current) tiltRef.current.style.transition = 'box-shadow 0.25s ease';
  }, []);

  const onLeave = React.useCallback(() => {
    const t = tiltRef.current;
    if (!t) return;
    t.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease';
    t.style.transform  = 'rotateY(-5deg) rotateX(3deg)';
  }, []);

  return (
    <section style={{padding:'108px 24px',background:B.bgD,position:'relative',overflow:'hidden'}}>
      <style>{`
        @media (max-width:900px){
          .d3-grid { grid-template-columns:1fr !important; }
          .d3-mock { display:none !important; }
          .d3-mobile-view { display:block !important; }
        }
        .d3-mobile-view { display:none; }
        .d3-kpi:hover  { background:rgba(255,255,255,0.07) !important; }
        .d3-menu:hover { background:rgba(255,255,255,0.07) !important; color:rgba(255,255,255,0.75) !important; }
        .d3-row:hover  { background:rgba(255,255,255,0.04) !important; }
      `}</style>

      {/* bg: radial glow + grid */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 55% 50% at 68% 55%,rgba(30,115,216,0.14),transparent 58%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)',backgroundSize:'68px 68px',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)',pointerEvents:'none'}}/>

      <div style={{maxWidth:'1240px',margin:'0 auto',position:'relative',zIndex:1}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.6fr',gap:'76px',alignItems:'center'}} className="d3-grid">

          {/* ── LEFT: text ── */}
          <FadeIn>
            <div>
              <div style={{marginBottom:'16px'}}><Chip color={B.cyan}>Dashboard produit</Chip></div>
              <h2 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(26px,3.2vw,42px)',fontWeight:800,color:'white',letterSpacing:'-0.022em',lineHeight:1.12,marginBottom:'18px'}}>
                Un tableau de bord peut structurer le suivi des appels
              </h2>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'16px',color:'rgba(255,255,255,0.46)',lineHeight:1.76,marginBottom:'30px'}}>
                Selon les intégrations retenues, les échanges peuvent être qualifiés, structurés et présentés sous forme d'informations utiles à votre équipe.
              </p>

              {/* stats 2×2 */}
              <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',fontWeight:700,color:B.cyan,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'10px'}}>Exemple fictif — aucun résultat client</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'11px',marginBottom:'26px'}}>
                {[
                  {v:'186', l:'appels — exemple fictif'},
                  {v:'87%', l:'qualification — exemple fictif'},
                  {v:'11h20',l:'temps — exemple fictif'},
                  {v:'22',   l:'hors horaires — exemple fictif'},
                ].map((s,i)=>(
                  <div key={i} style={{padding:'14px 16px',borderRadius:'12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)'}}>
                    <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'20px',fontWeight:700,color:'white',lineHeight:1,marginBottom:'4px'}}>{s.v}</div>
                    <div style={{fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.32)',lineHeight:1.4}}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* bullets */}
              <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'32px'}}>
                {[
                  "Appels, motifs et statuts selon les données disponibles",
                  "Résumés préparés lorsque le scénario et l'intégration le permettent",
                  "Tendances calculées à partir de l'activité enregistrée",
                ].map((t,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                    <div style={{width:'16px',height:'16px',borderRadius:'50%',background:'rgba(47,199,214,0.13)',border:'1px solid rgba(47,199,214,0.27)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'1px'}}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke={B.cyan} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:'rgba(255,255,255,0.5)',lineHeight:1.55}}>{t}</span>
                  </div>
                ))}
              </div>

              <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                <GBtn onClick={() => window.openCalModal('decouverte')} variant="primary" size="md">Prendre rendez-vous</GBtn>
                <GBtn href="#roi" variant="outline" size="md" onClick={e=>{e.preventDefault();document.getElementById('roi')?.scrollIntoView({behavior:'smooth'});}}>Simuler mes gains</GBtn>
              </div>
            </div>
          </FadeIn>

          {/* ── RIGHT: 3D mockup ── */}
          <FadeIn delay={0.12}>
            <div
              ref={wrapRef}
              className="d3-mock"
              onMouseMove={onMove}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              style={{perspective:'1100px',perspectiveOrigin:'50% 50%',cursor:'default',userSelect:'none'}}
            >
              {/* rotating shell */}
              <div
                ref={tiltRef}
                style={{
                  transform:'rotateY(-5deg) rotateX(3deg)',
                  transition:'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
                  borderRadius:'14px',
                  overflow:'hidden',
                  border:'1px solid rgba(255,255,255,0.1)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.07),' +
                    '0 2px 0 rgba(255,255,255,0.04),' +
                    '0 40px 90px rgba(0,0,0,0.72),' +
                    '0 14px 40px rgba(30,115,216,0.22)',
                }}
              >
                <div style={{display:'flex',height:'426px',background:'#07101c'}}>

                  {/* ── SIDEBAR ── */}
                  <div style={{
                    width:'50px',background:'rgba(0,0,0,0.32)',
                    borderRight:'1px solid rgba(255,255,255,0.055)',
                    display:'flex',flexDirection:'column',alignItems:'center',
                    paddingTop:'14px',paddingBottom:'14px',gap:'2px',flexShrink:0,
                  }}>
                    {/* brand mark */}
                    <div style={{width:'26px',height:'26px',borderRadius:'7px',background:B.grad,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px',boxShadow:'0 4px 12px rgba(30,115,216,0.4)',flexShrink:0}}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="2.4" stroke="white" strokeWidth="1.4"/>
                        <path d="M6 1v1.5M6 9.5V11M1 6h1.5M9.5 6H11" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    </div>

                    {_MENU.map((item)=>{
                      const Icon = item.Icon;
                      return (
                        <div
                          key={item.key}
                          className="d3-menu"
                          title={item.label}
                          style={{
                            width:'34px',height:'34px',borderRadius:'8px',
                            display:'flex',alignItems:'center',justifyContent:'center',
                            cursor:'pointer',flexShrink:0,
                            background: item.active ? 'rgba(30,115,216,0.22)' : 'transparent',
                            color: item.active ? B.cyan : 'rgba(255,255,255,0.2)',
                            transition:'background 0.14s,color 0.14s',
                          }}
                        >
                          <Icon/>
                        </div>
                      );
                    })}
                  </div>

                  {/* ── MAIN PANEL ── */}
                  <div style={{flex:1,display:'flex',flexDirection:'column',minWidth:0}}>

                    {/* header bar */}
                    <div style={{
                      padding:'9px 14px',flexShrink:0,
                      borderBottom:'1px solid rgba(255,255,255,0.05)',
                      background:'rgba(255,255,255,0.015)',
                      display:'flex',alignItems:'center',justifyContent:'space-between',
                    }}>
                      <span style={{fontFamily:'Sora,sans-serif',fontSize:'11px',fontWeight:700,color:'rgba(255,255,255,0.82)',letterSpacing:'-0.01em'}}>
                        Tableau de bord illustratif
                      </span>
                      <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'4px',padding:'2px 7px',borderRadius:'99px',background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.2)'}}>
                          <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#10b981',animation:'ping 1.8s ease-in-out infinite'}}/>
                          <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'#10b981',fontWeight:500}}>Démo</span>
                        </div>
                        <div style={{padding:'2px 7px',borderRadius:'5px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.07)'}}>
                          <span style={{fontFamily:'Inter,sans-serif',fontSize:'9px',color:'rgba(255,255,255,0.32)'}}>Données fictives</span>
                        </div>
                      </div>
                    </div>

                    {/* content */}
                    <div style={{flex:1,padding:'11px 13px',display:'flex',flexDirection:'column',gap:'9px',overflow:'hidden'}}>

                      {/* KPI row */}
                      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'7px',flexShrink:0}}>
                        {_KPIS.map((k,i)=>(
                          <div key={i} className="d3-kpi" style={{
                            padding:'9px 10px',borderRadius:'9px',
                            background:'rgba(255,255,255,0.04)',
                            border:'1px solid rgba(255,255,255,0.07)',
                            transition:'background 0.18s',
                          }}>
                            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'17px',fontWeight:700,color:'white',lineHeight:1}}>{k.value}</div>
                            <div style={{fontFamily:'Inter,sans-serif',fontSize:'8.5px',color:'rgba(255,255,255,0.3)',marginTop:'2px',lineHeight:1.3}}>{k.label}</div>
                            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'8px',color:k.color,marginTop:'2px'}}>{k.sub}</div>
                          </div>
                        ))}
                      </div>

                      {/* charts row */}
                      <div style={{display:'grid',gridTemplateColumns:'1.45fr 1fr',gap:'7px',flex:1,minHeight:0}}>

                        {/* bar chart */}
                        <div style={{padding:'10px 11px',borderRadius:'9px',background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.05)',display:'flex',flexDirection:'column'}}>
                          <span style={{fontFamily:'Inter,sans-serif',fontSize:'9px',fontWeight:600,color:'rgba(255,255,255,0.38)',marginBottom:'7px'}}>
                            Activité hebdomadaire
                          </span>
                          <div style={{display:'flex',alignItems:'flex-end',gap:'5px',flex:1}}>
                            {_BARS.map((b,i)=>{
                              const peak = b.v === _BAR_MAX;
                              const h    = (b.v / _BAR_MAX) * 100;
                              return (
                                <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-end',gap:'3px',height:'100%'}}>
                                  <div style={{
                                    width:'100%',minHeight:'3px',
                                    height: on ? `${h}%` : '3px',
                                    borderRadius:'3px 3px 0 0',
                                    background: peak
                                      ? B.grad
                                      : `rgba(30,115,216,${0.27 + (b.v / _BAR_MAX) * 0.45})`,
                                    transition:`height 0.72s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
                                    boxShadow: peak ? '0 0 8px rgba(47,199,214,0.5)' : 'none',
                                  }}/>
                                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'7.5px',color:'rgba(255,255,255,0.2)'}}>{b.d}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* donut chart */}
                        <div style={{padding:'10px 11px',borderRadius:'9px',background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.05)',display:'flex',flexDirection:'column'}}>
                          <span style={{fontFamily:'Inter,sans-serif',fontSize:'9px',fontWeight:600,color:'rgba(255,255,255,0.38)',marginBottom:'6px'}}>
                            Motifs d'appels
                          </span>
                          <div style={{display:'flex',alignItems:'center',gap:'9px',flex:1,minHeight:0}}>
                            <svg viewBox="0 0 70 70" width="64" height="64" style={{flexShrink:0,overflow:'visible'}}>
                              {/* track */}
                              <circle cx="35" cy="35" r={_DR} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="9"/>
                              {/* segments — rotate group so position 0 = 12 o'clock */}
                              <g transform="rotate(-90, 35, 35)">
                                {_SEGS.map((seg,i)=>(
                                  <circle
                                    key={i}
                                    cx="35" cy="35" r={_DR}
                                    fill="none"
                                    stroke={seg.color}
                                    strokeWidth="9"
                                    strokeDasharray={`${on ? seg.len : 0.001} ${_DC}`}
                                    strokeDashoffset={-seg.cum0}
                                    strokeLinecap="butt"
                                    style={{transition:`stroke-dasharray 0.85s cubic-bezier(0.16,1,0.3,1) ${i * 0.09}s`}}
                                  />
                                ))}
                              </g>
                              {/* center labels */}
                              <text x="35" y="33" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono,monospace">142</text>
                              <text x="35" y="44" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.28)" fontSize="7" fontFamily="Inter,sans-serif">traités</text>
                            </svg>
                            {/* legend */}
                            <div style={{display:'flex',flexDirection:'column',gap:'4px',flex:1,minWidth:0}}>
                              {_DONUT.map((d,i)=>(
                                <div key={i} style={{display:'flex',alignItems:'center',gap:'5px'}}>
                                  <div style={{width:'5px',height:'5px',borderRadius:'50%',background:d.color,flexShrink:0}}/>
                                  <span style={{fontFamily:'Inter,sans-serif',fontSize:'8px',color:'rgba(255,255,255,0.4)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                                    {d.label}
                                    <span style={{fontFamily:'JetBrains Mono,monospace',color:'rgba(255,255,255,0.58)',marginLeft:'3px'}}>{d.pct}%</span>
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* recent calls */}
                      <div style={{flexShrink:0}}>
                        <div style={{fontFamily:'Inter,sans-serif',fontSize:'8.5px',fontWeight:600,color:'rgba(255,255,255,0.28)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'5px'}}>
                          Appels récents
                        </div>
                        <div style={{display:'flex',flexDirection:'column',gap:'1px'}}>
                          {_CALLS.map((r,i)=>(
                            <div key={i} className="d3-row" style={{
                              display:'flex',alignItems:'center',justifyContent:'space-between',
                              padding:'5px 7px',borderRadius:'7px',
                              transition:'background 0.14s',
                            }}>
                              <div style={{display:'flex',alignItems:'center',gap:'7px',flex:1,minWidth:0}}>
                                {/* avatar */}
                                <div style={{
                                  width:'20px',height:'20px',borderRadius:'50%',flexShrink:0,
                                  background:'linear-gradient(135deg,rgba(30,115,216,0.3),rgba(47,199,214,0.18))',
                                  border:'1px solid rgba(255,255,255,0.09)',
                                  display:'flex',alignItems:'center',justifyContent:'center',
                                }}>
                                  <span style={{fontFamily:'Sora,sans-serif',fontSize:'7px',fontWeight:700,color:'rgba(255,255,255,0.62)'}}>{r.in}</span>
                                </div>
                                <div style={{minWidth:0}}>
                                  <div style={{fontFamily:'Inter,sans-serif',fontSize:'9.5px',fontWeight:600,color:'rgba(255,255,255,0.76)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{r.name}</div>
                                  <div style={{fontFamily:'Inter,sans-serif',fontSize:'8px',color:'rgba(255,255,255,0.26)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{r.motif}</div>
                                </div>
                              </div>
                              {/* status badge */}
                              <div style={{padding:'2px 7px',borderRadius:'99px',background:r.sb,border:`1px solid ${r.sc}40`,flexShrink:0,marginLeft:'8px'}}>
                                <span style={{fontFamily:'Inter,sans-serif',fontSize:'8px',color:r.sc,fontWeight:500,whiteSpace:'nowrap'}}>{r.st}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* bottom reflection */}
              <div style={{
                height:'22px',margin:'0 24px',
                background:'linear-gradient(to bottom,rgba(30,115,216,0.16),transparent)',
                borderRadius:'0 0 16px 16px',
                filter:'blur(10px)',
                transform:'scaleX(0.82)',
                pointerEvents:'none',
              }}/>
            </div>
          </FadeIn>

        </div>

        {/* ── VUE MOBILE : KPIs + mini chart (cachée sur desktop) ── */}
        <div className="d3-mobile-view" style={{marginTop:'32px'}}>
          <FadeIn>
            {/* KPI 2×2 */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'12px'}}>
              {_KPIS.map((k,i)=>(
                <div key={i} style={{padding:'16px',borderRadius:'14px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.09)'}}>
                  <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'24px',fontWeight:700,color:'white',lineHeight:1,marginBottom:'4px'}}>{k.value}</div>
                  <div style={{fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.32)',marginBottom:'3px'}}>{k.label}</div>
                  <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:k.color}}>{k.sub}</div>
                </div>
              ))}
            </div>
            {/* Mini bar chart */}
            <div style={{padding:'14px 16px 10px',borderRadius:'14px',background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.06)'}}>
              <span style={{fontFamily:'Inter,sans-serif',fontSize:'10px',fontWeight:600,color:'rgba(255,255,255,0.35)',display:'block',marginBottom:'10px'}}>Activité hebdomadaire</span>
              <div style={{display:'flex',alignItems:'flex-end',gap:'6px',height:'60px'}}>
                {_BARS.map((b,i)=>{
                  const peak = b.v === _BAR_MAX;
                  return (
                    <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',height:'100%',justifyContent:'flex-end'}}>
                      <div style={{width:'100%',minHeight:'3px',height:`${(b.v/_BAR_MAX)*52}px`,borderRadius:'3px 3px 0 0',background:peak?B.grad:`rgba(30,115,216,${0.3+(b.v/_BAR_MAX)*0.4})`,boxShadow:peak?'0 0 8px rgba(47,199,214,0.5)':'none'}}/>
                      <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'rgba(255,255,255,0.25)'}}>{b.d}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Appels récents */}
            <div style={{marginTop:'12px',borderRadius:'14px',background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.06)',overflow:'hidden'}}>
              <div style={{padding:'10px 16px',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                <span style={{fontFamily:'Inter,sans-serif',fontSize:'10px',fontWeight:600,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:'0.08em'}}>Appels récents</span>
              </div>
              {_CALLS.slice(0,3).map((r,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 16px',borderBottom:i<2?'1px solid rgba(255,255,255,0.04)':'none'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <div style={{width:'28px',height:'28px',borderRadius:'50%',flexShrink:0,background:'rgba(30,115,216,0.2)',border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <span style={{fontFamily:'Sora,sans-serif',fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.6)'}}>{r.in}</span>
                    </div>
                    <div>
                      <div style={{fontFamily:'Inter,sans-serif',fontSize:'12px',fontWeight:600,color:'rgba(255,255,255,0.78)'}}>{r.name}</div>
                      <div style={{fontFamily:'Inter,sans-serif',fontSize:'10px',color:'rgba(255,255,255,0.28)'}}>{r.motif}</div>
                    </div>
                  </div>
                  <div style={{padding:'3px 9px',borderRadius:'99px',background:r.sb,border:`1px solid ${r.sc}40`,flexShrink:0}}>
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'10px',color:r.sc,fontWeight:500}}>{r.st}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* disclaimer */}
        <FadeIn delay={0.25}>
          <div style={{marginTop:'36px',padding:'13px 20px',borderRadius:'11px',background:'rgba(30,115,216,0.06)',border:'1px solid rgba(30,115,216,0.13)',display:'flex',alignItems:'center',gap:'12px'}}>
            <div style={{color:B.cyan,flexShrink:0}}><Ico.Shield/></div>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.35)',lineHeight:1.65,margin:0}}>
              Ces chiffres et identités sont fictifs et servent uniquement à illustrer une interface configurable. Ils ne constituent ni des données, ni des résultats clients.
            </p>
          </div>
        </FadeIn>
        {/* Integrations bar */}
        <FadeIn delay={0.32}>
          <div style={{marginTop:'28px',textAlign:'center'}}>
            <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'rgba(255,255,255,0.22)',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'14px'}}>Compatible avec vos outils existants</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',gap:'8px'}}>
              {[
                {name:'Google Calendar',color:'#4285F4'},
                {name:'Google Sheets',  color:'#34A853'},
                {name:'CRM',            color:'#9333ea'},
                {name:'Email',          color:'#1E73D8'},
                {name:'SMS',            color:'#2FC7D6'},
                {name:'WhatsApp',       color:'#25D366'},
              ].map(({name,color})=>(
                <div key={name} style={{padding:'6px 14px',borderRadius:'99px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',gap:'6px'}}>
                  <div style={{width:'6px',height:'6px',borderRadius:'50%',background:color,flexShrink:0}}/>
                  <span style={{fontFamily:'Inter,sans-serif',fontSize:'12px',fontWeight:500,color:'rgba(255,255,255,0.42)'}}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.Dashboard = Dashboard;

// ─── ROI CALCULATOR ───────────────────────────────────────────────────────────
function ROICalculator() {
  const [callsPerWeek, setCallsPerWeek] = React.useState(40);
  const [missedPct,    setMissedPct]    = React.useState(20);
  const [clientValue,  setClientValue]  = React.useState(200);
  const [convRate,     setConvRate]     = React.useState(30);
  const [timePerCall,  setTimePerCall]  = React.useState(5);

  const missedPerWeek        = Math.round(callsPerWeek * missedPct / 100);
  const unansweredPerMonth   = missedPerWeek * 4;
  const hypotheticalContacts = Math.round(unansweredPerMonth * (convRate / 100));
  const theoreticalPerMonth  = Math.round(unansweredPerMonth * (convRate / 100) * clientValue);
  const theoreticalPerYear   = theoreticalPerMonth * 12;
  const callTimePerMonth      = Math.round(callsPerWeek * 4 * timePerCall / 60);

  const sliders = [
    { label:'Appels reçus par semaine',          value:callsPerWeek, set:setCallsPerWeek, min:5,   max:200, unit:'appels',  color:B.blue  },
    { label:'Appels manqués estimés',            value:missedPct,    set:setMissedPct,    min:5,   max:60,  unit:'%',       color:B.cyan  },
    { label:"Valeur moyenne d'un client",        value:clientValue,  set:setClientValue,  min:50,  max:1000,unit:'€',       color:B.lcyan },
    { label:'Taux de conversion estimé',         value:convRate,     set:setConvRate,     min:5,   max:70,  unit:'%',       color:B.blue  },
    { label:'Temps moyen consacré par appel',     value:timePerCall,  set:setTimePerCall,  min:1,   max:20,  unit:'min',     color:B.cyan  },
  ];

  return (
    <section id="roi" style={{padding:'48px 24px 96px',background:B.bgW}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Simulation"
            chipColor={B.blue}
            title="Estimez ce que vos appels manqués peuvent vous coûter"
            sub="Ajustez les hypothèses selon votre situation. Le calcul décrit un scénario théorique, pas un résultat attendu."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',alignItems:'start'}} className="roi-grid">
          {/* Sliders */}
          <FadeIn>
            <div style={{padding:'32px',borderRadius:'22px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:'inset 0 2px 12px rgba(16,63,115,0.04)'}}>
              <div style={{display:'flex',flexDirection:'column',gap:'28px'}}>
                {sliders.map(({label,value,set,min,max,unit,color})=>{
                  const pct = ((value-min)/(max-min))*100;
                  return (
                    <div key={label}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
                        <label style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:B.tMain}}>{label}</label>
                        <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'13px',fontWeight:700,color}}>{value}{unit}</span>
                      </div>
                      <input type="range" min={min} max={max} value={value} onChange={e=>set(Number(e.target.value))}
                        className="omnira-slider" style={{'--pct':`${pct}%`,'--color':color}}/>
                      <div style={{display:'flex',justifyContent:'space-between',marginTop:'5px'}}>
                        <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:B.tMuted}}>{min}{unit}</span>
                        <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:B.tMuted}}>{max}{unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* Results */}
          <FadeIn delay={0.1}>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              {[
                { label:'Appels non traités estimés / mois', value:`${unansweredPerMonth}`, unit:'appels',   color:B.blue,  hi:false },
                { label:"Contacts dans l'hypothèse / mois", value:`${hypotheticalContacts}`, unit:'contacts', color:B.cyan, hi:false },
                { label:'Valeur théorique / mois', value:`${theoreticalPerMonth.toLocaleString('fr-FR')}`, unit:'€', color:B.lcyan, hi:false },
                { label:'Valeur théorique / an', value:`${theoreticalPerYear.toLocaleString('fr-FR')}`, unit:'€/an', color:B.cyan, hi:true },
                { label:'Temps total associé / mois', value:`${callTimePerMonth}h`, unit:'', color:B.blue, hi:false },
              ].map(({label,value,unit,color,hi})=>(
                <div key={label} style={{padding:'20px 24px',borderRadius:'18px',position:'relative',overflow:'hidden',
                  background: hi ? `linear-gradient(135deg,#0D3665,${B.blue})` : B.bgW,
                  border: hi ? 'none' : `1px solid ${B.border}`,
                  boxShadow: hi ? '0 16px 48px rgba(30,115,216,0.22)' : 'none',
                }}>
                  {hi && <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)'}}/>}
                  <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:hi?'rgba(255,255,255,0.4)':B.tMuted,marginBottom:'8px'}}>{label}</p>
                  <div style={{display:'flex',alignItems:'baseline',gap:'6px'}}>
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'32px',fontWeight:700,color:hi?'white':color,lineHeight:1}}>{value}</span>
                    {unit && <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'13px',fontWeight:500,color:hi?'rgba(255,255,255,0.4)':color}}>{unit}</span>}
                  </div>
                </div>
              ))}
              <div style={{padding:'12px 16px',borderRadius:'12px',background:'rgba(91,122,155,0.07)',border:`1px solid ${B.border}`}}>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:B.tMuted,lineHeight:1.6,margin:0}}>
                  Ce calcul applique uniquement les hypothèses saisies. Il ne modélise ni la mise en place d'Omnira, ni un taux de récupération réel, ni un résultat commercial. Les résultats observés peuvent différer.
                </p>
              </div>
              <GBtn onClick={() => window.openCalModal('devis')} variant="primary" size="md" full>Discuter de ces hypothèses</GBtn>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
window.ROICalculator = ROICalculator;

window.Scenarios_old = () => null;
