import React, { useState } from "react";
import { MOCK_SOCIAL_POSTS } from "../data/mockData";
import {
  Heart,
  Repeat2,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Filter,
  Share2,
  TrendingUp,
} from "lucide-react";

interface SocialMediaShowcaseProps {
  athleteName: string;
  handle: string;
}

export const SocialMediaShowcase: React.FC<SocialMediaShowcaseProps> = ({
  athleteName,
  handle,
}) => {
  const [activePlatformFilter, setActivePlatformFilter] = useState<
    "All" | "Twitter" | "Instagram"
  >("All");
  const [activeTag, setActiveTag] = useState<string>("All");

  const filteredPosts = MOCK_SOCIAL_POSTS.filter((post) => {
    if (activePlatformFilter !== "All" && post.platform !== activePlatformFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
      {/* Header & Character Rating Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-cyan-400" /> Scout Social Audit
            </span>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              100% Clean Character Audit
            </span>
          </div>
          <h2 className="text-md font-extrabold text-white mt-1 flex items-center gap-2">
            Social Media & Character Showcase
          </h2>
          <p className="text-[11px] text-slate-400">
            Live X (Twitter) & Instagram presence monitored by FBS/FCS college recruiters.
          </p>
        </div>

        <a
          href={`https://x.com/${handle.replace("@", "")}`}
          target="_blank"
          rel="noreferrer"
          className="self-start sm:self-center text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition-all flex items-center gap-1.5 shadow-sm"
        >
          {handle} <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Coach Evaluation Summary Banner */}
      <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="font-extrabold text-white text-xs">High Work Ethic & Leadership Flags</p>
            <p className="text-[11px] text-slate-400">
              0 offensive flags • Strong workout film consistency • Positive team praise
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-center text-[10px]">
          <div>
            <span className="text-slate-500 block">Total Engagement</span>
            <span className="font-black text-white">4.8k Likes</span>
          </div>
          <div>
            <span className="text-slate-500 block">Verified Coach Reach</span>
            <span className="font-black text-emerald-400">142 Coaches</span>
          </div>
        </div>
      </div>

      {/* Platform & Category Filters */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(["All", "Twitter", "Instagram"] as const).map((platform) => (
            <button
              key={platform}
              onClick={() => setActivePlatformFilter(platform)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                activePlatformFilter === platform
                  ? "bg-cyan-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {platform === "Twitter" ? "X (Twitter)" : platform}
            </button>
          ))}
        </div>

        <span className="text-[10px] text-slate-400 font-mono">
          Showing {filteredPosts.length} Recent Activity Posts
        </span>
      </div>

      {/* Social Feed List */}
      <div className="space-y-3.5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-xs text-slate-200 space-y-2.5 hover:border-slate-700 transition-all shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={post.avatarUrl}
                  alt={post.authorName}
                  className="w-9 h-9 rounded-full border border-slate-700 object-cover shadow-inner"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-white">{athleteName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {post.handle} • {post.timestamp}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] font-bold text-cyan-400">
                  {post.platform === "Twitter" ? "X / Twitter" : post.platform}
                </span>
              </div>
            </div>

            <p className="leading-relaxed text-slate-200 font-medium">{post.content}</p>

            {post.mediaUrl && (
              <div className="relative overflow-hidden rounded-xl border border-slate-800 group">
                <img
                  src={post.mediaUrl}
                  alt="Post Media"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold text-white border border-slate-800">
                  Media Attachment
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-900">
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-1 hover:text-slate-200 cursor-pointer transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" /> Reply
                </span>
                <span className="flex items-center gap-1 hover:text-emerald-400 cursor-pointer transition-colors">
                  <Repeat2 className="w-3.5 h-3.5 text-emerald-400" /> {post.retweets} Reposts
                </span>
                <span className="flex items-center gap-1 hover:text-rose-400 cursor-pointer transition-colors">
                  <Heart className="w-3.5 h-3.5 text-rose-400" /> {post.likes} Likes
                </span>
              </div>

              <span className="text-emerald-400 font-bold text-[9px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Verified Scout Visible
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
