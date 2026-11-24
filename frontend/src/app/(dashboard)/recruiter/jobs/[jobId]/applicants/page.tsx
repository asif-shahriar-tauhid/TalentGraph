import ApplicantsRankingsView from "@/components/recruiter/ApplicantsRankingsView";

export default async function JobApplicantsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  return <ApplicantsRankingsView key={jobId} />;
}
