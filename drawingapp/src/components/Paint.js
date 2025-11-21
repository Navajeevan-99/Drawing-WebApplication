import React, { useRef, useState } from 'react'
import { Layer, Line, Stage } from 'react-konva'

const Paint = () => {
  let isdrawingref=useRef(false);
  let isdrawingbuttonenable=useRef(false);
  const stageref=useRef(null)
  const [lines,setlines]=useState([])

  const drawingbutton=()=>{
    if (isdrawingbuttonenable.current===false){
      isdrawingbuttonenable.current=true;
    }
    else{
      isdrawingbuttonenable.current=false;

    }
    console.log(isdrawingbuttonenable.current);

  }

  const setdrawing=()=>{
    isdrawingref.current=false;
  }
  const stageselection=()=>{
    isdrawingref.current=false;
    console.log(isdrawingref.current);
  }
  const handlemousedown=(e)=>{
    if (e.evt && e.evt.button===2) return;
    isdrawingref.current=true;
    if (!isdrawingbuttonenable.current) return;
    const pos=stageref.current.getPointerPosition();
    const newline={
      points: [pos.x,pos.y],
      stroke: 'black',
      strokeWidth: 5,
      tension: 0.5,
      linCap: 'round',
      lineJoin: 'round',
    }
    setlines([...lines,newline])
    console.log('down')
    console.log(isdrawingbuttonenable.current); 
    console.log(isdrawingref.current); 
    
  }
  const handlemousemove=(e)=>{
    if (!isdrawingref.current || !isdrawingbuttonenable.current) return;
    
    const pos=stageref.current.getPointerPosition();
    setlines((prev)=>{
      let next=prev.slice();
      let last=next[next.length-1];
      if (!last) return next;
      last.points=last.points.concat([pos.x,pos.y]);
      console.log('moving...')
      console.log(isdrawingref.current);
      console.log(isdrawingbuttonenable.current);
      return next;
      


    })
    
    


  }
  

  return (
    <>
    <button onClick={drawingbutton}>line</button>
    <button >singleline</button>
    <Stage height={1000} width={1000}  onMouseDown={handlemousedown} ref={stageref}  onMouseMove={handlemousemove} onTouchMove={handlemousemove} onMouseUp={setdrawing}>
      <Layer>
        {
        lines.map((line,i)=>(
      <Line
      key={i}
      {...line}
      
      />))}
      </Layer>

    </Stage>
    </>
    
  )
}

export default Paint