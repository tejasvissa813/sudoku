import Box from "./Components/Box";
import Grid from "./Components/Grid";
import './game.css';
import actions from '../../methods'
import { useEffect, useState, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Game = () => {
    const [loading, setIsLoading] = useState(true);
    const [gameData, setGameData] = useState(null);
    const [userRole, setUserRole] = useState("");
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null);
    const [override, setOverride] = useState(false);
    const { getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        if(gameData !== null && !override){
            intervalRef.current = setInterval(() => {
                setTime(time => time+1);
            }, 1000)
        } else {
            clearInterval(intervalRef.current);
        }
        
        return () => {
            clearInterval(intervalRef.current);
        }
    }, [gameData])

    useEffect(() => {

        const fetchGame = async () => {
            try {
                const resp = await actions.get_game();
                const filter = resp.split("\n").map((arr, i) => {
                    let temp = arr.split(" ");
                    return temp.slice(0,9);
                }).flat();
                console.log(filter);
                setGameData(filter);
            } catch (err) {
                console.error('Error fetching game:', err);
            }
        };

        fetchGame();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const getRole = async () => {
            if(!isLoading && isAuthenticated){
                const claims = await getIdTokenClaims();
                const roles = claims['https://sudoku-example.com/roles'];
                console.log(roles[0]);
                setUserRole(roles[0]);
            } else {
                console.log("NOT LOGGED IN");
                setUserRole("");
            }
        }

        getRole();
    }, [isLoading, isAuthenticated, getIdTokenClaims])

    return (
        <>
            <div className="game">   
                { (gameData !== null) &&
                    <div>
                        <h1>Time: {time}s</h1> 
                        { (userRole === "Admin") &&
                            <button type="button" onClick={() => {setOverride(true);}}> Auto</button>
                        }
                    </div>
                    
                    
                }
                <Grid game={gameData} override={override}/>
            </div>
        </>
    );
};

export default Game;