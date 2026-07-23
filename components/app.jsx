function App() {
  React.useLayoutEffect(() => {
    document.documentElement.classList.remove('js-loading');
  }, []);

  return (
    <div>
      <Nav/>
      <Hero/>
      <Pain/>
      <HowItWorks/>
      <Scenarios/>
      <SecteurLinks/>
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
