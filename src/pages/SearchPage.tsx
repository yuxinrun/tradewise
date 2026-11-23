import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Icon from '../components/Icon';
import { getAllArticles, stripMarkdown } from '../utils/content';
import { categories } from '../data/categories';
import { tools } from '../data/tools';
import { templates } from '../data/templates';
import './SearchPage.css';

const suggestions = ['Incoterms', '开发信', '询盘', '供应商', '报价单', '报关', '利润', 'Amazon', '独立站', 'SOHO'];

function Highlight({ text, keyword }: { text: string; keyword: string }) {
  if (!keyword.trim()) return <>{text}</>;
  const escaped = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'ig'));
  return <>{parts.map((p, i) => p.toLowerCase() === keyword.trim().toLowerCase() ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>)}</>;
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const [input, setInput] = useState(q);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setInput(q), [q]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return { articles: [], cats: [], tools: [], templates: [] };
    const match = (s: string) => s.toLowerCase().includes(kw);
    const articles = getAllArticles().filter((a) => match(a.title) || match(a.summary) || match(a.tags.join(' ')) || match(stripMarkdown(a.content))).slice(0, 30);
    const cats = categories.filter((c) => match(c.title) || match(c.description));
    const foundTools = tools.filter((t) => match(t.name) || match(t.description));
    const foundTemplates = templates.filter((t) => match(t.name) || match(t.description) || match(t.scenario));
    return { articles, cats, tools: foundTools, templates: foundTemplates };
  }, [q]);

  const total = results.articles.length + results.cats.length + results.tools.length + results.templates.length;
  const submit = (e: React.FormEvent) => { e.preventDefault(); setParams(input.trim() ? { q: input.trim() } : {}); };

  return (
    <>
      <SEOHead title="全站搜索 - 查找文章、分类、工具与模板" description="在本地索引中搜索 TradeWise 的全部文章标题、摘要、正文、知识分类、工具与模板，无需外部搜索服务。" path="/search" />
      <section className="search-hero">
        <div className="container">
          <span className="eyebrow">Search TradeWise</span>
          <h1>搜索知识库</h1>
          <form onSubmit={submit} className="search-big">
            <Icon name="search" size={21} color="var(--gray-500)" />
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入关键词，按 / 快速聚焦…" aria-label="搜索关键词" />
            <button type="submit" className="btn btn-primary">搜索</button>
          </form>
          <div className="search-suggest">
            <span>试试：</span>
            {suggestions.map((s) => <button key={s} onClick={() => setParams({ q: s })}>{s}</button>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!q ? (
            <div className="search-empty">
              <Icon name="compass" size={44} color="var(--gray-300)" />
              <h2>你想找什么？</h2>
              <p>搜索会同时匹配文章标题、摘要、正文、知识分类、工具与模板。所有索引都在本地构建，不依赖外部服务。</p>
            </div>
          ) : total === 0 ? (
            <div className="search-empty">
              <Icon name="search" size={44} color="var(--gray-300)" />
              <h2>没有找到与「{q}」相关的内容</h2>
              <p>试试更短的关键词，或从上方推荐词中选择一个。</p>
            </div>
          ) : (
            <>
              <p className="search-count">找到 <strong>{total}</strong> 条与「<Highlight text={q} keyword={q} />」相关的结果</p>

              {results.articles.length > 0 && (
                <div className="result-group">
                  <h2><Icon name="book" size={19} /> 文章教程 <span>{results.articles.length}</span></h2>
                  {results.articles.map((a) => (
                    <Link to={`/articles/${a.slug}`} key={a.slug} className="search-result">
                      <span className="badge badge-gray">{categories.find((c) => c.slug === a.category)?.shortTitle}</span>
                      <div>
                        <h3><Highlight text={a.title} keyword={q} /></h3>
                        <p><Highlight text={a.summary} keyword={q} /></p>
                        <div className="result-tags">{a.tags.map((t) => <span key={t}>#{t}</span>)}</div>
                      </div>
                      <Icon name="chevronRight" size={18} />
                    </Link>
                  ))}
                </div>
              )}

              {results.cats.length > 0 && (
                <div className="result-group">
                  <h2><Icon name="compass" size={19} /> 知识分类 <span>{results.cats.length}</span></h2>
                  <div className="mini-grid">
                    {results.cats.map((c) => (
                      <Link to={`/${c.slug}`} key={c.slug} className="card card-hover mini-card">
                        <div className="cat-icon" style={{ background: `${c.color}12`, color: c.color }}><Icon name={c.icon} size={22} /></div>
                        <div><h3><Highlight text={c.title} keyword={q} /></h3><p><Highlight text={c.description} keyword={q} /></p></div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.tools.length > 0 && (
                <div className="result-group">
                  <h2><Icon name="calculator" size={19} /> 实用工具 <span>{results.tools.length}</span></h2>
                  <div className="mini-grid">
                    {results.tools.map((t) => (
                      <Link to={t.path} key={t.id} className="card card-hover mini-card">
                        <div className="cat-icon" style={{ background: 'var(--teal-100)', color: 'var(--teal-600)' }}><Icon name={t.icon} size={22} /></div>
                        <div><h3><Highlight text={t.name} keyword={q} /></h3><p><Highlight text={t.description} keyword={q} /></p></div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.templates.length > 0 && (
                <div className="result-group">
                  <h2><Icon name="download" size={19} /> 模板资源 <span>{results.templates.length}</span></h2>
                  <div className="mini-grid">
                    {results.templates.map((t) => (
                      <Link to="/templates" key={t.id} className="card card-hover mini-card">
                        <div className="cat-icon" style={{ background: 'var(--orange-100)', color: 'var(--orange-600)' }}><Icon name="file" size={22} /></div>
                        <div><h3><Highlight text={t.name} keyword={q} /></h3><p><Highlight text={t.description} keyword={q} /></p></div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
