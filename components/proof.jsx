// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
const HOW_STEPS = [
  { num:'01', title:"L'appel arrive",                    Icon: Ico.Phone,    desc:"Le client appelle votre entreprise." },
  { num:'02', title:"Prise en charge selon la configuration", Icon: Ico.Mic, desc:"L'accueil suit le discours, les horaires et les règles préparés avec votre équipe." },
  { num:'03', title:"Analyse selon le scénario", Icon: Ico.Filter, desc:"Le scénario peut identifier le motif, l'urgence, le service concerné et les informations utiles.", extra:"Les demandes correspondant à vos critères peuvent être signalées en priorité." },
  { num:'04', title:"Il agit selon vos règles",          Icon: Ico.Settings, desc:"Devis, rendez-vous, rappel, information ou transfert à un humain selon les scénarios définis.", extra:"Les scénarios sensibles peuvent imposer un transfert humain selon vos critères." },
  { num:'05', title:"Préparer un résumé pour votre équipe", Icon: Ico.Chart, desc:"Lorsqu'un appel suit le scénario prévu, les informations collectées peuvent être envoyées à votre équipe." },
  { num:'06', title:"Suivi de l'activité selon les intégrations", Icon: Ico.Zap, desc:"Selon les intégrations retenues, le tableau de bord regroupe les appels reçus, leurs motifs et les suites préparées." },
];

function HowItWorks() {
  return (
    <section id="process" className="section-cap-top" style={{padding:'72px 24px',background:B.bgW,position:'relative'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Fonctionnement"
            chipColor={B.blue}
            title="De l'appel entrant au compte rendu,<br/>selon les règles définies."
            sub="Un parcours configurable, de l'accueil à la transmission des informations utiles."
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}} className="how-grid">
            {HOW_STEPS.map(({num,title,desc,Icon,extra},i)=>(
              <div key={num} style={{
                padding:'22px',borderRadius:'18px',
                background: i===5 ? B.grad : B.bgW,
                border: i===5 ? 'none' : `1px solid ${B.border}`,
                boxShadow: i===5 ? '0 12px 36px rgba(30,115,216,0.3)' : B.shadow,
                position:'relative',overflow:'hidden',
                transition:'all 0.22s ease',
              }}
                onMouseEnter={e=>{ if(i!==5){e.currentTarget.style.boxShadow='0 12px 36px rgba(30,115,216,0.12)';e.currentTarget.style.borderColor='rgba(30,115,216,0.2)';} }}
                onMouseLeave={e=>{ if(i!==5){e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.borderColor=B.border;} }}>
                {i===5 && <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 60%)',pointerEvents:'none'}}/>}
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'14px'}}>
                  <div style={{width:'38px',height:'38px',borderRadius:'11px',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:i===5?'rgba(255,255,255,0.2)':'rgba(30,115,216,0.08)',color:i===5?'white':B.blue}}>
                    <Icon/>
                  </div>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',fontWeight:700,color:i===5?'rgba(255,255,255,0.5)':B.blue,letterSpacing:'0.08em'}}>{num}</span>
                </div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:i===5?'white':B.tMain,marginBottom:'7px',lineHeight:1.35}}>{title}</h3>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:i===5?'rgba(255,255,255,0.65)':B.tMuted,lineHeight:1.6,margin:0}}>{desc}</p>
                {extra && (
                  <div style={{display:'flex',alignItems:'flex-start',gap:'6px',marginTop:'9px',padding:'7px 10px',borderRadius:'8px',background:i===5?'rgba(255,255,255,0.08)':'rgba(30,115,216,0.06)',border:`1px solid ${i===5?'rgba(255,255,255,0.12)':'rgba(30,115,216,0.14)'}`}}>
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" style={{flexShrink:0,marginTop:'2px'}}><path d="M1 4.5l2.5 2.5 4.5-5" stroke={i===5?'rgba(255,255,255,0.6)':B.blue} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'11px',color:i===5?'rgba(255,255,255,0.5)':B.blue,lineHeight:1.5,fontWeight:500}}>{extra}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{textAlign:'center',marginTop:'32px'}}>
            <GBtn onClick={() => window.openCalModal('decouverte')} variant="primary" size="md">Voir ce qu'Omnira peut faire pour mon activité</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.HowItWorks = HowItWorks;

// ─── FEATURES ─────────────────────────────────────────────────────────────────
const FEATURES_DATA = [
  { Icon: Ico.Phone,    title: 'Répondre aux appels entrants',      desc: "L'agent peut décrocher pendant les plages définies, y compris hors horaires d'ouverture si la configuration le prévoit." },
  { Icon: Ico.Filter,   title: 'Qualifier les demandes',            desc: "Il collecte le contexte prévu pour aider votre équipe à préparer le rappel." },
  { Icon: Ico.Chart,    title: 'Préparer une demande de devis',     desc: "L'agent collecte les informations utiles et transmet une demande structurée." },
  { Icon: Ico.Calendar, title: 'Prendre ou préparer un rendez-vous',desc: "Il vérifie les règles définies, collecte les disponibilités et prépare la suite." },
  { Icon: Ico.Zap,      title: 'Signaler les urgences',              desc: "Les demandes correspondant à vos critères sont signalées pour être orientées selon le scénario prévu." },
  { Icon: Ico.Users,    title: 'Prévoir un transfert humain',        desc: "Les scénarios sensibles ou complexes peuvent imposer un transfert vers une personne désignée." },
  { Icon: Ico.Mic,      title: 'Préparer un résumé d’appel',         desc: "Les informations collectées peuvent être structurées pour faciliter le suivi par votre équipe." },
  { Icon: Ico.Link,     title: 'Alimenter vos outils',              desc: "Agenda, CRM, Google Sheets, email, SMS ou outil métier selon votre besoin." },
];

function Features() { return null; }
window.Features = Features;

// stubs
window.Solution = () => null;
