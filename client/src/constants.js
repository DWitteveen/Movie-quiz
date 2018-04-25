export const baseUrl = 'http://localhost:4000'

export const localStorageJwtKey = 'currentUserJwt'

export const tempArray = [[],[]]

export let playerNumber = 3;

export function setValue(newValue) {
    console.log('newValue: ',newValue);
    if (newValue === "x") {
        playerNumber = 0
        console.log('playerNumber: ', playerNumber)
        } else {
        playerNumber = 1
        console.log('playerNumber: ', playerNumber)
        }
}