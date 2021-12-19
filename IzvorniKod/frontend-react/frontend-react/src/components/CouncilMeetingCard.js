import React from "react";
import "./Event.css";
import "./Login.css";
import { useHistory } from "react-router";


function CouncilMeetingCard(props) {
    const title = props.meeting.title
    const report = props.meeting.report
    const datetime = props.meeting.dateTime
    const id = props.meeting.id
    const author = props.meeting.account

    const history = useHistory();

    return (
        <div className="Event">
            <div>
                <b>Naslov: </b>
                <span>{title}</span>
            </div>
            <div>
                <b>Datum: </b>
                <span>{datetime}</span>
            </div>
            <div>
                <b>Autor: </b>
                <span>{author.firstName} {author.lastName}</span>
            </div>
            <div className='Login'>
                <button className='button' type="button" onClick={() => {history.push(`/council/report/${id}`)}}>Više informacija</button>
            </div>
        </div>
    )
}

export default CouncilMeetingCard;