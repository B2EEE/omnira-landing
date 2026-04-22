// ─── FOUNDERS (removed from page — kept for reference) ────────────────────────
function Founders() { return null; }
window.Founders = Founders;

// ─── PRICING ──────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: 'Essentiel',
    price: '149',
    desc: 'Pour démarrer sereinement et ne plus manquer aucun appel.',
    features: [
      'Décrochage automatique 24h/24',
      'Réponses aux questions fréquentes',
      'Capture des appels hors horaires',
      'Résumé quotidien par e-mail',
      'Mise en place en 15 minutes',
    ],
    cta: 'Démarrer',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '299',
    desc: 'La solution complète pour protéger votre planning et qualifier vos appels.',
    features: [
      'Tout l\'offre Essentiel',
      'Qualification des demandes',
      'Prise de rendez-vous automatique',
      'Résumés structurés par appel',
      'Tableau de bord en temps réel',
      'Intégration Google Calendar / CRM',
    ],
    cta: 'Choisir le Pro',
    highlight: true,
    badge: 'Recommandé',
  },
  {
    name: 'Sur-mesure',
    price: null,
    desc: 'Pour les groupes de garages et les besoins spécifiques.',
    features: [
      'Tout l\'offre Pro',
      'Configuration avancée personnalisée',
      'Intégrations spécifiques',
      'Onboarding dédié',
      'Support prioritaire',
      'SLA garanti',
    ],
    cta: 'Nous contacter',
    highlight: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" style={{padding:'96px 24px',background:B.bgL}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Offres"
            chipColor={B.blue}
            title="Un prix clair.<br/>Un résultat mesurable."
            sub="Commencez sur un périmètre défini, mesurez l'impact dès la première semaine, adaptez si besoin. Pas de surprise."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px',alignItems:'start'}} className="pricing-grid">
          {PLANS.map(({name,price,desc,features,cta,highlight,badge},i)=>(
            <FadeIn key={name} delay={i*0.08}>
              <div style={{borderRadius:'24px',overflow:'hidden',position:'relative',
                background: highlight ? B.bgD : B.bgW,
                border: highlight ? 'none' : `1px solid ${B.border}`,
                boxShadow: highlight ? '0 32px 72px rgba(11,23,38,0.3)' : B.shadow,
                transform: highlight ? 'scale(1.03)' : 'scale(1)',
              }}>
                {highlight && <>
                  <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 50% -10%,rgba(30,115,216,0.35),transparent 65%)`,pointerEvents:'none'}}/>
                  <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:B.grad}}/>
                </>}
                <div style={{padding:'32px 28px',position:'relative'}}>
                  {badge && (
                    <div style={{display:'inline-block',padding:'4px 14px',borderRadius:'99px',fontSize:'11px',fontWeight:700,fontFamily:'JetBrains Mono,monospace',background:B.grad,color:'white',marginBottom:'20px',boxShadow:'0 4px 14px rgba(30,115,216,0.35)'}}>
                      {badge}
                    </div>
                  )}
                  <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'20px',fontWeight:800,color:highlight?'white':B.tMain,marginBottom:'8px'}}>{name}</h3>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:highlight?'rgba(255,255,255,0.45)':B.tMuted,lineHeight:1.6,marginBottom:'24px'}}>{desc}</p>
                  <div style={{marginBottom:'28px'}}>
                    {price ? (
                      <div style={{display:'flex',alignItems:'baseline',gap:'4px'}}>
                        <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'42px',fontWeight:700,color:highlight?'white':B.tMain,lineHeight:1}}>{price}€</span>
                        <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:highlight?'rgba(255,255,255,0.4)':B.tMuted}}>/mois</span>
                      </div>
                    ) : (
                      <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'26px',fontWeight:700,color:highlight?'white':B.tMain}}>Sur devis</span>
                    )}
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'32px'}}>
                    {features.map(f=>(
                      <div key={f} style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                        <div style={{width:'18px',height:'18px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'1px',
                          background: highlight ? 'rgba(47,199,214,0.18)' : B.bgL,
                          color: highlight ? B.cyan : B.blue,
                          border: highlight ? `1px solid rgba(47,199,214,0.3)` : `1px solid ${B.border}`,
                        }}>
                          <Ico.Check/>
                        </div>
                        <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:highlight?'rgba(255,255,255,0.72)':B.tMain,lineHeight:1.5}}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <GBtn href="#contact" variant={highlight?'primary':'light'} size="md" full>{cta}</GBtn>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.2}>
          <p style={{textAlign:'center',marginTop:'32px',fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMuted}}>
            Tous les plans incluent l'onboarding guidé. Sans engagement longue durée.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
window.Pricing = Pricing;

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q:"Est-ce qu'on change notre numéro de téléphone ?",      a:"Non. Omnira se connecte à votre numéro existant via une simple redirection. Vos clients composent le même numéro qu'avant. Rien ne change côté client — tout change côté réception." },
  { q:"Est-ce compatible avec notre logiciel d'atelier ?",    a:"Omnira s'intègre avec Google Calendar, Google Sheets, et les principaux CRM. L'onboarding guidé inclut la configuration des connexions. Aucune compétence technique requise de votre côté." },
  { q:"Un client urgent peut-il joindre un humain ?",         a:"Oui. L'agent est configuré pour détecter les situations qui nécessitent une intervention humaine. Il peut transférer l'appel en direct ou alerter immédiatement votre équipe, selon les règles que vous définissez." },
  { q:"Est-ce que ça remplace mon accueil humain ?",          a:"Non. Omnira prend en charge les demandes répétitives et les appels simples — horaires, devis, RDV standard. Votre équipe garde la main sur tout ce qui nécessite jugement, relation ou technicité. L'humain est préservé pour ce qui compte vraiment." },
  { q:"Et si l'agent se trompe ou ne comprend pas ?",          a:"L'agent reconnaît ses limites. En cas de doute ou de demande complexe, il transfère avec un contexte clair plutôt que d'improviser. Il ne prend jamais de décisions qui dépassent son périmètre configuré." },
  { q:"Est-ce que c'est compliqué à mettre en place ?",       a:"La mise en place dure en moyenne 15 à 20 minutes, accompagnée par notre équipe. Aucune compétence technique requise. L'agent est opérationnel le jour même de la configuration." },
  { q:"Est-ce que ça fonctionne hors horaires ?",             a:"C'est là où Omnira est le plus utile. L'agent répond 24h/24, 7j/7 — la nuit, le week-end, les jours fériés. Chaque appel est capté et résumé pour que votre équipe retrouve l'essentiel le lendemain matin." },
  { q:"Comment mesure-t-on l'impact ?",                       a:"Chaque appel est tracé dans votre tableau de bord : motif, durée, action prise, résumé. Vous visualisez en un coup d'œil combien d'appels ont été captés, qualifiés et traités sans intervention de votre équipe." },
];

function FAQ() {
  const [open, setOpen] = React.useState(null);
  return (
    <section id="faq" style={{padding:'96px 24px',background:B.bgW}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader chip="FAQ" chipColor={B.blue} title="Vos questions,<br/>nos réponses directes." sub="Tout ce que vous voulez savoir avant de démarrer — sans jargon technique."/>
        </FadeIn>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {FAQS.map(({q,a},i)=>(
            <FadeIn key={i} delay={i*0.04}>
              <div style={{borderRadius:'16px',overflow:'hidden',border:`1px solid ${open===i?'rgba(30,115,216,0.3)':B.border}`,transition:'border-color 0.2s',boxShadow:open===i?'0 8px 28px rgba(30,115,216,0.08)':B.shadow}}>
                <button onClick={()=>setOpen(open===i?null:i)} style={{width:'100%',padding:'20px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',background:B.bgW,border:'none',cursor:'pointer',textAlign:'left'}}>
                  <span style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:B.tMain,flex:1,lineHeight:1.4}}>{q}</span>
                  <div style={{width:'28px',height:'28px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,background:open===i?B.grad:B.bgL,border:`1px solid ${open===i?'transparent':B.border}`,transition:'all 0.2s',transform:open===i?'rotate(45deg)':'rotate(0deg)'}}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2 6h8" stroke={open===i?'white':B.tMuted} strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                </button>
                {open===i && (
                  <div style={{padding:'0 24px 20px',background:B.bgW,animation:'slideIn 0.2s ease'}}>
                    <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',lineHeight:1.7,color:B.tMuted,margin:0,paddingTop:'4px',borderTop:`1px solid ${B.border}`}}><br/>{a}</p>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
window.FAQ = FAQ;

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm]       = React.useState({prenom:'',nom:'',garage:'',email:'',tel:'',message:''});
  const [sent, setSent]       = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));
  const submit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(()=>{ setLoading(false); setSent(true); }, 1200);
  };

  const inputStyle = {
    width:'100%',padding:'13px 16px',borderRadius:'12px',border:`1px solid ${B.border}`,fontFamily:'Inter,sans-serif',fontSize:'14px',color:B.tMain,background:B.bgW,outline:'none',boxSizing:'border-box',transition:'border-color 0.18s',
  };

  return (
    <section id="contact" style={{padding:'96px 24px',background:B.bgD,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 55% at 50% 0%,rgba(30,115,216,0.18),transparent 65%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)'}}/>
      <div style={{maxWidth:'720px',margin:'0 auto',position:'relative',zIndex:1}}>
        <FadeIn>
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <div style={{marginBottom:'16px'}}><Chip color={B.cyan}>Contact</Chip></div>
            <h2 style={{fontFamily:'Sora,sans-serif',fontSize:'clamp(28px,4vw,42px)',fontWeight:800,color:'white',letterSpacing:'-0.022em',lineHeight:1.15,marginBottom:'16px'}}>
              20 minutes pour voir si<br/>Omnira vous convient.
            </h2>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'16px',color:'rgba(255,255,255,0.42)',lineHeight:1.7,marginBottom:'20px'}}>
              On analyse votre flux d'appels ensemble et on configure une démo sur votre numéro. Sans engagement. Sans prérequis technique.
            </p>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'16px'}}>
              {[
                { icon: <Ico.Zap/>, text: '20 min chrono' },
                { icon: <Ico.Shield/>, text: 'Sans engagement' },
                { icon: <Ico.Check/>, text: 'Aucun prérequis technique' },
              ].map(({icon,text})=>(
                <div key={text} style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 16px',borderRadius:'99px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)'}}>
                  <span style={{color:B.cyan,opacity:0.8}}>{icon}</span>
                  <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.55)',fontWeight:500}}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{borderRadius:'24px',padding:'40px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',backdropFilter:'blur(20px)',boxShadow:'0 32px 80px rgba(0,0,0,0.3)'}}>
            {sent ? (
              <div style={{textAlign:'center',padding:'32px 0'}}>
                <div style={{width:'64px',height:'64px',borderRadius:'50%',background:B.grad,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',boxShadow:'0 8px 28px rgba(30,115,216,0.4)',color:'white'}}>
                  <Ico.Check/>
                </div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'20px',fontWeight:700,color:'white',marginBottom:'10px'}}>Message envoyé !</h3>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:'rgba(255,255,255,0.45)'}}>On vous recontacte dans les 24h pour organiser un échange.</p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}} className="form-grid">
                  <div>
                    <label style={{display:'block',fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.5)',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.08em'}}>Prénom</label>
                    <input required value={form.prenom} onChange={set('prenom')} placeholder="Jean" style={inputStyle}
                      onFocus={e=>e.target.style.borderColor=B.blue} onBlur={e=>e.target.style.borderColor=B.border}/>
                  </div>
                  <div>
                    <label style={{display:'block',fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.5)',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.08em'}}>Nom</label>
                    <input required value={form.nom} onChange={set('nom')} placeholder="Dupont" style={inputStyle}
                      onFocus={e=>e.target.style.borderColor=B.blue} onBlur={e=>e.target.style.borderColor=B.border}/>
                  </div>
                </div>
                <div style={{marginBottom:'16px'}}>
                  <label style={{display:'block',fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.5)',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.08em'}}>Nom du garage</label>
                  <input required value={form.garage} onChange={set('garage')} placeholder="Garage Dupont — Paris" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor=B.blue} onBlur={e=>e.target.style.borderColor=B.border}/>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}} className="form-grid">
                  <div>
                    <label style={{display:'block',fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.5)',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.08em'}}>E-mail</label>
                    <input required type="email" value={form.email} onChange={set('email')} placeholder="jean@garage.fr" style={inputStyle}
                      onFocus={e=>e.target.style.borderColor=B.blue} onBlur={e=>e.target.style.borderColor=B.border}/>
                  </div>
                  <div>
                    <label style={{display:'block',fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.5)',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.08em'}}>Téléphone</label>
                    <input type="tel" value={form.tel} onChange={set('tel')} placeholder="06 XX XX XX XX" style={inputStyle}
                      onFocus={e=>e.target.style.borderColor=B.blue} onBlur={e=>e.target.style.borderColor=B.border}/>
                  </div>
                </div>
                <div style={{marginBottom:'28px'}}>
                  <label style={{display:'block',fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.5)',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.08em'}}>Votre situation (optionnel)</label>
                  <textarea value={form.message} onChange={set('message')} placeholder="Décrivez brièvement votre problématique : appels manqués, volume d'appels quotidien, horaires..." rows={3}
                    style={{...inputStyle,resize:'vertical',minHeight:'88px'}}
                    onFocus={e=>e.target.style.borderColor=B.blue} onBlur={e=>e.target.style.borderColor=B.border}/>
                </div>
                <button type="submit" disabled={loading} style={{width:'100%',padding:'16px',borderRadius:'14px',border:'none',cursor:loading?'not-allowed':'pointer',background:B.grad,color:'white',fontFamily:'Sora,sans-serif',fontSize:'15px',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',boxShadow:'0 8px 28px rgba(30,115,216,0.4)',transition:'transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease',opacity:loading?0.75:1}}
                  onMouseEnter={e=>{if(!loading){e.currentTarget.style.transform='translateY(-2px) scale(1.02)';e.currentTarget.style.boxShadow='0 14px 36px rgba(30,115,216,0.5)';}}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0) scale(1)';e.currentTarget.style.boxShadow='0 8px 28px rgba(30,115,216,0.4)';}}>
                  {loading ? 'Envoi en cours…' : 'Réserver mon échange gratuit'}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.Contact = Contact;

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
              Omnira conçoit et déploie des agents vocaux IA pour les garages indépendants et ateliers multimarques. Opérationnel en 15 minutes.
            </p>
          </div>
          <div>
            <p style={{fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.22)',marginBottom:'16px'}}>Navigation</p>
            {[['Démo','#demo'],['Fonctionnalités','#demo'],['Cas d\'usage','#process'],['ROI Calculateur','#roi'],['Offres','#pricing'],['FAQ','#faq']].map(([l,h])=>(
              <a key={l} href={h} style={{display:'block',fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.35)',textDecoration:'none',marginBottom:'10px',transition:'color 0.15s'}}
                onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.7)'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.35)'}>{l}</a>
            ))}
          </div>
          <div>
            <p style={{fontFamily:'Sora,sans-serif',fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.22)',marginBottom:'16px'}}>Contact</p>
            {['Réserver une démo','Nous contacter','Support'].map(l=>(
              <a key={l} href="#contact" style={{display:'block',fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.35)',textDecoration:'none',marginBottom:'10px',transition:'color 0.15s'}}
                onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.7)'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.35)'}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{paddingTop:'24px',borderTop:'1px solid rgba(255,255,255,0.05)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
          <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',color:'rgba(255,255,255,0.18)',margin:0}}>© 2025 Omnira by SETTE inc. · Agent Vocal IA pour Garages</p>
          <div style={{display:'flex',gap:'24px'}}>
            {['Confidentialité','CGU','Mentions légales'].map(l=>(
              <a key={l} href="#" style={{fontFamily:'Inter,sans-serif',fontSize:'11px',color:'rgba(255,255,255,0.2)',textDecoration:'none'}}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
