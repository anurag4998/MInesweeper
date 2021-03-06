import React, { Fragment, useEffect, useState } from 'react';
import { GiGolfFlag,GiStarProminences } from "react-icons/gi";

const Square = (props) => {
   
    const [showNumber,setShowNumber] = useState(0)
    const [showMine, setShowMine] = useState(0)
    const [showFlag, setShowFlag] = useState(0)

    useEffect(() => {
        setShowNumber(0)
        setShowMine(0)
        setShowFlag(0)
    },[props.square])
    
    const handleRightClick = (e) => {
        e.preventDefault();
        if(showNumber || showMine || (!props.square.isMine && props.square.isRevealed)) return;
        showFlag ? setShowFlag(0) : setShowFlag(1)        
    }
    
   
    const handleOpen = (e) => {
    
        if(showFlag|| props.square.isRevealed) return;
        if(props.square.isMine === true)
            {
                setShowMine(1)
                props.handleLoss()
                return;
            } 
        if(props.square.number_of_minesAround === 0)
        {
            props.click(props.square.id)
        }
        if(showFlag || showMine)  return;
        setShowNumber(1)
        props.square.isRevealed = true;
        props.countOpened()
    }

   
    return(
        <Fragment>
            <div className = {(showNumber || showMine || showFlag || (!props.square.isMine && props.square.isRevealed)) ? 'open' :'closed'} onClick = { showNumber||showMine||props.open? undefined :  handleOpen} onContextMenu = {handleRightClick}>
                { !props.square.isMine &&   ( showNumber || props.square.isRevealed  )? props.square.number_of_minesAround === 0 ? "" : props.square.number_of_minesAround : undefined}
                {showMine || (props.square.isRevealed  && props.square.isMine )? <GiStarProminences/> : undefined}
                {showFlag && !(props.square.isRevealed)? <GiGolfFlag/> : ""}

            </div>

        </Fragment>
    )
}

export default Square