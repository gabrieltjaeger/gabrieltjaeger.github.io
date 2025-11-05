#!/usr/bin/env node

/**
 * Environment Variables Validation Script
 * 
 * Run: npm run validate:env
 * 
 * This script manually loads .env.local to validate environment variables
 * before the application starts.
 */

const fs = require('fs')
const path = require('path')

// Manually load .env.local if it exists
function loadEnvFile(filename) {
  const envPath = path.join(process.cwd(), filename)
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    const lines = envContent.split('\n')
    
    lines.forEach(line => {
      const trimmed = line.trim()
      
      // Skip comments and empty lines
      if (!trimmed || trimmed.startsWith('#')) {
        return
      }
      
      // Parse KEY=VALUE
      const match = trimmed.match(/^([^=]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim()
        
        // Remove quotes if present
        const cleanValue = value.replace(/^["']|["']$/g, '')
        
        // Only set if not already set
        if (!process.env[key]) {
          process.env[key] = cleanValue
        }
      }
    })
  }
}

// Load env files in order (later files override earlier ones)
loadEnvFile('.env')
loadEnvFile('.env.local')

// Also check actual process.env for any system-set variables
// This ensures we validate what the app will actually see

const rules = [
  {
    name: 'NEXT_PUBLIC_SITE_URL',
    type: 'url',
    required: false,
    default: 'https://gabrieltjaeger.github.io',
  },
  {
    name: 'NEXT_PUBLIC_SITE_NAME',
    type: 'string',
    required: false,
    default: 'Gabriel Trugillo Jaeger',
  },
  {
    name: 'NEXT_PUBLIC_SITE_TITLE',
    type: 'string',
    required: false,
    default: 'Gabriel Jaeger | Software Architect',
  },
  {
    name: 'NEXT_PUBLIC_SITE_DESCRIPTION',
    type: 'string',
    required: false,
    default:
      'Portfolio showcasing software architecture, clean code, and scalable systems engineered by Gabriel Trugillo Jaeger.',
  },
  {
    name: 'NEXT_PUBLIC_SITE_KEYWORDS',
    type: 'string',
    required: false,
    default: '',
  },
  {
    name: 'NEXT_PUBLIC_CONTACT_EMAIL',
    type: 'string',
    required: false,
    default: 'hello@gabrieltjaeger.dev',
  },
  {
    name: 'NEXT_PUBLIC_OG_IMAGE',
    type: 'string',
    required: false,
    default: '/placeholder.jpg',
  },
  {
    name: 'NEXT_PUBLIC_DEFAULT_LOCALE',
    type: 'string',
    required: false,
    default: 'en',
    validValues: ['en', 'pt'],
  },
  {
    name: 'NEXT_PUBLIC_AVAILABLE_LOCALES',
    type: 'string',
    required: false,
    default: 'en,pt',
  },
  {
    name: 'NEXT_PUBLIC_DEFAULT_THEME',
    type: 'string',
    required: false,
    default: 'system',
    validValues: ['light', 'dark', 'system'],
  },
  {
    name: 'NEXT_PUBLIC_THEME_STORAGE_KEY',
    type: 'string',
    required: false,
    default: 'theme',
  },
  {
    name: 'NEXT_PUBLIC_DEBUG_MODE',
    type: 'boolean',
    required: false,
    default: 'false',
  },
  {
    name: 'PORT',
    type: 'number',
    required: false,
    default: '3000',
  },
  {
    name: 'PLAYWRIGHT_BASE_URL',
    type: 'url',
    required: false,
    default: 'http://127.0.0.1:3000',
  },
  {
    name: 'CYPRESS_BASE_URL',
    type: 'url',
    required: false,
    default: 'http://localhost:3000',
  },
  {
    name: 'NEXT_PUBLIC_GA_MEASUREMENT_ID',
    type: 'string',
    required: false,
  },
]

function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

function validateRule(rule) {
  const value = process.env[rule.name]
  const errors = []
  const warnings = []
  
  // Check required
  if (rule.required && !value) {
    errors.push(`${rule.name} is required but not set`)
    return { errors, warnings, value: rule.default }
  }
  
  // Use default if not set
  const finalValue = value || rule.default
  
  // Type validation
  if (value) {
    switch (rule.type) {
      case 'url':
        if (!isValidUrl(value)) {
          errors.push(`${rule.name} must be a valid URL. Got: "${value}"`)
        }
        break
      case 'number':
        if (isNaN(Number(value))) {
          errors.push(`${rule.name} must be a number. Got: "${value}"`)
        }
        break
      case 'boolean':
        if (value !== 'true' && value !== 'false') {
          errors.push(`${rule.name} must be 'true' or 'false'. Got: "${value}"`)
        }
        break
      case 'string':
        if (rule.validValues && !rule.validValues.includes(value)) {
          errors.push(
            `${rule.name} must be one of: ${rule.validValues.join(', ')}. Got: "${value}"`
          )
        }
        break
    }
  } else {
    warnings.push(`${rule.name} not set, using default: "${rule.default}"`)
  }
  
  return { errors, warnings, value: finalValue }
}

function main() {
  console.log('\n╔═══════════════════════════════════════════════════════════════════════╗')
  console.log('║                   Environment Variables Status                        ║')
  console.log('╚═══════════════════════════════════════════════════════════════════════╝\n')
  
  const allErrors = []
  const allWarnings = []
  const config = {}
  
  // Validate each rule
  rules.forEach(rule => {
    const result = validateRule(rule)
    allErrors.push(...result.errors)
    allWarnings.push(...result.warnings)
    config[rule.name] = result.value
  })
  
  // Additional cross-validation
  const availableLocales = (config.NEXT_PUBLIC_AVAILABLE_LOCALES || '').split(',')
  const defaultLocale = config.NEXT_PUBLIC_DEFAULT_LOCALE
  
  if (defaultLocale && !availableLocales.includes(defaultLocale)) {
    allErrors.push(
      `NEXT_PUBLIC_DEFAULT_LOCALE ("${defaultLocale}") must be in NEXT_PUBLIC_AVAILABLE_LOCALES`
    )
  }
  
  // Production checks
  if (process.env.NODE_ENV === 'production') {
    if (config.NEXT_PUBLIC_DEBUG_MODE === 'true') {
      allWarnings.push('NEXT_PUBLIC_DEBUG_MODE is enabled in production')
    }
    
    if (config.NEXT_PUBLIC_SITE_URL?.includes('localhost')) {
      allErrors.push('NEXT_PUBLIC_SITE_URL should not be localhost in production')
    }
  }
  
  // Display results
  const isValid = allErrors.length === 0
  
  if (isValid) {
    console.log('✅ All environment variables are valid!\n')
  } else {
    console.log('❌ Environment validation failed!\n')
  }
  
  // Show errors
  if (allErrors.length > 0) {
    console.log('🚨 ERRORS:')
    allErrors.forEach((error, i) => {
      console.log(`   ${i + 1}. ${error}`)
    })
    console.log()
  }
  
  // Show warnings
  if (allWarnings.length > 0) {
    console.log('⚠️  WARNINGS:')
    allWarnings.forEach((warning, i) => {
      console.log(`   ${i + 1}. ${warning}`)
    })
    console.log()
  }
  
  // Show configuration
  console.log('📋 Configuration:')
  Object.entries(config).forEach(([key, value]) => {
    const isSet = !!process.env[key]
    const marker = isSet ? '(set)' : '(default)'
    console.log(`   ${key}: ${value} ${marker}`)
  })
  console.log()
  
  if (!isValid) {
    console.log('💡 To fix: Check your .env.local file and ensure all variables are set correctly.')
    console.log('💡 See ENV_VARIABLES.md for detailed documentation.\n')
    process.exit(1)
  }
  
  console.log('✅ Ready to run!\n')
  process.exit(0)
}

main()
