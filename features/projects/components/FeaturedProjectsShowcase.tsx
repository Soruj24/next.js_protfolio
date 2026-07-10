"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FolderCode } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { useFeaturedProjects } from "../hooks/useFeaturedProjects";
import FeaturedProjectFilters from "./FeaturedProjectFilters";
import FeaturedProjectsGrid from "./FeaturedProjectsGrid";
import FeaturedProjectsEmpty from "./FeaturedProjectsEmpty";
import FeaturedProjectsLoading from "./FeaturedProjectsLoading";

export default function FeaturedProjectsShowcase() {
  const {
    allProjects,
    isLoading,
    categories,
    allTechnologies,
    filteredProjects,
    visibleProjects,
    hasMore,
    loadMore,
    selectedCategory,
    setSelectedCategory,
    selectedTech,
    toggleTech,
    searchTerm,
    setSearchTerm,
  } = useFeaturedProjects();

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      loadMore();
      setIsLoadingMore(false);
    }, 600);
  };

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 overflow-hidden scroll-mt-20 sm:scroll-mt-28"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6"
            >
              <FolderCode className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Featured Work
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5"
            >
              Project{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Showcase
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              {allProjects.length}+ production-ready applications architected with
              precision. Each project solves real-world problems with modern
              engineering.
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-3 mt-8"
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/30" />
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <FeaturedProjectFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTech={selectedTech}
            toggleTech={toggleTech}
            categories={categories}
            allTechnologies={allTechnologies}
            totalResults={filteredProjects.length}
          />
        </ScrollReveal>

        {/* Content */}
        <div className="mt-10 sm:mt-14">
          {isLoading ? (
            <FeaturedProjectsLoading />
          ) : filteredProjects.length === 0 ? (
            <FeaturedProjectsEmpty />
          ) : (
            <FeaturedProjectsGrid
              projects={visibleProjects}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              isLoadingMore={isLoadingMore}
            />
          )}
        </div>
      </div>
    </section>
  );
}
