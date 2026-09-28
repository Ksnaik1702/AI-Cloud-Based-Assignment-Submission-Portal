# Project implementation plan

The supplied brief describes a cloud coursework portal and includes optional advanced examples. This plan separates working local features from future production work; architecture discussion is not evidence that a cloud service has been deployed.

## Current application

- React portal with student and teacher registration, role-checked sign-in, and logout.
- Teachers can self-register, create separate classes, and share a code or invitation URL for each class.
- Students can join multiple classes; the class membership record associates a student with that particular teacher's class.
- Teachers publish text instructions and optional PDF, DOCX, PNG, or JPG attachments to a selected class. Class membership scopes assignment and submission visibility.
- Teacher class cards display a live enrolled-student count from class membership records.
- Private PDF, DOCX, PNG, and JPG uploads, assignment resubmissions, submission versions, and student-visible timestamp/SHA-256 receipts.
- Teacher grading and written feedback, student feedback view, and authenticated file downloads.
- Firestore and Storage rules authorize access using account role, class ownership, and class membership.
- Local Firebase Auth, Firestore, and Storage emulator configuration; custom SubmitLedger logo and responsive interface.

## Current limitations and next work

| Requirement | State | Next implementation |
| --- | --- | --- |
| Teacher identity verification | Open self-registration for this prototype | Add school-domain invites or institution-managed identity before production |
| Student roster management | Membership is stored when a student joins; no roster/individual removal interface yet | Add roster view, remove-member controls, and teacher invite rotation |
| Select a subset of class students per assignment | Assignments currently target the whole class | Add optional student groups or per-student assignment recipients if the brief requires it |
| Assignment editing/deletion | Not implemented | Add teacher-only controls and safe deletion behavior |
| Deadline and resubmission enforcement | Client-side prototype logic | Move authoritative checks and version sequencing to trusted backend functions |
| Custom REST API | Not implemented | Add documented backend endpoints and authorization |
| Notifications, monitoring, backups, and audit logs | Not implemented | Configure production services and retention policies |
| Automated rules/workflow coverage | Not implemented | Run authorization and upload checks against the Firebase Emulator Suite |
| Cloud deployment | Configuration included, not deployed | Deploy to a Firebase project and document its URL |
| Project report and presentation evidence | Not prepared | Capture actual workflow screenshots after the implementation stabilizes |

Use dummy accounts and coursework while developing. Local emulator state is temporary unless export/import is configured. Do not publish real student submissions or personal data in a public repository.


