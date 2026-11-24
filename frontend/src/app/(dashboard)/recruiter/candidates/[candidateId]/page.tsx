import CandidateEvaluationView from "@/components/recruiter/CandidateEvaluationView";

export default async function CandidateEvaluationPage({
  params,
}: {
  params: Promise<{ candidateId: string }>;
}) {
  const { candidateId } = await params;

  return <CandidateEvaluationView candidateId={candidateId} />;
}
