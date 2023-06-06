import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VideoList from '../molecules/VideoList';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ApiFetch from '../../../utils/ApiFetch';
import { FtThumbnailVideo } from '../../../utils/DataType';
import HomeBadges from '../molecules/HomeBadges';

const useStyles = makeStyles((theme: Theme) => ({
  headerMargin: {
    backgroundColor: theme.palette.common.white,
  },
  rootBadge: {
    paddingTop: '10px',
    paddingBottom: '10px',
    backgroundColor: theme.palette.common.white,
  },
}));

const HomeVideo: React.FC = () => {
  const classes = useStyles();

  const { fetchFtThumbnailVideos } = ApiFetch;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<FtThumbnailVideo[]>([]);
  const [page, setPage] = useState<number>(0);
  const loader = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const [isInitFetch, setIsInitFetch] = useState<boolean>(true);
  const [canFetch, setCanFetch] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        var limit = isInitFetch ? 6 : 1;
        setIsLoading(true);
        const newVideo = await fetchFtThumbnailVideos(limit, page, '');
        setData((prev) => [...prev, ...newVideo]);
        setPage((prev) => prev + limit);
        if (isInitFetch) { setIsInitFetch(false); }
        if (newVideo.length < limit) { setCanFetch(false); }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    const observer = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting && !isLoading && hasMore && canFetch) {
        fetchVideoInfo();
      }
    }, { threshold: 1 });

    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [data, hasMore, isLoading]);

  const path = "";
  useEffect(() => {
    if (location.pathname === path) {
      setData([]);
      setPage(1);
      setIsEnd(false);
      setHasMore(true);
    }
  }, [location.pathname, path]);

  return (
    <div className={classes.headerMargin}>
      <div className={classes.rootBadge}>
        <HomeBadges />
      </div>
      <VideoList videos={ data } />
      <div ref={loader}> </div>
    </div>
  );
}

export default HomeVideo;
