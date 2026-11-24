import JobWizardView from "@/components/recruiter/JobWizardView";

export default async function EditRecruiterJobPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  return <JobWizardView jobId={jobId} />;
}
