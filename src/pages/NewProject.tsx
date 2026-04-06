import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { Lightbulb, Users, DollarSign, Target, TrendingUp, Shield, Rocket } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const sections = [
  { key: "idea", icon: Lightbulb },
  { key: "market", icon: Target },
  { key: "audience", icon: Users },
  { key: "finance", icon: DollarSign },
  { key: "competitors", icon: Shield },
  { key: "growth", icon: TrendingUp },
  { key: "roadmap", icon: Rocket },
];

const NewProject = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!user) return <Navigate to="/login" replace />;

  const update = (key: string, val: string) => setAnswers((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/results/new");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl font-bold font-heading">{t("newProject.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("newProject.subtitle")}</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {sections.map((sec, i) => (
            <motion.div
              key={sec.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-panel rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center glow-neon">
                  <sec.icon className="h-5 w-5 text-neon" />
                </div>
                <h2 className="text-lg font-heading font-semibold">{t(`newProject.${sec.key}.title`)}</h2>
              </div>
              <div className="space-y-4">
                {[1, 2].map((q) => (
                  <div key={q}>
                    <label className="text-sm text-muted-foreground mb-1.5 block">
                      {t(`newProject.${sec.key}.q${q}`)}
                    </label>
                    <textarea
                      value={answers[`${sec.key}_q${q}`] || ""}
                      onChange={(e) => update(`${sec.key}_q${q}`, e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-neon/30 transition-all text-sm resize-none"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center pt-4">
            <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-10 py-3.5 rounded-xl bg-neon text-accent-foreground font-semibold text-lg glow-neon"
            >
              {t("newProject.submit")}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default NewProject;
