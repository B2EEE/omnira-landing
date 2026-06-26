// ─── DASHBOARD SECTION ────────────────────────────────────────────────────────
const KPI_ITEMS = [
  { label:'Appels reçus',                     value:'247',    unit:'/mois', color: B.blue,  Icon: Ico.Phone },
  { label:'Traités par l\'agent',              value:'89%',    unit:'',      color: B.cyan,  Icon: Ico.Mic },
  { label:'Hors horaires récupérés',           value:'68',     unit:'/mois', color: B.lcyan, Icon: Ico.Clock },
  { label:'Rendez-vous demandés',              value:'43',     unit:'/mois', color: B.blue,  Icon: Ico.Calendar },
  { label:'Devis demandés',                    value:'31',     unit:'/mois', color: B.cyan,  Icon: Ico.Chart },
  { label:'Demandes de rappel',                value:'27',     unit:'/mois', color: B.lcyan, Icon: Ico.Phone },
  { label:'Motif n°1',                         value:'Devis',  unit:'',      color: B.blue,  Icon: Ico.Filter },
  { label:'Temps gagné estimé',                value:'12h',    unit:'/mois', color: B.cyan,  Icon: Ico.Zap },
];

function Dashboard() {
  return (
    <section style={{padding:'96px 24px',background:B.bgD,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 65% 50% at 50% 50%,rgba(30,115,216,0.07),transparent 70%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)'}}/>
      <div style={{maxWidth:'1100px',margin:'0 auto',position:'relative',zIndex:1}}>
        <FadeIn>
          <SectionHeader
            chip="Dashboard"
            chipColor={B.cyan}
            light
            title="Pilotez enfin ce qui se passe au téléphone"
            sub="Omnira vous aide à comprendre ce qui arrive au téléphone, ce qui est traité, ce qui doit être rappelé et ce qui peut être amélioré."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'32px'}} className="pain-grid">
          {KPI_ITEMS.map(({label,value,unit,color,Icon},i)=>(
            <FadeIn key={label} delay={i*0.05}>
              <div style={{padding:'22px 20px',borderRadius:'18px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',boxShadow:'0 8px 28px rgba(0,0,0,0.2)',transition:'all 0.22s ease',cursor:'default'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.borderColor=`${color}40`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px'}}>
                  <div style={{color,opacity:0.6}}><Icon/></div>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:'0.1em'}}>{label}</span>
                </div>
                <div style={{display:'flex',alignItems:'baseline',gap:'5px'}}>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'30px',fontWeight:700,color,lineHeight:1}}>{value}</span>
                  {unit && <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'12px',color:'rgba(255,255,255,0.3)'}}>{unit}</span>}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div style={{padding:'20px 28px',borderRadius:'16px',background:'rgba(30,115,216,0.07)',border:'1px solid rgba(30,115,216,0.18)',display:'flex',alignItems:'center',gap:'14px',flexWrap:'wrap'}}>
            <div style={{color:B.cyan,flexShrink:0}}><Ico.Shield/></div>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.5)',lineHeight:1.65,margin:0,flex:1}}>
              Les chiffres affichés sont des exemples illustratifs. Vos résultats réels dépendent de votre volume d'appels, de votre secteur et des scénarios configurés.
            </p>
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
  const recoverablePerMonth  = missedPerWeek * 4;
  const revenuePerMonth      = Math.round(recoverablePerMonth * (convRate / 100) * clientValue);
  const revenuePerYear       = revenuePerMonth * 12;
  const timeSavedPerMonth    = Math.round(callsPerWeek * 4 * timePerCall / 60);

  const sliders = [
    { label:'Appels reçus par semaine',          value:callsPerWeek, set:setCallsPerWeek, min:5,   max:200, unit:'appels',  color:B.blue  },
    { label:'Appels manqués estimés',            value:missedPct,    set:setMissedPct,    min:5,   max:60,  unit:'%',       color:B.cyan  },
    { label:'Valeur moyenne d\'un client',       value:clientValue,  set:setClientValue,  min:50,  max:1000,unit:'€',       color:B.lcyan },
    { label:'Taux de conversion estimé',         value:convRate,     set:setConvRate,     min:5,   max:70,  unit:'%',       color:B.blue  },
    { label:'Temps moyen gagné par appel',       value:timePerCall,  set:setTimePerCall,  min:1,   max:20,  unit:'min',     color:B.cyan  },
  ];

  return (
    <section id="roi" style={{padding:'96px 24px',background:B.bgL}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Simulation"
            chipColor={B.blue}
            title="Estimez ce que vos appels manqués peuvent vous coûter"
            sub="Ajustez les curseurs selon votre situation pour visualiser l'impact potentiel de vos appels non traités."
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
                { label:'Appels récupérables / mois',       value:`${recoverablePerMonth}`, unit:'appels', color:B.blue,  hi:false },
                { label:'Opportunités perdues estimées',     value:`${recoverablePerMonth}`, unit:'contacts', color:B.cyan,  hi:false },
                { label:'CA potentiel récupérable / mois',  value:`${revenuePerMonth.toLocaleString('fr-FR')}`, unit:'€', color:B.lcyan, hi:false },
                { label:'CA potentiel récupérable / an',    value:`${revenuePerYear.toLocaleString('fr-FR')}`, unit:'€/an', color:B.cyan, hi:true },
                { label:'Temps économisé estimé / mois',    value:`${timeSavedPerMonth}h`,  unit:'',  color:B.blue, hi:false },
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
                  ⚠️ Ces calculs sont des estimations indicatives, non des promesses de résultat. Vos chiffres réels dépendent de votre activité.
                </p>
              </div>
              <GBtn href="/devis" variant="primary" size="md" full>Recevoir une estimation personnalisée</GBtn>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
window.ROICalculator = ROICalculator;

// stubs
window.Scenarios_old = () => null;
