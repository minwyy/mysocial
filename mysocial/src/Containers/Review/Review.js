import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
// import SingleEntryReview from '../../Components/SingleEntryReview/SingleEntryReview';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Review extends Component {
    state = {
        entries: [],
        loading: true
    }
    componentDidMount () {
        const queryParams = '?auth=' + this.props.token;
        axios.get('/data.json' + queryParams)
        .then( res => {
            // console.log(res.data)
            const fetchedData = [];
            for (let key in res.data) {
                const fetchedData2 = [];
                for (let dkey in res.data[key]) {
                    // console.log(res.data[key][dkey]);
                    fetchedData2.push(res.data[key][dkey])
                }
                fetchedData.push(fetchedData2);
            }
            // console.log(fetchedData);
            // fetchedData.sort((a, b) => a.MainPersons.localeCompare(b.MainPersons));
            this.setState({loading: false, entries: fetchedData});
            })
            .catch( err => {this.setState({loading: false});
        })
    }

    render () {
        // let reviewOutput = (
        //     <React.Fragment>
        //     {/* {this.state.entries.map(eachEntry => (
        //         <SingleEntryReview key={eachEntry.id}
        //             entries={eachEntry} />
        //         ))} */}
        //     </React.Fragment>
        // )

        let resultHtml = "<table border=1>";
        resultHtml += "<tr><td>Initiated by me?</td><td>Date</td><td>Motivation</td><td>How many guys</td><td>Main persons to engage</td><td>Main event place</td><td>Duration</td><td>Gold?</td><td>Rice?</td><td>Good ending?</td><td>Comments</td></tr>"
        for(let i=0; i<this.state.entries.length; i++) {
            // console.log(this.state.entries[i]);
            resultHtml += "<tr>";
            for(let j=0; j<this.state.entries[i].length; j++){
                // console.log(this.state.entries[i][j]);
                resultHtml += "<td>"+this.state.entries[i][j]+"</td>";
            }
            resultHtml += "</tr>";
        }
        resultHtml += "</table>";
        
        let result = (
            <div dangerouslySetInnerHTML={{__html: resultHtml}}></div>
        )
        if (this.state.loading) {
            result = <Spinner />;
        }
        return (
            <div>
              {result}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps) (Review);