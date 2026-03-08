import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CAREER_PATHS = [
  "Corporate Job",
  "Startup Founder",
  "Freelancer",
  "Research / Academia",
  "Content Creator",
];

const RISK_LEVELS = ["Low", "Medium", "High"];

const Simulate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    age: "",
    country: "",
    careerPath: CAREER_PATHS[0],
    riskTolerance: "Medium",
    mainGoal: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-timeline`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ inputs: form }),
        }
      );

      if (!res.ok) throw new Error("Failed to generate timeline");

      const data = await res.json();
      navigate("/timeline", { state: { timeline: data.timeline, inputs: form } });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <nav className="relative z-10 flex items-center gap-4 px-6 md:px-12 py-6">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="font-display text-xl font-bold gradient-text">FuturePath</span>
      </nav>

      <main className="relative z-10 max-w-xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Design Your <span className="gradient-text">Simulation</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Fill in your details and let AI map your next decade.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Age</label>
              <input
                type="number"
                required
                min={16}
                max={80}
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g. 25"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Country</label>
              <input
                type="text"
                required
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g. United States"
              />
            </div>

            {/* Career Path */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Career Path</label>
              <select
                value={form.careerPath}
                onChange={(e) => setForm({ ...form, careerPath: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {CAREER_PATHS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Risk Tolerance */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Risk Tolerance</label>
              <div className="flex gap-3">
                {RISK_LEVELS.map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setForm({ ...form, riskTolerance: r })}
                    className={`flex-1 py-3 rounded-xl border font-medium text-sm transition-all ${
                      form.riskTolerance === r
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-muted-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Goal */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Main Goal</label>
              <input
                type="text"
                required
                value={form.mainGoal}
                onChange={(e) => setForm({ ...form, mainGoal: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g. Build a successful AI startup"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-semibold text-primary-foreground bg-primary hover:brightness-110 transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Future Timeline
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/compare"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Or compare two different paths →
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Simulate;
