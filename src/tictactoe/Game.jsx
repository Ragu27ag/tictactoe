import React, { useEffect, useReducer } from 'react'
import { GiCrossedSabres, GiEdgedShield } from 'react-icons/gi';
import styles from './game.module.css'

const Cross = ({ size }) => (<GiCrossedSabres color='#545454' size={size} />);
const Circle = ({ size }) => (<GiEdgedShield color='#545454' size={size} />);



const Box = ({ marker, index, handleplay }) => {
    return (<button style={{ height: '200px', width: '200px', background: 'none', border: 'none' }} onClick={() => handleplay(index)}>
        {marker === 'x' && <Cross size={50} />}
        {marker === 'o' && <Circle size={50} />}

    </button>)
}

const Board = ({ boarddata, handleplay }) => {

    return (<div style={{ height: '600px', width: '600px', display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
        {boarddata.map((value, index) => (
            <Box key={`${value}-${index}`} marker={value} index={index} handleplay={handleplay} />
        ))}
        <div className={styles.hozstrip} style={{ position: 'absolute', top: '195px' }}></div>
        <div className={styles.hozstrip} style={{ position: 'absolute', top: '395px' }}></div>
        <div className={styles.verstrip} style={{ position: 'absolute', left: '195px' }}></div>
        <div className={styles.verstrip} style={{ position: 'absolute', left: '395px' }}></div>
    </div>)
}

const initialval = {
    player: 'x',
    boarddata: ['', '', '', '', '', '', '', '', '']
}

const reducer = (state, action) => {

    switch (action.type) {
        case 'X_PLAY':
            let tempdata = [...state.boarddata]
            console.log('1st' + tempdata)
            if (tempdata[action.index] !== '') {
                return state
            }
            tempdata[action.index] = 'x';
            console.log('2nd' + tempdata)
            return {
                ...state,
                player: 'o',
                boarddata: tempdata
            }
        case 'O_PLAY':
            let tempboarddata = [...state.boarddata]
            if (tempboarddata[action.index] !== '') {
                return state
            }
            tempboarddata[action.index] = 'o';
            return {
                ...state,
                player: 'x',
                boarddata: tempboarddata
            }
        case 'RESET':
            return initialval

        default:
            return state

    }




}



function Game() {


    const [state, dispatch] = useReducer(reducer, initialval)

    const checkwin = () => {
        const data = state.boarddata;
        let winflag = false;
        let winner = ''


        if (data[0] !== '' && data[0] === data[3] && data[0] === data[6]) {
            winflag = true;
            if (data[0] === 'x') {
                winner = 'x'
            }
            else {
                winner = 'y'
            }
        }

        if (data[1] !== '' && data[1] === data[4] && data[1] === data[7]) {
            winflag = true;
            if (data[1] === 'x') {
                winner = 'x'
            }
            else {
                winner = 'y'
            }
        }

        if (data[2] !== '' && data[2] === data[5] && data[2] === data[8]) {
            winflag = true;
            if (data[2] === 'x') {
                winner = 'x'
            }
            else {
                winner = 'y'
            }
        }

        if (data[0] !== '' && data[0] === data[1] && data[0] === data[2]) {
            winflag = true;
            if (data[0] === 'x') {
                winner = 'x'
            }
            else {
                winner = 'y'
            }
        }

        if (data[3] !== '' && data[3] === data[4] && data[3] === data[5]) {
            winflag = true;
            if (data[3] === 'x') {
                winner = 'x'
            }
            else {
                winner = 'y'
            }
        }

        if (data[6] !== '' && data[6] === data[7] && data[6] === data[8]) {
            winflag = true;
            if (data[6] === 'x') {
                winner = 'x'
            }
            else {
                winner = 'y'
            }
        }

        if (data[0] !== '' && data[0] === data[4] && data[0] === data[8]) {
            winflag = true;
            if (data[0] === 'x') {
                winner = 'x'
            }
            else {
                winner = 'y'
            }
        }

        if (data[2] !== '' && data[2] === data[4] && data[2] === data[6]) {
            winflag = true;
            if (data[2] === 'x') {
                winner = 'x'
            }
            else {
                winner = 'y'
            }
        }

        if (winflag) {
            setTimeout(() => {
                alert(`${winner} Winner`)
                dispatch({ type: 'RESET' })
            }, 500)
        }
        else if (state.boarddata.filter((val) => val === '').length === 0) {
            setTimeout(() => {
                alert(`Match Draw`)
                dispatch({ type: 'RESET' })
            }, 500)
        }
    }

    useEffect(() => {
        checkwin()
    }, [state.player])

    const handleplay = (index) => {
        //console.log(index)
        if (state.player === 'x') {

            dispatch({ type: 'X_PLAY', index: index })
        }
        else {
            dispatch({ type: 'O_PLAY', index: index })
        }

    }


    return (

        <Board boarddata={state.boarddata} handleplay={handleplay} />
    )
}

export default Game;