# 🚀 Git Setup Guide - Push to GitHub

## Prerequisites

Before you start, make sure you have:
- ✅ Git installed (`git --version`)
- ✅ GitHub account created
- ✅ SSH keys set up OR GitHub personal access token

## Option 1: Automated Setup (Recommended)

### Step 1: Run the Setup Script

```bash
./git-setup.sh
```

This script will:
1. Initialize Git repository
2. Add all files
3. Create initial commit
4. Set main branch
5. Add remote repository
6. Push to GitHub

### Step 2: Follow the Prompts

The script will pause before pushing. Make sure:
- Repository exists on GitHub
- SSH keys are configured OR you're using HTTPS

---

## Option 2: Manual Setup (Step by Step)

### Step 1: Initialize Git

```bash
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Check What Will Be Committed

```bash
git status
```

You should see:
- ✅ All project files
- ❌ No `node_modules/` (excluded by .gitignore)
- ❌ No `.next/` (excluded by .gitignore)
- ❌ No `__pycache__/` (excluded by .gitignore)

### Step 4: Create Initial Commit

```bash
git commit -m "Initial commit: Complete fullstack house price prediction system

Features:
- Next.js 14 portal with two applications
- Property Value Estimator with ML predictions
- Market Analysis dashboard
- Three backend options (Node.js, Python, Java)
- Responsive design with WCAG compliance
- Comprehensive documentation
- Docker support"
```

### Step 5: Set Main Branch

```bash
git branch -M main
```

### Step 6: Add Remote Repository

```bash
git remote add origin git@github.com:priya-koushik/House-Prediction.git
```

**Or if using HTTPS:**
```bash
git remote add origin https://github.com/priya-koushik/House-Prediction.git
```

### Step 7: Verify Remote

```bash
git remote -v
```

Should show:
```
origin  git@github.com:priya-koushik/House-Prediction.git (fetch)
origin  git@github.com:priya-koushik/House-Prediction.git (push)
```

### Step 8: Push to GitHub

```bash
git push -u origin main
```

---

## Troubleshooting

### Issue 1: SSH Key Not Set Up

**Error**: `Permission denied (publickey)`

**Solution**: Set up SSH keys

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add SSH key
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
```

Then:
1. Go to GitHub → Settings → SSH and GPG keys
2. Click "New SSH key"
3. Paste your public key
4. Save

### Issue 2: Repository Already Exists

**Error**: `remote origin already exists`

**Solution**: Update the remote URL

```bash
git remote set-url origin git@github.com:priya-koushik/House-Prediction.git
```

### Issue 3: Large Files

**Error**: `file is too large`

**Solution**: Files are already excluded in .gitignore. If you see this:

```bash
# Remove large files from staging
git rm --cached path/to/large/file

# Add to .gitignore
echo "path/to/large/file" >> .gitignore

# Commit
git add .gitignore
git commit -m "Update .gitignore"
```

### Issue 4: Authentication Failed (HTTPS)

**Error**: `Authentication failed`

**Solution**: Use Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo`, `workflow`
4. Copy the token
5. Use it as password when pushing

Or switch to SSH:
```bash
git remote set-url origin git@github.com:priya-koushik/House-Prediction.git
```

---

## What Gets Committed?

### ✅ Included Files

- Source code (`.js`, `.ts`, `.tsx`, `.py`, `.java`)
- Configuration files (`package.json`, `tsconfig.json`, etc.)
- Documentation (`.md` files)
- Data files (`*.csv`)
- Docker files (`Dockerfile`, `docker-compose.yml`)
- Scripts (`.sh` files)

### ❌ Excluded Files (in .gitignore)

- `node_modules/` - Dependencies (too large)
- `.next/` - Build output
- `__pycache__/` - Python cache
- `target/` - Java build
- `.env` - Environment variables (sensitive)
- `.DS_Store` - macOS files
- `*.log` - Log files

---

## After Pushing to GitHub

### 1. Add Repository Description

On GitHub:
1. Go to your repository
2. Click "⚙️ Settings"
3. Add description: "Fullstack house price prediction system with Next.js, ML models, and market analysis"

### 2. Add Topics/Tags

Add these topics for better discoverability:
- `nextjs`
- `typescript`
- `machine-learning`
- `react`
- `nodejs`
- `python`
- `java`
- `fullstack`
- `real-estate`
- `price-prediction`

### 3. Update README (Optional)

Add screenshots:
```bash
# Create screenshots directory
mkdir -p docs/screenshots

# Add your screenshots
# Then commit and push
git add docs/screenshots/
git commit -m "Add screenshots"
git push
```

### 4. Create GitHub Pages (Optional)

For documentation hosting:
1. Go to Settings → Pages
2. Source: Deploy from branch
3. Branch: main, folder: /docs
4. Save

### 5. Set Up Branch Protection (Optional)

For team collaboration:
1. Settings → Branches
2. Add rule for `main`
3. Enable:
   - Require pull request reviews
   - Require status checks
   - Include administrators

---

## Verify Your Repository

After pushing, verify on GitHub:

1. **Files are there**: Check all directories are present
2. **README displays**: Should show formatted README on main page
3. **No sensitive data**: Check no `.env` or credentials
4. **No large files**: Check repository size is reasonable

---

## Future Git Workflow

### Making Changes

```bash
# 1. Make your changes
# 2. Check status
git status

# 3. Add changes
git add .

# 4. Commit with descriptive message
git commit -m "Add feature: batch prediction export"

# 5. Push to GitHub
git push
```

### Creating Branches

```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push branch
git push -u origin feature/new-feature

# Create Pull Request on GitHub
```

### Pulling Latest Changes

```bash
# Pull latest from main
git pull origin main
```

---

## Git Best Practices

### Commit Messages

**Good**:
```
✅ "Add batch prediction feature"
✅ "Fix: Resolve validation error in PropertyForm"
✅ "Update: Improve market analysis dashboard performance"
✅ "Docs: Add API documentation"
```

**Bad**:
```
❌ "update"
❌ "fix bug"
❌ "changes"
❌ "asdf"
```

### Commit Frequency

- Commit after completing a feature
- Commit before making major changes
- Commit at the end of each work session
- Don't commit broken code

### Branch Naming

```
feature/feature-name
bugfix/bug-description
hotfix/critical-fix
docs/documentation-update
```

---

## Quick Reference

### Common Commands

```bash
# Status
git status

# Add files
git add .
git add specific-file.js

# Commit
git commit -m "Message"

# Push
git push

# Pull
git pull

# Create branch
git checkout -b branch-name

# Switch branch
git checkout branch-name

# Merge branch
git merge branch-name

# View history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard changes
git checkout -- file-name
```

---

## Summary

You now have:
- ✅ Comprehensive .gitignore
- ✅ Professional README.md
- ✅ Automated setup script
- ✅ Step-by-step manual instructions
- ✅ Troubleshooting guide
- ✅ Best practices

**Your code is ready to be pushed to GitHub!** 🚀

Run `./git-setup.sh` or follow the manual steps above.

