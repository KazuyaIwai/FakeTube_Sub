import React, { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import MicIcon from '@material-ui/icons/Mic';
import VideoCallIcon from '@material-ui/icons/VideoCallOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import Sidebar from './Sidebar';
import SuggestSearch from '../atoms/SuggestSearch';


const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    // backgroundColor: '#000',
    // color: '#fff',
    backgroundColor: 'white',
    color: 'black',
    display: 'flex',
  },
  header: {
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: 200,
  },
  headerLogo: {
    marginLeft: theme.spacing(2),
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    display: 'flex',
    cursor: 'pointer',
    marginTop: '10px',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    fontWeight: 'bold',
    fontSize: '20px',
    letterSpacing: '-0.05em',
    marginTop: '3px',
    transform: 'scaleY(1.2)',
  },
  titleJp: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    fontWeight: 'bold',
    fontSize: '8px',
    marginTop: '0px',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 4,
    },
    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  },
  iconButton: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    padding: 10,
    color: 'gray'
  },
  searchInputRoot: {
    display: 'flex',
    paddingTop: 10,
  },
  searchInputPaper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: 30,
    border: '1px solid #E0E0E0',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
  rightIcon: {
    display: 'flex',
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {setOpen(true);};
  const handleClose = () => {setOpen(false);};
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  }
  
  // 検索バー
  const [query, setQuery] = useState('');
  const [isSearchBarClicked, setSearchBarClicked] = useState(false);
  // 検索バーの値が変更されたときの処理 
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  // 検索バーがクリックされたときの処理 
  const handleInputClick = () => { setSearchBarClicked(true); };
  const handlePopupMouseDown = (text: string) => {
    setQuery(text);
    setSearchBarClicked(false);
  };
  const handlePopupBlur = () => {setSearchBarClicked(false);};
  // エンターキーが押されたときの処理
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // 検索を実行する処理を実装
      console.log(`Search for: ${query}`);
      if (query) {navigate(`/results?search_query=${query}`,{state:{searchQuery:query}});}
    }
  };
  const handleSearch = () => {
    // 検索処理を実装する
    console.log(`Search query: ${query}`);
    if (query) {navigate(`/results?search_query=${query}`,{state:{searchQuery:query}});}
  };
  
  // 予測変換パネル
  const [searchBarWidth, setSearchBarWidth] = useState(0);
  const [searchBarLeftBottomPos, setSearchBarLeftBottomPos] = useState({x: 0, y: 0});
  useLayoutEffect(() => {
    const searchBarHandleResize = () => {
      const element = document.getElementById('search-input-root');
      if (element) {
        const micIconElm = document.getElementById('search-input-mic-icon');
        setSearchBarWidth(Math.floor(element.offsetWidth - (micIconElm ? micIconElm.offsetWidth + 10 : 0)));
        setSearchBarLeftBottomPos({
          x: element.offsetLeft,
          y: element.offsetTop + element.offsetHeight,
        })
      }
    };
    searchBarHandleResize();
    window.addEventListener('resize', searchBarHandleResize);
    return () => window.removeEventListener('resize', searchBarHandleResize);
  }, []);

  return (
    <div className={classes.header}>
      <AppBar position='static' className={classes.appBar} elevation={0}>
        <Grid container alignItems='center'>
          <Grid item xs={3} className={classes.headerLogo}>
            <IconButton
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
              onClick={handleOpen}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              className={classes.drawer}
              variant='temporary'
              anchor='left'
              open={open}
              onClose={handleClose}
            >
              <Sidebar />
            </Drawer>
            <div className={classes.logo} onClick={handleHomeClick}>
              <img src='FakeTube.svg' width='40' height='30' />
              <span className={classes.title}>FakeTube</span>
              <span className={classes.titleJp}>JP</span>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.searchInputRoot} id='search-input-root' >
              <Paper component='form' className={classes.searchInputPaper} onBlur={handlePopupBlur}>
                {isSearchBarClicked &&
                  <>
                    <IconButton className={classes.searchIconButton} aria-label='search'>
                      <SearchIcon />
                    </IconButton>
                    <SuggestSearch 
                      inputText={query} 
                      searchWidth={searchBarWidth} 
                      positionX={searchBarLeftBottomPos.x} 
                      positionY={searchBarLeftBottomPos.y}
                      onMouseDownText={handlePopupMouseDown} />
                  </>
                }
                <InputBase
                  value={query}
                  className={classes.searchInput}
                  placeholder='検索'
                  onClick={handleInputClick}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton className={classes.searchIconButton} onClick={handleSearch} aria-label='search'>
                  <SearchIcon />
                </IconButton>
              </Paper>
              <IconButton className={classes.iconButton} id='search-input-mic-icon' >
                <MicIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={2} className={classes.rightIcon}>
            <IconButton className={classes.iconButton}>
              <VideoCallIcon />
            </IconButton>
            <IconButton className={classes.iconButton}>
              <NotificationsIcon />
            </IconButton>
            <IconButton color='inherit'>
              <Avatar alt='Avatar' src='myicon.jpg' />
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};

export default Header;