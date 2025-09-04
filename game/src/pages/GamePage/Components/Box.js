import { useState, useEffect } from 'react'

const Box = (props) => {
    const { id, clickNumber, value, isPerm } = props;
    //const [selected, setSelected] = useState(false);
    //const [width, setWidth] = useState(1);

    const selected = (parseInt(clickNumber) === id);
    const width = (selected) ? 5 : 3

    const box_styles = {
        top: {
            width: 50,
            height: 50,
            alignContent: "center",

            borderLeftStyle: "solid",
            borderTopStyle: "solid",
            borderRightStyle: "solid",
            borderBottomStyle: "solid",

            borderLeftColor: (parseInt(value) <= -90) ? "red" :  "#daecca",
            borderTopColor: (parseInt(value) <= -90) ? "red" :  "#daecca",
            borderRightColor: (parseInt(value) <= -90) ? "red" :  "#daecca",
            borderBottomColor: (parseInt(value) <= -90) ? "red" :  "#daecca",

            borderLeftWidth:  width,
            borderTopWidth:  width,
            borderRightWidth: width,
            borderBottomWidth: width,

            margin: 2.5
        },
        text: {
            fontWeight: (isPerm) ? "bold" : "normal",
            fontFamily: "American Typewriter, serif",
            color: "#685952"
        }
    }

    // const handleClick = () => {
    //     setSelected(!selected);
    //     //console.log(selected);
    // }

    return(
        <div style={box_styles.top} id={id}>
            <p style={box_styles.text}>{(value === "0" || value === "-1") ? "" : ((parseInt(value) <= -90) ? String((parseInt(value) + 90) * -1) : value)}</p>
        </div>
    );
}

export default Box