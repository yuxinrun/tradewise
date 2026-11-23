import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Icon from '../components/Icon';

export default function NotFound() {
  return (
    <>
      <SEOHead title="页面未找到 404" description="你访问的页面不存在或已被移动。" path="/404" />
      <div className="container section text-center" style={{ padding: '120px 24px' }}>
        <div style={{ fontSize: 100, fontWeight: 800, color: 'var(--navy-100)', lineHeight: 1 }}>404</div>
        <h1 style={{ fontSize: 28, marginTop: 16 }}>这个页面走丢了</h1>
        <p className="text-muted" style={{ marginBottom: 28 }}>可能是链接输入有误，或者内容已经调整。没关系，从首页重新开始。</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary"><Icon name="compass" size={16} /> 返回首页</Link>
          <Link to="/search" className="btn btn-outline"><Icon name="search" size={16} /> 搜索内容</Link>
        </div>
      </div>
    </>
  );
}
