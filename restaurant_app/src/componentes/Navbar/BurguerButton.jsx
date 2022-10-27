import React from 'react'
import styled from 'styled-components'

function BurguerButton(props) {
  return (
    <Burguer>
        <div    onClick={props.handleClick} 
                //esto es un if**
                className={`icon nav-icon-8 ${props.clicked ? 'open' : ''}`}> 
            <span></span>
            <span></span>
            <span></span>
        </div>
    </Burguer>
  )
}
export default BurguerButton
const Burguer = styled.div`

.nav-icon-8{
    width: 35px;
    height: 30px;
    margin: 10px 10px;
    position: relative;
    cursor: pointer;
    display: inline-block;
  }
  .nav-icon-8 span{
    background-color:#FFF;
    position: absolute;
    border-radius: 2px;
    transition: .3s cubic-bezier(.8, .5, .2, 1.4);
    width:100%;
    height: 4px;
  }
  .nav-icon-8 span:nth-child(1){
    top:0px;
    left: 0px;
  }
  .nav-icon-8 span:nth-child(2){
    top:13px;
    left: 0px;
  }
  .nav-icon-8 span:nth-child(3){
    bottom:0px;
    left: 0px;
  }
  .nav-icon-8:not(.open):hover span:nth-child(1){
    transform: scaleX(.8);
  }
  .nav-icon-8:not(.open):hover span:nth-child(2){
    transform: scaleX(.5);
  }
  .nav-icon-8:not(.open):hover span:nth-child(3){
    transform: scaleX(.8);
  }
  .nav-icon-8.open span:nth-child(1){
    top: 13px;
  }
  .nav-icon-8.open span:nth-child(2){
    top:13px;
  }
  .nav-icon-8.open span:nth-child(3){
    top: 13px;
  }
`