import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { SongList } from '@/components/SongList';
import { Header } from '@/components/Header';

export default async function BrowsePage() {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: songs } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="bg-amber-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Browse All Songs</h1>
        </div>
      </Header>
      <div className="px-6">
        <SongList songs={songs || []} />
      </div>
    </div>
  );
} 