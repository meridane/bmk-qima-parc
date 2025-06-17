export type Database = any;

clients: {
  Row: {
    id: string
    email: string | null
    nom_complet: string | null
    tel: string | null
    whatsapp: string | null
    same_number: boolean | null
    langue_native: string | null
    volume_conteneurs: number | null
    password_hash: string | null
    status: string | null
    created_at: string | null
  }
  Insert: {
    email?: string | null
    nom_complet?: string | null
    tel?: string | null
    whatsapp?: string | null
    same_number?: boolean | null
    langue_native?: string | null
    volume_conteneurs?: number | null
    password_hash?: string | null
    status?: string | null
    created_at?: string | null
  }
  Update: {
    email?: string | null
    nom_complet?: string | null
    tel?: string | null
    whatsapp?: string | null
    same_number?: boolean | null
    langue_native?: string | null
    volume_conteneurs?: number | null
    password_hash?: string | null
    status?: string | null
    created_at?: string | null
  }
}