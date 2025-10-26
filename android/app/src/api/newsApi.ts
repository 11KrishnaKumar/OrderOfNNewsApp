// import { BASE_URL, NEWS_API_KEY } from '../utils/constants';

// export const getTopHeadlines = async (category: string = 'technology') => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}`
//     );
//     const json = await response.json();
//     return json.articles || [];
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     return [];
//   }
// };

// // export const getTopHeadlines = async () => {
// //   // mock sample data for offline dev
// //   return [
// //     {
// //       title: 'AI Revolutionizes News Reading Experience',
// //       description: 'A new era of AI-driven news aggregation has arrived.',
// //       urlToImage: 'https://placekitten.com/400/200',
// //       content: 'Artificial Intelligence is transforming the way we consume information...',
// //     },
// //     {
// //       title: 'SpaceX Launches Next-Gen Satellite',
// //       description: 'Elon Musk’s SpaceX continues to push the boundaries of space tech.',
// //       urlToImage: 'https://placekitten.com/401/200',
// //       content: 'The company successfully launched its new satellite system...',
// //     },
// //   ];
// // };

import { NEWS_API_KEY, BASE_URL } from '../utils/constants';
import { Article } from '../types/news';

export const getTopHeadlinesByCategory = async (category: string): Promise<Article[]> => {
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/latest?apikey=pub_9c8b618234f042f4b5f48e2793c37dcb&category=${category.toLowerCase()}&language=en`
    );
    const json = await response.json();

    if (!json.results) return [];

    return json.results.map((item: any) => ({
      title: item.title,
      description: item.description,
      urlToImage: item.image_url,
      content: item.content,
      url: item.link,
      source: { name: item.source_id },
    })) as Article[];
  } catch (e) {
    console.error('Error fetching news by category:', e);
    return [];
  }
};
