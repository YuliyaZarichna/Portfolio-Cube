import React from 'react';

function About(props) {
    console.log("About component")
    const onClicked = () => {
        console.log("on click in About Page")
    }
    return (
        <div>
            <a href={props.link} >
                <p onClick={onClicked}>
                    About
            </p>
            </a>
        </div>
    );
}

export default About;