import { useState } from 'react';
import Icon from '../components/Icon';
import './Tools.css';

const hsChannels = [
  { name: '中国海关总署', desc: '查询中国进出口商品归类、海关公告与商品规范申报目录。', url: 'http://www.customs.gov.cn/', note: '以官方发布为准' },
  { name: '中国国际贸易单一窗口', desc: '办理报关报检等业务，部分功能需要企业账号。', url: 'https://www.singlewindow.cn/', note: '需注册账号' },
  { name: 'WCO 世界海关组织', desc: '了解 HS 公约与协调制度的结构与解释性注释。', url: 'https://www.wcoomd.org/', note: '英文资料' },
  { name: '欧盟 TARIC', desc: '查询欧盟综合关税与商品编码信息。', url: 'https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp', note: '适用于欧盟市场' },
  { name: '美国 HTS USITC', desc: '查询美国协调关税表与相关归类信息。', url: 'https://hts.usitc.gov/', note: '适用于美国市场' },
  { name: '日本海关税则', desc: '查询日本进口商品分类与税率信息。', url: 'https://www.customs.go.jp/english/tariff/index.htm', note: '适用于日本市场' },
];

export function HSCodeTool() {
  return (
    <div className="tool-panel">
      <div className="tool-panel-head"><h2>HS Code 官方查询渠道</h2><p>HS Code 由各国海关基于 WCO 协调制度执行，本工具只提供官方入口导航，不做自动归类承诺。</p></div>
      <div className="tool-panel-body">
        <div className="reference-grid">
          {hsChannels.map((c) => (
            <div className="ref-card" key={c.name}>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <a href={c.url} target="_blank" rel="noreferrer">打开官网 <Icon name="external" size={13} /></a>
              <span className="badge badge-gray" style={{ marginLeft: 8 }}>{c.note}</span>
            </div>
          ))}
        </div>
        <div className="tool-explain">
          <h3>归类时需要准备什么</h3>
          <ul>
            <li>产品的材质、结构、用途、工作原理与关键参数。</li>
            <li>产品照片、说明书、技术规格书与装箱信息。</li>
            <li>目标市场的监管要求，例如是否需要许可证、原产地证或特殊单证。</li>
            <li>如归类存在争议，应向报关行、海关或专业机构申请预裁定或书面确认。</li>
          </ul>
        </div>
        <div className="tool-warn">HS Code 前 6 位通常为国际统一编码，后续位数由各国/地区自行细化。申报归类必须以实际货物和目的国海关要求为准，错误申报可能带来补税、罚款或货物扣留风险。</div>
      </div>
    </div>
  );
}

interface Term {
  code: string;
  name: string;
  group: string;
  seller: string;
  buyer: string;
  risk: string;
  use: string;
}

const terms: Term[] = [
  { code: 'EXW', name: 'Ex Works 工厂交货', group: 'E 组 ·  departure', seller: '在指定地点（通常是工厂/仓库）将货物交由买方处置，完成交货。', buyer: '承担自此之后全部运输、报关、保险与风险。', risk: '货物交由买方处置时转移', use: '买方有能力安排全程物流时使用；卖方责任最小。' },
  { code: 'FCA', name: 'Free Carrier 货交承运人', group: 'F 组 · 主运费未付', seller: '将货物交给买方指定的承运人，并办理出口清关。', buyer: '指定承运人并承担主运费与后续风险。', risk: '交给承运人时转移', use: '适合集装箱运输与多式联运，可替代 FOB。' },
  { code: 'FAS', name: 'Free Alongside Ship 船边交货', group: 'F 组 · 主运费未付', seller: '将货物放置在指定装运港船边，完成交货。', buyer: '负责装船、主运费与后续风险。', risk: '船边交货时转移', use: '适用于海运或内河运输的大宗散货。' },
  { code: 'FOB', name: 'Free On Board 船上交货', group: 'F 组 · 主运费未付', seller: '将货物装上买方指定船舶并办理出口清关。', buyer: '承担装船后的风险、海运费与保险。', risk: '货物装上船时转移', use: '仅适用于海运或内河运输；集装箱货常改用 FCA。' },
  { code: 'CFR', name: 'Cost and Freight 成本加运费', group: 'C 组 · 主运费已付', seller: '支付货物运至指定目的港的运费，办理出口清关。', buyer: '承担装船后的风险、保险与目的港费用。', risk: '货物装上船时转移（风险与费用分离）', use: '买方自行安排保险；适用于海运或内河运输。' },
  { code: 'CIF', name: 'Cost, Insurance and Freight 成本、保险费加运费', group: 'C 组 · 主运费已付', seller: '支付运费与最低险别保险，办理出口清关。', buyer: '承担装船后的风险及目的港额外费用。', risk: '货物装上船时转移（风险与费用分离）', use: '适用于海运或内河运输；保险义务不等于风险转移。' },
  { code: 'CPT', name: 'Carriage Paid To 运费付至', group: 'C 组 · 主运费已付', seller: '支付将货物运至指定目的地的运费，办理出口清关。', buyer: '承担交给第一承运人后的风险与保险。', risk: '交给第一承运人时转移', use: '适用于任何运输方式，包括多式联运。' },
  { code: 'CIP', name: 'Carriage and Insurance Paid To 运费和保险费付至', group: 'C 组 · 主运费已付', seller: '支付运费与保险，办理出口清关。', buyer: '承担交给第一承运人后的风险。', risk: '交给第一承运人时转移', use: '适用于任何运输方式；保险要求通常高于 CIF。' },
  { code: 'DAP', name: 'Delivered at Place 目的地交货', group: 'D 组 · 到达', seller: '将货物运至指定目的地，做好卸货准备。', buyer: '负责卸货、进口清关与税费。', risk: '在指定目的地交货时转移', use: '适用于任何运输方式，卖方承担到目的地前风险。' },
  { code: 'DPU', name: 'Delivered at Place Unloaded 卸货地交货', group: 'D 组 · 到达', seller: '将货物运至指定地点并完成卸货。', buyer: '负责进口清关、税费与后续运输。', risk: '卸货完成后转移', use: 'Incoterms 2020 新增，替代 DAT。' },
  { code: 'DDP', name: 'Delivered Duty Paid 完税后交货', group: 'D 组 · 到达', seller: '承担全程运输、进口清关、税费与交货前全部风险。', buyer: '在指定目的地接收货物。', risk: '目的地交货时转移', use: '卖方责任最大；出口方通常难以直接办理目的国清关时慎用。' },
];

export function IncotermsTool() {
  const [selected, setSelected] = useState(terms[4]);
  const [keyword, setKeyword] = useState('');
  const filtered = terms.filter((t) => `${t.code}${t.name}${t.use}`.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <div className="tool-panel">
      <div className="tool-panel-head"><h2>Incoterms® 2020 术语速查</h2><p>依据国际商会（ICC）Incoterms® 2020 规则整理，用于理解责任、费用与风险划分，不替代正式合同条款。</p></div>
      <div className="tool-panel-body">
        <div className="field" style={{ maxWidth: 360, marginBottom: 'var(--sp-5)' }}><label>筛选术语</label><input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="输入 FOB / CIF / DDP 等" /></div>
        <div className="term-tabs">
          {filtered.map((t) => <button key={t.code} className={selected.code === t.code ? 'active' : ''} onClick={() => setSelected(t)}>{t.code}</button>)}
        </div>
        <div className="term-detail">
          <div className="term-detail-head">
            <span className="term-code">{selected.code}</span>
            <div><h2>{selected.name}</h2><p>{selected.group}</p></div>
          </div>
          <div className="term-grid">
            <div><h4><Icon name="user" size={16} /> 卖方责任</h4><p>{selected.seller}</p></div>
            <div><h4><Icon name="users" size={16} /> 买方责任</h4><p>{selected.buyer}</p></div>
            <div><h4><Icon name="alert" size={16} /> 风险转移</h4><p>{selected.risk}</p></div>
            <div><h4><Icon name="lightbulb" size={16} /> 适用场景</h4><p>{selected.use}</p></div>
          </div>
        </div>
        <div className="tool-explain">
          <h3>使用提醒</h3>
          <ul>
            <li>Incoterms 只规定交货、风险与费用划分，不规定付款方式、所有权转移与违约责任。</li>
            <li>引用时必须写明地点与版本，例如 FOB Shenzhen, Incoterms® 2020。</li>
            <li>CFR、CIF、CPT、CIP 属于「风险与费用分离」术语，装船/交运后风险已转移给买方，即使卖方支付运费。</li>
          </ul>
        </div>
        <div className="tool-warn">条款内容以国际商会（ICC）官方发布的 Incoterms® 2020 文本为准。本页为学习速查，最后核验日期：2026-11-21。具体交易建议在合同中由专业顾问确认。</div>
      </div>
    </div>
  );
}
