import CountryClimateDetails from './components/CountryClimateDetails';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <div className="grid grid-cols-[1fr_400px] h-dvh grid-rows">
      <div>
        <NavBar />
      </div>
      <div className="row-span-2 bg-[linear-gradient(to_bottom_right,_#43556F_10%,_#102A4F_70%,_#17397D_100%)]">
        <CountryClimateDetails />
      </div>
      <div className="bg-green-500 "></div>
    </div>
  );
};

export default App;
