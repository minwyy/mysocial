import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
// import SingleEntryReview from '../../Components/SingleEntryReview/SingleEntryReview';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Button from '../../Components/UI/Button/Button';

class Review extends Component {
    state = {
        entries: [],
        label: ['Initiated by me?', 'Date', 'Motivation', 'How many guys', 'Main persons to engage', 'Main event place', 'Duration',
        'Gold?', 'Rice?', 'Good ending?', 'Comments'],
        loading: true
    }


    sortHandler = (props) => {
        if (props === '1') {
            console.log(props);         
            this.setState((prevState) => {
            return {entries: prevState.entries.sort((a, b) => a[props] - b[props])}
        })}
        else {
            console.log(props);  
            this.setState((prevState) => {
            return {entries: prevState.entries.sort((a, b) => a[props].localeCompare(b[props]))}
            })
        }

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
            // fetchedData.sort((a, b) => a[3].localeCompare(b[3]));
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
        const SortBar = [];
        for (let e in this.state.label) {
            SortBar.push(
            <Button btnType='Sort' clicked={this.sortHandler} index={e} key={e}>{this.state.label[e]}</Button>)
        }

        let resultHtml = "<table border=1> <tr>";
        for (let e in this.state.label) {
            resultHtml += "<td>" + this.state.label[e] + "</td>"; 
        }
        resultHtml += "</tr>"
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
                {SortBar}
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