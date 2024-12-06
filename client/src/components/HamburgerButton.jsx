import { HiMenu } from 'react-icons/hi';

const HamburgerButton = ({ onClick }) => (
  <button
    className="md:hidden absolute top-4 left-4 z-40 bg-gray-800 text-white p-3 rounded-full"
    onClick={onClick}
  >
    <HiMenu size={16} />
  </button>
);

export default HamburgerButton;
