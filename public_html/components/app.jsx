function App() {
  return (
    <div>
      <Nav/>
      <Hero/>
      <ThreeBenefits/>
      <StatsBar/>
      <Pain/>
      <ROICalculator/>
      <Demo/>
      <Features/>
      <Scenarios/>
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
