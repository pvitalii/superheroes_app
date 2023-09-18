import { EntityId } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroForm } from '../../common/components/HeroForm';
import { PageHeader } from '../../common/components/PageHeader';
import { ActionFormValues } from '../../common/types/superhero/action-form-values.type';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { imagesService } from '../../store/services/images.services';
import { superheroesSelectors } from '../../store/slices/superheroes/superheroes.slice';
import {
  allSuperheroesThunk,
  editSuperheroThunk
} from '../../store/slices/superheroes/superheroes.thunks';
import { StateHandler } from '../../common/components/StateHandler';
import { Image } from '../../common/types/image.type';
import { SuccessModal } from '../../common/components/SuccessModal';
import { ErrorModal } from '../../common/components/ErrorModal';

export const EditHeroPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const heroId = location.pathname.split('/').pop();
  const hero = useAppSelector((state) =>
    superheroesSelectors.selectById(state, heroId as EntityId)
  );

  useEffect(() => {
    if (!hero && localStorage.getItem('currentPage')) {
      dispatch(allSuperheroesThunk(localStorage.getItem('currentPage')!));
    }
  }, []);

  const initialValues = {
    nickname: hero?.nickname ?? '',
    real_name: hero?.real_name ?? '',
    origin_description: hero?.origin_description ?? '',
    catch_phrase: hero?.catch_phrase ?? '',
    superpowers: hero?.superpowers.map((superpower) => JSON.stringify(superpower)) ?? [],
    images: hero?.images ?? []
  };

  const onSubmitForm = async (values: ActionFormValues) => {
    const imagesToUpdload = (values.images as (File | Image)[]).filter(
      (image) => !image.hasOwnProperty('id')
    ) as File[];
    const valueImages = (values.images as (File | Image)[]).filter((image) =>
      image.hasOwnProperty('id')
    ) as Image[];
    const { data: images } = await imagesService.saveImages(imagesToUpdload);
    const imagesToDelete = hero?.images.filter(
      (image) => !valueImages.map((valueImage) => (valueImage as Image).id).includes(image.id)
    );
    if (imagesToDelete) {
      imagesService.deleteImages(imagesToDelete);
    }
    const superpowers = values.superpowers.map((superpower) => JSON.parse(superpower));
    dispatch(
      editSuperheroThunk({
        id: +heroId!,
        payload: {
          ...values,
          images: [...valueImages, ...images],
          superpowers
        }
      })
    ).then((value) => {
      if (value.hasOwnProperty('error')) {
        setError((value as any).error.message);
        setIsErrorModalOpened(true);
      } else {
        setIsEditModalOpened(true);
      }
    });
  };

  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [isErrorModalOpened, setIsErrorModalOpened] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="w-full px-6">
      <StateHandler isLoading={!Boolean(hero)} error={null}>
        <PageHeader title={`Edit ${hero?.nickname}`} />
        <HeroForm initialValues={initialValues} onSubmit={onSubmitForm} />
        <SuccessModal
          isOpened={isEditModalOpened}
          onClose={() => setIsEditModalOpened(false)}
          body={`You have successfully edited ${hero?.nickname}`}
        />
        <ErrorModal
          isOpened={isErrorModalOpened}
          onClose={() => setIsErrorModalOpened(false)}
          error={error}
        />
      </StateHandler>
    </div>
  );
};
