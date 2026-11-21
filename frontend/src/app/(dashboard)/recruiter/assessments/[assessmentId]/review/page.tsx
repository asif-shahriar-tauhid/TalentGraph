import AssessmentReviewView from "@/components/recruiter/AssessmentReviewView";

export default async function AssessmentReviewPage({
  params,
}: {
  params: Promise<{ assessmentId: string }>;
}) {
  const { assessmentId } = await params;
  return <AssessmentReviewView key={assessmentId} />;
}
