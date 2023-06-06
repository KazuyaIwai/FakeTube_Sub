import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import HomeIcon from '@material-ui/icons/Home';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import ExploreIcon from '@material-ui/icons/Explore';
import SettingsIcon from '@material-ui/icons/Settings';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MovieIcon from '@material-ui/icons/Movie';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import HelpIcon from '@material-ui/icons/Help';
import FeedbackIcon from '@material-ui/icons/Feedback';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex: 2000,
    minWidth: 230,
    marginRight: '12px',
    marginLeft: '12px',
  },
  titleIcon: {
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontWeight: 'bold',
    fontSize: '18px',
    letterSpacing: '-0.05em',
    transform: 'scaleY(1.3)',
  },
  separator: {
    height: '0.5px',
    width: 206,
    backgroundColor: '#E6E6FA',
    margin: '10px 0px',
  },
}));

function Sidebar() {
  const classes = useStyles();
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleSubmenuOpen = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <div className={classes.root}>
      <List>
        <ListItem button>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton>
          <img src='FakeTube.svg' width='40' height='30' />
          <span className={classes.title}>FakeTube</span>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='ホーム' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary='ショート' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SubscriptionsIcon />
          </ListItemIcon>
          <ListItemText primary='登録チャンネル' />
        </ListItem>

        <div className={classes.separator} />

        <ListItem button>
          <ListItemIcon>
            <VideoLibraryIcon />
          </ListItemIcon>
          <ListItemText primary='ライブラリ' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary='履歴' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary='作成した動画' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary='後で見る' />
        </ListItem>
        <ListItem button onClick={handleSubmenuOpen}>
          <ListItemIcon>
            <ExpandMoreIcon />
          </ListItemIcon>
          <ListItemText primary='もっと見る' />
        </ListItem>
        <Collapse in={submenuOpen} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary='ミックスリスト' />
            </ListItem>
          </List>
        </Collapse>

        <div className={classes.separator} />

        <ListItem>
          <ListItemText primary='登録チャンネル' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SubscriptionsIcon />
          </ListItemIcon>
          <ListItemText primary='Myチャンネル' />
        </ListItem>

        <div className={classes.separator} />

        <ListItem>
          <ListItemText primary='探索' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <WhatshotIcon />
          </ListItemIcon>
          <ListItemText primary='急上昇' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MusicNoteIcon />
          </ListItemIcon>
          <ListItemText primary='音楽' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText primary='映画と番組' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LiveTvIcon />
          </ListItemIcon>
          <ListItemText primary='ライブ' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SportsEsportsIcon />
          </ListItemIcon>
          <ListItemText primary='ゲーム' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SportsEsportsIcon />
          </ListItemIcon>
          <ListItemText primary='ニュース' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary='スポーツ' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary='学び' />
        </ListItem>


        <div className={classes.separator} />

        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary='設定' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary='報告履歴' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary='ヘルプ' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FeedbackIcon />
          </ListItemIcon>
          <ListItemText primary='フィードバック' />
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;