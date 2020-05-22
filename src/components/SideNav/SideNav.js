import React from 'react';
import './SideNav.css';
import coronalogo from '../../assets/Images/coronavirus.png';
import SvgManager from '../SvgManager/SvgManager';

const SideNav = () => {
    return(
        <div className="cm-sideNav-container">
            <div className="cm-logo">
                <h1 className="mainHead">C<img src={coronalogo} alt="corona" />vid-19</h1>
                <div className="cm-sideNav-menu">
                    <ul>
                        <li><i><SvgManager showSVG='homeSvg'/></i><span>Home</span></li>
                        <li><i><SvgManager showSVG='worldSvg'/></i><span>Global Cases</span></li>
                        <li><i><SvgManager showSVG='symptomsSvg'/></i><span>Symptoms</span></li>
                        <li><i><SvgManager showSVG='preventionSvg'/></i><span>Prevention</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideNav;