import './Draw.css';

import React, { useState, useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { flushSync } from 'react-dom';

import { SketchPicker, CirclePicker } from 'react-color';

import {
  FaPencilAlt,
  FaChevronDown,
  FaCropAlt,
  FaExpandArrowsAlt,
  FaMagic,
  FaPaintBrush,
  FaRegSquare,
  FaRegCircle,
  FaShapes,
  FaRegStar,
  FaRegHeart,
} from 'react-icons/fa';

import { MdRotateLeft, MdRotateRight } from 'react-icons/md';
import { TbPointFilled, TbLine, TbSquare } from 'react-icons/tb';
import { BsTriangle, BsDash, BsHexagon, BsDiamond } from 'react-icons/bs';

import {
  Stage,
  Layer,
  Rect,
  Transformer,
  Circle,
  Line,
  RegularPolygon,
  Star,
  Shape,
} from 'react-konva';

const Draw = () => {
  const [position, setPosition] = useState([]);
  const [isSelect, setIsSelect] = useState(false);
  const [rectNode, setRectNode] = useState(null);
  const transformerRef = useRef();
  const [color, setColor] = useState('#f44336');
  const [fmenu, setFmenu] = useState(false);
  let propertiesref=useRef(false);
  let selecteditem=useRef(null);
  let isdrawingref=useRef(false);
  let isdrawingbuttonenable=useRef(false);

   const stageref=useRef(null)
   const [lines,setlines]=useState([])
  

  const isDrawingRef = useRef(false);
  const id = useRef(0);
  

  const paletteColors = [
    '#000000',
    '#808080',
    '#D32F2F',
    '#FF4081',
    '#FF5722',
    '#FFC107',
    '#FFFFFF',
    '#C8C8C8',
    '#7B1FA2',
    '#536DFE',
    '#FFEB3B',
    '#4CAF50',
  ];

  const test = () => {
    console.log(
      ReactDOMServer.renderToStaticMarkup(
        ReactDOMServer.renderToStaticMarkup(<BsDash />)
      )
    );
  };

  const addRect = () => {
    id.current += 1;
    const newRect = {
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      fill: color,
      id: id.current,
      shape: 'Rectangle',
      stroke: 'black',
      strokeWidth: 2,
    };

    flushSync(() => setPosition((prev) => [...prev, newRect]));
  };

  const addCircle = () => {
    id.current += 1;
    const newCircle = {
      x: 100,
      y: 100,
      radius: 50,
      fill: color,
      id: id.current,
      shape: 'Circle',
      stroke: 'black',
      strokeWidth: 2,
    };

    flushSync(() => setPosition((prev) => [...prev, newCircle]));
  };

  const addTriangle = () => {
    id.current += 1;
    const newTriangle = {
      points: [100, 300, 200, 100, 300, 300],
      x: 100,
      y: 100,
      scaleX: 1,
      scaleY: 1,
      fill: color,
      id: id.current,
      shape: 'Triangle',
      strokeWidth: 2,
      stroke: 'black',
      closed: true,
    };

    flushSync(() => setPosition((prev) => [...prev, newTriangle]));
  };

  const addHexagon = () => {
    id.current += 1;
    const newHexagon = {
      x: 100,
      y: 100,
      sides: 6,
      radius: 50,
      fill: color,
      id: id.current,
      shape: 'Hexagon',
      strokeWidth: 2,
      stroke: 'black',
    };

    flushSync(() => setPosition((prev) => [...prev, newHexagon]));
  };

  const addDiamond = () => {
    id.current += 1;
    const newDiamond = {
      x: 100,
      y: 100,
      sides: 4,
      radius: 50,
      fill: color,
      id: id.current,
      shape: 'Diamond',
      strokeWidth: 2,
      stroke: 'black',
    };

    flushSync(() => setPosition((prev) => [...prev, newDiamond]));
  };

  const addHeart = () => {
    id.current += 1;
    const newHeart = {
      id: id.current,
      shape: 'Heart',
      x: 200,
      y: 200,
      scale: 1,
      fill: color,
      stroke: 'black',
      strokeWidth: 2,
    };

    flushSync(() => setPosition((prev) => [...prev, newHeart]));
  };

  const addStar = () => {
    id.current += 1;
    const newStar = {
      id: id.current,
      shape: 'Star',
      x: 150,
      y: 150,
      numPoints: 5,
      innerRadius: 20,
      outerRadius: 50,
      scaleX: 1.5,
      scaleY: 1,
      fill: color,
      stroke: 'black',
      strokeWidth: 2,
    };

    flushSync(() => setPosition((prev) => [...prev, newStar]));
  };

  const handleSelect = (e) => {
    propertiesref.current=true;
    const node = e.target;
    console.log(e.target.attrs);
    selecteditem.current=e.target;

    flushSync(() => {
      setRectNode(node);
      setIsSelect(false);
      setIsSelect(true);
    });
  };
   const selectdraw=(e)=>{
    propertiesref.current=true;
    selecteditem.current=e.target;
  }
  

  const handleDeselect = (e) => {
    propertiesref.current=false;
    
    if (e.target.getStage() === e.target) {
      flushSync(() => setIsSelect(false));
    }
  };

  useEffect(() => {
    if (isSelect && rectNode && transformerRef.current) {
      transformerRef.current.nodes([rectNode]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelect, rectNode]);

  const transformEnd = (e) => {
    const node = rectNode;
    if (!node) return;

    const sx = node.scaleX();
    const sy = node.scaleY();
    const index = e.target.index - 1;

    flushSync(() => {
      node.scaleX(1);
      node.scaleY(1);

      setPosition((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                x: node.x(),
                y: node.y(),
                width: Math.max(5, (item.width || node.width()) * sx),
                height: Math.max(5, (item.height || node.height()) * sy),
              }
            : item
        )
      );
    });
  };

  const colorChange = (col) => {
    // placeholder for color change logic
    console.log(col);
  };

  const openFMenu = () => setFmenu((prev) => !prev);
  const newFile = () => {};
  const openFile = () => {};
  const saveFile = () => {};
  const saveAsFile = () => {};
  const exportAsFile = () => {};

  const handleMouseUp = () => {
    isDrawingRef.current = true;
    isdrawingref.current=false;
  };

  const updatex=(e)=>{
   console.log(e.target.value);
   propertiesref.current=true;
  setPosition((prev)=>
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,x:e.target.value}: obj
  )
  )
  }
  const updatey=(e)=>{
   console.log(e.target.value);
   propertiesref.current=true;
  setPosition((prev)=>
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,y:e.target.value}: obj
  )
  )
  }
  const updateh=(e)=>{
   console.log(e.target.value);
   propertiesref.current=true;
  setPosition((prev)=>
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,height :e.target.value}: obj
  )
  )
  }
  
  // const updatetheight=(e)=>{
  //  console.log(e.target.value);
  //  propertiesref.current=true;
  // setPosition((prev)=>
  // prev.map((obj)=>
  //   obj.id===selecteditem.current.attrs.id? {...obj , points: obj.points.map((p,i)=> i==3?e.target.value:p)}: obj
  // )
  // )
  // }
  // const updatetwidth=(e)=>{
  //  console.log(e.target.value);
  //  propertiesref.current=true;
  //  let 
  //  setPosition((prev)=>
  // prev.map((obj)=>
  //   obj.id===selecteditem.current.attrs.id? {...obj , points: obj.points.map((p,i)=> i==0?p-(p-e.target.value):p)}: obj
  // )
  // )
  //  setPosition((prev)=>
  // prev.map((obj)=>
  //   obj.id===selecteditem.current.attrs.id? {...obj , points: obj.points.map((p,i)=> i==4?p+(p-e.target.value):p)}: obj
  // )
  // )
  
  // }
  const updatew=(e)=>{
   console.log(e.target.value);
   propertiesref.current=true;
  setPosition((prev)=>
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,width: e.target.value}: obj
  )
  )
  }
  const updatescaley=(e)=>{
   console.log(e.target.value);
   propertiesref.current=true;
  setPosition((prev)=>
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,scaleY: e.target.value}: obj
  )
  )
  }
  const updatescalex=(e)=>{
   console.log(e.target.value);
   propertiesref.current=true;
  setPosition((prev)=>
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,scaleX: e.target.value}: obj
  )
  )
  }
  const updatecolor=(c)=>{
   
   propertiesref.current=true;
  setPosition((prev)=>
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,fill: c.hex}: obj
  )
  )
  }
  const updatestroke=(e)=>{
    propertiesref.current=true;
    setPosition((prev)=>
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,stroke: e.target.value}: obj
  )
  )
  }
  const updatestrokewidth=(e)=>{
    propertiesref.current=true;
    setPosition((prev)=>
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,strokeWidth: e.target.value}: obj
  )
  )
 }

  const updateradius=(e)=>{
    propertiesref.current=true;
    setPosition((prev)=>
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,radius: e.target.value}: obj
  )
  )
 }
  const updateinnerradius=(e)=>{
    propertiesref.current=true;
    setPosition((prev)=>
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,innerRadius: e.target.value}: obj
  )
  )
 }
  const updateouterradius=(e)=>{
    propertiesref.current=true;
    setPosition((prev)=>
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,outerRadius: e.target.value}: obj
  )
  )
 }
  const updatepoints=(e)=>{
    propertiesref.current=true;
    if (e.target.value<1){
      return;
    }
    setPosition((prev)=>
      
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,sides: e.target.value}: obj
  )
  )
 }
  const updatenumpoints=(e)=>{
    propertiesref.current=true;
    if (e.target.value<1){
      return;
    }
    setPosition((prev)=>
      
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,numPoints: e.target.value}: obj
  )
  )
 }
  const drawingbutton=()=>{
    if (isdrawingbuttonenable.current===false){
      isdrawingbuttonenable.current=true;
    }
    else{
      isdrawingbuttonenable.current=false;

    }
    console.log(isdrawingbuttonenable.current);

  }
 
   
  
   const handlemousedown=(e)=>{
    if (e.evt && e.evt.button===2) return;
    isdrawingref.current=true;
    if (!isdrawingbuttonenable.current) return;
   
    const pos=stageref.current.getPointerPosition();
    const newline={
      points: [pos.x,pos.y],
      stage: 'draw',
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
    <div className="centercolumn">
      <div className="menucontainer center">
        <button onClick={openFMenu} style={{ color: 'white' }}>
          File
        </button>
      </div>

      {fmenu && (
        <div className="filemenucontainer centercolumn">
          <button style={{ color: 'white' }} onClick={newFile}>
            New
          </button>
          <button style={{ color: 'white' }} onClick={openFile}>
            Open
          </button>
          <button style={{ color: 'white' }} onClick={saveFile}>
            Save
          </button>
          <button style={{ color: 'white' }} onClick={saveAsFile}>
            Save As
          </button>
          <button
            style={{ color: 'white', marginBottom: '20px' }}
            onClick={exportAsFile}
          >
            Export As
          </button>
        </div>
      )}

      <table className="toolstable">
        <tbody>
          <tr>
            <td className="toolstd">
              <div className="selection centercolumn">
                <div className="dotterlines" />
                <FaChevronDown />
                <p className="lowtop">Selection</p>
              </div>
            </td>

            <td className="toolstd">
              <div className="picturetools center">
                <table>
                  <tbody>
                    <tr className="picturesrow">
                      <td>
                        <FaCropAlt />
                      </td>
                      <td>
                        <MdRotateLeft />
                      </td>
                      <td>
                        <MdRotateRight />
                      </td>
                    </tr>
                    <tr className="picturesrow">
                      <td>
                        <FaExpandArrowsAlt />
                      </td>
                      <td>
                        <FaMagic />
                      </td>
                      <td><button onClick={drawingbutton}> <FaPaintBrush /></button>
                       
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>

            <td className="toolstd">
              <div className="paintchooseb center">
                <CirclePicker
                  color={color}
                  colors={paletteColors}
                  onChangeComplete={(c) => {
                    setColor(c.hex);
                    console.log(c.hex);
                  }}
                  onClick={colorChange}
                />
              </div>
            </td>

            <td className="toolstd shapesb center">
              <div className="shapeslist" style={{ marginLeft: '20px' }}>
                <button title="Line" onClick={test}>
                  <BsDash />
                </button>
                <button title="Rectangle" onClick={addRect}>
                  <FaRegSquare />
                </button>
                <button title="Circle" onClick={addCircle}>
                  <FaRegCircle />
                </button>
                <button title="Triangle" onClick={addTriangle}>
                  <BsTriangle />
                </button>
                <button title="Hexagon" onClick={addHexagon}>
                  <BsHexagon />
                </button>
                <button title="Diamond" onClick={addDiamond}>
                  <BsDiamond />
                </button>
                <button title="Star" onClick={addStar}>
                  <FaRegStar />
                </button>
                <button title="Heart" onClick={addHeart}>
                  <FaRegHeart />
                </button>
                <button title="All Shapes">
                  <FaShapes />
                </button>
              </div>
            </td>

            <td className="toolstd">
              <div className="selectpvf centercolumn">
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

            <td className="toolstd textc">
              <div className="centercolumn textelementsblock">
                <h3
                  style={{
                    textDecoration: 'underline',
                    border: '2px dashed white',
                    width: '30px',
                    height: '30px',
                    paddingLeft: '10px',
                    marginBottom: '10px',
                    marginTop: '0px',
                  }}
                >
                  T
                </h3>

                <div className="textsizeblock" style={{ marginBottom: '10px' }}>
                  <input
                    type="number"
                    style={{
                      width: '30px',
                      backgroundColor: 'rgba(255,255,255,0.0)',
                      border: 'none',
                      borderBottom: '2px solid rgba(255,255,255,0.5)',
                      color: 'white',
                      marginLeft: '10px',
                    }}
                    className="tsiblock"
                  />

                  <select
                    name="textsize"
                    style={{ backgroundColor: 'rgba(255,255,255,0.0)', border: 'none', color: 'white' }}
                  >
                    <option>2pt</option>
                    <option>4pt</option>
                    <option>8pt</option>
                    <option>16pt</option>
                    <option>32pt</option>
                    <option>64pt</option>
                  </select>
                </div>

                <select name="font" style={{ backgroundColor: 'rgba(255,255,255,0.0)', border: 'none', color: 'white' }}>
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

      <div className="page">
        <Stage width={1000} height={545} onClick={handleDeselect} onTouchMove={handlemousemove}  onMouseMove={handlemousemove} ref={stageref} onMouseDown={handlemousedown} onMouseUp={handleMouseUp} className="stage">
          <Layer>
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) return oldBox;
                return newBox;
              }}
            />
            {
              lines.map((line)=>(
                    <Line
                    {...line}
                    onClick={selectdraw}
                    
                    />))
            }

            {position.map((p, i) => {
              if (p.shape === 'Rectangle') {
                return (
                  <Rect
                    {...p}
                    key={p.id}
                    draggable
                    onDragEnd={() => {}}
                    onClick={handleSelect}
                    onTransformEnd={transformEnd}
                  />
                );
              }

              if (p.shape === 'Circle') {
                return (
                  <Circle
                    {...p}
                    key={p.id}
                    draggable
                    onDragEnd={() => {}}
                    onClick={handleSelect}
                    onTransformEnd={transformEnd}
                  />
                );
              }

              if (p.shape === 'Triangle') {
                return (
                  <Line
                    {...p}
                    key={p.id}
                    draggable
                    onDragEnd={() => {}}
                    onClick={handleSelect}
                    onTransformEnd={transformEnd}
                  />
                );
              }

              if (p.shape === 'Hexagon' || p.shape === 'Diamond') {
                return (
                  <RegularPolygon
                    {...p}
                    key={p.id}
                    draggable
                    onDragEnd={() => {}}
                    onClick={handleSelect}
                    onTransformEnd={transformEnd}
                  />
                );
              }

              if (p.shape === 'Star') {
                return (
                  <Star
                    {...p}
                    key={p.id}
                    draggable
                    onDragEnd={() => {}}
                    onClick={handleSelect}
                    onTransformEnd={transformEnd}
                  />
                );
              }
             


              if (p.shape === 'Heart') {
                return (
                  <Shape
                    key={p.id}
                    x={p.x}
                    y={p.y}
                    fill={p.fill}
                    stroke={p.stroke}
                    strokeWidth={p.strokeWidth}
                    draggable
                    onClick={handleSelect}
                    onTransformEnd={transformEnd}
                    sceneFunc={(context, shape) => {
                      context.beginPath();
                      context.moveTo(0, 30);
                      context.bezierCurveTo(-50, -20, -50, -100, 0, -70);
                      context.bezierCurveTo(50, -100, 50, -20, 0, 30);
                      context.closePath();
                      context.fillStrokeShape(shape);
                    }}
                  />
                );
              }

              return null;
            })}
          </Layer>
        </Stage>
      </div>
      { propertiesref.current && 
      <div className='propertiesdiv centercolumn'>
        {
          
          (position[selecteditem.current.attrs['id']-1]['shape']=='Rectangle') &&<div>

          <h3 style={{marginTop: 90}}>Recatangle</h3>
          <div>
            <h3>Postion</h3>
            <table>
              <tbody>
                <tr>
                  <td>X </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].x} onChange={updatex}/></td>
                </tr>
                <tr>
                  <td>Y </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].y} onChange={updatey}/></td>
                </tr>
              </tbody>
            </table>

          </div> 
          <div>
            <h3>Size</h3>
            <table>
              <tbody>
                <tr>
                  <td>Height </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].height} onChange={updateh}/></td>
                </tr>
                <tr>
                  <td>Width </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].width} onChange={updatew}/></td>
                </tr>
              </tbody>
            </table>           

          </div> 
          <div>
            <h3>Strokes Properties</h3>
            <table>
              <tbody>
                <tr>
                  <td>Stroke </td><td>:</td><td><input type='color' value={position[selecteditem.current.attrs['id']-1].stroke} onChange={updatestroke}/></td>
                </tr>
                <tr>
                  <td>SWidth </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].strokeWidth} onChange={updatestrokewidth}/></td>
                </tr>
              </tbody>
            </table>           

          </div> 
          <h3>Color</h3>
            <SketchPicker
            color={position[selecteditem.current.attrs['id']-1].fill}
            onChangeComplete={updatecolor}
            />
          

          </div>

        }
        
        {
          
          (position[selecteditem.current.attrs['id']-1]['shape']=='Circle') &&<div>

          <h3 style={{marginTop: 90}}>{position[selecteditem.current.attrs['id']-1]['shape']}</h3>
          <div>
            <h3>Postion</h3>
            <table>
              <tbody>
                <tr>
                  <td>X </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].x} onChange={updatex}/></td>
                </tr>
                <tr>
                  <td>Y </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].y} onChange={updatey}/></td>
                </tr>
              </tbody>
            </table>

          </div> 
          <div>
            <h3>Size</h3>
            <table>
              <tbody>
                <tr>
                  <td>Radius </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].radius} onChange={updateradius}/></td>
                </tr>
                
              </tbody>
            </table>           

          </div> 
          <div>
            <h3>Strokes Properties</h3>
            <table>
              <tbody>
                <tr>
                  <td>Stroke </td><td>:</td><td><input type='color' value={position[selecteditem.current.attrs['id']-1].stroke} onChange={updatestroke}/></td>
                </tr>
                <tr>
                  <td>SWidth </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].strokeWidth} onChange={updatestrokewidth}/></td>
                </tr>
              </tbody>
            </table>           

          </div> 
          <h3>Color</h3>
            <SketchPicker
            color={position[selecteditem.current.attrs['id']-1].fill}
            onChangeComplete={updatecolor}
            />
          

          </div>

        }
        {
          
          (position[selecteditem.current.attrs['id']-1]['shape']=='Hexagon') &&<div>

          <h3 style={{marginTop: 90}}>{position[selecteditem.current.attrs['id']-1]['shape']}</h3>
          <div>
            <h3>Postion</h3>
            <table>
              <tbody>
                <tr>
                  <td>X </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].x} onChange={updatex}/></td>
                </tr>
                <tr>
                  <td>Y </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].y} onChange={updatey}/></td>
                </tr>
              </tbody>
            </table>

          </div> 
          <div>
            <h3>Size</h3>
            <table>
              <tbody>
                <tr>
                  <td>Radius </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].radius} onChange={updateradius}/></td>
                </tr>
                
              </tbody>
            </table>           

          </div> 
          <div>
            <h3>Strokes Properties</h3>
            <table>
              <tbody>
                <tr>
                  <td>Stroke </td><td>:</td><td><input type='color' value={position[selecteditem.current.attrs['id']-1].stroke} onChange={updatestroke}/></td>
                </tr>
                <tr>
                  <td>SWidth </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].strokeWidth} onChange={updatestrokewidth}/></td>
                </tr>
                <tr>
                  <td>Points </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].sides} onChange={updatepoints}/></td>
                </tr>
              </tbody>
            </table>           

          </div> 
          <h3>Color</h3>
            <SketchPicker
            color={position[selecteditem.current.attrs['id']-1].fill}
            onChangeComplete={updatecolor}
            />
          

          </div>

        }
        {
          
          (position[selecteditem.current.attrs['id']-1]['shape']=='Diamond') &&<div>

          <h3 style={{marginTop: 90}}>{position[selecteditem.current.attrs['id']-1]['shape']}</h3>
          <div>
            <h3>Postion</h3>
            <table>
              <tbody>
                <tr>
                  <td>X </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].x} onChange={updatex}/></td>
                </tr>
                <tr>
                  <td>Y </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].y} onChange={updatey}/></td>
                </tr>
              </tbody>
            </table>

          </div> 
          <div>
            <h3>Size</h3>
            <table>
              <tbody>
                <tr>
                  <td>Radius </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].radius} onChange={updateradius}/></td>
                </tr>
                
              </tbody>
            </table>           

          </div> 
          <div>
            <h3>Strokes Properties</h3>
            <table>
              <tbody>
                <tr>
                  <td>Stroke </td><td>:</td><td><input type='color' value={position[selecteditem.current.attrs['id']-1].stroke} onChange={updatestroke}/></td>
                </tr>
                <tr>
                  <td>SWidth </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].strokeWidth} onChange={updatestrokewidth}/></td>
                </tr>
                
              </tbody>
            </table>           

          </div> 
          <h3>Color</h3>
            <SketchPicker
            color={position[selecteditem.current.attrs['id']-1].fill}
            onChangeComplete={updatecolor}
            />
          

          </div>

        }
        {
          
          (position[selecteditem.current.attrs['id']-1]['shape']=='Star') &&<div>
          <h3 style={{marginTop: 100}}>Star</h3>
          <div>
            <h3>Postion</h3>
            <table>
              <tbody>
                <tr>
                  <td>X </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].x} onChange={updatex}/></td>
                </tr>
                <tr>
                  <td>Y </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].y} onChange={updatey}/></td>
                </tr>
              </tbody>
            </table>

          </div> 
          <div>
            <h3>Size</h3>
            <table>
              <tbody>
                <tr>
                  <td>IRadius </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].innerRadius} onChange={updateinnerradius}/></td>
                </tr>
                <tr>
                  <td>ORadius </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].outerRadius} onChange={updateouterradius}/></td>
                </tr>
                <tr>
                  <td>Height </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].scaleY} onChange={updatescaley}/></td>
                </tr>
                <tr>
                  <td>Width </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].scaleX} onChange={updatescalex}/></td>
                </tr>
                
              </tbody>
            </table>           

          </div> 
          <div>
            <h3>Strokes Properties</h3>
            <table>
              <tbody>
                <tr>
                  <td>Stroke </td><td>:</td><td><input type='color' value={position[selecteditem.current.attrs['id']-1].stroke} onChange={updatestroke}/></td>
                </tr>
                <tr>
                  <td>SWidth </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].strokeWidth} onChange={updatestrokewidth}/></td>
                </tr>
                <tr>
                  <td>Points </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].numPoints} onChange={updatenumpoints}/></td>
                </tr>
                
              </tbody>
            </table>           

          </div> 
          <h3>Color</h3>
            <SketchPicker
            color={position[selecteditem.current.attrs['id']-1].fill}
            onChangeComplete={updatecolor}
            />

          </div>

        }
        {
          
          (position[selecteditem.current.attrs['did']-1]['shape']=='Draw') &&<div>
          <h3 style={{marginTop: 100}}>Draw</h3>
        
          <div>
            <h3>Strokes Properties</h3>
            <table>
              <tbody>
                <tr>
                  <td>Stroke </td><td>:</td><td><input type='color' value={position[selecteditem.current.attrs['id']-1].stroke} onChange={updatestroke}/></td>
                </tr>
                <tr>
                  <td>SWidth </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].strokeWidth} onChange={updatestrokewidth}/></td>
                </tr>
                
              </tbody>
            </table>           

          </div> 
          <h3>Color</h3>
            <SketchPicker
            color={position[selecteditem.current.attrs['id']-1].fill}
            onChangeComplete={updatecolor}
            />

          </div>

        }
        {/* {
          
          (position[selecteditem.current.attrs['id']-1]['shape']=='Triangle') &&<div>
          <h3 style={{marginTop: 100}}>Star</h3>
          <div>
            <h3>Postion</h3>
            <table>
              <tbody>
                <tr>
                  <td>X </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].x} onChange={updatex}/></td>
                </tr>
                <tr>
                  <td>Y </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].y} onChange={updatey}/></td>
                </tr>
              </tbody>
            </table>

          </div> 
          <div>
            <h3>Size</h3>
            <table>
              <tbody>
                
                <tr>
                  <td>Height </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].points[3]} onChange={updatetheight}/></td>
                </tr>
                <tr>
                  <td>Width </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].points[4]} onChange={updatetwidth}/></td>
                </tr>
                
              </tbody>
            </table>           

          </div> 
          <div>
            <h3>Strokes Properties</h3>
            <table>
              <tbody>
                <tr>
                  <td>Stroke </td><td>:</td><td><input type='color' value={position[selecteditem.current.attrs['id']-1].stroke} onChange={updatestroke}/></td>
                </tr>
                <tr>
                  <td>SWidth </td><td>:</td><td><input type='number' value={position[selecteditem.current.attrs['id']-1].strokeWidth} onChange={updatestrokewidth}/></td>
                </tr>
                
                
              </tbody>
            </table>           

          </div> 
          <h3>Color</h3>
            <SketchPicker
            color={position[selecteditem.current.attrs['id']-1].fill}
            onChangeComplete={updatecolor}
            />

          </div>

        } */}
        

      </div>
      
      }
    </div>
  );
};

export default Draw;
