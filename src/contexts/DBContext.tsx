import React, {createContext, useState, useRef, useEffect} from 'react';

import {PodcastModel} from '../models/PodcastModel';
import {IDatabaseContract} from '../contracts/DatabaseContract';
import {SQLiteService} from '../services/sqlService';

interface DBContextProps {
  podcasts: PodcastModel[];
  subToPodcast: (podcast: PodcastModel) => Promise<void>;
}

export const DBContext = createContext<DBContextProps>({
  podcasts: [],
  subToPodcast: () => Promise.resolve(),
});

export const DBProvider: React.FC = (props) => {
  const [podcasts, setPodcasts] = useState<PodcastModel[]>([]);
  const db = useRef<IDatabaseContract | null>(null);

  useEffect(() => {
    db.current = new SQLiteService();
  }, []);

  useEffect(() => {
    if (db.current?.isReady) {
      (async () => {
        if (db.current) {
          const _podcasts = await db.current.getAllPodcasts();
          setPodcasts(_podcasts);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db.current?.isReady]);

  const subToPodcast = async (podcast: PodcastModel) => {
    if (db.current) {
      await db.current.subscribeToPodcast(podcast);
      const _podcasts = await db.current.getAllPodcasts();

      setPodcasts(_podcasts);
    }
  };

  const value: DBContextProps = {
    podcasts,
    subToPodcast,
  };

  return (
    <DBContext.Provider value={value}>{props.children}</DBContext.Provider>
  );
};
