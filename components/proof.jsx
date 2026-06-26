// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
const HOW_STEPS = [
  { num:'01', title:"L'appel arrive",           Icon: Ico.Phone },
  { num:'02', title:"L'agent répond et comprend", Icon: Ico.Mic },
  { num:'03', title:"Il agit selon vos règles",  Icon: Ico.Settings },
  { num:'04', title:"Votre équipe reçoit le résumé", Icon: Ico.Chart },
];

function HowItWorks() {
  return (
    <section id="process" className="section-cap-top" style={{padding:'72px 24px',background:B.bgW,position:'relative'}}>
      <div style={{maxWidth:'960px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Fonctionnement"
            chipColor={B.blue}
            title="Comment fonctionne Omnira ?"
            sub="Un agent vocal IA qui accompagne chaque appel de l'accueil au résumé, selon vos règles."
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0',position:'relative'}} className="how-grid">
            {/* connecting line */}
            <div style={{position:'absolute',top:'28px',left:'calc(12.5%)',right:'calc(12.5%)',height:'1px',background:`linear-gradient(90deg,${B.blue},${B.cyan})`,opacity:0.25,zIndex:0,pointerEvents:'none'}}/>
            {HOW_STEPS.map(({num,title,Icon},i)=>(
              <div key={num} style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',padding:'0 16px',position:'relative',zIndex:1}}>
                <div style={{
                  width:'56px',height:'56px',borderRadius:'50%',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  background: i===HOW_STEPS.length-1 ? B.grad : B.bgW,
                  border: i===HOW_STEPS.length-1 ? 'none' : `2px solid ${B.border}`,
                  boxShadow: i===HOW_STEPS.length-1 ? '0 8px 24px rgba(30,115,216,0.3)' : B.shadow,
                  color: i===HOW_STEPS.length-1 ? 'white' : B.blue,
                  marginBottom:'14px',flexShrink:0,
                }}>
                  <Icon/>
                </div>
                <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',fontWeight:700,color:B.blue,letterSpacing:'0.08em',marginBottom:'6px'}}>{num}</span>
                <span style={{fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:700,color:B.tMain,lineHeight:1.35}}>{title}</span>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{textAlign:'center',marginTop:'40px'}}>
            <GBtn href="/devis" variant="primary" size="md">Voir ce qu'Omnira peut faire</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.HowItWorks = HowItWorks;

// ─── FEATURES ─────────────────────────────────────────────────────────────────
const FEATURES_DATA = [
  { Icon: Ico.Phone,    title: 'Répondre 24h/24' },
  { Icon: Ico.Filter,   title: 'Qualifier les demandes' },
  { Icon: Ico.Calendar, title: 'Prendre un rendez-vous' },
  { Icon: Ico.Chart,    title: 'Préparer un devis' },
  { Icon: Ico.Zap,      title: 'Filtrer les urgences' },
  { Icon: Ico.Mail,     title: 'Envoyer une confirmation' },
  { Icon: Ico.Users,    title: 'Transférer à un humain' },
  { Icon: Ico.Clock,    title: 'Créer une demande de rappel' },
  { Icon: Ico.Mic,      title: 'Résumer chaque appel' },
  { Icon: Ico.Link,     title: 'Alimenter votre CRM' },
  { Icon: Ico.Building, title: 'Analyser les motifs fréquents' },
  { Icon: Ico.Shield,   title: 'Suivre les performances' },
];

const _FEAT_VISIBLE = 6; // pills affichées par défaut

function Features() {
  const [open, setOpen] = React.useState(false);
  const extra = FEATURES_DATA.slice(_FEAT_VISIBLE);

  return (
    <section className="section-cap-top" style={{padding:'64px 24px',background:B.bgL,position:'relative'}}>
      <div style={{maxWidth:'960px',margin:'0 auto'}}>
        <FadeIn>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:B.tMuted,textAlign:'center',marginBottom:'24px'}}>
            Ce qu'Omnira peut faire
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          {/* Pills toujours visibles */}
          <div style={{display:'flex',flexWrap:'wrap',gap:'10px',justifyContent:'center'}}>
            {FEATURES_DATA.slice(0,_FEAT_VISIBLE).map(({Icon,title},i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',padding:'9px 16px',borderRadius:'99px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow}}>
                <span style={{color:B.blue,display:'flex',flexShrink:0}}><Icon/></span>
                <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',fontWeight:500,color:B.tMain,whiteSpace:'nowrap'}}>{title}</span>
              </div>
            ))}
          </div>

          {/* Pills masquées — expand/collapse */}
          <div style={{overflow:'hidden',maxHeight:open?'200px':'0',opacity:open?1:0,transition:'max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease'}}>
            <div style={{display:'flex',flexWrap:'wrap',gap:'10px',justifyContent:'center',paddingTop:'10px'}}>
              {extra.map(({Icon,title},i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',padding:'9px 16px',borderRadius:'99px',background:B.bgW,border:`1px solid ${B.border}`,boxShadow:B.shadow}}>
                  <span style={{color:B.blue,display:'flex',flexShrink:0}}><Icon/></span>
                  <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',fontWeight:500,color:B.tMain,whiteSpace:'nowrap'}}>{title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Toggle */}
          <div style={{textAlign:'center',marginTop:'18px'}}>
            <button onClick={()=>setOpen(!open)} style={{
              display:'inline-flex',alignItems:'center',gap:'6px',
              background:'none',border:'none',cursor:'pointer',padding:'6px 12px',borderRadius:'8px',
              fontFamily:'Inter,sans-serif',fontSize:'13px',fontWeight:600,
              color:B.blue,transition:'color 0.15s, background 0.15s',
            }}
              onMouseEnter={e=>{e.currentTarget.style.background=`${B.blue}0e`;}}
              onMouseLeave={e=>{e.currentTarget.style.background='none';}}>
              {open
                ? <>Réduire <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 9L7 5l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                : <>+ {extra.length} autres fonctionnalités <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></>
              }
            </button>
          </div>
        </FadeIn>

        {/* Note + Offre sur mesure */}
        <FadeIn delay={0.18}>
          <div style={{marginTop:'28px',display:'flex',flexDirection:'column',gap:'12px'}}>
            {/* Disclaimer */}
            <div style={{padding:'14px 20px',borderRadius:'12px',background:B.bgW,border:`1px solid ${B.border}`,display:'flex',alignItems:'center',gap:'12px'}}>
              <div style={{color:B.cyan,flexShrink:0}}><Ico.Shield/></div>
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMuted,lineHeight:1.65,margin:0}}>
                <strong style={{color:B.tMain}}>L'agent ne remplace pas votre équipe.</strong>{' '}
                Il filtre, structure et transmet — les cas importants restent pour l'humain.
              </p>
            </div>
            {/* Offre sur mesure */}
            <div style={{padding:'18px 22px',borderRadius:'14px',background:`linear-gradient(135deg,${B.bgD} 0%,#0E1C35 100%)`,border:'1px solid rgba(30,115,216,0.22)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'20px',flexWrap:'wrap'}}>
              <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
                <div style={{width:'36px',height:'36px',borderRadius:'10px',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:B.grad,boxShadow:'0 4px 14px rgba(30,115,216,0.35)'}}>
                  <Ico.Zap/>
                </div>
                <div>
                  <p style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:'white',margin:'0 0 2px'}}>Nous proposons la meilleure offre selon votre entreprise</p>
                  <p style={{fontFamily:'Inter,sans-serif',fontSize:'12px',color:'rgba(255,255,255,0.38)',margin:0}}>Chaque déploiement est configuré selon votre activité, vos horaires et vos outils.</p>
                </div>
              </div>
              <GBtn href="/devis" variant="outline" size="sm">Obtenir mon offre</GBtn>
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
