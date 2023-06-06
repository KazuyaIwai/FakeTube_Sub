

// ホーム画面用サムネイル抜き情報取得
export type FtThumbnailVideo = {
  videoId: string;
  vid: string;
  title: string; // 動画タイトル
  channelId: string; // 登録チャンネルアイコン
  channelName: string; // 登録チャンネル名
  views: number; // 視聴回数
  dayByUploaded: string; // 最終更新日
};

// 個別動画画面用動画ファイル抜き情報取得
export type FtIndividualVideoInfo = {
  videoId: string;
  vid: string;
  title: string; // 動画タイトル
  channelId: string; // 登録チャンネルId
  channelName: string; // 登録チャンネル名
  subscribedCount: number; // 登録チャンネル数
  description: string; // 詳細文章
  good: number; // いいねの数
  views: number; // 視聴回数
  dayByUploaded: string; // 最終更新日
};


export type VId = {
  vid: any;
  videoWidth: number;
  isSmallSize: boolean;
}
export type VideoUrl = {
  vid: string;
  url: string;
}

export type Comment = {
  vid: string,
  commentId: string, 
  userId: string; // 投稿ユーザーID
  userName: string; // 投稿ユーザー名
  comment: string; // コメント
  myEvaluate: string; // 自ユーザーがコメントを評価してるかどうか（2:高評価、1:低評価、0:評価なし）
  dayByUploaded: string; // 最終更新日
  good: number; // 高評価数
  bad: number; // 低評価数
};

export type RecommendVideo = {
  videoId: number;
  vid: string;
  recommendNo: string;// レコメンドNo
  title: string;// タイトル
  channelName: string;// 登録チャンネル名
  views: number; // 視聴回数
  dayByUploaded: number; // 最終更新日
}

export type Suggest = {
  id: string;
  text: string;
}