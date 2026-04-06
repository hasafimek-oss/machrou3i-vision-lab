import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import { TrendingUp, Users, DollarSign, Target, Shield, Rocket, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const metrics = [
  { key: "marketFit", icon: Target, score: 85, color: "text-neon" },
  { key: "audience", icon: Users, score: 72, color: "text-gold" },
  { key: "revenue", icon: DollarSign, score: 90, color: "text-neon" },
  { key: "competition", icon: Shield, score: 65, color: "text-gold" },
  { key: "growth", icon: TrendingUp, score: 78, color: "text-neon" },
  { key: "feasibility", icon: Rocket, score: 88, color: "text-gold" },
];

const Results = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const overallScore = Math.round(metrics.reduce((a, m) => a + m.score, 0) / metrics.length);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl font-bold font-heading">{t("results.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("results.subtitle")}</p>
        </motion.div>

        {/* Overall Score */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="glass-panel rounded-2xl p-8 text-center mb-8 glow-neon"
        >
          <Star className="h-10 w-10 text-gold mx-auto mb-3" />
          <div className="text-6xl font-bold text-gradient-gold mb-2">{overallScore}%</div>
          <div className="text-muted-foreground">{t("results.overallScore")}</div>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="glass-panel rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <m.icon className={`h-5 w-5 ${m.color}`} />
                  <span className="text-sm font-semibold">{t(`results.metrics.${m.key}`)}</span>
                </div>
                <span className="text-lg font-bold">{m.score}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.score}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-neon"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3">{t(`results.insights.${m.key}`)}</p>
            </motion.div>
          ))}
        </div>

        {/* Recommendations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="glass-panel rounded-2xl p-6"
        >
          <h2 className="text-xl font-heading font-semibold mb-4">{t("results.recommendations")}</h2>
          <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-neon/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-neon">{i}</span>
                </div>
                <p className="text-sm text-muted-foreground">{t(`results.rec${i}`)}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
