import { useNavigate } from 'react-router-dom';

type PageHeaderProps = {
  title?: string;
};

export const PageHeader = ({ title }: PageHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center mb-12">
      <a
        className="text-black no-underline text-5xl cursor-pointer select-none px-7 py-5 absolute"
        onClick={() => navigate(-1)}
      >
        &#8249;
      </a>
      <h1 className="text-3xl flex-1 text-center">{title}</h1>
    </div>
  );
};
