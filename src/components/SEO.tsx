'use client';

import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  twitterCreator?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

const defaultSEO = {
  title: 'Gulshan Toppo — Creative Developer & Automation Builder',
  description: 'Gulshan Toppo — Creative Developer, Automation Builder, Trading Systems Explorer. Building digital experiences that feel alive.',
  image: '/portfolio-3d/og-image.png',
  url: 'https://gulshan1234g5.github.io/portfolio-3d/',
  type: 'website' as const,
  twitterCard: 'summary_large_image' as const,
  twitterCreator: '@gulshan1234g5',
};

export function SEO({
  title,
  description,
  image,
  url,
  type,
  twitterCard,
  twitterCreator,
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: SEOProps = {}) {
  const seo = { ...defaultSEO, ...{ title, description, image, url, type, twitterCard, twitterCreator } };

  useEffect(() => {
    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    updateMeta('title', seo.title);
    updateMeta('description', seo.description);
    updateMeta('og:title', seo.title, true);
    updateMeta('og:description', seo.description, true);
    updateMeta('og:image', seo.image, true);
    updateMeta('og:url', seo.url, true);
    updateMeta('og:type', seo.type, true);
    updateMeta('twitter:card', seo.twitterCard);
    updateMeta('twitter:title', seo.title);
    updateMeta('twitter:description', seo.description);
    updateMeta('twitter:image', seo.image);
    updateMeta('twitter:creator', seo.twitterCreator);

    if (publishedTime) updateMeta('article:published_time', publishedTime, true);
    if (modifiedTime) updateMeta('article:modified_time', modifiedTime, true);
    if (authors?.length) authors.forEach(a => updateMeta('article:author', a, true));
    if (tags?.length) tags.forEach(t => updateMeta('article:tag', t, true));

    updateLink('canonical', seo.url);
  }, [seo.title, seo.description, seo.image, seo.url, seo.type, seo.twitterCard, seo.twitterCreator, publishedTime, modifiedTime, authors, tags]);

  return null;
}

export function JSONLD({ data }: { data: object }) {
  useEffect(() => {
    let script = document.querySelector('script[data-jsonld="dynamic"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-jsonld', 'dynamic');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }, [data]);

  return null;
}