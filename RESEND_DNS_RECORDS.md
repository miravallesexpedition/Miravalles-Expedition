# Registros DNS para Resend

Dominio: `miravallesexpedition.com`

Agrega estos registros en la configuracion DNS del dominio:

| Tipo | Nombre | Valor | Prioridad | TTL |
| --- | --- | --- | --- | --- |
| TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDO5mogrR0cXwdFg7ZuE9Ajn4rB6wPf4DNCZJMQy0F8FaxMFrhHiKQxxeoTfeeUnGjHZmtR2cx7HBE17xs1u4k3HuRb/yPPQz6FamthpyR2d9a33akdpKbpe6iajrZOMzP9LeGVo36kfjkDiAt9AH22emcr/YF2+464v/DGZ7JoVwIDAQAB` |  | Auto |
| MX | `send` | `feedback-smtp.us-east-1.amazonses.com` | `10` | `60` |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` |  | `60` |

Notas:

- En algunos paneles el nombre se escribe completo como `resend._domainkey.miravallesexpedition.com` y `send.miravallesexpedition.com`.
- En otros paneles solo debes escribir `resend._domainkey` y `send`.
- Despues de guardar los registros, la propagacion puede tardar desde unos minutos hasta varias horas.
- Luego hay que ejecutar la verificacion de dominio en Resend.
