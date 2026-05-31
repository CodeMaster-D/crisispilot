import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

function getOfflineEmergencyProtocol(problemStr: string): string {
  const p = problemStr.toLowerCase();
  
  if (p.includes("hack") || p.includes("ig") || p.includes("instagram") || p.includes("email") || p.includes("pass") || p.includes("account") || p.includes("breach") || p.includes("compromised")) {
    return `# Severity Level
HIGH
[Local Standby Safety Mode Activated] Your account credentials or sessions have been compromised. Immediate action is required to prevent secondary identity fraud and lock hackers out.

# Immediate Actions (0–5 Minutes)
1. **Initiate Password Resets** immediately on your primary email account associated with the hacked portal.
2. **Log out of all active sessions** via the 'Security & Login' page on your platforms.
3. **Set up multi-factor authentication (MFA)** using authenticator apps like Google Authenticator, not SMS if possible.
4. **Notify trusted contacts** by other means that your account is compromised to prevent them from clicking suspicious links.
5. **Take screenshots** of unauthorized messages, posts, or altered bio details to preserve evidence.

# What NOT To Do
- **Do not purchase recovery services** from third-party Instagram/Facebook hackers claiming to help on social media. They are scams.
- **Do not use the same password** for any secondary online services.
- **Do not click confirmation links** sent to your secondary recovery methods if you did not initiate them.

# Next Actions (5–30 Minutes)
1. **Contact official support/identity verification** channels for the platform (e.g. instagram.com/hacked).
2. **Check your primary email forwarding settings** to ensure hackers did not configure copies of your correspondence to be diverted.
3. **Lock credit/debit cards** linked to the platform stores or app payment profiles.

# Recovery Plan
1. **Install an authentic credential vault (Password Manager)** like Bitwarden or 1Password.
2. **Revoke all third-party app permissions** linked to your social profiles.
3. **Regularly search secure directory indexes** for leaked credentials in past corporate database exposures.

# Helpful Resources
- Platform Security Support Center
- IdentityTheft.gov Protection Guide
- National Cyber Threat Response Council`;
  }

  if (p.includes("phone") || p.includes("hp") || p.includes("iphone") || p.includes("android") || p.includes("stolen") || p.includes("lost") || p.includes("subway") || p.includes("stolen")) {
    return `# Severity Level
HIGH
[Local Standby Safety Mode Activated] A physical device containing digital identities, active banking applications, and primary authenticators is missing or stolen. Containment is high priority.

# Immediate Actions (0–5 Minutes)
1. **Use Find My (Apple) or Find My Device (Android)** on another browser or device to remotely trigger Lost Mode.
2. **Erase the device remotely** immediately if you suspect retrieval is impossible or unauthorized users are accessing card drawers.
3. **Call your cellular service operator** to block the SIM card and prevent intercepting 2FA SMS security codes.
4. **Launch banking apps on a secondary machine** or call bank hotlines to disable temporary card access.

# What NOT To Do
- **Do not reply to text messages or phishy emails** claiming your lost phone was found at a custom link. These are traps to get your passcode.
- **Do not attempt to confront thieves or track down the physical coordinate yourself**; notify authorized officers instead.
- **Do not post your lost phone details** alongside personal phone numbers on online social feeds.

# Next Actions (5–30 Minutes)
1. **Change passwords** for your primary email accounts, iCloud, Google Account, and online banking instantly.
2. **De-register the stolen device identity** from two-factor authenticated account settings.
3. **Notify relative circles** that your phone was stolen and scammers may send requests posing as you.

# Recovery Plan
1. **Enable secure device passcodes** (use 6 digits or complex alphanumeric keys rather than simple patterns).
2. **Write down your IMEI number** and hardware serial identification tags inside a secure paper catalog.
3. **Store critical 2FA backup codes** offline in a fireproof secure chest.

# Helpful Resources
- Apple Find My Support / iCloud web console
- Google Find My Device web recovery console
- Local Cellular Carrier Emergency Hotline Number`;
  }

  if (p.includes("scam") || p.includes("phish") || p.includes("wire") || p.includes("money") || p.includes("credit") || p.includes("bank") || p.includes("dhl") || p.includes("card") || p.includes("phishing") || p.includes("fraud")) {
    return `# Severity Level
CRITICAL
[Local Standby Safety Mode Activated] Active financial details, credential forms, or authorization secrets are being intercepted. Quick financial containment is mandatory.

# Immediate Actions (0–5 Minutes)
1. **Freeze or lock all your banking cards** inside your mobile bank application immediately.
2. **Contact your bank's emergency hotline** and report active financial identity exposure or card leaks.
3. **Do not send any code sequence** (OTP, SMS tokens, pin numbers) to anybody claiming to represent dispatchers or agencies.
4. **Capture screen copies** of the scam message, link domain, transferred balances, and sender profile numbers.

# What NOT To Do
- **Do not transfer any further digital tokens** or funds to solve outstanding customs clearance claims or emergency fines.
- **Do not trust inbound phone calls** from official-looking support numbers. Hang up and dial the bank's official printed card hotline.
- **Do not enter confidential updates** into sites reached via random text links.

# Next Actions (5–30 Minutes)
1. **Reset primary bank interface passcodes** via the authentic application portal.
2. **Notify national fraud prevention entities** or police cyber-crime centers immediately.
3. **Cancel leaked credit draft numbers** and request physical card replacements from authorization teams.

# Recovery Plan
1. **Configure transactional notification limits** to require personal confirmation steps.
2. **Audit online security codes** and update contact address records with your home institutions.

# Helpful Resources
- National Anti-Phishing Working Group (APWG)
- Bank Emergency Prevention hotline of your card provider
- Federal Trade Commission (FTC) Identity Recovery Web Portal`;
  }

  if (p.includes("malware") || p.includes("ransomware") || p.includes("virus") || p.includes("laptop") || p.includes("pc") || p.includes("macbook") || p.includes("computer") || p.includes("locked")) {
    return `# Severity Level
CRITICAL
[Local Standby Safety Mode Activated] Active malware or screen-locking ransomware operates on your system, risking personal data exfiltration and credential loss.

# Immediate Actions (0–5 Minutes)
1. **Unplug your network line** or shut down the Wi-Fi card immediately to break local LAN communication.
2. **Do not execute system updates** or click popups appearing on the frozen desk.
3. **Disconnect external USB physical storage keys** or expansion drives to prevent ransomware encryption spreads.
4. **Power down your computer** if active file renaming or rapid disk encryption is observed.

# What NOT To Do
- **Do not pay the ransom** requested in BTC or crypto tokens; attackers often demand secondary payments without sending codes.
- **Do not download unverified malware tools** on the compromised machine; use clean secondary computers instead.
- **Do not plug in remote hard drives** to check if backup sets are safe while the ransomware process is active.

# Next Actions (5–30 Minutes)
1. **Use a clean, secure physical secondary computing terminal** to update credentials for high-sensitivity targets (financials, primary emails).
2. **Identify ransomware file extensions** via official computer-threat documentation engines (e.g., No More Ransom project).
3. **Take a photo of the extortion screen** and warning logs as evidence.

# Recovery Plan
1. **Structure offline periodic multi-layer backups** employing clean local physical write-once disks.
2. **Deploy multi-factor hardware security tokens** on main cloud identity servers.

# Helpful Resources
- No More Ransom Project Portal
- Cybersecurity and Infrastructure Security Agency (CISA)
- Certified Computer Malware Eradication Specialists`;
  }

  // General Emergency Fallback
  return `# Severity Level
HIGH
[Local Standby Safety Mode Activated] Critical emergency threat reported. Standby guidelines generated via localized triage parser.

# Immediate Actions (0–5 Minutes)
1. **Isolate primary digital assets** and turn off internet connectivity if under cyber assault.
2. **Notify security representatives** or call official financial institution hotlines if cash systems leak.
3. **Capture screens** of all threat windows, chats, transaction receipts, and phone numbers.
4. **Avoid inputting any security keys** or email authentication tokens into secondary links.

# What NOT To Do
- **Do not perform immediate asset wire allocations** under distress or high pressure.
- **Do not trust unverified incoming support calls** claiming to represent active response agencies.
- **Do not delete evidence files**, logs, or chats; keep them secure.

# Next Actions (5–30 Minutes)
1. **Identify the true severity** of the incident by talking with official representatives from verified direct connections.
2. **Rotate primary login passwords** on key servers (Email, Finance) using separate secure hardware.
3. **Notify close relations or workplace offices** to avoid phishing attempts posing as you.

# Recovery Plan
1. **Consolidate multi-factor security certificates** onto offline keys.
2. **Pre-install standard antivirus monitors** and schedule automatic scans.

# Helpful Resources
- Government Cyber Security Center
- Bank Fraud Advisory Support Offices
- Verified Emergency Response Agencies`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // API endpoint for analyzing emergency problems
  app.post("/api/analyze", async (req, res) => {
    const { problem } = req.body;
    if (!problem || typeof problem !== "string") {
      res.status(400).json({ error: "Emergency issue description is required." });
      return;
    }

    try {
      // Explicit instruction to structure output with Markdown
      const systemInstruction = `You are CrisisPilot AI. You are a serious, professional, and reliable emergency decision assistant designed for users experiencing high stress, panic, confusion, cyber incidents, or urgent personal crises.
Your mission is to help users think clearly and act safely under pressure.

RULES FOR TONALITY AND STRUCTURE:
1. Use calm, plain-spoken, direct, and structured language.
2. Never output long essays, general intros, or reassuring fluff. Jump immediately into the action.
3. Prioritize step-by-step, actionable safety.
4. When uncertainty exists, say so clearly.
5. Avoid fearmongering, sensationalism, or triggering excess panic.
6. Keep lines relatively short and highly readable.
7. Always prioritize human life, safety, and legal/financial containment in the first steps.

You MUST always format your response with the following EXACT headers in Markdown:

# Severity Level
[Must write EXACTLY one of: LOW, MEDIUM, HIGH, or CRITICAL on its own line]
Provide a 1-2 sentence sober explanation of why this severity level applies.

# Immediate Actions (0–5 Minutes)
Provide 3 to 7 short, numbered, concrete action items. Use bold key terms for high readability. (e.g. "1. **Lock credit cards** immediately using your mobile app.")

# What NOT To Do
Provide 3 to 5 clear bullet points of common mistakes, panic reactions, or dangerous errors to avoid. (e.g. "- **Do not transfer funds** to anyone claiming to represent 'police' via chat.")

# Next Actions (5–30 Minutes)
Provide 3 to 5 logical next steps for containment, reporting, or systematic resolution.

# Recovery Plan
Provide 2 to 3 longer-term mitigation, security settings, or backup measures.

# Helpful Resources
Offer 2 to 3 trusted entities, standard official contact protocols, or URLs where the user can seek official help relative to this issue (e.g., "Anti-Phishing Working Group (APWG)", "Official platform support page", "National Hotline"). Do not invent fake phone numbers; name the official institution or portal name.

Do not write cover text or intro paragraphs. Start immediately with '# Severity Level'.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: problem,
        config: {
          systemInstruction,
          temperature: 0.15,
        },
      });

      const text = response.text || "";
      res.json({ text, isFallback: false });
    } catch (error: any) {
      console.warn("Gemini API server-side analysis failed due to high demand/rate limits. Activating Local Standby Safety Mode fallback.", error);
      
      const fallbackText = getOfflineEmergencyProtocol(problem);
      res.json({ text: fallbackText, isFallback: true });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CrisisPilot server running on http://localhost:${PORT}`);
  });
}

startServer();
