import { Children, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import SEOHead from '../components/SEOHead';
import Icon from '../components/Icon';
import { getArticle } from '../utils/content';
import { articleMeta } from '../data/articles';
import { getCategory } from '../data/categories';
import { getTool } from '../data/tools';
import './ArticlePage.css';

interface TocItem { id: string; text: string; level: number }

export default function ArticlePage() {
  const { slug = '' } = useParams();
  const article = getArticle(slug);
  const articleRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [progress, setProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!article) return;
    const timer = setTimeout(() => {
      const nodes = articleRef.current?.querySelectorAll<HTMLHeadingElement>('h2[id], h3[id]');
      if (nodes) setToc(Array.from(nodes).map((n) => ({ id: n.id, text: n.textContent ?? '', level: n.tagName === 'H2' ? 2 : 3 })));
    }, 60);
    return () => clearTimeout(timer);
  }, [article, slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const start = el.offsetTop;
      const total = el.offsetHeight - window.innerHeight + 200;
      setProgress(Math.min(100, Math.max(0, ((window.scrollY - start + 120) / Math.max(total, 1)) * 100)));

      let current = '';
      for (const item of toc) {
        const node = document.getElementById(item.id);
        if (node && node.getBoundingClientRect().top <= 160) current = item.id;
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [toc]);

  const { prev, next, related, category } = useMemo(() => {
    const idx = articleMeta.findIndex((a) => a.slug === slug);
    return {
      prev: idx > 0 ? articleMeta[idx - 1] : undefined,
      next: idx >= 0 && idx < articleMeta.length - 1 ? articleMeta[idx + 1] : undefined,
      related: articleMeta.filter((a) => a.category === article?.category && a.slug !== slug).slice(0, 3),
      category: getCategory(article?.category ?? ''),
    };
  }, [slug, article]);

  if (!article) {
    return (
      <div className="container section text-center">
        <h1>文章未找到</h1>
        <p className="text-muted">你访问的文章可能尚未发布或链接有误。</p>
        <Link to="/search" className="btn btn-primary">去搜索内容</Link>
      </div>
    );
  }

  const canonicalPath = `/articles/${slug}`;
  const structured = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.summary,
      dateModified: article.updated,
      author: { '@type': 'Organization', name: 'TradeWise 外贸实战学院' },
      publisher: { '@type': 'Organization', name: 'TradeWise 外贸实战学院' },
      mainEntityOfPage: `https://yuxinrun.github.io/tradewise${canonicalPath}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: 'https://yuxinrun.github.io/tradewise/' },
        { '@type': 'ListItem', position: 2, name: category?.title ?? '知识库', item: `https://yuxinrun.github.io/tradewise/${article.category}` },
        { '@type': 'ListItem', position: 3, name: article.title, item: `https://yuxinrun.github.io/tradewise${canonicalPath}` },
      ],
    },
  ];

  const copyCode = (text: string, key: string) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  return (
    <>
      <SEOHead title={article.title} description={article.summary} path={canonicalPath} type="article" published={article.updated} structured={structured} />
      <div className="reading-progress" style={{ width: `${progress}%` }} />

      <div className="container article-layout">
        {/* 左侧知识目录 */}
        <aside className="article-side-left">
          <div className="side-sticky">
            <div className="side-label"><Icon name="book" size={16} /> {category?.title}</div>
            <nav aria-label="分类知识目录">
              {articleMeta.filter((a) => a.category === article.category).map((a) => (
                <Link to={`/articles/${a.slug}`} key={a.slug} className={a.slug === slug ? 'current' : ''}>
                  <span>{a.title}</span>
                  {a.slug === slug && <Icon name="chevronRight" size={14} />}
                </Link>
              ))}
            </nav>
            <Link to={`/${article.category}`} className="side-all">查看完整板块 <Icon name="arrowRight" size={14} /></Link>
          </div>
        </aside>

        {/* 正文 */}
        <article className="article-main" ref={articleRef}>
          <div className="article-breadcrumb">
            <Link to="/">首页</Link><Icon name="chevronRight" size={13} />
            <Link to={`/${article.category}`}>{category?.title}</Link><Icon name="chevronRight" size={13} />
            <span>{article.difficulty}教程</span>
          </div>

          <header className="article-header">
            <div className="article-badges">
              <span className={`badge ${article.difficulty === '实战' ? 'badge-orange' : article.difficulty === '进阶' ? 'badge-navy' : ''}`}>{article.difficulty}</span>
              {article.isCase && <span className="badge badge-orange"><Icon name="tag" size={12} /> {article.caseType}</span>}
            </div>
            <h1>{article.title}</h1>
            <p className="article-summary">{article.summary}</p>
            <div className="article-info">
              <span><Icon name="clock" size={15} /> 预计阅读 {article.readingMinutes} 分钟</span>
              <span><Icon name="calendar" size={15} /> 更新于 {article.updated}</span>
              {article.verified && <span><Icon name="check" size={15} /> 政策核验 {article.verified}</span>}
              <span><Icon name="file" size={15} /> {article.content.length.toLocaleString()} 字符</span>
            </div>
          </header>

          <div className="article-about">
            <div className="about-box">
              <h4><Icon name="users" size={16} /> 适合谁读</h4>
              <p>{article.audience}</p>
            </div>
            <div className="about-box">
              <h4><Icon name="target" size={16} /> 学习目标</h4>
              <ul>{article.goals.map((g) => <li key={g}>{g}</li>)}</ul>
            </div>
          </div>

          {/* 移动端 TOC */}
          <div className="mobile-toc">
            <button onClick={() => setTocOpen(!tocOpen)} aria-expanded={tocOpen}>
              <Icon name="list" size={17} /> 本文目录 <Icon name="chevronDown" size={17} style={{ marginLeft: 'auto', transform: tocOpen ? 'rotate(180deg)' : 'none' }} />
            </button>
            {tocOpen && (
              <div className="mobile-toc-list">
                {toc.map((t) => (
                  <a key={t.id} href={`#${t.id}`} onClick={() => setTocOpen(false)} className={t.level === 3 ? 'indent' : ''}>{t.text}</a>
                ))}
              </div>
            )}
          </div>

          <div className="article-body markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeRaw]}
              components={{
                p({ children, ...props }) {
                  const kids = Children.toArray(children);
                  if (kids.length === 1 && isValidElement(kids[0]) && kids[0].type === 'figure') {
                    return <>{children}</>;
                  }
                  return <p {...props}>{children}</p>;
                },
                pre({ children }) {
                  const text = extractText(children);
                  return (
                    <div className="code-block">
                      <button className="copy-btn" onClick={() => copyCode(text, text.slice(0, 20))}>
                        {copied === text.slice(0, 20) ? <><Icon name="check" size={14} /> 已复制</> : <><Icon name="copy" size={14} /> 复制</>}
                      </button>
                      <pre>{children}</pre>
                    </div>
                  );
                },
                table({ children }) {
                  return <div className="table-scroll"><table>{children}</table></div>;
                },
                img({ src, alt, ...props }) {
                  return <figure><img src={src} alt={alt ?? ''} loading="lazy" {...props} />{alt && <figcaption>{alt}</figcaption>}</figure>;
                },
                a({ href, children, ...props }) {
                  const external = href?.startsWith('http');
                  return <a href={href} {...props} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{children}{external && <Icon name="external" size={12} style={{ marginLeft: 3 }} />}</a>;
                },
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          <div className="article-tags">
            {article.tags.map((t) => <span key={t}><Icon name="tag" size={12} /> {t}</span>)}
          </div>

          <div className="article-disclaimer">
            <Icon name="info" size={17} />
            <p>本文为学习参考资料，不构成法律、税务、投资或其他专业建议。涉及政策、费率、平台规则的内容请以官方最新信息为准；不确定事项请向主管部门或专业机构核实。</p>
          </div>

          <div className="article-nav">
            {prev ? (
              <Link to={`/articles/${prev.slug}`} className="prev"><span>← 上一篇</span><strong>{prev.title}</strong></Link>
            ) : <div />}
            {next ? (
              <Link to={`/articles/${next.slug}`} className="next"><span>下一篇 →</span><strong>{next.title}</strong></Link>
            ) : <div />}
          </div>

          {related.length > 0 && (
            <section className="related-section">
              <h2><Icon name="link" size={19} /> 相关文章推荐</h2>
              <div className="related-grid">
                {related.map((a) => (
                  <Link to={`/articles/${a.slug}`} key={a.slug}>
                    <strong>{a.title}</strong>
                    <p>{a.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {article.relatedTools && article.relatedTools.length > 0 && (
            <section className="related-tools">
              <h2><Icon name="calculator" size={19} /> 配套工具</h2>
              <div>
                {article.relatedTools.map((id) => {
                  const t = getTool(id);
                  return t && <Link to={t.path} key={id} className="btn btn-outline btn-sm"><Icon name={t.icon} size={15} /> {t.name}</Link>;
                })}
              </div>
            </section>
          )}
        </article>

        {/* 右侧目录 */}
        <aside className="article-side-right">
          <div className="side-sticky">
            <div className="toc-title"><Icon name="list" size={16} /> 本文目录</div>
            <nav aria-label="文章目录">
              {toc.map((t) => (
                <a key={t.id} href={`#${t.id}`} className={`${t.level === 3 ? 'indent' : ''} ${activeId === t.id ? 'active' : ''}`} onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth' });
                }}>{t.text}</a>
              ))}
            </nav>
            <div className="toc-progress">
              <div className="toc-progress-bar"><span style={{ width: `${progress}%` }} /></div>
              <span>已阅读 {Math.round(progress)}%</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return '';
}
