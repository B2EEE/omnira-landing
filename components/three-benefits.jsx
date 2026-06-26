// ─── PAIN SECTION ─────────────────────────────────────────────────────────────
const _PAIN_ITEMS = [
  { Icon: Ico.Phone,    label: 'Appels manqués' },
  { Icon: Ico.Clock,    label: 'Hors horaires sans réponse' },
  { Icon: Ico.Calendar, label: 'Rendez-vous non pris' },
  { Icon: Ico.Filter,   label: 'Devis qui disparaissent' },
  { Icon: Ico.Users,    label: 'Équipe sans cesse interrompue' },
];

function Pain() {
  return (
    <section id="pain" style={{padding:'64px 24px 80px',background:B.bgD,position:'relative'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.22)',textAlign:'center',marginBottom:'28px'}}>
            Les problèmes les plus courants
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',gap:'10px'}}>
            {_PAIN_ITEMS.map(({Icon,label},i)=>(
              <div key={i} style={{
                display:'flex',alignItems:'center',gap:'9px',
                padding:'10px 18px',
                borderRadius:'99px',
                background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.09)',
              }}>
                <span style={{color:'rgba(255,255,255,0.28)',flexShrink:0,display:'flex'}}><Icon/></span>
                <span style={{fontFamily:'Inter,sans-serif',fontSize:'14px',fontWeight:500,color:'rgba(255,255,255,0.55)',whiteSpace:'nowrap'}}>{label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
      {/* onde de transition dark → white */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,lineHeight:0,pointerEvents:'none'}}>
        <svg viewBox="0 0 1440 48" fill="none" preserveAspectRatio="none" style={{width:'100%',height:'40px',display:'block'}}>
          <path d="M0 24 Q360 0 720 24 Q1080 48 1440 24 L1440 48 L0 48 Z" fill={B.bgW}/>
        </svg>
      </div>
    </section>
  );
}
window.Pain = Pain;

// stubs pour compatibilité
window.ThreeBenefits = () => null;
window.StatsBar = () => null;
