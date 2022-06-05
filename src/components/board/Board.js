import React, { useEffect, useState } from 'react'
import './style.css'
let undoState = [];
let redoState = [];
let line = [];

export default function Board(props) {
    useEffect(() => {
        drawCanvas()
    }, [])
    useEffect(() => {
        // to change content brush size and color without re rende

        window.ctx.lineWidth = props.brushsize;
        window.ctx.strokeStyle = props.color;
       
        if (props.pencil == 'true') {
            console.log(props.brushsize)
            window.ctx.lineWidth = props.brushsize;
            window.ctx.strokeStyle = props.color;
        }
        else if (props.undo == 'true') {
            undo();
        }
        else if (props.redo == 'true') {
            redo();
        }
        else if (props.eraser == 'true') {
            window.ctx.lineWidth = props.brushsize;
            window.ctx.strokeStyle = 'whitesmoke'
        }
        else if(props.isdownload == 'true'){
            download();
        }
       
        
    }, [props])

    function drawCanvas() {
        window.canvas = document.querySelector('#board');
        window.ctx = window.canvas.getContext('2d');
        var canvas = window.canvas;
        var ctx = window.ctx;

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        console.log(canvas.width)
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));
        console.log(canvas.height)

        let isMouseDown = false;

        canvas.addEventListener('mousedown', function (e) {

            isMouseDown = true;
            let x = e.clientX;
            let y = e.clientY - this.offsetTop;
            ctx.beginPath();
            ctx.moveTo(x, y);
            let pointObj = {
                id: "md",
                x,
                y,
                lineWidth: ctx.lineWidth,
                strokeStyle: ctx.strokeStyle

            }
            line.push(pointObj)
        });

        canvas.addEventListener('mousemove', function (e) {

            if (isMouseDown) {
                let x = e.clientX;
                let y = e.clientY - this.offsetTop;
                ctx.lineTo(x, y);
                ctx.stroke();
                let pointObj = {
                    id: "mm",
                    x,
                    y,

                }
                line.push(pointObj)

            }

        });

        canvas.addEventListener('mouseup', function (e) {

            isMouseDown = false;
            if (line.length > 0)
                undoState.push(line)
            line = [];


        });

        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

    }
    function download(){

        let downloadTag = document.createElement("a");
        downloadTag.download ='canvas.png';
        downloadTag.href=window.canvas.toDataURL("image/png");
        downloadTag.click();

    }
    function undo() {

        if (undoState.length) {
            let latest = undoState.pop();
            while (latest.length == 0) {
                latest = undoState.pop();
            }
            redoState.push(latest);
            window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
            redrawlines();

        }
    }
    function redrawlines() {
        var ctx = window.ctx
        for (let i = 0; i < undoState.length; i++) {
            let line = undoState[i];
            for (let j = 0; j < line.length; j++) {
                let pointObj = line[j];
                if (pointObj.id == 'md') {

                    ctx.strokeStyle = pointObj.strokeStyle;
                    ctx.lineWidth = pointObj.lineWidth;
                    ctx.beginPath();
                    ctx.moveTo(pointObj.x, pointObj.y);


                }
                else {
                    ctx.lineTo(pointObj.x, pointObj.y);
                    ctx.stroke();

                }
            }

        }
    }

    function redo() {
        var ctx = window.ctx
        if (redoState.length) {
            let line = redoState.pop();
            for (let i = 0; i < line.length; i++) {
                let pointObj = line[i];
                if (pointObj.id == 'md') {

                    ctx.strokeStyle = pointObj.strokeStyle;
                    ctx.lineWidth = pointObj.lineWidth;
                    ctx.beginPath();
                    ctx.moveTo(pointObj.x, pointObj.y);

                }
                else {
                    ctx.lineTo(pointObj.x, pointObj.y);
                    ctx.stroke();


                }
            }
            undoState.push(line)
        }
    }
    return (
        <>
            <div id='sketch'>
                <canvas className='board' id='board'></canvas>

            </div>

        </>
    )
}
