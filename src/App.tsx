import AsideBar from './components/AsideBar';
import AverageDailyTemperature from './components/AverageDailyTemperature';
import ClimateConditionOverview from './components/ClimateConditionOverview';
import CountryClimateDetails from './components/CountryClimateDetails';
import NavBar from './components/NavBar';
import useExpandedStore from './stores/expandedStore';

const App = () => {
  const isExpanded = useExpandedStore((s) => s.isExpanded);
  return (
    <div className="relative">
      <AsideBar />
      <div className="grid grid-cols-[1fr_400px] grid-rows-[auto_1fr] h-dvh">
        <div className="items-start">
          <NavBar />
        </div>
        <div className="row-span-2 bg-[linear-gradient(to_bottom_right,_#43556F_10%,_#102A4F_70%,_#17397D_100%)]">
          <CountryClimateDetails />
        </div>
        <div className="p-5">
          <ClimateConditionOverview />
          <AverageDailyTemperature />
        </div>
      </div>
    </div>
  );
};

export default App;
