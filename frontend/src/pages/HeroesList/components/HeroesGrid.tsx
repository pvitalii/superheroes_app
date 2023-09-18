import { HeroCard } from './HeroCard';
import { Superhero } from '../../../common/types/superhero/superhero.type';

export const HeroesGrid = ({ data }: { data: Superhero[] }) => {
  return (
    <div className="grid grid-cols-3 gap-10">
      {data.map((superhero) => (
        <HeroCard key={superhero.id} superhero={superhero} />
      ))}
    </div>
  );
};
