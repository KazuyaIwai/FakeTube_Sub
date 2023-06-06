import React, { useEffect, useState, useLayoutEffect } from 'react';
import Thumbnail from './Thumbnail';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Grid } from '@material-ui/core';
import ApiFetch from '../../../utils/ApiFetch';
import { FtThumbnailVideo } from '../../../utils/DataType';

const titleFontSize = 18;
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    margin: '10px',
    padding: '2px',
  },
  thumbnail: {
    width: '100%',
    height: 'auto',
    maxWidth: 360,
    maxHeight: 200,
    minWidth: 320,
    minHeight: 188,
    marginLeft: theme.spacing(2),
    border: 0,
    cursor: 'pointer',
    borderColor: 'black',
    backgroundColor: 'white',
  },
  channelIcon: {
    width: 48,
    height: 48,
    marginLeft: theme.spacing(2),
  },
  title: {
    fontWeight: 'bold',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    fontSize: titleFontSize,
    textAlign: 'left', 
    whiteSpace: 'pre-wrap'
  },
  titleRow: {
    marginTop: theme.spacing(1),
    display: 'flex',
  },
  chanelRow: {
    display: 'flex',
  },
  underRow: {
    display: 'flex',
    alignItems: 'left',
  },
  underText: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(2),
    fontWeight: 'bold',
    fontSize: '14px',
    maxWidth: 300,
  },
}));

const HomeThumbnail: React.FC<FtThumbnailVideo> = ({
  videoId,
  vid,
  channelId,
  channelName,
  title,
  views,
  dayByUploaded,
}) => {
  const classes = useStyles();

  const { fetchFtChannelIcon } = ApiFetch;
  const [channelImageUrl, setChannelImageUrl] = useState('');


  // チャンネルアイコン画像の取得
  useEffect(() => {
    fetchFtChannelIcon(channelId)
      .then((rtnBlob) => {
        const url = URL.createObjectURL(rtnBlob);
        setChannelImageUrl(url);
      }).catch((error) => {
        console.error(error);
      });
  }, [channelId, fetchFtChannelIcon]);

  // タグサイズ調整
  const [maxTitleLength, setMaxTitleLength] = useState(20);
  useLayoutEffect(() => {
    const handleResize = () => {
      // リサイズテキスト省略調整
      const gridElement = document.getElementById('home-thumnail-title');
      const gridWidth = gridElement?.offsetWidth;
      if (gridWidth) {
        setMaxTitleLength(Math.floor(gridWidth/titleFontSize) * 2 - 2);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <Grid container className={classes.root}>
      <div className={classes.thumbnail}>
        <Thumbnail vid={vid} customRadius={15} />
      </div>
      <Grid container>
        <Grid item xs={2} className={classes.titleRow}>
          <Avatar className={classes.channelIcon} src={channelImageUrl} />
        </Grid>
        <Grid item xs={10} className={classes.titleRow} id='home-thumnail-title'>
          <Typography className={classes.title}>
            {title.length > maxTitleLength ? title.slice(0, maxTitleLength) + '...' : title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={10}>
          <div className={classes.chanelRow}>
            <Typography className={classes.underText} >
              {channelName}
            </Typography>
          </div>
          <div className={classes.underRow}>
            <Typography className={classes.underText}>
              {views}回視聴・{dayByUploaded}日前
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeThumbnail;
