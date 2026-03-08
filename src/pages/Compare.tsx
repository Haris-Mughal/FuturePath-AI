import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import TimelineCard from "@/components/TimelineCard";
import type { TimelineEvent } from "@/pages/Timeline";

const CAREER_PATHS = [
  "Corporate Job",
  "Startup Founder",
  "Freelancer",
  "Research / Academia",
  "Content Creator",
];

const Compare = () => {
  const [pathA, setPathA] = useState(CAREER_PATHS[0]);
  const [pathB, setPathB] = useState(CAREER_PATHS[1]);
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [mainGoal, setMainGoal] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ a: TimelineEvent[]; b: TimelineEvent[] } | null>(null);

  const generate = async (careerPath: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-timeline`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          inputs: { age, country, careerPath, riskTolerance, mainGoal },
        }),
      }
    );
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();
    return data.timeline as TimelineEvent[];
  };

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    try {
      const [a, b] = await Promise.all([generate(pathA), generate(pathB)]);
      setResults({ a, b });
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[30%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <nav className="relative z-10 flex items-center gap-4 px-6 md:px-12 py-6">
        <Link to="/simulate" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="font-display text-xl font-bold gradient-text">FuturePath</span>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Compare <span className="gradient-text">Two Paths</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            See how different career choices lead to different futures.
          </p>

          <form onSubmit={handleCompare} className="glass-card rounded-2xl p-6 mb-10 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Age</label>
                <input
                  type="number" required min={16} max={80} value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                <input
                  type="text" required value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="United States"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Main Goal</label>
              <input
                type="text" required value={mainGoal}
                onChange={(e) => setMainGoal(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Build a successful AI startup"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Risk Tolerance</label>
              <div className="flex gap-3">
                {["Low", "Medium", "High"].map((r) => (
                  <button
                    type="button" key={r}
                    onClick={() => setRiskTolerance(r)}
                    className={`flex-1 py-3 rounded-xl border font-medium text-sm transition-all ${
                      riskTolerance === r
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-muted-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Path A</label>
                <select
                  value={pathA} onChange={(e) => setPathA(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {CAREER_PATHS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Path B</label>
                <select
                  value={pathB} onChange={(e) => setPathB(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {CAREER_PATHS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <motion.button
              type="submit" disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-semibold text-primary-foreground bg-primary hover:brightness-110 transition-all disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Comparing...</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Compare Futures</>
              )}
            </motion.button>
          </form>

          {results && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                { label: pathA, data: results.a },
                { label: pathB, data: results.b },
              ].map((col, ci) => (
                <div key={ci}>
                  <h2 className="font-display text-xl font-bold mb-6">
                    <span className={ci === 0 ? "gradient-text" : "gradient-accent-text"}>{col.label}</span>
                  </h2>
                  <div className="relative">
                    <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
                    <div className="space-y-6">
                      {col.data.map((event, i) => (
                        <TimelineCard key={i} event={event} index={i} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Compare;
