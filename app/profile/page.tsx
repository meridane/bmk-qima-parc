'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import SidebarWrapper from '@/components/SidebarWrapper';

export default function ProfileClient() {
  const [user, setUser] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: voitures } = await supabase
          .from('voitures')
          .select('*')
          .eq('client_id', user.id);

        const voitureEligible = voitures?.find(
          (v: any) => v.statut === 'chargée' && v.achetee_bmk === false
        );

        if (voitureEligible) {
          setShowUpload(true);

          const { data: conteneur } = await supabase
            .from('conteneurs')
            .select('*')
            .eq('client_id', user.id)
            .single();

          setDocUrl(conteneur?.document_url || null);
        }
      }
    };

    fetchData();
  }, []);

  const handleUpload = async () => {
    if (!file || !user) return;

    const filename = `doc-${user.id}-${Date.now()}.pdf`;
    const { error: uploadErr } = await supabase.storage
      .from('documents')
      .upload(filename, file);

    if (uploadErr) {
      setMessage('Erreur upload fichier.');
      return;
    }

    const publicUrl = supabase.storage.from('documents').getPublicUrl(filename).data.publicUrl;

    await supabase
      .from('conteneurs')
      .update({ document_url: publicUrl })
      .eq('client_id', user.id);

    setDocUrl(publicUrl);
    setMessage('Document ajouté avec succès ✅');
  };

  return (
    <SidebarWrapper>
      <div className="min-h-screen p-6 bg-gray-50 text-gray-900">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-4">Mon profil</h1>

          <p><strong>Email :</strong> {user?.email}</p>

          {showUpload && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Document d'exportation</h2>
              {docUrl ? (
                <a
                  href={docUrl}
                  target="_blank"
                  className="text-blue-600 underline block mb-2"
                >
                  Voir le document
                </a>
              ) : (
                <p className="text-gray-500 mb-2">Aucun document encore ajouté.</p>
              )}

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-2"
              />
              <button
                onClick={handleUpload}
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded"
              >
                Upload
              </button>
              {message && <p className="mt-3 text-sm">{message}</p>}
            </div>
          )}
        </div>
      </div>
    </SidebarWrapper>
  );
}
