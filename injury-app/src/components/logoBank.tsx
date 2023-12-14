import React from 'react'
import ATLLogo from '../assets/team_logos/ATL.png'
import BKNLogo from '../assets/team_logos/BKN.png'
import BOSLogo from '../assets/team_logos/BOS.png'
import CHALogo from '../assets/team_logos/CHA.png'
import CHILogo from '../assets/team_logos/CHI.png'
import CLELogo from '../assets/team_logos/CLE.png'
import DALLogo from '../assets/team_logos/DAL.png'
import DENLogo from '../assets/team_logos/DEN.png'
import DETLogo from '../assets/team_logos/DET.png'
import GSWLogo from '../assets/team_logos/GSW.png'
import HOULogo from '../assets/team_logos/HOU.png'
import INDLogo from '../assets/team_logos/IND.png'
import LACLogo from '../assets/team_logos/LAC.png'
import LALLogo from '../assets/team_logos/LAL.png'
import MEMLogo from '../assets/team_logos/MEM.png'
import MIALogo from '../assets/team_logos/MIA.png'
import MILLogo from '../assets/team_logos/MIL.png'
import MINLogo from '../assets/team_logos/MIN.png'
import NOPLogo from '../assets/team_logos/NOP.png'
import NYKLogo from '../assets/team_logos/NYK.png'
import OKCLogo from '../assets/team_logos/OKC.png'
import ORLLogo from '../assets/team_logos/ORL.png'
import PHILogo from '../assets/team_logos/PHI.png'
import PHXLogo from '../assets/team_logos/PHX.png'
import PORLogo from '../assets/team_logos/POR.png'
import SASLogo from '../assets/team_logos/SAS.png'
import SACLogo from '../assets/team_logos/SAC.png'
import TORLogo from '../assets/team_logos/TOR.png'
import UTALogo from '../assets/team_logos/UTA.png'
import WASLogo from '../assets/team_logos/WAS.png'
import NBALogo from '../assets/NBA.png'

interface LogoBankProps {
    handleTeamChange: (newTeam: string) => void;
}

function LogoBank({ handleTeamChange }: LogoBankProps) {
    function handleTeamSelection(e: React.MouseEvent<HTMLImageElement>) {
        const target = e.target as HTMLImageElement;
        handleTeamChange(target.alt);
    }

    return (
        <>
        <div id="logo-bank">
            <img src={NBALogo} className="logo nba" alt="NBA" onClick={handleTeamSelection}/>
            <img src={ATLLogo} className="logo" alt="ATL" onClick={handleTeamSelection}/>
            <img src={BKNLogo} className="logo" alt="BKN" onClick={handleTeamSelection}/>
            <img src={BOSLogo} className="logo" alt="BOS" onClick={handleTeamSelection}/>
            <img src={CHALogo} className="logo" alt="CHA" onClick={handleTeamSelection}/>
            <img src={CHILogo} className="logo" alt="CHI" onClick={handleTeamSelection}/>
            <img src={CLELogo} className="logo" alt="CLE" onClick={handleTeamSelection}/>
            <img src={DALLogo} className="logo" alt="DAL" onClick={handleTeamSelection}/>
            <img src={DENLogo} className="logo" alt="DEN" onClick={handleTeamSelection}/>
            <img src={DETLogo} className="logo" alt="DET" onClick={handleTeamSelection}/>
            <img src={GSWLogo} className="logo" alt="GSW" onClick={handleTeamSelection}/>
            <img src={HOULogo} className="logo" alt="HOU" onClick={handleTeamSelection}/>
            <img src={INDLogo} className="logo" alt="IND" onClick={handleTeamSelection}/>
            <img src={LACLogo} className="logo" alt="LAC" onClick={handleTeamSelection}/>
            <img src={LALLogo} className="logo" alt="LAL" onClick={handleTeamSelection}/>
            <img src={MEMLogo} className="logo" alt="MEM" onClick={handleTeamSelection}/>
            <img src={MIALogo} className="logo" alt="MIA" onClick={handleTeamSelection}/>
            <img src={MILLogo} className="logo" alt="MIL" onClick={handleTeamSelection}/>
            <img src={MINLogo} className="logo" alt="MIN" onClick={handleTeamSelection}/>
            <img src={NOPLogo} className="logo" alt="NOP" onClick={handleTeamSelection}/>
            <img src={NYKLogo} className="logo" alt="NYK" onClick={handleTeamSelection}/>
            <img src={OKCLogo} className="logo" alt="OKC" onClick={handleTeamSelection}/>
            <img src={ORLLogo} className="logo" alt="ORL" onClick={handleTeamSelection}/>
            <img src={PHILogo} className="logo" alt="PHI" onClick={handleTeamSelection}/>
            <img src={PHXLogo} className="logo" alt="PHX" onClick={handleTeamSelection}/>
            <img src={PORLogo} className="logo" alt="POR" onClick={handleTeamSelection}/>
            <img src={SASLogo} className="logo" alt="SAS" onClick={handleTeamSelection}/>
            <img src={SACLogo} className="logo" alt="SAC" onClick={handleTeamSelection}/>
            <img src={TORLogo} className="logo" alt="TOR" onClick={handleTeamSelection}/>
            <img src={UTALogo} className="logo" alt="UTA" onClick={handleTeamSelection}/>
            <img src={WASLogo} className="logo" alt="WAS" onClick={handleTeamSelection}/>
        </div>
        </>
    )
}

export default LogoBank;