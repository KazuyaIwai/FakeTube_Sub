import { useState, useEffect, ChangeEvent } from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import { Avatar, Grid, Typography } from '@material-ui/core';
import CommentCard from '../atoms/CommentCard';
import ApiFetch from "../../../utils/ApiFetch";
import { VId, Comment } from '../../../utils/DataType';
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Button from '@material-ui/core/Button';
import SortIcon from '@material-ui/icons/Sort';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  summaryComment: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    verticalAlign: 'middle',
  },
  summaryCommentText: {
    paddingTop: theme.spacing(2),
  },
  summaryCommentTextFont: {
    paddingTop: theme.spacing(0.5),
    fontWeight: 'bold',
    fontSize: 14,
  },
  submitComment: {
    paddingTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  channelIcon: {
    width: 40,
    height: 40,
    marginRight: theme.spacing(1),
  },
  registerCommentButtonRow: {
    textAlign: "right"
  },
  registerCommentButton: {
    borderRadius: '20px',
    backgroundColor: '#F2F2F2',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: '#e6e6fa',
    },
  },
}));

const CommentTextField = styled(TextField)({
  width: "100%",
  borderColor: 'white',
  '& .MuiInputBase-input': {
    borderBottom: '1px solid #ccc',
    padding: '12px 0',
  },
  '& .MuiInputBase-input:focus': {
    borderBottomColor: 'black',
    boxShadow: '0 1px 0 0',
  },
});

const CommentList : React.FC<VId> = (
  {vid, videoWidth, isSmallSize}
  ) => {
  const { fetchFtIndividualVideoComment, fetchFtIndividualVideoCommentSummary } = ApiFetch;
  const classes = useStyles();

  // コメント総数取得処理
  const [ commentSum, setCommentSum ] = useState<number>(0);
  // レンダリング時
  useEffect(() => {
    const fetchCommentSum = async () => {
      try {
        const sum = await fetchFtIndividualVideoCommentSummary(vid);
        setCommentSum(sum);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCommentSum();
  }, [vid]);

  // コメント取得処理
  const [ comments, setComments ] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  // レンダリング時
  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        setIsLoading(true);
        const cmt = await fetchFtIndividualVideoComment(vid, 0);
        setComments(cmt);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    if (!isLoading) {
      fetchVideoInfo();
    }
  }, [vid]);
  // スクロールイベントの処理
  const loadMoreData = async () => {
    try {
      setIsLoading(true);
      const moreComments = await fetchFtIndividualVideoComment(vid, pageNumber * 10);
      setComments((prev) => [...prev, ...moreComments]);
      setPageNumber((prev) => prev + 1);
      setIsLoading(false);
      if (moreComments.length < 10) {
        window.removeEventListener('scroll', handleScroll);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const handleScroll = () => {
    const bottomPosition = document.body.offsetHeight - (window.scrollY + window.innerHeight);
    if (bottomPosition < 0 && !isLoading) {
      loadMoreData();
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageNumber]);

  // コメント投稿フォーム
  const [submitComment, setSubmitComment] = useState("");
  const [submitCommentClicked, setSubmitCommentClicked] = useState(false);
  const submitCommentFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSubmitComment(event.target.value);
  };
  const handleSubmitCommentFocus = () => {
    setSubmitCommentClicked(true);
  };
  const handleSubmitCommentBlur = () => {
    setSubmitCommentClicked(false);
  };

  return (
    <div className={classes.root} style={{maxWidth: videoWidth}} >
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.summaryComment}>
            <Typography className={classes.summaryCommentText}>
              {`${commentSum}件のコメント`}
            </Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <IconButton>
              <SortIcon />
              <Typography className={classes.summaryCommentTextFont}>
                並べ替え
              </Typography>
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.submitComment}>
        <Grid item xs={1}>
          <Avatar className={classes.channelIcon} src="myicon.jpg" />
        </Grid>
        <Grid item xs={11}>
          <CommentTextField
            id="submit-comment-textarea"
            placeholder="コメントする..."
            value={submitComment}
            onChange={submitCommentFormChange}
            onFocus={handleSubmitCommentFocus}
            onBlur={handleSubmitCommentBlur}
          />
        </Grid>
        {submitCommentClicked && 
          <>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}>
              <IconButton>
                <InsertEmoticonIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10} className={classes.registerCommentButtonRow}>
              <Button className={classes.registerCommentButton}>
              &nbsp;キャンセル&nbsp;
              </Button>&nbsp;&nbsp;
              <Button className={classes.registerCommentButton}>
              &nbsp;コメント&nbsp;
              </Button>
            </Grid>
          </>
        }
      </Grid>
      <Grid container>
        {comments && Array.isArray(comments) && comments.map((comment) => (
          <Grid item key={comment?.commentId} xs={12}>
            <CommentCard {...comment} />
          </Grid>
        ))}
        {isLoading && <img src="loading.gif" width="30" height="30" />}
      </Grid>
    </div>
  );
}

export default CommentList;