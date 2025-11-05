import { GetAllExperiences } from '@/core/use-cases/GetAllExperiences'
import { GetAllProjects } from '@/core/use-cases/GetAllProjects'
import { GetAllSkills } from '@/core/use-cases/GetAllSkills'
import { GetAllTestimonials } from '@/core/use-cases/GetAllTestimonials'
import { GetAllBlogPosts } from '@/core/use-cases/GetAllBlogPosts'
import { GetBlogPostById } from '@/core/use-cases/GetBlogPostById'
import { GetFeaturedProjects } from '@/core/use-cases/GetFeaturedProjects'
import { GetProfile } from '@/core/use-cases/GetProfile'
import { JsonBlogRepository } from '@/infra/repositories/JsonBlogRepository'
import { JsonExperienceRepository } from '@/infra/repositories/JsonExperienceRepository'
import { JsonProfileRepository } from '@/infra/repositories/JsonProfileRepository'
import { JsonProjectRepository } from '@/infra/repositories/JsonProjectRepository'
import { JsonSkillRepository } from '@/infra/repositories/JsonSkillRepository'
import { JsonTestimonialRepository } from '@/infra/repositories/JsonTestimonialRepository'
import { loadProfileContent, loadProjectsContent } from '@/lib/content-loader'
import type { Locale } from '@/infra/adapters/i18n/config'

export function createPortfolioServices(locale: Locale) {
  const profileRepository = new JsonProfileRepository(locale)
  const skillRepository = new JsonSkillRepository(locale)
  const experienceRepository = new JsonExperienceRepository(locale)
  const testimonialRepository = new JsonTestimonialRepository(locale)
  const projectRepository = new JsonProjectRepository(locale)
  const blogRepository = new JsonBlogRepository(locale)

  const getProfile = new GetProfile(profileRepository)
  const getAllSkills = new GetAllSkills(skillRepository)
  const getAllExperiences = new GetAllExperiences(experienceRepository)
  const getAllTestimonials = new GetAllTestimonials(testimonialRepository)
  const getAllProjects = new GetAllProjects(projectRepository)
  const getFeaturedProjects = new GetFeaturedProjects(projectRepository)
  const getAllBlogPosts = new GetAllBlogPosts(blogRepository)
  const getBlogPostById = new GetBlogPostById(blogRepository)

  return {
    locale,
    profile: {
      getProfile: () => getProfile.execute(),
      loadContent: () => loadProfileContent(locale),
    },
    skills: {
      getAll: () => getAllSkills.execute(),
    },
    experiences: {
      getAll: () => getAllExperiences.execute(),
    },
    testimonials: {
      getAll: () => getAllTestimonials.execute(),
    },
    projects: {
      getAll: () => getAllProjects.execute(),
      getFeatured: () => getFeaturedProjects.execute(),
      findById: (id: string) => projectRepository.findById(id),
      loadContent: () => loadProjectsContent(locale),
    },
    blog: {
      getAll: () => getAllBlogPosts.execute(),
      getById: (id: string) => getBlogPostById.execute(id),
    },
  }
}
