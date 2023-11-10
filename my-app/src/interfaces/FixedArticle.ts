export interface FixedArticle {
  id: string;
  category: string;
  user: string;
  user_id: string;
  user_image: string;
  title: string;
  url: string;
  content: string;
  curriculum: string;
  created_at: Date;
  updated_at: Date;
  comment_count: number;
  like_count: number;
}
