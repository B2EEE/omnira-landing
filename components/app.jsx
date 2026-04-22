function App() {
  return (
    <div>
      <Nav/>
      <Hero/>
      <StatsBar/>
      <Pain/>
      <Solution/>
      <Demo/>
      <Features/>
      <Scenarios/>
      <HowItWorks/>
      <ROICalculator/>
      <Testimonials/>
      <Founders/>
      <FAQ/>
      <Contact/>
      <Footer/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
