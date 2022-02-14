# :potable_water: Faucet Frontend

- [Overview](#overview)
- [Repository layout](#repository-layout)
- Instructions
    - [Installation](#installation)
    - [Test](#test)
    - [lint check](#lint)

# Overview

Nem faucet frontend is a simple web application build on react, it allow user to enter address and amount to request `xem` faucet for testnet account.

## Repository layout

| Folder Name | Description |
| -------------|--------------|
| /src/assets | It contains fonts family, image and icon files. |
| /src/components | It's react component such as faucet form. |
| /src/pages | It contains web page. |
| /src/services | It's service layers, mainly doing API request from the nem nodes. |
| /src/styles | A global scss style in Nem project. |
| /src/utils | Collections of utils function. |

## Installation

1. Clone the project.

```
git clone https://github.com/symbol/faucet-repo.git
```

2. Install the required dependencies.

```
cd nem
npm install
```

3. Create `.env` in [nem/](/nem/) root directory, all balance and amount in absolution units.

```env
REACT_APP_FAUCET_ADDRESS=<Address>
REACT_APP_REQ_FAUCET_BALANCE=10000000 // 10 xem
REACT_APP_MAX_SEND_AMOUNT=500000000 // 500 xem
REACT_APP_EXPLORER=https://testnet-explorer.nemtool.com
```

4. Start application.

```shell
npm start
```

5. Visit http://localhost:3000/#/ in your browser.

# test

```
npm run test
```

# lint

lint comment use for all file in [src](/nem/src/).
```
npm run lint
npm run lint:fix
```
