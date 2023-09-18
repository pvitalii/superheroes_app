import { Modal } from './ui/Modal';

type SuccessModalProps = {
  isOpened: boolean;
  onClose: () => void;
  body: string;
};

export const SuccessModal = ({ isOpened, onClose, body }: SuccessModalProps) => {
  return (
    <>
      <Modal isOpened={isOpened} onClose={onClose}>
        <div className="mt-5 p-5">
          <h2 className="text-3xl">Success!</h2>
          <p className="my-5 text-lg p-0">{body}</p>
          <button
            className="select-none rounded-md px-10 py-3 text-lg bg-green-600 text-white"
            onClick={onClose}
          >
            Ok
          </button>
        </div>
      </Modal>
    </>
  );
};
