import Box from "./Box";
import { useEffect, useState } from 'react';
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'
import EndGameBox from "./End";
import { useAuth0 } from '@auth0/auth0-react'

const Grid = (props) => {
    const { game, override } = props;
    const { fin, setFin } = useState(false);
    const [selNum, setSelNum] = useState(-1);
    const [children, setChildren] = useState([]);
    const [values, setValues] = useState(Array(81).fill('0'));
    const [perms, setPerms] = useState(null)
    const digits = new Set([1,2,3,4,5,6,7,8,9]);
    
    //const valid = checkValidity()

    const styles = {
        grid: {
            display: "flex",
            flexDirection: "column",
            gap: 1
        },
        row: {
            display: "flex",
            flexDirection: "row",
            gap: 1
        }
    }

    const parentClick = (e) => {
        const id = e.target.id;
        if(id === selNum) setSelNum(-1);
        else setSelNum(id);
    }

    const checkRow = (rowNum, newIdx, newVal) => {
        let temp = values.map((x, idx) => {
            if(idx === parseInt(newIdx)) {
                return String(newVal);
            }
            else if(x === "-1") return String(-1 * (idx+1));
            else return x;
        }).filter((x, idx) => {
            if(Math.floor(idx / 9) === rowNum) return true;
            else return false;
        })
        let tempS = new Set(temp);
        console.log(tempS);
        return tempS.size === 9;
    }

    const checkCol = (colNum, newIdx, newVal) => {
        let temp = values.map((x, idx) => {
            if(idx === parseInt(newIdx)) {
                return String(newVal);
            }
            else if(x === "-1") return String(-1 * (idx+1));
            else return x;
        }).filter((x, idx) => {
            if(Math.floor(idx % 9) === colNum) return true;
            else return false;
        })
        let tempS = new Set(temp);
        console.log(tempS);
        return tempS.size === 9;
    }

    const checkFin = () => {
        let temp = values.filter((x) => {
            if(x === "-1") return false;
            else return true;
        })
        return temp.size === 81;
    }

    useEffect(() => {
        if(game){
            setPerms([...game]);
            setValues([...game]);
        }
    }, [game])

    useEffect(() => {
        let temp = values;
        const handler = (event) => {
            if(perms === null) {}
            else if(parseInt(perms[selNum]) !== -1) {
                //console.log(perms);
            }
            else if(digits.has(parseInt(event.key))){
                let row = Math.floor(selNum / 9);
                let col = Math.floor(selNum % 9);

                if(checkRow(row, selNum, event.key) && checkCol(col, selNum, event.key)){
                    temp[selNum] = event.key;
                    setValues(temp);
                    if(checkFin()){
                        setFin(true);
                    }
                } else {
                    temp[selNum] = String(-90 - parseInt(event.key));
                    setValues(temp);
                }
                setSelNum(-1);
            }
            else if(event.key === " "){
                console.log(selNum, temp[selNum]);
                temp[selNum] = "-1";
                setValues(temp);
            }

            let parSub = []
            for(let i = 0; i < 9; i++){
                let sub = []
                for(let j = 0; j < 9; j++){
                    sub.push(
                        <Box id={9*i+j} clickNumber={selNum} value={temp[9*i+j]} isPerm={perms[9*i+j] !== "-1"}/>
                    );
                }
                parSub.push(
                    <div style={styles.row}>
                        {sub}
                    </div>
                )
            }
            setChildren(parSub);
        }
        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, [selNum, values])

    useEffect(() => {

        let parSub = []
        for(let i = 0; i < 9; i++){
            let sub = []
            for(let j = 0; j < 9; j++){
                sub.push(
                    <>
                        <Box id={9*i+j} clickNumber={selNum} value={values[9*i+j]} isPerm={(perms === null) ? false : (perms[9*i+j] !== "-1")}/>
                        { (j % 3 === 2 && j !== 8) && 
                            <div
                                style={{
                                    width: "2px",
                                    height: "60px",
                                    backgroundColor: "gray",
                                }}
                            />
                        }
                    </>
                );
            }
            parSub.push(
                <>
                    <div style={styles.row}>
                        {sub}
                    </div>
                    { (i % 3 === 2 && i !== 8) && 
                        <div>
                            <hr />
                        </div>
                    }
                    
                </>
                
            )
        }
        setChildren(parSub);
        
    }, [selNum, values])

    


    // useEffect(() => {
    //     
    // }, [])

    return(
        <div>
            {perms ? (
                <div style={{position: "relative"}}>
                <div className="grid" style={styles.grid} onClick={parentClick}>
                    {children}
                </div>
                {(override || fin) && (<EndGameBox/>)}
                </div>
                
            ) : ( 
                <Bouncy
                    size="90"
                    speed="1.75"
                    color="#daecca" 
                />
            )}
        </div>
    );
}

export default Grid