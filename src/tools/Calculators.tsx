import { useMemo, useState } from 'react';
import Icon from '../components/Icon';
import './Tools.css';

const num = (v: string) => (Number.isFinite(Number(v)) ? Number(v) : 0);
const money = (v: number) => v.toLocaleString('zh-CN', { maximumFractionDigits: 2 });

function Field({ label, value, onChange, hint, type = 'number', step }: { label: string; value: string; onChange: (v: string) => void; hint?: string; type?: string; step?: string }) {
  return (
    <div className="field">
      <label>{label}{hint && <span className="hint"> · {hint}</span>}</label>
      <input type={type} step={step} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function ProfitCalculator() {
  const [f, setF] = useState({ purchase: '80', domestic: '3', package: '2', customs: '1.5', shipping: '12', insurance: '0.5', other: '2', rate: '7.15', price: '18', platform: '3', tax: '9' });
  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });
  const r = useMemo(() => {
    const fixed = num(f.purchase) + num(f.domestic) + num(f.package) + num(f.customs) + num(f.shipping) + num(f.insurance) + num(f.other);
    const income = num(f.price) * num(f.rate);
    const platformFee = income * num(f.platform) / 100;
    const refund = num(f.purchase) * num(f.tax) / 100;
    const totalCost = fixed + platformFee;
    const profit = income - totalCost + refund;
    const margin = income ? (profit / income) * 100 : 0;
    const netFixed = fixed - refund;
    const breakEven = num(f.rate) * (1 - num(f.platform) / 100) > 0 ? netFixed / (num(f.rate) * (1 - num(f.platform) / 100)) : 0;
    return { fixed, income, platformFee, refund, totalCost, profit, margin, breakEven };
  }, [f]);

  return (
    <div className="tool-panel">
      <div className="tool-panel-head"><h2>输入成本与售价</h2><p>所有金额除销售价格外均按人民币（元）输入，汇率为 1 美元兑人民币。</p></div>
      <div className="tool-panel-body">
        <div className="form-grid-3">
          <Field label="产品采购价" value={f.purchase} onChange={set('purchase')} hint="元/件" />
          <Field label="国内运输费" value={f.domestic} onChange={set('domestic')} hint="元/件" />
          <Field label="包装费" value={f.package} onChange={set('package')} hint="元/件" />
          <Field label="报关及杂费" value={f.customs} onChange={set('customs')} hint="元/件" />
          <Field label="国际物流费" value={f.shipping} onChange={set('shipping')} hint="元/件" />
          <Field label="保险费" value={f.insurance} onChange={set('insurance')} hint="元/件" />
          <Field label="其他成本" value={f.other} onChange={set('other')} hint="元/件" />
          <Field label="汇率" value={f.rate} onChange={set('rate')} hint="USD→CNY" step="0.0001" />
          <Field label="销售价格" value={f.price} onChange={set('price')} hint="美元/件" />
          <Field label="平台/佣金费率" value={f.platform} onChange={set('platform')} hint="%" />
          <Field label="退税率（测算）" value={f.tax} onChange={set('tax')} hint="%" />
        </div>
        <div className="result-grid">
          <div className="result-card"><span>固定总成本</span><strong>¥{money(r.fixed)}</strong><small>不含平台佣金</small></div>
          <div className="result-card"><span>销售收入（人民币）</span><strong>¥{money(r.income)}</strong><small>售价 × 汇率</small></div>
          <div className="result-card"><span>平台费用</span><strong>¥{money(r.platformFee)}</strong><small>按销售额比例</small></div>
          <div className="result-card orange"><span>测算退税</span><strong>¥{money(r.refund)}</strong><small>仅作粗略测算</small></div>
          <div className="result-card highlight"><span>预计利润</span><strong>¥{money(r.profit)}</strong><small>已计入退税额</small></div>
          <div className="result-card highlight"><span>利润率</span><strong>{r.margin.toFixed(2)}%</strong><small>利润 / 销售收入</small></div>
        </div>
        <div className="result-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="result-card"><span>盈亏平衡售价（美元/件）</span><strong>${r.breakEven.toFixed(2)}</strong><small>在此价格下利润约为零，实际定价需留出余量</small></div>
        </div>
        <div className="tool-explain">
          <h3>计算口径说明</h3>
          <ul>
            <li>利润 = 销售价格 × 汇率 −（采购价 + 国内运输 + 包装 + 报关 + 国际物流 + 保险 + 其他 + 平台费用）+ 退税测算。</li>
            <li>退税测算 = 采购价 × 退税率，仅为粗略估算，实际退税额取决于报关单、进项发票、退税率为税务机关核定的适用税率等因素。</li>
            <li>盈亏平衡价 = (固定总成本 − 退税测算) ÷ [汇率 × (1 − 平台费率)]。</li>
          </ul>
        </div>
        <div className="tool-warn">本工具结果仅供报价前测算。汇率请使用银行实际成交价，退税率请以国家税务总局与主管部门公布的最新规定为准；不要把测算结果当作财务或税务结论。</div>
      </div>
    </div>
  );
}

export function ExchangeTool() {
  const [amount, setAmount] = useState('1000');
  const [rate, setRate] = useState('7.15');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('CNY');
  const result = num(amount) * num(rate);

  return (
    <div className="tool-panel">
      <div className="tool-panel-head"><h2>手动汇率换算</h2><p>输入你实际拿到的汇率，工具只做简单乘法计算。</p></div>
      <div className="tool-panel-body">
        <div className="form-grid">
          <Field label="金额" value={amount} onChange={setAmount} hint="输入数字" />
          <Field label="汇率" value={rate} onChange={setRate} hint="1 原币 = ? 目标币" step="0.0001" />
          <div className="field"><label>原币种</label><select value={from} onChange={(e) => setFrom(e.target.value)}><option>USD</option><option>CNY</option><option>EUR</option><option>GBP</option><option>JPY</option><option>HKD</option></select></div>
          <div className="field"><label>目标币种</label><select value={to} onChange={(e) => setTo(e.target.value)}><option>CNY</option><option>USD</option><option>EUR</option><option>GBP</option><option>JPY</option><option>HKD</option></select></div>
        </div>
        <div className="result-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="result-card highlight"><span>换算结果</span><strong>{money(num(amount))} {from} ≈ {money(result)} {to}</strong><small>汇率：1 {from} = {rate} {to}</small></div>
        </div>
        <div className="tool-warn">汇率仅供参考和内部测算，以银行实际成交汇率、结汇水单为准。银行买入价、卖出价与中间价不同，跨境收款还可能产生手续费与汇兑损失。</div>
      </div>
    </div>
  );
}

export function FOBCalculator() {
  const [f, setF] = useState({ purchase: '65', transport: '4', package: '3', customs: '2', inspection: '1.5', misc: '1', qty: '1000', rate: '7.15' });
  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });
  const total = num(f.purchase) + num(f.transport) + num(f.package) + num(f.customs) + num(f.inspection) + num(f.misc);
  const perUnit = num(f.qty) > 0 ? total / num(f.qty) : 0;

  return (
    <div className="tool-panel">
      <div className="tool-panel-head"><h2>FOB 成本核算</h2><p>FOB 价格包含货物在装运港装上船之前的所有费用，本工具按单票总成本进行核算。</p></div>
      <div className="tool-panel-body">
        <div className="form-grid-3">
          <Field label="采购总成本" value={f.purchase} onChange={set('purchase')} hint="元" />
          <Field label="国内运输" value={f.transport} onChange={set('transport')} hint="元" />
          <Field label="包装费用" value={f.package} onChange={set('package')} hint="元" />
          <Field label="报关费用" value={f.customs} onChange={set('customs')} hint="元" />
          <Field label="商检/检测" value={f.inspection} onChange={set('inspection')} hint="元" />
          <Field label="其他杂费" value={f.misc} onChange={set('misc')} hint="元" />
          <Field label="订单数量" value={f.qty} onChange={set('qty')} hint="件" />
          <Field label="汇率" value={f.rate} onChange={set('rate')} hint="USD→CNY" step="0.0001" />
        </div>
        <div className="result-grid">
          <div className="result-card"><span>FOB 总成本（人民币）</span><strong>¥{money(total)}</strong></div>
          <div className="result-card highlight"><span>FOB 单价（人民币）</span><strong>¥{money(perUnit)}</strong><small>总成本 ÷ 数量</small></div>
          <div className="result-card highlight"><span>FOB 单价（美元）</span><strong>${(perUnit / num(f.rate)).toFixed(2)}</strong></div>
        </div>
        <div className="tool-explain">
          <h3>FOB 报价要注意什么</h3>
          <ul>
            <li>FOB 项下，卖方承担货物装上船之前的风险与费用，买方承担海运运费与保险。报价时必须写明指定装运港，例如 FOB Shenzhen（Incoterms® 2020）。</li>
            <li>装船后的费用不由卖方承担，但卖方仍需配合提供报关与装运单据。</li>
            <li>报价时预留合理利润与汇率波动余量，不要把测算价格直接当报价。</li>
          </ul>
        </div>
        <div className="tool-warn">Incoterms 术语以国际商会（ICC）官方文本为准。本工具仅为成本核算辅助，不替代正式的贸易条款约定。</div>
      </div>
    </div>
  );
}

export function CBMMCalculator() {
  const [rows, setRows] = useState([{ name: '纸箱A', l: '60', w: '40', h: '35', qty: '20' }]);
  const [divisor, setDivisor] = useState('6000');
  const calculated = useMemo(() => rows.map((r) => {
    const cbmPer = (num(r.l) * num(r.w) * num(r.h)) / 1_000_000;
    return { ...r, cbmPer, cbm: cbmPer * num(r.qty), volWeight: (num(r.l) * num(r.w) * num(r.h) * num(r.qty)) / num(divisor) };
  }), [rows, divisor]);
  const totalCbm = calculated.reduce((s, r) => s + r.cbm, 0);
  const totalVol = calculated.reduce((s, r) => s + r.volWeight, 0);

  return (
    <div className="tool-panel">
      <div className="tool-panel-head"><h2>海运体积 CBM 计算器</h2><p>输入每箱长宽高（厘米）与箱数，自动计算体积与计费重。可添加多组货物。</p></div>
      <div className="tool-panel-body">
        <div className="form-grid" style={{ marginBottom: 'var(--sp-4)' }}>
          <Field label="体积重除数" value={divisor} onChange={setDivisor} hint="空运常用 6000，快线常用 5000" />
        </div>
        {calculated.map((r, i) => (
          <div className="form-grid-3" key={i} style={{ borderBottom: '1px solid var(--gray-100)', paddingBottom: 'var(--sp-4)', marginBottom: 'var(--sp-4)' }}>
            <div className="field"><label>货物名称</label><input value={r.name} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} /></div>
            <Field label="长 (cm)" value={r.l} onChange={(v) => setRows(rows.map((x, j) => j === i ? { ...x, l: v } : x))} />
            <Field label="宽 (cm)" value={r.w} onChange={(v) => setRows(rows.map((x, j) => j === i ? { ...x, w: v } : x))} />
            <Field label="高 (cm)" value={r.h} onChange={(v) => setRows(rows.map((x, j) => j === i ? { ...x, h: v } : x))} />
            <Field label="箱数" value={r.qty} onChange={(v) => setRows(rows.map((x, j) => j === i ? { ...x, qty: v } : x))} />
            <div className="field"><label>本组小计</label><div style={{ padding: '10px 0', fontWeight: 700, color: 'var(--teal-700)' }}>{r.cbm.toFixed(3)} CBM · {money(r.volWeight)} kg 体积重</div></div>
          </div>
        ))}
        <div className="tool-actions">
          <button className="btn btn-outline btn-sm" onClick={() => setRows([...rows, { name: `纸箱${rows.length + 1}`, l: '50', w: '40', h: '30', qty: '10' }])}><Icon name="plus" size={15} /> 添加一组货物</button>
        </div>
        <div className="result-grid">
          <div className="result-card"><span>总 CBM</span><strong>{totalCbm.toFixed(3)}</strong><small>立方米</small></div>
          <div className="result-card"><span>总体积重</span><strong>{money(totalVol)} kg</strong><small>按除数 {divisor} 计算</small></div>
          <div className="result-card highlight"><span>海运计费参考</span><strong>{totalCbm.toFixed(3)} 计费吨</strong><small>海运通常取 CBM 与重量较大者</small></div>
        </div>
        <div className="tool-warn">不同船公司与货代的计费规则、免费体积重系数和最小计费单位可能不同，请以货代正式报价为准。</div>
      </div>
    </div>
  );
}

const containers = [
  { name: '20GP', l: 5898, w: 2352, h: 2393, max: 28000 },
  { name: '40GP', l: 12032, w: 2352, h: 2393, max: 26700 },
  { name: '40HQ', l: 12032, w: 2352, h: 2698, max: 26500 },
];

export function ContainerEstimator() {
  const [box, setBox] = useState({ l: '60', w: '40', h: '35', weight: '18' });
  const [util, setUtil] = useState('85');
  const results = useMemo(() => containers.map((c) => {
    const usedL = c.l * num(util) / 100;
    const usedW = c.w * num(util) / 100;
    const usedH = c.h * num(util) / 100;
    const byVolume = Math.floor((usedL / num(box.l)) * (usedW / num(box.w)) * (usedH / num(box.h)));
    const byWeight = num(box.weight) > 0 ? Math.floor(c.max / num(box.weight)) : 0;
    return { ...c, byVolume, byWeight, final: Math.min(byVolume, byWeight) };
  }), [box, util]);

  return (
    <div className="tool-panel">
      <div className="tool-panel-head"><h2>集装箱装载估算</h2><p>按单箱尺寸与重量估算理论装载数量，采用利用率系数模拟实际装箱损耗。</p></div>
      <div className="tool-panel-body">
        <div className="form-grid-3">
          <Field label="单箱长 (cm)" value={box.l} onChange={(v) => setBox({ ...box, l: v })} />
          <Field label="单箱宽 (cm)" value={box.w} onChange={(v) => setBox({ ...box, w: v })} />
          <Field label="单箱高 (cm)" value={box.h} onChange={(v) => setBox({ ...box, h: v })} />
          <Field label="单箱毛重 (kg)" value={box.weight} onChange={(v) => setBox({ ...box, weight: v })} />
          <Field label="空间利用率" value={util} onChange={setUtil} hint="%" />
        </div>
        <div className="result-grid">
          {results.map((c) => (
            <div className="result-card" key={c.name}>
              <span>{c.name} 预估装载</span>
              <strong>{c.final} 箱</strong>
              <small>体积约束 {c.byVolume} · 重量约束 {c.byWeight}</small>
            </div>
          ))}
        </div>
        <div className="tool-explain">
          <h3>估算逻辑</h3>
          <p>工具按集装箱内部尺寸乘以利用率计算可摆放数量，并同时受最大载重限制，取两者的较小值。实际装载还受包装规则、堆叠层数、货物形状、绑扎与重心分布影响。</p>
        </div>
        <div className="tool-warn">以上为理论估算，不能作为订舱或配载依据。实际装箱请以货代/船公司的配载计算与现场装柜情况为准。</div>
      </div>
    </div>
  );
}
