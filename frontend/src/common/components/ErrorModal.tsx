import { Modal } from './ui/Modal';

type ErrorModalProps = {
  isOpened: boolean;
  onClose: () => void;
  error: string;
};

export const ErrorModal = ({ isOpened, onClose, error }: ErrorModalProps) => {
  return (
    <>
      <Modal isOpened={isOpened} onClose={onClose}>
        <div className="mt-5 p-5">
          <h2 className="text-3xl">Error!</h2>
          <p className="my-5 text-lg p-0">{error}</p>
          <button
            className="select-none rounded-md px-10 py-3 text-lg bg-red-600 text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};
