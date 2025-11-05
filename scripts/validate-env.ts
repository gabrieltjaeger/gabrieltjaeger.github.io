#!/usr/bin/env node

/**
 * Environment Variables Validation Script
 * 
 * Run this script to validate your environment configuration:
 * npm run validate:env
 * 
 * Use --strict flag to treat warnings as errors:
 * npm run validate:env -- --strict
 */

import { getEnvSummary, validateEnvironment } from '../src/infra/config/env-validator'

const args = process.argv.slice(2)
const isStrict = args.includes('--strict')
const isQuiet = args.includes('--quiet')
const isJson = args.includes('--json')

function main() {
  const validation = validateEnvironment()
  
  // JSON output for CI/CD
  if (isJson) {
    console.log(JSON.stringify({
      valid: validation.isValid,
      errors: validation.errors,
      warnings: validation.warnings,
      config: validation.config,
    }, null, 2))
    process.exit(validation.isValid ? 0 : 1)
  }
  
  // Human-readable output
  if (!isQuiet) {
    console.log(getEnvSummary())
  }
  
  // Check for errors
  if (!validation.isValid) {
    console.error('❌ Environment validation failed!')
    process.exit(1)
  }
  
  // Check for warnings in strict mode
  if (isStrict && validation.warnings.length > 0) {
    console.error('❌ Environment validation failed in strict mode due to warnings!')
    process.exit(1)
  }
  
  // Success
  if (!isQuiet) {
    console.log('✅ Environment validation passed!')
  }
  process.exit(0)
}

main()
