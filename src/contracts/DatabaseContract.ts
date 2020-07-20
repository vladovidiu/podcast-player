import {PodcastModel} from '../models/PodcastModel';

export interface IDatabaseContract {
  getAllPodcasts(): Promise<PodcastModel[]>;
  subscribeToPodcast(podcast: PodcastModel): Promise<void>;
  isReady: boolean;
}
