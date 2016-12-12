export const ERROR = "ERROR";
export const EMAIL = "EMAIL";
export const GOOSE_SELECTED = "GOOSE_SELECTED";
export const ROLL = "ROLL";
export const ERROR_IN_ROLL = "ERROR_IN_ROLL";
export const PRIZE_SELECTED = "PRIZE_SELECTED";
export const PRIZE_APPROVED = "PRIZE_APPROVED";
export const PRIZE_APPROVED_ERROR = "PRIZE_APPROVED_ERROR";


export function sendEmail(data) {
    console.log(data);
    if (data.response) {
        return {type: EMAIL, data: data.response.data}
    }
    if (data.error) {
        console.log(data.error);
        return {type: ERROR, data: data.error.response.data}
    }
}

export function selectedPrize(data) {
  if (data.response){
    const prize_id = data.response.data.prize_id;
    return {type: PRIZE_APPROVED, prize_id}
  }
  if (data.error) {
    console.log(data.error);
    return {type: PRIZE_APPROVED_ERROR, data: data.error.response.data}
  }
}

export function selectGoose(goose_id) {
    return {type: GOOSE_SELECTED, goose_id}
}

export function rollReceived(data) {
    if (data.response) {
        return {type: ROLL, data: data.response.data}
    }
    if (data.error) {
        return {type: ERROR_IN_ROLL, data: data.error.response.data}
    }
}

export function selectPrize(prize_id) {
    return {type: PRIZE_SELECTED, prize_id}
}