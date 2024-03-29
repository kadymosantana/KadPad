export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: number;
  user_id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: number;
  note_id: number;
  user_id: number;
  name: number;
}

export interface Link {
  id: number;
  note_id: number;
  url: string;
  created_at: string;
}
