import React, { useEffect, useState, useLayoutEffect } from 'react';
import ApiFetch from '../../../utils/ApiFetch';
import { VId, RecommendVideo } from '../../../utils/DataType';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, GridSize, Typography } from '@material-ui/core';
import Thumbnail from '../atoms/Thumbnail';
import BadgeButton from '../atoms/BadgeButton';


const RcTitleFontSize = 14;
const RcInfoFontSize = 12;
const thumbnailWitdh = 168;
const useStyles = makeStyles((theme) => ({
  root: {
  },
  advert: {
    borderRadius: 10,
    boxShadow: '0px 0px 2px 0.1px',
    maxWidth: '360px',
    cursor: 'pointer',
  },
  badges: {
    textAlign: 'left',
    display: 'flex',
    paddingTop: theme.spacing(3),
  },
  rcList: {
    paddingTop: theme.spacing(3),
  },
  rcCard: {
    margin: theme.spacing(0.5),
    display: 'flex',
  },
  thumbnail: {
    width: thumbnailWitdh,
    height: '94px',
  },
  info: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  rcTitle: {
    fontSize: RcTitleFontSize, 
    textAlign: 'left',
    fontWeight: 'bold',
  },
  rcChannel: {
    fontSize: RcInfoFontSize, 
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
  rcOtherInfo: {
    fontSize: RcInfoFontSize, 
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
}));

const RecommendVideoList : React.FC<VId> = 
  ({vid, videoWidth, isSmallSize}) => {

  const classes = useStyles();
  const { fetchRecommendVideos } = ApiFetch;
  const MarginLeft = isSmallSize ? 0 : 32;

  // レコメンド動画情報取得
  const [recommendVideos, setRecommendVideos] = useState<RecommendVideo[]>([]);
  useEffect(() => {
    const fetchRecommendVideoInfo = async () => {
      try {
        const recVideos = await fetchRecommendVideos(vid, 0);
        setRecommendVideos(recVideos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecommendVideoInfo();
  }, [vid]);

  // タグサイズ調整
  const [listWidthSize, setListWidthSize] = useState(window.innerWidth - videoWidth - 64);
  const [maxTitleLength, setMaxTitleLength] = useState(20);
  const [maxInfoLength, setMaxInfoLength] = useState(10);
  const [gridRateThumnail, setGridRateThumnail] = useState<GridSize>(6);
  const [gridRateInfo, setGridRateInfo] = useState<GridSize>(6);
  useLayoutEffect(() => {
    const handleResize = () => {
      if (isSmallSize) {
        setListWidthSize(videoWidth);
      } else {
        setListWidthSize(window.innerWidth - videoWidth - 64);
      }
      // リサイズテキスト省略調整
      const gridElement = document.getElementById('recommend-videos-info');
      const gridWidth = gridElement?.offsetWidth;
      if (gridWidth) {
        setMaxTitleLength(Math.floor(gridWidth/RcTitleFontSize) * 2 - 3);
        setMaxInfoLength(Math.floor(gridWidth/RcInfoFontSize));
      }
      // リサイズGrid調整
      if (isSmallSize) {
        setGridRateThumnail(3);
        setGridRateInfo(9);
      } else {
        const parentGridWidth = document.getElementById('recommend-videos')?.offsetWidth;
        if (parentGridWidth) {
          if ((parentGridWidth / 2) - 12 < thumbnailWitdh) {
            setGridRateThumnail(7);
            setGridRateInfo(5);
          } else {
            setGridRateThumnail(6);
            setGridRateInfo(6);
          }
        } else {
          setGridRateThumnail(6);
          setGridRateInfo(6);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={classes.root} style={{maxWidth: listWidthSize, marginLeft: MarginLeft}}>
      <div>
        <img className={classes.advert} src='advertisement.png' style={{maxWidth:(listWidthSize - 36), height:'auto'}} />
      </div>
      <div className={classes.badges}>
        <BadgeButton label='すべて' isSelected={true} onClick={()=>{}} />
        <BadgeButton label='関連動画' isSelected={false} onClick={()=>{}} />
        <BadgeButton label='視聴済み' isSelected={false} onClick={()=>{}} />
      </div>
      <Grid container className={classes.rcList} id='recommend-videos'>
        {recommendVideos.map((rv) => (
          <Grid item key={rv.vid} xs={12} className={classes.rcCard}>
            <Grid container>
              <Grid item xs={gridRateThumnail}>
                <div className={classes.thumbnail}>
                  <div>
                    <Thumbnail vid= {rv.vid} customRadius={5} />
                  </div>
                </div>
              </Grid>
              <Grid item xs={gridRateInfo} id='recommend-videos-info'>
                <div className={classes.info}>
                  <div>
                    <Typography className={classes.rcTitle} >
                      {rv.title.length > maxTitleLength ? rv.title.slice(0, maxTitleLength) + '...' : rv.title}
                    </Typography>
                    <Typography className={classes.rcChannel} >
                      {rv.channelName.length > maxInfoLength ? rv.channelName.slice(0, maxInfoLength) + '...' : rv.channelName}
                    </Typography>
                    <Typography className={classes.rcOtherInfo} >
                      {`${rv.views} 回視聴 ・${rv.dayByUploaded} 日前`}
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  )
};

export default RecommendVideoList;