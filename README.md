## Logins (role is detected automatically)
| Role | Email | Password |
|---|---|---|
| Admin | admin@demo.com | admin@123 |
| Incident Manager | manager@demo.com | manager@123 |
| Support Engineer | engineer@demo.com | engineer@123 |
| Business Viewer (User) | user@demo.com | user@123 |

live demo
https://sunkukarthik5.github.io/login/

1. user enters username and password

2. react sends credentials securely to fastapi

3. backend verifies the password against its stored hash

4. backend checks the user's role and grants permitted access
