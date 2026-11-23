import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Icon from '../components/Icon';
import { cases } from '../data/cases';
import './CasesPage.css';

export default function CasesPage() {
  return (
    <>
      <SEOHead title="外贸案例研究 - 真实场景拆解" description="业务场景拆解与模拟案例，每个案例明确标注实际案例、匿名化案例或模拟教学案例，不虚构企业数据。" path="/cases" />
      <section className="case-hero">
        <div className="container">
          <span className="eyebrow">Case Studies</span>
          <h1>案例研究</h1>
          <p>好的案例能让人看到知识如何在真实业务中发挥作用。本站每个案例都明确标注类型：实际案例、匿名化案例或模拟教学案例。我们不虚构企业名称、订单数据与业务结果。</p>
          <div className="case-labels">
            <span><Icon name="check" size={15} /> 实际案例：经授权或公开来源整理</span>
            <span><Icon name="check" size={15} /> 匿名化案例：隐去可识别信息</span>
            <span><Icon name="check" size={15} /> 模拟教学案例：为教学目的构建</span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="cases-grid">
            {cases.map((c, i) => (
              <article className="case-full-card card" key={c.id}>
                <div className="case-index">{String(i + 1).padStart(2, '0')}</div>
                <div className="case-full-body">
                  <span className={`badge ${c.type === '模拟教学案例' ? 'badge-navy' : 'badge-orange'}`}>{c.type}</span>
                  <h2>{c.title}</h2>
                  <p>{c.summary}</p>
                  <div className="case-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  {c.articleSlug ? (
                    <Link to={`/articles/${c.articleSlug}`} className="btn btn-outline btn-sm">阅读完整拆解 <Icon name="arrowRight" size={15} /></Link>
                  ) : (
                    <span className="case-pending">详细拆解整理中</span>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="case-disclaimer"><Icon name="info" size={18} /><p>案例中的金额、时间与结果均为教学说明服务，不应被理解为对业务收益的承诺或保证。</p></div>
        </div>
      </section>
    </>
  );
}
