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
      width: 100,
      height: 100,
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
  const updatew=(e)=>{
   console.log(e.target.value);
   propertiesref.current=true;
  setPosition((prev)=>
  prev.map((obj)=>
    obj.id===selecteditem.current.attrs.id? {...obj ,width: e.target.value}: obj
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
                      <td>
                        <FaPaintBrush />
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
        <Stage width={1000} height={545} onClick={handleDeselect} onMouseUp={handleMouseUp} className="stage">
          <Layer>
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) return oldBox;
                return newBox;
              }}
            />

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

          <h3>Recatangle</h3>
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
            <h3>Color</h3>
            <SketchPicker
            color={position[selecteditem.current.attrs['id']-1].fill}
            onChangeComplete={updatecolor}
            />
            

          </div> 
          

          </div>

        }
        

      </div>
      
      }
    </div>
  );
};

export default Draw;
