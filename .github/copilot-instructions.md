---
applyTo: "**"
---

# Project general coding standards

## Naming Conventions

- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Use ALL_CAPS for constants

### General Guidelines

- Design code such that it is easy to replace and delete
- Single Responsibility: Each component should ideally have one primary responsibility. Components should be kept small and focused.
- Each component should have it's own folder, containing all related files (e.g., styles, tsx, types.ts).
- When creating a component folder, put it in the folder of the parent component that uses it, unless it is shared across multiple components.
- When a new type is created for a component, it should be placed in a types.ts file within the same folder as the component.
- For all types that are not specific to a single component, put it in the src/types folder.
- When creating a style file, you should create an exported interface called I[ComponentName]Styles in the same file, as well as an exported const object called [ComponentName]Styles that returns the styles object.
- When using a style file in a component, import the styles object.
