import axios from "axios"

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 10000,
})

const getGame = async () => {
    return instance.get('/game')
        .then((resp) => {
            console.log(resp.data);
            return resp.data;
        }).catch((err) => {
            return null;
        });
}

const actions = {
    get_game: getGame
};

export default actions;