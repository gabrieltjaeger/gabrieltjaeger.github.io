/**
 * Next.js Instrumentation
 * 
 * This file runs before the application starts, allowing us to perform
 * setup tasks like environment validation
 * 
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  // Only run validation on server side
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { validateEnvOnStartup } = await import('@/infra/config/env-validator')
    
    try {
      validateEnvOnStartup()
    } catch (error) {
      // In development, log the error but don't crash
      if (process.env.NODE_ENV === 'development') {
        console.error('Environment validation failed, but continuing in development mode')
        console.error(error)
      } else {
        // In production, crash if validation fails
        throw error
      }
    }
  }
}
