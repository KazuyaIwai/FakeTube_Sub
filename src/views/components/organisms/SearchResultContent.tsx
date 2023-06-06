import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ApiFetch from '../../../utils/ApiFetch';
import { FtThumbnailVideo } from '../../../utils/DataType';
import { Grid } from '@material-ui/core';
import HomeVideoCard from '../atoms/HomeVideoCard';
import Thumbnail from '../atoms/Thumbnail';


const useStyles = makeStyles((theme: Theme) => ({
  thumnail: {
    maxWidth: '360px',
  },
}));

const SearchResultContent: React.FC = () => {
  const classes = useStyles();
  const { fetchFtThumbnailVideos } = ApiFetch;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<FtThumbnailVideo[]>([]);
  const [page, setPage] = useState<number>(0);
  const loader = useRef<HTMLDivElement | null>(null);
  const [isInitFetch, setIsInitFetch] = useState<boolean>(true);
  const [canFetch, setCanFetch] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        //var limit = isInitFetch ? 6 : 1;
        var limit = 1;
        setIsLoading(true);
        const newVideo = await fetchFtThumbnailVideos(limit, page, '');
        setData((prev) => [...prev, ...newVideo]);
        setPage((prev) => prev + limit);
        //if (isInitFetch) { setIsInitFetch(false); }
        if (newVideo.length < limit) { setCanFetch(false); }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    if (!isLoading && canFetch) {
      fetchVideoInfo();
    }

  }, [data, isLoading]);

  return (
    <>
      <Grid container spacing={2}>
        {data.map((video) => (
          <Grid item key={video.videoId} xs={12}>
            <Grid container>
              <Grid item xs={4}>
                <div className={classes.thumnail}>
                  <Thumbnail vid={video.vid} customRadius={10} />
                </div>
              </Grid>
              <Grid item xs={6}>
                {video.title}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default SearchResultContent;