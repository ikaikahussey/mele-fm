import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AdminUploadModal } from '@/components/AdminUploadModal';
import { AdminSongList } from '@/components/AdminSongList';

export default async function AdminPage() {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if user is admin
  const { data: adminData } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user?.id)
    .single();

  if (!user || !adminData?.is_admin) {
    redirect('/');
  }

  const { data: songs } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="bg-amber-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <div className="px-6 pt-6">
        <h1 className="text-white text-3xl font-semibold">Admin Dashboard</h1>
        <div className="mt-4">
          <AdminUploadModal />
        </div>
        <div className="mt-6">
          <AdminSongList songs={songs || []} />
        </div>
      </div>
    </div>
  );
} 