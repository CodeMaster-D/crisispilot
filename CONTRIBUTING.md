# Contributing to Crisis Pilot

Thank you for your interest in contributing to the Crisis Pilot project! We're excited to have you help improve crisis response management and coordination. This document provides guidelines and information to help you get started with contributing.

## Code of Conduct

This project adheres to a Code of Conduct to ensure a welcoming and inclusive environment for all contributors. Please take a moment to [read the full text](./CODE_OF_CONDUCT.md) to understand the expectations for participation.

## Our Development Process

We use GitHub to manage our project, track issues, discuss feature requests, and review pull requests. Our process is designed to be transparent and collaborative, ensuring that every contribution is valuable and aligns with the project's goals.

## Getting Started: Setting Up Your Development Environment

Before you can start contributing, you need to set up the project on your local machine. Please follow the detailed setup instructions in the main [README.md](README.md) file. Here's a quick checklist with development-specific steps:

1. **Fork and Clone** the repository to your local machine.
2. **Install Dependencies** by running `npm install`.
3. **Set Environment Variables** - Create a `.env.local` file and add your `GEMINI_API_KEY`.
4. **Run Development Server** by running `npm run dev` to ensure everything works correctly.
5. **Prepare Development Tools:**
   - Use your preferred code editor (VS Code, WebStorm, etc.).
   - Ensure git is installed and configured on your machine.

## How to Contribute

We welcome contributions in various forms, including bug fixes, new features, performance optimizations, and documentation improvements. Please follow the steps below for a smooth contribution process.

### 1. Fork the Repository and Create a Branch

- Fork this repository to your GitHub account.
- Create a new branch from the `master` branch for your work. Use a descriptive name for your branch, for example:
  - `feature/add-crisis-alert-system` (new feature)
  - `fix/data-parsing-error` (bug fix)
  - `docs/improve-setup-guide` (documentation improvement)
  - `perf/optimize-data-loading` (performance optimization)

### 2. Make Your Changes

- **Code Structure:** The application is built with React, TypeScript, and Vite. Review the existing component structure in `src/components/` before making changes.
- **UI Components:** When adding new components, ensure they follow the existing design patterns and styling conventions.
- **Data Handling:** Template parsing and data processing logic is in `src/utils/` and `src/data/`. Ensure compatibility with existing data structures.
- **Type Safety:** Always use TypeScript types as defined in `src/types.ts` to maintain type safety across the application.
- **Dependencies:** Keep `package.json` updated if you add new packages. Test your changes to ensure they work with the existing environment.
- **Comments and Documentation:** Add clear comments explaining complex logic, especially in data parsing and crisis response handling.

### 3. Test Your Changes Thoroughly

Before submitting a pull request, it is crucial to test your changes to ensure they work as expected and don't introduce new issues. Please verify the following:

- **Functionality:** Test the feature or fix works as intended.
- **Compatibility:** Ensure your changes don't break existing functionality.
- **UI/UX:** Verify the interface looks correct and is responsive across different screen sizes.
- **Data Handling:** Test with sample crisis data to ensure proper parsing and display.
- **Performance:** Monitor the application for any performance regressions.
- **Edge Cases:** Test with unusual or unexpected input data.

### 4. Submit a Pull Request (PR)

- **Commit Your Changes:** Write clear and concise commit messages that describe your changes.
  - Example: `Fix: Resolve data parsing error in crisis templates`
  - Example: `Feat: Add real-time alert notification system`
- **Push to Your Fork:** Push your changes to the feature branch on your forked repository.
- **Open a Pull Request:** Navigate to the original repository on GitHub and open a new pull request against the `master` branch.
- **PR Description:** Provide a clear and detailed description of your changes in the PR, including:
  - What problem you're solving or what feature you're adding.
  - How you've tested the changes.
  - Any performance implications.
  - Screenshots if your change includes visual improvements.
  - Link to any relevant issues you're addressing.

We will review your pull request and provide feedback as soon as possible. Thank you for your contribution!

## Reporting Issues

If you find a bug or have a suggestion for a new feature, please open an issue on GitHub. When reporting a bug, please provide:

- A clear and descriptive title.
- Detailed steps to reproduce the issue.
- The expected behavior versus the actual behavior.
- Information about your environment (OS, browser, Node.js version).
- Any relevant error messages, logs, or screenshots.

## Areas of Contribution

If you're looking for ideas, here are some areas where we would particularly appreciate contributions:

1. **Feature Enhancements:**
   - Adding new crisis response templates.
   - Implementing advanced filtering and search capabilities.
   - Adding data export/import functionality.

2. **Performance Optimization:**
   - Optimizing data loading and parsing.
   - Reducing bundle size.
   - Improving application responsiveness.

3. **User Experience Improvements:**
   - Enhancing the UI/UX design.
   - Adding keyboard shortcuts.
   - Implementing undo/redo functionality.

4. **Compatibility and Testing:**
   - Testing across different browsers and devices.
   - Improving error handling and validation.
   - Adding automated tests.

5. **Documentation:**
   - Creating user guides and tutorials.
   - Writing detailed API documentation.
   - Providing configuration examples.

## Development Best Practices

- Keep your code clean and readable.
- Follow consistent naming conventions used in the project.
- Test your changes on different devices and browsers if possible.
- Ensure backward compatibility with existing code.
- Document your changes with comments explaining complex logic.
- Keep commits small and focused on single features or fixes.

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project. See the project's LICENSE file for the full terms.

## Questions or Need Help?

If you have questions or need assistance while contributing, please feel free to reach out:
- **Email:** djobmisael@gmail.com
- **GitHub Issues:** Open an issue on the repository
- **GitHub:** [@CodeMaster-D](https://github.com/CodeMaster-D)

---

Thank you for helping make Crisis Pilot better!
