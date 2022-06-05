import React, { useEffect, useState } from 'react'
import cross from '../../Images/close.png'

import './style.css'

export default function Makenotes(props) {

    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;
    const [text, settext] = useState("");

    useEffect(() => {
        if (props.isnote == 'true') {
            makeNotes();
        }
    }, [])
    function deleteTextArea() {
        settext('')
        document.getElementById('note').style.display = 'none'
        props.setNotes('false')
    }
    function handletextchange(event) {
        settext(event.target.value)
    }
    function dragStart(e) {
        if (window.dragItem == document.activeElement) {
            if (e.type === "touchstart") {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }

            if (e.target === window.dragItem) {
                active = true;
            }
        }
    }
    function dragEnd(e) {

        initialX = currentX;
        initialY = currentY;

        active = false;
    }
    function drag(e) {

        if (active && window.dragItem == document.activeElement) {

            e.preventDefault();

            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, window.container);
        }
    }
    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
    function makeNotes() {
        console.log("hello")
        if (!document.getElementById('note').hasChildNodes()) {

            window.dragItem = document.getElementById('notes-text')
            window.container = document.getElementById('note')

            // Adding event listeners for dragging
            window.container.addEventListener("touchstart", dragStart, false);
            window.container.addEventListener("touchend", dragEnd, false);
            window.container.addEventListener("touchmove", drag, false);
            window.container.addEventListener("mousedown", dragStart, false);
            window.container.addEventListener("mouseup", dragEnd, false);
            window.container.addEventListener("mousemove", drag, false);

        }

    }
    return (
        <>
            <div className='notes' id='note' draggable='true'>
                <div id='notes-text-header'>
                    <img src={cross} alt='' id='crossimg' onClick={deleteTextArea}></img>
                </div>
                <textarea id='notes-text' value={text} rows="8" cols="20" onChange={handletextchange}></textarea>

            </div>

        </>
    )
}
