import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  disabled: boolean | undefined;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({ icon: Icon, onClick, disabled }) => {
  return (
    <button
      dir="ltr"
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex w-full justify-center items-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 "
    >
      <Icon size={30} /> <span className="font-bold"> oogle</span>
    </button>
  );
};

export default AuthSocialButton;
