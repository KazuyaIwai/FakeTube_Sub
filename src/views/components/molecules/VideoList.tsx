import { Grid } from '@material-ui/core';
import HomeVideoCard from '../atoms/HomeVideoCard';
import { FtThumbnailVideo } from '../../../utils/DataType';

type Props = {
  videos: FtThumbnailVideo[];
};

function VideoList({ videos }: Props) {
  return (
    <Grid container spacing={2}>
      {videos.map((video) => (
        <Grid item key={video.videoId} xs={12} sm={6} md={4} lg={4}>
          <HomeVideoCard {...video} />
        </Grid>
      ))}
    </Grid>
  );
}

export default VideoList;