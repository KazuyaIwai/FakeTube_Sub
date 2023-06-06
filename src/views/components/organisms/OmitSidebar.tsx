import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIconOutlined from '@material-ui/icons/ExploreOutlined';
import SubscriptionsIconOutlined from '@material-ui/icons/SubscriptionsOutlined';
import VideoLibraryIconOutlined from '@material-ui/icons/VideoLibraryOutlined';


const useStyles = makeStyles((theme: Theme) => ({
  homeSidebar: {
    position: 'fixed',
    top: 72,
    left: 0,
    bottom: 0,
    width: 72,
    zIndex: 1,
  },
  sideMenu: {
    flexDirection: 'column',
    marginLeft: 12,
    marginTop: 6,
    width: 64,
    height: 64,
  },
  sideIcon: {
    width: 24,
    height: 24,
    paddingLeft: 16,
    paddingRight: 16,
  },
  sideIconText: {
    fontSize: 10,
    whiteSpace: 'nowrap',
  }
}));

const OmitSidebar = () => {
  const classes = useStyles();

  return (
    <div className={classes.homeSidebar}>
      <List>
        <ListItem button className={classes.sideMenu}>
          <ListItemIcon>
            <HomeIcon className={classes.sideIcon} />
          </ListItemIcon>
          <ListItemText primary={
              <Typography className={classes.sideIconText}>
                ホーム
              </Typography>
            } />
        </ListItem>

        <ListItem button className={classes.sideMenu}>
          <ListItemIcon>
            <ExploreIconOutlined className={classes.sideIcon} />
          </ListItemIcon>
          <ListItemText primary={
              <Typography className={classes.sideIconText}>
                ショート
              </Typography>
            } />
        </ListItem>

        <ListItem button className={classes.sideMenu}>
          <ListItemIcon>
            <SubscriptionsIconOutlined className={classes.sideIcon} />
          </ListItemIcon>
          <ListItemText primary={
              <Typography className={classes.sideIconText}>
                登録チャンネル
              </Typography>
            } />
        </ListItem>

        <ListItem button className={classes.sideMenu}>
          <ListItemIcon>
            <VideoLibraryIconOutlined className={classes.sideIcon} />
          </ListItemIcon>
          <ListItemText primary={
              <Typography className={classes.sideIconText}>
                ライブラリ
              </Typography>
            } />
        </ListItem>
      </List>
    </div>
  );
};

export default OmitSidebar;