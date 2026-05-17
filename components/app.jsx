function App() {
  return (
    <div>
      <Nav/>
      <Hero/>
      <ThreeBenefits/>
      <StatsBar/>
      <Pain/>
      <Demo/>
      <Features/>
      <Scenarios/>
      <ROICalculator/>
      <Testimonials/>
      <ForWho/>
      <HowItWorks/>
      <Pricing/>
      <FAQ/>
      <Contact/>
      <Footer/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
