import { combineReducers } from 'redux';
import { SAVE_INFO, ADD_FRIEND, ADD_CHATS, HAS_READ, UPDATE_LOGO, SAVENICKNAME } from './actions';



function save_info(state = {}, action) {
    switch (action.type) {
        case SAVE_INFO:
            return { ...state, ...action.data };
        case ADD_FRIEND:
            return { ...state, friends: [...state.friends, action.data] };
        case HAS_READ:
            return Object.assign({}, state, {
                rooms: JSON.parse(JSON.stringify(state.rooms)).map(obj => {
                    if (obj[action.user]) {
                        obj[action.user].map(o => o.has_read = true);
                        return;
                    }
                })
            });
        case ADD_CHATS:
            return Object.assign({}, state, { rooms: add_chats(state.rooms, action) });
        case UPDATE_LOGO:
            return Object.assign({}, state, { logo: action.url });
        case SAVENICKNAME:
            return Object.assign({}, state, { nickname: action.data.nickname });
        default:
            return state;
    }
}


function add_chats(rooms = [], action) {
    let room_key = action.data.room_id;
    let room_index = rooms.findIndex(element => element && element[room_key]);

    let new_arr = JSON.parse(JSON.stringify(rooms));
    if (room_index > -1) {
        new_arr[room_index][room_key].push(action.data);
        return new_arr;
    } else {
        return [{ [room_key]: [action.data] }, ...new_arr];
    }
}



const Reducer = combineReducers({
    save_info
});

export default Reducer;