function App() {
  return (
    <div>
      <Nav/>
      <Hero/>
      <Pain/>
      <HowItWorks/>
      <Scenarios/>
      <Demo/>
      <Dashboard/>
      <PourQui/>
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
