// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
const HOW_STEPS = [
  { num:'01', title:"L'appel arrive",                    Icon: Ico.Phone,    desc:"Le client appelle votre entreprise." },
  { num:'02', title:"L'agent Omnira répond",             Icon: Ico.Mic,      desc:"Il accueille avec un discours adapté à votre activité et vos horaires." },
  { num:'03', title:"Il comprend la demande",            Icon: Ico.Filter,   desc:"Il identifie le motif, l'urgence, le service concerné et les informations utiles." },
  { num:'04', title:"Il agit selon vos règles",          Icon: Ico.Settings, desc:"Devis, rendez-vous, rappel, information ou transfert à un humain selon les scénarios définis." },
  { num:'05', title:"Votre équipe reçoit un résumé",     Icon: Ico.Chart,    desc:"Chaque appel devient une information claire et exploitable envoyée à votre équipe." },
  { num:'06', title:"Vous suivez les résultats",         Icon: Ico.Zap,      desc:"Appels reçus, motifs fréquents, rendez-vous et devis suivis dans votre dashboard." },
];

function HowItWorks() {
  return (
    <section id="process" className="section-cap-top" style={{padding:'72px 24px',background:B.bgW,position:'relative'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Fonctionnement"
            chipColor={B.blue}
            title="De l'appel entrant au résumé exploitable,<br/>Omnira gère tout le parcours."
            sub="Un agent vocal IA qui accompagne chaque appel de l'accueil au résumé, selon vos règles."
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}} className="how-grid">
            {HOW_STEPS.map(({num,title,desc,Icon},i)=>(
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
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{textAlign:'center',marginTop:'32px'}}>
            <GBtn href="/devis" variant="primary" size="md">Voir ce qu'Omnira peut faire pour mon activité</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.HowItWorks = HowItWorks;

// ─── FEATURES ─────────────────────────────────────────────────────────────────
const FEATURES_DATA = [
  { Icon: Ico.Phone,    title: 'Répondre aux appels entrants',      desc: "L'agent décroche selon vos horaires ou 24/7 pour éviter les appels perdus." },
  { Icon: Ico.Filter,   title: 'Qualifier les demandes',            desc: "Votre équipe rappelle avec le bon contexte, sans reposer les mêmes questions." },
  { Icon: Ico.Chart,    title: 'Préparer une demande de devis',     desc: "L'agent collecte les informations utiles et transmet une demande structurée." },
  { Icon: Ico.Calendar, title: 'Prendre ou préparer un rendez-vous',desc: "Il vérifie les règles définies, collecte les disponibilités et prépare la suite." },
  { Icon: Ico.Zap,      title: 'Filtrer les urgences',              desc: "Les cas importants remontent rapidement vers la bonne personne." },
  { Icon: Ico.Users,    title: 'Transférer à un humain',            desc: "Les demandes sensibles ou complexes ne sont pas traitées seules par l'IA." },
  { Icon: Ico.Mic,      title: 'Résumer chaque appel',              desc: "Plus de notes floues, de messages incomplets ou d'informations perdues." },
  { Icon: Ico.Link,     title: 'Alimenter vos outils',              desc: "Agenda, CRM, Google Sheets, email, SMS ou outil métier selon votre besoin." },
];

function Features() {
  return (
    <section className="section-cap-top" style={{padding:'72px 24px',background:B.bgL,position:'relative'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Ce qu'Omnira fait"
            chipColor={B.blue}
            title="Ce que votre équipe n'a<br/>plus besoin de gérer seule"
            sub="Chaque action est définie avec vous — l'agent agit dans les limites de vos règles."
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'14px'}} className="feat-grid">
            {FEATURES_DATA.map(({Icon,title,desc},i)=>(
              <div key={i} style={{
                padding:'20px',borderRadius:'16px',
                background:B.bgW,border:`1px solid ${B.border}`,
                boxShadow:B.shadow,
                transition:'all 0.22s ease',
                display:'flex',flexDirection:'column',gap:'12px',
              }}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 12px 36px rgba(30,115,216,0.1)';e.currentTarget.style.borderColor='rgba(30,115,216,0.2)';e.currentTarget.style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.borderColor=B.border;e.currentTarget.style.transform='translateY(0)';}}>
                <div style={{width:'36px',height:'36px',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(30,115,216,0.07)',border:'1.5px solid rgba(30,115,216,0.14)',color:B.blue,flexShrink:0}}>
                  <Icon/>
                </div>
                <div>
                  <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:B.tMain,marginBottom:'5px',lineHeight:1.3}}>{title}</h3>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:B.tMuted,lineHeight:1.6,margin:0}}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div style={{marginTop:'28px',display:'flex',flexDirection:'column',gap:'12px'}}>
            <div style={{padding:'14px 20px',borderRadius:'12px',background:B.bgW,border:`1px solid ${B.border}`,display:'flex',alignItems:'center',gap:'12px'}}>
              <div style={{color:B.cyan,flexShrink:0}}><Ico.Shield/></div>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMuted,lineHeight:1.65,margin:0}}>
                <strong style={{color:B.tMain}}>L'agent ne remplace pas votre équipe.</strong>{' '}
                Il filtre, structure et transmet — les cas importants restent pour l'humain.
              </p>
            </div>
            <div style={{padding:'18px 22px',borderRadius:'14px',background:`linear-gradient(135deg,${B.bgD} 0%,#0E1C35 100%)`,border:'1px solid rgba(30,115,216,0.22)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'20px',flexWrap:'wrap'}}>
              <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
                <div style={{width:'36px',height:'36px',borderRadius:'10px',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:B.grad,boxShadow:'0 4px 14px rgba(30,115,216,0.35)'}}>
                  <Ico.Zap/>
                </div>
                <div>
                  <p style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:'white',margin:'0 0 2px'}}>Chaque déploiement est adapté à votre activité</p>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.38)',margin:0}}>Vos horaires, vos outils, vos règles — tout est configuré avec vous.</p>
                </div>
              </div>
              <GBtn href="/devis" variant="outline" size="sm">Demander un devis personnalisé</GBtn>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.Features = Features;

// stubs
window.Solution = () => null;
