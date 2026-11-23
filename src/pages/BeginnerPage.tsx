import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Icon from '../components/Icon';
import { beginnerPlan } from '../data/learning';
import './BeginnerPage.css';

const STORAGE_KEY = 'tradewise-beginner-progress';

export default function BeginnerPage() {
  const [done, setDone] = useState<number[]>([]);
  const [filter, setFilter] = useState('全部');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch { /* 忽略本地存储不可用 */ }
  }, []);

  const toggle = (day: number) => {
    const next = done.includes(day) ? done.filter((d) => d !== day) : [...done, day];
    setDone(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* 忽略 */ }
  };

  const phases = ['全部', '认知建立', '产品选择', '市场研究', '客户开发', '业务实战', '物流收款', '拓展视野', '综合实战'];
  const shown = beginnerPlan.filter((d) => filter === '全部' || d.phase === filter);
  const percent = Math.round((done.length / beginnerPlan.length) * 100);

  return (
    <>
      <SEOHead title="外贸零基础入门 - 30 天学习计划" description="每天一个明确主题，包含学习任务与动手实践。从认识国际贸易到独立完成一笔模拟订单，零基础也能一步步建立外贸能力。" path="/beginner" />
      <section className="begin-hero">
        <div className="container">
          <span className="eyebrow">30-Day Beginner Plan</span>
          <h1>外贸零基础入门：30 天从零到会</h1>
          <p>不需要一开始就懂所有术语。每天花一点时间，学一个知识点，完成一个小任务。30 天后，你会对出口业务有完整的认知，并亲手做过关键动作。</p>
          <div className="begin-progress-card">
            <div>
              <span>你的学习进度</span>
              <strong>{done.length} / {beginnerPlan.length} 天</strong>
            </div>
            <div className="begin-progress-bar"><span style={{ width: `${percent}%` }} /></div>
            <p>勾选完成的任务会自动保存在当前浏览器中，不会上传。</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="phase-filters">
            {phases.map((p) => (
              <button key={p} onClick={() => setFilter(p)} className={filter === p ? 'active' : ''}>{p}</button>
            ))}
          </div>
          <div className="day-grid">
            {shown.map((d) => {
              const isDone = done.includes(d.day);
              return (
                <div className={`day-card card ${isDone ? 'done' : ''}`} key={d.day}>
                  <div className="day-head">
                    <button className="day-check" onClick={() => toggle(d.day)} aria-label={`标记第 ${d.day} 天完成`}>
                      {isDone && <Icon name="check" size={15} color="#fff" />}
                    </button>
                    <span className="day-num">DAY {String(d.day).padStart(2, '0')}</span>
                    <span className="day-phase">{d.phase}</span>
                  </div>
                  <h3>{d.title}</h3>
                  <div className="day-task">
                    <span><Icon name="book" size={14} /> 学习</span>
                    <p>{d.learn}</p>
                  </div>
                  <div className="day-task practice">
                    <span><Icon name="target" size={14} /> 实践</span>
                    <p>{d.practice}</p>
                  </div>
                  {d.link && <Link to={d.link} className="day-link">打开对应内容 <Icon name="arrowRight" size={14} /></Link>}
                </div>
              );
            })}
          </div>
          <div className="begin-note">
            <Icon name="info" size={18} />
            <p><strong>关于这份计划：</strong>这是一个建议节奏，不是硬性规定。你可以按自己的时间调整。重要的是每天都有可验证的产出，而不是只阅读不行动。涉及政策与平台规则的内容请核对官方最新信息。</p>
          </div>
        </div>
      </section>
    </>
  );
}
