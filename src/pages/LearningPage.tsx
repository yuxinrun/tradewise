import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Icon from '../components/Icon';
import { journey } from '../data/learning';
import { categories } from '../data/categories';
import { articlesByCategory } from '../data/articles';
import './LearningPage.css';

const base = import.meta.env.BASE_URL;

const stepDetails = [
  '先弄清楚外贸是什么、钱从哪里来、货怎么出去。理解全貌后再深入细节，事半功倍。',
  '不是所有产品都适合出口。从市场需求、供应链能力、竞争格局、合规要求和利润空间五个维度筛选。',
  '用公开数据和搜索工具判断一个国家的需求规模、增长趋势、竞争强度和进入门槛。',
  '用 Google、LinkedIn、地图、展会和 B2B 平台找到真实买家，并学会验证与分级。',
  '快速响应询盘、确认关键信息、设计有竞争力的报价方案，是转化的关键。',
  '把谈判结果落到书面合同与单证上，明确责任边界，推动订单按期交付。',
  '根据货量、时效和成本选择运输方式，正确理解 Incoterms，完成报关与单证。',
  '选择合适收款方式，遵守合规要求，识别汇率与坏账风险，算清每笔订单的真实利润。',
  '维护老客户、建立品牌、优化流程，让业务从偶然成交变成稳定增长。',
];

export default function LearningPage() {
  return (
    <>
      <SEOHead title="外贸学习路径 - 从零基础到独立经营" description="一条经过设计的九步学习路径，带你从认知外贸一步步走到业务增长，每一步都有对应的知识板块、文章与工具。" path="/learning" />
      <section className="learn-hero">
        <div className="container">
          <span className="eyebrow">Structured Learning Path</span>
          <h1>一条清晰的外贸学习路径</h1>
          <p>外贸知识体系庞杂，新手最容易的问题是「不知道下一步该学什么」。这条路径把完整能力拆解为九个阶段，按顺序推进，每一步都有明确目标、推荐文章和配套工具。</p>
          <div className="learn-hero-stats">
            <span><strong>9</strong> 个能力阶段</span>
            <span><strong>10</strong> 大知识板块</span>
            <span><strong>30</strong> 天入门计划</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <img src={`${base}images/learning-path.svg`} alt="外贸学习路径示意图：九个阶段依次连接，从认知外贸到业务增长" className="learn-diagram" loading="lazy" />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          {journey.map((item, i) => {
            const cat = categories.find((c) => c.title.includes(item.title) || item.link === `/${c.slug}`);
            const articles = cat ? articlesByCategory(cat.slug).slice(0, 3) : [];
            return (
              <div className={`journey-row ${i % 2 ? 'reverse' : ''}`} key={item.step}>
                <div className="journey-num">{item.step}</div>
                <div className="journey-content">
                  <h2>{item.title}</h2>
                  <p className="journey-desc">{stepDetails[i]}</p>
                  <p className="journey-tip"><Icon name="lightbulb" size={15} /> {item.desc}</p>
                  {articles.length > 0 && (
                    <div className="journey-articles">
                      <span>推荐阅读：</span>
                      {articles.map((a) => <Link to={`/articles/${a.slug}`} key={a.slug}>{a.title} <Icon name="arrowRight" size={13} /></Link>)}
                    </div>
                  )}
                  <Link to={item.link} className="btn btn-outline btn-sm">进入对应板块</Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="container learn-cta">
          <h2>准备好了吗？从第一天开始</h2>
          <p>如果你完全零基础，建议直接打开 30 天入门计划，每天照着做一件事。</p>
          <Link to="/beginner" className="btn btn-primary btn-lg">打开 30 天入门计划 <Icon name="arrowRight" size={18} /></Link>
        </div>
      </section>
    </>
  );
}
