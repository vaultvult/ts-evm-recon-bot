
---

### TypeScript - `ts-evm-recon-bot`

```markdown
# TS EVM Recon Bot 🤖

![TypeScript](https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=white)
![Ethers.js](https://img.shields.io/badge/Ethers.js-000000?style=for-the-badge&logo=ethereum&logoColor=white)

## Overview
An automated reconnaissance script written in **TypeScript** using `ethers.js`. 

Before a security researcher dives into a protocol, they must map out the attack surface. This tool automates the initial "recon" phase by analyzing live EVM contracts for dangerous or privileged configurations.

## 🔒 What it Analyzes
- **Ownership Status:** Checks if a contract's `owner()` is set to the zero address (renounced) or a centralized wallet.
- **Pause State:** Checks if the contract is currently paused (which could indicate a freeze risk or emergency state).
- **Graceful Degradation:** Uses `try/catch` blocks to handle contracts that do not implement the `Ownable` or `Pausable` interfaces.

## 🚀 Usage
1. Install dependencies:
```bash
npm install ethers
npx ts-node recon.ts
