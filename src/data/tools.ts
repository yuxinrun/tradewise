import type { ToolInfo } from '../types';

export const tools: ToolInfo[] = [
  { id: 'profit-calculator', name: '外贸利润计算器', description: '输入采购、物流、平台与汇率等成本，自动计算总成本、利润、利润率与盈亏平衡价。', icon: 'calculator', category: '财务核算', path: '/tools/profit-calculator' },
  { id: 'exchange-tool', name: '汇率换算工具', description: '手动输入汇率进行金额换算，明确提示以银行实际成交汇率为准。', icon: 'exchange', category: '财务核算', path: '/tools/exchange-tool' },
  { id: 'fob-calculator', name: 'FOB 成本核算工具', description: '核算 FOB 价格所需的国内采购、运输、报关与杂费构成。', icon: 'ship', category: '财务核算', path: '/tools/fob-calculator' },
  { id: 'cbm-calculator', name: '海运体积计算器 CBM', description: '按箱规与数量计算体积、总 CBM 与计费重，支持多组货物累加。', icon: 'box', category: '物流工具', path: '/tools/cbm-calculator' },
  { id: 'container-estimator', name: '集装箱装载估算器', description: '根据货物尺寸估算 20GP / 40GP / 40HQ 的理论装载数量。', icon: 'container', category: '物流工具', path: '/tools/container-estimator' },
  { id: 'quotation-generator', name: '外贸报价单生成器', description: '填写产品与价格条款，生成可复制的英文报价单文本。', icon: 'file', category: '业务工具', path: '/tools/quotation-generator' },
  { id: 'cold-email-generator', name: '英文开发信生成模板', description: '根据客户与产品信息生成可编辑的开发信框架，强调以客户价值为中心。', icon: 'mail', category: '业务工具', path: '/tools/cold-email-generator' },
  { id: 'inquiry-template', name: '询盘回复模板库', description: '按询盘类型提供结构化的英文回复模板与跟进话术。', icon: 'message', category: '业务工具', path: '/tools/inquiry-template' },
  { id: 'hs-code', name: 'HS Code 查询官方渠道导航', description: '汇总各国海关与官方查询渠道，说明归类原则与核验要求。', icon: 'search', category: '合规工具', path: '/tools/hs-code' },
  { id: 'incoterms-lookup', name: 'Incoterms 贸易术语速查', description: '依据 Incoterms 2020 快速查看各术语的责任、费用与风险划分。', icon: 'globe', category: '合规工具', path: '/tools/incoterms-lookup' },
  { id: 'document-checklist', name: '外贸单证清单', description: '按订单阶段生成必备单证检查清单，可勾选并打印。', icon: 'checklist', category: '业务工具', path: '/tools/document-checklist' },
  { id: 'followup-record', name: '客户跟进记录模板', description: '生成结构化的客户跟进记录表，便于团队协作与复盘。', icon: 'users', category: '业务工具', path: '/tools/followup-record' },
];

export const getTool = (id: string) => tools.find((t) => t.id === id);
