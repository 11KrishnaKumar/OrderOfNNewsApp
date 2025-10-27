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

// 🧠 Unified function for fetching category-wise headlines safely
export const getTopHeadlinesByCategory = async (
  category: string
): Promise<Article[]> => {
  try {
    // 🧩 Handle unsupported category "general"
    const apiCategory =
      category.toLowerCase() === 'general'
        ? '' // fallback: no category filter
        : `&category=${category.toLowerCase()}`;

    const response = await fetch(
      `https://newsdata.io/api/1/latest?apikey=pub_9c8b618234f042f4b5f48e2793c37dcb${apiCategory}&language=en`
    );

    const json = await response.json();

    console.log('Fetched category:', category);
    console.log('API raw response:', json);

    // 🧠 Check for success and valid results
    if (!json || json.status !== 'success' || !Array.isArray(json.results)) {
      console.warn(`⚠️ No valid results found for category: ${category}`, json);
      return [];
    }

    // 🧠 Transform data to your app’s `Article` format
    return json.results.map((item: any) => ({
      title: item.title,
      description: item.description || '',
      urlToImage: item.image_url || '',
      content: item.content || '',
      url: item.link || '',
      source: { name: item.source_id || 'Unknown' },
    })) as Article[];
  } catch (e) {
    console.error('❌ Error fetching news by category:', e);
    return [];
  }
};

export const getAvailableCategories = async () => {
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/sources?apikey=pub_9c8b618234f042f4b5f48e2793c37dcb`
    );
    const json = await response.json();
    console.log("📦 Available categories raw response:", json);
  } catch (error) {
    console.error("❌ Error fetching available categories:", error);
  }
};
