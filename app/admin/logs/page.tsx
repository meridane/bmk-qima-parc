'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import SidebarWrapper from '@/components/SidebarWrapper';

export default function AdminLogs() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from('logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setLogs(data);
      }
    };

    fetchLogs();
  }, []);

  return (
    <SidebarWrapper>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Journal des activités (Logs)</h1>

        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Utilisateur</th>
                <th className="p-3 text-left">Action</th>
                <th className="p-3 text-left">Cible</th>
                <th className="p-3 text-left">Anciennes valeurs</th>
                <th className="p-3 text-left">Nouvelles valeurs</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="p-3">{new Date(log.created_at).toLocaleString()}</td>
                  <td className="p-3">{log.user_email || '—'}</td>
                  <td className="p-3">{log.action}</td>
                  <td className="p-3">{log.cible}</td>
                  <td className="p-3 text-gray-500">{log.anciennes_valeurs || '—'}</td>
                  <td className="p-3 text-gray-700">{log.nouvelles_valeurs || '—'}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    Aucun log trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarWrapper>
  );
}
