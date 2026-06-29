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

function AvantApres() { return null; }
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

function Integrations() { return null; }
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
    <section style={{padding:'80px 24px 40px',background:B.bgW}} className="section-cap-top">
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
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'0'}} className="solution-grid">
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
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                    <span style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:B.tMuted,lineHeight:1.5}}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.18}>
          <div style={{textAlign:'center',marginTop:'32px'}}>
            <GBtn onClick={() => window.openCalModal('decouverte')} variant="primary" size="md">Voir ce qu'Omnira peut faire pour mon activité</GBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
window.PourQui = PourQui;
