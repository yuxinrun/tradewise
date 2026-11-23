import { useEffect } from 'react';

const SITE = 'https://yuxinrun.github.io/tradewise';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  published?: string;
  structured?: object[];
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

export default function SEOHead({ title, description, path, type = 'website', published, structured }: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes('TradeWise') ? title : `${title} | TradeWise 外贸实战学院`;
    document.title = fullTitle;
    const url = SITE + path;

    setMeta('name', 'description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', SITE + '/images/og-cover.svg');
    setMeta('name', 'twitter:card', 'summary_large_image');

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    document.querySelectorAll('script[data-seo]').forEach((s) => s.remove());
    const schemas = structured ?? [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: fullTitle,
        description,
        url,
      },
    ];
    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', '1');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    if (published) setMeta('property', 'article:published_time', published);
  }, [title, description, path, type, published, structured]);

  return null;
}
