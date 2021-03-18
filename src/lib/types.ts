export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  thumbnail: string;
  posts: Post[];
}

export interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  body: string;
  thumbnail: string;
  comments: Comment[];
  category: Category;
}

export interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  body: string;
}

export interface Page {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  content: string;
}
