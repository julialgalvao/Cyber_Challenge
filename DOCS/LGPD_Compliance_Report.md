# LGPD & Segurança Automatizada 

**Projeto:** Cyber_Challenge - InvestBot  
**Turma:** 3ESR  
**Disciplina:** Cybersecurity  
**Sprint:** 4 - Tarefa 3

## Objetivo
Implementar um plano de conformidade com a LGPD integrado ao pipeline (DevSecOps), cobrindo consentimento rastreável, minimização/coleta por escopo, criptografia em trânsito e repouso, RBAC com auditoria contínua e direitos do titular (exportação e exclusão).

## Implementações
- **Consentimento rastreável**: `src/privacy/consent.ts` + trilhas de auditoria em `src/privacy/audit.ts` (eventos `CONSENT_GIVEN`/`CONSENT_REVOKED`).
- **Minimização de dados e escopo**: política declarativa `src/privacy/data-collection-policy.json` com validação automática em `src/privacy/httpClient.ts` (gera `DATA_MINIMIZATION_VIOLATION`).
- **Criptografia**: 
  - Em trânsito: bloqueio de URLs sem HTTPS no `postSecure()` + regra ESLint de restrição a `http://`.  
  - Em repouso: `src/privacy/storage.ts` usa AES‑GCM (Web Crypto) com chave persistida no `expo-secure-store` via `src/privacy/crypto.ts`.
- **RBAC + auditoria contínua**: `src/privacy/rbac.ts` (roles `guest|user|admin`); negações registradas como `RBAC_DENIED` no audit.
- **Direitos do titular (LGPD)**: tela **Privacy Center** `src/screens/PrivacyCenter/` com aceitar/revogar consentimento, **exportar** (`exportUserData`) e **excluir** (`deleteUserData`) dados.
- **Integração no CI/CD**: workflow `.github/workflows/compliance.yml` executa `tsc`, `eslint`, `jest`, `npm audit`, **Semgrep** (SAST) e **Gitleaks** (segredos).
- **Alertas automáticos**: violações de escopo registradas no audit; console warning para desenvolvedores.

## Evidências
- **Código**: caminhos acima; política JSON versionada; regra ESLint de HTTPS.
- **Testes**: `src/_tests_/httpClient.test.ts` (bloqueio de HTTP), `src/_tests_/crypto.test.ts` (AES‑GCM round‑trip), `src/_tests_/rbac.test.ts` (negação para guest).
- **Pipeline**: execução automática do workflow `compliance` a cada push/PR com relatórios de lint, testes e segurança.
- **Auditoria**: eventos persistidos pelo módulo `audit.ts` (consulta via botão “Ver auditoria” na tela Privacy Center).

## Conclusão
A conformidade LGPD está integrada ao ciclo DevSecOps do projeto. Cada alteração passa por validações automatizadas, reduzindo risco de coleta indevida, vazamento de dados e uso inseguro de transporte/armazenamento. O Privacy Center oferece transparência e autodeterminação do titular. Próximos passos: integrar exportação de auditoria com backend corporativo e ampliar a política de RBAC conforme novos recursos.
