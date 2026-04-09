import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Film, Sparkles, Image as ImageIcon } from "lucide-react";

const MarketingVideo = () => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    addImages(files);
  }, []);

  const addImages = (files: File[]) => {
    const newImages = files.slice(0, 6 - images.length).map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(prev => [...prev, ...newImages].slice(0, 6));
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setVideoUrl(null);
    setTimeout(() => {
      setGenerating(false);
      setVideoUrl("demo");
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-neon text-sm mb-4">
            <Film className="h-4 w-4" />
            {t("marketing.badge")}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-gradient-neon mb-3">
            {t("marketing.title")}
          </h1>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">{t("marketing.subtitle")}</p>
        </motion.div>

        {/* Prompt Input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-panel rounded-2xl p-6 mb-6"
        >
          <label className="text-sm font-medium text-foreground mb-3 block">{t("marketing.promptLabel")}</label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder={t("marketing.promptPlaceholder")}
            rows={3}
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 resize-none transition-all"
          />
        </motion.div>

        {/* Image Drop Zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-panel rounded-2xl p-6 mb-6"
        >
          <label className="text-sm font-medium text-foreground mb-3 block">{t("marketing.imagesLabel")}</label>
          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input")?.click()}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? "border-neon bg-neon/5 scale-[1.01]"
                : "border-border hover:border-muted-foreground/40"
            }`}
          >
            <input
              id="file-input"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => e.target.files && addImages(Array.from(e.target.files))}
            />
            <motion.div animate={{ y: isDragging ? -4 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">{t("marketing.dropHint")}</p>
              <p className="text-xs text-muted-foreground/60 mt-1">{t("marketing.dropLimit")}</p>
            </motion.div>
          </div>

          {/* Image Previews */}
          <AnimatePresence>
            {images.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-3 mt-4"
              >
                {images.map((img, i) => (
                  <motion.div key={img.preview} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                    className="relative w-20 h-20 rounded-lg overflow-hidden group"
                  >
                    <img src={img.preview} alt="" className="w-full h-full object-cover" />
                    <button onClick={e => { e.stopPropagation(); removeImage(i); }}
                      className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <X className="h-4 w-4 text-destructive" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Generate Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || generating}
            className="w-full py-3.5 rounded-xl font-semibold text-sm bg-neon text-accent-foreground hover:opacity-90 disabled:opacity-40 transition-all glow-neon flex items-center justify-center gap-2"
          >
            {generating ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Sparkles className="h-4 w-4" />
              </motion.div>
            ) : (
              <Film className="h-4 w-4" />
            )}
            {generating ? t("marketing.generating") : t("marketing.generate")}
          </button>
        </motion.div>

        {/* Output Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass-panel rounded-2xl p-6"
        >
          <label className="text-sm font-medium text-foreground mb-3 block">{t("marketing.outputLabel")}</label>
          <div className="aspect-video rounded-xl bg-background/50 border border-border flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {generating ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <Sparkles className="h-10 w-10 text-neon" />
                  </motion.div>
                  <p className="text-sm text-muted-foreground">{t("marketing.processingHint")}</p>
                </motion.div>
              ) : videoUrl ? (
                <motion.div key="video" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full bg-gradient-to-br from-primary/20 to-neon/10 flex items-center justify-center"
                >
                  <div className="text-center">
                    <Film className="h-12 w-12 text-neon mx-auto mb-2" />
                    <p className="text-sm text-foreground font-medium">{t("marketing.videoReady")}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t("marketing.videoDemoNote")}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
                  <p className="text-xs text-muted-foreground/60">{t("marketing.emptyOutput")}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketingVideo;
