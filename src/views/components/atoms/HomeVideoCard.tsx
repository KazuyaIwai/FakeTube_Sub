import HomeThumbnail from './HomeThumbnail';
import { FtThumbnailVideo } from '../../../utils/DataType';

function HomeVideoCard({ 
    videoId, 
    vid,
    channelId,
    channelName, 
    title,
    views,
    dayByUploaded
  }: FtThumbnailVideo) {

  return (
    <HomeThumbnail
      videoId={videoId}
      vid={vid}
      channelId={channelId}
      channelName={channelName}
      title={title}
      views={views}
      dayByUploaded={dayByUploaded} />
  );
}
export default HomeVideoCard;
