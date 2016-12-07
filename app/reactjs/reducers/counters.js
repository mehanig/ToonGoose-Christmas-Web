import * as Actions from "../actions/counterActions"
import * as axios from "axios"

const initialState = {
  clicks: 0,
  verificated: false,
  selected: [],
  ready: false,
  selectGoose: false,
  errorMsg: false,
  gooseRollId: false,
  userThinking: false,
  selectedPrize: false,
  prizes: [],
};

export default function submissions(state=initialState, action={}) {
  switch (action.type) {
  case Actions.GOOSE_SELECTED:
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
  case Actions.EMAIL:
      return {...state, verificated: true, ready: false, gooseRollId: String(action.data.url)};
  case Actions.ERROR:
      return {...state, errorMsg: action.data};
  case Actions.ROLL:
      return {...state, userThinking: true, prizes:[action.data.prize1, action.data.prize2]};
  case Actions.ERROR_IN_ROLL:
      return {...state, errorWithRoll: action.data};
  case Actions.PRIZE_SELECTED:
      return {...state, selectedPrize: action.prize_id};
  default:
    return state
  }
}
