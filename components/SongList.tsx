import Image from 'next/image';
import { Song } from '@/types';

interface SongListProps {
  songs: Song[];
}

export const SongList: React.FC<SongListProps> = ({ songs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {songs.map((song) => (
        <div
          key={song.id}
          className="bg-neutral-800/50 p-4 rounded-lg hover:bg-neutral-800/70 transition"
        >
          <div className="relative aspect-square w-full mb-4">
            <Image
              fill
              src={song.image_path || '/images/liked.png'}
              alt={song.title}
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="text-white font-semibold truncate">{song.title}</p>
            <p className="text-neutral-400 text-sm truncate">{song.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
}; 