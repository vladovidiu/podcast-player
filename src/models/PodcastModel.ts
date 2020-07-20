export class PodcastModel {
  public artist: string;
  public episodesCount: number;
  public feedUrl: string;
  public name: string;
  public thumbnail: string;

  constructor(params: {
    artist: string;
    episodesCount: number;
    feedUrl: string;
    name: string;
    thumbnail: string;
  }) {
    const {artist, episodesCount, feedUrl, name, thumbnail} = params;
    this.artist = artist;
    this.episodesCount = episodesCount;
    this.feedUrl = feedUrl;
    this.name = name;
    this.thumbnail = thumbnail;
  }
}
