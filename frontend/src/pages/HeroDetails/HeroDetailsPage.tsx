import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { superheroesSelectors } from '../../store/slices/superheroes/superheroes.slice';
import { EntityId } from '@reduxjs/toolkit';
import { PageHeader } from '../../common/components/PageHeader';
import { StateHandler } from '../../common/components/StateHandler';
import { useEffect, useState } from 'react';
import {
  allSuperheroesThunk,
  deleteSuperheroThunk
} from '../../store/slices/superheroes/superheroes.thunks';
import { Modal } from '../../common/components/ui/Modal';
import { ROUTES } from '../../common/utils/routes.const';

export const HeroDetailsPage = () => {
  const location = useLocation();
  const heroId = location.pathname.split('/').pop();
  const dispatch = useAppDispatch();
  const hero = useAppSelector((state) =>
    superheroesSelectors.selectById(state, heroId as EntityId)
  );
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  useEffect(() => {
    if (!hero && localStorage.getItem('currentPage')) {
      dispatch(allSuperheroesThunk(localStorage.getItem('currentPage')!));
    }
  }, []);

  const onDelete = () => {
    if (hero) dispatch(deleteSuperheroThunk(+heroId!));
    localStorage.setItem('currentPage', (1).toString());
  };

  return (
    <div className="w-full px-6">
      <StateHandler isLoading={!Boolean(hero)} error={null}>
        <PageHeader title={hero?.nickname} />
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-5 gap-3">
            {hero?.images.map((image) => (
              <img key={image.id} src={image.url} alt={hero.nickname} />
            ))}
          </div>{' '}
          <p className="text-lg">
            <span className="font-bold">Real name: </span>
            {hero?.real_name}
          </p>
          <p className="text-lg">
            <span className="font-bold">Description: </span>
            {hero?.origin_description}
          </p>
          <div className="text-lg">
            <span className="font-bold">Superpowers: </span>
            {hero?.superpowers.map((superpower) => (
              <p key={superpower.id} className="pl-4">
                - {superpower.name}
              </p>
            ))}
          </div>
          <p className="text-lg">
            <span className="font-bold">Catch phrase: </span>
            {hero?.catch_phrase}
          </p>
        </div>
        <div className="flex justify-between mt-10">
          <Link to={`/hero/edit/${heroId}`}>
            <button className="select-none rounded-md px-10 py-3 text-lg bg-yellow-600 text-white">
              Edit
            </button>
          </Link>
          <button
            className="select-none rounded-md px-10 py-3 text-lg bg-red-700 text-white"
            onClick={() => setIsDeleteModalOpened(true)}
          >
            Delete
          </button>
        </div>
      </StateHandler>
      <Modal isOpened={isDeleteModalOpened} onClose={() => setIsDeleteModalOpened(false)}>
        <div className="mt-5 p-5">
          <h2 className="text-3xl">Confirm deletion</h2>
          <p className="my-5 text-lg p-0">Are you sure you want to delete this superhero?</p>
          <div className="flex justify-between mt-10">
            <Link to={ROUTES.ALL_HEROES}>
              <button
                className="select-none rounded-md px-10 py-3 text-lg bg-green-600 text-white"
                onClick={onDelete}
              >
                Confirm
              </button>
            </Link>
            <button
              className="select-none rounded-md px-10 py-3 text-lg bg-red-700 text-white"
              onClick={() => setIsDeleteModalOpened(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
