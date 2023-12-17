import React, { useState, useEffect } from 'react'
import '../styles/injuryList.css'
import LogoBank from './logoBank';

// interface TeamData {
//     _id: number,
//     injuries: object,
//     depthChart: object,
//     teamName: string
// }

interface Record {
    _id: string;
    "Injuries": any;
    depthChart: any;
    "Team": string;
}

interface InjuryRecord {
    "Player": string;
    "Position": string;
    "Updated": string;
    "Injury": string;
    "Injury Status": string;
}

interface TeamData {
    record: Record;
    handleRecordChange: (newRecord: string) => void;
}

interface InjuryData {
    record: InjuryRecord;
}

function Record(props: TeamData) {
    function handleCopy(e: React.MouseEvent<HTMLTableCellElement>) {
        const target = e.target as HTMLTableCellElement;
        navigator.clipboard.writeText(target.innerText);
        alert(`${target.innerText} copied to clipboard.`)
    }

    function handleTeamInfo() {
        props.handleRecordChange(JSON.stringify(props.record["Injuries"]));
    }

    return (
        <tr>
            <td onClick={handleCopy}>{props.record._id}</td>
            {/* <td>{props.record.injuries}</td>
            <td>{props.record.depthChart}</td> */}
            <td onClick={handleTeamInfo}>{props.record["Team"]}</td>
        </tr>
    )
}

function InjuryRecord(props: InjuryData) {
    return (
        <tr>
            <td>{props.record["Player"]}</td>
            <td>{props.record["Position"]}</td>
            <td>{props.record["Updated"]}</td>
            <td>{props.record["Injury"]}</td>
            <td>{props.record["Injury Status"]}</td>
        </tr>
    )
}


function RecordList() {
    const [records, setRecords] = useState([]);
    const [currentTeam, setCurrentTeam] = useState("");

    useEffect(() => {
        async function getRecords() {
            const response = await fetch("http://localhost:5000/record/");
            if (!response.ok) {
                console.log(`An error occurred: ${response.statusText}`);
                return;
            }
            const records = await response.json();
            setRecords(records);
        }
        getRecords();
        return;
    }, [records.length]);

    function handleTeamChange(newTeam: string) {
        setCurrentTeam(newTeam);
    }

    function mapInjuries() {
        if (currentTeam == "" || currentTeam == "NBA") {
            // report the entire league
            return records.map((record: Record) => {
                const teamInjuries = record.Injuries;
                return teamInjuries.map((playerRecord: InjuryRecord) => {
                    return (
                        <InjuryRecord
                            record={playerRecord}
                        />
                    )
                })
            });
        } else {
            let teamInjuries;
            for (let record of records) {
                if (currentTeam == record["Team"]) {
                    teamInjuries = record["Injuries"] as any;
                    break;
                }
            }

            if (!teamInjuries) {
                return(<></>)
            }

            return teamInjuries.map((playerRecord: InjuryRecord) => {
                return (
                    <InjuryRecord
                        record={playerRecord}
                        key={playerRecord.Player}
                    />
                )
            });
        }
    }

    // code snippet from https://steveridout.com/mongo-object-time/
    function dateFromObjectId (objectId: string) {
        var date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
        return date.toString();
    }

    return (
        <div id="injury-list">
            <LogoBank
                handleTeamChange={handleTeamChange}
            />
            <div id='injury-table'>
                <h3>{currentTeam} Injury Table</h3>
                {records && records[0] ? <small>Last updated at {dateFromObjectId(records[0]["_id"])}</small> : <></>}
                <button id="update-btn">Request Update</button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Position</th>
                            <th>Updated</th>
                            <th>Injury</th>
                            <th>Injury Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mapInjuries()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecordList;