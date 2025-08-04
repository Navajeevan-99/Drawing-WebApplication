import './Draw.css';
import {FaPencilAlt,FaChevronDown,FaCropAlt,FaExpandArrowsAlt,FaMagic } from 'react-icons/fa';
import { MdRotateLeft, MdRotateRight } from 'react-icons/md';
import {SketchPicker} from 'react-color';
const Draw=()=>{

    return(
        <>
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
                    <div className='picturetools'>
                        <table>
                            <tbody>
                                <tr className='picturesrow'>
                                    <td><FaCropAlt/></td><td><MdRotateLeft /></td><td><MdRotateRight /></td>
                                </tr>
                                <tr>
                                   <td><FaExpandArrowsAlt /></td><td><FaMagic /></td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>

                </td>
                <td className='toolstd'>

                </td>
                <td className='toolstd'>

                </td>
                <td className='toolstd'>

                </td>
                <td className='toolstd'>

                </td>
            </tr>
        </tbody>
        </table>
        </>
    );

}
export default Draw;