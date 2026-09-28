# SubmitLedger

**Cloud-Based Student Assignment Submission & Feedback Portal**

SubmitLedger organizes coursework around actual classes. Teachers register independently, create classes for their subjects, and share a class-specific join code or link. Students join the classes they attend. Teachers publish assignments to one class, and only that class's members and teacher can access its work.

## What it includes

- Separate student and teacher account registration and sign-in.
- Teacher-owned classes with subject, section/term, unique join codes, and shareable links.
- Student class joining by code or invitation link; students can belong to several classes.
- Class-scoped assignments, hand-ins, teacher review, grades, and feedback.
- Optional teacher-provided assignment files stored privately in Firebase Storage.
- Live student strength shown for each teacher-owned class.
- Private PDF, DOCX, PNG, and JPG uploads up to 20 MB.
- Timestamped version receipts with SHA-256 fingerprints and a student-visible version history.
- Responsive teacher/student dashboards, assignment search, and sign-out.
- Firebase Authentication, Firestore, Storage, and access rules.

Teacher self-registration is open in this educational prototype; no app creator needs to approve an account. Each teacher can manage only classes they own. For a real school deployment, teacher identity should be verified by the institution (for example, domain-based invitations or school-managed identity) before real student data is used.

## Local setup in VS Code

### Start Firebase emulators

The local emulators do not require a billing-enabled Firebase project. Emulator data stays on this computer.

```powershell
npm install --global firebase-tools
firebase emulators:start --only auth,firestore,storage --project demo-assignment-portal
```


Before stopping an emulator that contains demo accounts or class work, save it from another terminal:

```powershell
firebase emulators:export ./emulator-data --project demo-assignment-portal --only auth,firestore,storage
```

After changing `firestore.rules` or `storage.rules`, stop and restart the emulators with the backup restored and future changes exported automatically:

```powershell
firebase emulators:start --only auth,firestore,storage --project demo-assignment-portal --import=./emulator-data --export-on-exit=./emulator-data
```
Keep this terminal running. Use a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

`frontend/.env` should contain:

```dotenv
VITE_USE_FIREBASE_EMULATORS=true
VITE_FIREBASE_PROJECT_ID=demo-assignment-portal
```

Open `http://localhost:5173`; emulator tools are at `http://localhost:4000`. Restart the emulator after changing security rules so it loads the latest rules. Emulator data resets when it stops unless export/import is configured.

### Firebase cloud setup

Create a Firebase project and Web app, enable Email/Password Authentication, create Firestore and Storage, then set the web config in `frontend/.env` (copy `.env.example`). Never place service-account credentials in the frontend. Publish the rules using Firebase CLI:

```powershell
firebase deploy --only firestore:rules,storage
```

Firebase Cloud Storage provisioning requires a billing-enabled plan; local emulators are the no-billing option. Review current Firebase pricing and Storage setup requirements before deploying.

## Data model

- `users/{uid}`: name, email, immutable registration role, created timestamp.
- `classes/{classId}`: owning teacher, class name, subject, section, join code.
- `classInvites/{code}`: code-to-class mapping; direct get is permitted for signed-in code entry, listing is denied.
- `classMembers/{classId_uid}`: student membership, established only with a matching invite code.
- `assignments/{assignmentId}`: class ID, title, instructions, deadline, marks, creator.
- `submissions/{submissionId}`: class, assignment, student, file metadata, version receipt, grade and feedback.
- Storage path: `submissions/{classId}/{studentUid}/{assignmentId}/{uniqueFileName}`.

Firestore queries in the app are constrained to a class the user teaches or has joined. Storage rules validate the class membership and assignment before file creation, and restrict reads to the student who uploaded the file or the teacher who owns its class.

## Limits before production

The app is a prototype. Open teacher registration is appropriate for a class demo but does not establish that someone is a real teacher. The app currently calculates due/late status in the browser; production grading, deadlines, notifications, rate limiting, audit trails, file scanning, backups, and institutional identity verification should move to trusted server-side services. SHA-256 fingerprints describe uploaded bytes; they are not a digital signature or an independent timestamp authority.

## Repository layout

```text
frontend/src/App.jsx       Authentication, class, assignment, and feedback workflows
frontend/src/firebase.js   Firebase SDK and local emulator connections
frontend/src/styles.css    Responsive portal interface
frontend/submitledger.svg  Custom SubmitLedger app icon
firestore.rules            Class-scoped database access
storage.rules              Private class-scoped file access
firebase.json              Firebase Hosting, rules, and emulator configuration
```




## Assignment grading and hand-in versions

Teachers can switch grading on or off for each new assignment. Existing assignments without this setting continue to behave as graded assignments. When grading is disabled, marks and grade-entry controls are hidden.

When resubmissions are allowed, students can remove their current hand-in and upload a replacement. Removal deletes the submission record and uploaded file, so the removed attempt is not shown to the teacher or kept in student history. Teachers see hand-ins grouped by assignment creation order, with submissions listed by submission time inside each assignment. A late hand-in for an earlier assignment stays under that assignment.
