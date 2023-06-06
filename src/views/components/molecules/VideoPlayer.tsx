import React, { useRef, useEffect, useState } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import ApiFetch from '../../../utils/ApiFetch';
import { FtIndividualVideoInfo, VId } from '../../../utils/DataType';
import { Avatar, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NotificationsOutlined from '@material-ui/icons/NotificationsOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';


const subTitleRowHeight = 48;
const subDescriptionRowHeight = 116;
const useStyles = makeStyles((theme) => ({
  root: {
  },
  videoPlayer: {
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(0.5),
    fontSize: '28px',
    textAlign: 'left', 
    whiteSpace: 'pre-wrap'
  },
  titleRow: {
    marginTop: theme.spacing(1),
    display: 'flex',
  },
  subTitleRow: {
    minHeight: subTitleRowHeight,
    fontSize: '12px',
    display: 'flex',
  },
  channelIcon: {
    width: subTitleRowHeight,
    height: subTitleRowHeight,
    marginLeft: 0,
  },
  subChannelTitleRow: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
  },
  subChannelName: {
    fontSize: '16px',
    whiteSpace: 'nowrap',
  },
  subChannelSummary: {
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
  registerChannelButton: {
    borderRadius: '20px',
    backgroundColor: '#F2F2F2',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: '#e6e6fa',
    },
  },
  subscribedLeftButton: {
    backgroundColor: '#F2F2F2',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    '&:hover': {
      backgroundColor: '#e6e6fa',
    },
  },
  subscribedRightButton: {
    backgroundColor: '#F2F2F2',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeft: 0,
    '&:hover': {
      backgroundColor: '#e6e6fa',
    },
  },
  subDescriptionRow: {
    height: subDescriptionRowHeight,
    display: 'flex',
  },
  subDescription: {
    padding: 10,
    borderRadius: '10px',
    backgroundColor: '#F2F2F2',
    textAlign: 'left', 
    '&:hover': {
      backgroundColor: '#e6e6fa',
    },
  },
  subDescriptionDetail: {
    fontSize: '14px',
  }
}));

const VideoPlayer : React.FC<VId> = ({
  vid, videoWidth, isSmallSize
}) => {
  const classes = useStyles();
  const { 
    fetchFtIndividualVideoPath,
    fetchFtIndividualVideoInfo,
    fetchFtChannelIcon,
    fetchFtIndividualVideoUrl,
  } = ApiFetch;

  // mp4動画ファイルパスの取得
  const [ imageUrl, setImageUrl ] = useState('');
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const rtn = await fetchFtIndividualVideoUrl(vid);
        setImageUrl(rtn);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideo();
  }, [vid, fetchFtIndividualVideoPath]);
  // PrayerRef
  const playerRef = useRef<HTMLVideoElement>(null);

  // 動画以外の情報取得処理
  const [ info, setInfo ] = useState<FtIndividualVideoInfo>();
  const [ channelImageUrl, setChannelImageUrl ] = useState('');
  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const newInfo = await fetchFtIndividualVideoInfo(vid);
        setInfo(newInfo);
        // チャンネルアイコン画像の取得
        const rtnBlob = await fetchFtChannelIcon(newInfo.channelId);
        setChannelImageUrl(URL.createObjectURL(rtnBlob));
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideoInfo();
  }, [vid]);


  return (
    <Grid container className={classes.root}>
      <div className={classes.videoPlayer}>
        <ReactHlsPlayer 
          src={imageUrl}
          playerRef={playerRef}
          autoPlay={false}
          controls={true}
          width={videoWidth}
          height={'auto'}
          />
      </div>
      <Grid container>
        <Grid item xs={12} className={classes.titleRow}>
          <Typography 
            className={classes.title}
            style={{width: videoWidth}}>
            {info?.title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container 
            className={classes.subTitleRow} 
            style={{width: videoWidth}}
            alignItems='center' 
            spacing={0}>
        <Grid item xs={5} 
              className={classes.subChannelTitleRow}>
          <Avatar className={classes.channelIcon} src={channelImageUrl} />
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.subChannelName}>
                {info?.channelName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.subChannelSummary}>
                チャンネル登録者数{info?.subscribedCount}人
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Button className={classes.registerChannelButton}>
            <NotificationsOutlined />
            登録済み
            <KeyboardArrowDownIcon />
          </Button>
          <Button className={classes.subscribedLeftButton}>
              <ThumbUpAltOutlinedIcon />
              <Typography>
                &nbsp;{info?.subscribedCount}
              </Typography>
          </Button>
          <Button className={classes.subscribedRightButton}>
            <ThumbDownAltOutlinedIcon />
          </Button>
          <Button className={classes.registerChannelButton}>
            <ReplyOutlinedIcon />&nbsp;共有
          </Button>
        </Grid>
      </Grid>
      <Grid container 
            className={classes.subDescriptionRow} 
            style={{width: videoWidth}}
            alignItems='center' 
            spacing={0}>
        <Grid item xs={12}>
          <div className={classes.subDescription}>
            <Typography className={classes.subDescriptionDetail}>
              {info?.views} 回視聴 {info?.dayByUploaded} 日前
            </Typography>
            <Typography className={classes.subDescriptionDetail}>
              {info?.description}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VideoPlayer;
