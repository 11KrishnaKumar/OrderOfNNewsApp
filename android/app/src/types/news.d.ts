// export interface Article {
//   title: string;
//   description: string;
//   urlToImage: string;
//   url: string;
//   source: { name: string };
// }

export interface Article {
  title: string;
  description: string;
  urlToImage: string;
  content: string;
  url: string; // optional now
  source?: {
    id?: string;
    name?: string;
  };
}