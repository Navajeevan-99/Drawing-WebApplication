import './Draw.css';
import React, { useState } from 'react';
import {FaPencilAlt,FaChevronDown,FaCropAlt,FaExpandArrowsAlt,FaMagic,FaPaintBrush,FaRegSquare, FaRegCircle, FaShapes
    ,FaRegStar, FaRegHeart
 } from 'react-icons/fa';
import { MdRotateLeft, MdRotateRight } from 'react-icons/md';
import { TbPointFilled, TbLine, TbSquare } from 'react-icons/tb';
import { BsTriangle, BsDash, BsHexagon, BsDiamond } from 'react-icons/bs';

import {SketchPicker,CirclePicker} from 'react-color';
const Draw=()=>{
    const [color, setColor] = useState('#f44336');
    const paletteColors = [
    '#000000', '#808080', '#D32F2F', '#FF4081', '#FF5722', '#FFC107',
    '#FFFFFF', '#C8C8C8', '#7B1FA2', '#536DFE', '#FFEB3B', '#4CAF50'
  ];

    return(
        <>
        <div className='centercolumn'>
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
                            onChangeComplete={(color) => setColor(color.hex)}
                        />
                    </div>

                </td>
                <td className='toolstd shapesb center'>
                    <div className='shapeslist' style={{marginLeft:"20px"}}>
                        
                        <button title="Line"><BsDash /></button>
                        <button title="Rectangle"><FaRegSquare /></button>
                        <button title="Circle"><FaRegCircle /></button>
                        <button title="Triangle"><BsTriangle /></button>
                        <button title="Hexagon"><BsHexagon /></button>
                        <button title="Diamond"><BsDiamond /></button>
                        <button title="Star"><FaRegStar /></button>
                        <button title="Heart"><FaRegHeart /></button>
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
            
        </div>

        </div>
        </>
    );

}
export default Draw;