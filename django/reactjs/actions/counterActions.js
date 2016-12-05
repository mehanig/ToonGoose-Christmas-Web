export const INCREASE = "INCREASE";
export const EMAIL = "EMAIL";
export const GOOSE_SELECTED = "GOOSE_SELECTED";

export function increaseCounter() {
    return {type: INCREASE}
}

export function sendEmail() {
    return {type: EMAIL}
}

export function selectGoose(goose_id) {
    return {type: GOOSE_SELECTED, goose_id}
}