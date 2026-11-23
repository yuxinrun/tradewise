export const journey = [
  { step: '01', title: '认知外贸', desc: '建立对国际贸易、出口流程与角色的基本认知。', link: '/trade' },
  { step: '02', title: '产品选择', desc: '找到有市场、有利润、有供应链支撑的产品。', link: '/sourcing' },
  { step: '03', title: '市场研究', desc: '判断目标市场的需求规模、竞争与进入壁垒。', link: '/marketing' },
  { step: '04', title: '客户开发', desc: '用 Google、LinkedIn 等渠道找到真实潜在客户。', link: '/marketing' },
  { step: '05', title: '询盘报价', desc: '专业处理询盘，输出有竞争力的报价方案。', link: '/business' },
  { step: '06', title: '订单成交', desc: '完成谈判、签约与单证，推动订单落地。', link: '/business' },
  { step: '07', title: '国际物流', desc: '选择运输方式，安排报关、订舱与交付。', link: '/logistics' },
  { step: '08', title: '收款结汇', desc: '安全收汇，核算利润并处理财税事项。', link: '/payment' },
  { step: '09', title: '业务增长', desc: '维护客户、拓展渠道，实现稳定持续增长。', link: '/startup' },
];

export interface DayTask {
  day: number;
  phase: string;
  title: string;
  learn: string;
  practice: string;
  link?: string;
}

export const beginnerPlan: DayTask[] = [
  { day: 1, phase: '认知建立', title: '认识国际贸易', learn: '阅读《什么是国际贸易》，理解贸易发生的原因与基本格局。', practice: '用一句话向朋友解释什么是出口业务。', link: '/articles/what-is-international-trade' },
  { day: 2, phase: '认知建立', title: '理解出口全流程', learn: '阅读《中国出口业务完整流程》，画出自己的流程图。', practice: '把流程写在一张纸上，标出你最不熟悉的三个环节。', link: '/articles/china-export-process' },
  { day: 3, phase: '认知建立', title: '认识参与角色', learn: '学习出口业务中的各个参与角色与职责。', practice: '列出一笔订单中你会接触到的所有角色。', link: '/articles/trade-roles' },
  { day: 4, phase: '认知建立', title: '分清业务模式', learn: '理解 B2B、B2C、DTC 的差异。', practice: '写下你更想做哪种模式及理由。', link: '/articles/b2b-b2c-dtc' },
  { day: 5, phase: '产品选择', title: '建立选品框架', learn: '学习产品选择的五个评估维度。', practice: '列出 3 个你感兴趣的产品方向。', link: '/articles/choose-export-product' },
  { day: 6, phase: '产品选择', title: '逛一逛 1688', learn: '学习 1688 搜索与店铺信息判读方法。', practice: '为每个方向找到 3 家候选供应商并收藏。', link: '/articles/find-suppliers-1688' },
  { day: 7, phase: '产品选择', title: '评估供应商', learn: '学习工厂与贸易商的识别方法及评估维度。', practice: '为候选供应商填写一份评估表。', link: '/articles/supplier-evaluation' },
  { day: 8, phase: '产品选择', title: '算清成本', learn: '使用外贸利润计算器理解成本构成。', practice: '为其中一个产品做一次完整成本测算。', link: '/tools/profit-calculator' },
  { day: 9, phase: '市场研究', title: '研究一个国家', learn: '学习目标市场研究的框架。', practice: '选定一个国家，写下需求、竞争、渠道三点观察。', link: '/articles/research-target-market' },
  { day: 10, phase: '市场研究', title: '掌握 Google 搜索', learn: '学习 site、intitle、inurl 等搜索语法。', practice: '用 3 组指令搜索目标市场的进口商。', link: '/articles/google-advanced-search' },
  { day: 11, phase: '客户开发', title: '建立客户名单', learn: '学习客户信息收集与数据库建设方法。', practice: '整理 10 家潜在客户，记录域名与联系人。' },
  { day: 12, phase: '客户开发', title: '验证客户真实性', learn: '学习判断客户真实性与客户分级。', practice: '对 10 家客户做一次真实性打分。', link: '/articles/customer-verification' },
  { day: 13, phase: '客户开发', title: '了解 LinkedIn 开发', learn: '学习 LinkedIn 档案优化与合规触达。', practice: '完善自己的 LinkedIn 档案。', link: '/articles/linkedin-prospecting' },
  { day: 14, phase: '客户开发', title: '阶段复盘', learn: '回顾前两周学到的知识。', practice: '整理一份个人学习笔记，明确下一步重点。' },
  { day: 15, phase: '业务实战', title: '写好开发信', learn: '学习开发信结构与价值主张写法。', practice: '写 1 封针对具体客户的开发信。', link: '/articles/cold-email-writing' },
  { day: 16, phase: '业务实战', title: '用工具生成邮件', learn: '使用英文开发信生成模板整理思路。', practice: '将昨天的邮件改写为两个不同标题版本。', link: '/tools/cold-email-generator' },
  { day: 17, phase: '业务实战', title: '处理询盘', learn: '学习询盘分类与响应流程。', practice: '模拟一封询盘并写出完整回复。', link: '/articles/handle-inquiries' },
  { day: 18, phase: '业务实战', title: '制作报价单', learn: '学习报价单结构与价格条款表达。', practice: '用报价单生成器制作一份英文报价。', link: '/tools/quotation-generator' },
  { day: 19, phase: '业务实战', title: '认识外贸单证', learn: '学习 PI、发票、装箱单与合同的用途。', practice: '下载并查看 PI 与装箱单模板。', link: '/articles/trade-documents' },
  { day: 20, phase: '业务实战', title: '谈判与跟进', learn: '学习谈判、订单跟进与客诉处理。', practice: '设计一份 5 步客户跟进计划。', link: '/articles/negotiation-followup' },
  { day: 21, phase: '物流收款', title: '掌握 Incoterms', learn: '学习 Incoterms 2020 常用术语。', practice: '用速查工具对比 FOB 与 CIF 的责任差异。', link: '/tools/incoterms-lookup' },
  { day: 22, phase: '物流收款', title: '选择物流方式', learn: '比较海运、空运、铁路与快递。', practice: '为一票假设货物选择运输方式并说明理由。', link: '/articles/shipping-modes' },
  { day: 23, phase: '物流收款', title: '计算物流成本', learn: '学习 CBM、体积重与运费构成。', practice: '用 CBM 计算器计算一组货物的体积。', link: '/tools/cbm-calculator' },
  { day: 24, phase: '物流收款', title: '了解收款方式', learn: '比较 T/T、L/C、D/P、D/A 的风险。', practice: '列出你愿意接受的付款条款及理由。', link: '/articles/payment-methods' },
  { day: 25, phase: '物流收款', title: '核算订单利润', learn: '学习完整利润核算方法。', practice: '把第 8 天的测算更新为完整订单版本。', link: '/articles/export-profit' },
  { day: 26, phase: '拓展视野', title: '认识跨境电商', learn: '了解主流跨境电商平台模式。', practice: '选出你最想尝试的一个平台并调研。', link: '/articles/ecommerce-overview' },
  { day: 27, phase: '拓展视野', title: '了解独立站', learn: '理解独立站的价值与成本结构。', practice: '列出独立站的 3 个优势与 3 个挑战。', link: '/articles/independent-store-basics' },
  { day: 28, phase: '拓展视野', title: '合规与风控', learn: '学习出口合规与常见欺诈风险。', practice: '完成一份客户真实性核验清单。', link: '/articles/trade-fraud' },
  { day: 29, phase: '综合实战', title: '走完一笔模拟订单', learn: '阅读完整 B2B 订单案例。', practice: '按案例步骤自己复述一遍全流程。', link: '/articles/case-b2b-order' },
  { day: 30, phase: '综合实战', title: '制定你的行动计划', learn: '回顾 30 天全部内容。', practice: '写出未来 90 天的具体目标与每周行动。', link: '/beginner' },
];
