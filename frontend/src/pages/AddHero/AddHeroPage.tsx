import { useState } from 'react';
import { HeroForm } from '../../common/components/HeroForm';
import { PageHeader } from '../../common/components/PageHeader';
import { ActionFormValues } from '../../common/types/superhero/action-form-values.type';
import { useAppDispatch } from '../../store/hooks';
import { imagesService } from '../../store/services/images.services';
import { createSuperheroThunk } from '../../store/slices/superheroes/superheroes.thunks';
import { SuccessModal } from '../../common/components/SuccessModal';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../common/utils/routes.const';
import { ErrorModal } from '../../common/components/ErrorModal';

export const AddHeroPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues = {
    nickname: '',
    real_name: '',
    origin_description: '',
    catch_phrase: '',
    superpowers: [],
    images: []
  };

  const onSubmitForm = async (values: ActionFormValues) => {
    const { data: images } = await imagesService.saveImages(values.images as File[]);
    const superpowers = values.superpowers.map((superpower) => JSON.parse(superpower));
    dispatch(createSuperheroThunk({ ...values, images, superpowers })).then((value) => {
      if (value.hasOwnProperty('error')) {
        setError((value as any).error.message);
        setIsErrorModalOpened(true);
      } else {
        setIsCreateModalOpened(true);
      }
    });
  };

  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
  const [isErrorModalOpened, setIsErrorModalOpened] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="w-full px-6">
      <PageHeader title="Create New Hero" />
      <HeroForm initialValues={initialValues} onSubmit={onSubmitForm} />
      <SuccessModal
        isOpened={isCreateModalOpened}
        onClose={() => {
          setIsCreateModalOpened(false);
          navigate(ROUTES.ALL_HEROES);
        }}
        body={`You have successfully create new superhero`}
      />
      <ErrorModal
        isOpened={isErrorModalOpened}
        onClose={() => {
          setIsErrorModalOpened(false);
        }}
        error={error}
      />
    </div>
  );
};
