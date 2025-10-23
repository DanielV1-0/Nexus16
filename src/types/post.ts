export interface PostMeta {
  title: string;
  date: string;
  author?: string;
  description: string;
  tags:string;
}

export interface PostData extends PostMeta {
  slug: string;
  contentHtml: string;
}

export interface PostItem {
  slug: string;
  title: string;
  date: string;
  image: string;
  readTime: string;
  createdat:string;
}

export interface PostItemFilter {
  slug: string;
  title: string;
  date: string;
  image: string;
  readTime: string;
  createdat:string;
  category:string;
}