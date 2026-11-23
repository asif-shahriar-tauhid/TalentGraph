class TalentGraphUser {
  const TalentGraphUser({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    required this.status,
    this.imageUrl,
  });

  factory TalentGraphUser.fromMap(Map<String, dynamic> map) {
    return TalentGraphUser(
      id: map['id'] as String,
      name: map['name'] as String? ?? '',
      email: map['email'] as String? ?? '',
      role: map['role'] as String? ?? '',
      status: map['status'] as String? ?? '',
      imageUrl: map['imageUrl'] as String?,
    );
  }

  final String id;
  final String name;
  final String email;
  final String role;
  final String status;
  final String? imageUrl;

  bool get isCandidate => role == 'CANDIDATE';
  bool get isActive => status == 'ACTIVE';
}
