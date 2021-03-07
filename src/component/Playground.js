import React from 'react';
import { useGlobalContest } from '../Context';

const Playground = () => {
    const { handleClick, player, spase, style } = useGlobalContest()
    return (
        <div className={style ? `${style} playground` : `playground`}>
            {spase.map((cols) => {
                const { id, player } = cols;
                return <div key={id} id={id} onClick={handleClick} > {player}</div>
            })}
            { player === 'player' && <h1>First play</h1>}
        </div >
    );
}

export default Playground;
