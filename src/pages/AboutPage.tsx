import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Icon from '../components/Icon';
import './AboutPage.css';

export default function AboutPage() {
  return (
    <>
      <SEOHead title="关于我们 - TradeWise 外贸实战学院" description="了解 TradeWise 的定位、内容原则、更新机制与免责声明。网站内容全部为学习参考资料，不构成专业建议。" path="/about" />
      <section className="about-hero">
        <div className="container">
          <span className="eyebrow">About TradeWise</span>
          <h1>关于 TradeWise</h1>
          <p>Learn Trade. Build Business. Go Global. 从中国出发，走向全球市场。</p>
        </div>
      </section>
      <section className="section">
        <div className="container about-grid">
          <article className="about-main">
            <h2>我们为什么做这个网站</h2>
            <p>外贸知识在互联网上并不稀缺，但对零基础的学习者来说，信息往往碎片化、过时、彼此矛盾，甚至夹杂着营销目的。TradeWise 的目标是把分散的知识整理成一条可学习、可实践的路径，让一个完全没有经验的中国新手，也能按部就班地理解并开展国际贸易业务。</p>
            <p>我们不接受「只讲概念不讲操作」的内容，也不接受「只给结论不给依据」的说法。每篇教程都尽量回答同一个问题：一个新手明天上班，具体该做什么。</p>

            <h2 id="principles">内容原则</h2>
            <div className="principle-grid">
              <div className="card"><Icon name="check" size={20} color="var(--teal-600)" /><h3>有依据</h3><p>Incoterms 以 ICC 规则为准，政策以官方发布为准，平台规则标注官方来源与核验日期。</p></div>
              <div className="card"><Icon name="check" size={20} color="var(--teal-600)" /><h3>可操作</h3><p>给出步骤、模板、常见错误与风险提示，而不只是概念解释。</p></div>
              <div className="card"><Icon name="check" size={20} color="var(--teal-600)" /><h3>不编造</h3><p>不虚构企业数据，不编造收费标准，不夸大收益结果。案例标明类型与来源性质。</p></div>
              <div className="card"><Icon name="check" size={20} color="var(--teal-600)" /><h3>分清楚</h3><p>明确区分法律规定、行业惯例与个人经验建议，避免把经验当规则。</p></div>
            </div>

            <h2 id="updates">内容更新说明</h2>
            <p>每篇文章都标注「内容更新时间」。对时效性较强的内容（如贸易术语、海关与税务政策、跨境平台规则），额外标注「最后核验时间」。核验只代表我们在该日期核对过相关官方信息，不代表信息此后不会变化。</p>
            <p>发现内容过时或有误时，欢迎通过 GitHub Issues 反馈。我们会核实后更新文章，并在更新记录中说明。</p>

            <h2 id="disclaimer">免责声明</h2>
            <div className="disclaimer-box">
              <p><strong>1. 学习参考性质。</strong>本站全部内容仅用于学习与知识参考，不构成法律、税务、财务、投资或商业决策建议。</p>
              <p><strong>2. 政策与规则。</strong>出口退税、海关申报、外汇管理、产品认证及跨境平台规则可能随时间与地区变化。读者在决策前应向海关、税务、外汇管理部门、平台官方或专业机构核实最新要求。</p>
              <p><strong>3. 案例说明。</strong>本站案例分为实际案例、匿名化案例和模拟教学案例。模拟案例中的企业名称、金额与结果均为教学设计，不对应真实主体，不构成收益承诺。</p>
              <p><strong>4. 工具测算。</strong>工具中的汇率、费率与参数均由用户自行输入，计算结果仅供内部测算，不替代银行成交价、货代正式报价或专业财务核算。</p>
              <p><strong>5. 第三方链接。</strong>本站提供的官方网站导航仅为便利，本站不控制这些网站的内容，也不对其准确性负责。</p>
            </div>

            <h2 id="contact">内容反馈与联系</h2>
            <p>本项目完全开源，内容以 Git 方式管理。如果你发现错别字、过时信息、链接失效，或希望补充某个主题，欢迎通过以下方式参与：</p>
            <div className="contact-links">
              <a href="https://github.com/yuxinrun/tradewise" target="_blank" rel="noreferrer" className="btn btn-primary"><Icon name="link" size={16} /> GitHub 项目主页</a>
              <a href="https://github.com/yuxinrun/tradewise/issues" target="_blank" rel="noreferrer" className="btn btn-outline"><Icon name="message" size={16} /> 提交 Issue</a>
            </div>
          </article>

          <aside className="about-side">
            <div className="side-card">
              <h3><Icon name="compass" size={18} /> 快速导航</h3>
              <Link to="/beginner">30 天入门计划</Link>
              <Link to="/learning">完整学习路径</Link>
              <Link to="/tools">工具中心</Link>
              <Link to="/templates">模板下载</Link>
              <Link to="/cases">案例研究</Link>
            </div>
            <div className="side-card">
              <h3><Icon name="shield" size={18} /> 数据隐私</h3>
              <p>本站是纯静态网站，不设后端服务，不收集用户数据。学习进度与工具输入只保存在你的浏览器本地。</p>
            </div>
            <div className="side-card">
              <h3><Icon name="calendar" size={18} /> 最后核验</h3>
              <p>全站内容最后集中核验：2026-11-21。单篇文章的具体核验日期见文章页顶部标识。</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
