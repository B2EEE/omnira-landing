// ─── SCENARIOS (5 sectors) ────────────────────────────────────────────────────
const SECTORS = [
  {
    id: 'garage',
    Icon: Ico.Car,
    label: 'Garage / Centre auto',
    color: B.blue,
    items: ['Prise de rendez-vous', 'Demande de devis', 'Urgence panne', 'Suivi véhicule', "Transfert vers l'atelier"],
    example: "Un client appelle pour un changement de freins. L'agent identifie le véhicule, collecte les informations, prépare la demande de devis et transmet un résumé à l'équipe — sans interrompre l'atelier.",
  },
  {
    id: 'restaurant',
    Icon: Ico.Utensils,
    label: 'Restaurant',
    color: B.cyan,
    items: ['Réservation de table', 'Modification de réservation', 'Questions fréquentes', 'Groupe ou événement', 'Transfert si demande spéciale'],
    example: "Un client souhaite réserver pour 6 personnes samedi soir. L'agent prend les informations, note la demande et la transmet à l'équipe avec le récapitulatif complet.",
  },
  {
    id: 'artisan',
    Icon: Ico.Wrench,
    label: 'Artisan / Service local',
    color: B.lcyan,
    items: ['Qualification du besoin', 'Adresse du chantier', 'Urgence ou non urgence', 'Préparation d\'une demande de devis', 'Rappel structuré'],
    example: "Un client signale une fuite. L'agent évalue l'urgence, collecte l'adresse et les détails, classe la demande et transmet à l'artisan disponible.",
  },
  {
    id: 'cabinet',
    Icon: Ico.Briefcase,
    label: 'Cabinet / Centre de service',
    color: B.blue,
    items: ["Demande d'information", 'Prise de rendez-vous', 'Qualification de la demande', 'Rappel', 'Transmission à la bonne personne'],
    example: "Un patient souhaite un rendez-vous. L'agent identifie le motif, vérifie les disponibilités et crée la demande structurée pour le bon interlocuteur.",
  },
  {
    id: 'immo',
    Icon: Ico.Home,
    label: 'Immobilier / Agence locale',
    color: B.cyan,
    items: ['Qualification prospect', 'Type de bien recherché', 'Budget', 'Disponibilités', 'Demande de rappel ou rendez-vous'],
    example: "Un prospect cherche un appartement 3 pièces. L'agent qualifie le profil, collecte budget et disponibilités, et transmet une fiche prospect complète à l'agent.",
  },
];

function Scenarios() {
  const [active, setActive] = React.useState(0);
  const sc = SECTORS[active];

  return (
    <section id="scenarios" style={{padding:'96px 24px',background:B.bgD}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Cas d'usage"
            chipColor={B.cyan}
            light
            title="Des scénarios adaptés à votre activité"
            sub="Omnira ne propose pas un agent générique. Les scénarios sont définis selon votre secteur et votre façon de travailler."
          />
        </FadeIn>

        {/* Sector tabs */}
        <FadeIn delay={0.05}>
          <div style={{display:'flex',flexWrap:'wrap',gap:'8px',marginBottom:'36px',justifyContent:'center'}}>
            {SECTORS.map((s,i)=>(
              <button key={s.id} onClick={()=>setActive(i)}
                style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 20px',borderRadius:'99px',fontSize:'13px',fontWeight:700,fontFamily:'Sora,sans-serif',border:'none',cursor:'pointer',transition:'all 0.2s ease',
                  background: active===i ? B.grad : 'rgba(255,255,255,0.05)',
                  color: active===i ? 'white' : 'rgba(255,255,255,0.45)',
                  boxShadow: active===i ? '0 6px 20px rgba(30,115,216,0.3)' : 'none',
                }}>
                <span style={{color:active===i?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.3)',display:'flex'}}><s.Icon/></span>
                {s.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Content */}
        <FadeIn delay={0.1}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',alignItems:'start'}} className="solution-grid">
            {/* Left: scenario items */}
            <div style={{borderRadius:'20px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.09)',boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
              <div style={{padding:'18px 24px',background:B.bgD2,display:'flex',alignItems:'center',gap:'12px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                <div style={{width:'32px',height:'32px',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',background:B.grad,color:'white',flexShrink:0}}>
                  <sc.Icon/>
                </div>
                <span style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:'white'}}>{sc.label}</span>
              </div>
              <div style={{padding:'20px 24px',background:'rgba(255,255,255,0.02)',display:'flex',flexDirection:'column',gap:'10px'}}>
                {sc.items.map((item,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 16px',borderRadius:'12px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <div style={{width:'22px',height:'22px',borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:`${sc.color}18`,border:`1px solid ${sc.color}28`}}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-5" stroke={sc.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:'rgba(255,255,255,0.7)',lineHeight:1.4}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: example */}
            <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
              <div style={{padding:'28px',borderRadius:'20px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',boxShadow:'0 12px 40px rgba(0,0,0,0.2)'}}>
                <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',textTransform:'uppercase',letterSpacing:'0.12em',color:sc.color,marginBottom:'14px'}}>Exemple de scénario</p>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:'rgba(255,255,255,0.65)',lineHeight:1.75,margin:0}}>{sc.example}</p>
              </div>
              <div style={{padding:'20px 24px',borderRadius:'16px',background:'rgba(30,115,216,0.06)',border:'1px solid rgba(30,115,216,0.18)',display:'flex',alignItems:'flex-start',gap:'14px'}}>
                <div style={{width:'32px',height:'32px',borderRadius:'10px',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(30,115,216,0.15)',color:B.blue}}>
                  <Ico.Settings/>
                </div>
                <div>
                  <p style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:'white',marginBottom:'4px'}}>Adapté à votre activité</p>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.4)',lineHeight:1.6,margin:0}}>Les scénarios, le vocabulaire et les règles de traitement sont cadrés avec vous lors de la mise en place.</p>
                </div>
              </div>
              <GBtn onClick={() => window.openCalModal('decouverte')} variant="outline" size="md" full>Voir ce qu'Omnira peut faire pour mon activité</GBtn>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.Scenarios = Scenarios;

// ─── SECTEUR LINKS (maillage interne) ─────────────────────────────────────────
const SECTEUR_PAGES = [
  {
    Icon: Ico.Home,
    label: 'Agences immobilières',
    desc: 'Qualification prospects acheteurs/vendeurs, RDV de visite, gestion hors horaires.',
    href: '/agent-vocal-ia-immobilier',
    color: B.blue,
  },
  {
    Icon: Ico.Shield,
    label: 'Courtiers en assurance',
    desc: 'Devis emprunteur, qualification IARD et orientation vers la spécialité appropriée.',
    href: '/agent-vocal-ia-courtier',
    color: B.cyan,
  },
  {
    Icon: Ico.Briefcase,
    label: 'Assurance & Mutuelle',
    desc: 'Sinistres, résiliations et mises à jour de contrat selon les scénarios autorisés.',
    href: '/agent-vocal-ia-assurance',
    color: B.lcyan,
  },
  {
    Icon: Ico.Car,
    label: 'Garages & Centres auto',
    desc: 'Devis, préparation de RDV atelier et urgences panne selon les scénarios autorisés.',
    href: '/agent-vocal-ia-garage',
    color: B.blue,
  },
  {
    Icon: Ico.Utensils,
    label: 'Restaurants',
    desc: 'Réservations, groupes, allergies, retards et annulations selon les règles du service.',
    href: '/agent-vocal-ia-restaurant',
    color: B.cyan,
  },
];

function SecteurLinks() {
  return (
    <section style={{padding:'64px 24px',background:B.bgL}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{marginBottom:'32px',textAlign:'center'}}>
          <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',textTransform:'uppercase',letterSpacing:'0.12em',color:'#155DA6',marginBottom:'10px'}}>Pages sectorielles</p>
          <h2 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(20px,2.5vw,28px)',fontWeight:800,color:B.tMain,letterSpacing:'-0.018em',lineHeight:1.2}}>
            Agent vocal IA adapté à votre secteur
          </h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:'14px'}} className="feat-grid">
          {SECTEUR_PAGES.map(({Icon,label,desc,href,color})=>(
            <a key={href} href={href}
              style={{display:'block',padding:'20px',borderRadius:'16px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow,textDecoration:'none',transition:'box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease'}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 12px 36px rgba(30,115,216,0.1)`;e.currentTarget.style.borderColor=`rgba(30,115,216,0.2)`;e.currentTarget.style.transform='translateY(-2px)';}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.borderColor=B.border;e.currentTarget.style.transform='translateY(0)';}}>
              <div style={{width:'36px',height:'36px',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',background:`${color}11`,border:`1.5px solid ${color}22`,color,marginBottom:'12px'}}>
                <Icon/>
              </div>
              <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:B.tMain,marginBottom:'6px',lineHeight:1.3}}>{label}</h3>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:B.tMuted,lineHeight:1.55,margin:'0 0 12px'}}>{desc}</p>
              <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'#155DA6',fontWeight:600}}>Voir la page →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
window.SecteurLinks = SecteurLinks;

// stubs
window.ForWho = () => null;
