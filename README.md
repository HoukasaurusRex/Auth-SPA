<h1 align="center">JWT Auth App</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/HoukasaurusRex" target="_blank">
    <img alt="Twitter: HoukasaurusRex" src="https://img.shields.io/twitter/follow/HoukasaurusRex.svg?style=social" />
  </a>
</p>

> Sample Project for JWT authentication in a Single Page App

This project was inspired by [known issues for storing JWT tokens in an SPA](https://stackoverflow.com/a/44209185/8210954), and serves as an attempt at a MEVN stack implementation of a [two-cookie SPA authentication method](https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3).

## Goals

- Reduce the surface area of attack for user authentication
- Compatibility with OAuth 2.0 and good ol' username + password
- Username and password can be supplemented with optional 2FA
- Users can get a different post-login user experience depending on their account type and user permissions
- Sessions can be terminated in client or server
- Sessions can be expired after a given amount of time

## Install

```sh
yarn install
```

## Usage

To start the dev client and server, run:

```sh
yarn start
```

Then navigate to localhost:8080.

## Notes

- By signing JWT tokens with a uuid-generated string generated for each user, this method remains stateful to avoid user forging.

## Contributing

For information on how to contribute to this project, please refer to the [contributing guidelines](.github/CONTRIBUTING.md)

## Author

👤 **JT Houk <jt1992@gmail.com> (https://jt.houk.space/)**

* Twitter: [@Houkasaurus_Rex](https://twitter.com/Houkasaurus_Rex)
* Github: [@Pterobyte](https://github.com/Pterobyte)

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/TerminallyChillSoftware">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>