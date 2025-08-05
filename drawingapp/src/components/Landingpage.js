import { useParams } from "react-router-dom";


const Landingpage=()=>{
    const {name}=useParams();
   return(
<>
<p>{name}</p>
</>    
)

}
export default Landingpage;
