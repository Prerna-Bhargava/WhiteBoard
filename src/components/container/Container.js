import React, { useState } from 'react'
import Board from '../board/Board'
import Makenotes from './Makenotes'
import './style.css'
import eraser from '../../Images/Eraser.svg'
import download from '../../Images/Download.svg'
import pencil from '../../Images/Pencil.svg'
import undoImg from '../../Images/Undo.svg'
import redoImg from '../../Images/Redo.svg'
import note from '../../Images/Note.svg'



export default function Container() {
    const [color, setColor] = useState("#FF0000");
    const [brushsize, setBrushsize] = useState("5");
    const [erase, setEraser] = useState('false');
    const [ispencil, setpencil] = useState('true');
    const [undo, setundo] = useState('false');
    const [redo, setredo] = useState('false');
    const [isdownload, setdownload] = useState('false');
    const [isnote, setNotes] = useState('false');
    const [isClicked, setIsClicked] = useState(false)

    function setstyle(e) {
        var targets = document.getElementsByClassName('active-tool')

        for (var i = 0; i < targets.length; i++) {
            targets[i].classList.remove('active-tool')
        }
        if (e) {
            e.target.parentElement.classList.add('active-tool')
            if (e.target.parentElement.classList.contains('undo') || e.target.parentElement.classList.contains('redo')) {
                setTimeout(() => {
                    e.target.parentElement.classList.remove('active-tool')
                    document.getElementById('pencil').parentElement.classList.add('active-tool')
                }, 600)
            }
            else if (e.target.parentElement.classList.contains('download')) {
                setTimeout(() => {
                    e.target.parentElement.classList.remove('active-tool')
                    document.getElementById('pencil').parentElement.classList.add('active-tool')
                }, 1000)
            }
        }
    }
    function changecolor(e) {
        setColor(e.target.value)
        setundo('false')
        setredo('false')
        setdownload('false')

    }
    function changesize(e) {
        setBrushsize(e.target.value)
        setundo('false')
        setredo('false')
        setdownload('false')
    }
    function selectTool(e) {
        setdownload('false')
        setpencil('false')
        setEraser("false");
        setundo('false');
        setredo('false');
        setIsClicked(!isClicked)
        setstyle(e)

    }
    return (
        <div className='container'>

            <div className='Options'>

                <div className='tools active-tool ' onClick={(e) => {
                    selectTool(e);
                    setpencil('true')

                }} >
                    <img id='pencil' className='active' src={pencil} alt='' />
                </div>

                <div className='eraser tools' onClick={(e) => {
                    selectTool(e);
                    setEraser('true')

                }} >
                    <img src={eraser} id='eraser' alt='' />
                </div>

                <div className='notes tools' onClick={(e) => {
                    selectTool(e);
                    setNotes('true');

                }} >
                    <img src={note} alt='' />
                </div>

                <div className='Color-options'>
                    <div className='color-picker-container '>

                        &nbsp;
                        <input type="color" value={color} onChange={changecolor}>
                        </input>
                    </div>

                    <div className='brush-size-container '>
                        &nbsp;
                        <select value={brushsize} onChange={changesize}>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                        </select>
                    </div>
                </div>

                <div className='download tools' onClick={(e) => {
                    selectTool(e);
                    setdownload('true')
                }} >
                    <img src={download} alt='' />
                </div>

                <div className='undo tools' onClick={(e) => {
                    selectTool(e);
                    setundo('true')
                }} >
                    <img src={undoImg} id='undo' alt='' />
                </div>

                <div className='redo tools' onClick={(e) => {
                    selectTool(e);
                    setredo('true')

                }} >
                    <img src={redoImg} id='redo' alt='' />
                </div>


            </div>


           {isnote=='true' && <Makenotes isnote={isnote} setNotes={setNotes}   />}
           

            <div className='board-container'>
                <Board isClicked={isClicked} color={color} brushsize={brushsize} pencil={ispencil}
                    eraser={erase} undo={undo} redo={redo}
                    isdownload={isdownload} isnote={isnote} />
            </div>

        </div>
    )
}
