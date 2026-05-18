// ─── /receptionniste-ia-garage ───────────────────────────────────────────────

// ─── NAV ──────────────────────────────────────────────────────────────────────
function PageNav() {
  const [sc, setSc] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setSc(window.scrollY > 30);
    window.addEventListener('scroll', fn, {passive:true});
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:50,transition:'all 0.3s ease',
      background:sc?'rgba(255,255,255,0.97)':'rgba(11,23,38,0.9)',backdropFilter:'blur(20px)',
      borderBottom:sc?`1px solid ${B.border}`:'1px solid rgba(255,255,255,0.08)',padding:'0 24px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
          <img src="../uploads/omnira-logo-transparent.png" alt="Omnira"
            style={{height:'28px',filter:sc?'saturate(1.1)':'brightness(1.15) drop-shadow(0 0 8px rgba(47,199,214,0.4))'}}
            onError={e=>e.target.style.display='none'}/>
          <span style={{fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:'17px',color:sc?B.tMain:'white'}}>Omnira</span>
        </a>
        <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
          <a href="/" style={{fontFamily:'Inter,sans-serif',fontSize:'13px',fontWeight:500,
            color:sc?B.tMuted:'rgba(255,255,255,0.55)',textDecoration:'none',transition:'color 0.15s'}}
            onMouseEnter={e=>e.currentTarget.style.color=sc?B.tMain:'white'}
            onMouseLeave={e=>e.currentTarget.style.color=sc?B.tMuted:'rgba(255,255,255,0.55)'}>
            Accueil
          </a>
          <GBtn href="/#contact" variant="primary" size="sm">Tester le réceptionniste IA</GBtn>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function SEOHero() {
  const badges = [
    "Mise en place en 48h, rien à changer de votre côté",
    "L'humain reste présent sur les cas importants",
    "Déjà utilisé par des garages en France",
  ];
  return (
    <section style={{padding:'120px 24px 80px',background:B.bgD,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'-5%',left:'50%',transform:'translateX(-50%)',width:'900px',height:'500px',
        background:'radial-gradient(ellipse,rgba(30,115,216,0.1),transparent 70%)',pointerEvents:'none'}}/>
      <div style={{maxWidth:'1000px',margin:'0 auto',position:'relative',zIndex:1}}>
        <FadeIn>
          <nav aria-label="Fil d'Ariane" style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'28px'}}>
            <a href="/" style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',
              color:'rgba(255,255,255,0.3)',textDecoration:'none',transition:'color 0.15s'}}
              onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.7)'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.3)'}>
              Accueil
            </a>
            <span style={{color:'rgba(255,255,255,0.18)',fontSize:'12px'}}>›</span>
            <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:B.cyan}}>
              Réceptionniste IA pour garage
            </span>
          </nav>
        </FadeIn>
        <FadeIn delay={0.05}>
          <div style={{marginBottom:'20px'}}><Chip color={B.cyan}>Réceptionniste IA · Garages indépendants</Chip></div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(30px,4.2vw,54px)',fontWeight:800,
            color:'white',lineHeight:1.1,letterSpacing:'-0.024em',marginBottom:'24px',maxWidth:'840px'}}>
            Réceptionniste IA pour garage : ne perdez plus un seul appel client
          </h1>
        </FadeIn>
        <FadeIn delay={0.13}>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'18px',lineHeight:1.7,
            color:'rgba(255,255,255,0.62)',marginBottom:'12px',maxWidth:'660px'}}>
            Votre garage décroche, qualifie et filtre les appels — même quand toute l'équipe est sous les voitures.
          </p>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'15px',lineHeight:1.7,
            color:'rgba(255,255,255,0.42)',marginBottom:'40px',maxWidth:'580px'}}>
            Un client appelle pour une vidange. L'atelier est plein. Personne ne décroche.
            Il appelle le garage d'à côté. Omnira évite ça — sans remplacer votre équipe, sans changer votre numéro.
          </p>
        </FadeIn>
        <FadeIn delay={0.18}>
          <div style={{display:'flex',flexWrap:'wrap',gap:'12px',marginBottom:'44px'}}>
            <GBtn href="/#contact" variant="primary" size="lg">Tester le réceptionniste IA</GBtn>
            <GBtn href="/#demo" variant="outline" size="lg">Écouter une démo d'appel</GBtn>
          </div>
        </FadeIn>
        <FadeIn delay={0.22}>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {badges.map(t => (
              <div key={t} style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <div style={{width:'20px',height:'20px',borderRadius:'50%',flexShrink:0,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  background:'rgba(47,199,214,0.12)',color:B.cyan}}>
                  <Ico.Check/>
                </div>
                <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.48)'}}>{t}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── PROBLEM ──────────────────────────────────────────────────────────────────
const PROB_STATS = [
  {val:'3 à 4', unit:"appels/semaine", label:"non décrochés dans un garage moyen"},
  {val:'220 €', unit:"panier moyen",   label:"par intervention, voitures particulières"},
  {val:'16 000 €', unit:"de CA/an",    label:"perdus à cause des appels manqués"},
];

function ProblemSection() {
  return (
    <section style={{padding:'96px 24px',background:B.bgW}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Le problème"
            chipColor={B.blue}
            title="Pourquoi les garages ratent<br/>autant d'appels ?"
            sub="La réponse est simple : le téléphone sonne au pire moment."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',alignItems:'start'}} className="p2col">
          <FadeIn>
            <div>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'16px',lineHeight:1.85,color:B.tMuted,marginBottom:'20px'}}>
                Le lundi matin à 8h15, vous avez trois voitures qui arrivent en même temps, un fournisseur sur l'autre ligne et deux clients au comptoir. Le téléphone sonne. Personne ne peut décrocher. La personne raccroche. Elle ne rappelle pas. Elle appelle le garage voisin.
              </p>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'16px',lineHeight:1.85,color:B.tMuted,marginBottom:'20px'}}>
                Ce scénario se répète plusieurs fois par jour dans la plupart des garages indépendants. Ce n'est pas un problème de mauvaise volonté — c'est structurel : dans un atelier de 4 à 10 personnes, tout le monde a les mains occupées.
              </p>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'16px',lineHeight:1.85,color:B.tMuted}}>
                Les pics d'appels se concentrent précisément sur les moments où l'équipe est la moins disponible : l'ouverture du matin, la pause déjeuner, la fermeture en fin de journée, et le samedi matin. Un appel manqué hors horaires ne laisse généralement pas de message. Le client passe à autre chose — la demande disparaît sans laisser de trace.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              {PROB_STATS.map(({val,unit,label}) => (
                <div key={label} style={{padding:'28px',borderRadius:'20px',background:B.bgL,
                  border:`1px solid ${B.border}`,boxShadow:B.shadow}}>
                  <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'34px',fontWeight:700,
                    color:B.blue,lineHeight:1,marginBottom:'4px'}}>{val}</p>
                  <p style={{fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,
                    color:B.tMuted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'4px'}}>{unit}</p>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMuted}}>{label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── SOLUTION ─────────────────────────────────────────────────────────────────
const SOLUTION_ITEMS = [
  {
    num:'01', icon:'Phone',
    title:"Il décroche quand vous ne pouvez pas répondre",
    desc:"Dès que votre ligne n'est pas prise, Omnira intervient. Pendant les heures d'ouverture quand tout le monde est occupé, mais aussi le soir, le week-end et les jours fériés. Le client ne tombe pas sur un répondeur qui dit « laissez un message ». Il tombe sur quelque chose qui lui répond vraiment.",
  },
  {
    num:'02', icon:'Filter',
    title:"Il qualifie chaque demande",
    desc:"Omnira pose les questions utiles : nom, numéro de téléphone, marque et modèle du véhicule, motif de l'appel. Une demande de vidange, un devis freins, une panne, une révision avant contrôle technique — chaque demande est identifiée et catégorisée correctement avant d'être transmise à l'équipe.",
  },
  {
    num:'03', icon:'Zap',
    title:"Il filtre les urgences",
    desc:"Omnira identifie les situations urgentes — véhicule immobilisé, panne en route, problème de sécurité — et les fait remonter immédiatement en priorité. Un client dont la voiture ne démarre pas n'attend pas comme celui qui appelle pour prendre rendez-vous dans deux semaines.",
  },
  {
    num:'04', icon:'Calendar',
    title:"Il prend ou prépare les rendez-vous",
    desc:"Omnira peut proposer des créneaux disponibles et confirmer un rendez-vous directement, ou préparer une demande structurée que votre équipe valide avant de rappeler. Dans tous les cas, le client ne raccroche pas dans le vide — il sait qu'on va le rappeler.",
  },
  {
    num:'05', icon:'Chart',
    title:"Il transmet un résumé clair à l'équipe",
    desc:"Chaque appel donne lieu à une fiche récapitulative envoyée à votre téléphone en temps réel : nom du client, motif, niveau d'urgence, informations véhicule, et la transcription de l'échange. Votre équipe rappelle avec tout le contexte — pas besoin de redemander pourquoi la personne a appelé.",
  },
];

function SolutionSection() {
  return (
    <section style={{padding:'96px 24px',background:B.bgL}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Ce que fait Omnira"
            chipColor={B.blue}
            title="Ce que fait un réceptionniste IA<br/>pour votre garage"
            sub="Omnira n'est pas un répondeur automatique. C'est un réceptionniste qui décroche à votre place, comprend ce que le client veut, et vous transmet une fiche claire."
          />
        </FadeIn>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          {SOLUTION_ITEMS.map(({num,icon,title,desc},i) => {
            const Icon = Ico[icon];
            const featured = i === 2;
            return (
              <FadeIn key={num} delay={i*0.07}>
                <div style={{display:'grid',gridTemplateColumns:'72px 1fr',gap:'24px',padding:'32px',
                  borderRadius:'20px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow,
                  transition:'all 0.22s',position:'relative',overflow:'hidden'}} className="psteps"
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 16px 48px rgba(16,63,115,0.12)';e.currentTarget.style.transform='translateY(-2px)';}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.transform='translateY(0)';}}>
                  {featured && <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:B.grad}}/>}
                  <div style={{display:'flex',justifyContent:'center',paddingTop:'4px'}}>
                    <div style={{width:'52px',height:'52px',borderRadius:'16px',flexShrink:0,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      background:featured?B.grad:'rgba(30,115,216,0.07)',
                      border:featured?'none':'1.5px solid rgba(30,115,216,0.18)',
                      boxShadow:featured?'0 8px 24px rgba(30,115,216,0.3)':'none',
                      color:featured?'white':B.blue}}>
                      <Icon/>
                    </div>
                  </div>
                  <div>
                    <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'12px',marginBottom:'10px'}}>
                      <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'16px',fontWeight:700,color:B.tMain,margin:0}}>{title}</h3>
                      <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',padding:'3px 10px',
                        borderRadius:'99px',fontWeight:600,flexShrink:0,
                        background:'rgba(47,199,214,0.1)',color:B.cyan,border:'1px solid rgba(47,199,214,0.22)'}}>{num}</span>
                    </div>
                    <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:B.tMuted,lineHeight:1.75,margin:0}}>{desc}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
        <FadeIn delay={0.4}>
          <div style={{textAlign:'center',marginTop:'48px'}}>
            <GBtn href="/#contact" variant="primary" size="lg">Tester le réceptionniste IA</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── EXEMPLES D'APPELS ────────────────────────────────────────────────────────
const EXAMPLES = [
  {
    tag:"Samedi 8h30", context:"Vidange — atelier déjà chargé",
    result:"Fiche envoyée · Rappel confirmé dans la matinée",
    color:B.blue,
    text:"L'atelier ouvre mais tout le monde est déjà sur des voitures. Omnira décroche, note le nom, le véhicule, le motif, et propose de rappeler dans la matinée pour confirmer un créneau. Le client raccroche satisfait. Le gérant reçoit la fiche sur son téléphone.",
  },
  {
    tag:"19h15 — garage fermé", context:"Devis freins — hors horaires",
    result:"Demande enregistrée · Rappel le lendemain matin",
    color:B.cyan,
    text:"Le garage est fermé. Omnira décroche quand même, recueille les informations et prévient le client qu'un collaborateur le rappellera le lendemain matin. La demande ne disparaît pas.",
  },
  {
    tag:"Lundi matin — urgent", context:"Voiture immobilisée — panne",
    result:"Alerte immédiate · Rappel gérant en 5 minutes",
    color:"#f87171",
    text:"L'atelier est en pleine réunion. Omnira identifie la situation comme urgente, extrait les informations clés et envoie immédiatement une alerte au gérant avec la mention « véhicule immobilisé ». Le gérant rappelle dans les 5 minutes.",
  },
  {
    tag:"En journée", context:"Suivi de véhicule en réparation",
    result:"Demande transmise · Équipe non interrompue",
    color:B.lcyan,
    text:"Omnira recueille le nom et le numéro de plaque, et indique qu'il va transmettre la demande à l'équipe pour un rappel sous une heure. L'équipe n'est pas interrompue en plein travail pour une information qui peut attendre.",
  },
  {
    tag:"Semaine normale", context:"Contrôle technique — prise de RDV",
    result:"RDV préparé · Client informé",
    color:B.blue,
    text:"Omnira note le motif, le véhicule, la date souhaitée et les coordonnées. La demande arrive dans le tableau de bord de l'équipe avec tout le contexte pour rappeler et proposer un créneau.",
  },
  {
    tag:"12h45 — pause déjeuner", context:"Révision 60 000 km",
    result:"Appel capté · Rappel début d'après-midi",
    color:B.cyan,
    text:"Personne ne décroche habituellement à cette heure-là. Omnira prend l'appel, qualifie la demande et transmet la fiche pour que l'équipe rappelle en début d'après-midi.",
  },
];

function ExamplesSection() {
  return (
    <section style={{padding:'96px 24px',background:B.bgD,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 50% at 50% 50%,rgba(30,115,216,0.06),transparent 70%)',pointerEvents:'none'}}/>
      <div style={{maxWidth:'1100px',margin:'0 auto',position:'relative',zIndex:1}}>
        <FadeIn>
          <SectionHeader
            light
            chip="Cas concrets"
            chipColor={B.cyan}
            title="Exemples d'appels<br/>qu'Omnira peut traiter"
            sub="Six situations typiques d'un garage indépendant. Dans chaque cas, votre équipe n'a rien eu à faire — et le client a obtenu une réponse immédiate."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px'}} className="p3col">
          {EXAMPLES.map(({tag,context,result,color,text},i) => (
            <FadeIn key={i} delay={i*0.07}>
              <div style={{padding:'28px',borderRadius:'20px',background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.08)',height:'100%',
                transition:'all 0.22s',cursor:'default'}}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.07)';e.currentTarget.style.transform='translateY(-3px)';}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.transform='translateY(0)';}}>
                <div style={{marginBottom:'16px'}}>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',fontWeight:600,
                    textTransform:'uppercase',letterSpacing:'0.12em',
                    color:color,background:`${color}18`,border:`1px solid ${color}28`,
                    padding:'3px 10px',borderRadius:'99px'}}>{tag}</span>
                </div>
                <p style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,
                  color:'white',marginBottom:'10px'}}>{context}</p>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',lineHeight:1.7,
                  color:'rgba(255,255,255,0.45)',marginBottom:'20px',flex:1}}>{text}</p>
                <div style={{paddingTop:'16px',borderTop:'1px solid rgba(255,255,255,0.08)',
                  display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:'18px',height:'18px',borderRadius:'50%',flexShrink:0,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    background:`${color}20`,color}}><Ico.Check/></div>
                  <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',
                    fontWeight:600,color}}>{result}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPARAISON ──────────────────────────────────────────────────────────────
const COMP_REPONDEUR = [
  "Environ 40 % des appelants raccrochent sans laisser de message",
  "Les messages laissés sont souvent incomplets ou sans contexte",
  "Le client pense « je rappellerai plus tard » — et ne rappelle pas",
  "Le gérant écoute des messages en fin de journée pendant 20 minutes",
  "Aucune information sur l'urgence ou le motif",
  "Zéro qualification : vous ne savez pas ce que vous avez manqué",
];
const COMP_OMNIRA = [
  "L'agent engage une vraie conversation et pose les bonnes questions",
  "Nom, numéro, véhicule, motif, urgence — tout est capté correctement",
  "Le client sait que sa demande est prise en compte, il attend le rappel",
  "Fiche structurée transmise en temps réel sur votre téléphone",
  "Niveau d'urgence évalué : véhicule immobilisé, panne, question simple",
  "Votre équipe rappelle avec tout le contexte disponible",
];

function ComparisonSection() {
  return (
    <section style={{padding:'96px 24px',background:B.bgW}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Comparaison"
            chipColor={B.blue}
            title="Réceptionniste IA ou simple répondeur :<br/>quelle différence ?"
            sub="Un répondeur dit : « laissez un message après le bip ». Un réceptionniste IA fait autre chose."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px'}} className="p2col">
          <FadeIn>
            <div style={{padding:'32px',borderRadius:'24px',background:'#0B1726',border:'1px solid rgba(255,255,255,0.07)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'28px',
                paddingBottom:'20px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{width:'36px',height:'36px',borderRadius:'10px',background:'rgba(239,68,68,0.12)',
                  display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </div>
                <div>
                  <p style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:'white',margin:'0 0 2px'}}>Répondeur automatique</p>
                  <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'rgba(255,255,255,0.25)',margin:0}}>Ce que votre client entend aujourd'hui</p>
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                {COMP_REPONDEUR.map((t,i) => (
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                    <div style={{width:'18px',height:'18px',borderRadius:'50%',flexShrink:0,marginTop:'1px',
                      background:'rgba(239,68,68,0.12)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 5l2 2 3-4" stroke="#f87171" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.4)',lineHeight:1.6}}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{padding:'32px',borderRadius:'24px',
              background:'linear-gradient(135deg,rgba(30,115,216,0.08),rgba(47,199,214,0.05))',
              border:`1px solid rgba(47,199,214,0.22)`}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'28px',
                paddingBottom:'20px',borderBottom:`1px solid rgba(47,199,214,0.14)`}}>
                <div style={{width:'36px',height:'36px',borderRadius:'10px',background:`${B.grad}`,
                  display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
                  boxShadow:'0 4px 12px rgba(30,115,216,0.35)'}}>
                  <Ico.Check/>
                </div>
                <div>
                  <p style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:B.tMain,margin:'0 0 2px'}}>Réceptionniste IA Omnira</p>
                  <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:B.tMuted,margin:0}}>Ce que vos clients entendront avec Omnira</p>
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                {COMP_OMNIRA.map((t,i) => (
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                    <div style={{width:'18px',height:'18px',borderRadius:'50%',flexShrink:0,marginTop:'1px',
                      background:'rgba(47,199,214,0.12)',color:B.cyan,
                      display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <Ico.Check/>
                    </div>
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMain,lineHeight:1.6,fontWeight:500}}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── POUR QUI ─────────────────────────────────────────────────────────────────
const FOR_WHO = [
  {
    icon:'Phone', tag:"Cible principale",
    title:"Garages indépendants et ateliers MRA",
    desc:"Entre 3 et 15 salariés, téléphone géré par « celui qui peut décrocher », douleur quotidienne sur les appels manqués. C'est exactement pour eux qu'Omnira a été conçu.",
    highlight:true,
  },
  {
    icon:'Zap', tag:"Fort potentiel",
    title:"Garages sans réceptionniste",
    desc:"Quand c'est le gérant ou un mécanicien qui gère les appels en parallèle de l'atelier, chaque coup de fil est une interruption. Omnira filtre ce qui peut attendre, et ne remonte que ce qui mérite attention.",
  },
  {
    icon:'Calendar', tag:"Complément idéal",
    title:"Garages avec réceptionniste à mi-temps",
    desc:"Omnira couvre les plages non travaillées — le mercredi, le vendredi après-midi, les congés — sans avoir à chercher un remplaçant.",
  },
  {
    icon:'Filter', tag:"Volume d'appels",
    title:"Centres auto et spécialistes",
    desc:"Beaucoup d'appels pour des demandes standardisées : prix pneus, disponibilité d'un créneau, horaires. Omnira traite ces demandes sans mobiliser l'équipe.",
  },
  {
    icon:'Shield', tag:"Processus structurés",
    title:"Agents de marque et réparateurs agréés",
    desc:"Structures avec des processus plus formalisés, qui peuvent utiliser Omnira sur les plages horaires non couvertes ou en appui de leur accueil existant.",
  },
];

function ForWhoSection() {
  return (
    <section style={{padding:'96px 24px',background:B.bgL}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Pour qui"
            chipColor={B.blue}
            title="Pour quels types<br/>de garages ?"
            sub="Omnira s'adapte à différentes configurations. Voici les profils qui en tirent le plus de valeur."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px'}} className="p3col">
          {FOR_WHO.map(({icon,tag,title,desc,highlight},i) => {
            const Icon = Ico[icon];
            return (
              <FadeIn key={i} delay={i*0.07}>
                <div style={{padding:'28px',borderRadius:'20px',height:'100%',
                  background:highlight?B.bgD:B.bgW,
                  border:highlight?'1px solid rgba(47,199,214,0.2)':`1px solid ${B.border}`,
                  boxShadow:highlight?'0 16px 48px rgba(0,0,0,0.2)':B.shadow}}>
                  <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
                    <div style={{width:'40px',height:'40px',borderRadius:'12px',flexShrink:0,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      background:highlight?B.grad:'rgba(30,115,216,0.07)',
                      border:highlight?'none':`1px solid ${B.border}`,
                      color:highlight?'white':B.blue,
                      boxShadow:highlight?'0 6px 16px rgba(30,115,216,0.35)':'none'}}>
                      <Icon/>
                    </div>
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',fontWeight:600,
                      textTransform:'uppercase',letterSpacing:'0.1em',
                      color:highlight?B.cyan:B.tMuted}}>{tag}</span>
                  </div>
                  <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'15px',fontWeight:700,
                    color:highlight?'white':B.tMain,marginBottom:'10px'}}>{title}</h3>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',lineHeight:1.7,
                    color:highlight?'rgba(255,255,255,0.45)':B.tMuted}}>{desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── MISE EN PLACE ────────────────────────────────────────────────────────────
const SETUP_STEPS = [
  {
    num:'01', tag:'30 minutes', title:"On comprend comment fonctionne votre garage",
    desc:"Un échange pour identifier les types d'appels que vous recevez, les questions fréquentes, ce que vous voulez qu'Omnira traite seul et ce qu'il doit toujours remonter à un humain.",
  },
  {
    num:'02', tag:'Configuration', title:"On configure l'agent",
    desc:"Nom, voix, scripts d'accueil, arbre de qualification. L'agent apprend le vocabulaire de votre garage : vos marques habituelles, vos prestations, vos horaires, votre façon de gérer les urgences.",
  },
  {
    num:'03', tag:'Aucun changement', title:"On connecte votre ligne",
    desc:"Pas de changement de numéro. Le renvoi d'appel est activé selon vos règles : quand la ligne est occupée, après deux sonneries, à partir de 18h, ou en permanence le week-end. Vous gardez le contrôle total.",
  },
  {
    num:'04', tag:'Tests réels', title:"On teste ensemble",
    desc:"Avant de lancer, on simule des appels réels pour s'assurer que l'agent répond correctement à vos cas d'usage. Les ajustements sont faits à ce stade.",
  },
  {
    num:'05', tag:'J+1', title:"Mise en production",
    desc:"L'agent est opérationnel. Vous recevez les fiches sur votre téléphone. On reste disponibles les premiers jours pour affiner si nécessaire. En général, moins de 48h entre le premier échange et l'activation.",
  },
];

function SetupSection() {
  return (
    <section style={{padding:'96px 24px',background:B.bgW}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Mise en place"
            chipColor={B.blue}
            title="Opérationnel en 48 heures.<br/>Sans rien changer de votre côté."
            sub="Pas de formation, pas de migration, pas de prérequis technique. On configure tout ensemble — vous repartez avec un agent actif le jour même."
          />
        </FadeIn>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          {SETUP_STEPS.map(({num,tag,title,desc},i) => (
            <FadeIn key={num} delay={i*0.08}>
              <div style={{display:'grid',gridTemplateColumns:'72px 1fr',gap:'24px',padding:'28px 32px',
                borderRadius:'20px',background:B.bgL,border:`1px solid ${B.border}`,
                boxShadow:B.shadow,transition:'all 0.22s',position:'relative'}} className="psteps"
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 12px 40px rgba(16,63,115,0.1)';e.currentTarget.style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.transform='translateY(0)';}}>
                <div style={{display:'flex',justifyContent:'center',paddingTop:'2px'}}>
                  <div style={{width:'52px',height:'52px',borderRadius:'16px',flexShrink:0,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    background:i===4?B.grad:'rgba(30,115,216,0.07)',
                    border:i===4?'none':'1.5px solid rgba(30,115,216,0.18)',
                    boxShadow:i===4?'0 8px 24px rgba(30,115,216,0.3)':'none',
                    color:i===4?'white':B.blue}}>
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'12px',fontWeight:700}}>{num}</span>
                  </div>
                </div>
                <div>
                  <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
                    <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'15px',fontWeight:700,color:B.tMain,margin:0}}>{title}</h3>
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',padding:'3px 10px',
                      borderRadius:'99px',fontWeight:600,background:'rgba(47,199,214,0.1)',
                      color:B.cyan,border:'1px solid rgba(47,199,214,0.22)',flexShrink:0}}>{tag}</span>
                  </div>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:B.tMuted,lineHeight:1.7,margin:0}}>{desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.45}>
          <div style={{textAlign:'center',marginTop:'44px'}}>
            <GBtn href="/#contact" variant="primary" size="lg">Démarrer la configuration</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── ROI ──────────────────────────────────────────────────────────────────────
function ROISection() {
  return (
    <section style={{padding:'96px 24px',background:B.bgD2,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 55% 45% at 50% 50%,rgba(30,115,216,0.08),transparent 70%)',pointerEvents:'none'}}/>
      <div style={{maxWidth:'900px',margin:'0 auto',position:'relative',zIndex:1}}>
        <FadeIn>
          <SectionHeader
            light
            chip="Calculez votre manque à gagner"
            chipColor={B.cyan}
            title="Combien vous coûtent<br/>vos appels manqués ?"
            sub="La plupart des gérants de garage sous-estiment ce chiffre — parce qu'un appel manqué ne laisse pas de trace visible."
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{padding:'40px',borderRadius:'28px',
            background:'linear-gradient(135deg,rgba(30,115,216,0.12),rgba(47,199,214,0.06))',
            border:'1px solid rgba(47,199,214,0.18)',marginBottom:'32px'}}>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'16px',lineHeight:1.85,
              color:'rgba(255,255,255,0.55)',marginBottom:'32px'}}>
              À 3 rendez-vous perdus par semaine et un panier moyen de 200 à 300 euros, un garage de taille moyenne peut perdre entre <strong style={{color:'white'}}>10 000 et 20 000 euros de chiffre d'affaires par an</strong> — juste parce que le téléphone n'a pas été décroché au bon moment.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}} className="p3col">
              {[
                {val:'3–4', label:"appels manqués / semaine", sub:"estimation conservatrice"},
                {val:'220 €', label:"panier moyen", sub:"voitures particulières"},
                {val:'16 000 €', label:"de CA perdus / an", sub:"sur 52 semaines"},
              ].map(({val,label,sub}) => (
                <div key={label} style={{padding:'20px',borderRadius:'16px',
                  background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',
                  textAlign:'center'}}>
                  <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'28px',fontWeight:700,
                    color:'white',lineHeight:1,marginBottom:'6px'}}>{val}</p>
                  <p style={{fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,
                    color:B.cyan,marginBottom:'2px'}}>{label}</p>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'11px',
                    color:'rgba(255,255,255,0.3)'}}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{padding:'28px 32px',borderRadius:'20px',
            background:'rgba(30,115,216,0.08)',border:'1px solid rgba(30,115,216,0.2)',
            display:'flex',justifyContent:'space-between',alignItems:'center',
            flexWrap:'wrap',gap:'20px'}}>
            <div>
              <p style={{fontFamily:'Sora,sans-serif',fontSize:'15px',fontWeight:700,color:'white',marginBottom:'4px'}}>
                Calculer le coût réel dans votre garage
              </p>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.42)',margin:0}}>
                Utilisez notre simulateur interactif pour voir ce qu'Omnira peut récupérer pour vous.
              </p>
            </div>
            <GBtn href="/#roi" variant="primary" size="md">Calculer mes appels perdus</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q:"Est-ce que je dois changer mon numéro de téléphone ?",
    a:"Non. Votre numéro reste exactement le même. Omnira fonctionne en renvoi d'appel : quand la ligne est occupée ou que personne ne décroche, l'appel est redirigé vers l'agent. Vos clients composent le même numéro qu'avant. Rien ne change pour eux côté numérotation.",
  },
  {
    q:"Est-ce que l'agent peut transférer l'appel à un humain ?",
    a:"Oui, c'est même l'un des principes fondamentaux d'Omnira. Certaines situations ne doivent pas être gérées par un agent automatique — un client énervé, un litige, une urgence qui nécessite une décision immédiate. Dans ces cas, Omnira peut transférer en direct à votre ligne principale ou à un membre de l'équipe. Vous définissez les règles au moment de la configuration.",
  },
  {
    q:"Est-ce que ça fonctionne en dehors des heures d'ouverture ?",
    a:"Oui, c'est même l'un des cas d'usage les plus utiles. Le soir, le week-end, les jours fériés — Omnira peut être actif en permanence ou uniquement sur les plages que vous choisissez. Un client qui appelle à 20h ne tombe plus sur un répondeur muet. Il est accueilli, sa demande est enregistrée, et votre équipe retrouve une fiche propre le lendemain matin.",
  },
  {
    q:"Est-ce que l'agent peut prendre des rendez-vous directement ?",
    a:"Oui, selon la configuration choisie. Omnira peut être connecté à votre calendrier pour proposer des créneaux disponibles et confirmer un rendez-vous immédiatement. Il peut aussi fonctionner en mode « pré-qualification » : il recueille la demande et c'est votre équipe qui rappelle pour valider le créneau. À vous de choisir ce qui correspond le mieux à votre organisation.",
  },
  {
    q:"Est-ce que c'est adapté à un petit garage de 2 ou 3 personnes ?",
    a:"Oui, et souvent encore plus utile que dans un grand garage. Dans une petite structure, il n'y a généralement pas de réceptionniste dédié. C'est le gérant ou un mécanicien qui gère les appels en plus du reste. Omnira prend en charge ce volume sans que personne n'ait besoin de s'arrêter de travailler.",
  },
  {
    q:"Que se passe-t-il si la demande est trop complexe pour l'agent ?",
    a:"Omnira est configuré pour reconnaître ses limites. Si une demande sort du périmètre défini — une réclamation délicate, une question technique très précise, une situation inhabituelle — l'agent n'invente pas de réponse. Il indique au client qu'un membre de l'équipe va le rappeler pour traiter le sujet en détail. La demande est transmise avec une mention spécifique.",
  },
  {
    q:"Les clients savent-ils qu'ils parlent à une IA ?",
    a:"En France, la réglementation impose d'informer les appelants qu'ils peuvent interagir avec un système automatisé. Omnira intègre cette information en début d'appel, formulée de façon naturelle et non anxiogène. Dans la pratique, la plupart des clients qui appellent pour une demande simple n'ont aucune difficulté avec ça. Ce qui compte pour eux, c'est que leur appel soit pris en charge correctement.",
  },
  {
    q:"Combien de temps faut-il pour mettre Omnira en place ?",
    a:"En général, moins de 48 heures entre la première conversation et l'activation de l'agent sur votre ligne. Le processus est simple : un appel de configuration, la création des scripts adaptés à votre garage, le paramétrage du renvoi d'appel, et une série de tests avant la mise en production. Vous n'avez rien à installer, rien à configurer de votre côté. On s'en occupe.",
  },
];

function FAQSection() {
  return (
    <section style={{padding:'96px 24px',background:B.bgW}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="FAQ"
            chipColor={B.blue}
            title="Questions fréquentes"
            sub="Tout ce que vous devez savoir avant de tester Omnira dans votre garage."
          />
        </FadeIn>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {FAQ_ITEMS.map(({q,a},i) => (
            <FadeIn key={i} delay={i*0.05}>
              <div style={{padding:'28px 32px',borderRadius:'20px',background:B.bgL,
                border:`1px solid ${B.border}`,boxShadow:B.shadow}}>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'15px',fontWeight:700,
                  color:B.tMain,marginBottom:'12px',lineHeight:1.4}}>{q}</h3>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',lineHeight:1.75,
                  color:B.tMuted,margin:0}}>{a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA FINAL ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section style={{padding:'96px 24px',background:B.bgD,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 50% at 50% 50%,rgba(30,115,216,0.1),transparent 70%)',pointerEvents:'none'}}/>
      <div style={{maxWidth:'720px',margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
        <FadeIn>
          <div style={{marginBottom:'20px'}}><Chip color={B.cyan}>Démo gratuite</Chip></div>
          <h2 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(28px,3.8vw,44px)',fontWeight:800,
            color:'white',lineHeight:1.1,letterSpacing:'-0.022em',marginBottom:'20px'}}>
            Voir si Omnira peut répondre<br/>aux appels de votre garage
          </h2>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'16px',lineHeight:1.75,
            color:'rgba(255,255,255,0.48)',marginBottom:'16px',maxWidth:'560px',margin:'0 auto 16px'}}>
            La meilleure façon de comprendre comment Omnira fonctionne, c'est de l'entendre en situation réelle — pas de lire une brochure.
          </p>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',lineHeight:1.7,
            color:'rgba(255,255,255,0.32)',marginBottom:'40px',maxWidth:'480px',margin:'0 auto 40px'}}>
            Pas d'engagement, pas de contrat à signer. Juste une demi-heure pour voir si ça correspond à ce dont votre garage a besoin.
          </p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'14px',justifyContent:'center'}}>
            <GBtn href="/#contact" variant="primary" size="lg">Tester le réceptionniste IA</GBtn>
            <GBtn href="/#demo" variant="outline" size="lg">Écouter une démo d'appel</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function PageFooter() {
  return (
    <footer style={{padding:'40px 24px',background:B.bgFoot}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',display:'flex',
        flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:'20px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img src="../uploads/omnira-logo-transparent.png" alt="Omnira"
            style={{height:'22px',filter:'brightness(1.1) drop-shadow(0 0 6px rgba(47,199,214,0.3))'}}
            onError={e=>e.target.style.display='none'}/>
          <span style={{fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:'14px',color:'white'}}>Omnira</span>
        </div>
        <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.2)',margin:0}}>
          Réceptionniste IA pour garages indépendants — contact@omniragency.com
        </p>
        <a href="/" style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',
          color:'rgba(255,255,255,0.28)',textDecoration:'none',transition:'color 0.15s'}}
          onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.6)'}
          onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.28)'}>
          ← Retour à l'accueil
        </a>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function PageApp() {
  return (
    <div>
      <PageNav/>
      <SEOHero/>
      <ProblemSection/>
      <SolutionSection/>
      <ExamplesSection/>
      <ComparisonSection/>
      <ForWhoSection/>
      <SetupSection/>
      <ROISection/>
      <FAQSection/>
      <FinalCTA/>
      <PageFooter/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PageApp/>);
