import React, { useRef, useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import ApiFetch from '../../../utils/ApiFetch';
import { Suggest } from '../../../utils/DataType';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    panel: {
      position: 'fixed',
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 5,
      boxShadow: '0px 0px 3px 0.1px',
      zIndex: theme.zIndex.tooltip,
      flexDirection: 'column',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1),
      '&:hover': {
        backgroundColor: '#e6e6fa',
      },
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  })
);

type Props = {
  inputText: string; 
  searchWidth: number;
  positionX: number;
  positionY: number;
  onMouseDownText: (text: string) => void;
};
const SuggestSearch: React.FC<Props> = ({ inputText, searchWidth, positionX, positionY, onMouseDownText }) => {
  const classes = useStyles();

  const { fetchSuggestSearch } = ApiFetch;

  // 検索サジェスト取得処理
  const [ suggests, setSuggests ] = useState<Suggest[]>([]);
  useEffect(() => {
    const fetchSuggest = async () => {
      try {
        const newSuggests = await fetchSuggestSearch(inputText);
        setSuggests(newSuggests);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSuggest();
  }, [inputText]);
  // 表示位置
  var addStyle = {left: positionX, top: positionY, width: searchWidth};

  // クリックした値を呼び出し元に送る
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedElement = e.target as HTMLDivElement;
    const text = clickedElement.textContent;
    onMouseDownText(text? text : '');
  };

  return (
    <Paper className={classes.panel} style={addStyle} >
      {suggests && Array.isArray(suggests) && suggests.map((item, index) => (
        <div key={index} className={classes.item} onMouseDown={handleMouseDown}>
          <SearchIcon className={classes.icon} />
          <Typography>{item.text}</Typography>
        </div>
      ))}
    </Paper>
  );
};

export default SuggestSearch;