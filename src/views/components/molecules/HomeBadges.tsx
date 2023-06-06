import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BadgeButton from '../atoms/BadgeButton';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    position: 'relative',
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
    backgroundColor: theme.palette.common.white,
  },
  absoluteArrowLeft: {
    position: 'fixed',
    left: '0px',
  },
  absoluteArrowRight: {
    position: 'fixed',
    right: '0px',
  },
}));

function HomeBadges() {
  const classes = useStyles();
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 120;
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 120;
    }
  };

  return (
    <div className={classes.container} ref={containerRef} onScroll={handleScroll}>
      <BadgeButton label="すべて" isSelected={true} onClick={()=>{}} />
      <BadgeButton label="ミックス" onClick={()=>{}} />
      <BadgeButton label="音楽" onClick={()=>{}} />
      <BadgeButton label="ゲーム" onClick={()=>{}} />
      <BadgeButton label="野球" onClick={()=>{}} />
      <BadgeButton label="ライブ" onClick={()=>{}} />
      <BadgeButton label="ニュース" onClick={()=>{}} />
      <BadgeButton label="ビジュアル アート" onClick={()=>{}} />
      <BadgeButton label="料理" onClick={()=>{}} />
      <BadgeButton label="キャラクター アニメ、子供向..." onClick={()=>{}} />
      <BadgeButton label="アクション&アドベンチャー" onClick={()=>{}} />
      <BadgeButton label="工芸品" onClick={()=>{}} />
      <BadgeButton label="最近アップロードされた動画" onClick={()=>{}} />
      {scrollLeft > 0 && (
        <div className={classes.absoluteArrowLeft}>
          <BadgeButton label="<" isArrow={true} onClick={handleScrollLeft} />
        </div>
      )}
      {containerRef.current 
        && containerRef.current.scrollWidth - containerRef.current.clientWidth - containerRef.current.scrollLeft > 0 
        && (
          <div className={classes.absoluteArrowRight}>
            <BadgeButton label=">" isArrow={true} onClick={handleScrollRight} />
          </div>
        )
      }
    </div>
  );
}

export default HomeBadges;