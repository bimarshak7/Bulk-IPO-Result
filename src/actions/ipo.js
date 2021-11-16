import {GET_COMPS, ADD_BOID, GET_RESULT, RESET_STATES, DELETE_BOID} from './types';
import axios from 'axios';

export const getComps = () => (dispatch) => {
	//console.log('Action called')
    axios
        .get('https://iporesult.cdsc.com.np/result/companyShares/fileUploaded')
        .then((res) => {
            dispatch({
                type: GET_COMPS,
                payload: res.data.body,
            });
        })
        .catch((err) => console.log(err));
};

export const addBOID = (boid) => (dispatch) => {
    console.log(boid)
    dispatch({
                type: ADD_BOID,
                payload: boid,
            });
}

export const getResult = (compS) => (dispatch,getState) => {
    let boids = getState().ipo.boids
    let url="https://cors-anywhere.herokuapp.com/https://iporesult.cdsc.com.np/result/result/check";
    const headers={"Content-Type":"application/json"}

    for (let i=0;i<boids.length;i++){
        const body=`{
                 "boid": ${boids[i].boid},
                 "companyShareId": ${compS}
                  }`
        axios.post(url,body,{headers})
                .then(res=>{
                    //console.log(res.config.data,res.data.message)
                    dispatch({
                        type: GET_RESULT,
                        payload: {res:res.data.message,success:res.data.success,info:boids[i]}
                    })
                    }).catch(err=>console.log(err));
    //console.log(body)
    }
};

export const resetStates = () => (dispatch) => {
    dispatch({
                type: RESET_STATES,
            });
}

export const deleteBoid = (boid) => (dispatch) => {
    dispatch({
                type: DELETE_BOID,
                payload: boid
            });
}