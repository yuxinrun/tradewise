## 一、业务背景：报价单是一份小型合同

很多新手把报价单当成「报个数字」的邮件正文。实际上，客户会把你的报价单存档、内部审批、与其他供应商比较，甚至作为后续合同的基础。报价单写得不清楚，后续争议几乎不可避免。

一份专业的报价单，至少要让客户看清楚：你报的是什么、包含什么、不包含什么、什么条件下有效。

## 二、报价单必备字段

| 字段 | 说明 | 常见错误 |
| --- | --- | --- |
| 抬头 | 卖方名称、地址、联系方式 | 只有个人签名，无公司信息 |
| 客户信息 | 公司名、联系人 | 写错公司名或拼写 |
| 报价编号与日期 | 便于版本管理 | 无编号，多次报价无法区分 |
| 产品明细 | 品名、规格、图片编号、单位 | 规格过于笼统 |
| 数量与单价 | 清晰列出币种 | 币种不明，如 "price 5.2" |
| 总价 | 数量 × 单价 | 计算错误 |
| 价格条款 | FOB/CIF/DDP + 地点 + Incoterms® 2020 | 只写 FOB，不写港口 |
| 包装与交期 | 包装方式、交货时间 | 未说明交期起算条件 |
| 付款方式 | 定金比例、尾款节点 | 只写 T/T，不写节点 |
| 有效期 | 报价有效时间 | 无有效期，原材料涨价只能自己承担 |
| 备注 | 包含/不包含项、验货标准 | 未说明是否含认证、模具费 |

## 三、价格条款怎么写

Incoterms® 2020 必须由三个部分组成：**术语 + 指定地点 + 版本**。

正确写法：

- FOB Shenzhen, Incoterms® 2020
- CIF Hamburg, Incoterms® 2020
- EXW Dongguan Factory, Incoterms® 2020
- DAP Dubai, Incoterms® 2020

<div class="warn">
<strong>常见错误：</strong>只写 "FOB China" 或 "CIF price"。FOB 后面必须指定装运港，CIF 后面必须指定目的港。术语不完整会导致费用与责任划分产生争议。
</div>

提醒：FOB、CFR、CIF 只适用于海运或内河运输；集装箱运输和多式联运通常更推荐 FCA、CPT、CIP。具体内容以 ICC 官方规则为准。

## 四、报价策略：不是越低越好

### 1. 阶梯报价

按数量设置价格档位，既体现规模经济，也给客户加单理由：

```text
1,000–2,999 pcs: USD 4.20/pc
3,000–9,999 pcs: USD 3.95/pc
10,000 pcs above: USD 3.78/pc
```

### 2. 选项报价

提供基础版与升级版，避免客户只盯着一个价格：

```text
Option A: standard packaging, USD 3.95/pc
Option B: gift box with custom logo, USD 4.25/pc
```

### 3. 留有余量

报价要考虑汇率波动、原材料涨价与物流变化。不要把盈亏平衡价直接报给客户。

<div class="tip">
<strong>经验建议：</strong>如果客户一味压价，不要直接降同一个报价，而是讨论调整配置、包装、数量或付款方式。让价格变化对应具体条件的改变。
</div>

## 五、英文报价邮件模板（可复制）

```text
Subject: Quotation [No.] – [Product] – [Your Company]

Dear [Name],

Thank you for your inquiry dated [date]. Please find our quotation below:

Product: [Product name & model]
Specification: [Key specifications]
Quantity: [Qty] pcs
Unit price: USD [price] / pc
Total amount: USD [total]
Price term: FOB [Port], Incoterms® 2020
Packing: [Packing details]
Lead time: [X] days after deposit and artwork confirmation
Payment: [30% T/T deposit, 70% before shipment]
Validity: [15] days from the date above

The above price [includes / excludes] [specific items]. Any changes in specification, quantity or destination may affect the final price.

Should you have any questions, please feel free to contact me.

Best regards,
[Name]
[Company]
```

## 六、报价中的风险条款

以下情况必须在报价中明确写出：

- 模具费、打样费是否包含，何时退还
- 认证费用由谁承担
- 超出约定包装或规格的加价机制
- 原材料价格大幅波动时的重新议价权
- 客户自备设计导致的知识产权责任划分
- 验货标准与允许的不良率

<div class="warn">
<strong>重要：</strong>报价中的「不包含」项和「包含」项同样重要。例如 CIF 报价中，卖方购买最低险别保险，但不代表承担所有运输风险——风险仍在货物装上船时转移给买方（Incoterms® 2020）。
</div>

## 七、模拟案例：一次报价的版本管理（模拟教学案例）

以下为**模拟教学案例**，企业、金额与结果均为教学设定。

西班牙客户询问一款厨房收纳架，首轮报 FOB 宁波 USD 6.20/件，有效期 15 天。客户一周后要求改成 CIF Valencia，并询问是否含安装说明书。

业务员做了三件事：

1. 新建报价编号 QT-2026-0418-V2，保留 V1 记录；
2. 重新核算 CIF 价格，加入运费与保险，报价 USD 7.05/件；
3. 在备注中写明：含英文/西语说明书，不含当地认证费用。

客户据此内部审批通过。版本清晰让双方都能追踪价格变化原因，避免后续争议。

## 八、常见错误

<div class="warn">
<strong>1. 币种不明。</strong>"Price: 5.2" 是重大隐患，必须写 USD / EUR 等。
</div>
<div class="warn">
<strong>2. 价格条款不完整。</strong>FOB 不写港口，CIF 不写目的港。
</div>
<div class="warn">
<strong>3. 忘记写有效期。</strong>汇率或原料涨价时，你只能自己消化损失。
</div>
<div class="warn">
<strong>4. 报价单与实际产能不符。</strong>客户下单后发现交期或认证无法兑现，信任崩塌。
</div>

## 九、FAQ

<details><summary>应该报 FOB 还是 CIF？</summary><div>取决于客户要求与你掌控物流的能力。FOB 下买方安排海运，卖方责任止于装船；CIF 下卖方支付运费与保险，但风险仍在装船时转移。根据你的物流资源与客户习惯选择。</div></details>

<details><summary>报价单需要盖章吗？</summary><div>正式报价通常可加盖公司章或电子签名，特别是客户要用于内部审批时。具体形式以客户要求与公司政策为准。</div></details>

<details><summary>客户要求报价包含 DDP 到门，能做吗？</summary><div>需要评估你是否能合法完成目的国进口清关与税务处理。很多出口方无法直接办理，需借助当地代理。不要在不确定的情况下承诺 DDP。</div></details>

## 十、延伸阅读与官方参考

- 本站：工具中心「外贸报价单生成器」「外贸利润计算器」
- 本站：《Incoterms 2020 贸易术语速查》《PI、Commercial Invoice、Packing List 与 Sales Contract 详解》
- ICC Incoterms 官方信息：https://iccwbo.org/business-solutions/incoterms-rules/

<div class="note">
<strong>内容更新时间：</strong>2026-11-17。贸易术语以 ICC 官方规则为准，最后核验：2026-11-21。
</div>
