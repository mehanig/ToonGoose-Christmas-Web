import * as sampleActions from "../actions/counterActions"
import * as axios from "axios"

const initialState = {
  clicks: 0,
  verificated: false,
  selected: [],
  ready: false
};

export default function submissions(state=initialState, action={}) {
  switch (action.type) {
  case sampleActions.INCREASE:
    return {...state, clicks: state.clicks + 1};
    axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }).then(function (response) {
        return {...state, clicks: state.clicks + 1};
    }).catch(function (error) {
        return {...state, clicks: state.clicks + 1};
    });
  case sampleActions.GOOSE_SELECTED:
      let new_selected = [];
      if (state.selected.includes(action.goose_id)) {
        new_selected = state.selected.filter((id) =>  {return id != action.goose_id});
      } else if (state.selected.length === 2) {
        return {...state, ready: true}
      } else {
        new_selected = state.selected.slice();
        new_selected.push(action.goose_id);
      }
      return {...state, selected: new_selected, ready: (new_selected.length === 2)};
  case sampleActions.EMAIL:
    return {...state, verificated: true };
    axios.post('/email', {
      email: "user@example.com"
    }).then(function (response) {
      return {...state, verificated: true }
    }).catch(function (error) {
      return {...state, verificated: true }
    });
  default:
    return state
  }
}
