'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'react-hot-toast';
import { Song } from '@/types';
import { Button } from './Button';
import { useLoadImage } from '@/hooks/useLoadImage';
import Image from 'next/image';

interface AdminSongListProps {
  songs: Song[];
}

export const AdminSongList: React.FC<AdminSongListProps> = ({ songs }) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const handleDelete = async (song: Song) => {
    try {
      setIsLoading(song.id);

      // Delete song file
      const { error: songError } = await supabaseClient.storage
        .from('songs')
        .remove([song.song_path]);

      if (songError) {
        throw new Error('Failed to delete song file');
      }

      // Delete image file
      const { error: imageError } = await supabaseClient.storage
        .from('images')
        .remove([song.image_path]);

      if (imageError) {
        throw new Error('Failed to delete image file');
      }

      // Delete song record
      const { error: deleteError } = await supabaseClient
        .from('songs')
        .delete()
        .eq('id', song.id);

      if (deleteError) {
        throw new Error('Failed to delete song record');
      }

      toast.success('Song deleted successfully');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-white text-2xl font-semibold mb-4">Songs</h2>
      <div className="grid grid-cols-1 gap-4">
        {songs.map((song) => {
          const imageUrl = useLoadImage(song);
          return (
            <div
              key={song.id}
              className="flex items-center justify-between bg-neutral-800/50 p-4 rounded-lg"
            >
              <div className="flex items-center gap-x-4">
                <div className="relative h-16 w-16">
                  <Image
                    fill
                    src={imageUrl || '/images/liked.png'}
                    alt="Song cover"
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold">{song.title}</p>
                  <p className="text-neutral-400 text-sm">{song.author}</p>
                </div>
              </div>
              <Button
                onClick={() => handleDelete(song)}
                disabled={isLoading === song.id}
                className="bg-red-500 hover:bg-red-600"
              >
                {isLoading === song.id ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 