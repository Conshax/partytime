export enum PersonGroup {
  CreativeDirection = "Creative Direction",
  Cast = "Cast",
  Writing = "Writing",
  AudioProduction = "Audio Production",
  AudioPostProduction = "Audio Post-Production",
  Administration = "Administration",
  Visuals = "Visuals",
  Community = "Community",
  Misc = "Misc.",
  VideoProduction = "Video Production",
  VideoPostProduction = "Video Post-Production",
}

export enum PersonRole {
  Director = "Director",
  AssistantDirector = "Assistant Director",
  ExecutiveProducer = "Executive Producer",
  SeniorProducer = "Senior Producer",
  Producer = "Producer",
  AssociateProducer = "Associate Producer",
  DevelopmentProducer = "Development Producer",
  CreativeDirector = "Creative Director",
  Host = "Host",
  CoHost = "Co-Host",
  GuestHost = "Guest Host",
  Guest = "Guest",
  VoiceActor = "Voice Actor",
  Narrator = "Narrator",
  Announcer = "Announcer",
  Reporter = "Reporter",
  Author = "Author",
  EditorialDirector = "Editorial Director",
  CoWriter = "Co-Writer",
  Writer = "Writer",
  Songwriter = "Songwriter",
  GuestWriter = "Guest Writer",
  StoryEditor = "Story Editor",
  ManagingEditor = "Managing Editor",
  ScriptEditor = "Script Editor",
  ScriptCoordinator = "Script Coordinator",
  Researcher = "Researcher",
  Editor = "Editor",
  FactChecker = "Fact Checker",
  Translator = "Translator",
  Transcriber = "Transcriber",
  Logger = "Logger",
  StudioCoordinator = "Studio Coordinator",
  TechnicalDirector = "Technical Director",
  TechnicalManager = "Technical Manager",
  AudioEngineer = "Audio Engineer",
  RemoteRecordingEngineer = "Remote Recording Engineer",
  PostProductionEngineer = "Post Production Engineer",
  AudioEditor = "Audio Editor",
  SoundDesigner = "Sound Designer",
  FoleyArtist = "Foley Artist",
  Composer = "Composer",
  ThemeMusic = "Theme Music",
  MusicProduction = "Music Production",
  MusicContributor = "Music Contributor",
  ProductionCoordinator = "Production Coordinator",
  BookingCoordinator = "Booking Coordinator",
  ProductionAssistant = "Production Assistant",
  ContentManager = "Content Manager",
  MarketingManager = "Marketing Manager",
  SalesRepresentative = "Sales Representative",
  SalesManager = "Sales Manager",
  GraphicDesigner = "Graphic Designer",
  CoverArtDesigner = "Cover Art Designer",
  SocialMediaManager = "Social Media Manager",
  Consultant = "Consultant",
  Intern = "Intern",
  CameraOperator = "Camera Operator",
  LightingDesigner = "Lighting Designer",
  CameraGrip = "Camera Grip",
  AssistantCamera = "Assistant Camera",
  AssistantEditor = "Assistant Editor",
}

export const PersonTaxonomy = new Map<PersonGroup, string[]>([
  [
    PersonGroup.CreativeDirection,
    [
      /* The Director is the head of the entire creative production, from creative details to logistics. There is typically a single director for a production. This role is primarily seen in fiction podcasts. */
      "Director",
      /* The Assistant Director is a liaison between the director and the rest of the production, often coordinating the daily logistics of production. There may be multiple assistant directors on a project. This role is primarily seen in fiction podcasts. */
      "Assistant Director",
      /* The Executive Producer is the lead producer on a production. The role can range in terms of creative control with some &quot;EP&quot;s owning the creative direction of a podcast (in effect taking the role of director), while others may take a more hands off approach. Executive producer may have raised the money to fund the production, but it is not a necessary responsibility of the role. */
      "Executive Producer",
      /* The Senior Producer is the second most senior producer of the production (second to the Executive Producer). They supervise producers and the general direciton and logistics of the entire production. */
      "Senior Producer",
      /* The Producer coordinates and executes the production of the podcast. There duties can include helping craft the creative direction of a project, budgeting, research, scheduling, and overseeing editing and final production. */
      "Producer",
      /* The Associate Producer performs one or more producer functions as delegated to them by a Producer. */
      "Associate Producer",
      /* The Development Producer coordinates and executes the pre-production create direction of a podcast. Their responsibilities include finding new episode and series ideas and working with writers and researchers to prepare the concept for production. */
      "Development Producer",
      /* The Creative Director is responsible for the creative strategy and execution of an entire series. Often this role reaches outside of content to affect accompanying artwork, music, marketing campaigns, and more. */
      "Creative Director",
    ],
  ],
  [
    PersonGroup.Cast,
    [
      /* The Host is the on-air master of ceremonies of the podcast and a consistent presence on every episode (with the exception of guest hosts and alternative episodes). The Host&#x27;s duties may include conducting interviews, introducing stories and segments, narrating, and more. There may be more than one Host per podcast or episode. */
      "Host",
      /* The Co-Host performs many of the same duties as the host, while taking a secondary presence on the podcast. */
      "Co-Host",
      /* The Guest Host performs all of the duties of the traditional Host role, but does so in a temporary capacity. Often as a single appearance or a short span of episodes. */
      "Guest Host",
      /* The Guest is an outside party who makes an on-air appearance on an episode, often as a participant in a panel or the interview subject. */
      "Guest",
      /* The Voice Actor gives a performance in which they lend their voice to the role of a character on a podcast episode. While the majority of voice acting roles will be fictional, the role of voice actor may also cover reenactments of real conversations and people. */
      "Voice Actor",
      /* The Narrator gives a performance in which tell the exposition of a fictional or non-fictional story, often in a scripted manner. The Narrator may also perform voices of characters within the story, provided they still maintain the role of exposition storyteller or &quot;voice of God&quot;. */
      "Narrator",
      /* The Announcer gives short vocal performances for the introduction of the podcast, episode topics, segments, guests, prizes, etc. The Announcer is secondary to the host of the podcast and often performs their introductions in a scripted, produced manner. */
      "Announcer",
      /* The Reporter finds and investigates news or stories for the podcast, often interviewing subjects and conducting research. The Reporter can be an on-air position as well, as they convey the insights of their investigation. */
      "Reporter",
    ],
  ],
  [
    PersonGroup.Writing,
    [
      /* The Author has written prose or poetry originally intended for text that is now being read verbatim on air. */
      "Author",
      /* The Editorial Director heads all departments of the organization behind the podcast and is held accountable for delegating tasks to staff members and managing them. They are the highest-ranking editor and are responsible for the direction, accuracy, and decisions behind podcast content. */
      "Editorial Director",
      /* The Co-Writer has written a podcast in partnership with 1-2 other writers, sharing credit together for the creative arc, dialogue, and narration. */
      "Co-Writer",
      /* The Writer has written the story or dialogue of a podcast. The Writer is often involved in the creative arc of a production, but this is not a necessary requirement. Writers may work in fictional or non-fictional podcasts. */
      "Writer",
      /* The Songwriter has written the lyrics and/or accompanying music to an original song created for the podcast and played on an episode. */
      "Songwriter",
      /* The Guest Writer performs the duties of a writer in a temporary capacity, often as a single episode or a short span of episodes. The distinction between writer and Guest Writer depends on the decision of the podcast itself. */
      "Guest Writer",
      /* The Story Editor is responsible for broad stroke direction of the story arc and character development of a podcast. Often seen in fiction and documentary podcasts. */
      "Story Editor",
      /* The Managing Editor oversees and coordinates the podcasts editorial activities, providing both detailed editing and managing a staff of writers and editors to ensure proper deadlines and budgets are being met. */
      "Managing Editor",
      /* The Script Editor provides notes and editing to the recording script in a very &quot;hands on&quot; role. The Script Editor is primarily used in fiction, documentary, and advertisements where scripted recordings are prevalent. */
      "Script Editor",
      /* The Script Coordinator packages the final script with annotations that reflect specific logistics and creative cues for recording and production. */
      "Script Coordinator",
      /* The Researcher coordinates the sourcing and verification of information that can then be used for the content of a podcast episode, often informing the direction of a story based on new insights uncovered. */
      "Researcher",
      /* The Editor reviews and prepares scripts for conveying information in a creative, accurate, and engaging manner. */
      "Editor",
      /* The Fact Checker reviews the content of a podcast for factual correctness and verifies that quote attribution is correct. They use a variety of tools including 3rd party research and individual outreach. Often the Fact Checker will also provide notes on how the production can avoid the confusion in the delivery of information in the episode. */
      "Fact Checker",
      /* The Translator converts content from one language to another for the podcast. This can be interviews, dialogue, text documents, and more. The Translator&#x27;s work may be used on-air or behind-the-scenes during the production/research process. */
      "Translator",
      /* The Transcriber turns dialogue and audio cues into text, which can be used internally for production processes or displayed publicly for listeners. */
      "Transcriber",
      /* The Logger reviews and documents the contents and timestamps of raw audio in service of producers and editors in the production process. */
      "Logger",
    ],
  ],
  [
    PersonGroup.AudioProduction,
    [
      /* The Studio Coordinator manages the recording studio and audio technicians working within the studio at the time of recording. */
      "Studio Coordinator",
      /* The Technical Director oversees the podcast&#x27;s recording and production as it is involved with audio technologies including hardware and software, and managing roles involved these areas. */
      "Technical Director",
      /* The Technical Manager coordinates a team of audio engineers and studio staff, in the recording and production as it is involved with audio technologies including hardware and software. */
      "Technical Manager",
      /* The Audio Engineer helps record and produce audio by setting up recording environments, monitoring recoding, and providing technical adjustments throughout. The Audio Engineer is present during the recording process, most often making adjustments in real time. The Audio Engineer may work with conversation, music, foley, or any other type of audio. */
      "Audio Engineer",
      /* The Remote Recording Engineer ensures the proper recording of conversations taking place in multiple locations across a phone line or internet connection. The Remote Recording Engineer evaluates the different recording set ups and attempts to reconcile them into a cohesive sound, while also monitoring the recording process to capture the best possible audio. */
      "Remote Recording Engineer",
      /* The Post Production Engineer evaluates audio technologies and their application as it pertains to the final steps of production and publication. */
      "Post Production Engineer",
    ],
  ],
  [
    PersonGroup.AudioPostProduction,
    [
      /* The Audio Editor cuts and rearranges audio for clarity and storytelling purposes. The Audio Editor may also perform general audio processing and mastering. */
      "Audio Editor",
      /* The Sound Designer creates and composes a variety of audio elements. These elements are mostly secondary to speech, but a Sound Designer may creatively edit/produce speech elements in an artist manner. */
      "Sound Designer",
      /* The Foley Artist sound effects for a podcast and can do so both via physical recording and digital processing, or a combination of the two. */
      "Foley Artist",
      /* The Composer writes an original musical piece (or multiple) that is played on the published episode. The Composer will also often be the performer of said musical piece. */
      "Composer",
      /* Theme Music is a musical piece that accompanies the podcast across multiple episodes, most often at the beginning of an episode. The Theme Music is used to introduce the podcast as a brand. This role is for the creator of the theme music. */
      "Theme Music",
      /* The Music Production role helps creatively craft music in a role separate from the writing of said music. Music Production often involves creative decisions per the method in which music is recorded, the arrangement of instruments, the use of effects, and more. */
      "Music Production",
      /* The Music Contributor is the creator of music that was used for the podcast but not necessarily produced specifically for the podcast. Often a podcast will use an existing musical piece and credit the original creator. */
      "Music Contributor",
    ],
  ],
  [
    PersonGroup.Administration,
    [
      /* The Production Coordinator is responsible for managing the logistics of the production process from recording to publication, including attaining the required permissions and permits, connecting the various production and recording teams, coordinating the creation of post-production metadata, budgeting, and more. */
      "Production Coordinator",
      /* The Booking Coordinator is responsible for bringing on new guests for interviews, including sourcing guests, scheduling interviews, onboarding materials, and post-publication processes. */
      "Booking Coordinator",
      /* The Production Assistant helps support an executive member of a podcast (often a director or producer), helping prepare them in a variety of ways including scheduling, logistics, communications, and more. */
      "Production Assistant",
      /* The Content Manager is responsible for the distribution of a podcast&#x27;s content within and outside of episode, including but not limited to clips, newsletters, images, cross-promotions, and more. */
      "Content Manager",
      /* The Marketing Manager is responsibile for the promotion of a podcast&#x27;s content through various awareness strategies such as social media campaigns, cultivating a web presence, managing public relations and communications strategies, and other creative techniques to acquire and retain listeners. */
      "Marketing Manager",
      /* The Sales Representative is responsible for monetization of podcast content through managing and selling advertising inventory. */
      "Sales Representative",
      /* The Sales Manager is responsible for all aspects of podcast monetization such as overseeing Sales Representatives, managing advertising inventory, and devising monetization strategies through channels such as affiliate partnerships, merchandise, live events, and other revenue strategies. */
      "Sales Manager",
    ],
  ],
  [
    PersonGroup.Visuals,
    [
      /* The Graphic Designer is someone who has created any custom visuals to accompany the podcast in a variety of ways. */
      "Graphic Designer",
      /* The Cover Art Designer creates the displayed cover art of a podcast or episode. For clarity, cover art is the main image (almost always square in dimensions) accompanying the podcast in directories, while episode cover art is displayed in a similar manner at the episode level. This role may be a digital designer, artist, photographer or any other visual creative. */
      "Cover Art Designer",
    ],
  ],
  [
    PersonGroup.Community,
    [
      /* The Social Media Manager runs the social media accounts of the podcast, including but not limited to the creation of content, posting, replies, monitoring, and more. */
      "Social Media Manager",
    ],
  ],
  [
    PersonGroup.Misc,
    [
      /* A Consultant is a third-party position where someone from outside the organization works on a project, often offering a specific expertise. This is a modifier role and can be applied to any work area. */
      "Consultant",
      /* An Intern is an apprentice position where someone works for a limited time within an organization to gain work experience in a specific field. This is a modifier role and can be applied to any work area. */
      "Intern",
    ],
  ],
  [
    PersonGroup.VideoProduction,
    [
      /* A camera operator is responsible for capturing and recording all aspects of a scene for film and television. They must understand the technicalities of how to operate a camera, frame a proper shot with respect to lighting and staging, focus the lens and have a visual eye to achieve a specific look. */
      "Camera Operator",
      /* A lighting designer works with the DP and Director to craft a specific look and feel of a scene utilizing various lighting techniques. They must be able to interpret the creative direction and bring it to life. */
      "Lighting Designer",
      /* A camera grip is responsible for building and maintaining all the parts of a camera and its accessories such as the tripods, cranes, dollies, etc. */
      "Camera Grip",
      /* 1st AC is responsible for the camera equipment, building the cameras before the start of each day, organizing all the parts and various accessories, swapping out lenses when necessary and also pulls focus for the DP and camera operators. The AC will also wrap out each day by cleaning the cameras, writing camera notes, marking the media cards, and delivering them to the DIT. */
      "Assistant Camera",
    ],
  ],
  [
    PersonGroup.VideoPostProduction,
    [
      /* Television editors are responsible for taking the shot footage and clips and blending them together to craft the director&#x27;s vision and storytelling. */
      "Editor",
      /* The Assistant Editor is responsible for taking the media from the set, ingesting them into the designated editing software, and organizing the footage in an efficient way for the editor. They must also pay close attention to ensure that audio and video are synced and that all footage from set is ingested properly. */
      "Assistant Editor",
    ],
  ],
]);
