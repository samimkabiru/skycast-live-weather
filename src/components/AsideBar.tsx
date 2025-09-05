import useExpandedStore from '../stores/expandedStore';
import MenuButton from './MenuButton';

const AsideBar = () => {
  const isExpanded = useExpandedStore((s) => s.isExpanded);
  return (
    <div
      className={`bg-[#EEF2F3] absolute left-0 top-0 bottom-0 h-auto ${
        isExpanded ? 'w-[300px]' : 'w-0 overflow-hidden'
      } ${
        isExpanded ? 'pt-5 pl-4' : 'p-0'
      }  transition-all duration-200 ease-linear z-40`}
    >
      <MenuButton />
    </div>
  );
};

export default AsideBar;
