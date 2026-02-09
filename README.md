# Gürkaya Astro Frontend

Bu repo Astro tabanlı frontend projesidir.

## Mimari
- `/`, `/kurumsal`, `/iletisim`, `/katalog/[brandId]` sayfaları **statik** üretilir.
- `/blog` sayfası Payload API'den runtime'da veri çeker.
- UI/UX mevcut React bileşenlerinden taşınmıştır.

## Geliştirme
```bash
npm install
cp .env.example .env
npm run dev
```

`.env`:
```env
PUBLIC_PAYLOAD_API_URL=https://payload-sunucunuz.com
```

## Build
```bash
npm run build
```

## Dokploy (GitHub Deploy)
1. Bu klasörü ayrı bir GitHub reposuna koyun.
2. Dokploy'da yeni App oluşturun ve repo bağlayın.
3. Build yöntemi:
- Dockerfile ile: repo içindeki `Dockerfile` kullanın.
- veya klasik komutlar:
  - Install: `npm ci`
  - Build: `npm run build`
  - Start: statik dosya sunumu için Nginx/Static Server kullanın.
4. Frontend env değişkenine Payload URL verin: `PUBLIC_PAYLOAD_API_URL`.

## Route Özet
- `/`
- `/kurumsal`
- `/iletisim`
- `/blog`
- `/katalog/*`
