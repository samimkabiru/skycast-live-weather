import { CiSearch } from 'react-icons/ci';

const NavBar = () => {
  const monthYear = new Date();
  const todaysDate = new Date();

  return (
    <nav className="flex items-center p-4">
      <div className="mr-3">
        <p className="text-2xl text-[#0A183E] font-semibold">
          {monthYear.toLocaleDateString(navigator.language, {
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <p className="text-searchbar-text-color">
          {todaysDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            weekday: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
      <form className="grow px-2">
        <div className="flex items-center  text-searchbar-text-color rounded-lg overflow-hidden px-2 bg-[#FCFBFC] has-[input:focus-within]:border-2 shadow transition-all duration-75">
          <CiSearch className="text-2xl" />
          <input
            className="w-full p-3 placeholder:text-[#A7ABAB] outline-0"
            type="text"
            placeholder="Search location here..."
          />
        </div>
      </form>
    </nav>
  );
};

export default NavBar;
