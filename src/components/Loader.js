import { useState } from 'react';

function Loader({ fadeOffLoader}) {
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className={'preloader ' + (fadeOffLoader ? 'fadeOff' : '')}>
      <div className="loader"></div>
    </div>
  );
}
export default Loader;
