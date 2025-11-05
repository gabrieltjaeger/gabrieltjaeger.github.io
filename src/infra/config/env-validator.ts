/**
 * Environment Variable Validator
 * 
 * Validates all environment variables on application startup
 * Provides clear error messages for missing or invalid configuration
 */

type EnvVarType = 'string' | 'number' | 'boolean' | 'url' | 'locale' | 'theme'

interface EnvVarRule {
  name: string
  type: EnvVarType
  required: boolean
  default?: string
  validValues?: string[]
  description: string
  clientSide: boolean // NEXT_PUBLIC_ variables
}

const envVarRules: EnvVarRule[] = [
  // Site Configuration
  {
    name: 'NEXT_PUBLIC_SITE_URL',
    type: 'url',
    required: false,
    default: 'https://gabrieltjaeger.github.io',
    description: 'Base URL of the website for sitemap and SEO',
    clientSide: true,
  },
  {
    name: 'NEXT_PUBLIC_DEFAULT_LOCALE',
    type: 'locale',
    required: false,
    default: 'en',
    validValues: ['en', 'pt'],
    description: 'Default language/locale for the application',
    clientSide: true,
  },
  {
    name: 'NEXT_PUBLIC_AVAILABLE_LOCALES',
    type: 'string',
    required: false,
    default: 'en,pt',
    description: 'Comma-separated list of available locales',
    clientSide: true,
  },
  
  // Theme Configuration
  {
    name: 'NEXT_PUBLIC_DEFAULT_THEME',
    type: 'theme',
    required: false,
    default: 'system',
    validValues: ['light', 'dark', 'system'],
    description: 'Default theme mode (light, dark, or system)',
    clientSide: true,
  },
  {
    name: 'NEXT_PUBLIC_THEME_STORAGE_KEY',
    type: 'string',
    required: false,
    default: 'theme',
    description: 'LocalStorage key for theme persistence',
    clientSide: true,
  },
  {
    name: 'NEXT_PUBLIC_DEBUG_MODE',
    type: 'boolean',
    required: false,
    default: 'false',
    validValues: ['true', 'false'],
    description: 'Enable debug mode (shows theme debug panel)',
    clientSide: true,
  },
  
  // Development
  {
    name: 'PORT',
    type: 'number',
    required: false,
    default: '3000',
    description: 'Port for Next.js development server',
    clientSide: false,
  },
  
  // Testing
  {
    name: 'PLAYWRIGHT_BASE_URL',
    type: 'url',
    required: false,
    default: 'http://127.0.0.1:3000',
    description: 'Base URL for Playwright e2e tests',
    clientSide: false,
  },
  {
    name: 'CYPRESS_BASE_URL',
    type: 'url',
    required: false,
    default: 'http://localhost:3000',
    description: 'Base URL for Cypress e2e tests',
    clientSide: false,
  },
]

class EnvValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EnvValidationError'
  }
}

function validateUrl(value: string, varName: string): void {
  try {
    new URL(value)
  } catch {
    throw new EnvValidationError(
      `${varName}: Invalid URL format. Got: "${value}"`
    )
  }
}

function validateNumber(value: string, varName: string): void {
  const num = Number(value)
  if (isNaN(num)) {
    throw new EnvValidationError(
      `${varName}: Must be a valid number. Got: "${value}"`
    )
  }
}

function validateBoolean(value: string, varName: string): void {
  if (value !== 'true' && value !== 'false') {
    throw new EnvValidationError(
      `${varName}: Must be 'true' or 'false'. Got: "${value}"`
    )
  }
}

function validateLocale(value: string, varName: string, validValues?: string[]): void {
  if (validValues && !validValues.includes(value)) {
    throw new EnvValidationError(
      `${varName}: Invalid locale. Expected one of: ${validValues.join(', ')}. Got: "${value}"`
    )
  }
}

function validateTheme(value: string, varName: string, validValues?: string[]): void {
  if (validValues && !validValues.includes(value)) {
    throw new EnvValidationError(
      `${varName}: Invalid theme. Expected one of: ${validValues.join(', ')}. Got: "${value}"`
    )
  }
}

function validateEnvVar(rule: EnvVarRule): { valid: boolean; error?: string; value?: string } {
  const value = process.env[rule.name]
  
  // Check if required variable is missing
  if (rule.required && !value) {
    return {
      valid: false,
      error: `${rule.name} is required but not set. ${rule.description}`,
    }
  }
  
  // Use default if not set
  if (!value) {
    return {
      valid: true,
      value: rule.default,
    }
  }
  
  // Validate based on type
  try {
    switch (rule.type) {
      case 'url':
        validateUrl(value, rule.name)
        break
      case 'number':
        validateNumber(value, rule.name)
        break
      case 'boolean':
        validateBoolean(value, rule.name)
        break
      case 'locale':
        validateLocale(value, rule.name, rule.validValues)
        break
      case 'theme':
        validateTheme(value, rule.name, rule.validValues)
        break
      case 'string':
        // Basic string validation
        if (rule.validValues && !rule.validValues.includes(value)) {
          return {
            valid: false,
            error: `${rule.name}: Invalid value. Expected one of: ${rule.validValues.join(', ')}. Got: "${value}"`,
          }
        }
        break
    }
    
    return {
      valid: true,
      value,
    }
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown validation error',
    }
  }
}

export function validateEnvironment(): {
  isValid: boolean
  errors: string[]
  warnings: string[]
  config: Record<string, string>
} {
  const errors: string[] = []
  const warnings: string[] = []
  const config: Record<string, string> = {}
  
  // Validate each rule
  for (const rule of envVarRules) {
    const result = validateEnvVar(rule)
    
    if (!result.valid) {
      errors.push(result.error || 'Unknown error')
    } else {
      const finalValue = result.value || rule.default || ''
      config[rule.name] = finalValue
      
      // Warn if using default value
      if (!process.env[rule.name] && rule.default) {
        warnings.push(
          `${rule.name} not set, using default: "${rule.default}"`
        )
      }
    }
  }
  
  // Additional validations
  
  // Check if DEBUG_MODE is enabled in production
  if (process.env.NODE_ENV === 'production' && config.NEXT_PUBLIC_DEBUG_MODE === 'true') {
    warnings.push(
      'NEXT_PUBLIC_DEBUG_MODE is enabled in production. Consider disabling it for better performance and security.'
    )
  }
  
  // Check if SITE_URL is localhost in production
  if (process.env.NODE_ENV === 'production' && config.NEXT_PUBLIC_SITE_URL?.includes('localhost')) {
    errors.push(
      'NEXT_PUBLIC_SITE_URL should not be localhost in production environment'
    )
  }
  
  // Check if available locales includes default locale
  const availableLocales = config.NEXT_PUBLIC_AVAILABLE_LOCALES?.split(',') || []
  const defaultLocale = config.NEXT_PUBLIC_DEFAULT_LOCALE
  if (defaultLocale && !availableLocales.includes(defaultLocale)) {
    errors.push(
      `NEXT_PUBLIC_DEFAULT_LOCALE ("${defaultLocale}") must be included in NEXT_PUBLIC_AVAILABLE_LOCALES ("${config.NEXT_PUBLIC_AVAILABLE_LOCALES}")`
    )
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    config,
  }
}

export function getEnvSummary(): string {
  const validation = validateEnvironment()
  
  let summary = '\n'
  summary += '╔═══════════════════════════════════════════════════════════════════════╗\n'
  summary += '║                   Environment Variables Status                        ║\n'
  summary += '╚═══════════════════════════════════════════════════════════════════════╝\n\n'
  
  if (validation.isValid) {
    summary += '✅ All environment variables are valid!\n\n'
  } else {
    summary += '❌ Environment validation failed!\n\n'
  }
  
  // Show errors
  if (validation.errors.length > 0) {
    summary += '🚨 ERRORS:\n'
    validation.errors.forEach((error, index) => {
      summary += `   ${index + 1}. ${error}\n`
    })
    summary += '\n'
  }
  
  // Show warnings
  if (validation.warnings.length > 0) {
    summary += '⚠️  WARNINGS:\n'
    validation.warnings.forEach((warning, index) => {
      summary += `   ${index + 1}. ${warning}\n`
    })
    summary += '\n'
  }
  
  // Show configuration
  summary += '📋 Configuration:\n'
  Object.entries(validation.config).forEach(([key, value]) => {
    const rule = envVarRules.find(r => r.name === key)
    const isDefault = !process.env[key] && rule?.default
    const marker = isDefault ? '(default)' : '(set)'
    summary += `   ${key}: ${value} ${marker}\n`
  })
  
  summary += '\n'
  
  if (!validation.isValid) {
    summary += '💡 To fix: Check your .env.local file and ensure all required variables are set correctly.\n'
    summary += '💡 See ENV_VARIABLES.md for detailed documentation.\n'
  }
  
  return summary
}

/**
 * Validate environment on startup
 * Call this at the top of your application entry point
 */
export function validateEnvOnStartup(): void {
  const validation = validateEnvironment()
  
  // Always log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(getEnvSummary())
  }
  
  // Throw error if validation fails
  if (!validation.isValid) {
    console.error(getEnvSummary())
    throw new EnvValidationError(
      `Environment validation failed with ${validation.errors.length} error(s). See details above.`
    )
  }
  
  // Log warnings if any
  if (validation.warnings.length > 0 && process.env.NODE_ENV === 'production') {
    console.warn('⚠️  Environment validation warnings:', validation.warnings)
  }
}

// Export for use in other parts of the application
export { envVarRules, type EnvVarRule }
