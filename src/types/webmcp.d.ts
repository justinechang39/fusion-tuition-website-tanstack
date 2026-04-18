type WebMcpToolDefinition = {
  name: string
  title?: string
  description: string
  inputSchema?: Record<string, unknown>
  execute: (input: unknown) => unknown | Promise<unknown>
}

type WebMcpContextProvider = {
  provideContext?: (context: { tools: WebMcpToolDefinition[] }) => void
  registerTool?: (
    tool: WebMcpToolDefinition,
    options?: { signal?: AbortSignal },
  ) => void
}

declare global {
  interface Navigator {
    modelContext?: WebMcpContextProvider
  }
}

export {}
