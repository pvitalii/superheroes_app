import { ICONS } from '../../icons';

export const Spinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img src={ICONS.SPINNER} alt="spinner" className="animate-spin" />
    </div>
  );
};
