import React, { Component } from 'react';
import axios from '../../axios-orders';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import Spinner from '../../Components/UI/Spinner/Spinner';

import classes from './HomeEntry.css';

class HomeEntry extends Component {
    state = {
        orderForm: {
            ByMe: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'yes', displayValue: 'yes'},
                    {value: 'no', displayValue: 'no'}]
                },
                value: 'yes',
                label: 'initiated by me?',
                valid: true,
                validation: {}
            },
            Drive: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'get help', displayValue: 'get help'},
                    {value: 'help others', displayValue: 'help others'}, 
                    {value: 'mutual benefits', displayValue: 'mutual benefits'},
                    {value: 'for fun', displayValue: 'for fun'}
                ]
                },
                value: 'for fun',
                label: 'motivation',
                valid: true,
                validation: {}
            },
            HowManyOtherPeople: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'one', displayValue: 'one'},
                    {value: '2-5', displayValue: '2-5'}, 
                    {value: '6-20', displayValue: '6-20'},
                    {value: 'more than 20', displayValue: 'more than 20'}
                ]
                },
                value: '1',
                label: 'how many guys',
                valid: true,
                validation: {}
            },
            MainPersons: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'names'
                },
                value: '',
                label: 'main persons to engage',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            MainPlace: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'place'
                },
                value: '',
                label: 'main event place',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            Timeframe: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'less than 1 hr', displayValue: 'less than 1 hr'},
                    {value: 'half day', displayValue: 'half day'}, 
                    {value: 'whole day', displayValue: 'whole day'},
                    {value: 'multiple days', displayValue: 'multiple days'}
                ]
                },
                value: 'less than 1 hr',
                label: 'duration',
                valid: true,
                validation: {}
            },
            xGold: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'yes', displayValue: 'yes'},
                    {value: 'no', displayValue: 'no'}, 
                ]
                },
                value: 'no',
                label: 'gold?',
                valid: true,
                validation: {}
            },
            xRice: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'yes', displayValue: 'yes'},
                    {value: 'no', displayValue: 'no'}, 
                ]
                },
                value: 'yes',
                label: 'rice?',
                valid: true,
                validation: {}
            },
            xxGoodEnding: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'yes', displayValue: 'yes'},
                    {value: 'no', displayValue: 'no'}, 
                ]
                },
                value: 'yes',
                label: 'good ending?',
                valid: true,
                validation: {}
            },
            xxxComments: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'comment'
                },
                value: '',
                label: 'comments',
                validation: {},
                valid: true,
                touched: false
            }},
        formIsValid: false,
        loading: false
    
}

    orderHandler = ( e ) => {
        // e.preventDefault();

        const formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        };
        let month = new Date().getMonth() + 1;
        if (month < 10) {
            month = '0' + month.toString();
        } else {
            month = month.toString();
        }

        formData['Date'] = Number(new Date().getFullYear().toString() + month + new Date().getDate().toString());
        // console.log(new Date().get());

        axios.post('/data.json', formData)
        .then (response => {
            this.setState({loading: false});
            // this.props.history.push('/')
            alert('Successfully recorded! Keep up your good work!');
        })
        .catch(error => {
            this.setState({loading: false})
        });
        // console.log('hahahahhhhhhhhhhhh');
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        // valid check
        
        updatedFormElement.valid = this.checkValidity (updatedFormElement.value, updatedFormElement.validation);
        updatedForm[inputIdentifier]=updatedFormElement;
        // console.log(updatedFormElement);
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
    }

    checkValidity (value, rules) {
        let isValid = true;
        if (rules.required && isValid) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength;
        }
    
        if (rules.maxLength && isValid) {
            isValid = value.length <= rules.maxLength;
            
        }
        return isValid;
    }
    
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({id:key, config: this.state.orderForm[key]})
        }
        
        let form = (            
        <React.Fragment>
            <form>
                {formElementsArray.map(forElement => (
                        <Input 
                            key={forElement.id}
                            elementType={forElement.config.elementType}
                            elementConfig={forElement.config.elementConfig}
                            value={forElement.config.value}
                            label={forElement.config.label}
                            invalid={!forElement.config.valid}
                            touched={forElement.config.touched}
                            shouldValidation={forElement.config.validation}
                            change={(event) => (this.inputChangeHandler(event, forElement.id))} />
                ))}
            </form>
            <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.formIsValid}>Order</Button>
        </React.Fragment>
        );
        if (this.props.loading) {
            form = <Spinner />;
        } 

        return(
            <div className={classes.HomeEntry}>
            <h4>Another day another friend!</h4>
            {form}
        </div>
        )
    }
}

export default HomeEntry;