export interface Post {
  id?: number;
  slug: string;
  title: string;
  content: string;
  summary?: string;
  feature_image?: string;
  feature_image_alt?: string;
  keywords?: string;
  published: boolean;
  view_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  order_index: number;
  is_visible: boolean;
  created_at?: string;
}
