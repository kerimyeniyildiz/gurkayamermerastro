import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog yazıları.
 *
 * Eskiden yazılar ayrı bir sunucudaki Payload CMS'ten (MongoDB) TARAYICIDA
 * çekiliyordu. Bunun iki sonucu vardı:
 *  1. İçerik HTML'e hiç girmiyordu — Google blogu göremiyordu.
 *  2. CMS sunucusu kapandığında blog sessizce boşalıyordu.
 *
 * Artık yazılar repoda markdown dosyası olarak duruyor ve derleme sırasında
 * HTML'e gömülüyor. Yeni yazı eklemek için `src/content/blog/` altına bir
 * `.md` dosyası koymak yeterli (bkz. o klasördeki OKUBENI.md).
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    /** Kapak görseli — tam URL (ör. https://cdn.gurkayamermer.com/...) */
    image: z.string(),
    category: z.string().default('Genel'),
    publishedAt: z.coerce.date(),
    /** Taslakları yayından tutmak için */
    draft: z.boolean().default(false),
    readingTime: z.string().default('3 dk okuma süresi'),
  }),
});

export const collections = { blog };
