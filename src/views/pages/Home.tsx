import React from 'react';
import HomeVideo from '../components/templates/HomeVideo';
import { makeStyles, Theme } from '@material-ui/core/styles';
import OmitSidebar from '../components/organisms/OmitSidebar';


const useStyles = makeStyles((theme: Theme) => ({
  homeVideo: {
    paddingTop: 72,
    marginLeft: 72,
    marginRight: 36,
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <OmitSidebar />
      <div className={classes.homeVideo}>
        <HomeVideo />
      </div>
    </>
  );
}

export default Home;