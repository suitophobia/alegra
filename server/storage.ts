
import { db } from "./db";
import { alegraPackages, alegraPosts, alegraInquiries, type InsertPackage, type InsertPost, type InsertInquiry, type Package, type Post, type Inquiry } from "@shared/schema";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getPackages(): Promise<Package[]>;
  getPackage(slug: string): Promise<Package | undefined>;
  getPosts(): Promise<Post[]>;
  getPost(slug: string): Promise<Post | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  seed(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getPackages(): Promise<Package[]> {
    return await db.select().from(alegraPackages);
  }

  async getPackage(slug: string): Promise<Package | undefined> {
    const [pkg] = await db.select().from(alegraPackages).where(eq(alegraPackages.slug, slug));
    return pkg;
  }

  async getPosts(): Promise<Post[]> {
    return await db.select().from(alegraPosts);
  }

  async getPost(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(alegraPosts).where(eq(alegraPosts.slug, slug));
    return post;
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [newInquiry] = await db.insert(alegraInquiries).values(inquiry).returning();
    return newInquiry;
  }

  async seed(): Promise<void> {
    await db.insert(alegraPackages).values([
        {
          title: "Costa Rica: Turtle & Wildlife Conservation",
          slug: "costa-rica-sea-turtle",
          description: "Protect endangered sea turtles along Costa Rica's stunning Pacific coast while exploring crocodilian habitats, coral restoration, and lush rainforest — a true coastal and jungle adventure for families.",
          imageUrl: "/images/costa-rica-turtle.jpg",
          location: "Pacific Coast, Costa Rica",
          duration: "1 Week",
          volunteerFocus: "Sea Turtle & Wildlife Conservation",
          priceRange: "From €1,160 per person",
          isFeatured: true,
          content: "Set along Costa Rica's breathtaking Pacific Coast, this conservation project has been protecting endangered sea turtles and other vulnerable wildlife since 2009. Created by local scientists and community members, it combines biological research with hands-on action — and has contributed to the release of over 60,000 hatchlings.\n\nAs a volunteer, you will take part in beach night patrols between dusk and dawn, watching for nesting turtles and deterring poachers. During nesting season, you will help relocate eggs to a protected hatchery safe from predators and erosion. During hatching season, you will excavate nests, record data, and release hatchlings into the ocean.\n\nBeyond turtles, the project offers an extraordinary range of conservation activities. You may monitor crocodilians and reptiles along the Térraba River, track mammals including monkeys, sloths, and anteaters through the jungle using camera traps, visit a coral restoration lab helping to rebuild bleached reefs in Marino Ballena National Park, and work in an on-site butterfly garden that breeds at-risk species like Monarchs.\n\nCommunity education is central to the project — volunteers visit local schools, run workshops, and help children explore insect life cycles and the importance of conservation.\n\nIn your free time, families can enjoy surf lessons, horseback riding, zip-lining, hiking to waterfalls, whale watching (August–October), snorkelling, and diving.\n\nThe project runs year-round with arrivals every Monday. Accommodation, meals, and transfers from San José are included. Families simply need to arrange flights, travel insurance, and visa fees.",
        },
        {
          title: "Zimbabwe: Rhino & Elephant Conservation",
          slug: "zimbabwe-imire-rhino-elephant",
          description: "A life-changing family volunteering experience at a private conservancy, working hands-on with endangered black and white rhinos and elephants in the heart of Zimbabwe.",
          imageUrl: "/images/imire-rhino.jpg",
          location: "Wedza, Zimbabwe",
          duration: "1 Week",
          volunteerFocus: "Rhino & Elephant Conservation",
          priceRange: "From €790 per person",
          isFeatured: true,
          content: "This family-run conservancy offers a unique opportunity to volunteer with endangered rhinos and elephants. As a volunteer, you will work alongside conservation experts on daily care of black and white rhinos and African elephants, carry out wildlife monitoring and behaviour observations, assist with anti-poaching patrols and conservancy management, educate local schoolchildren about conservation and the environment, and experience day-to-day life in rural Zimbabwe through meaningful community projects.\n\nAn optional horse-riding safari programme lets families explore the bush on horseback — locating animals, performing game counts, conducting snare patrols, and monitoring fences and boundaries from a unique elevated perspective.\n\nArrivals and departures are every Monday, with return transfers from Harare International Airport included. Accommodation, three meals a day, housekeeping, laundry, activities, and equipment are all provided. Families simply need to arrange flights, travel insurance, and visa fees.\n\nThe conservancy plays a vital role in protecting and propagating endangered species to ensure viable wildlife populations continue to exist. Volunteering here gives families a behind-the-scenes understanding of what it truly takes to safeguard Africa's wildlife — a far deeper experience than ordinary travel.",
        },
        {
          title: "Sri Lanka: Sea Turtle Conservation",
          slug: "sri-lanka-sea-turtle",
          description: "Help protect endangered sea turtles along Sri Lanka's stunning southwestern coast — from burying rescued eggs and caring for hatchlings to releasing baby turtles into the ocean at dusk.",
          imageUrl: "/images/sri-lanka-turtle.jpg",
          location: "Kosgoda, Sri Lanka",
          duration: "1 Week",
          volunteerFocus: "Sea Turtle Conservation",
          priceRange: "From €810 per person",
          isFeatured: true,
          content: "Perched along the southwestern coast of Sri Lanka, this family-run turtle sanctuary offers a vital lifeline for the country's sea turtle populations. Despite legal protection, approximately only 1 in 1,000 hatchlings survive to adulthood due to predators, habitat loss, and human impact. Every nest, egg, and hatchling represents a critical link in the chain of survival for these vulnerable species.\n\nThe sanctuary sits on a stunning beach that is a vital nesting spot for olive ridley, green, and hawksbill turtles — all ranging from vulnerable to critically endangered. As a volunteer, you will contribute directly to increasing turtle survival rates and raising awareness in local communities about the importance of turtle conservation.\n\nDaily activities include caring for the sanctuary's resident turtles by feeding them and cleaning tanks, carefully burying rescued eggs in protected hatcheries, and the highlight — releasing hatchlings into the sea at dusk when fewer predators are around. You will also help with regular beach clean-ups to remove plastic pollution and marine debris, and may have the opportunity to lead educational sanctuary tours for local visitors and teach English to schoolchildren.\n\nThe project runs year-round with arrivals every Monday. Accommodation, meals, airport transfers from Colombo, and all activities are included. Families simply need to arrange flights, travel insurance, and visa fees.\n\nThis is a wholesome, hands-on conservation experience where your family can directly boost the number of hatchlings returning to the sea — and the very turtles you release could return to nest on these shores for decades to come.",
        },
        {
          title: "Costa Rica: Sloth & Wildlife Sanctuary",
          slug: "costa-rica-sloth-wildlife",
          description: "Care for rescued sloths, monkeys, anteaters, and exotic birds at a rainforest wildlife sanctuary in Costa Rica — helping rehabilitate animals for release back into the wild.",
          imageUrl: "/images/costa-rica-sloth.jpg",
          location: "Costa Rica",
          duration: "1 Week",
          volunteerFocus: "Wildlife Rehabilitation",
          priceRange: "From €690 per person",
          isFeatured: true,
          content: "Deep in the Costa Rican rainforest, this wildlife sanctuary rescues, rehabilitates, and releases nearly 200 animals each year — including sloths, monkeys, anteaters, and exotic birds. Founded in 1999 by two young conservationists who began selling handmade crafts to fund rainforest protection, the sanctuary has grown into a vital hub for the region's wildlife.\n\nAs a volunteer, you will play a hands-on role in the daily care of the animals. Activities include preparing and distributing nutritious meals tailored to each species' dietary needs, creating enrichment activities that help rescued animals exercise natural instincts and build skills needed for survival in the wild, and keeping enclosures clean and maintained to excellent welfare standards.\n\nYou may also have the chance to witness animal rescues and releases first-hand — from rescuing a monkey that needs medical attention to releasing a rehabilitated sloth back into its forest home.\n\nBeyond animal care, volunteers help with reforestation, general sanctuary maintenance, painting, gathering natural materials, and supporting the smooth running of the centre. One day a week you may visit the local marina for a meal by the ocean, and on your day off you can relax by the on-site pool, explore the local area, or try kayaking, parasailing, zip-lining, or visit a nearby national park.\n\nThe project runs year-round and families can join for as little as one week. Accommodation, meals, and airport transfers are included. Families simply need to arrange flights, travel insurance, and visa fees.\n\nThis is a truly inspiring experience where your family can make a real difference to vulnerable wildlife while immersed in one of the most biodiverse countries on Earth.",
        },
        {
          title: "Borneo: Orangutan & Rainforest Conservation",
          slug: "borneo-orangutan-rainforest",
          description: "Explore the Bornean rainforest with your family — plant trees to restore orangutan habitat, cruise rivers teeming with wildlife, trek through ancient jungle, and live alongside an indigenous community.",
          imageUrl: "/images/borneo-orangutan.jpg",
          location: "Sukau, Borneo",
          duration: "1 Week",
          volunteerFocus: "Orangutan & Rainforest Conservation",
          priceRange: "From €1,080 per person",
          isFeatured: true,
          content: "Journey to the Lower Kinabatangan Floodplain in Borneo — a WWF-protected 'Corridor of Life' that sustains some of the world's most extraordinary wildlife, from orangutans and pygmy elephants to proboscis monkeys, hornbills, and sun bears. Deforestation has devastated much of this habitat, and without intervention many species may not survive another generation.\n\nAs a family, you will help reforest depleted areas by learning to plant and maintain saplings on dedicated restoration sites. The trees you plant will grow to provide shelter and food for rainforest wildlife and create safe passageways through the corridor for animals to move freely.\n\nBetween conservation work, your family will embark on unforgettable river cruises through the heart of the rainforest, with an expert guide pointing out wildlife at every turn — in the trees, along the banks, and in the water below. You will also trek through magnificent ancient jungle, learning about the flora, fauna, and traditional medicinal plants used by local communities for generations.\n\nA highlight of the experience is living alongside the Orang Sungai — the 'People of the River' — who will share their homes, stories, family traditions, and way of life with you. Your children will exchange cultural experiences, and you may be invited to join in traditional crafts, music, and dance. The trip concludes with a visit to a renowned orangutan rehabilitation centre, where you will witness feeding times and see these incredible great apes up close.\n\nAccommodation, meals, guided activities, and transfers from Sandakan Airport are all included. Families simply need to arrange flights, travel insurance, and visa fees.\n\nThis is a truly immersive adventure that blends meaningful conservation work with extraordinary wildlife encounters and deep cultural exchange — an experience your family will never forget.",
        },
        {
          title: "Namibia: Desert Elephant Conservation",
          slug: "namibia-desert-elephant",
          description: "A wild camping adventure in the Namib Desert — track elephant herds, camp under the stars, learn survival skills on bush walks, and help local communities coexist peacefully with these majestic animals.",
          imageUrl: "/images/namibia-elephants.jpg",
          location: "Namib Desert, Namibia",
          duration: "1 Week",
          volunteerFocus: "Elephant Conservation",
          priceRange: "From €1,280 per person",
          isFeatured: true,
          content: "In the stunning drylands of the Namib Desert lives one of only two desert-dwelling elephant populations in the world. Reduced to just 300 in the 1980s, these herds are now growing — but with larger numbers comes greater demand for water and food, bringing elephants into conflict with local farming communities. Your family will play a crucial role in helping herds and villages coexist peacefully.\n\nThe adventure begins at a local primary school on the banks of the Ugab River, where your family will spend several days assisting with age-appropriate building projects and maintenance, interacting with pupils through play, arts and crafts, and lessons. This is a wonderful cultural exchange that encourages young minds to care about elephant conservation and leaves a lasting impact on the community.\n\nFrom there, you will move to a bush base camp where nature walks with expert guides teach survival skills — which plants are edible, how to track wild animals on foot, and how to read the desert landscape. You may spot springbok, oryx, kudu, giraffe, zebra, and even critically endangered black rhino.\n\nThe highlight is several days of elephant patrols and tracking. Your family will pack up patrol vehicles and head into the desert to search for herds, recording data on births, deaths, movement patterns, and mating behaviour. Each night you will set up camp wherever the elephants lead you, sleeping under a blanket of stars and drifting off to the sounds of the Namibian night.\n\nAccommodation ranges from a riverside school camp and a treehouse base camp to wild camping during patrols. Meals and transfers from Swakopmund are included. Families simply need to arrange flights, travel insurance, and visa fees.\n\nThis is the ultimate outdoor family adventure — combining meaningful conservation work with extraordinary wildlife encounters, cultural exchange, and the magic of sleeping under African skies.",
        },
        {
          title: "Sri Lanka: Elephant Conservation & Community",
          slug: "sri-lanka-elephant-conservation",
          description: "Help protect Asiatic elephants on the edge of a national park in Sri Lanka — monitor herds, gather vital research data, repair homes damaged by human-elephant conflict, and teach English in local schools.",
          imageUrl: "/images/sri-lanka-elephant.jpg",
          location: "Wasgamuwa, Sri Lanka",
          duration: "1 Week",
          volunteerFocus: "Elephant Conservation",
          priceRange: "From €930 per person",
          isFeatured: true,
          content: "Based on the outskirts of a stunning national park in central Sri Lanka, this conservation project works to protect Asiatic elephants and reduce human-elephant conflict. In the last century, approximately 90% of Sri Lanka's elephant population has disappeared, with around 200 elephants and 80 people still lost each year due to conflict between communities and herds.\n\nAs a volunteer, you will spend afternoons and evenings in a jeep along the 'elephant corridor', watching for herds to emerge and gathering data on their size, sex, and physical features. This information helps the project monitor populations and predict areas of potential conflict. You will also complete trail transects to locate and analyse elephant dung — revealing age, size, gender, eating patterns, and movement.\n\nMornings are devoted to species monitoring using camera traps, GPS tracking, remote sensors, and bird-mapping surveys to assess the overall health of the forest ecosystem. You may spot leopards, sloth bears, wild boar, deer, and a wealth of bird species. A trip to the nearby national park offers an unforgettable safari experience.\n\nThe project has pioneered innovative solutions to human-elephant conflict, including planting citrus trees around villages to deter elephants while creating a sustainable income for residents. Volunteers help monitor these systems and may assist with repairing homes, wells, and food stores damaged by elephant raids. A free 'Elebus' service safely transports children through elephant corridors to school — and you may help with the school run.\n\nThree mornings a week, volunteers teach English at local schools, working with children from primary age through to teenagers, helping them understand both the language and the importance of elephant conservation.\n\nWeekends are free to explore Sri Lanka's cultural triangle, ancient World Heritage sites, or simply relax in the stunning surroundings.\n\nAccommodation, meals, and airport transfers are included. Families simply need to arrange flights, travel insurance, and visa fees.",
        },
        {
          title: "Peru: Amazon Wildlife Sanctuary",
          slug: "peru-amazon-wildlife",
          description: "Live in the heart of the Amazon Rainforest and help rehabilitate rescued wildlife — from manatees and monkeys to wild cats and sloths — while searching for pink river dolphins and exploring ancient indigenous cultures.",
          imageUrl: "/images/peru-wildlife.jpg",
          location: "Iquitos, Peru",
          duration: "1 Week",
          volunteerFocus: "Wildlife Rehabilitation",
          priceRange: "From €570 per person",
          isFeatured: true,
          content: "Deep in the Peruvian Amazon — the second-largest expanse of rainforest on Earth — this wildlife sanctuary works in collaboration with local authorities to rescue, rehabilitate, and release native species. From gentle Amazonian manatees and playful monkeys to agile wild cats and charming sloths, the sanctuary provides a safe haven for animals rescued from poaching, habitat loss, and the illegal wildlife trade.\n\nAs a volunteer, you will play a hands-on role in the daily care of the animals. You will prepare species-specific meals in the sanctuary kitchen — meat for carnivores, fruits and vegetables for herbivores, and milk bottles for babies. You will design and build creative enrichment activities that stimulate natural behaviours and prepare animals for release. You will observe and monitor wildlife behaviour, contributing vital data that guides rehabilitation and care strategies.\n\nSanctuary maintenance is equally important — cleaning enclosures, repairing fences, remodelling habitats, and ensuring every animal enjoys the best possible quality of life.\n\nCommunity outreach is at the heart of the project. Weekly classes blend environmental education with English, art, and science for local children, inspiring the next generation of environmental ambassadors. Volunteers may also join campaigns in the wider community, helping develop sustainable ways for people to coexist with the rainforest.\n\nA highlight is a boat ride along the Amazon River in search of pink river dolphins — one of only four river dolphin species in the world. Longer stays unlock extraordinary experiences: a trek through the Allpahuayo Mishana National Reserve with its world-record biodiversity, and a visit to the Maloca Kukama Tribe for traditional face painting, dancing, and cultural exchange.\n\nIn your free time, hike to a creek, float across a serene lake inhabited by rehabilitated manatees and giant Arapaima fish, or organise day adventures with the sanctuary team.\n\nAccommodation, meals, and airport transfers from Iquitos are included. Families simply need to arrange flights, travel insurance, and visa fees.",
        },
        {
          title: "Zimbabwe: Wildlife Conservation",
          slug: "zimbabwe-wildlife-safari-stables",
          description: "Live on a 3,000-acre private game reserve in the heart of Zimbabwe, combining hands-on wildlife conservation with horseback safaris, elephant encounters, and community education.",
          imageUrl: "/images/zimbabwe-wildlife-safari-stables.png",
          location: "Gweru, Zimbabwe",
          duration: "1 Week",
          volunteerFocus: "Wildlife Conservation",
          priceRange: "From €955 per person",
          isFeatured: true,
          content: "Set on a vast 3,000-acre private game reserve in Zimbabwe's Midlands Province, this extraordinary project blends hands-on wildlife conservation with the thrill of horseback safaris and deeply rewarding community work.\n\nThe reserve is home to an incredible diversity of African wildlife — zebra, wildebeest, giraffes, impala, kudu, and over 200 bird species roam freely across the open bushveld. The project also cares for lions, elephants, and rhinos as part of dedicated conservation programmes.\n\nAs a volunteer, your days are rich and varied. You will walk alongside elephants through the African bush, learning about their behaviour and the challenges they face. You will monitor rhinos on foot — standing just metres from these magnificent animals — recording vital data that supports anti-poaching efforts. Lion enrichment sessions let you observe and contribute to the welfare of resident big cats.\n\nWhat sets this project apart is its remarkable safari stables programme. Whether you are an experienced rider or a complete beginner, you can enjoy horseback safaris riding alongside giraffes, zebras, and wildebeest. Sunrise rides across the open bush, horse swims, polocrosse, showjumping, and cross-country are all on offer. The stables also run a horse therapy programme for local children with disabilities — a deeply moving experience for volunteers and families alike.\n\nEvening game drives offer the chance to spot nocturnal wildlife, and bonfire nights under the vast African sky are a highlight of the social calendar.\n\nCommunity work is central to the experience. You will visit local schools to teach English, maths, and life skills, support school infrastructure projects, and connect with children and families in the surrounding area.\n\nAccommodation is in authentic African river tents with private balconies overlooking the bush. Full board meals, a swimming pool, laundry service, WiFi, and all project activities with professional guides are included. Families simply need to arrange flights, travel insurance, and visa fees.\n\nWith wildlife on your doorstep, horses in the stables, and a community that welcomes you with open arms, this is an African adventure unlike any other.",
        }
      ]).onConflictDoUpdate({
        target: alegraPackages.slug,
        set: {
          title: sql`excluded.title`,
          description: sql`excluded.description`,
          imageUrl: sql`excluded.image_url`,
          location: sql`excluded.location`,
          duration: sql`excluded.duration`,
          volunteerFocus: sql`excluded.volunteer_focus`,
          priceRange: sql`excluded.price_range`,
          isFeatured: sql`excluded.is_featured`,
          content: sql`excluded.content`,
        },
      });

    await db.insert(alegraPosts).values([
        {
          title: "Why Voluntourism is the Best Way to Travel with Kids",
          slug: "why-voluntourism-best-family",
          summary: "Discover how giving back as a family creates lifelong lessons in empathy and global citizenship.",
          content: "Travel has always been one of the greatest classrooms. But when you add purpose to your journey, it becomes something even more powerful — especially for kids. That's where voluntourism comes in.\n\n1. It Turns Travel Into Contribution, Not Just Consumption\n\nTraditional vacations often focus on what we can see, do, and buy. Voluntourism shifts the focus toward what we can give.\n\nWhether your family is helping restore a coastal habitat, participating in a community garden project, supporting local environmental clean-ups, or assisting with small-scale conservation efforts, children see firsthand that travel isn't just about taking photos — it's about making a positive impact.\n\nThat simple shift in perspective can stay with them for life.\n\n2. It Builds Empathy Through Experience\n\nWhen children step outside their everyday environment and work alongside local communities, empathy grows naturally.\n\nInstead of observing another culture from a distance, they engage with it. They learn how environmental challenges, resource access, and sustainability efforts affect real families in real places.\n\nOrganizations such as Habitat for Humanity (for community-focused projects) or conservation-driven groups like The Nature Conservancy show how travel can support both people and planet — a powerful lesson for young minds.\n\n3. It Connects Kids to Nature in a Meaningful Way\n\nMany family volunteer programs include hands-on environmental components: tree planting, trail restoration, beach cleanups, waterway monitoring, or sustainable farming initiatives.\n\nThese activities allow children to move beyond passive appreciation of nature into active stewardship.\n\nInstead of simply hiking through a forest, they might help restore one. Instead of just visiting a beach, they help protect it.\n\nThat sense of responsibility builds respect for the natural world without overwhelming the experience with heavy conservation messaging.\n\n4. It Encourages Teamwork and Confidence\n\nVolunteering levels the playing field within a family. Parents and children work side by side toward a shared goal.\n\nKids aren't just along for the ride — they're contributors. That builds confidence. It reinforces that age doesn't limit impact.\n\nCompleting a meaningful project together creates a deeper sense of accomplishment than simply checking tourist attractions off a list.\n\n5. It Sparks Important Conversations\n\nPurposeful travel opens the door to thoughtful discussions:\n\nWhy is sustainability important?\n\nHow do communities protect their natural resources?\n\nWhat can we do differently at home?\n\nThese conversations extend the trip's impact far beyond the return flight.\n\n6. It Creates Lasting Memories With Meaning\n\nChildren may not remember every landmark. But they'll remember planting trees together. They'll remember working with local families. They'll remember feeling useful and needed.\n\nThose memories carry pride.\n\nAnd when travel stories are rooted in connection — to people, to place, to purpose — they shape how kids view the world and their role within it.\n\nChoosing the Right Program\n\nNot all voluntourism experiences are equal. Look for programs that:\n\nAre community-led or community-supported\n\nPrioritize sustainability\n\nOffer age-appropriate roles for children\n\nFocus on long-term impact rather than short-term optics\n\nResearch carefully, ask questions, and choose organisations that are transparent about their mission and outcomes.\n\nThe Bottom Line\n\nTravelling with kids isn't just about seeing the world — it's about helping them understand how they fit into it.\n\nVoluntourism blends adventure with awareness. It allows families to explore new places while contributing to the well-being of both communities and the environment.\n\nAnd in doing so, it transforms a family vacation into something far more powerful: a shared experience of purpose.",
          coverImage: "/images/voluntourism-hero.jpg",
          author: "Alegra Team",
          tags: ["Family Travel", "Impact", "Global Citizenship"],
        },
        {
          title: "Safety First: Planning a Volunteer Trip with Children",
          slug: "safety-volunteer-trip-kids",
          summary: "Everything you need to know about health, safety, and choosing the right project for your family's ages.",
          content: "Volunteering as a family can be one of the most meaningful ways to travel. Sharing hands-on experiences — whether supporting community initiatives, helping with conservation projects, or participating in local sustainability efforts — creates lasting memories and valuable life lessons.\n\nBut when children are involved, one principle must guide every decision: safety first.\n\nHere's how to thoughtfully plan a volunteer trip that keeps your family secure while still delivering a powerful, purpose-driven experience.\n\n1. Choose a Reputable Organisation\n\nThe foundation of a safe volunteer experience starts with who you travel with.\n\nLook for established organisations with transparent policies, strong safety protocols, and clear communication. Before booking, ask:\n\nWhat are your child safeguarding policies?\n\nAre staff background-checked and trained?\n\nWhat emergency protocols are in place?\n\nIs there 24/7 local support?\n\nIf an organisation can't confidently answer these questions, that's a red flag.\n\n2. Prioritise Age-Appropriate Projects\n\nNot all volunteer roles are suitable for children.\n\nWhen reviewing programmes, ensure that tasks are physically appropriate for your child's age, supervised at all times, structured with clear safety guidelines, and designed for family participation.\n\nFor example, tree planting, beach cleanups, community gardening, and light conservation monitoring are generally safer and more adaptable for kids than construction or complex wildlife handling projects.\n\nThe goal is meaningful participation — not risk.\n\n3. Research the Destination Thoroughly\n\nUnderstanding your destination is essential. Check official travel advisories and local health requirements.\n\nConsider:\n\nPolitical stability\n\nAccess to medical facilities\n\nWeather conditions\n\nTransportation safety\n\nLanguage barriers\n\nThe more informed you are, the better prepared you'll be.\n\n4. Get Comprehensive Travel Insurance\n\nTravel insurance is non-negotiable when volunteering with children.\n\nEnsure your policy covers medical emergencies, evacuation and repatriation, trip cancellation, and volunteer activities specifically — not all policies do. Confirm that any planned project is covered under your plan.\n\n5. Prepare Kids in Advance\n\nSafety isn't only physical — it's emotional too.\n\nBefore departure, explain the purpose of the trip clearly, discuss cultural differences respectfully, set behavioural expectations, and talk about personal boundaries and who they should go to if they feel uncomfortable.\n\nWhen children understand what to expect, they're more confident and less likely to feel overwhelmed.\n\n6. Pack Smart\n\nBeyond standard travel essentials, consider first aid supplies tailored to your child's needs, sun protection, insect repellent, reusable water bottles, and any prescription medications with copies of prescriptions.\n\nIf participating in environmental projects, bring appropriate clothing: closed-toe shoes, work gloves if recommended, and weather-appropriate layers.\n\nPrepared families are safer families.\n\n7. Respect Wildlife and Environmental Guidelines\n\nIf your volunteer trip includes nature-based components, follow strict safety and ethical standards.\n\nAvoid direct wildlife interaction unless supervised and essential, feeding animals, and entering restricted conservation areas.\n\nTeach children that protecting nature also means respecting boundaries.\n\n8. Maintain Family Oversight\n\nEven with reputable organisations, parents remain the primary guardians.\n\nStay present during activities, observe staff-child interactions, trust your instincts, and encourage open communication daily.\n\nCreate a simple routine where everyone shares how they're feeling at the end of each day. Small check-ins prevent small concerns from becoming bigger problems.\n\n9. Build in Rest Time\n\nVolunteer trips can be physically and emotionally demanding — especially for children.\n\nBalance work with downtime. Schedule rest days. Allow space for play and exploration without structured responsibility.\n\nExhaustion increases risk. Well-rested children are safer, happier participants.\n\n10. Model Safe and Respectful Behaviour\n\nChildren take their cues from you.\n\nWear protective gear. Follow local guidelines. Respect cultural norms. Stay hydrated. Speak kindly and thoughtfully.\n\nWhen you model responsibility, children internalise it.\n\nThe Bottom Line\n\nVolunteering as a family can be transformative — strengthening bonds, building empathy, and teaching lifelong values. But none of that matters without thoughtful preparation.\n\nWhen safety is prioritised — through careful research, clear communication, strong supervision, and realistic expectations — a volunteer trip becomes not only meaningful but secure.\n\nBecause the most powerful family experiences are the ones where everyone returns home inspired, empowered… and safe.",
          coverImage: "/images/safety-first-hero.jpg",
          author: "Alegra Team",
          tags: ["Safety", "Planning", "Volunteering"],
        }
      ]).onConflictDoUpdate({
        target: alegraPosts.slug,
        set: {
          title: sql`excluded.title`,
          summary: sql`excluded.summary`,
          content: sql`excluded.content`,
          coverImage: sql`excluded.cover_image`,
          author: sql`excluded.author`,
          tags: sql`excluded.tags`,
        },
      });
  }
}

export const storage = new DatabaseStorage();
