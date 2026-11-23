import { Link, useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Icon from '../components/Icon';
import { tools, getTool } from '../data/tools';
import ToolRenderer from '../tools/ToolRenderer';
import './ToolsPage.css';

export default function ToolsPage() {
  const { toolId } = useParams();
  const tool = toolId ? getTool(toolId) : undefined;

  if (toolId && !tool) {
    return <div className="container section text-center"><h1>工具未找到</h1><Link to="/tools" className="btn btn-primary">返回工具中心</Link></div>;
  }

  if (tool) {
    return (
      <>
        <SEOHead title={`${tool.name} - 在线工具`} description={tool.description} path={`/tools/${tool.id}`} />
        <div className="tool-detail">
          <div className="container">
            <div className="tool-detail-head">
              <Link to="/tools" className="tool-back"><Icon name="arrowRight" size={15} style={{ transform: 'rotate(180deg)' }} /> 返回工具中心</Link>
              <div className="tool-detail-title">
                <div className="tool-detail-icon"><Icon name={tool.icon} size={28} color="var(--teal-600)" /></div>
                <div>
                  <span className="badge badge-gray">{tool.category}</span>
                  <h1>{tool.name}</h1>
                  <p>{tool.description}</p>
                </div>
              </div>
            </div>
            <ToolRenderer id={tool.id} />
            <div className="tool-privacy"><Icon name="shield" size={17} /> 本工具全部计算在你的浏览器本地完成，不上传任何数据，不需要注册账号。</div>
          </div>
        </div>
      </>
    );
  }

  const groups = Array.from(new Set(tools.map((t) => t.category)));

  return (
    <>
      <SEOHead title="外贸工具中心 - 12 个本地可交互的实用工具" description="外贸利润计算器、汇率换算、FOB 成本核算、CBM 计算器、集装箱装载估算、报价单生成、开发信模板、Incoterms 速查等，全部在浏览器本地运行。" path="/tools" />
      <section className="tools-hero">
        <div className="container">
          <span className="eyebrow">Toolbox</span>
          <h1>外贸工具中心</h1>
          <p>12 个真正可交互的实用工具，全部在浏览器本地计算。打开即用，无需注册，不收集数据，不依赖任何后端服务。</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {groups.map((group) => (
            <div className="tool-group" key={group}>
              <h2><Icon name="calculator" size={20} /> {group}</h2>
              <div className="tool-group-grid">
                {tools.filter((t) => t.category === group).map((t) => (
                  <Link to={t.path} key={t.id} className="card card-hover tool-group-card">
                    <div className="tool-group-icon"><Icon name={t.icon} size={24} color="var(--teal-600)" /></div>
                    <h3>{t.name}</h3>
                    <p>{t.description}</p>
                    <span>打开工具 <Icon name="arrowRight" size={15} /></span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="tools-note">
            <Icon name="info" size={18} />
            <p>工具中的汇率、费率与政策参数均为可手动输入的测算值，请以银行实际成交价、货代正式报价与主管部门最新规定为准。</p>
          </div>
        </div>
      </section>
    </>
  );
}
