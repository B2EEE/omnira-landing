// ─── PAIN SECTION ─────────────────────────────────────────────────────────────
const _PAIN_ITEMS = [
  { Icon: Ico.Phone,    label: 'Appels manqués' },
  { Icon: Ico.Clock,    label: 'Hors horaires sans réponse' },
  { Icon: Ico.Calendar, label: 'Rendez-vous non pris' },
  { Icon: Ico.Filter,   label: 'Devis oubliés' },
  { Icon: Ico.Users,    label: 'Équipe sans cesse interrompue' },
  { Icon: Ico.Mail,     label: 'Messages incomplets' },
  { Icon: Ico.Shield,   label: 'Clients qui attendent trop longtemps' },
];

function Pain() {
  return (
    <section id="pain" style={{padding:'80px 24px 96px',background:B.bgD,position:'relative'}}>
      <div style={{maxWidth:'860px',margin:'0 auto'}}>
        <FadeIn>
          <div style={{display:'flex',justifyContent:'center',marginBottom:'28px'}}>
            <Chip color={B.cyan}>Le problème</Chip>
          </div>
          <h2 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(22px,3.2vw,36px)',fontWeight:800,letterSpacing:'-0.024em',color:'white',lineHeight:1.25,textAlign:'center',marginBottom:'24px'}}>
            Les appels entrants restent un canal important pour de nombreuses PME, mais ils peuvent être difficiles à traiter quand l'équipe est déjà mobilisée.
          </h2>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'16px',color:'rgba(255,255,255,0.42)',lineHeight:1.78,textAlign:'center',maxWidth:'620px',margin:'0 auto 40px'}}>
            Un appel peut arriver pendant une intervention, un rendez-vous ou en dehors des horaires. Sans réponse immédiate, la demande attend alors un rappel.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
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
