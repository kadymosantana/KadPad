export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface Note {
  id: number;
  user_id: number;
  title: string;
  description: string;
  tags: Tag[];
  links: Link[];
  created_at: string;
  updated_at: string;
}

export interface Link {
  id: number;
  note_id: number;
  url: string;
  created_at: string;
}

export interface Tag {
  id: number;
  note_id: number;
  user_id: number;
  name: string;
}
