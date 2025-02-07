export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface CV {
  id: string
  user_id: string
  title: string
  type: string
  data: {
    personalInfo: {
      fullName: string
      email: string
      phone: string
      address: string
      photoUrl?: string
      postSeeking?: string
      description?: string
    }
    experience: Array<{
      id?: string
      title: string
      company: string
      location: string
      startDate: string
      endDate?: string
      current: boolean
      description: string
    }>
    education: Array<{
      id?: string
      school: string
      degree: string
      field: string
      startDate: string
      endDate?: string
      current: boolean
      description?: string
    }>
    skills: Array<{
      id?: string
      name: string
      level: string
    }>
    languages: Array<{
      id?: string
      name: string
      level: string
    }>
    hobbies: Array<{
      id?: string
      name: string
      description?: string
    }>
  }
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_cvs: {
        Row: {
          id: string
          user_id: string
          title: string
          type: string
          data: {
            personalInfo: {
              fullName: string
              email: string
              phone: string
              address: string
              photoUrl?: string
              postSeeking?: string
              description?: string
            }
            experience: Array<{
              id?: string
              title: string
              company: string
              location: string
              startDate: string
              endDate?: string
              current: boolean
              description: string
            }>
            education: Array<{
              id?: string
              school: string
              degree: string
              field: string
              startDate: string
              endDate?: string
              current: boolean
              description?: string
            }>
            skills: Array<{
              id?: string
              name: string
              level: string
            }>
            languages: Array<{
              id?: string
              name: string
              level: string
            }>
            hobbies: Array<{
              id?: string
              name: string
              description?: string
            }>
          }
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          type: string
          data: any
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          type?: string
          data?: any
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
