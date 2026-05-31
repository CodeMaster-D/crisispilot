export interface EmergencyTemplate {
  id: string;
  title: string;
  description: string;
  category: "cyber" | "device" | "scam" | "physical" | "financial";
  samplePrompt: string;
}

export type SeverityLevelType = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "UNKNOWN";

export interface ParsedCrisisProtocol {
  severity: SeverityLevelType;
  severityReason: string;
  immediateActions: string[];
  whatNotToDo: string[];
  nextActions: string[];
  recoveryPlan: string[];
  helpfulResources: string[];
  rawText: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  section: "immediate" | "next" | "recovery";
}
