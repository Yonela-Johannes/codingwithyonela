import { ThreeDots } from 'react-loader-spinner';

const Loader = () =>
{
  return (
    <div>
      <ThreeDots
        radius='9'
        color='#7F57F1'
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default Loader;
