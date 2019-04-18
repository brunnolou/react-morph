import * as React from 'react';

const PlayerFull = ({ morphs, ...props }) => {
  return (
    <a
      className="bg-white max-w-xs mx-auto shadow-lg rounded-lg cursor-pointer block"
      {...morphs.container}
      {...props}
    >
      <div className="flex">
        <div>
          <img
            className="rounded  md:block"
            src="/public/sky-square.jpg"
            alt="Album Pic"
            width="80"
            {...morphs.image}
          />
        </div>
        <div className="w-full py-2 px-3">
          <div className="flex justify-between">
            <div>
              <h3
                className="text-1xl m-0 text-grey-darkest leading-none font-medium"
                {...morphs.title}
              >
                A Sky Full of Stars
              </h3>
              <p className="text-sm m-0 text-grey float-left" {...morphs.subtitle}>
                Ghost Stories
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default PlayerFull;
