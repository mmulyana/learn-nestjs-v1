export interface IArticle {
  id: string;
  title: string;
  content: string;
  status: ArticleStatus;
}

export enum ArticleStatus {
  Success = 'success',
  Pending = 'pending',
  Cancel = 'cancel',
}
