import { Link } from 'react-router-dom';
import { Superhero } from '../../../common/types/superhero/superhero.type';

type HeroCardProps = {
  superhero: Superhero;
};

export const HeroCard = ({ superhero }: HeroCardProps) => {
  return (
    <Link to={`/hero/${superhero.id}`}>
      <div key={superhero.id} className="flex flex-col">
        <img
          className="select-none max-h-52 max-w-52 flex-1"
          src={superhero.images[0].url}
          alt="superhero_image"
        />
        <p className="text-lg text-center py-5">{superhero.nickname}</p>
      </div>
    </Link>
  );
};
