import { ReactNode, useState } from 'react';
import { Spinner } from './ui/Spinner';
import { ErrorModal } from './ErrorModal';

type StateHandlerProps = {
  isLoading: boolean;
  error: string | null;
  children: ReactNode;
};

export const StateHandler = ({ isLoading, error, children }: StateHandlerProps) => {
  const [isModalOpened, setIsModalOpened] = useState(true);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorModal
          isOpened={isModalOpened}
          onClose={() => setIsModalOpened(false)}
          error={error}
        />
      ) : (
        children
      )}
    </>
  );
};
