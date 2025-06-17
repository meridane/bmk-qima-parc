'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import SidebarWrapper from '@/components/SidebarWrapper';

export default function UploadVoiture() {
  const [modele, setModele] = useState('');
  const [chassis, setChassis] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!modele || !chassis || !file) {
      return setMessage('Tous les champs sont requis');
    }

    setUploading(true);
    setMessage('');

    const filename = `${Date.now()}-${file.name}`;
    const { data: imgData, error: imgError } = await supabase.storage
      .from('voitures')
      .upload(filename, file);

    if (imgError) {
      setMessage('Erreur upload image');
      setUploading(false);
      return;
    }

    const imgUrl = supabase.storage.from('voitures').getPublicUrl(filename).data.publicUrl;

    const { error: insertError } = await supabase.from('voitures').insert({
      modele,
      numero_chassis: chassis,
      photo: imgUrl,
    });

    if (insertError) {
      setMessage('Erreur enregistrement base');
    } else {
      setMessage('Voiture enregistrée avec succès ✅');
      setModele('');
      setChassis('');
      setFile(null);
    }

    setUploading(false);
  };

  return (
    <SidebarWrapper>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow mt-6">
        <h1 className="text-xl font-bold mb-4 text-gray-800">Ajouter une voiture</h1>

        <label className="block mb-2 text-gray-700">Modèle :</label>
        <input
          value={modele}
          onChange={(e) => setModele(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="ex. Hyundai Tucson"
        />

        <label className="block mb-2 text-gray-700">Numéro de châssis :</label>
        <input
          value={chassis}
          onChange={(e) => setChassis(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="ex. KMHEC41L..."
        />

        <label className="block mb-2 text-gray-700">Photo principale :</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />

        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-full h-auto max-h-52 object-contain mb-4"
          />
        )}

        <button
          onClick={handleUpload}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded"
          disabled={uploading}
        >
          {uploading ? 'Envoi...' : 'Envoyer'}
        </button>

        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </div>
    </SidebarWrapper>
  );
}
