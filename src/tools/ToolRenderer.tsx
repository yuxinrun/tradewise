import { ProfitCalculator, ExchangeTool, FOBCalculator, CBMMCalculator, ContainerEstimator } from './Calculators';
import { QuotationGenerator, ColdEmailGenerator, InquiryTemplate, DocumentChecklist, FollowupRecord } from './BusinessTools';
import { HSCodeTool, IncotermsTool } from './ReferenceTools';

export default function ToolRenderer({ id }: { id: string }) {
  switch (id) {
    case 'profit-calculator': return <ProfitCalculator />;
    case 'exchange-tool': return <ExchangeTool />;
    case 'fob-calculator': return <FOBCalculator />;
    case 'cbm-calculator': return <CBMMCalculator />;
    case 'container-estimator': return <ContainerEstimator />;
    case 'quotation-generator': return <QuotationGenerator />;
    case 'cold-email-generator': return <ColdEmailGenerator />;
    case 'inquiry-template': return <InquiryTemplate />;
    case 'document-checklist': return <DocumentChecklist />;
    case 'followup-record': return <FollowupRecord />;
    case 'hs-code': return <HSCodeTool />;
    case 'incoterms-lookup': return <IncotermsTool />;
    default: return null;
  }
}
