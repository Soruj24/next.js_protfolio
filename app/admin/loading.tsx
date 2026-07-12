import {
  AmbientGlow,
  WelcomeSkeleton,
  StatCardsSkeleton,
  AnalyticsOverviewSkeleton,
  ScoreCardsSkeleton,
  ChartsSectionSkeleton,
  BottomRowSkeleton,
  DeploymentsSkeleton,
  GitHubSkeleton,
  GrowthCommitsSkeleton,
  PinnedActionsSkeleton,
} from "@/features/admin/components/skeletons";

export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <AmbientGlow />
      <WelcomeSkeleton />
      <StatCardsSkeleton />
      <AnalyticsOverviewSkeleton />
      <ScoreCardsSkeleton />
      <ChartsSectionSkeleton />
      <BottomRowSkeleton />
      <DeploymentsSkeleton />
      <GitHubSkeleton />
      <GrowthCommitsSkeleton />
      <PinnedActionsSkeleton />
    </div>
  );
}
