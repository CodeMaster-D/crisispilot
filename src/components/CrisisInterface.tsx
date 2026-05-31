import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  X,
  Play,
  ArrowRight,
  Lock,
  Smartphone,
  Laptop,
  CreditCard,
  Database,
  ShieldAlert,
  AlertOctagon,
  Square,
  CheckSquare,
  RefreshCw,
  Compass,
  Info
} from "lucide-react";
import { parseCrisisProtocol } from "../utils/parser";
import { EMERGENCY_TEMPLATES } from "../data/templates";
import { ParsedCrisisProtocol, ChecklistItem, SeverityLevelType } from "../types";

export default function CrisisInterface() {
  // UI inputs
  const [problemText, setProblemText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Results State
  const [protocol, setProtocol] = useState<ParsedCrisisProtocol | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [panicMode, setPanicMode] = useState(false);
  const [isFallbackMode, setIsFallbackMode] = useState(false);

  // Load active session from local storage on mount
  useEffect(() => {
    try {
      const savedProtocol = localStorage.getItem("crisis_pilot_protocol");
      const savedChecklist = localStorage.getItem("crisis_pilot_checklist");
      const savedProblem = localStorage.getItem("crisis_pilot_problem");
      const savedPanic = localStorage.getItem("crisis_pilot_panic_mode");
      const savedFallback = localStorage.getItem("crisis_pilot_fallback");

      if (savedProtocol) {
        setProtocol(JSON.parse(savedProtocol));
      }
      if (savedChecklist) {
        setChecklist(JSON.parse(savedChecklist));
      }
      if (savedProblem) {
        setProblemText(savedProblem);
      }
      if (savedPanic) {
        setPanicMode(JSON.parse(savedPanic));
      }
      if (savedFallback) {
        setIsFallbackMode(JSON.parse(savedFallback));
      }
    } catch (e) {
      console.warn("Could not load backup localStorage session:", e);
    }
  }, []);

  // Save changes to local storage
  const saveStateToLocalStorage = (
    proto: ParsedCrisisProtocol | null,
    chk: ChecklistItem[],
    prob: string,
    panic: boolean,
    fallback: boolean = isFallbackMode
  ) => {
    try {
      if (proto) {
        localStorage.setItem("crisis_pilot_protocol", JSON.stringify(proto));
      } else {
        localStorage.removeItem("crisis_pilot_protocol");
      }

      if (chk.length > 0) {
        localStorage.setItem("crisis_pilot_checklist", JSON.stringify(chk));
      } else {
        localStorage.removeItem("crisis_pilot_checklist");
      }

      localStorage.setItem("crisis_pilot_problem", prob);
      localStorage.setItem("crisis_pilot_panic_mode", JSON.stringify(panic));
      localStorage.setItem("crisis_pilot_fallback", JSON.stringify(fallback));
    } catch (e) {
      console.warn("Could not write session state to localStorage:", e);
    }
  };

  const handleAnalyze = async (textToSubmit: string) => {
    const query = textToSubmit.trim();
    if (!query) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem: query }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned error code: ${response.status}`);
      }

      const data = await response.json();
      if (!data.text) {
        throw new Error("Received an empty response from the crisis engine.");
      }

      const parsed = parseCrisisProtocol(data.text);
      setProtocol(parsed);
      const isFallback = !!data.isFallback;
      setIsFallbackMode(isFallback);

      // Construct a new checklist based on parsed steps
      const newChecklist: ChecklistItem[] = [];
      parsed.immediateActions.forEach((item, index) => {
        newChecklist.push({
          id: `immediate-${index}`,
          text: item,
          completed: false,
          section: "immediate",
        });
      });

      parsed.nextActions.forEach((item, index) => {
        newChecklist.push({
          id: `next-${index}`,
          text: item,
          completed: false,
          section: "next",
        });
      });

      parsed.recoveryPlan.forEach((item, index) => {
        newChecklist.push({
          id: `recovery-${index}`,
          text: item,
          completed: false,
          section: "recovery",
        });
      });

      setChecklist(newChecklist);
      saveStateToLocalStorage(parsed, newChecklist, query, panicMode, isFallback);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to contact safety server. Please check connection and retry.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleChecklist = (id: string) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    saveStateToLocalStorage(protocol, updated, problemText, panicMode, isFallbackMode);
  };

  const handleResetChecklist = () => {
    const updated = checklist.map((item) => ({ ...item, completed: false }));
    setChecklist(updated);
    saveStateToLocalStorage(protocol, updated, problemText, panicMode, isFallbackMode);
  };

  const handleTogglePanicMode = () => {
    const newPanic = !panicMode;
    setPanicMode(newPanic);
    saveStateToLocalStorage(protocol, checklist, problemText, newPanic, isFallbackMode);
  };

  const handleClearAll = () => {
    setProtocol(null);
    setChecklist([]);
    setProblemText("");
    setError(null);
    setIsFallbackMode(false);
    localStorage.removeItem("crisis_pilot_protocol");
    localStorage.removeItem("crisis_pilot_checklist");
    localStorage.removeItem("crisis_pilot_problem");
    localStorage.removeItem("crisis_pilot_fallback");
  };

  const getSeverityStyles = (level: SeverityLevelType) => {
    switch (level) {
      case "CRITICAL":
        return {
          bg: "bg-[#7F1D1D]/10",
          border: "border-[#7F1D1D]",
          text: "text-[#7F1D1D]",
          badgeBg: "bg-[#7F1D1D]",
          badgeText: "text-white",
          label: "CRITICAL THREAT",
        };
      case "HIGH":
        return {
          bg: "bg-[#DC2626]/10",
          border: "border-[#DC2626]",
          text: "text-[#DC2626]",
          badgeBg: "bg-[#DC2626]",
          badgeText: "text-white",
          label: "HIGH THREAT",
        };
      case "MEDIUM":
        return {
          bg: "bg-[#D97706]/10",
          border: "border-[#D97706]",
          text: "text-[#D97706]",
          badgeBg: "bg-[#D97706]",
          badgeText: "text-white",
          label: "MEDIUM RISK",
        };
      case "LOW":
        return {
          bg: "bg-[#15803D]/10",
          border: "border-[#15803D]",
          text: "text-[#15803D]",
          badgeBg: "bg-[#15803D]",
          badgeText: "text-white",
          label: "LOW RISK",
        };
      default:
        return {
          bg: "bg-neutral-100",
          border: "border-neutral-300",
          text: "text-neutral-700",
          badgeBg: "bg-neutral-600",
          badgeText: "text-white",
          label: "UNKNOWN THREAT",
        };
    }
  };

  const getTemplateIcon = (category: string) => {
    switch (category) {
      case "cyber":
        return <ShieldAlert className="w-5 h-5 text-neutral-800" />;
      case "device":
        return <Smartphone className="w-5 h-5 text-neutral-800" />;
      case "scam":
        return <AlertTriangle className="w-5 h-5 text-neutral-800" />;
      case "financial":
        return <CreditCard className="w-5 h-5 text-neutral-800" />;
      default:
        return <Database className="w-5 h-5 text-neutral-800" />;
    }
  };

  // Helper to format bold words inside checklists: looks for **text**
  const renderTextWithFormatting = (text: string, isBig: boolean = false) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
      <span className={isBig ? "text-lg md:text-xl font-medium tracking-tight text-neutral-900" : "text-sm text-neutral-800 leading-relaxed"}>
        {parts.map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={i} className="font-semibold text-neutral-900 underline decoration-neutral-200">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </span>
    );
  };

  // Immediate checklist items
  const immediateItems = checklist.filter((item) => item.section === "immediate");
  const nextItems = checklist.filter((item) => item.section === "next");
  const recoveryItems = checklist.filter((item) => item.section === "recovery");

  const completedCount = checklist.filter((item) => item.completed).length;
  const totalCount = checklist.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#111111] selection:bg-neutral-200 antialiased">
      {/* Absolute Utility Bar */}
      <header className="sticky top-0 z-50 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-neutral-900 animate-pulse" />
            <button
              onClick={handleClearAll}
              className="text-sm font-bold tracking-wider text-neutral-900 hover:text-neutral-700 transition-colors uppercase"
            >
              CrisisPilot
            </button>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-[#666666] tracking-widest border border-neutral-200">
              MVP READY
            </span>
          </div>

          <div className="flex items-center gap-4">
            {protocol && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-[#666666] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                CHECKLIST PROGRESS: {completedCount}/{totalCount} ({progressPercent}%)
              </div>
            )}

            {/* Strict Theme Panic Toggle */}
            <button
              onClick={handleTogglePanicMode}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase border rounded transition-all flex items-center gap-2 ${
                panicMode
                  ? "bg-[#DC2626] border-[#DC2626] text-white animate-pulse"
                  : "bg-white border-neutral-300 text-[#111111] hover:border-neutral-500"
              }`}
              title="Panic Mode limits distractions and displays key checklist points using large print."
            >
              <AlertOctagon className={`w-3.5 h-3.5 ${panicMode ? "text-white" : "text-[#666666]"}`} />
              PANIC MODE: {panicMode ? "ACTIVE" : "OFF"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        
        {/* VIEW 1: Input Landing Page (No protocol analyzed yet) */}
        {!protocol ? (
          <div className="space-y-10 animate-fadeIn">
            
            {/* Minimal & focused Headline */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#666666] bg-white px-2 py-1 rounded border border-neutral-200">
                <Compass className="w-3.5 h-3.5 text-neutral-700" />
                Urgent Incident Coordinator
              </div>
              <h1 className="text-3xl md:text-5xl font-normal tracking-tight text-neutral-900 max-w-2xl">
                Contain emergencies when thinking is hard.
              </h1>
              <p className="text-neutral-600 max-w-xl text-base leading-relaxed">
                Choose a preset scenario card below or describe your emergency in detail. CrisisPilot structures a clean 0-to-30 minute containment workflow so you can secure assets immediately.
              </p>
            </div>

            {/* Error Message Box */}
            {error && (
              <div className="p-4 bg-red-50 border border-neutral-200 text-neutral-950 flex items-start gap-3 rounded-lg text-sm">
                <AlertCircle />
                <div className="flex-1">
                  <h4 className="font-semibold text-[#DC2626] mb-1">Analysis Interrupted</h4>
                  <p className="text-neutral-700">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="text-neutral-500 hover:text-neutral-900">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Big Action Input Textarea */}
            <div className="bg-white border border-neutral-200 rounded-xl p-5 md:p-6 space-y-4 shadow-sm">
              <label htmlFor="emergency-textarea" className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                Describe your current crisis:
              </label>
              <textarea
                id="emergency-textarea"
                rows={4}
                className="w-full text-base bg-[#FAFAFA] border border-neutral-300 rounded-lg p-3 text-[#111111] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-all font-sans leading-relaxed resize-none"
                placeholder="Examples: 'My social credentials were stolen by phishing', 'My financial digits are leaking', 'Laptop files lock screen ransomware'..."
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                disabled={isLoading}
              />
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <p className="text-[11px] text-[#666666] leading-relaxed max-w-md flex items-center gap-2">
                  <Info className="w-4 h-4 text-neutral-500 shrink-0" />
                  No personal names, raw accounts, or keys are routed. Standard Gemini security policies apply.
                </p>

                <button
                  onClick={() => handleAnalyze(problemText)}
                  disabled={isLoading || !problemText.trim()}
                  className={`px-5 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 select-none shrink-0 ${
                    isLoading || !problemText.trim()
                      ? "bg-neutral-200 text-neutral-400 cursor-not-allowed border border-neutral-300"
                      : "bg-[#111111] text-white hover:bg-neutral-800 border border-neutral-900 shadow-sm"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-neutral-400" />
                      ANALYZING CRISIS...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      GENERATE PROTOCOL
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Cards Grid */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#666666] border-b border-neutral-200 pb-2">
                Quick Recovery Guidelines Templates
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {EMERGENCY_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => {
                      setProblemText(tpl.samplePrompt);
                      handleAnalyze(tpl.samplePrompt);
                    }}
                    disabled={isLoading}
                    className="bg-white border border-neutral-200 rounded-xl p-4 text-left transition-all hover:border-neutral-500 hover:shadow-md cursor-pointer flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-neutral-100 group-hover:bg-neutral-200 transition-colors">
                          {getTemplateIcon(tpl.category)}
                        </div>
                        <h4 className="font-semibold text-sm leading-tight text-neutral-900 group-hover:underline">
                          {tpl.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#666666] leading-relaxed">
                        {tpl.description}
                      </p>
                    </div>
                    <div className="flex items-center text-[11px] font-bold text-neutral-900 gap-1 pt-1">
                      RUN ACTION MAP
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Anti-AI Bloat Disclaimer */}
            <footer className="pt-8 border-t border-neutral-200 text-xs text-[#666666] space-y-2">
              <p>
                <strong>CrisisPilot (PanicAI) is a non-commercial open-source emergency utility.</strong> It structures action directives derived via generative intelligence models.
              </p>
              <p>
                No user identities, account numbers, financial details, or raw secrets should ever be typed into the input field. Do not defer calling certified local first responders, official bank support offices, or cyber task fleets if immediate human threat or extreme legal asset loss occurs.
              </p>
            </footer>

          </div>
        ) : (
          
          /* VIEW 2: Crisis protocol rendering */
          <div className="space-y-6">
            
            {/* Nav Back Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 pb-4 gap-4">
              <button
                onClick={handleClearAll}
                className="text-xs font-bold tracking-widest text-[#666666] hover:text-neutral-900 transition-all uppercase flex items-center gap-1.5 self-start"
              >
                <X className="w-4 h-4 text-neutral-700" />
                EXIT PROTOCOL & INPUT NEW THREAT
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetChecklist}
                  className="px-3 py-1 bg-white border border-neutral-300 text-[11px] font-bold uppercase tracking-wider text-neutral-700 hover:border-neutral-500 rounded transition-colors"
                >
                  RESET PROGRESS
                </button>
              </div>
            </div>

            {/* Problem Info bar */}
            <div className="bg-white border border-neutral-200 p-4 rounded-xl shadow-sm text-sm">
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#666666] block mb-1">
                ANALYZED INCIDENT TYPE:
              </span>
              <p className="text-neutral-800 font-sans italic truncate">
                &quot;{problemText}&quot;
              </p>
            </div>

            {/* Standby Fallback Mode Notice Banner */}
            {isFallbackMode && (
              <div className="bg-[#D97706]/5 border border-[#D97706]/30 text-amber-950 p-4 rounded-xl flex items-start gap-3 text-sm">
                <AlertOctagon className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="font-bold text-[#D97706] uppercase tracking-wide text-xs">LOCAL STANDBY ENGINE ACTIVATED</h4>
                  <p className="text-neutral-700 leading-relaxed text-xs">
                    The external cloud model is experiencing temporary busy periods. CrisisPilot has instantly compiled built-in local emergency containment guidelines based on your matching scenario category.
                  </p>
                </div>
              </div>
            )}

            {/* STAGE: Panic Mode view vs Regular View */}
            {panicMode ? (
              
              /* ========================================================
                 PANIC MODE VIEW: High visibility, large print, clean 
                 ======================================================== */
              <div className="space-y-8 animate-fadeIn">
                
                {/* Panic Severity */}
                <div className={`p-6 border-l-4 rounded-xl shadow-xs text-neutral-950 ${getSeverityStyles(protocol.severity).bg} ${getSeverityStyles(protocol.severity).border}`}>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-10 h-10 shrink-0 ${getSeverityStyles(protocol.severity).text}`} />
                    <div>
                      <div className="text-xs uppercase font-mono font-bold tracking-widest text-[#666666]">
                        RATING
                      </div>
                      <h2 className="text-3xl font-extrabold tracking-tight">
                        {protocol.severity} SEVERITY
                      </h2>
                    </div>
                  </div>
                  <p className="text-lg text-neutral-900 mt-3 font-medium leading-relaxed">
                    {protocol.severityReason}
                  </p>
                </div>

                {/* Massive Checklist Block */}
                <div className="bg-white border-2 border-neutral-300 rounded-xl p-6 md:p-8 space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest bg-neutral-900 text-white px-2.5 py-1.5 rounded inline-block">
                      CRITICAL STEPS — DO THESE FIRST
                    </h3>
                    <p className="text-[#666666] text-sm mt-1">
                      Check each item off as you complete it. Avoid rushing.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {immediateItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleToggleChecklist(item.id)}
                        className={`w-full text-left p-5 md:p-6 rounded-xl border-2 transition-all flex items-start gap-4 select-none cursor-pointer ${
                          item.completed
                            ? "bg-neutral-50 border-neutral-300 opacity-60 line-through"
                            : "bg-white border-neutral-600 hover:border-black shadow-sm"
                        }`}
                      >
                        <div className="mt-1 shrink-0">
                          {item.completed ? (
                            <CheckSquare className="w-8 h-8 text-[#15803D]" />
                          ) : (
                            <Square className="w-8 h-8 text-neutral-700" />
                          )}
                        </div>
                        <div className="flex-1">
                          {renderTextWithFormatting(item.text, true)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Danger Actions block in Panic mode */}
                {protocol.whatNotToDo.length > 0 && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 md:p-8 space-y-4">
                    <div className="flex items-center gap-2 text-[#DC2626]">
                      <AlertOctagon className="w-7 h-7" />
                      <h3 className="text-xl font-bold uppercase tracking-tight">
                        STRICTLY FORBIDDEN (DO NOT DO)
                      </h3>
                    </div>
                    <ul className="space-y-3 pl-2">
                      {protocol.whatNotToDo.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-base md:text-lg text-red-950 font-bold leading-relaxed align-top">
                          <span className="text-[#DC2626] font-bold select-none shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Next Steps in Panic mode */}
                <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-700">
                    Next Actions (5–30 Minutes)
                  </h3>
                  <div className="space-y-3">
                    {nextItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleToggleChecklist(item.id)}
                        className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3 select-none cursor-pointer ${
                          item.completed
                            ? "bg-neutral-50 border-neutral-200 opacity-60 line-through text-neutral-400"
                            : "bg-white border-neutral-300 hover:border-neutral-500"
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
                          ) : (
                            <Square className="w-5 h-5 text-neutral-400" />
                          )}
                        </div>
                        <p className="text-sm text-neutral-900 leading-normal">
                          {item.text}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Helpful resources in Panic Mode */}
                {protocol.helpfulResources.length > 0 && (
                  <div className="bg-neutral-100 p-5 rounded-xl border border-neutral-300">
                    <h4 className="text-xs uppercase font-bold text-[#666666] tracking-wider mb-2">
                      Official Contact / Guidance Pages
                    </h4>
                    <ul className="space-y-1 text-sm text-neutral-800">
                      {protocol.helpfulResources.map((res, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full shrink-0" />
                          <span className="font-semibold">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
              
            ) : (
              
              /* ========================================================
                 REGULAR DETAILED VIEW: Clean Grid Dashboard
                 ======================================================== */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                
                {/* Col 1 + 2 Main Protocol */}
                <div className="md:col-span-2 space-y-6">
                  
                  {/* Severity Banner */}
                  <div className={`p-5 rounded-xl border ${getSeverityStyles(protocol.severity).bg} ${getSeverityStyles(protocol.severity).border} text-neutral-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-3xs font-extrabold uppercase rounded tracking-widest ${getSeverityStyles(protocol.severity).badgeBg} ${getSeverityStyles(protocol.severity).badgeText}`}>
                          {getSeverityStyles(protocol.severity).label}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-800 leading-relaxed font-sans mt-1">
                        {protocol.severityReason}
                      </p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end justify-center shrink-0 border-t sm:border-t-0 sm:border-l border-neutral-300 sm:pl-4 pt-2 sm:pt-0">
                      <span className="text-[10px] text-[#666666] font-mono tracking-wider">THREAT LEVEL</span>
                      <span className="text-xl font-black text-neutral-900 tracking-tight">{protocol.severity}</span>
                    </div>
                  </div>

                  {/* Immediate Actions Tab Box */}
                  <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-neutral-900 px-4 py-3 flex items-center justify-between text-white border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse" />
                        <h3 className="text-xs uppercase font-extrabold tracking-widest text-[#F5F5F5]">
                          01. Immediate Containment Checklist (0–5 Mins)
                        </h3>
                      </div>
                      <span className="text-2xs font-mono text-neutral-300 uppercase">
                        Most Critical
                      </span>
                    </div>

                    <div className="p-4 space-y-3">
                      {immediateItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleToggleChecklist(item.id)}
                          className={`p-3.5 rounded-lg border transition-all flex items-start gap-3 select-none cursor-pointer ${
                            item.completed
                              ? "bg-neutral-50 border-neutral-200 opacity-60 text-neutral-400"
                              : "bg-white border-neutral-200 hover:border-neutral-400"
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {item.completed ? (
                              <CheckSquare className="w-4.5 h-4.5 text-[#15803D]" />
                            ) : (
                              <Square className="w-4.5 h-4.5 text-neutral-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            {renderTextWithFormatting(item.text, false)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Actions */}
                  <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-3">
                      <h3 className="text-xs uppercase font-extrabold tracking-widest text-neutral-800">
                        02. Next Mitigation Steps (5–30 Mins)
                      </h3>
                    </div>

                    <div className="p-4 space-y-3">
                      {nextItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleToggleChecklist(item.id)}
                          className={`p-3.5 rounded-lg border transition-all flex items-start gap-3 select-none cursor-pointer ${
                            item.completed
                              ? "bg-neutral-50 border-neutral-200 opacity-60 text-neutral-400"
                              : "bg-white border-neutral-200 hover:border-neutral-400"
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {item.completed ? (
                              <CheckCircle2 className="w-4.5 h-4.5 text-[#15803D]" />
                            ) : (
                              <Square className="w-4.5 h-4.5 text-neutral-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span className={`text-sm leading-relaxed ${item.completed ? "line-through" : "text-neutral-800"}`}>
                              {item.text}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Long-Term Recovery Plan */}
                  <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-3">
                      <h3 className="text-xs uppercase font-extrabold tracking-widest text-neutral-800">
                        03. Preventative Recovery Plan
                      </h3>
                    </div>

                    <div className="p-4 space-y-3">
                      {recoveryItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleToggleChecklist(item.id)}
                          className={`p-3.5 rounded-lg border transition-all flex items-start gap-3 select-none cursor-pointer ${
                            item.completed
                              ? "bg-neutral-50 border-neutral-200 opacity-60 text-neutral-400 animate-none"
                              : "bg-white border-neutral-200 hover:border-neutral-400"
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {item.completed ? (
                              <CheckCircle2 className="w-4.5 h-4.5 text-[#15803D]" />
                            ) : (
                              <Square className="w-4.5 h-4.5 text-neutral-400" />
                            )}
                          </div>
                          <div className="flex-1 text-sm text-neutral-800 leading-relaxed">
                            {item.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Col 3: Sidebar Warnings & Links */}
                <div className="space-y-6">
                  
                  {/* Strict Negatives Panel */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 text-white space-y-4">
                    <div className="flex items-center gap-2 text-[#DC2626]">
                      <AlertOctagon className="w-5 h-5 shrink-0" />
                      <h3 className="text-xs uppercase font-extrabold tracking-wider text-neutral-100">
                        Strictly Avoid
                      </h3>
                    </div>
                    
                    <ul className="space-y-3 text-xs leading-relaxed text-neutral-300">
                      {protocol.whatNotToDo.map((item, idx) => (
                        <li key={idx} className="flex gap-2 pl-1 select-text">
                          <span className="text-[#DC2626] font-extrabold text-sm select-none shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trusted Resources */}
                  <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-3">
                    <h4 className="text-xs uppercase font-extrabold tracking-wide text-neutral-950">
                      Helpful Referrals
                    </h4>
                    <p className="text-3xs text-[#666666] leading-relaxed">
                      Always double check source protocols before initiating data queries.
                    </p>

                    <div className="space-y-2 pt-1 border-t border-neutral-100">
                      {protocol.helpfulResources.map((res, i) => (
                        <div key={i} className="text-xs text-neutral-800 leading-relaxed bg-neutral-50 border border-neutral-200 p-2.5 rounded-lg flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />
                          <span className="font-medium select-all">{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary progress metric */}
                  <div className="bg-white border border-neutral-200 rounded-xl p-5 text-center space-y-1 shadow-2xs">
                    <span className="text-[10px] whitespace-nowrap text-[#666666] font-mono tracking-widest uppercase">
                      COMPLETION STATUS
                    </span>
                    <div className="text-3xl font-normal tracking-tight text-neutral-950 font-serif">
                      {progressPercent}%
                    </div>
                    <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden mt-2">
                      <div
                        className="bg-neutral-800 h-full transition-all duration-300 ease-in"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-[#666666] leading-relaxed pt-2">
                      Completed {completedCount} of {totalCount} containment milestones.
                    </p>
                  </div>

                  {/* Raw response export */}
                  <details className="text-2xs text-[#666666] p-1 bg-white border border-neutral-200 rounded-lg select-none">
                    <summary className="cursor-pointer font-semibold py-1 px-2 uppercase hover:text-neutral-900">
                      Raw AI Transcript Log
                    </summary>
                    <div className="p-2 border-t border-neutral-200 max-h-40 overflow-y-auto select-all font-mono font-normal">
                      {protocol.rawText}
                    </div>
                  </details>

                </div>

              </div>
            )}

            {/* Back Button footer */}
            <div className="pt-6 border-t border-neutral-200 flex justify-center text-center">
              <button
                onClick={handleClearAll}
                className="text-xs font-bold tracking-widest text-[#666666] hover:text-neutral-900 transition-all uppercase flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4 text-neutral-700" />
                CLEAR ALL STATE AND ENTER A NEW ISSUE
              </button>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}

// Simple custom inline warning alert icon to replace external dependency issues
function AlertCircle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#DC2626] shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
