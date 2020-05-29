import React from 'react';
// import classes from './SingleEntryReview.css';

const SingleEntryReview = (props) => {
    const entries = [];
    for (let entryName in props.entries) {
        entries.push({
            item: entryName,
            data: props.entries[entryName]
        })
    }
    const entriesOutput = entries.map(en => (
        <span 
        key={en.item}
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}
        >{en.item} ({en.data})</span>
    ))

    return(
    <div>
        {entriesOutput}
    </div>
    )
}

export default SingleEntryReview;