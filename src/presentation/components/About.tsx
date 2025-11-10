import { AboutClient } from "./AboutClient"

interface AboutProps {
  story: string
  interests: string[]
  currently: {
    learning: string
    reading: string
    building: string
  }
  translations: (t: string) => {}
}

export async function About({ story, interests, currently, translations }: AboutProps) {

  console.log(translations('hero.title'))

  return (
    <AboutClient
      story={story}
      interests={interests}
      currently={currently}
      translations={{
        title: translations("title"),
        whatILove: translations("whatILove"),
        currently: translations("currently"),
        learning: translations("learning"),
        reading: translations("reading"),
        building: translations("building"),
      }}
    />
  )
}
