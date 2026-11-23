import { Link } from 'react-router-dom';
import Icon from './Icon';
import { categories } from '../data/categories';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-mark"><Icon name="globe" size={20} color="#fff" /></span>
              <span>TradeWise</span>
            </div>
            <p>Learn Trade. Build Business. Go Global.</p>
            <p className="footer-cn">从中国出发，走向全球市场。</p>
            <p className="footer-note">中国外贸与跨境电商实战知识平台。所有内容以学习参考为目的，不构成法律、税务或投资建议。</p>
          </div>
          <div className="footer-col">
            <h4>知识板块</h4>
            {categories.slice(0, 5).map((c) => (
              <Link key={c.slug} to={`/${c.slug}`}>{c.title}</Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>更多板块</h4>
            {categories.slice(5).map((c) => (
              <Link key={c.slug} to={`/${c.slug}`}>{c.title}</Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>站点资源</h4>
            <Link to="/learning">学习路径</Link>
            <Link to="/tools">工具中心</Link>
            <Link to="/templates">模板下载</Link>
            <Link to="/cases">案例研究</Link>
            <Link to="/about">关于我们</Link>
            <Link to="/search">全站搜索</Link>
          </div>
          <div className="footer-col">
            <h4>声明与联系</h4>
            <Link to="/about#disclaimer">免责声明</Link>
            <Link to="/about#updates">内容更新说明</Link>
            <a href="https://github.com/yuxinrun/tradewise" target="_blank" rel="noreferrer">
              GitHub 项目 <Icon name="external" size={13} />
            </a>
            <a href="mailto:hello@tradewise.example">内容反馈邮箱</a>
            <span className="footer-small">最后核验：2026-11-21</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} TradeWise 外贸实战学院 · 内容采用 CC BY-NC-SA 4.0 授权</span>
          <span>本站为静态知识站，不收集用户数据，不依赖后端服务。</span>
        </div>
      </div>
    </footer>
  );
}
