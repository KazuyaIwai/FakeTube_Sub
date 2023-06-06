import {
  FtThumbnailVideo,
  FtIndividualVideoInfo,
  VideoUrl,
  Comment,
  RecommendVideo,
  Suggest,
} from "./DataType"

// サーバーサイドURL
const URL = 'http://localhost:8080/api/stream'

// URL作成関数
function mkUrl(dtlUrl: string, params: Map<string, string>) {
  var parameter = '?';
  params.forEach((value, key) => {
    parameter += (key + '=' + value + '&');
  });
  if (parameter == '?') {
    parameter = ''
  } else if (parameter.endsWith('&')) {
    parameter = parameter.slice(0, -1);
  }
  return URL + dtlUrl + parameter
}

// ホーム用動画取得Ajax関数
async function fetchFtThumbnailVideos(limit: number, offset: number, searchText: string): Promise<FtThumbnailVideo[]> {
  var params = new Map<string, string>([
    ['limit', limit.toString()], ['offset', offset.toString()], ['searchText', searchText]
  ]);
  const response = 
    await fetch(mkUrl('', params), {
      method: 'GET',
    });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
}

// ホーム用サムネイルImg取得Ajax関数
async function fetchFtThumbnailImg(vId: string, isHover: string): Promise<Blob> {
  var params = new Map<string, string>([
    ['vid', vId ], ['isHover', isHover ]
  ]);
  const response = 
    await fetch(mkUrl('/thumbnail', params), {
      method: 'GET',
    });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const blob = await response.blob();
  return blob;
}

// 登録チャンネルアイコン画像取得Ajax関数
async function fetchFtChannelIcon(channelId: string): Promise<Blob> {
  var params = new Map<string, string>([
    ['channelId', channelId ]
  ]);
  const response = 
    await fetch(mkUrl('/channelIcon', params), {
      method: 'GET',
    });
  if (!response.ok) {
    throw new Error('Failed to fetch channelIcon data');
  }
  const blob = await response.blob();
  return blob;
}

// 個別用動画ファイル取得Ajax関数
async function fetchFtIndividualVideo(vid: string): Promise<Blob> {
  var params = new Map<string, string>([
    ['vid', vid]
  ]);
  const response = 
    await fetch(mkUrl('/individual/video', params), {
      method: 'GET',
    });
  if (!response.ok) {
    throw new Error('Failed to fetch individual video');
  }
  const blob = await response.blob();
  return blob;
}
// 個別用動画ファイル取得パスAjax関数
async function fetchFtIndividualVideoPath(vid: string): Promise<VideoUrl> {
  var params = new Map<string, string>([
    ['vid', vid]
  ]);
  const response = 
    await fetch(mkUrl('/individual/video-path', params), {
      method: 'GET',
    });
  if (!response.ok) {
    throw new Error('Failed to fetch individual video');
  }
  return response.json();
}
// 個別用動画ファイル取得URL
function fetchFtIndividualVideoUrl(vid: string): string {
  var params = new Map<string, string>([
    ['vid', vid]
  ]);
  return mkUrl('/individual/video', params);
}

// 個別用動画情報取得Ajax関数
async function fetchFtIndividualVideoInfo(vid: string): Promise<FtIndividualVideoInfo> {
  var params = new Map<string, string>([
    ['vid', vid]
  ]);
  const response = 
    await fetch(mkUrl('/individual/info', params), {
      method: 'GET',
    });
  if (!response.ok) {
    throw new Error('Failed to fetch individual info');
  }
  const json = await response.json();
  return json;
}

// 個別用動画コメント取得Ajax関数
async function fetchFtIndividualVideoComment(vid: string, offset: number): Promise<Comment[]> {
  var params = new Map<string, string>([
    ['vid', vid], ['offset', offset.toString()]
  ]);
  const response = 
    await fetch(mkUrl('/individual/comment', params), {
      method: 'GET',
    });
  if (!response.ok) {
    throw new Error('Failed to fetch comment info');
  }
  const json = await response.json();
  return json;
}

// 個別用動画コメント総数 取得Ajax関数
async function fetchFtIndividualVideoCommentSummary(vid: string): Promise<number> {
  var params = new Map<string, string>([['vid', vid]]);
  const response = 
    await fetch(mkUrl('/individual/comment/summary', params), {
      method: 'GET',
    });
  if (!response.ok) {
    throw new Error('Failed to fetch comment summary');
  }
  const json = await response.json();
  return json;
}

// ユーザーアイコン取得Ajax関数
async function fetchFtUserIcon(userId: string): Promise<Blob> {
  var params = new Map<string, string>([
    ['userId', userId]
  ]);
  const response = 
    await fetch(mkUrl('/userIcon', params), {
      method: 'GET',
    });
  if (!response.ok) {
    // throw new Error('Failed to fetch user icon');
  }
  const blob = await response.blob();
  return blob;
}

// レコメンドビデオ情報取得Ajax関数
async function fetchRecommendVideos(vid: string, offset: number): Promise<RecommendVideo[]> {
  var params = new Map<string, string>([
    ['vid', vid], ['offset', offset.toString()]
  ]);
  const response = 
    await fetch(mkUrl('/individual/recommend', params), {
      method: 'GET',
    });
  if (!response.ok) {
    throw new Error('Failed to fetch recommend videos');
  }
  const json = await response.json();
  return json;
}

// サジェスト情報取得Ajax関数
async function fetchSuggestSearch(text: string): Promise<Suggest[]> {
  var params = new Map<string, string>([
    ['text', text]
  ]);
  const response = 
    await fetch(mkUrl('/suggest', params), {
      method: 'GET',
    });
  if (!response.ok) {
    throw new Error('Failed to fetch suggest');
  }
  const json = await response.json();
  return json;
}

export default { 
  fetchFtThumbnailVideos,
  fetchFtThumbnailImg,
  fetchFtIndividualVideo,
  fetchFtIndividualVideoPath,
  fetchFtIndividualVideoUrl,
  fetchFtIndividualVideoInfo,
  fetchFtChannelIcon,
  fetchFtIndividualVideoComment,
  fetchFtIndividualVideoCommentSummary,
  fetchFtUserIcon,
  fetchRecommendVideos,
  fetchSuggestSearch,
}



