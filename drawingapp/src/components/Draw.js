import './Draw.css';
import React, { useState,useEffect ,useRef} from 'react';
import {FaPencilAlt,FaChevronDown,FaCropAlt,FaExpandArrowsAlt,FaMagic,FaPaintBrush,FaRegSquare, FaRegCircle, FaShapes
    ,FaRegStar, FaRegHeart
 } from 'react-icons/fa';
import { MdRotateLeft, MdRotateRight } from 'react-icons/md';
import { TbPointFilled, TbLine, TbSquare } from 'react-icons/tb';
import { BsTriangle, BsDash, BsHexagon, BsDiamond } from 'react-icons/bs';
import {Stage,Layer,Rect, Transformer,Circle,Line, RegularPolygon, Star,Shape} from 'react-konva'
import {flushSync} from 'react-dom'
import {SketchPicker,CirclePicker} from 'react-color';
import ReactDOMServer from 'react-dom/server'
const Draw=()=>{
    const [position,setposition]=useState([])
    const [isselect,setisselect]=useState(false);
    const [rect,setrect]=useState();
    const transformerRef=useRef();
    const [color, setColor] = useState('#f44336');
    let id=useRef(0);
    const paletteColors = [
    '#000000', '#808080', '#D32F2F', '#FF4081', '#FF5722', '#FFC107',
    '#FFFFFF', '#C8C8C8', '#7B1FA2', '#536DFE', '#FFEB3B', '#4CAF50'
  ];
  const test=()=>{
    console.log(ReactDOMServer.renderToStaticMarkup(ReactDOMServer.renderToStaticMarkup(<BsDash />)))
  }
  const addrect=()=>{
    const newrect={x: 100,y:100,width: 100, height: 100,fill: color,id:id.current, shape : 'rectangle',stroke : 'black', strokeWidth: 2};
    id=id.current+1;
    flushSync(()=>{
      setposition([...position,newrect]);
    })
    console.log(position)
  }
  const addcircle=()=>{
    id=id.current+1;
    
    const newcircle={x: 100,y:100,width: 100, height: 100,fill: color,id: id.current,shape: 'circle',stroke: 'black',strokeWidth: 2};
    flushSync(()=>{
      setposition([...position,newcircle]);
    })
    console.log(position)
  }
  const addtriangle=()=>{
    id=id.current+1;
    const newtriangle={ points:[100,300,200,100,300,300],x: 100,y:100,width: 100, height: 100,fill: color,id: id.current,shape: 'triangle',strokeWidth: 2,stroke: 'black',closed: true};
    flushSync(()=>{
      setposition([...position,newtriangle]);
    })
  }
  const addhexagon=()=>{
    id=id.current+1;
    const newhexagon={ x: 100,y:100,width: 100, height: 100,sides: 6,radius: 50,fill: color,id: id.current,shape: 'hexagon',strokeWidth: 2,stroke: 'black'};
    flushSync(()=>{
      setposition([...position,newhexagon]);
    })

  }
  const adddiamond=()=>{
    id=id.current+1;
    const newdiamond={ x: 100,y:100,width: 100, height: 100,sides: 4,radius: 50,fill: color,id: id.current,shape: 'diamond',strokeWidth: 2,stroke: 'black'};
    flushSync(()=>{
      setposition([...position,newdiamond]);
    })

  }
  const addheart = () => {
  id.current += 1;
  const newheart = {
    id: String(id.current),
    shape: 'heart',
    x: 200,
    y: 200,
    scale: 1,
    fill: color,
    stroke: 'black',
    strokeWidth: 2,
  };
  flushSync(() => setposition(prev => [...prev, newheart]));
};
  const addstar=()=>{
    id=id.current+1;
   const newstar = {
    id: String(id.current),       
    shape: 'star',
    x: 150,
    y: 150,
    numPoints: 5,                  
    innerRadius: 20,
    outerRadius: 50,
    fill: color,
    stroke: 'black',
    strokeWidth: 2
  };
    flushSync(()=>{
      setposition([...position,newstar]);
    })

  }
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
  const colorchange=(e)=>{
    console.log(e);

  }

    return(
        <>
        <div className='centercolumn'>
        <p style={{color: 'white'}}>file</p>
        <table className='toolstable'>
        <tbody>
            <tr>
                <td className='toolstd'>
                    <div className='selection centercolumn'>
                        <div className='dotterlines'>
                        </div>
                        <FaChevronDown/>
                        <p className='lowtop'>Selection</p>
                    </div>
                </td>
                <td className='toolstd'>
                    <div className='picturetools center'>
                        <table>
                            <tbody>
                                <tr className='picturesrow'>
                                    <td><FaCropAlt/></td><td><MdRotateLeft /></td><td><MdRotateRight /></td>
                                </tr>
                                <tr className='picturesrow'>
                                   <td><FaExpandArrowsAlt /></td><td><FaMagic /></td><td><FaPaintBrush/></td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>

                </td>
                <td className='toolstd' >
                    <div className='paintchooseb center'>
                    
                        <CirclePicker
                            color={color}
                            colors={paletteColors}
                            onChangeComplete={(color) => {setColor(color.hex)
                                console.log(color.hex);
                            }}
                            onClick={colorchange}
                        />
                    </div>

                </td>
                <td className='toolstd shapesb center'>
                    <div className='shapeslist' style={{marginLeft:"20px"}}>
                        <button title="Line" onClick={test}><BsDash /></button>
                        <button title="Rectangle" onClick={addrect}><FaRegSquare /></button>
                        <button title="Circle" onClick={addcircle}><FaRegCircle /></button>
                        <button title="Triangle" onClick={addtriangle}><BsTriangle /></button>
                        <button title="Hexagon" onClick={addhexagon}><BsHexagon /></button>
                        <button title="Diamond" onClick={adddiamond}><BsDiamond /></button>
                        <button title="Star" onClick={addstar}><FaRegStar /></button>
                        <button title="Heart" onClick={addheart}><FaRegHeart /></button>
                        <button title="All Shapes"><FaShapes /></button>
                       
                    </div>

                </td>
                <td className='toolstd'>
                    <div className='selectpvf centercolumn'>
                        <button title="Vertex Select">
                            <TbPointFilled />
                        </button>
                        <button title="Edge Select">
                            <TbLine />
                        </button>
                        <button title="Face Select">
                            <TbSquare />
                        </button>
                        
                    </div>

                </td>
                 <td className='toolstd textc'>
                    <div className='centercolumn textelementsblock'>
                   
                    <h3 style={{textDecoration: "underline",border:"2px dashed white",width:"30px",height:"30px",paddingLeft:"10px",marginBottom:"10px",marginTop:"0px"}}>T</h3>
                    <div className='textsizeblock' style={{marginBottom:"10px"}}>
                    <input type='number' style={{width: "30px",backgroundColor:"rgba(255,255,255,0.0)",border:"none",borderBottom:"2px solid rgba(255,255,255,0.5)",color:"white",marginLeft:"10px"}} className='tsiblock'/>
                    <select name='textsize' style={{backgroundColor:"rgba(255,255,255,0.0)",border:"none",color:"white"}}>
                        <option>2pt</option>
                        <option>4pt</option>
                        <option>8pt</option>
                        <option>16pt</option>
                        <option>32pt</option>
                        <option>64pt</option>
                    </select>
                    </div>
                    <select name='font' style={{backgroundColor:"rgba(255,255,255,0.0)",border:"none",color:"white"}}>
                        <option>Times New Roman</option>
                        <option>Sans Serif</option>
                        <option>Arial</option>
                        <option>Futura</option>
                        <option>Garmond</option>
                        <option>Verdana</option>
                    </select>
                    </div>
                    
                    
                </td>
            </tr>
           
        </tbody>
        </table>
        <div className='page'>
            <Stage className='stage' width={1000} height={545} onClick={handledeselect} classNames='stage'>
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
                if (p.shape==='rectangle'){
                return <Rect
                {...p}
                key={p.id}
                draggable
                onDragEnd={(e)=>{
                console.log(e.target.index);
                }}
                onClick={handleselect}
                onTransformEnd={transformend}
                />
              }}
              )
            }
            {
              position.map((p,i)=>{
                if (p.shape==='circle'){
                return <Circle
                {...p}
                key={p.id}
                draggable
                onDragEnd={(e)=>{
                console.log(e.target.index);
                }}
                onClick={handleselect}
                onTransformEnd={transformend}
                />
              }}
              )
            }
             {
              position.map((p,i)=>{
                if (p.shape==='triangle'){
                return <Line
                {...p}
                key={p.id}
                draggable
                onDragEnd={(e)=>{
                console.log(e.target.index);
                }}
                onClick={handleselect}
                onTransformEnd={transformend}
                />
              }}
              )
            }
             {
              position.map((p,i)=>{
                if (p.shape==='hexagon'){
                return <RegularPolygon
                {...p}
                key={p.id}
                draggable
                onDragEnd={(e)=>{
                console.log(e.target.index);
                }}
                onClick={handleselect}
                onTransformEnd={transformend}
                />
              }}
              )
            }
             {
              position.map((p,i)=>{
                if (p.shape==='diamond'){
                return <RegularPolygon
                {...p}
                key={p.id}
                draggable
                onDragEnd={(e)=>{
                console.log(e.target.index);
                }}
                onClick={handleselect}
                onTransformEnd={transformend}
                />
              }}
              )
            }
             {
              position.map((p,i)=>{
                if (p.shape==='star'){
                return <Star
                {...p}
                key={p.id}
                draggable
                onDragEnd={(e)=>{
                console.log(e.target.index);
                }}
                onClick={handleselect}
                onTransformEnd={transformend}
                />
              }}
              )
            }
             {
              position.map((p,i)=>{
                if (p.shape==='heart'){
                return <Shape
        key={p.id}
        x={p.x}
        y={p.y}
        fill={p.fill}
        stroke={p.stroke}
        strokeWidth={p.strokeWidth}
        draggable
        onClick={handleselect}
        onTransformEnd={transformend}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(0, 30);
          context.bezierCurveTo(-50, -20, -50, -100, 0, -70);
          context.bezierCurveTo(50, -100, 50, -20, 0, 30);
          context.closePath();
          context.fillStrokeShape(shape);
        }}
      />
              }}
              )
            }
          </Layer>

        </Stage>
            
        </div>

        </div>
        </>
    );

}
export default Draw;