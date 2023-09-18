import { Dispatch, SetStateAction } from 'react';

type PaginationProps = {
  count: number;
  page: number | string;
  setPage: Dispatch<SetStateAction<number | string>>;
};

export const Pagination = (props: PaginationProps) => {
  const pagesCount = Math.ceil(props.count / 5);
  return (
    <div className="flex gap-2 mx-auto">
      {[...Array(pagesCount)].map((x, i) => (
        <div
          key={i}
          className={`px-6 py-3 cursor-pointer ${
            i + 1 === +props.page
              ? 'text-white bg-black'
              : 'bg-white border-2 border-solid border-black text-black'
          }`}
          onClick={() => props.setPage(i + 1)}
        >
          {i + 1}
        </div>
      ))}

      {pagesCount < 5
        ? [...Array(5 - pagesCount)].map((x, i) => (
            <div
              key={i}
              className="bg-white border-2 border-solid border-gray-400 text-gray-400 px-5 py-3"
            >
              {pagesCount + i + 1}
            </div>
          ))
        : null}
    </div>
  );
};
