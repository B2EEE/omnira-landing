// ─── DEVIS SECTION ────────────────────────────────────────────────────────────
function DevisSection() {
  return (
    <section style={{padding:'96px 24px',background:B.bgD,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 55% at 50% 0%,rgba(30,115,216,0.18),transparent 65%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)'}}/>
      <div style={{maxWidth:'720px',margin:'0 auto',position:'relative',zIndex:1,textAlign:'center'}}>
        <FadeIn>
          <div style={{marginBottom:'18px'}}><Chip color={B.cyan}>Devis personnalisé</Chip></div>
          <h2 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(26px,4vw,40px)',fontWeight:800,color:'white',letterSpacing:'-0.022em',lineHeight:1.15,marginBottom:'20px'}}>
            Chaque entreprise a des appels différents.<br/>Votre solution aussi.
          </h2>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'16px',color:'rgba(255,255,255,0.45)',lineHeight:1.75,marginBottom:'16px'}}>
            Omnira ne propose pas une solution générique. Le fonctionnement dépend de votre activité, de vos horaires, du volume d'appels, des outils à connecter et des actions que l'agent doit réaliser.
          </p>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'16px',color:'rgba(255,255,255,0.45)',lineHeight:1.75,marginBottom:'44px'}}>
            C'est pour cela que nous préparons une estimation personnalisée après avoir compris votre besoin.
          </p>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'12px',marginBottom:'40px'}}>
            {[
              { Icon: Ico.Clock,   text: 'Réponse sous 24h' },
              { Icon: Ico.Shield,  text: 'Sans engagement' },
              { Icon: Ico.Users,   text: 'Accompagné par un expert' },
            ].map(({Icon,text})=>(
              <div key={text} style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 16px',borderRadius:'99px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)'}}>
                <span style={{color:B.cyan,opacity:0.8,display:'flex'}}><Icon/></span>
                <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.5)',fontWeight:500}}>{text}</span>
              </div>
            ))}
          </div>
          <GBtn onClick={() => window.openCalModal('devis')} variant="primary" size="lg">Demander mon devis personnalisé</GBtn>
        </FadeIn>
      </div>
    </section>
  );
}
window.DevisSection = DevisSection;

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q:"Est-ce que l'agent remplace mon accueil ?",       a:"Non. L'agent aide à filtrer, qualifier et structurer les demandes. Votre équipe garde les cas importants, sensibles ou complexes. Il allège la charge, il ne la supprime pas entièrement." },
  { q:"Peut-il prendre des rendez-vous ?",               a:"Oui, si le scénario est défini et si un agenda ou un système de réservation est connecté. La configuration est faite avec vous lors de la mise en place." },
  { q:"Peut-il préparer des demandes de devis ?",        a:"Oui. L'agent peut collecter les informations nécessaires, structurer la demande et transmettre un résumé clair à votre équipe pour qu'elle prépare le devis." },
  { q:"Peut-il transférer un appel à un humain ?",       a:"Oui. Les règles de transfert sont définies avec vous : urgence, client important, demande sensible ou cas spécifique. Le transfert peut inclure un contexte de l'appel en cours." },
  { q:"Est-ce que je garde mon numéro ?",                a:"La configuration dépend de votre téléphonie actuelle. Omnira peut être adapté pour s'intégrer à votre fonctionnement existant sans changer votre numéro client." },
  { q:"Est-ce que ça fonctionne avec mon agenda ?",      a:"Oui, selon l'outil utilisé. Omnira peut être connecté à Google Calendar, un CRM, un tableau de suivi ou un outil métier. La liste des intégrations possibles est évaluée lors du diagnostic." },
  { q:"Que se passe-t-il si l'agent ne comprend pas ?",  a:"L'agent peut reformuler, demander une précision ou transférer à un humain selon les règles définies. Il ne prend jamais de décisions qui dépassent son périmètre configuré." },
  { q:"Combien coûte Omnira ?",                         a:"Le prix dépend de votre activité, du volume d'appels, des intégrations nécessaires, des scénarios à créer et du niveau de suivi souhaité. Le plus simple est de demander un devis personnalisé, sans engagement." },
  { q:"Combien de temps prend l'installation ?",         a:"Cela dépend de la complexité du projet, des outils à connecter et des scénarios à configurer. Une estimation précise est donnée après le diagnostic initial." },
  { q:"Est-ce que je peux tester avant ?",               a:"Une démo peut être organisée pour vous montrer comment Omnira fonctionnerait dans votre activité, avec des exemples adaptés à votre secteur." },
];

function FAQ() {
  const [open, setOpen] = React.useState(null);
  return (
    <section id="faq" style={{padding:'96px 24px',background:B.bgW}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader chip="FAQ" chipColor={B.blue} title="Vos questions,<br/>nos réponses directes." sub="Tout ce que vous voulez savoir avant de contacter Omnira."/>
        </FadeIn>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {FAQS.map(({q,a},i)=>(
            <FadeIn key={i} delay={i*0.03}>
              <div style={{borderRadius:'16px',overflow:'hidden',border:`1px solid ${open===i?'rgba(30,115,216,0.28)':B.border}`,transition:'border-color 0.2s',boxShadow:open===i?'0 8px 28px rgba(30,115,216,0.08)':B.shadow}}>
                <button onClick={()=>setOpen(open===i?null:i)} style={{width:'100%',padding:'18px 22px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',background:B.bgW,border:'none',cursor:'pointer',textAlign:'left'}}>
                  <span style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:B.tMain,flex:1,lineHeight:1.4}}>{q}</span>
                  <div style={{width:'26px',height:'26px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,background:open===i?B.grad:B.bgL,border:`1px solid ${open===i?'transparent':B.border}`,transition:'all 0.2s',transform:open===i?'rotate(45deg)':'rotate(0deg)'}}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 2v7M2 5.5h7" stroke={open===i?'white':B.tMuted} strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                </button>
                {open===i && (
                  <div style={{padding:'0 22px 18px',background:B.bgW,animation:'slideIn 0.2s ease'}}>
                    <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',lineHeight:1.7,color:B.tMuted,margin:0,paddingTop:'12px',borderTop:`1px solid ${B.border}`}}>{a}</p>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div style={{textAlign:'center',marginTop:'40px'}}>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:B.tMuted,marginBottom:'18px'}}>Vous avez une autre question ?</p>
            <GBtn onClick={() => window.openCalModal('decouverte')} variant="primary" size="md">Prendre rendez-vous</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.FAQ = FAQ;

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{background:B.bgFoot,padding:'56px 24px 32px',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr',gap:'48px',marginBottom:'48px'}} className="footer-grid">
          <div>
            <OmniraLogo height={32}/>
            <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'0.14em',textTransform:'uppercase',marginTop:'6px'}}>by SETTE inc.</p>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.28)',lineHeight:1.7,marginTop:'14px',maxWidth:'280px'}}>
              Omnira gère vos appels entrants pour les PME. Qualification, rendez-vous, devis et résumés automatiques transmis à votre équipe.
            </p>
          </div>
          <div>
            <p style={{fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.22)',marginBottom:'16px'}}>Navigation</p>
            {[
              ['Fonctionnement','/#process'],
              ['Démo','/demo'],
              ["Cas d'usage",'/#scenarios'],
              ['Simulation','/#roi'],
              ['FAQ','/#faq'],
              ['Garage & Auto','/agent-vocal-ia-garage'],
            ].map(([l,h])=>(
              <a key={l} href={h} style={{display:'block',fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.35)',textDecoration:'none',marginBottom:'10px',transition:'color 0.15s'}}
                onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.7)'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.35)'}>{l}</a>
            ))}
          </div>
          <div>
            <p style={{fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.22)',marginBottom:'16px'}}>Contact</p>
            {[
              ['Demander un devis','/devis'],
              ['Réserver une démo','/prendre-rendez-vous'],
              ['Écouter les démos','/demo'],
            ].map(([l,h])=>(
              <a key={l} href={h} style={{display:'block',fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.35)',textDecoration:'none',marginBottom:'10px',transition:'color 0.15s'}}
                onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.7)'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.35)'}>{l}</a>
            ))}
            <a href="mailto:contact@omniragency.com" style={{display:'block',fontFamily:'JetBrains Mono,monospace',fontSize:'12px',color:'rgba(47,199,214,0.6)',textDecoration:'none',marginTop:'16px',transition:'color 0.15s'}}
              onMouseEnter={e=>e.currentTarget.style.color='rgba(47,199,214,1)'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(47,199,214,0.6)'}>
              contact@omniragency.com
            </a>
          </div>
        </div>
        <div style={{paddingTop:'24px',borderTop:'1px solid rgba(255,255,255,0.05)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
          <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:'rgba(255,255,255,0.18)',margin:0}}>© 2026 Omnira by SETTE inc. · Automatisation des appels pour PME</p>
          <div style={{display:'flex',gap:'24px'}}>
            {[['Confidentialité','/confidentialite'],['CGU','/cgu'],['Mentions légales','/mentions-legales']].map(([l,h])=>(
              <a key={l} href={h} style={{fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.2)',textDecoration:'none',transition:'color 0.15s'}}
                onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.5)'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.2)'}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;

// stubs
window.Pricing  = () => null;
window.Contact  = () => null;
window.Founders = () => null;
