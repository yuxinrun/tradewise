import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';

const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const LearningPage = lazy(() => import('./pages/LearningPage'));
const BeginnerPage = lazy(() => import('./pages/BeginnerPage'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const TemplatesPage = lazy(() => import('./pages/TemplatesPage'));
const CasesPage = lazy(() => import('./pages/CasesPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const pageRoutes = [
  'trade', 'sourcing', 'marketing', 'business', 'logistics',
  'payment', 'ecommerce', 'independent-store', 'compliance', 'startup',
];

function PageLoader() {
  return <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: 'var(--gray-500)' }}>页面加载中…</div>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {pageRoutes.map((slug) => (
          <Route key={slug} path={`/${slug}`} element={<Suspense fallback={<PageLoader />}><CategoryPage slug={slug} /></Suspense>} />
        ))}
        <Route path="/learning" element={<Suspense fallback={<PageLoader />}><LearningPage /></Suspense>} />
        <Route path="/beginner" element={<Suspense fallback={<PageLoader />}><BeginnerPage /></Suspense>} />
        <Route path="/tools" element={<Suspense fallback={<PageLoader />}><ToolsPage /></Suspense>} />
        <Route path="/tools/:toolId" element={<Suspense fallback={<PageLoader />}><ToolsPage /></Suspense>} />
        <Route path="/templates" element={<Suspense fallback={<PageLoader />}><TemplatesPage /></Suspense>} />
        <Route path="/cases" element={<Suspense fallback={<PageLoader />}><CasesPage /></Suspense>} />
        <Route path="/articles/:slug" element={<Suspense fallback={<PageLoader />}><ArticlePage /></Suspense>} />
        <Route path="/search" element={<Suspense fallback={<PageLoader />}><SearchPage /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  );
}
