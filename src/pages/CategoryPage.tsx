import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Icon from '../components/Icon';
import { getCategory } from '../data/categories';
import { articlesByCategory, getArticleMeta } from '../data/articles';
import { getTool } from '../data/tools';
import { templates } from '../data/templates';
import { cases } from '../data/cases';
import './CategoryPage.css';

export default function CategoryPage({ slug }: { slug: string }) {
  const cat = getCategory(slug);
  if (!cat) return <div className="container section">分类不存在</div>;

  const articles = articlesByCategory(slug);
  const beginner = articles.filter((a) => a.difficulty === '入门');
  const advanced = articles.filter((a) => a.difficulty === '进阶');
  const practical = articles.filter((a) => a.difficulty === '实战');
  const relatedTools = cat.featuredTools.map(getTool).filter(Boolean);
  const relatedTemplates = templates.filter((t) => cat.title.includes(t.category.slice(0, 2)) || t.category === '客户开发' && slug === 'marketing').slice(0, 4);
  const relatedCases = cases.filter((c) => c.tags.some((t) => cat.title.includes(t.slice(0, 2)))).slice(0, 2);

  return (
    <>
      <SEOHead
        title={`${cat.title} - 外贸实战知识板块`}
        description={cat.description}
        path={`/${slug}`}
      />

      <section className="cat-hero" style={{ background: `linear-gradient(120deg, ${cat.color} 0%, #0b2a4a 100%)` }}>
        <div className="container cat-hero-inner">
          <div>
            <span className="cat-hero-label">知识体系 {cat.number} / 10</span>
            <h1>{cat.title}</h1>
            <p>{cat.description}</p>
            <div className="cat-hero-actions">
              <Link to={`/articles/${cat.readingOrder[0]}`} className="btn btn-orange">从入门文章开始 <Icon name="arrowRight" size={17} /></Link>
              <Link to="/learning" className="btn btn-light">查看学习路径</Link>
            </div>
          </div>
          <div className="cat-hero-icon"><Icon name={cat.icon} size={110} color="rgba(255,255,255,.18)" /></div>
        </div>
      </section>

      <div className="container cat-layout">
        <div className="cat-main">
          <section className="cat-block section-sm">
            <h2><Icon name="target" size={22} /> 学完这个板块，你将能够</h2>
            <div className="goal-grid">
              {cat.learningGoals.map((g, i) => (
                <div className="goal-item" key={g}>
                  <span>{i + 1}</span><p>{g}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="cat-block section-sm">
            <h2><Icon name="route" size={22} /> 建议学习顺序</h2>
            <div className="order-list">
              {cat.readingOrder.map((s, i) => {
                const a = getArticleMeta(s);
                if (!a) return null;
                return (
                  <Link to={`/articles/${s}`} key={s} className="order-item">
                    <span className="order-num">{i + 1}</span>
                    <div><strong>{a.title}</strong><p>{a.summary}</p></div>
                    <Icon name="chevronRight" size={18} />
                  </Link>
                );
              })}
            </div>
          </section>

          {beginner.length > 0 && <ArticleGroup title="入门文章" icon="book" items={beginner} />}
          {advanced.length > 0 && <ArticleGroup title="进阶文章" icon="chart" items={advanced} />}
          {practical.length > 0 && <ArticleGroup title="实战案例" icon="target" items={practical} />}

          <section className="cat-block section-sm">
            <h2><Icon name="file" size={22} /> 全部目录（{articles.length} 篇）</h2>
            <div className="all-list">
              {articles.map((a, i) => (
                <Link to={`/articles/${a.slug}`} key={a.slug}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <strong>{a.title}</strong>
                  <em>{a.difficulty}</em>
                  <Icon name="arrowRight" size={15} />
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="cat-side">
          <div className="side-card">
            <h3><Icon name="lightbulb" size={18} /> 板块提示</h3>
            <p>建议按学习顺序阅读，每读完一篇就完成对应的练习任务。知识只有用过才是自己的。</p>
          </div>
          {relatedTools.length > 0 && (
            <div className="side-card">
              <h3><Icon name="calculator" size={18} /> 相关工具</h3>
              {relatedTools.map((t) => t && (
                <Link to={t.path} key={t.id} className="side-link">
                  <Icon name={t.icon} size={17} /> {t.name}
                </Link>
              ))}
            </div>
          )}
          {relatedTemplates.length > 0 && (
            <div className="side-card">
              <h3><Icon name="download" size={18} /> 相关模板</h3>
              {relatedTemplates.map((t) => (
                <Link to="/templates" key={t.id} className="side-link"><Icon name="file" size={17} /> {t.name}</Link>
              ))}
            </div>
          )}
          {relatedCases.length > 0 && (
            <div className="side-card">
              <h3><Icon name="flag" size={18} /> 相关案例</h3>
              {relatedCases.map((c) => (
                <Link to={c.articleSlug ? `/articles/${c.articleSlug}` : '/cases'} key={c.id} className="side-link">
                  <Icon name="book" size={17} /> {c.title}
                </Link>
              ))}
            </div>
          )}
          <div className="side-card side-nav-card">
            <h3><Icon name="compass" size={18} /> 其他板块</h3>
            <Link to="/trade">01 外贸基础认知</Link>
            <Link to="/sourcing">02 产品选择与供应链</Link>
            <Link to="/marketing">03 海外市场与客户开发</Link>
            <Link to="/business">04 外贸业务实战</Link>
            <Link to="/logistics">05 国际物流与出口操作</Link>
            <Link to="/payment">06 外贸收款与财务</Link>
            <Link to="/ecommerce">07 跨境电商平台</Link>
            <Link to="/independent-store">08 独立站与海外营销</Link>
            <Link to="/compliance">09 合规与风险管理</Link>
            <Link to="/startup">10 创业与商业增长</Link>
          </div>
        </aside>
      </div>
    </>
  );
}

function ArticleGroup({ title, icon, items }: { title: string; icon: string; items: ReturnType<typeof articlesByCategory> }) {
  return (
    <section className="cat-block section-sm">
      <h2><Icon name={icon} size={22} /> {title}</h2>
      <div className="article-group-grid">
        {items.map((a) => (
          <Link to={`/articles/${a.slug}`} key={a.slug} className="card card-hover group-card">
            <span className={`badge ${a.difficulty === '实战' ? 'badge-orange' : a.difficulty === '进阶' ? 'badge-navy' : ''}`}>{a.difficulty}</span>
            <h3>{a.title}</h3>
            <p>{a.summary}</p>
            <span className="group-meta"><Icon name="clock" size={13} /> {a.readingMinutes} 分钟 · 更新 {a.updated}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
