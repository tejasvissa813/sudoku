import './landing.css'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SignUp from './components/signup';
import { useAuth0 } from '@auth0/auth0-react';

const Landing = () => {
    const nav = useNavigate();
    const [isSU, setIsSU] = useState(false);
    const { loginWithPopup, isAuthenticated, user, isLoading, logout } = useAuth0();

    // useEffect(() => {
    //     const handlePageTurn = (event) => {
    //         if(event.key === ' '){
    //             nav('/game');
    //         }
    //     };

    //     document.addEventListener('keydown', handlePageTurn);

    //     return () => {
    //         document.removeEventListener('keydown', handlePageTurn);
    //     };
    // }, [nav]);

    const clickPlay = () => {
        nav("/game");
    };

    const clickLeaderboard = () => {
        nav("/leaderboard");
    };

    const clickSignUp = () => {
        setIsSU(!isSU);
    }

    return (
        <div className="container">
            <div className="bar">
                {isAuthenticated ? (
                    <button class="topbutton" type="button" onClick={() => logout({logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
                ) : (
                    <>
                        <button class="topbutton" type="button" onClick={() => loginWithPopup()}>Log In</button>
                        {/* <button class="topbutton" type="button" onClick={clickSignUp}>Sign Up</button> */}
                    </>
                )}  
             </div>
            {isSU && <SignUp exit={clickSignUp}/>}
            <div className="landing">
                <p class="title">Sudoku</p>
                <button class="nav" type="button" onClick={clickLeaderboard}>Leaderboard</button>
                <button class="nav" type="button" onClick={clickPlay}>Play</button>
            </div>
        </div>
        
    );
};

export default Landing;