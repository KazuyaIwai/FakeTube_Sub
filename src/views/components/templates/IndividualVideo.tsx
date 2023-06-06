import { useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import VideoPlayer from '../molecules/VideoPlayer';
import CommentList from '../molecules/CommentList';
import RecommendVideoList from '../molecules/RecommendVideoList';

const sideMargin = 32;
const useStyles = makeStyles((theme: Theme) => ({
  contentMargin: {
    marginLeft: sideMargin,
    marginRight: sideMargin,
  },
}));

const getParams = (params: string): { [key: string]: string } => {
  const paramsArray = params.slice(1).split('&')
  const paramsObject: { [key: string]: string } = {}
  paramsArray.forEach(param => {
    paramsObject[param.split('=')[0]] = param.split('=')[1]
  });
  return paramsObject;
}

function IndividualVideo() {
  const classes = useStyles();

  // ビデオ識別子の取得
  const location = useLocation();
  var v = location.state?.v;
  if (!v) { v = getParams(location.search)?.v; }

  // 動画再生タグサイズ調整
  const maxSize = { width: 1200, height: 640};
  const mediumSize = { width: 640, height: 360};
  const minSize = { width: 360, height: 180};
  const [videoWidth, setVideoWidth] = useState(mediumSize.width);
  const [isSideRecommend, setIsSideRecommend] = useState(false);
  useLayoutEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth - 64;
      var width = mediumSize.width;
      if (windowWidth < minSize.width) {
        setIsSideRecommend(false);
        width = minSize.width;
        setVideoWidth(width);
      } else if ((windowWidth >= minSize.width) && (windowWidth < mediumSize.width)) {
        setIsSideRecommend(false);
        width = Math.max(windowWidth, minSize.width);
        setVideoWidth(width);
      } else if ((windowWidth >= mediumSize.width) && (windowWidth < maxSize.width)) {
        if ((windowWidth - mediumSize.width) < (minSize.width - 36)) {
          setIsSideRecommend(false);
          width = windowWidth;
        } else {
          setIsSideRecommend(true);
          width = mediumSize.width;
        }
        setVideoWidth(width);
      } else {
        setIsSideRecommend(true);
        const gridWidth = document.getElementById('recommend-video-list')?.offsetWidth;
        if (gridWidth) {
          setVideoWidth(windowWidth - gridWidth);
        } else {
          setVideoWidth(mediumSize.width);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={classes.contentMargin}>
      {isSideRecommend ? (
        <Grid container spacing={3}>
          <Grid item xs={6} style={{maxWidth: videoWidth}}>
            <VideoPlayer vid={v} videoWidth={videoWidth} isSmallSize={false} />
            <CommentList vid={v} videoWidth={videoWidth} isSmallSize={false} />
          </Grid>
          <Grid item xs={4} id='recommend-video-list'>
            <RecommendVideoList vid={v} videoWidth={videoWidth} isSmallSize={false} />
          </Grid>
        </Grid>
      ) : (
        <>
          <VideoPlayer vid={v} videoWidth={videoWidth} isSmallSize={true} />
          <RecommendVideoList vid={v} videoWidth={videoWidth} isSmallSize={true} />
          <CommentList vid={v} videoWidth={videoWidth} isSmallSize={true} />
        </>
      )}
    </div>
  );
}

export default IndividualVideo;