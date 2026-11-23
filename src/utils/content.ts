import type { Article, ArticleMeta } from '../types';
import { articleMeta } from '../data/articles';

const modules = import.meta.glob('../articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '');
}

const contents = new Map<string, string>();
Object.entries(modules).forEach(([path, content]) => {
  contents.set(slugFromPath(path), content);
});

export function getArticle(slug: string): Article | undefined {
  const meta = articleMeta.find((a) => a.slug === slug);
  const content = contents.get(slug);
  if (!meta || !content) return undefined;
  return { ...meta, content };
}

export function getAllArticles(): Article[] {
  return articleMeta
    .map((meta) => ({ ...meta, content: contents.get(meta.slug) ?? '' }))
    .filter((a) => a.content.length > 0);
}

export function getAllMeta(): ArticleMeta[] {
  return articleMeta.filter((a) => contents.has(a.slug));
}

/** 生成标题锚点 ID，与 rehype-slug 保持一致 */
export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-');
}

/** 从 Markdown 中提取 H2/H3 作为目录 */
export function extractToc(content: string): { level: number; text: string; id: string }[] {
  const lines = content.split('\n');
  const toc: { level: number; text: string; id: string }[] = [];
  let inCode = false;
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const text = match[2].replace(/\*\*/g, '').replace(/`/g, '').trim();
      toc.push({ level: match[1].length, text, id: slugifyHeading(text) });
    }
  }
  return toc;
}

/** 去掉 Markdown 标记，生成搜索用纯文本 */
export function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
