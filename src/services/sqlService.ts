import SQLite from 'react-native-sqlite-storage';

import {IDatabaseContract} from '../contracts/DatabaseContract';
import {PodcastModel} from '../models/PodcastModel';

export class SQLiteService implements IDatabaseContract {
  private _db: SQLite.SQLiteDatabase;
  public isReady = false;

  constructor() {
    this._db = SQLite.openDatabase(
      {
        name: 'db.sqlite',
        location: 'Documents',
      },
      () => {
        console.log('sqlite database connected');
        this.init();
      },
      (error) => {
        console.log('sqlite database error', error);
      },
    );
  }

  private async init() {
    await this._db.executeSql(`
      CREATE TABLE IF NOT EXISTS podcasts (
        name VARCHAR(255) UNIQUE,
        episodes_count INT DEFAULT 0,
        feed_url TEXT,
        artist TEXT,
        thumbnail TEXT
      );
    `);

    this.isReady = true;
  }

  public getAllPodcasts(): Promise<PodcastModel[]> {
    const podcasts: PodcastModel[] = [];

    return new Promise((resolve, reject) => {
      this._db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM podcasts ORDER BY name;',
          [],
          (_tx, results) => {
            for (let i = 0; i < results.rows.length; i++) {
              const row = results.rows.item(i);

              podcasts.push({
                name: row.name,
                thumbnail: row.thumbnail,
                artist: row.artist,
                episodesCount: row.episodes_count,
                feedUrl: row.feed_url,
              });
            }

            resolve(podcasts);
          },
          (err) => {
            reject(err);
          },
        );
      });
    });
  }
  public subscribeToPodcast(podcast: PodcastModel): Promise<void> {
    console.log('vlad', podcast);
    const {artist, thumbnail, episodesCount, feedUrl, name} = podcast;
    return new Promise((resolve, reject) => {
      this._db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO podcasts (artist, episodes_count, feed_url, name, thumbnail) VALUES ($1, $2, $3, $4, $5)',
          [artist, episodesCount, feedUrl, name, thumbnail],
          () => {
            console.log('podcast added');
            resolve();
          },
          (_, err) => {
            console.log('error insert podcast', err);
            reject(err);
          },
        );
      });
    });
  }
}
