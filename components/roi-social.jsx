// ─── ROI CALCULATOR ───────────────────────────────────────────────────────────
function ROICalculator() {
  const [missed,  setMissed]  = React.useState(10);
  const [rate,    setRate]    = React.useState(30);
  const [basket,  setBasket]  = React.useState(150);
  const monthly = Math.round(missed * 4 * (rate / 100));
  const revenue = monthly * basket;
  const annual  = revenue * 12;

  const sliders = [
    { label:'Appels manqués / semaine', value:missed,  set:setMissed,  min:1,  max:50,  unit:'appels', color:B.blue  },
    { label:'Taux de conversion estimé',value:rate,    set:setRate,    min:5,  max:80,  unit:'%',      color:B.cyan  },
    { label:'Panier moyen par client',  value:basket,  set:setBasket,  min:50, max:500, unit:'€',      color:B.lcyan },
  ];

  return (
    <section id="roi" style={{padding:'96px 24px',background:B.bgW}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Calculateur ROI"
            chipColor={B.blue}
            title="Combien vous coûtent<br/>vos appels manqués ?"
            sub="Ajustez les curseurs selon votre situation et découvrez ce qu'Omnira peut récupérer pour vous chaque mois."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',alignItems:'start'}} className="roi-grid">
          {/* Sliders */}
          <FadeIn>
            <div style={{padding:'36px',borderRadius:'24px',background:B.bgL,border:`1px solid ${B.border}`,boxShadow:'inset 0 2px 12px rgba(16,63,115,0.04)'}}>
              <div style={{display:'flex',flexDirection:'column',gap:'32px'}}>
                {sliders.map(({label,value,set,min,max,unit,color})=>{
                  const pct = ((value-min)/(max-min))*100;
                  return (
                    <div key={label}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'12px'}}>
                        <label style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:B.tMain}}>{label}</label>
                        <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'13px',fontWeight:700,color}}>{value}{unit}</span>
                      </div>
                      <input type="range" min={min} max={max} value={value} onChange={e=>set(Number(e.target.value))}
                        className="omnira-slider" style={{'--pct':`${pct}%`,'--color':color}}/>
                      <div style={{display:'flex',justifyContent:'space-between',marginTop:'6px'}}>
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
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              {[
                { label:'Clients récupérables / mois', value:`${monthly}`,                         unit:'clients', color:B.blue,  hi:false },
                { label:'Revenus récupérables / mois',  value:`${revenue.toLocaleString('fr-FR')}`, unit:'€',       color:B.cyan,  hi:false },
                { label:'Revenus récupérables / an',    value:`${annual.toLocaleString('fr-FR')}`,  unit:'€ / an',  color:B.lcyan, hi:true  },
              ].map(({label,value,unit,color,hi})=>(
                <div key={label} style={{padding:'24px 28px',borderRadius:'20px',position:'relative',overflow:'hidden',
                  background: hi ? `linear-gradient(135deg,#0D3665,${B.blue})` : B.bgL,
                  border: hi ? 'none' : `1px solid ${B.border}`,
                  boxShadow: hi ? '0 20px 56px rgba(30,115,216,0.24)' : 'none',
                }}>
                  {hi && <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)'}}/>}
                  <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:hi?'rgba(255,255,255,0.45)':B.tMuted,marginBottom:'10px'}}>{label}</p>
                  <div style={{display:'flex',alignItems:'baseline',gap:'8px'}}>
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'38px',fontWeight:700,color:hi?'white':color,lineHeight:1}}>{value}</span>
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'14px',fontWeight:500,color:hi?'rgba(255,255,255,0.45)':color}}>{unit}</span>
                  </div>
                </div>
              ))}
              <GBtn href="#contact" variant="primary" size="md" full>
                Commencer à récupérer ces revenus
              </GBtn>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
window.ROICalculator = ROICalculator;

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name:'Patrick M.', role:'Gérant', garage:'Garage Martin — Lyon', stars:5, photo:'uploads/avis photo 1.png', rotate:'-2.5deg', offsetY:'0px',   text:"Depuis Omnira, on ne perd plus un appel. Avant on en ratait 3 ou 4 par jour en atelier. Maintenant tout est capté et résumé. Le ROI est immédiat." },
  { name:'Sylvie R.',  role:'Responsable accueil', garage:'Auto Expert — Bordeaux', stars:5, photo:'uploads/avis photo 2-4449261d.png', rotate:'1.8deg', offsetY:'40px',  text:"L'agent est d'un naturel bluffant. Mes clients ne réalisent même pas qu'ils parlent à une IA. Et moi j'ai enfin du temps pour ce qui compte vraiment." },
  { name:'Karim B.',   role:'Propriétaire', garage:'Mécano Plus — Marseille', stars:5, photo:'uploads/avis photo 3.jpg', rotate:'-1.2deg', offsetY:'-16px', text:"La prise de RDV la nuit, c'est un vrai plus. On a récupéré plusieurs clients qui auraient appelé la concurrence. Rentable dès le premier mois." },
];

function Testimonials() {
  return (
    <section style={{padding:'96px 24px',background:B.bgD,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 65% 50% at 50% 50%,rgba(30,115,216,0.07),transparent 70%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)'}}/>
      <div style={{maxWidth:'1200px',margin:'0 auto',position:'relative',zIndex:1}}>
        <FadeIn>
          <SectionHeader
            chip="Témoignages"
            light
            title="Des résultats concrets,<br/>des équipes soulagées."
            sub="Garages indépendants qui ont récupéré leurs appels et leur sérénité."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px',paddingBottom:'16px'}} className="test-grid">
          {TESTIMONIALS.map((t,i)=>(
            <FadeIn key={i} delay={i*0.08}>
              <div style={{transform:`rotate(${t.rotate})`,marginTop:t.offsetY,transition:'transform 0.3s ease'}}
                onMouseEnter={e=>e.currentTarget.style.transform='rotate(0deg) translateY(-4px)'}
                onMouseLeave={e=>e.currentTarget.style.transform=`rotate(${t.rotate}) translateY(0)`}>
                <div style={{padding:'24px',borderRadius:'20px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',backdropFilter:'blur(16px)',boxShadow:'0 16px 48px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.08)',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)'}}/>
                  <div style={{display:'flex',gap:'2px',marginBottom:'16px'}}>{[...Array(t.stars)].map((_,j)=><Ico.Star key={j}/>)}</div>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',lineHeight:1.7,color:'rgba(255,255,255,0.82)',marginBottom:'20px'}}>"{t.text}"</p>
                  <div style={{display:'flex',alignItems:'center',gap:'12px',paddingTop:'16px',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
                    <div style={{width:'44px',height:'44px',borderRadius:'50%',flexShrink:0,overflow:'hidden',border:'2px solid rgba(255,255,255,0.15)',boxShadow:'0 4px 12px rgba(0,0,0,0.3)'}}>
                      <img src={t.photo} alt={t.name} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}}/>
                    </div>
                    <div>
                      <p style={{fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,color:'white',margin:'0 0 2px'}}>{t.name}</p>
                      <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'rgba(255,255,255,0.32)',margin:0}}>{t.role} · {t.garage}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Testimonials = Testimonials;
