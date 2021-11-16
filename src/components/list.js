import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector  } from "react-redux";
import {deleteBoid} from "../actions/ipo.js";

const List = ()=>{
	const boids = useSelector(state => state.ipo.boids);
	const results = useSelector(state => state.ipo.results);
	const dispatch = useDispatch();

	const onDelete = (e,boid) =>{
		dispatch(deleteBoid(boid))
	}   
    
	return(
		<div>
			{results.length>0?
				results.map(res=>(
    			<div key={res.info.boid} className={res.success?'plank success-T':'plank success-F'}>
    				<span className='text'>{res.info.name} : {res.info.boid}</span>
    				<span className='res'>{res.res}</span>
    				</div>
    	))
    	:boids.map(boid=>(
			                   <div key={boid.boid} className='plank'>
			                   		<span className='text'>{boid.name} :: {boid.boid}</span>
			                   		<span onClick={e => onDelete(e, boid.boid)} className='delete'>
			                   			<i className="fas fa-trash"></i>
			                   		</span>
			                   </div>
			
			               ))
			
			}
           
		</div>
		)
}

export default List;