import { ParsedCrisisProtocol, SeverityLevelType } from "../types";

export function parseCrisisProtocol(rawText: string): ParsedCrisisProtocol {
  // Split on single-pound sections (e.g. # Severity Level)
  const sections = rawText.split(/\n?(?=#\s+)/);

  let severity: SeverityLevelType = "UNKNOWN";
  let severityReason = "";
  const immediateActions: string[] = [];
  const whatNotToDo: string[] = [];
  const nextActions: string[] = [];
  const recoveryPlan: string[] = [];
  const helpfulResources: string[] = [];

  for (const s of sections) {
    const trimmed = s.trim();
    if (!trimmed) continue;

    const lines = trimmed.split("\n");
    const headerLine = lines[0].toLowerCase();
    const contentLines = lines.slice(1);

    if (headerLine.includes("severity")) {
      // Find the severity line which would contain "LOW", "MEDIUM", "HIGH", or "CRITICAL"
      for (const line of contentLines) {
        const textLine = line.trim();
        const upper = textLine.toUpperCase();
        
        if (upper.includes("CRITICAL")) {
          severity = "CRITICAL";
        } else if (upper.includes("HIGH")) {
          severity = "HIGH";
        } else if (upper.includes("MEDIUM")) {
          severity = "MEDIUM";
        } else if (upper.includes("LOW")) {
          severity = "LOW";
        }

        if (textLine && !severityReason && !["LOW", "MEDIUM", "HIGH", "CRITICAL"].includes(upper)) {
          severityReason = textLine;
        }
      }
      // Extract severity reason from remaining text if empty
      if (!severityReason) {
        const reasons = contentLines
          .map((l) => l.trim())
          .filter((l) => l && !["LOW", "MEDIUM", "HIGH", "CRITICAL", "# SEVERITY LEVEL"].includes(l.toUpperCase()));
        if (reasons.length > 0) {
          severityReason = reasons.join(" ");
        }
      }
    } else if (headerLine.includes("immediate")) {
      for (const line of contentLines) {
        const item = line.trim().replace(/^\d+\.\s+/, "").replace(/^[-*+]\s+/, "");
        if (item) {
          immediateActions.push(item);
        }
      }
    } else if (headerLine.includes("not do")) {
      for (const line of contentLines) {
        const item = line.trim().replace(/^\d+\.\s+/, "").replace(/^[-*+]\s+/, "");
        if (item) {
          whatNotToDo.push(item);
        }
      }
    } else if (headerLine.includes("next")) {
      for (const line of contentLines) {
        const item = line.trim().replace(/^\d+\.\s+/, "").replace(/^[-*+]\s+/, "");
        if (item) {
          nextActions.push(item);
        }
      }
    } else if (headerLine.includes("recovery")) {
      for (const line of contentLines) {
        const item = line.trim().replace(/^\d+\.\s+/, "").replace(/^[-*+]\s+/, "");
        if (item) {
          recoveryPlan.push(item);
        }
      }
    } else if (headerLine.includes("resource")) {
      for (const line of contentLines) {
        const item = line.trim().replace(/^\d+\.\s+/, "").replace(/^[-*+]\s+/, "");
        if (item) {
          helpfulResources.push(item);
        }
      }
    }
  }

  // Fallback pattern if Markdown sections weren't perfectly parsed
  if (severity === "UNKNOWN") {
    const rawUpper = rawText.toUpperCase();
    if (rawUpper.includes("CRITICAL")) severity = "CRITICAL";
    else if (rawUpper.includes("HIGH")) severity = "HIGH";
    else if (rawUpper.includes("MEDIUM")) severity = "MEDIUM";
    else if (rawUpper.includes("LOW")) severity = "LOW";
  }

  // Ensure clean severity reason (removing lone severity badge words from it)
  if (severityReason) {
    severityReason = severityReason.replace(/^(LOW|MEDIUM|HIGH|CRITICAL)\s*:\s*/i, "").replace(/^(LOW|MEDIUM|HIGH|CRITICAL)\b/i, "").trim().replace(/^[-–—]\s*/, "");
  }

  return {
    severity,
    severityReason: severityReason || "Evaluate the emergency scenario meticulously and secure your accounts immediately.",
    immediateActions: immediateActions.length > 0 ? immediateActions : [
      "Secure compromised systems or accounts and disconnect them from local networks.",
      "Gather evidence: take screenshots, save logs, and record precise timestamps.",
      "Notify key financial institutions if payment cards or credentials were lost."
    ],
    whatNotToDo: whatNotToDo.length > 0 ? whatNotToDo : [
      "Do not send money, key deposits, or digital tokens to anyone claiming a solution.",
      "Do not verify identity codes or 2-Factor logs through unsecured links.",
      "Do not panic write or make aggressive claims on compromised accounts."
    ],
    nextActions: nextActions.length > 0 ? nextActions : [
      "Change primary email passwords and revoke active login sessions on online apps.",
      "Establish authentic 2FA hardware keys or offline authenticator programs.",
      "Notify direct circles (friends, family, office) so they recognize potential phishing spoof attempts."
    ],
    recoveryPlan: recoveryPlan.length > 0 ? recoveryPlan : [
      "Audit active login credentials across all internet websites weekly.",
      "Set up automatic data backups on isolated drives."
    ],
    helpfulResources: helpfulResources.length > 0 ? helpfulResources : [
      "Have a trusted team member verify any outstanding claim.",
      "Report online fraud directly to your national security authority."
    ],
    rawText
  };
}
