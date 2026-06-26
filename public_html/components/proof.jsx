// ─── HOW IT WORKS (7 steps) ───────────────────────────────────────────────────
const HOW_STEPS = [
  { num:'01', title:"L'appel arrive",         desc:"Le client appelle votre entreprise sur votre numéro habituel.", Icon: Ico.Phone },
  { num:'02', title:"L'agent Omnira répond",   desc:"Il accueille le client avec un discours adapté à votre activité, sans délai.", Icon: Ico.Mic },
  { num:'03', title:"Il comprend la demande",  desc:"Il identifie le motif de l'appel, l'urgence, le service concerné et les informations utiles.", Icon: Ico.Filter },
  { num:'04', title:"Il pose les bonnes questions", desc:"Nom, téléphone, besoin, disponibilité, type de demande, détails nécessaires.", Icon: Ico.Message },
  { num:'05', title:"Il agit selon vos règles", desc:"Il peut préparer un devis, prendre un rendez-vous, créer une demande de rappel ou transférer à un humain.", Icon: Ico.Settings },
  { num:'06', title:"Votre équipe reçoit un résumé clair", desc:"Chaque appel devient une information exploitable transmise automatiquement.", Icon: Ico.Chart },
  { num:'07', title:"Vous suivez les résultats", desc:"Appels reçus, demandes qualifiées, rendez-vous, devis et rappels peuvent être suivis dans un tableau de bord.", Icon: Ico.Building },
];

function HowItWorks() {
  return (
    <section id="process" style={{padding:'96px 24px',background:B.bgW}}>
      <div style={{maxWidth:'960px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Fonctionnement"
            chipColor={B.blue}
            title="Comment fonctionne Omnira ?"
            sub="Un agent vocal IA qui accompagne chaque appel de l'accueil au résumé, selon vos règles."
          />
        </FadeIn>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {HOW_STEPS.map(({num,title,desc,Icon},i)=>(
            <FadeIn key={num} delay={i*0.07}>
              <div style={{display:'grid',gridTemplateColumns:'60px 1fr',gap:'20px',padding:'24px 28px',borderRadius:'18px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow,transition:'all 0.22s ease',position:'relative',overflow:'hidden'}}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 12px 40px rgba(16,63,115,0.1)';e.currentTarget.style.borderColor='rgba(30,115,216,0.22)';}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.borderColor=B.border;}}>
                {i===4 && <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:B.grad}}/>}
                <div style={{display:'flex',justifyContent:'center',paddingTop:'2px'}}>
                  <div style={{
                    width:'48px',height:'48px',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
                    background: i===4 ? B.grad : `rgba(30,115,216,0.07)`,
                    border: i===4 ? 'none' : '1.5px solid rgba(30,115,216,0.18)',
                    boxShadow: i===4 ? '0 6px 20px rgba(30,115,216,0.3)' : 'none',
                    color: i===4 ? 'white' : B.blue,
                    position:'relative',overflow:'hidden',
                  }}>
                    {i===4 && <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(255,255,255,0.18) 0%,transparent 55%)'}}/>}
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',fontWeight:700,position:'relative'}}>{num}</span>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
                  <div style={{flex:1,minWidth:'200px'}}>
                    <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'15px',fontWeight:700,color:B.tMain,margin:'0 0 6px'}}>{title}</h3>
                    <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:B.tMuted,lineHeight:1.65,margin:0}}>{desc}</p>
                  </div>
                  <div style={{color:B.blue,opacity:0.35,flexShrink:0}}>
                    <Icon/>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div style={{textAlign:'center',marginTop:'44px'}}>
            <GBtn href="/devis" variant="primary" size="lg">Voir ce qu'Omnira peut faire</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.HowItWorks = HowItWorks;

// ─── FEATURES (12 cards) ──────────────────────────────────────────────────────
const FEATURES_DATA = [
  { Icon: Ico.Phone,    title: 'Répondre aux appels entrants',        desc: "L'agent décroche instantanément — 24h/24 ou selon vos horaires définis." },
  { Icon: Ico.Filter,   title: 'Qualifier les demandes',              desc: "Il identifie le motif, l'urgence et les informations utiles dès le premier contact." },
  { Icon: Ico.Chart,    title: 'Préparer une demande de devis',       desc: "Il collecte les infos nécessaires et transmet un résumé structuré à votre équipe." },
  { Icon: Ico.Calendar, title: 'Prendre ou préparer un rendez-vous',  desc: "Il propose des créneaux et peut confirmer selon les disponibilités connectées." },
  { Icon: Ico.Zap,      title: 'Filtrer les urgences',                desc: "Il détecte les situations critiques et les priorise ou les transfère selon vos règles." },
  { Icon: Ico.Mail,     title: 'Envoyer une confirmation SMS ou email', desc: "Le client reçoit un accusé de réception automatique après son appel." },
  { Icon: Ico.Users,    title: 'Transférer à un humain si nécessaire', desc: "Les cas sensibles, complexes ou prioritaires sont redirigés vers votre équipe avec contexte." },
  { Icon: Ico.Clock,    title: 'Créer une demande de rappel',         desc: "L'agent note la demande et s'assure qu'elle arrive avec un résumé exploitable." },
  { Icon: Ico.Mic,      title: 'Résumer chaque appel',                desc: "Chaque échange devient une fiche structurée : motif, infos, action recommandée." },
  { Icon: Ico.Link,     title: 'Alimenter un agenda, CRM ou tableau', desc: "Les informations peuvent être transmises vers vos outils existants automatiquement." },
  { Icon: Ico.Building, title: 'Identifier les motifs fréquents',     desc: "Comprendre ce qui revient le plus souvent pour mieux organiser votre équipe." },
  { Icon: Ico.Shield,   title: 'Suivre les performances',             desc: "Appels traités, demandes qualifiées, rappels en attente — visibles dans un dashboard." },
];

function Features() {
  return (
    <section style={{padding:'96px 24px',background:B.bgL}}>
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Ce qu'Omnira peut faire"
            chipColor={B.blue}
            title="Ce que votre agent vocal Omnira peut gérer"
            sub=""
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginBottom:'40px'}} className="feat-grid">
          {FEATURES_DATA.map(({Icon,title,desc},i)=>(
            <FadeIn key={title} delay={i*0.05}>
              <div style={{padding:'24px',borderRadius:'18px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow,transition:'all 0.22s ease',cursor:'default',position:'relative',overflow:'hidden',height:'100%'}}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 16px 44px rgba(30,115,216,0.11),0 0 0 1px rgba(30,115,216,0.18)`;e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.querySelector('.feat-line').style.opacity='1';}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.transform='translateY(0)';e.currentTarget.querySelector('.feat-line').style.opacity='0';}}>
                <div className="feat-line" style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:B.grad,opacity:0,transition:'opacity 0.2s'}}/>
                <div style={{width:'40px',height:'40px',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px',background:B.bgL,border:`1px solid ${B.border}`,color:B.blue}}>
                  <Icon/>
                </div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:B.tMain,marginBottom:'8px',lineHeight:1.35}}>{title}</h3>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMuted,lineHeight:1.6,margin:0}}>{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div style={{padding:'20px 28px',borderRadius:'16px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow,display:'flex',alignItems:'flex-start',gap:'16px'}}>
            <div style={{width:'36px',height:'36px',borderRadius:'10px',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(47,199,214,0.1)',color:B.cyan}}>
              <Ico.Shield/>
            </div>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:B.tMuted,lineHeight:1.7,margin:0}}>
              <strong style={{color:B.tMain}}>L'agent ne remplace pas votre équipe.</strong>{' '}
              Il filtre, structure et transmet les demandes pour que l'humain garde les cas importants, sensibles ou complexes.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.Features = Features;

// stubs
window.Solution = () => null;
