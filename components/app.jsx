function App() {
  return (
    <div>
      <Nav/>
      <Hero/>
      <StatsBar/>
      <Pain/>
      <Demo/>
      <Features/>
      <Scenarios/>
      <ROICalculator/>
      <Testimonials/>
      <HowItWorks/>
      <FAQ/>
      <Contact/>
      <Footer/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
