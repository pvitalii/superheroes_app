import { useEffect, useState } from 'react';
import { HeroesGrid } from './components/HeroesGrid';
import { Pagination } from '../../common/components/ui/Pagination';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { superheroesSelectors } from '../../store/slices/superheroes/superheroes.slice';
import { allSuperheroesThunk } from '../../store/slices/superheroes/superheroes.thunks';
import { StateHandler } from '../../common/components/StateHandler';

export const HeroesListPage = () => {
  const [page, setPage] = useState(
    localStorage.getItem('currentPage') ? localStorage.getItem('currentPage')! : 1
  );
  const dispatch = useAppDispatch();
  const data = useAppSelector(superheroesSelectors.selectAll);
  const { isLoading, error, count } = useAppSelector((state) => state.superheroes);

  useEffect(() => {
    localStorage.setItem('currentPage', page.toString());
    dispatch(allSuperheroesThunk(page));
  }, [page]);

  useEffect(() => {
    
  })

  return (
    <div className="w-full flex flex-col justify-between px-16">
      <StateHandler isLoading={isLoading} error={error}>
        <HeroesGrid data={data} />
        <Pagination page={page} setPage={setPage} count={count} />
      </StateHandler>
    </div>
  );
};
