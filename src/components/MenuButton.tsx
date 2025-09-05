import { RxHamburgerMenu } from 'react-icons/rx';
import useExpandedStore from '../stores/expandedStore';
import { IoClose } from 'react-icons/io5';

const MenuButton = () => {
  const { isExpanded, setExpanded } = useExpandedStore();

  return (
    <button
      onClick={() => setExpanded()}
      className="size-10 inline-flex justify-center items-center bg-blue-600 text-white text-2xl cursor-pointer rounded-full mr-5 hover:bg-blue-800 transition duration-100 ease-linear "
    >
      {isExpanded ? <IoClose /> : <RxHamburgerMenu />}
    </button>
  );
};

export default MenuButton;
