# Faucet Repo

- [Overview](#overview)
- [Repository layout](#repository-layout)
- [Contributing](#contributing)
- [Getting Help](#getting-help)
- [License](#license)

## Overview

Faucet is a simple application that allows the user to request testnet network currency to do development, it supported Nem and Symbol.

In this project we split into frontend and backend, backend used for REST API allows the user to request faucet from the endpoint, and the frontend part mainly UI/UX component.

```text

     ┌────────────┐  POST Request   ┌────────────────┐  Sign and     ┌─────────┐
     │            ├────────────────►│                │  announce tx  │         │
     │  Web page  │                 │  Backend REST  ├──────────────►│ Testnet │
     │            │◄────────────────┤                │               │         │
     └────────────┘  Json response  └────────────────┘               └─────────┘

```



## Repository layout

| Folder name | Description |
| -------------|--------------|
| [`/backend`](backend/) | Rest API service use for claim `xem` and `xym` faucet. |
| [`/nem`](nem/) | Frontend application for Nem. |
| [`/symbol`](symbol/) | Fronted application for Symbol. |
| [`/tests`](tests/) | Collection of tests. |

## Contributing

Before contributing please [read this](CONTRIBUTING.md).

## Getting Help

- [Symbol Developer Documentation][developer documentation]
- [Symbol Technical Reference][technical reference]
- Join the community [discord][discord]
- If you found a bug, [open a new issue][issues]

## License

Copyright (c) 2022 NEM & Symbol Contributors, licensed under the [MIT license](LICENSE).

[developer documentation]: https://docs.symbolplatform.com/
[discord]: https://discord.gg/fjkWXyf
[issues]: https://github.com/symbol/faucet/issues
[technical reference]: https://symbol.github.io/symbol-technicalref/main.pdf