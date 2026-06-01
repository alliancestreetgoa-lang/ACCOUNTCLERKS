"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/icons";
import { easeOut } from "@/lib/motion";
import {
  type Resource,
  type ResourceType,
  RESOURCE_TYPES,
  RESOURCE_TOPICS,
} from "@/lib/resources";
import { withBase } from "@/lib/site";

const TYPE_ICON: Record<ResourceType, (p: { size?: number; className?: string }) => React.ReactElement> = {
  article: Icon.doc,
  guide: Icon.compass,
  checklist: Icon.list,
  video: Icon.play,
  download: Icon.download,
};

const TYPE_LABEL: Record<ResourceType, string> = {
  article: "Article",
  guide: "Guide",
  checklist: "Checklist",
  video: "Video",
  download: "Download",
};

export function ResourcesHub({ resources }: { resources: Resource[] }) {
  const [type, setType] = useState<ResourceType | "all">("all");
  const [topic, setTopic] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (type !== "all" && r.type !== type) return false;
      if (topic && r.topic !== topic) return false;
      if (q && !(`${r.title} ${r.excerpt} ${r.topic}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [resources, type, topic, query]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-5">
        {/* Search */}
        <div className="relative max-w-md">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
            <Icon.search size={18} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, guides, tools…"
            aria-label="Search resources"
            className="h-12 w-full rounded-full border border-neutral-200 bg-canvas pl-11 pr-4 text-[0.95rem] outline-none transition-[border-color,box-shadow] duration-200 focus:border-evergreen-500 focus:shadow-[0_0_0_3px_var(--tw-shadow-color)] focus:shadow-evergreen-50"
          />
        </div>

        {/* Type tabs */}
        <div className="flex flex-wrap gap-2">
          {RESOURCE_TYPES.map((t) => {
            const on = type === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                className={`rounded-full px-4 py-2 text-[0.88rem] font-medium transition-colors duration-200 ${
                  on ? "bg-neutral-900 text-canvas" : "border border-neutral-200 text-neutral-600 hover:border-neutral-400"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Topic chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[0.82rem] text-neutral-400">Topics:</span>
          <button
            onClick={() => setTopic(null)}
            className={`rounded-full px-3 py-1.5 text-[0.82rem] font-medium transition-colors ${!topic ? "bg-evergreen-100 text-evergreen-700" : "text-neutral-500 hover:text-neutral-900"}`}
          >
            All
          </button>
          {RESOURCE_TOPICS.map((tp) => (
            <button
              key={tp}
              onClick={() => setTopic((cur) => (cur === tp ? null : tp))}
              className={`rounded-full px-3 py-1.5 text-[0.82rem] font-medium transition-colors ${topic === tp ? "bg-evergreen-100 text-evergreen-700" : "text-neutral-500 hover:text-neutral-900"}`}
            >
              {tp}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="mt-8 text-[0.85rem] text-neutral-400">
        {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
      </div>

      {/* Grid */}
      <motion.div layout className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((r) => {
            const IconC = TYPE_ICON[r.type];
            return (
              <motion.a
                key={r.id}
                href={withBase(r.href)}
                layout
                initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className={`group flex flex-col rounded-[22px] glass-card p-6 transition-[transform,border-color,box-shadow] duration-200 ease-out-strong hover:-translate-y-1 hover:border-neutral-200 hover:shadow-e2 ${
                  r.featured ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-evergreen-50 px-2.5 py-1 text-[0.72rem] font-medium text-evergreen-700">
                    <IconC size={14} /> {TYPE_LABEL[r.type]}
                  </span>
                  {r.readTime && <span className="text-[0.78rem] text-neutral-400">{r.readTime}</span>}
                </div>
                <h3 className="mt-4 font-serif text-[1.3rem] leading-snug">{r.title}</h3>
                <p className="mt-2 text-[0.93rem] text-neutral-500">{r.excerpt}</p>
                <div className="mt-auto flex items-center justify-between pt-6">
                  <span className="text-[0.78rem] uppercase tracking-[0.06em] text-neutral-400">{r.topic}</span>
                  <span className="inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-evergreen-600">
                    Open <span className="transition-transform duration-200 ease-out-strong group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-10 rounded-[22px] border border-dashed border-neutral-200 p-12 text-center">
          <p className="text-neutral-500">No resources match that yet.</p>
          <button onClick={() => { setType("all"); setTopic(null); setQuery(""); }} className="mt-3 font-medium text-evergreen-600">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
