// ─── AVANT / APRÈS ────────────────────────────────────────────────────────────
const _AVANT = [
  { Icon: Ico.Phone,    label: 'Appels manqués' },
  { Icon: Ico.Mail,     label: 'Messages incomplets' },
  { Icon: Ico.Clock,    label: 'Rappels oubliés' },
  { Icon: Ico.Filter,   label: 'Devis perdus' },
  { Icon: Ico.Chart,    label: 'Aucune visibilité sur les motifs' },
  { Icon: Ico.Users,    label: 'Équipe interrompue' },
];
const _APRES = [
  { Icon: Ico.Phone,    label: 'Appels captés' },
  { Icon: Ico.Chart,    label: 'Demandes qualifiées' },
  { Icon: Ico.Mic,      label: 'Résumés structurés' },
  { Icon: Ico.Calendar, label: 'Rendez-vous et devis mieux suivis' },
  { Icon: Ico.Zap,      label: 'Dashboard clair' },
  { Icon: Ico.Shield,   label: 'Humain concentré sur les cas importants' },
];

function AvantApres() {
  return (
    <section style={{padding:'80px 24px',background:B.bgW}} className="section-cap-top">
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Avant / Après"
            chipColor={B.blue}
            title="Avant Omnira, vos appels se dispersent.<br/>Après Omnira, ils deviennent exploitables."
            sub=""
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}} className="solution-grid">
            {/* Avant */}
            <div style={{borderRadius:'20px',padding:'28px',background:B.bgL,border:`1px solid ${B.border}`}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
                <div style={{width:'30px',height:'30px',borderRadius:'8px',background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3L3 11" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round"/></svg>
                </div>
                <span style={{fontFamily:'Sora,sans-serif',fontSize:'15px',fontWeight:700,color:B.tMain}}>Sans Omnira</span>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'9px'}}>
                {_AVANT.map(({Icon,label},i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 14px',borderRadius:'10px',background:'rgba(239,68,68,0.04)',border:'1px solid rgba(239,68,68,0.1)'}}>
                    <span style={{color:'rgba(239,68,68,0.4)',flexShrink:0,display:'flex'}}><Icon/></span>
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMuted,lineHeight:1.35}}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Après */}
            <div style={{borderRadius:'20px',padding:'28px',background:`linear-gradient(135deg,rgba(30,115,216,0.05) 0%,rgba(47,199,214,0.04) 100%)`,border:'1px solid rgba(30,115,216,0.18)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
                <div style={{width:'30px',height:'30px',borderRadius:'8px',background:B.grad,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 12px rgba(30,115,216,0.3)'}}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{fontFamily:'Sora,sans-serif',fontSize:'15px',fontWeight:700,color:B.tMain}}>Avec Omnira</span>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'9px'}}>
                {_APRES.map(({Icon,label},i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 14px',borderRadius:'10px',background:'rgba(30,115,216,0.05)',border:'1px solid rgba(30,115,216,0.12)'}}>
                    <span style={{color:B.blue,flexShrink:0,display:'flex'}}><Icon/></span>
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMain,fontWeight:500,lineHeight:1.35}}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{textAlign:'center',marginTop:'32px'}}>
            <GBtn href="#roi" variant="primary" size="md">Simuler mes appels perdus</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.AvantApres = AvantApres;

// ─── INTEGRATIONS ─────────────────────────────────────────────────────────────
const _TOOLS = [
  { name:'Google Calendar', color:'#4285F4', Icon: Ico.Calendar },
  { name:'Google Sheets',   color:'#34A853', Icon: Ico.Chart },
  { name:'CRM',             color:'#9333ea', Icon: Ico.Users },
  { name:'Email',           color:'#1E73D8', Icon: Ico.Mail },
  { name:'SMS',             color:'#2FC7D6', Icon: Ico.Phone },
  { name:'WhatsApp',        color:'#25D366', Icon: Ico.Mic },
  { name:'Outil métier',    color:'#f59e0b', Icon: Ico.Building },
  { name:'Autre outil',     color:'#64748b', Icon: Ico.Link },
];

function Integrations() {
  return (
    <section style={{padding:'80px 24px',background:B.bgL}} className="section-cap-top">
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Intégrations"
            chipColor={B.blue}
            title="Omnira s'intègre à vos outils existants"
            sub="L'agent vocal peut transmettre les informations vers vos outils de travail selon vos besoins."
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'24px'}} className="feat-grid">
            {_TOOLS.map(({name,color,Icon},i)=>(
              <div key={i} style={{
                padding:'18px 16px',borderRadius:'16px',
                background:B.bgW,border:`1px solid ${B.border}`,
                boxShadow:B.shadow,
                display:'flex',alignItems:'center',gap:'12px',
                transition:'all 0.22s ease',
              }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=`${color}44`;e.currentTarget.style.boxShadow=`0 8px 24px ${color}18`;e.currentTarget.style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=B.border;e.currentTarget.style.boxShadow=B.shadow;e.currentTarget.style.transform='translateY(0)';}}>
                <div style={{width:'36px',height:'36px',borderRadius:'10px',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:`${color}14`,border:`1.5px solid ${color}28`,color}}>
                  <Icon/>
                </div>
                <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',fontWeight:600,color:B.tMain,lineHeight:1.3}}>{name}</span>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.18}>
          <div style={{padding:'16px 22px',borderRadius:'14px',background:B.bgW,border:`1px solid ${B.border}`,display:'flex',alignItems:'center',gap:'12px',boxShadow:B.shadow}}>
            <div style={{color:B.cyan,flexShrink:0}}><Ico.Shield/></div>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMuted,margin:0,lineHeight:1.6}}>
              Les connexions sont définies selon votre environnement et validées pendant le diagnostic. Aucune intégration automatique universelle n'est garantie sans évaluation préalable.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.Integrations = Integrations;

// ─── POUR QUI ─────────────────────────────────────────────────────────────────
const _ADAPTE = [
  'Vous recevez des appels réguliers',
  'Vous perdez des demandes ou des prospects',
  'Votre équipe est souvent interrompue',
  'Vous devez gérer des rendez-vous ou des devis',
  'Vous voulez mieux suivre les appels entrants',
];
const _NON_ADAPTE = [
  'Vous recevez très peu d\'appels',
  'Tous vos clients réservent déjà en ligne',
  'Vous n\'avez aucun besoin de qualification',
  'Vous ne souhaitez pas cadrer les scénarios',
];

function PourQui() {
  return (
    <section style={{padding:'80px 24px',background:B.bgW}} className="section-cap-top">
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Pour qui ?"
            chipColor={B.blue}
            title="Omnira est utile quand le téléphone<br/>devient un point de friction."
            sub=""
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'32px'}} className="solution-grid">
            {/* Adapté */}
            <div style={{borderRadius:'20px',padding:'28px',background:`linear-gradient(135deg,rgba(30,115,216,0.04) 0%,rgba(47,199,214,0.03) 100%)`,border:'1px solid rgba(30,115,216,0.16)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'18px'}}>
                <div style={{width:'28px',height:'28px',borderRadius:'8px',background:B.grad,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:B.tMain}}>Omnira est adapté si</span>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {_ADAPTE.map((t,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px',padding:'10px 14px',borderRadius:'10px',background:'rgba(30,115,216,0.05)',border:'1px solid rgba(30,115,216,0.1)'}}>
                    <div style={{width:'16px',height:'16px',borderRadius:'50%',flexShrink:0,marginTop:'1px',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(47,199,214,0.14)',border:'1px solid rgba(47,199,214,0.28)'}}>
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 4.5l2.5 2.5 4.5-5" stroke={B.cyan} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMain,lineHeight:1.5}}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Non adapté */}
            <div style={{borderRadius:'20px',padding:'28px',background:B.bgL,border:`1px solid ${B.border}`}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'18px'}}>
                <div style={{width:'28px',height:'28px',borderRadius:'8px',background:'rgba(100,116,139,0.12)',border:'1px solid rgba(100,116,139,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 2v5M6.5 9.5v.5" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round"/></svg>
                </div>
                <span style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:B.tMain}}>Pas prioritaire si</span>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {_NON_ADAPTE.map((t,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px',padding:'10px 14px',borderRadius:'10px',background:'rgba(100,116,139,0.04)',border:'1px solid rgba(100,116,139,0.1)'}}>
                    <div style={{width:'16px',height:'16px',borderRadius:'50%',flexShrink:0,marginTop:'1px',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(100,116,139,0.1)',border:'1px solid rgba(100,116,139,0.2)'}}>
                      <span style={{color:'#94a3b8',fontSize:'10px',fontWeight:700,lineHeight:1}}>—</span>
                    </div>
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMuted,lineHeight:1.5}}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{textAlign:'center'}}>
            <GBtn href="/devis" variant="primary" size="md">Vérifier si Omnira est adapté à mon activité</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.PourQui = PourQui;
