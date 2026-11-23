import CandidateEvaluationView from "@/components/recruiter/CandidateEvaluationView";

export default async function JobCandidateEvaluationPage({
  params,
}: {
  params: Promise<{ jobId: string; candidateId: string }>;
}) {
  const { jobId, candidateId } = await params;

  return (
    <CandidateEvaluationView jobId={jobId} candidateId={candidateId} />
  );
}
