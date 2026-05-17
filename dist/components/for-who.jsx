// ─── FOR WHO / NOT FOR WHO ────────────────────────────────────────────────────

const FOR_YES = [
  "Vous ratez des appels pendant les heures chargées.",
  "Votre équipe est souvent interrompue par le téléphone.",
  "Vous voulez capter les appels hors horaires, soirs et week-ends.",
  "Vous recevez des demandes de devis ou de RDV par téléphone.",
  "Vous voulez un résumé clair sans devoir tout noter à la main.",
];

const FOR_NO = [
  "Vous avez déjà une réception disponible en permanence.",
  "Vous recevez très peu d'appels (moins de 5 par jour).",
  "Vous ne souhaitez pas automatiser même les demandes simples.",
  "Vous préférez gérer chaque appel manuellement.",
];

function ForWho() {
  return (
    <section style={{padding:'96px 24px',background:B.bgW}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Pour qui ?"
            chipColor={B.blue}
            title="Omnira est fait pour vous<br/>— ou pas."
            sub="On préfère être directs. Cette liste vous évite de perdre du temps, et nous aussi."
          />
        </FadeIn>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px'}} className="solution-grid">

          {/* ── Oui ── */}
          <FadeIn delay={0.05}>
            <div style={{
              borderRadius:'24px',
              padding:'36px',
              background:B.bgD,
              border:'1px solid rgba(47,199,214,0.2)',
              boxShadow:'0 12px 40px rgba(0,0,0,0.22)',
              height:'100%',
            }}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'28px'}}>
                <div style={{
                  width:'36px',height:'36px',borderRadius:'10px',flexShrink:0,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  background:'rgba(47,199,214,0.14)',color:B.cyan,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'16px',fontWeight:800,color:'white',margin:0}}>
                  Omnira est fait pour vous si…
                </h3>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
                {FOR_YES.map(item => (
                  <div key={item} style={{display:'flex',alignItems:'flex-start',gap:'12px'}}>
                    <div style={{
                      width:'20px',height:'20px',borderRadius:'50%',flexShrink:0,marginTop:'1px',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      background:'rgba(47,199,214,0.14)',border:'1px solid rgba(47,199,214,0.28)',color:B.cyan,
                    }}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M2 5.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:'rgba(255,255,255,0.72)',lineHeight:1.6,margin:0}}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'32px'}}>
                <GBtn href="#contact" variant="primary" size="md" full>
                  Tester le réceptionniste IA
                </GBtn>
              </div>
            </div>
          </FadeIn>

          {/* ── Non ── */}
          <FadeIn delay={0.12}>
            <div style={{
              borderRadius:'24px',
              padding:'36px',
              background:B.bgL,
              border:`1px solid ${B.border}`,
              boxShadow:B.shadow,
              height:'100%',
            }}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'28px'}}>
                <div style={{
                  width:'36px',height:'36px',borderRadius:'10px',flexShrink:0,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  background:'rgba(91,122,155,0.12)',color:B.tMuted,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'16px',fontWeight:800,color:B.tMain,margin:0}}>
                  Omnira n'est pas nécessaire si…
                </h3>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
                {FOR_NO.map(item => (
                  <div key={item} style={{display:'flex',alignItems:'flex-start',gap:'12px'}}>
                    <div style={{
                      width:'20px',height:'20px',borderRadius:'50%',flexShrink:0,marginTop:'1px',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      background:'rgba(91,122,155,0.1)',border:`1px solid ${B.border}`,color:B.tMuted,
                    }}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M2.5 8.5l6-6M8.5 8.5l-6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:B.tMuted,lineHeight:1.6,margin:0}}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop:'32px',padding:'16px 20px',borderRadius:'12px',
                background:B.bgW,border:`1px solid ${B.border}`,
              }}>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMuted,lineHeight:1.6,margin:0}}>
                  <strong style={{color:B.tMain}}>On est honnêtes :</strong> si Omnira ne correspond pas à votre situation,
                  on vous le dira dès le premier échange — et on vous orientera vers ce qui vous convient mieux.
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
window.ForWho = ForWho;
