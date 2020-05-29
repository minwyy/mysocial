import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}> 
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/review">Review</NavigationItem>
    </ul>
)

export default navigationItems;