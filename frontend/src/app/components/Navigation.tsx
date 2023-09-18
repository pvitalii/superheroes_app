import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../common/utils/routes.const';

export const Navigation = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex-col">
      <h1 className="text-5xl mb-6">Superheroes</h1>
      <div className="flex-col bg-gray-400 py-10">
        <Link to={ROUTES.ALL_HEROES}>
          <div
            className={`py-5 px-10 text-center ${
              pathname === ROUTES.ALL_HEROES ? 'bg-black text-white' : ''
            }`}
          >
            All
          </div>
        </Link>
        <Link to={ROUTES.ADD_HERO}>
          <div
            className={`py-5 px-10 text-center ${
              pathname === ROUTES.ADD_HERO ? 'bg-black text-white' : ''
            }`}
          >
            Add
          </div>
        </Link>
      </div>
    </div>
  );
};
