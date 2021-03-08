import React, { useContext, createContext, useState, useEffect } from 'react';
import { targets } from './component/Cols';

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [spase, setSpeces] = useState(targets);
    const [style, setStyle] = useState('');
    const [firstPlay, setFirstPlay] = useState(null)
    const [won, setWon] = useState('');
    const [start, setStart] = useState(false);
    const [finish, setFinish] = useState(false);
    const [started, setStarted] = useState(false)
    const handleClick = (e) => {
        if (finish) return
        setStarted(true)
        let TID = Number(e.target.id);
        const oldSpace = spase.filter(spase => spase.id !== TID);
        if (firstPlay) {
            const { id, player } = spase.find(spase => spase.id === TID);
            if (player) return
            setSpeces((space) => {
                let updatedSpace = [...oldSpace, { id, player: "O" }].sort((a, b) => a.id > b.id ? 1 : -1)
                playerWon(TID, updatedSpace);
                return updatedSpace
            })
            setFirstPlay(false);
        } else {
            const { id, player } = spase.find(spase => spase.id === TID);
            if (player) return
            setSpeces((space) => {
                let updatedSpace = [...oldSpace, { id, player: "X" }].sort((a, b) => a.id > b.id ? 1 : -1);
                playerWon(TID, updatedSpace);
                return updatedSpace
            })
            setFirstPlay(true);
        }

    }

    const playerWon = (TED, fullSpace) => {
        let { player } = fullSpace.find(spase => spase.id === TED)
        if (player === fullSpace[0].player) {
            if (player === fullSpace[1].player && player === fullSpace[2].player) {
                setWon(player)
                setFinish(true)
                setStyle('top-row')
            }
            if (player === fullSpace[3].player && player === fullSpace[6].player) {
                setWon(player)
                setFinish(true)
                setStyle('top-to-bottom-left-col')
            }
            if (player === fullSpace[4].player && player === fullSpace[8].player) {
                setStyle('top-left-to-bottom-tight')
                setWon(player)
                setFinish(true)
            }
        } else if (player === fullSpace[1].player) {
            if (player === fullSpace[4].player && player === fullSpace[7].player) {
                setWon(player)
                setFinish(true)
                setStyle('top-to-bottom-center-col')
            }
        } else if (player === fullSpace[2].player) {
            if (player === fullSpace[5].player && player === fullSpace[8].player) {
                setWon(player)
                setFinish(true)
                setStyle('top-to-bottom-right')
            }
            if (player === fullSpace[4].player && player === fullSpace[6].player) {
                setWon(player)
                setFinish(true)
                setStyle('top-right-to-bottom-left')
            }
        } else if (player === fullSpace[3].player) {
            if (player === fullSpace[4].player && player === fullSpace[5].player) {
                setStyle('center-row')
                setWon(player)
                setFinish(true)
            }
        } else if (player === fullSpace[6].player) {
            if (player === fullSpace[7].player && player === fullSpace[8].player) {
                setStyle('bottom-row')
                setWon(player)
                setFinish(true)
            }
        }
    }
    const handleRestart = () => {
        setSpeces(targets);
        setStyle('')
        setWon('')
        setFinish(false)
        setStarted(false)
        let random = Math.floor(Math.random() * 11)
        if (random / 2 === 0) {
            setFirstPlay(true) // true first
        } else {
            setFirstPlay(false) // false ai first play 
        }
    }
    useEffect(() => {
        let random = Math.floor(Math.random() * 11)
        if (random / 2 === 0) {
            setFirstPlay(true) // true first
        } else {
            setFirstPlay(false) // false ai first play 
        }
    }, [])

    const startGame = () => {
        setStart(true)
    }

    const state = {
        handleClick,
        startGame,
        start,
        started,
        won,
        spase,
        style,
        finish,
        handleRestart

    }
    return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}


const useGlobalContest = () => {
    return useContext(AppContext)
}

export { AppProvider, useGlobalContest };
