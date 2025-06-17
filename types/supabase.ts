export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
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
      conteneurs: {
        Row: {
          id: string
          numero: string
          seal_number: string | null
          destination: string | null
          zone_parc: 'zone 1' | 'zone 2' | 'zone 3' | null
          date_arrivee: string | null
          date_depart_prevue: string | null
          loading_en_cours: boolean
          loading_termine: boolean
          created_by: string | null
        }
        Insert: {
          id?: string
          numero: string
          seal_number?: string | null
          destination?: string | null
          zone_parc?: 'zone 1' | 'zone 2' | 'zone 3' | null
          date_arrivee?: string | null
          date_depart_prevue?: string | null
          loading_en_cours?: boolean
          loading_termine?: boolean
          created_by?: string | null
        }
        Update: Partial<Insert>
      }
      depenses: {
        Row: {
          id: string
          description: string
          montant: number
          photo_item: string
          photo_recu: string
          paye_par: 'admin' | 'compagnie'
          rembourse: boolean
          created_by: string | null
          created_at: string | null
        }
        Insert: Partial<Row>
        Update: Partial<Row>
      }
      documents_export: {
        Row: {
          id: string
          voiture_id: string | null
          url_document: string | null
          uploaded_at: string | null
        }
        Insert: Partial<Row>
        Update: Partial<Row>
      }
      facture_items_lignes: {
        Row: {
          id: string
          facture_id: string | null
          item_id: string | null
          prix_unitaire: number
          quantite: number
          montant: number
        }
        Insert: Partial<Row>
        Update: Partial<Row>
      }
      factures_items: {
        Row: {
          id: string
          conteneur_id: string | null
          devise: '$' | '₩'
          frais_loading: number
          total: number | null
          created_at: string | null
        }
        Insert: Partial<Row>
        Update: Partial<Row>
      }
      items: {
        Row: {
          id: string
          designation: string
          quantite: number
          photos_item: string[] | null
          photos_item_loaded: string[] | null
          conteneur_id: string | null
          created_at: string | null
        }
        Insert: Partial<Row>
        Update: Partial<Row>
      }
      logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          table_name: string
          old_values: Json | null
          new_values: Json | null
          date: string | null
        }
        Insert: Partial<Row>
        Update: Partial<Row>
      }
      revenus: {
        Row: {
          id: string
          description: string
          montant: number
          created_by: string | null
          created_at: string | null
        }
        Insert: Partial<Row>
        Update: Partial<Row>
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: 'client' | 'admin' | 'secroadmin' | 'superadmin'
          is_approved: boolean
          language: string
          created_at: string | null
          auth_id: string | null
        }
        Insert: Partial<Row>
        Update: Partial<Row>
      }
      voitures: {
        Row: {
          id: string
          marque: string
          modele: string
          chassis: string
          photo_chassis: string | null
          accidentee: boolean
          photos_dommages: string[] | null
          achetee_avec_papiers_bmk: boolean
          inspectee: boolean
          date_entree: string | null
          client_id: string | null
          conteneur_id: string | null
          zone_parc: 'zone 1' | 'zone 2' | 'zone 3' | null
          depart_du_parc: string | null
        }
        Insert: Partial<Row>
        Update: Partial<Row>
      }
      whatsapp_notifications: {
        Row: {
          id: string
          numero_destinataire: string | null
          message: string | null
          photos: string[] | null
          statut: 'envoye' | 'echec'
          created_at: string | null
        }
        Insert: Partial<Row>
        Update: Partial<Row>
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}