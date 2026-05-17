// ─── THREE BENEFITS ───────────────────────────────────────────────────────────
// Section "Il décroche / Il qualifie / Il transmet" — visible sans scroll

const THREE_BENEFITS_DATA = [
  {
    num: '01',
    title: 'Il décroche',
    desc: 'Omnira répond instantanément quand votre équipe est occupée ou hors horaires. Zéro appel perdu.',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 12 19.79 19.79 0 011.49 3.37 2 2 0 013.48 1h3a2 2 0 012 1.72c.127.96.361 1.9.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Il qualifie',
    desc: "Il récupère le motif, les coordonnées, le véhicule, l'urgence et les disponibilités du client.",
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Il transmet',
    desc: "Votre équipe reçoit un résumé structuré avec l'action à faire : rappeler, valider, préparer un devis ou confirmer un RDV.",
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13"/>
        <path d="M22 2L15 22l-4-9-9-4 20-7z"/>
      </svg>
    ),
  },
];

function ThreeBenefits() {
  return (
    <section style={{padding:'64px 24px 56px',background:B.bgD2}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <p style={{textAlign:'center',fontFamily:'JetBrains Mono,monospace',fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.16em',color:B.cyan,marginBottom:'40px'}}>
            Comment ça fonctionne
          </p>
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px'}} className="feat-grid">
          {THREE_BENEFITS_DATA.map(({num,title,desc,icon:Icon},i)=>(
            <FadeIn key={num} delay={i*0.1}>
              <div style={{
                padding:'32px 28px',
                borderRadius:'20px',
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(47,199,214,0.16)',
                boxShadow:'0 8px 32px rgba(0,0,0,0.25)',
                height:'100%',
              }}>
                <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'20px'}}>
                  <div style={{
                    width:'44px',height:'44px',borderRadius:'12px',flexShrink:0,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    background:`linear-gradient(135deg,${B.blue},${B.cyan})`,
                    color:'white',
                    boxShadow:`0 6px 18px rgba(30,115,216,0.35)`,
                  }}>
                    <Icon/>
                  </div>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',fontWeight:700,color:B.cyan,textTransform:'uppercase',letterSpacing:'0.12em'}}>
                    {num}
                  </span>
                </div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'20px',fontWeight:800,color:'white',marginBottom:'12px',letterSpacing:'-0.015em'}}>
                  {title}
                </h3>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',lineHeight:1.7,color:'rgba(255,255,255,0.48)'}}>
                  {desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ── Urgent call note ── */}
        <FadeIn delay={0.3}>
          <div style={{
            marginTop:'28px',
            padding:'20px 28px',
            borderRadius:'16px',
            background:'rgba(30,115,216,0.06)',
            border:'1px solid rgba(47,199,214,0.18)',
            display:'flex',
            alignItems:'flex-start',
            gap:'16px',
          }}>
            <div style={{
              width:'36px',height:'36px',borderRadius:'10px',flexShrink:0,
              display:'flex',alignItems:'center',justifyContent:'center',
              background:'rgba(47,199,214,0.12)',color:B.cyan,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <p style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:'white',marginBottom:'4px'}}>
                Et si c'est urgent ?
              </p>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',lineHeight:1.65,color:'rgba(255,255,255,0.48)',margin:0}}>
                Omnira détecte les situations critiques et peut transférer directement à votre équipe avec le contexte —
                panne bloquante, client mécontent, véhicule immobilisé, client VIP, assurance ou expertise.
                Rien n'est laissé sans suite.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.ThreeBenefits = ThreeBenefits;
