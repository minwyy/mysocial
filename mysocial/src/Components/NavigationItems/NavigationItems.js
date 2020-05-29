import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}> 
        <NavigationItem link="/" exact>Home</NavigationItem>
        {props.isAuth ? <NavigationItem link="/review">Review</NavigationItem> : null}
        {props.isAuth ? <NavigationItem link="/logoff">Logoff</NavigationItem> : <NavigationItem link="/auth">Auth</NavigationItem>}
    </ul>
)



export default navigationItems;