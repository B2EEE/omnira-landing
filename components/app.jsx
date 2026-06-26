function App() {
  return (
    <div>
      <Nav/>
      <Hero/>
      <Pain/>
      <HowItWorks/>
      <Features/>
      <Scenarios/>
      <Demo/>
      <CallSummary/>
      <Dashboard/>
      <ROICalculator/>
      <HumanControl/>
      <OnBoarding/>
      <DevisSection/>
      <FAQ/>
      <Footer/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
