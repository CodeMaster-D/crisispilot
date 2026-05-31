import { EmergencyTemplate } from "../types";

export const EMERGENCY_TEMPLATES: EmergencyTemplate[] = [
  {
    id: "account-hacked",
    title: "Account Hacked",
    description: "Your social media, email, or online accounts were breached or compromised.",
    category: "cyber",
    samplePrompt: "My Instagram and primary email accounts were hacked. The passwords have been changed, and someone is posting spam under my name.",
  },
  {
    id: "phone-lost",
    title: "Phone Lost / Stolen",
    description: "Your mobile device is missing, stolen, or compromised in public.",
    category: "device",
    samplePrompt: "My iPhone (containing bank apps and 2FA credentials) was stolen from my hand while unlocked on the subway.",
  },
  {
    id: "scam-attack",
    title: "Scam / Phishing Attack",
    description: "You click on a suspicious link, key in info, or suspect phone fraud identity theft.",
    category: "scam",
    samplePrompt: "I clicked on a link in an SMS claiming to be DHL, entered my phone number, full name, and national ID number on the form.",
  },
  {
    id: "laptop-malware",
    title: "Laptop Malware / Ransomware",
    description: "Laptop screen locked, files encrypted, or sudden remote control access behavior.",
    category: "cyber",
    samplePrompt: "A screen takeover appeared on my computer claiming all files are locked with ransomware, demanding Bitcoin to retrieve documents.",
  },
  {
    id: "data-leak",
    title: "Personal Data Leak",
    description: "Your files, passwords, or personal databases appear on search/leaks web index.",
    category: "cyber",
    samplePrompt: "I received an email verification that my sensitive corporate files, credit card digits, and home address were leaked on a dark web pastebin.",
  },
  {
    id: "financial-fraud",
    title: "Financial Fraud",
    description: "Unauthorized transactions on your credit card or suspect bank wire scam.",
    category: "financial",
    samplePrompt: "I noticed unauthorized high-value card charges from another country on my bank app, and my bank account balance dropped suddenly.",
  },
];
