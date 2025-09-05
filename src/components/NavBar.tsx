import { useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import useSearchStore from '../stores/searchStore';
import MenuButton from './MenuButton';

const NavBar = () => {
  const todaysDate = new Date();
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useSearchStore((s) => s.setSearchText);

  return (
    <nav className="flex items-center p-4 flex-wrap">
      <MenuButton />
      <div className="mr-3">
        <p className="md:text-2xl text-[#0A183E] font-semibold">
          {todaysDate.toLocaleDateString(navigator.language, {
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <p className="text-searchbar-text-color text-[12px] md:text-[16px]">
          {todaysDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            weekday: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
      <form
        className="grow px-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current) {
            setSearchText(ref.current.value);
            ref.current.value = '';
          }
        }}
      >
        <div className="flex items-center text-searchbar-text-color rounded-lg overflow-hidden px-2 bg-[#FCFBFC] has-[input:focus-within]:border-2 shadow transition-all duration-75 mt-4 md:mt-0">
          <CiSearch className="text-2xl" />
          <input
            className="w-full p-3 placeholder:text-[#A7ABAB] outline-0"
            type="text"
            placeholder="Search location here..."
            ref={ref}
          />
        </div>
      </form>
    </nav>
  );
};

export default NavBar;
