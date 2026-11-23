import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Icon from '../components/Icon';
import { categories } from '../data/categories';
import { articleMeta } from '../data/articles';
import { tools } from '../data/tools';
import { cases } from '../data/cases';
import { journey, beginnerPlan } from '../data/learning';
import './Home.css';

const base = import.meta.env.BASE_URL;

const hotSlugs = [
  'google-advanced-search', 'cold-email-writing', 'handle-inquiries',
  'quotation-guide', 'export-profit', 'find-suppliers-1688',
  'shipping-modes', 'amazon-basics', 'linkedin-prospecting',
];

export default function Home() {
  const hotArticles = hotSlugs.map((s) => articleMeta.find((a) => a.slug === s)).filter(Boolean);
  const latest = [...articleMeta].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 6);

  return (
    <>
      <SEOHead
        title="TradeWise 外贸实战学院 - 从中国出发，走向全球市场"
        description="从零基础到独立开展国际贸易，系统掌握外贸与跨境电商的每一个关键环节。十大知识体系、30+ 实战教程、12 个实用工具，全部免费。"
        path="/"
      />

      {/* ========== Hero ========== */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-eyebrow"><span className="pulse-dot" /> 中国外贸与跨境电商实战知识平台</span>
            <h1>从中国出发，<br /><span>走向全球市场。</span></h1>
            <p className="hero-sub">从零基础到独立开展国际贸易，系统掌握外贸与跨境电商的每一个关键环节。</p>
            <div className="hero-cta">
              <Link to="/beginner" className="btn btn-orange btn-lg">开始学习 <Icon name="arrowRight" size={18} /></Link>
              <Link to="/learning" className="btn btn-light btn-lg">探索知识库</Link>
            </div>
            <div className="hero-trust">
              <div><strong>10</strong><span>大知识体系</span></div>
              <div><strong>33+</strong><span>篇实战教程</span></div>
              <div><strong>12</strong><span>个本地工具</span></div>
              <div><strong>100%</strong><span>免费开放</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <img src={`${base}images/hero-trade.svg`} alt="全球贸易网络插画，展示从中国出发连接北美、欧洲、东南亚与中东的国际航线、地球与港口集装箱" width="1000" height="760" />
          </div>
        </div>
        <div className="hero-marquee">
          <div className="container hero-marquee-inner">
            <span>覆盖从选品、供应商、客户开发到报价、物流、收款的完整链路</span>
            <Icon name="arrowRight" size={16} />
            <span>所有内容可通过 Git 持续更新与扩展</span>
          </div>
        </div>
      </section>

      {/* ========== 学习路径 ========== */}
      <section className="section path-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Learning Journey</span>
              <h2 className="section-title">从零基础到独立经营的九步路径</h2>
              <p className="section-lead">外贸不是零散技巧的堆砌，而是一条有先后顺序的能力链路。沿着这条路径走，每一步都知道该学什么、练什么。</p>
            </div>
            <Link to="/learning" className="btn btn-outline">查看完整路径 <Icon name="arrowRight" size={16} /></Link>
          </div>
          <div className="path-track">
            {journey.map((item, i) => (
              <Link to={item.link} key={item.step} className="path-node card card-hover">
                <span className="path-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="path-arrow">{i < journey.length - 1 ? <Icon name="chevronRight" size={16} /> : <Icon name="check" size={16} />}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 十大知识体系 ========== */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Knowledge System</span>
              <h2 className="section-title">十大核心知识体系</h2>
              <p className="section-lead">每个板块都配有分类介绍、学习顺序、入门与进阶文章、实战案例以及相关工具，形成完整的学习闭环。</p>
            </div>
          </div>
          <div className="category-grid">
            {categories.map((cat) => (
              <Link to={`/${cat.slug}`} key={cat.slug} className="category-card card card-hover">
                <div className="cat-icon" style={{ background: `${cat.color}12`, color: cat.color }}>
                  <Icon name={cat.icon} size={26} />
                </div>
                <span className="cat-number">{cat.number}</span>
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <div className="cat-footer">
                  <span>{articleMeta.filter((a) => a.category === cat.slug).length} 篇内容</span>
                  <Icon name="arrowRight" size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 新手入门 30 天 ========== */}
      <section className="section beginner-section">
        <div className="container beginner-grid">
          <div className="beginner-intro">
            <span className="eyebrow">30-Day Starter Plan</span>
            <h2 className="section-title">不知道从哪开始？<br />先走完这 30 天。</h2>
            <p className="section-lead">每天一个明确主题，包含学习任务与动手实践。从认识国际贸易开始，到独立完成一笔模拟订单，把知识变成能力。</p>
            <ul className="beginner-points">
              <li><Icon name="check" size={17} color="var(--teal-600)" /> 每天任务清晰，学完就能动手</li>
              <li><Icon name="check" size={17} color="var(--teal-600)" /> 学习与实战交替，避免只看不练</li>
              <li><Icon name="check" size={17} color="var(--teal-600)" /> 每个任务都有对应的文章或工具</li>
            </ul>
            <Link to="/beginner" className="btn btn-primary btn-lg">查看完整 30 天计划 <Icon name="arrowRight" size={18} /></Link>
          </div>
          <div className="beginner-timeline">
            {beginnerPlan.slice(0, 6).map((d) => (
              <div className="timeline-item" key={d.day}>
                <div className="timeline-day">DAY {String(d.day).padStart(2, '0')}</div>
                <div className="timeline-content">
                  <strong>{d.title}</strong>
                  <p>{d.learn}</p>
                  <span>实践：{d.practice}</span>
                </div>
              </div>
            ))}
            <div className="timeline-more">还有 24 天安排，完整计划 →</div>
          </div>
        </div>
      </section>

      {/* ========== 热门实战教程 ========== */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Popular Tutorials</span>
              <h2 className="section-title">热门实战教程</h2>
              <p className="section-lead">这些是新手最常遇到、也最能直接上手的主题。每一篇都包含操作步骤、常见错误与可复制模板。</p>
            </div>
          </div>
          <div className="hot-grid">
            {hotArticles.map((a) => a && (
              <Link to={`/articles/${a.slug}`} key={a.slug} className="hot-card card card-hover">
                <div className="hot-card-top">
                  <span className={`badge ${a.difficulty === '实战' ? 'badge-orange' : a.difficulty === '进阶' ? 'badge-navy' : ''}`}>{a.difficulty}</span>
                  <span className="hot-time"><Icon name="clock" size={14} /> {a.readingMinutes} 分钟</span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.summary}</p>
                <span className="hot-link">阅读教程 <Icon name="arrowRight" size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 工具中心 ========== */}
      <section className="section tools-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Practical Tools</span>
              <h2 className="section-title">把知识变成生产力的工具</h2>
              <p className="section-lead">全部在浏览器本地运行，不需要注册、不上传数据、不依赖后端。打开就能算，算完就能用。</p>
            </div>
            <Link to="/tools" className="btn btn-outline">打开工具中心 <Icon name="arrowRight" size={16} /></Link>
          </div>
          <div className="tool-grid">
            {tools.slice(0, 8).map((tool) => (
              <Link to={tool.path} key={tool.id} className="tool-card card card-hover">
                <div className="tool-icon"><Icon name={tool.icon} size={24} color="var(--teal-600)" /></div>
                <div>
                  <h3>{tool.name}</h3>
                  <p>{tool.description}</p>
                </div>
                <Icon name="arrowRight" size={16} className="tool-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 案例研究 ========== */}
      <section className="section section-navy">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow" style={{ color: '#6fd0cb' }}>Case Studies</span>
              <h2 className="section-title">真实场景拆解</h2>
              <p className="section-lead" style={{ color: 'rgba(255,255,255,.65)' }}>每个案例都明确标注类型：实际案例、匿名化案例或模拟教学案例。不虚构企业数据，不夸大结果。</p>
            </div>
            <Link to="/cases" className="btn btn-light">查看全部案例 <Icon name="arrowRight" size={16} /></Link>
          </div>
          <div className="case-grid">
            {cases.slice(0, 3).map((c) => (
              <div className="case-card" key={c.id}>
                <div className="case-type"><Icon name="tag" size={14} /> {c.type}</div>
                <h3>{c.title}</h3>
                <p>{c.summary}</p>
                <div className="case-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
                {c.articleSlug && <Link to={`/articles/${c.articleSlug}`}>阅读完整拆解 <Icon name="arrowRight" size={14} /></Link>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 最新文章 ========== */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Latest Articles</span>
              <h2 className="section-title">最新更新</h2>
              <p className="section-lead">所有教程都标注内容更新时间与核验时间，时效性较强的政策信息会提示读者二次核实。</p>
            </div>
            <Link to="/search" className="btn btn-outline">浏览全部内容 <Icon name="arrowRight" size={16} /></Link>
          </div>
          <div className="latest-list">
            {latest.map((a) => (
              <Link to={`/articles/${a.slug}`} key={a.slug} className="latest-row">
                <div className="latest-date">{a.updated.slice(5).replace('-', '/')}</div>
                <div className="latest-main">
                  <h3>{a.title}</h3>
                  <p>{a.summary}</p>
                </div>
                <div className="latest-meta">
                  <span className="badge badge-gray">{categories.find((c) => c.slug === a.category)?.shortTitle}</span>
                  <span className="hot-time">{a.readingMinutes} 分钟</span>
                </div>
                <Icon name="chevronRight" size={18} className="latest-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 底部 CTA ========== */}
      <section className="bottom-cta">
        <div className="container bottom-cta-inner">
          <div>
            <h2>你的全球生意，从今天就开始。</h2>
            <p>不需要昂贵课程，不需要付费工具。打开网站，按照路径一步步学、一步步做。</p>
          </div>
          <Link to="/beginner" className="btn btn-orange btn-lg">开启 30 天入门计划 <Icon name="arrowRight" size={18} /></Link>
        </div>
      </section>
    </>
  );
}
