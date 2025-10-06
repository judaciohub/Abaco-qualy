# Script PowerShell para inicializar repositório Git e publicar no GitHub
# Uso: abra PowerShell com Git instalado e execute este script no diretório do projeto

param(
    [string]$RepoName = "abaco",
    [string]$Visibility = "public",
    [string]$RemoteUrl
)

Write-Host "Checking for git..."
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git not found. Install Git (https://git-scm.com/) and run again."
    exit 1
}

git init
git checkout -b main
git add .
git commit -m "Initial commit: add static server and project files"

if (Get-Command gh -ErrorAction SilentlyContinue) {
    Write-Host "GitHub CLI found - creating remote repository..."
    gh repo create $RepoName --$Visibility --source=. --remote=origin --push
} elseif ($RemoteUrl) {
    git remote add origin $RemoteUrl
    git branch -M main
    git push -u origin main
} else {
    Write-Host "No remote created. To push manually, run the commands below (replace USERNAME):"
    Write-Host "git remote add origin https://github.com/USERNAME/$RepoName.git"
    Write-Host "git branch -M main"
    Write-Host "git push -u origin main"
}

Write-Host "Done. Check GitHub for your repository."
