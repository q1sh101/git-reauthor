# Git Reauthor

A **Node.js** tool to rewrite Git commit history using a `mailmap.txt` file. 
Easily update author names and emails across all commits in a repository.

![GitHub License](https://img.shields.io/badge/license-MIT-blue)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2016.0.0-green)

---

## ✨ Features
✅ Bulk-update author names and emails in Git history  
✅ Simple configuration via `mailmap.txt`  
✅ Supports multiple mappings for different authors  
✅ Lightweight and fast  

---

## 🛠 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **Git**
- A Git repository

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/q1sh101/git-reauthor.git
   cd git-reauthor
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project (if using TypeScript):
   ```bash
   npm run build
   ```

---

## 🚀 Usage

### 1️⃣ Create a `mailmap.txt` File
Create a `mailmap.txt` file in your Git repository's root directory with the following format:

```txt
NewName <new.email@example.com> OldName <old.email@example.com>
```

#### Example:
```txt
Alice Smith <alice@company.com> alice123 <alice@oldmail.com>
Bob Johnson <bob@company.com> bobby <bob@legacy.com>
```

### 2️⃣ Run the Tool
Navigate to your Git repository and run:

```bash
npx ts-node path/to/git-reauthor/src/index.ts
```

### 3️⃣ Verify Changes
Check the updated Git history:

```bash
git log --pretty=format:"%an <%ae>"
```

---

## ⚙️ Configuration

### Options
| Parameter      | Description               | Default          |
|--------------|---------------------------|------------------|
| `mailmapPath` | Path to `mailmap.txt`      | `./mailmap.txt`  |
| `repoPath`    | Path to Git repository    | Current directory |
| `dryRun`      | Test without modifying history | `false` |

### Example Configuration

```typescript
const rewriter = new GitReauthorHistory({
  mailmapPath: './custom-mailmap.txt',
  repoPath: '/path/to/your/repo',
  dryRun: true, // Enable dry-run mode
});
```

---

## 🧪 Examples

### Single Author Update
#### `mailmap.txt`:
```txt
John Doe <john.doe@domain.com> johndoe <johndoe@olddomain.com>
```

### Multiple Authors
#### `mailmap.txt`:
```txt
Team Lead <lead@org.com> tlead <tlead@old.org>
Developer <dev@org.com> coder123 <dev@legacy.org>
```

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 💡 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.
