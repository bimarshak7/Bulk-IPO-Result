import { GET_COMPS, ADD_BOID, GET_RESULT, RESET_STATES, DELETE_BOID } from '../actions/types.js';

function getBoid(){
    if (localStorage.getItem('boids')===null){
            console.log('Empty')
            localStorage.setItem('boids',JSON.stringify([]));
        }     
        return JSON.parse(localStorage.getItem('boids'));

}
const initialState = {
    comps: [],
    boids:getBoid(),
    results: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COMPS:
            return {
                ...state,
                comps: action.payload,
            };
        case ADD_BOID:
            localStorage.setItem('boids',JSON.stringify([...state.boids, action.payload]));
            return {
                ...state,
                boids:[...state.boids, action.payload],
            };
        case GET_RESULT:
            //console.log(action.payload)
            return {
                ...state,
                results:[...state.results, action.payload]
            };
        case RESET_STATES:
            return {
                ...state,
                results:[]
            };
        case DELETE_BOID:
            console.log('Reducer Called')
            let update = state.boids.filter(boid=>boid.boid!=action.payload)
            localStorage.setItem('boids',JSON.stringify(update));
            return {
                ...state,
                boids:update
            };
        default:
            return state;
    }

}