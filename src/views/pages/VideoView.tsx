import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import IndividualVideo from '../components/templates/IndividualVideo';

const useStyles = makeStyles((theme: Theme) => ({
  contents: {
    paddingTop: 100,
  },
}));

function VideoView() {
  const classes = useStyles();
  
  return (
    <div className={classes.contents}>
      <IndividualVideo />
    </div>
  );
}

export default VideoView;
