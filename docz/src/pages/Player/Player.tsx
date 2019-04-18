import React, { useState } from 'react';
import { useMorphKeys } from 'react-morph';
import PlayerFull from './PlayerFull';
import PlayerMini from './PlayerMini';

const Player = () => {
  const morphs = useMorphKeys(['container', 'title', 'subtitle', 'image']);

  const [toggle, setToggle] = useState(false);

  return (
    <div className="w-full relative">
      <div className="h-2 bg-red-light" />
      <div className="p-8 bg-red-lightest">
        {!toggle ? (
          <PlayerMini morphs={morphs} onClick={() => setToggle(!toggle)} />
        ) : (
          <PlayerFull morphs={morphs} onClick={() => setToggle(!toggle)} />
        )}
      </div>
    </div>
  );
};

export default Player;
