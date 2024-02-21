# Web App Developer Coding Challenge

This coding challenge assesses your proficiency in full-stack web development, focusing on `React`, `Redux`, `GraphQL`, `Node.js`, `MongoDB`, and working with the `Ethereum` blockchain.

You'll be required to fix several issues within a pre-existing application that simulates Ethereum native token transactions.

While this looks like a `web3` heavy application, all the issues that you are required to fix or implement are strictly web development related, no specific Ethereum or blockchain domain knowledge will be required to pass this challenge.

In this document we will be referring a lot to *“transactions”*, which in this context are blockchain “sends” executed by a wallet *(everything happens on a simulated blockchain, using a development wallet, all of it runs locally)*.

In essence, those transactions are `async` calls to a few functions that will pass along data to an RPC endpoint somewhere down the line. For this challenge however, you won’t need to know any specific data formats or method names *(related to the blockchain or transactions)*, although everything that we’re doing here can be found explained fully in the documentation of the various libraries we use *(`ethers`, `web3-onboard`, etc)*

A wallet is your identity on the blockchain and is represented as a 42 hexadecimal string *(40 characters + the `0x` prefix)*. Other than the wallet library that helps with connecting to the Metamask Browser extension, which will need debugging, you won’t be touching anything specific regarding them.

The overall application is a list of `Transfer` blockchain transactions that are captured in a database. They consist of a *sender*, *recipient* and *amount* *(amount is denoted in WEI, one ETH being 10 ** 18 WEI. You can use [this calculator](https://eth-converter.com/) if you need quick conversions).*

Clicking on one of them will take you to a single page detailing that specific transaction.

You have the wallet connection, allowing you to connect the current Metamask wallet to the application. Once your wallet is connected, you can send similar `Transfer` transactions via the UI to other wallet addresses on the chain *(you can see a list of them in the console output of the various docker containers when the environment starts up).*

![Transactions List Coding Challenge Screenshot](/assets/screenshot-transactions-list-3.png)

## Tech Stack

This app has been set up using the following tech stack and is a simulation of what your will be expected to use in your day to day work:

- **Frontend:** `React` *(using `TypeScript`)*, `Redux`, `Apollo Client`, `Tailwind CSS`
- **Backend:** `Node.js` server, `GraphQL`, `MongoDB`
- **Blockchain:** Local `Ganache` Ethereum chain
- **Containerization:** `Docker`

## Prerequisites

To successfully set up and run this challenge, you'll need the following installed:

- `Docker`: Version `24` or newer: [https://www.docker.com/](https://www.docker.com/)
- `Metamask` browser extension: [https://metamask.io/](https://metamask.io/)

## Starting the Project

- Clone the repository
- Run the docker containers: **`docker compose up --build`**
- Stop the docker containers via: **`docker compose down`**

## Accessing the Application

- Frontend: [http://localhost:3000](http://localhost:3000)
- GraphQL Playground: [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Notes, Tips and Tricks

- Changes to the client will automatically reflect in your client *(hot reloading)*.
- Initial database values can be created via the UI *(after you’ve fixed no# 2. and 3.)* or by using the **`generateTransactions`** script, found in the `scripts` folder of the client.
- If you need it, manually clean up the `mongo` container between stack restarts to avoid stale data.
- Use the Metamask browser extension and connect it to the localhost Ganache network. This is important, otherwise you’re transactions will not make it to your local development chain.
- Wallet address and private key will be listed in the console when initializing the stack, make a note of them, as you’ll need them either to use directly, or as recipients.
- Since everything is containerized, you won't actually have node modules installed locally, meaning you're editor might complain about "missing" imports. Feel free to install them locally if that aids you in your work _(in `/client` and `/server` respectively)_.

![ganache-accounts-2.png](/assets/ganache-accounts-2.png)

- Connect to local the Ganache network at [http://localhost:8545](http://localhost:8545)

## The Challenge

The tasks for this challenge are listed below, with the exception of one, all being bug fixes. They are representative of what you will find during your daily work.

### 1. GraphQL Query

- Fix the query responsible for fetching the transactions list on the main page

### 2. Wallet Connection

- Debug and fix the wallet library *(`web3-onboard`)* issue preventing proper Metamask connection.

### 3. Redux Saga

- Investigate and fix the **`SEND_TRANSACTION`** saga, so that transactions reach the chain and receipts are saved in the database.

### 4. Navigation & Redirection

- Redirect to the new transaction's location after a successful send

### 5. Wire in the Form

- Connect the *Send* transaction form inputs with the form and pass along the required values to the saga.
- Bonus points for introducing basic form validation and closing the modal after a successful send.

### 6. UI

- Fix the styling issue causing the "Connect Wallet" button to disappear under certain screen widths.

![transactions-list-mobile.png](/assets/transactions-list-mobile.png)


### 7. Human Readable Values

- Convert the transaction values to a human-readable format *(from WEI to ETH)*, dealing with the respective decimals, and applying the conversion to both the list, the single page transaction views and accounting for this when submitting the form.

## Expected Completion Time

- `1`-`3` hours

## Submitting

- Fork the repository and make your changes.
- Send the link to your repo to `webappdev@colony.io` _(either a public repo or a private one)_

## **Evaluation Criteria**

Your submission will be evaluated on the following:

- **Code Quality:** Clean, readable, and efficient code.
- **Functionality:** All tasks are properly completed and the app functions as intended.
- **Documentation:** Clear comments explaining your thought process and approach.
- **Bonus Points:** Implementation of additional features, improvements, or innovative solutions.

## **Support**

If you encounter any issues or have questions about the challenge, please feel free to reach out to `support@colony.io`.
