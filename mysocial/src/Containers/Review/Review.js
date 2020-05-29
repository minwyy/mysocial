import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import SingleEntryReview from '../../Components/SingleEntryReview/SingleEntryReview';
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
                fetchedData.push({
                    ...res.data[key],
                    id: key
                })
            }
            this.setState({loading: false, entries: fetchedData});
        })
        .catch( err => {this.setState({loading: false});
        })
    }

    render () {
        let reviewOutput = (
            <React.Fragment>
            {this.state.entries.map(eachEntry => (
                <SingleEntryReview key={eachEntry.id}
                    entries={eachEntry} />
                ))}
            </React.Fragment>
        )
        if (this.state.loading) {
            reviewOutput = <Spinner />;
        }

        return (
            <div>
              {reviewOutput}
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