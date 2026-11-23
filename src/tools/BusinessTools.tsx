import { useState } from 'react';
import Icon from '../components/Icon';
import './Tools.css';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button className="btn btn-outline btn-sm" onClick={() => navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); })}>
      <Icon name={copied ? 'check' : 'copy'} size={14} /> {copied ? '已复制' : '复制内容'}
    </button>
  );
}

export function QuotationGenerator() {
  const [f, setF] = useState({ company: 'Your Company Name', client: 'Dear Customer', product: 'Product Name', spec: 'Specification / Model', qty: '1000', unit: 'pcs', price: '5.20', term: 'FOB Shenzhen (Incoterms® 2020)', payment: '30% T/T deposit, 70% before shipment', lead: '25 days after deposit', valid: '15 days', port: 'Shenzhen, China' });
  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });
  const total = (Number(f.qty) || 0) * (Number(f.price) || 0);
  const output = `QUOTATION\n\nFrom: ${f.company}\nTo: ${f.client}\nDate: ${new Date().toISOString().slice(0, 10)}\n\nWe are pleased to offer the following quotation:\n\nNo.  Product              Specification        Qty       Unit Price      Amount\n1.   ${f.product.padEnd(18)} ${f.spec.padEnd(19)} ${f.qty} ${f.unit}   USD ${f.price}    USD ${total.toFixed(2)}\n\nTotal Amount: USD ${total.toFixed(2)}\nPrice Term: ${f.term}\nPort of Loading: ${f.port}\nPayment Terms: ${f.payment}\nLead Time: ${f.lead}\nQuotation Validity: ${f.valid}\n\nThis quotation is subject to our final confirmation. Please feel free to contact us if you have any questions.\n\nBest regards,\n${f.company}`;

  return (
    <div className="tool-panel">
      <div className="tool-panel-head"><h2>填写报价信息</h2><p>生成一份可复制的英文报价单文本，填写后可直接用于邮件正文。</p></div>
      <div className="tool-panel-body">
        <div className="form-grid-3">
          <Field label="你的公司" value={f.company} onChange={set('company')} type="text" />
          <Field label="客户名称" value={f.client} onChange={set('client')} type="text" />
          <Field label="产品名称" value={f.product} onChange={set('product')} type="text" />
          <Field label="规格型号" value={f.spec} onChange={set('spec')} type="text" />
          <Field label="数量" value={f.qty} onChange={set('qty')} />
          <Field label="单位" value={f.unit} onChange={set('unit')} type="text" />
          <Field label="单价 (USD)" value={f.price} onChange={set('price')} />
          <Field className="field-full" label="价格条款" value={f.term} onChange={set('term')} type="text" />
          <Field label="装运港" value={f.port} onChange={set('port')} type="text" />
          <Field label="付款方式" value={f.payment} onChange={set('payment')} type="text" />
          <Field label="交期" value={f.lead} onChange={set('lead')} type="text" />
          <Field label="报价有效期" value={f.valid} onChange={set('valid')} type="text" />
        </div>
        <div className="tool-output">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ fontSize: 15, color: 'var(--navy-800)', margin: 0 }}>生成的报价单</h3>
            <CopyButton text={output} />
          </div>
          <pre>{output}</pre>
        </div>
        <div className="tool-warn">报价前请核对贸易术语是否与你的实际交货能力一致，并确认价格包含的成本范围。Incoterms 以 ICC 官方规则为准。</div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'number', className = '' }: { label: string; value: string; onChange: (v: string) => void; type?: string; className?: string }) {
  return <div className={`field ${className}`}><label>{label}</label><input type={type} value={value} onChange={(e) => onChange(e.target.value)} /></div>;
}

const emailTemplates = [
  { key: 'distributor', label: '寻找分销商', subject: 'Distribution opportunity for {product} in {market}', body: `Hi {name},\n\nI noticed that {company} supplies {product} in {market}. We are a manufacturer from China with {years} years of experience in this category.\n\nOur products are used by {customer_type}, and we currently support partners with:\n- Consistent quality control and inspection before shipment\n- Flexible order quantities for market testing\n- Technical data and samples for evaluation\n\nWould you be open to a short call or a quick exchange of catalogues? I can send our product list and indicative pricing if useful.\n\nBest regards,\n{sender}` },
  { key: 'retailer', label: ' contacting 零售商', subject: 'Private-label {product} supplier for {company}', body: `Hi {name},\n\nI came across {company} while researching {product} retailers in {market}. We manufacture {product} and also support private-label and packaging customization.\n\nKey details:\n- MOQ: {moq}\n- Lead time: {lead_time}\n- Certifications available on request\n\nIf you are reviewing suppliers this quarter, I would be glad to send samples and a short quotation.\n\nBest regards,\n{sender}` },
  { key: 'followup', label: '首次跟进', subject: 'Re: {subject}', body: `Hi {name},\n\nI followed up on the email I sent about {product}. I understand your inbox is busy.\n\nIf now is not the right time, just let me know and I will close the loop. If it is relevant, I can send a one-page overview with specifications and indicative pricing.\n\nBest regards,\n{sender}` },
];

export function ColdEmailGenerator() {
  const [tpl, setTpl] = useState(emailTemplates[0]);
  const [vars, setVars] = useState({ name: 'Mr. Smith', company: 'Target Company', product: 'LED desk lamps', market: 'Germany', years: '8', customer_type: 'office suppliers', moq: '500 units', lead_time: '30 days', sender: 'Your Name, TradeWise' });
  const fill = (s: string) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k as keyof typeof vars] ?? `{${k}}`);
  const subject = fill(tpl.subject);
  const body = fill(tpl.body);

  return (
    <div className="tool-panel">
      <div className="tool-panel-head"><h2>开发信框架生成器</h2><p>选择一个场景，填写变量，生成可编辑的邮件框架。好邮件的关键不是模板，而是与客户业务的相关性。</p></div>
      <div className="tool-panel-body">
        <div className="field" style={{ marginBottom: 'var(--sp-5)' }}><label>选择场景</label><select value={tpl.key} onChange={(e) => setTpl(emailTemplates.find((t) => t.key === e.target.value) ?? emailTemplates[0])}>{emailTemplates.map((t) => <option value={t.key} key={t.key}>{t.label}</option>)}</select></div>
        <div className="form-grid-3">
          {Object.entries(vars).map(([k, v]) => <Field key={k} label={k} value={v} onChange={(nv) => setVars({ ...vars, [k]: nv })} type="text" />)}
        </div>
        <div className="tool-output">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ fontSize: 15, color: 'var(--navy-800)', margin: 0 }}>生成的邮件</h3>
            <CopyButton text={`Subject: ${subject}\n\n${body}`} />
          </div>
          <pre>{`Subject: ${subject}\n\n${body}`}</pre>
        </div>
        <div className="tool-explain">
          <h3>使用前请检查</h3>
          <ul>
            <li>标题是否具体、与客户业务相关，避免 "Cooperation" "Best price" 这类泛化标题。</li>
            <li>第一段是否说明了「为什么是你」和「为什么现在」。</li>
            <li>是否只有一个明确的行动号召，而不是塞满多个要求。</li>
            <li>是否遵守目标市场反垃圾邮件法规，提供真实身份与退订方式。</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const inquiryTemplates = [
  { title: '客户只问价格', body: `Thank you for your inquiry.\n\nTo give you an accurate price, could you please confirm:\n1. Required quantity\n2. Specification / model\n3. Target port or destination\n4. Any specific certification requirements\n\nOnce we have these details, we will send a formal quotation with lead time and payment terms.\n\nBest regards,` },
  { title: '客户索要样品', body: `Thank you for your interest in our samples.\n\nWe would be glad to arrange samples. Could you please provide your courier account number and confirm the sample specification? Sample fee and freight can be discussed based on your order plan.\n\nAfter you receive the samples, we can schedule a short call to review feedback.\n\nBest regards,` },
  { title: '客户压价', body: `Thank you for the feedback. We understand price is important for your market.\n\nCould you please share your target price and expected annual volume? With clearer volume information, we can review the cost structure and see which options are feasible — for example adjusting specification, packaging or order quantity.\n\nWe would rather find a sustainable solution than simply cut quality.\n\nBest regards,` },
  { title: '客户长时间未回复', body: `Hi [Name],\n\nI am following up on the quotation sent on [date]. I understand priorities may have changed.\n\nIf the project is still active, I would be happy to update the offer or send additional information. If not, please let me know and I will close the file.\n\nBest regards,` },
];

export function InquiryTemplate() {
  const [active, setActive] = useState(0);
  return (
    <div className="tool-panel">
      <div className="tool-panel-head"><h2>询盘回复模板库</h2><p>按询盘类型选择模板，复制到邮件中后务必根据实际沟通进行修改。</p></div>
      <div className="tool-panel-body">
        <div className="phase-filters" style={{ marginBottom: 'var(--sp-5)' }}>
          {inquiryTemplates.map((t, i) => <button key={t.title} className={active === i ? 'active' : ''} onClick={() => setActive(i)}>{t.title}</button>)}
        </div>
        <pre style={{ background: 'var(--navy-900)', color: '#d6e6f0', padding: 'var(--sp-5)', borderRadius: 'var(--radius)', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8 }}>{inquiryTemplates[active].body}</pre>
        <div className="copy-row"><CopyButton text={inquiryTemplates[active].body} /></div>
      </div>
    </div>
  );
}

const docChecklist = [
  { phase: '订单确认', items: ['销售合同或 PI 已双方确认', '产品规格、数量、包装方式已书面确认', '付款方式与交货条款已明确'] },
  { phase: '生产备货', items: ['采购订单已下达供应商', '生产进度计划已确认', '必要时安排中期验货'] },
  { phase: '出货前', items: ['尾款到账或银行保函确认', '装箱单数据已核对', '商业发票信息与合同一致', '报关资料齐全', '订舱确认与提单信息核对'] },
  { phase: '交付后', items: ['提单/运单已发送客户', '全套单证已归档', '应收账款已结清', '客户签收与反馈已记录'] },
];

export function DocumentChecklist() {
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (k: string) => setChecked(checked.includes(k) ? checked.filter((x) => x !== k) : [...checked, k]);
  return (
    <div className="tool-panel">
      <div className="tool-panel-head"><h2>外贸单证与流程检查表</h2><p>按订单阶段逐项核对，勾选状态仅保存在当前页面。</p></div>
      <div className="tool-panel-body">
        {docChecklist.map((g) => (
          <div key={g.phase} style={{ marginBottom: 'var(--sp-6)' }}>
            <h3 style={{ fontSize: 16, color: 'var(--navy-800)', marginBottom: 'var(--sp-3)' }}>{g.phase}</h3>
            <div className="check-list">
              {g.items.map((item) => {
                const k = `${g.phase}-${item}`;
                return <label key={k} className={`check-item ${checked.includes(k) ? 'checked' : ''}`}><input type="checkbox" checked={checked.includes(k)} onChange={() => toggle(k)} /><span>{item}</span></label>;
              })}
            </div>
          </div>
        ))}
        <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>已完成 {checked.length} / {docChecklist.reduce((s, g) => s + g.items.length, 0)} 项</p>
      </div>
    </div>
  );
}

export function FollowupRecord() {
  const [rows, setRows] = useState([{ date: new Date().toISOString().slice(0, 10), client: '', channel: 'Email', content: '', feedback: '', next: '' }]);
  const output = ['日期,客户,渠道,沟通内容,客户反馈,下一步行动', ...rows.map((r) => [r.date, r.client, r.channel, r.content, r.feedback, r.next].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))].join('\n');
  return (
    <div className="tool-panel">
      <div className="tool-panel-head"><h2>客户跟进记录表</h2><p>记录每次沟通，生成可保存为 CSV 的表格内容。</p></div>
      <div className="tool-panel-body">
        {rows.map((r, i) => (
          <div className="form-grid-3" key={i} style={{ borderBottom: '1px solid var(--gray-100)', paddingBottom: 'var(--sp-4)', marginBottom: 'var(--sp-4)' }}>
            <div className="field"><label>日期</label><input type="date" value={r.date} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, date: e.target.value } : x))} /></div>
            <div className="field"><label>客户名称</label><input value={r.client} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, client: e.target.value } : x))} /></div>
            <div className="field"><label>渠道</label><select value={r.channel} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, channel: e.target.value } : x))}><option>Email</option><option>LinkedIn</option><option>Phone</option><option>WhatsApp</option><option>Meeting</option></select></div>
            <div className="field field-full"><label>沟通内容</label><input value={r.content} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, content: e.target.value } : x))} /></div>
            <div className="field"><label>客户反馈</label><input value={r.feedback} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, feedback: e.target.value } : x))} /></div>
            <div className="field"><label>下一步行动</label><input value={r.next} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, next: e.target.value } : x))} /></div>
          </div>
        ))}
        <div className="tool-actions"><button className="btn btn-outline btn-sm" onClick={() => setRows([...rows, { date: new Date().toISOString().slice(0, 10), client: '', channel: 'Email', content: '', feedback: '', next: '' }])}><Icon name="plus" size={15} /> 添加一条记录</button><CopyButton text={output} /></div>
        <div className="tool-output"><pre>{output}</pre></div>
      </div>
    </div>
  );
}
