# Servidor local para projeto Abaco

Este repositório contém um servidor Node mínimo para servir os arquivos estáticos localmente e permitir acesso de outros dispositivos na mesma rede.

Requisitos
- Node.js (v14+ recomendado)

Instalação e execução (PowerShell)

Instalar dependências:

```
npm install
```

Iniciar servidor (porta padrão 3000):

```
npm start
```

Iniciar com porta personalizada:

```
$env:PORT=8080; npm start
```

O servidor escuta em `0.0.0.0`, então é acessível por qualquer IP do host. Para acessar a partir de outro dispositivo na mesma rede, use o IP local da máquina, por exemplo `http://192.168.1.42:3000`.

Se não conseguir acessar de outros dispositivos, verifique:
- Abra a porta no Firewall do Windows (Ex.: 3000) ou permita o Node.js/porta.
- Ambos os dispositivos estão na mesma rede.

Publicar no GitHub
1. Inicializar repositório local e commitar:

```powershell
cd 'C:\Users\SUPORTE TI\Music\abaco'
git init
git checkout -b main
git add .
git commit -m "Initial commit: add static server and project files"
```

2. Criar repositório remoto (duas opções):

- Usando GitHub CLI (`gh`):

```powershell
gh repo create USERNAME/REPO_NAME --public --source=. --remote=origin --push
```

- Ou criar o repositório pelo site do GitHub e depois adicionar remote:

```powershell
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

Observação: não cole textos contendo `<` ou `>` diretamente no PowerShell. Esses caracteres são interpretados como operadores. Substitua por seus valores (por exemplo `USERNAME` e `REPO_NAME`).

3. Após o push, seu projeto estará disponível no GitHub.

Arquivos ignorados por padrão: `node_modules/`, `server.log`, `server.err`, `.env`.

