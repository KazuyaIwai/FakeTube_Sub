import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';
import ApiFetch from '../../../utils/ApiFetch';


const useStyles = makeStyles((theme) => ({
  imageStyle: {
    backgroundColor: 'transparent',
    border: 1,
    transition: 'all 0.3s ease-in-out',
    '&': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    '&:hover': {
      filter: 'brightness(60%)',
    },
  },
}));

type ThumnailId = {
  vid: string;
  customRadius: number;
}

const Thumbnail: React.FC<ThumnailId> = ({
  vid, customRadius
}) => {
  const classes = useStyles();

  const { fetchFtThumbnailImg } = ApiFetch;
  const navigate = useNavigate();

  // サムネイル画像クリック時の挙動
  const handleClick = () => {
    navigate('/watch?v=' + vid, { state: { v: vid }});
  }

  // サムネイル画像の取得
  const [thumnailUrl, setThumnailUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // サムネイル
        const thumnailImg = fetchFtThumbnailImg(vid, 'false');
        const imgurl = URL.createObjectURL(await thumnailImg);
        setThumnailUrl(imgurl);
        // ホバー時gif
        const thumnailGif = fetchFtThumbnailImg(vid, 'true');
        const gifurl = URL.createObjectURL(await thumnailGif);
        setImageUrl(gifurl);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    loadData();
  }, [vid, fetchFtThumbnailImg]);


  // ホバー時のアニメーション
  const [isHovering, setIsHovering] = useState(false);
  const [borderRadius, setBorderRadius] = useState<number>(customRadius);
  const handleMouseEnter = () => {
    setIsHovering(true);
    setBorderRadius(0);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
    setBorderRadius(customRadius);
  };
  const cardMediaStyle = { borderRadius: `${borderRadius}px` }

  return (
    <>
      <CardMedia 
        component='img' 
        image={isHovering ? imageUrl : thumnailUrl} 
        alt=''
        onClick={handleClick} 
        className={classes.imageStyle}
        style={cardMediaStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        />
        {isLoading && <img src='loading.gif' width='30' height='30' />}
    </>
  );
};

export default Thumbnail;