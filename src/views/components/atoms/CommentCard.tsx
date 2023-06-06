import React, { useRef, useEffect, useState } from "react";
import { Comment } from "../../../utils/DataType";
import { makeStyles } from "@material-ui/core/styles";
import ApiFetch from "../../../utils/ApiFetch";
import { Avatar, Typography, Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    margin: 5,
  },
  channelIcon: {
    width: 40,
    height: 40,
    marginRight: theme.spacing(1),
  },
  commentContent: {
    fontSize: "14px",
  },
  thumbUpDownButton: {
    '&:hover': {
      backgroundColor: '#e6e6fa',
    },
  },
  replyButton: {
    borderRadius: 20,
    '&:hover': {
      backgroundColor: '#e6e6fa',
    },
  },
}));


const CommentCard: React.FC<Comment> = ({
  vid,
  commentId,
  userId,
  userName,
  comment,
  myEvaluate,
  dayByUploaded,
  good,
  bad,
}) => {

  const classes = useStyles();
  const { 
    fetchFtUserIcon,
  } = ApiFetch;

  // ユーザーアイコン
  const [userImageUrl, setUserImageUrl] = useState("");
  // サムネイル画像の取得
  useEffect(() => {
    fetchFtUserIcon(userId)
      .then((rtnBlob) => {
        const url = URL.createObjectURL(rtnBlob);
        setUserImageUrl(url);
      });
  }, [userId, fetchFtUserIcon]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={1}>
        <Avatar className={classes.channelIcon} src={userImageUrl} />
      </Grid>
      <Grid item xs={11}>
        <Typography className={classes.commentContent}>
          {`${userName} ${dayByUploaded}日前`}
        </Typography>
        <Typography className={classes.commentContent}>
          {comment}
        </Typography>
        <div>
          <IconButton className={classes.thumbUpDownButton}>
            {myEvaluate == "2" &&
              <ThumbUpAltIcon />
            }
            {myEvaluate != "2" &&
              <ThumbUpAltOutlinedIcon />
            }
          </IconButton>
          {good}
          <IconButton className={classes.thumbUpDownButton}>
            {myEvaluate == "1" &&
              <ThumbDownAltIcon />
            }
            {myEvaluate != "1" &&
              <ThumbDownAltOutlinedIcon />
            }
          </IconButton>
          <Button className={classes.replyButton}>
            返信
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default CommentCard;