# ⚖️ Security Policy

> [!NOTE]
> There are no active stable versions of the `main` branch currently.

| Version | Supported          |
| ------- | ------------------ |
| x.x.x   | :white_check_mark: |
| x.x.x   | :x:                |
| x.x.x   | :white_check_mark: |
| x.x.x   | :x:                |


## General Security Best Practices & Self-Deployment Guidance
This application is designed as a locally hosted client-side web application that uses browser technologies like localStorage and IndexedDB. It does not use a back-end server or database in its current form.
- Keep all software and dependencies updated.
- Validate and **sanitize** all inputs before storing them locally to protect against Cross-Site Scripting (XSS) attacks.

## If You Plan to Make This Live or Add a Server
> [!CAUTION]
> **The security requirements change drastically if you add a server or expose this application to the public internet.** Doing so introduces new potential vulnerabilities that you must address.

If you modify the application to include a back-end server or a database:
- **Do not expose the application to the public internet** without proper security measures like a VPN or Web Application Firewall (WAF).
- **Use HTTPS/SSL encryption for all traffic**.
- **Use environment variables for sensitive data** (e.g., API secrets, database credentials); do not hardcode them.
- **Implement server-side validation** for all data received from the client to prevent injection attacks (e.g., SQL injection).
- **Secure your server infrastructure** by restricting access and following best practices for server hardening.

For more information on securing web applications, consult the resources provided by the OWASP Foundation.

> [!IMPORTANT]
> **The creators and contributors of this repository take no liability for any vulnerabilities, damages or legal issues that arise from your modification, deployment or use of this application.**




## Reporting a Minor Vulnerability

If you've found a minor security vulnerability or misconfiguration that does not immediately compromise user data or application integrity (e.g., a missing security header), you can report it via a new GitHub issue.
