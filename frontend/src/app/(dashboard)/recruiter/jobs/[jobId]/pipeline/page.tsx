import HiringPipelineView from "@/components/recruiter/HiringPipelineView";

export default async function JobHiringPipelinePage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  return <HiringPipelineView key={jobId} />;
}
