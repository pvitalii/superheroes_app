import { ReactNode } from 'react';

type ModalProps = {
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = (props: ModalProps) => {
  return props.isOpened ? (
    <div className="fixed z-1 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-40">
      <div className="bg-white mx-auto my-15% p-5 w-fit min-w-50% max-w-70% rounded-md">
        <span
          className="text-gray-400 float-right text-3xl font-bold hover:text-black cursor-pointer select-none"
          onClick={props.onClose}
        >
          &times;
        </span>
        {props.children}
      </div>
    </div>
  ) : null;
};
