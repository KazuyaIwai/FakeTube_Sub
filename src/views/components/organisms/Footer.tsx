import React, { useState, useLayoutEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#000',
    color: '#fff',
    display: 'none',
  }
}));

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
        <BottomNavigation showLabels >
          <BottomNavigationAction label="ホーム" icon={<HomeIcon />} />
          <BottomNavigationAction label="探索" icon={<ExploreIcon />} />
          <BottomNavigationAction icon={<AddIcon />} />
          <BottomNavigationAction label="登録チャンネル" icon={<AccountCircleIcon />} />
          <BottomNavigationAction label="ライブラリ" icon={<SubscriptionsIcon />} />
        </BottomNavigation>
    </AppBar>
  );
}

export default Footer;