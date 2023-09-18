import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ActionFormValues } from '../types/superhero/action-form-values.type';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ReactNode, useEffect, useState } from 'react';
import { allSuperpowersThunk } from '../../store/slices/superpowers/superpowers.thunks';
import { StateHandler } from './StateHandler';
import { Image } from '../types/image.type';
import { ICONS } from '../icons';

type HeroFormProps = {
  initialValues: ActionFormValues;
  onSubmit: (values: ActionFormValues) => void;
};

export const HeroForm = (props: HeroFormProps) => {
  const dispatch = useAppDispatch();
  const { isLoading, error, data: superpowers } = useAppSelector((state) => state.superpowers);
  const [images, setImages] = useState<{ id: number | string; url: string }[]>(
    props.initialValues.images as Image[]
  );

  useEffect(() => {
    dispatch(allSuperpowersThunk());
  }, []);

  const validationSchema = Yup.object().shape({
    nickname: Yup.string().max(75, 'Too Long!').required('Required!'),
    real_name: Yup.string().max(75, 'Too Long!').required('Required!'),
    catch_phrase: Yup.string().max(300, 'Too Long!').required('Required!'),
    origin_description: Yup.string().max(700, 'Too Long!').required('Required!'),
    superpowers: Yup.array().test('required', 'Required!', (value) => {
      const check = (value as string[]).length > 0;
      return check;
    }),
    images: Yup.array()
      .of(
        Yup.mixed()
          .test('fileSize', 'Maximum file size is 10MB', (value) => {
            if ((value as File).size) {
              const check = (value as File).size <= 10 * 1024 * 1024;
              return check;
            }
            return true;
          })
          .test('fileType', 'Accepted file types are: jpeg, jpg, png', (value) => {
            if ((value as File).type) {
              const check = (value as File).type.match(/image\/(jpg|jpeg|png)$/);
              return Boolean(check);
            }
            return true;
          })
      )
      .test('required', 'Required!', (value) => {
        const check = (value as File[]).length > 0;
        return check;
      })
  });

  const handleImagesChange = (fileList: FileList) => {
    const files: (File | null)[] = new Array<File>();
    const length = fileList.length;
    let i = 0;
    while (i < length) {
      files[i] = fileList.item(i);
      i++;
    }
    const newImages = files.map((file) => {
      if (!file) {
        return {} as Image;
      }
      if (!file.type.match(/image\/(jpg|jpeg|png)$/) || file.size > 10 * 1024 * 1024) {
        return {
          id: file.name,
          url: ICONS.ERROR
        };
      }
      return {
        id: file.name,
        url: URL.createObjectURL(file)
      };
    });
    setImages([...images, ...newImages]);
    return files;
  };

  const handleRemoveImage = (url: string) => {
    setImages(images.filter((image) => image.url !== url));
  };
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched, setFieldValue, getFieldMeta }) => (
        <>
          <div className="border-gray-500 border-4 border-dashed flex items-center justify-center h-fit min-h-max p-5">
            {(getFieldMeta('images').value as File[]).length > 0 ? (
              <div className="grid grid-cols-5 gap-3 auto-rows-fr">
                {images.map((image) => {
                  return (
                    <div key={image.id} className="relative min-h-full:">
                      <span
                        onClick={() => {
                          handleRemoveImage(image.url);
                          setFieldValue(
                            'images',
                            (getFieldMeta('images').value as (File | Image)[]).filter((file) => {
                              if ((file as File).name) {
                                return (file as File).name !== image.id;
                              } else if (file.hasOwnProperty('id')) {
                                return (file as Image).id !== image.id;
                              }
                            })
                          );
                        }}
                        className="text-red-600 right-1 top-1 absolute text-3xl font-bold cursor-pointer select-none bg-white rounded-full px-2 pb-0.5 border-solid border-black border-2"
                      >
                        &times;
                      </span>
                      <img className="select-none" src={image.url}></img>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-52 flex items-center justify-center">
                <p className="text-lg text-gray-500">Uploaded images will be shown here</p>
              </div>
            )}
          </div>
          {errors.images ? (
            <div className="text-xs text-red-600 absolute flex flex-col">
              {errors.images as ReactNode}
            </div>
          ) : null}
          <Form className="flex flex-col items-center gap-6 p-8 px-60 w-full">
            <div className="w-full flex justify-center">
              <label className="flex items-center gap-2 cursor-pointer border-2 rounded-md border-solid border-black p-5">
                Add images
                <input
                  type="file"
                  name="images"
                  className="hidden"
                  multiple
                  accept="image/jpg, image/png, image/jpeg"
                  onChange={(e) => {
                    if (
                      images.map((image) => image.id).includes(e.target.value.split('\\').pop()!)
                    ) {
                      console.log('sdf');
                      e.target.value = '';
                      return;
                    }
                    const fileList = e.currentTarget.files;
                    if (fileList && fileList.length > 0) {
                      const files = handleImagesChange(fileList);
                      setFieldValue('images', [
                        ...(getFieldMeta('images').value as File[]),
                        ...files
                      ]);
                      e.target.value = '';
                    }
                  }}
                />
              </label>
            </div>

            <div className="w-full">
              <Field
                name="nickname"
                placeholder="Nickname"
                className="w-full py-3 px-2 border-2 border-solid border-black"
              />
              {errors.nickname && touched.nickname ? (
                <div className="text-xs text-red-600 absolute">{errors.nickname}</div>
              ) : null}
            </div>

            <div className="w-full">
              <Field
                name="real_name"
                placeholder="Real name"
                className="w-full py-3 px-2 border-2 border-solid border-black"
              />
              {errors.real_name && touched.real_name ? (
                <div className="text-xs text-red-600 absolute">{errors.real_name}</div>
              ) : null}
            </div>

            <div className="w-full">
              <Field
                name="origin_description"
                placeholder="Origin description"
                as="textarea"
                className="w-full py-3 px-2 border-2 border-solid border-black"
              />
              {errors.origin_description && touched.origin_description ? (
                <div className="text-xs text-red-600 absolute">{errors.origin_description}</div>
              ) : null}
            </div>

            <StateHandler isLoading={isLoading} error={error}>
              <div className="w-full">
                <Field
                  as="select"
                  name="superpowers"
                  className="w-full py-3 px-2 border-2 border-solid border-black"
                  multiple
                >
                  {superpowers.map((superpower) => (
                    <option className="p-2" key={superpower.id} value={JSON.stringify(superpower)}>
                      {superpower.name}
                    </option>
                  ))}
                </Field>
                {errors.superpowers && touched.superpowers ? (
                  <div className="text-xs text-red-600 absolute">{errors.superpowers}</div>
                ) : null}
              </div>
            </StateHandler>

            <div className="w-full">
              <Field
                name="catch_phrase"
                placeholder="Catch phrase"
                className="w-full py-3 px-2 border-2 border-solid border-black"
                as="textarea"
              />
              {errors.catch_phrase && touched.catch_phrase ? (
                <div className="text-xs text-red-600 absolute">{errors.catch_phrase}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="border-2 rounded-md border-solid border-black px-10 py-3 text-lg"
            >
              Submit
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
};
