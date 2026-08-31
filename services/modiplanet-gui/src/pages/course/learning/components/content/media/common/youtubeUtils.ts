/**
 * 유튜브 URL에서 비디오 ID 추출
 * 지원 형식:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function getYoutubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?\/]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // 직접 ID만 입력한 경우
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * 유튜브 비디오 ID를 Video.js가 사용할 수 있는 URL로 변환
 */
export function getYoutubeUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * URL이 유튜브 URL인지 확인
 */
export function isYoutubeUrl(url: string): boolean {
  return getYoutubeVideoId(url) !== null;
}
