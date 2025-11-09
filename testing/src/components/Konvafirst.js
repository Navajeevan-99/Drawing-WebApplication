import React, { useState,useRef ,useEffect} from 'react'
import {Stage,Layer,Rect, Transformer,Circle,Line } from 'react-konva'
import {flushSync} from 'react-dom'
import './Konvafirst.css'
const Konvafirst = () => {
  const [position,setposition]=useState([{x: 50,y: 50,width : 100 , height: 100,fill: 'blue'}])
  const [isselect,setisselect]=useState(false);
  const [rect,setrect]=useState();
  const transformerRef=useRef();
   const handleselect=(e)=>{
   
    flushSync(
        ()=>{
          setrect(e.target);
          flushSync(()=>{
          setisselect(false);}
        )
          setisselect(true);
          
        }
      );
    
    console.log(rect);
    console.log(isselect)
  }
  const handledeselect=(e)=>{
    if (e.target.getStage()===e.target){
      flushSync(
        ()=>{
          setisselect(false);
        }
      );
    }
    console.log(isselect);

  }
  useEffect(()=>{
    if (isselect){
      transformerRef.current.nodes([rect])
      transformerRef.current.getLayer().batchDraw();
      console.log(rect);
    }
  },[isselect])
  const transformend=(e)=>{
    const node=rect;
    let sx=node.scaleX();
    let sy=node.scaleY();
    let index=e.target.index-1;
    flushSync(()=>{
      node.scaleX(1);
      node.scaleY(1);
       setposition(position.map((rect, i) =>
    i === index
      ? {
          ...rect,
          x: node.x(),
          y: node.y(),
          width: Math.max(5, node.width() * sx),
          height: Math.max(5, node.height() * sy)
        }
      : rect
  ));
    })
    console.log(position);
  }
    

  return (
    <div className='containertop'>
        <div className='header'>
        <button onClick={addrect}>Add Rectangle</button>
        </div>
        <div className='content'>
        <Stage className='stage' width={window.innerWidth} height={window.innerHeight} onClick={handledeselect} classNames='stage'>
          <Layer>
            {/* <Rect
            x={position.x}
            y={position.y}
            ref={rectRef}
            width={position.width}
            height={position.height}
            fill={'red'}
            draggable
           
            onClick={handleselect}
            onTransformEnd={transformend}
          
            /> */}
            <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldbox,newbox)=>{
              if (newbox.width<5 || newbox.height<5){
                return oldbox;
              }
              return newbox;
            }

            }
            />
            {
              position.map((p,i)=>{
                return <Rect
                {...p}
                key={i}
                draggable
                onDragEnd={(e)=>{
                console.log(e.target.index);
                }}
                onClick={handleselect}
                onTransformEnd={transformend}
                />
              }
              )
            }
            {
              position.map((p,i)=>{
                return <Circle
                {...p}
                key={i}
                draggable
                onDragEnd={(e)=>{
                console.log(e.target.index);
                }}
                onClick={handleselect}
                onTransformEnd={transformend}
                />
              }
              )
            }
          </Layer>

        </Stage>
        </div>
    </div>
  )
}

export default Konvafirst