import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";

const Styled = styled.div`
    .dropsWrap {
        display: flex;
        flex-wrap: wrap;
        width: 500px;

        .drops {
            width: 150px;
            flex-direction: column;
            align-items: center;

        }

        .placeholderImg {
            width: 140px;
            height: 140px;
            border: 1px solid pink;
        }

        .label {
            text-align: center;
            padding-bottom: 20px;
        }
    }

    .dragsWrap {
        display: flex;
        flex-wrap: wrap;
        width: 500px;

        .drags {
            min-width: 60px;
            padding: 10px 0;
            background-color: blue;
            margin: 5px;
            text-align: center;
            cursor: pointer;

            &.selected {
                background-color: #ff6666;
            }
        }
    }


    .anim-enter-active {
        transform: translate(50px, 50px);
       // transition: transform 1000ms;
  }

  .anim-exit {
    transform: translate(2px, 2px);
  }
  .anim-exit-active {
    transform: translate(100px, 100px);
    transition: transform 1000ms;
  }

`

export default function DragDropImageLabel(){
    const [state, setState] = useState({
        currentSelect: 'Four', //null,
        animating: false,
        dragPos: {top: 400, left: 200}, //null,
        transStyles: getTransStyles({dx: 0, dy: 0}),
       drags: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'] ,
       drops: ['one', 'two', 'three', 'four', 'five', 'six']
    })
    return (
        <Styled>
            <div className="dropsWrap">
            {
                state.drops.map((item, i) => (
                    <div className="drops" onClick={(e) => {
                        console.log('i', i, state.currentSelect);
                        if(state.currentSelect){
                            let rect= e.target.getBoundingClientRect();
                            let offset = {dx: rect.left - state.dragPos.left, dy: rect.top - state.dragPos.top}
                            let transStyles = getTransStyles(offset);
                            setState({...state, animating: true, transStyles});
                        }
                    }}>
                        <div className="placeholderImg" />
                        <div className="label">{item}</div>
                    </div>
                ))
            }
            </div>
            <div className="dragsWrap">

                {
                   state.drags.map((item, i) => state.currentSelect === item ? (<DragComp item={item} key={item}  
                    transStyles={state.transStyles} animating={state.animating} onExited = {() => {
                        let drags = state.drags.filter(item => item !== state.currentSelect);
                        setState({...state, drags, currentSelect: null, animating: false})
                    }} />) : (
                        <div className="drags" onClick={(e) => {
                            console.log('drag :', e.target.getBoundingClientRect());
                    const rect = e.target.getBoundingClientRect();
                    setState({...state, currentSelect: item, dragPos: {top: rect.top, left: rect.left}})
                        }}>
                            <div className="label">{item}</div> </div>
                    ))
                }
            </div>
        </Styled>
    )

}

function getTransStyles(offset){
    return {
        entering: { transform: 'translate(0px, 0px)' },
        entered:  { transform: 'translate(0px, 0px)' },
        exiting:  { transform: `translate(${offset.dx}px, ${offset.dy}px)`,
            transition: 'transform 400ms'
         },
        exited:  { transform: `translate(${offset.dx}px, ${offset.dy}px)` },
    }
}


function DragComp(props){
    const nodeRef = useRef(null)
    console.log('animating', props.animating);
    return (<Transition in={!props.animating} nodeRef={nodeRef}   timeout={400} onExit={() => {
        console.log('onExit');
    }}
    
    onExited={() => {
        console.log('onExited');
        props.onExited();
    }}>
        {
            state => {
                console.log('state =', state);
                return (
                <div ref={nodeRef} style={props.transStyles[state]} className="drags selected">
                <div className="label">{props.item}</div>
            </div>
            )
            }}
       
    </Transition>)

}