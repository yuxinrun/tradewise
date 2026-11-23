import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import Icon from '../components/Icon';
import { templates } from '../data/templates';
import './TemplatesPage.css';

export default function TemplatesPage() {
  const [filter, setFilter] = useState('全部');
  const groups = ['全部', ...Array.from(new Set(templates.map((t) => t.category)))];
  const shown = templates.filter((t) => filter === '全部' || t.category === filter);

  return (
    <>
      <SEOHead title="外贸模板下载中心 - 可编辑的业务文档模板" description="开发信、询盘回复、报价单、PI、商业发票、装箱单、客户信息表、供应商评估表等可下载模板，优先提供 Markdown、CSV 与 HTML 格式。" path="/templates" />
      <section className="tpl-hero">
        <div className="container">
          <span className="eyebrow">Templates & Resources</span>
          <h1>模板与资源下载中心</h1>
          <p>所有模板均可直接下载使用。优先提供 Markdown、CSV 与 HTML 等轻量格式，无需专用软件。每个模板都标注适用场景、填写说明与注意事项。</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="phase-filters">
            {groups.map((g) => <button key={g} className={filter === g ? 'active' : ''} onClick={() => setFilter(g)}>{g}</button>)}
          </div>
          <div className="tpl-grid">
            {shown.map((t) => (
              <div className="tpl-card card" key={t.id}>
                <div className="tpl-card-head">
                  <span className="badge badge-navy">{t.format}</span>
                  <span className="tpl-category">{t.category}</span>
                </div>
                <h3>{t.name}</h3>
                <p>{t.description}</p>
                <div className="tpl-meta">
                  <div><strong>适用场景</strong><span>{t.scenario}</span></div>
                  <div><strong>填写说明</strong><span>{t.instructions}</span></div>
                  <div className="caution"><strong>注意事项</strong><span>{t.caution}</span></div>
                </div>
                <a href={t.file} download className="btn btn-primary btn-sm"><Icon name="download" size={15} /> 下载模板</a>
              </div>
            ))}
          </div>
          <div className="tpl-note">
            <Icon name="info" size={18} />
            <p>模板中的条款与字段仅为业务参考，不构成法律文件。涉及重大交易、税务申报或清关事务时，请结合实际情况并由专业机构审核。</p>
          </div>
        </div>
      </section>
    </>
  );
}
