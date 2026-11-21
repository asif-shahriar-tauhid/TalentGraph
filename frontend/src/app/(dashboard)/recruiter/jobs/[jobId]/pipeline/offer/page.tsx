import FormalOfferView from "@/components/recruiter/FormalOfferView";

export default async function JobFormalOfferPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;

  return <FormalOfferView jobId={jobId} />;
}
