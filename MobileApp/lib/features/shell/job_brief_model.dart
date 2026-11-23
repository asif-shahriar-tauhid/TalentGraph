class JobBriefModel {
  const JobBriefModel({
    required this.jobId,
    required this.title,
    required this.company,
    required this.isVerified,
    required this.isBookmarked,
    required this.location,
    required this.jobType,
    required this.level,
    required this.postedAgo,
    required this.summary,
    required this.skillChips,
    required this.evidenceTrailActive,
    required this.evidenceTrailText,
  });

  final String jobId;
  final String title;
  final String company;
  final bool isVerified;
  final bool isBookmarked;
  final String location;
  final String jobType;
  final String level;
  final String postedAgo;
  final String summary;
  final List<String> skillChips;
  final bool evidenceTrailActive;
  final String evidenceTrailText;
}

// TODO(jobs-api): Replace kDummyJobs with repository/provider stream
const List<JobBriefModel> kDummyJobs = [
  JobBriefModel(
    jobId: 'job_001',
    title: 'Staff Distributed Systems Engineer',
    company: 'Nexus Cloud Infrastructure',
    isVerified: true,
    isBookmarked: false,
    location: 'Remote (US / EU)',
    jobType: 'Full-time',
    level: 'Staff Level',
    postedAgo: '2d ago',
    summary:
        'Lead the consensus layer re-architecture for high-throughput distributed protocols handling enterprise state synchronization.',
    skillChips: ['Go', 'Distributed Consensus', 'Kubernetes', '+2 more'],
    evidenceTrailActive: true,
    evidenceTrailText: '45m timed assessment path unlocked',
  ),
  JobBriefModel(
    jobId: 'job_002',
    title: 'Senior Full Stack Security Engineer',
    company: 'Aegis Sentinel Labs',
    isVerified: true,
    isBookmarked: true,
    location: 'London / Hybrid',
    jobType: 'Full-time',
    level: 'Senior',
    postedAgo: '3d ago',
    summary:
        'Build cryptographic verification services and zero-trust session enforcement pipelines for enterprise identity routing clusters.',
    skillChips: ['TypeScript', 'Node.js', 'OAuth 2.1', '+2 more'],
    evidenceTrailActive: false,
    evidenceTrailText: 'Telemetry evidence record preferred',
  ),
  JobBriefModel(
    jobId: 'job_003',
    title: 'Rust Systems Core Engineer',
    company: 'Vektor Analytics',
    isVerified: false,
    isBookmarked: false,
    location: 'Remote (Worldwide)',
    jobType: 'Contract (6mo)',
    level: 'Senior',
    postedAgo: '5d ago',
    summary:
        'Optimize high-frequency query pipelines compiled to WebAssembly runtimes for decentralized edge evaluation nodes.',
    skillChips: ['Rust', 'Wasm', 'Async Tokio', '+1 more'],
    evidenceTrailActive: true,
    evidenceTrailText: 'Take-home execution kernel challenge',
  ),
];
