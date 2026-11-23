import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';
import './Header.css';

interface NavItem {
  label: string;
  to: string;
  children?: { label: string; to: string; desc: string }[];
}

const navItems: NavItem[] = [
  { label: '首页', to: '/' },
  {
    label: '外贸入门',
    to: '/beginner',
    children: [
      { label: '30 天入门路线', to: '/beginner', desc: '零基础每天该学什么、做什么' },
      { label: '完整学习路径', to: '/learning', desc: '从认知外贸到业务增长的九步' },
      { label: '外贸基础认知', to: '/trade', desc: '建立对国际贸易的整体认知' },
      { label: '产品与供应链', to: '/sourcing', desc: '选品、寻找与评估供应商' },
    ],
  },
  {
    label: '客户开发',
    to: '/marketing',
    children: [
      { label: '海外市场与客户开发', to: '/marketing', desc: 'Google、LinkedIn、海关数据等方法' },
      { label: '外贸业务实战', to: '/business', desc: '开发信、询盘、报价与订单' },
    ],
  },
  {
    label: '业务实战',
    to: '/business',
    children: [
      { label: '国际物流', to: '/logistics', desc: '运输方式、Incoterms 与报关' },
      { label: '收款与财务', to: '/payment', desc: '结算方式、汇率与利润核算' },
      { label: '合规与风险管理', to: '/compliance', desc: '出口合规、认证与风控' },
      { label: '案例研究', to: '/cases', desc: '真实场景拆解与模拟案例' },
    ],
  },
  {
    label: '跨境电商',
    to: '/ecommerce',
    children: [
      { label: '跨境电商平台', to: '/ecommerce', desc: '主流平台模式与运营要点' },
      { label: '独立站与海外营销', to: '/independent-store', desc: '建站、SEO 与流量获取' },
      { label: '创业与商业增长', to: '/startup', desc: 'SOHO 与公司化经营' },
    ],
  },
  {
    label: '工具资源',
    to: '/tools',
    children: [
      { label: '工具中心', to: '/tools', desc: '12 个可交互的外贸实用工具' },
      { label: '模板下载', to: '/templates', desc: '可复制、可下载的业务模板' },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => document.getElementById('header-search')?.focus(), 50);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      window.location.href = `${import.meta.env.BASE_URL}search?q=${encodeURIComponent(keyword.trim())}`;
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link to="/" className="logo" aria-label="TradeWise 首页">
          <span className="logo-mark"><Icon name="globe" size={22} color="#fff" /></span>
          <span className="logo-text">Trade<span>Wise</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="主导航">
          {navItems.map((item) => (
            <div className="nav-item" key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={item.to === '/'}
              >
                {item.label}
                {item.children && <Icon name="chevronDown" size={13} />}
              </NavLink>
              {item.children && (
                <div className="nav-dropdown">
                  <div className="dropdown-grid">
                    {item.children.map((child) => (
                      <Link to={child.to} key={child.to} className="dropdown-link">
                        <strong>{child.label}</strong>
                        <span>{child.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn"
            aria-label="搜索"
            onClick={() => {
              setSearchOpen(!searchOpen);
              if (!searchOpen) setTimeout(() => document.getElementById('header-search')?.focus(), 50);
            }}
          >
            <Icon name="search" size={20} />
          </button>
          <button
            className="icon-btn mobile-toggle"
            aria-label="打开菜单"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="header-search-bar">
          <form onSubmit={submitSearch} className="container search-form">
            <Icon name="search" size={18} color="var(--gray-500)" />
            <input
              id="header-search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索文章、分类、工具与模板…"
              aria-label="全站搜索关键词"
            />
            <button type="submit" className="btn btn-primary btn-sm">搜索</button>
            <span className="search-hint">按 Esc 关闭</span>
          </form>
        </div>
      )}

      {mobileOpen && (
        <nav className="mobile-nav" aria-label="移动端导航">
          <div className="mobile-nav-inner container">
            {navItems.map((item) => (
              <div className="mobile-group" key={item.label}>
                <div className="mobile-group-head">
                  <Link to={item.to}>{item.label}</Link>
                  {item.children && (
                    <button
                      aria-label={`展开${item.label}`}
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    >
                      <Icon name="chevronDown" size={18} style={{ transform: expanded === item.label ? 'rotate(180deg)' : 'none' }} />
                    </button>
                  )}
                </div>
                {item.children && expanded === item.label && (
                  <div className="mobile-sub">
                    {item.children.map((child) => (
                      <Link to={child.to} key={child.to}>{child.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/tools" className="btn btn-primary btn-sm mobile-cta">打开工具中心</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
