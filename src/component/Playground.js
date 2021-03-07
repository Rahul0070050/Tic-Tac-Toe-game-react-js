import React from 'react';
import { useGlobalContest } from '../Context';

const Playground = () => {
    const { handleClick, spase, style } = useGlobalContest()
    return (
        <div className={style ? `${style} playground` : `playground`}>
            {spase.map((cols) => {
                const { id, player } = cols;
                return <div key={id} id={id} onClick={handleClick} > {player}</div>
            })}
        </div >
    );
}

export default Playground;
