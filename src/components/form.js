import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector  } from "react-redux";
import { getComps, addBOID, getResult, resetStates} from "../actions/ipo.js";

const Forms = () =>{
	const comps = useSelector(state => state.ipo.comps);
	const [boid, setBoid] = useState({name:'',boid:''});
	const [comp, setComp] = useState();
	const dispatch = useDispatch();

	useEffect(() => {
	    dispatch(getComps()); 
	  },[]
	  );

	const submitHandler = (e)=>{
		e.preventDefault();
		dispatch(resetStates());
		dispatch(getResult(comp));
		setComp();
	}
	const compHandler= (e)=>{
		//console.log(e.target.value);
		setComp(e.target.value);
	};
	const inputHandler=(e)=>{
        let field_name = e.target.name;
        let field_value = e.target.value;e
        if (!(field_name=='boid' && isNaN(field_value))){
        	if(field_value.length<17){
        		setBoid(prev => ({ ...prev, [field_name]: field_value }));
        	}
        }
    }

	const onSubmit = (e)=>{
		e.preventDefault();
		if (boid.boid.length!=16){
				window.alert("Invalid BOID (must be 16 digits number)");
		}
		else
			dispatch(addBOID(boid))
	}
	return(
		<div>
		<form>
            <div className="select">
        <select onChange={compHandler} name="todos" className="mySelect" defaultValue="Select Company" >
            <option disabled hidden>Select Company</option>  
           {
               Object.keys(comps).map(key=>(
                   <option key={comps[key].id} value={comps[key].id}>{comps[key].name}</option>
               ))
           }
        </select>
      </div>
      <button disabled={!comp} onClick={submitHandler} type="submit" className='Sbutton'>
        Check
      </button>
    </form>
    <form onSubmit={onSubmit} className='form-box'>
            <input onChange={inputHandler} value={boid.name} name='name' type="text" placeholder="Enter Name" required/>
            <input onChange={inputHandler} value={boid.boid} name='boid' type="text" placeholder="Enter boid" required/>
            <button className="Sbutton" type="submit">Add</button>
        </form>
        </div>
		)
}

export default Forms;