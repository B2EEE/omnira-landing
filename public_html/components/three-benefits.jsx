// ─── PAIN SECTION ─────────────────────────────────────────────────────────────
const PAIN_CARDS = [
  { Icon: Ico.Phone,    title: 'Appels manqués',            desc: "Pendant une réunion, un chantier ou une intervention, personne ne décroche. Le client raccroche et n'essaie plus." },
  { Icon: Ico.Users,    title: 'Équipe interrompue',         desc: "Des appels simples — horaires, devis, disponibilités — coupent le rythme de l'équipe plusieurs fois par heure." },
  { Icon: Ico.Filter,   title: 'Devis oubliés',             desc: "Les demandes captées rapidement finissent souvent sans suite. Faute de temps pour les retraiter proprement." },
  { Icon: Ico.Calendar, title: 'Rendez-vous non pris',       desc: "Un client prêt à acheter n'arrive pas à planifier. Il se décourage et choisit un concurrent disponible." },
  { Icon: Ico.Zap,      title: 'Demandes mal qualifiées',    desc: "Les informations manquent ou sont mal notées. L'équipe rappelle sans contexte et repart à zéro." },
  { Icon: Ico.Clock,    title: 'Appels hors horaires perdus', desc: "Vos clients appellent aussi le soir et le week-end. Ces appels arrivent dans le vide — et disparaissent sans trace." },
  { Icon: Ico.Chart,    title: 'Informations mal notées',    desc: "Post-it, notes vocales, mémos volants : le suivi des demandes repose sur la mémoire, pas sur un système." },
  { Icon: Ico.Shield,   title: 'Clients qui attendent trop', desc: "Une attente trop longue à la première prise de contact suffit à faire partir un client vers la concurrence." },
];

function Pain() {
  return (
    <section id="pain" style={{padding:'96px 24px',background:B.bgD}}>
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <FadeIn>
          <SectionHeader
            chip="Le problème"
            chipColor={B.cyan}
            light
            title="Le téléphone reste votre canal le plus rentable…<br/>mais souvent le moins bien géré."
            sub="Chaque appel peut devenir un rendez-vous, un devis ou une opportunité. Mais lorsqu'il arrive au mauvais moment, il dérange l'équipe, se perd ou reste mal traité."
          />
        </FadeIn>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px'}} className="pain-grid">
          {PAIN_CARDS.map(({Icon,title,desc},i)=>(
            <FadeIn key={title} delay={i*0.06}>
              <div style={{display:'flex',flexDirection:'column',padding:'24px',borderRadius:'18px',position:'relative',overflow:'hidden',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',boxShadow:'0 8px 32px rgba(0,0,0,0.2)',transition:'all 0.22s ease',cursor:'default',height:'100%'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 20px 50px rgba(0,0,0,0.3),0 0 0 1px rgba(30,115,216,0.22)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.2)';}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)'}}/>
                <div style={{width:'38px',height:'38px',borderRadius:'11px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'16px',background:'rgba(30,115,216,0.12)',border:'1px solid rgba(30,115,216,0.2)',color:B.blue,flexShrink:0}}>
                  <Icon/>
                </div>
                <h3 style={{fontFamily:'Sora,sans-serif',fontSize:'14px',fontWeight:700,color:'white',marginBottom:'8px',lineHeight:1.3}}>{title}</h3>
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(255,255,255,0.4)',lineHeight:1.65,flex:1,margin:0}}>{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Pain = Pain;

// stubs pour compatibilité
window.ThreeBenefits = () => null;
window.StatsBar = () => null;
