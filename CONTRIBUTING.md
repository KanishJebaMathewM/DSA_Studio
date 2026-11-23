# Contributing to DSA Studio

Thank you for contributing. By submitting a contribution for inclusion in DSA Studio, you confirm that the contribution is intended to be distributed under the project's licence:

- **Licence:** GNU Affero General Public License v3.0 only (`AGPL-3.0-only`)
- **Copyright:** Contributors retain copyright in their contributions unless they enter a separate written agreement stating otherwise.
- **Rights:** You must have the right to submit the code, documentation, assets or other material you contribute.
- **Third-party material:** Contributions must not contain incompatible or unauthorised third-party code or assets. Preserve applicable third-party copyright and licence notices.
- **No license assignment:** DSA Studio does not require a Contributor Licence Agreement (CLA), copyright assignment or retroactive consent.

This policy applies prospectively to contributions submitted after it is published. It does not amend or revoke licences granted by the project or individual copyright holders for earlier releases or contributions.

## Before submitting

- Review the [GNU AGPL v3.0 licence](LICENSE).
- Make sure added dependencies are compatible with AGPL-3.0-only and preserve their own licence metadata and notices.
- Do not include copied code or assets unless you have verified that their licence permits inclusion and that all required notices are preserved.
- Keep changes focused and avoid unrelated application changes.

## Development

1. Fork the repository and create a focused branch.
2. Install dependencies and run the existing checks:

   ```bash
   npm install
   npm test
   npm run lint
   npm run build
   ```

3. Commit and open a pull request explaining the change.
