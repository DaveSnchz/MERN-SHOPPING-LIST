import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 from uuid package
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types'

const initialState = {
    items: [
        { id: uuidv4(), name: 'Eggs' },
        { id: uuidv4(), name: 'Milk' },
        { id: uuidv4(), name: 'Steak' },
        { id: uuidv4(), name: 'Water' }
    ]
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ITEMS:
        return {
            ...state
        };
    default:
        return state;
  }
}