# Security Specification — tradeKenya (www.tradekenya.co.ke)

## 1. Data Invariants
- A `MemberProfile` document at `/members/{userId}` can only be read, created, or updated by the authenticated, email-verified user whose `request.auth.uid == userId`.
- `membershipGrade` must strictly equal `'Standard'` on creation and cannot be modified by the user on update (prevents self-promotion to Gold or Premier).
- A `MemberInquiry` document at `/members/{userId}/inquiries/{inquiryId}` cannot exist without a parent `MemberProfile` at `/members/{userId}` (`exists(...)` Master Gate) and must belong to `request.auth.uid == userId`.
- Server timestamps (`request.time`) are enforced on `createdAt` and `updatedAt`.

## 2. Adversarial Test Payloads ("Dirty Dozen")
1. **Unauthenticated Profile Read**: Read `/members/userA` with `auth == null` -> `PERMISSION_DENIED`.
2. **Cross-User Profile Read (PII Leak)**: Read `/members/userA` as `userB` -> `PERMISSION_DENIED`.
3. **Blanket List Scrape**: List `/members` as `userB` -> `PERMISSION_DENIED`.
4. **UID Spoofing on Create**: Create `/members/userB` with `uid: "userA"` -> `PERMISSION_DENIED`.
5. **Self-Assigned Privilege Escalation**: Create `/members/userA` with `membershipGrade: "Premier"` -> `PERMISSION_DENIED`.
6. **Shadow Field Injection**: Create `/members/userA` with extra field `isAdmin: true` -> `PERMISSION_DENIED`.
7. **Unverified Email Write**: Create `/members/userA` with `email_verified: false` -> `PERMISSION_DENIED`.
8. **Grade Escalation on Update**: Update `/members/userA` changing `membershipGrade` to `"Gold"` -> `PERMISSION_DENIED`.
9. **Immutable Timestamp Tampering**: Update `/members/userA` changing `createdAt` -> `PERMISSION_DENIED`.
10. **Oversized String Poisoning**: Create `/members/userA` with `companyName` > 120 chars -> `PERMISSION_DENIED`.
11. **Orphaned Inquiry Without Member Profile**: Create `/members/userA/inquiries/inq1` when `/members/userA` does not exist -> `PERMISSION_DENIED`.
12. **Cross-User Inquiry List**: List `/members/userA/inquiries` as `userB` -> `PERMISSION_DENIED`.
