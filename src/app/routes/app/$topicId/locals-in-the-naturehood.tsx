import Content from '@/features/content/components/content-panel'
import ChecklistCard from '@/features/custom/components/checklist-card'
import { useTopic } from '@/features/topic/hooks/use-topic'
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { FaBinoculars } from 'react-icons/fa'
import { LuInfo } from 'react-icons/lu'
import Arbutus from "@/assets/LocalsNatureHood/Arbutus.jpg"
import AmericanWigeon from "@/assets/LocalsNatureHood/AmericanWigeon.jpg"
import BaldEagle from "@/assets/LocalsNatureHood/BaldEagle.jpg"
import BananaSlug from "@/assets/LocalsNatureHood/BananaSlug.jpg"
import BeltedKingfisher from "@/assets/LocalsNatureHood/BeltedKingfisher.jpg"
import Eelgrass from "@/assets/LocalsNatureHood/Eelgrass.jpg"
import Bumblebee from "@/assets/LocalsNatureHood/Bumblebee.jpg"
import CommonCamas from "@/assets/LocalsNatureHood/CommonCamas.jpg"
import FawnLily from "@/assets/LocalsNatureHood/FawnLily.jpg"
import GarryOak from "@/assets/LocalsNatureHood/GarryOak.jpg"
import HermitCrab from "@/assets/LocalsNatureHood/HermitCrab.jpg"
import HoodedMerganser from "@/assets/LocalsNatureHood/HoodedMerganser.jpg"
import JunePlum from "@/assets/LocalsNatureHood/JunePlum.jpg"
import LorquinsAdmiral from "@/assets/LocalsNatureHood/LorquinsAdmiral.jpg"
import Orca from "@/assets/LocalsNatureHood/Orca.jpg"
import GreatBlueHeron from "@/assets/LocalsNatureHood/GreatBlueHeron.jpg"
import HarbourSeal from "@/assets/LocalsNatureHood/HarbourSeal.jpg"
import PacificChorusFrog from "@/assets/LocalsNatureHood/PacificChorusFrog.jpg"
import PacificWren from "@/assets/LocalsNatureHood/PacificWren.jpg"
import DouglasFir from "@/assets/LocalsNatureHood/DouglasFir.jpg"
import RedSquirrel from "@/assets/LocalsNatureHood/RedSquirrel.jpg"
import RiverOtter from "@/assets/LocalsNatureHood/RiverOtter.jpg"
import Salmon from "@/assets/LocalsNatureHood/Salmon.jpg"
import Salmonberry from "@/assets/LocalsNatureHood/Salmonberry.jpg"
import WesternPurpleMartin from "@/assets/LocalsNatureHood/WesternPurpleMartin.jpg"
import WesternTerrestrialGarterSnake from "@/assets/LocalsNatureHood/WesternTerrestrialGarterSnake.jpg"
import WoodDuck from "@/assets/LocalsNatureHood/WoodDuck.jpg"

export const Route = createFileRoute(
  '/app/$topicId/locals-in-the-naturehood',
)({
  component: RouteComponent,
})

// Locals in the NatureHood Checklist Storage
const STORAGE_GROUP = "nitc";
const isCheckInStorage = (name: string) => {
  const checkStore = localStorage.getItem(STORAGE_GROUP + "." + name);
  return checkStore === "true" ? true : false;
};
const onCheckChange = (name: string) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem(STORAGE_GROUP + "." + name, event.target.checked ? 'true' : 'false');
  };
};

const locals = [
  {
    name: "Arbutus",
    nameScientific: "Arbutus menziesii",
    nameIndigenous: "ḰOḰE,IȽĆ",
    description:
      "A broadleaf evergreen tree, up to 30 m tall, usually with a crooked or leaning trunk that divides into several twisting upright branches and an irregularly rounded crown. The tree drops its leaves in the summer instead of the fall. The tree’s reddish bark peels off, revealing the smooth, new green bark underneath.",
    image: Arbutus
  },
  {
    name: "American Wigeon",
    nameScientific: "Mareca americana",
    nameIndigenous: "ŚEŚENE",
    description:
      "Also known as a Baldpate, the American Wigeon is a species of dabbling duck found in North America. Formerly assigned to Anas, this species is classified with the other wigeons in the dabbling duck genus Mareca. It is the New World counterpart of the Eurasian wigeon.",
    image: AmericanWigeon
  },
  {
    name: "Bald Eagle",
    nameScientific: "Haliaeetus leucocephalus",
    nameIndigenous: "QELEṈSEN",
    description:
      "The adult Bald Eagle is a striking dark brownish-black bird. It gets its white head and tail at approximately four years of age. The Bald Eagle is not bald. They got the name from an old English word “balde” meaning white (white- headed). They can grow to about 1 m tall and have a wingspread of over 2 m.",
    image: BaldEagle
  },
  {
    name: "Banana Slug",
    nameScientific: "Ariolimax columbianus",
    nameIndigenous: "PENÁNE KÍOṮEN",
    description:
      "Banana Slugs are one of the largest slugs in the world! They can grow up to 26 cm long. Banana Slugs can also have 27,000 teeth on a long tooth- covered “tongue”. They come in a range of colours, from yellow to brown to black and many are mottled with black spots. Banana slugs like a moist, cool environment and are native to the BC temperate coastal rainforest.",
    image: BananaSlug
  },
  {
    name: "Belted Kingfisher",
    nameScientific: "Megaceryle alcyon",
    nameIndigenous: "ȾĆELE",
    description:
      "The Belted Kingfisher is a pigeon-sized bird. It is blue-gray above, white below, with a bushy crest and dagger-like bill. The male has a blue-gray breast band. The female is similar, but also has a chestnut belly band.",
    image: BeltedKingfisher
  },
  {
    name: "Eelgrass",
    nameScientific: "Zostera marina",
    nameIndigenous: "ĆELEM",
    description:
      "Sometimes known as the 'salmon highway', Eelgrass is important to the survival of salmon. A native seagrass, it rivals some of the world’s richest rainforests. It provides food and protection important to fish and shellfish species.",
    image: Eelgrass
  },
  {
    name: "Bumblebee",
    nameScientific: "Bombus",
    nameIndigenous: "SEMSEMÍYE",
    description:
      "The native bumblebee has a robust black body that is extensively covered with black, yellow, and sometimes orange hairs on all body segments. Its colonies nest underground and unlike honey bees, they prefer to be out pollinating in cool, cloudy weather.",
    image: Bumblebee
  },
  {
    name: "Common Camas",
    nameScientific: "Camassia quamash",
    nameIndigenous: "ḰȽO,EL",
    description:
      "Common Camas (on the cover) and Great Camas have light to deep blue flowers and bloom in the spring. Both are perennial herbs that grow from an edible bulb. They were once an im- portant cultural item for the Salish in the area who shaped the landscape to “farm” it. They are not to be confused with the Death Camas, which has a creamy white flower, but underground, the bulbs can be difficult to identify and toxic if consumed.",
    image: CommonCamas
  },
  {
    name: "Fawn Lily",
    nameScientific: "Erythronium revolutum",
    // nameIndigenous: '',
    description:
      "Fawn Lily plants grow to over 30 cm tall, and have pairs of long, thick, white-spotted leaves growing from the base. The flowers are pink and some- times almost look fluorescent. The leaves show up in springtime and the flowers open in early summer.",
    image: FawnLily
  },
  {
    name: "Garry Oak",
    nameScientific: "Quercus garryana",
    nameIndigenous: "ĆEṈ,IȽĆ",
    description:
      "An iconic tree with thick, grooved, scaly, greyish-black bark and a round spreading crown. Garry Oak trees (on the cover) can grow out of rock and be super stunted, adapting to its environment, or grow up to 20 m tall, and the Garry Oak habitat supports many species at risk.",
    image: GarryOak
  },
  {
    name: "Hermit Crab",
    nameScientific: "Paguroidea",
    //nameIndigenous: '',
    description:
      "Hermit Crabs tend to live in ‘secondhand’ or previously owned and discarded shells. For this reason, it is important to leave empty shells where you find them.",
    image: HermitCrab
  },
  {
    name: "Hooded Merganser",
    nameScientific: "Mergus cucullatus",
    nameIndigenous: "X̱OE₭",
    description:
      "This small duck has a slender pointed bill. The male has a white, fan-shaped, black-bordered crest, a blackish body with dull rusty flanks, and a white breast with two black stripes down the side. The female is dull gray-brown, with a warmer brown head and crest. Both sexes show a white wing patch in flight.",
    image: HoodedMerganser
  },
  {
    name: "June Plum",
    nameScientific: "Oemleria cerasiformis",
    nameIndigenous: "ȾEX̱EṈ",
    description:
      "This shrub is also known as osoberry. It is native to the Pacific coast and mountain ranges of North America. It is among the first plants to fruit and it flowers in early spring.",
    image: JunePlum
  },
  {
    name: "Lorquin’s Admiral",
    nameScientific: "Limenitis lorquini",
    nameIndigenous: "QELAXEN",
    description:
      "This butterfly can easily be recognized by the orange tips on the upper part of its wings. There is a white band across both wings, above and below. Females are considerably larger than males.",
    image: LorquinsAdmiral
  },
  {
    name: "Orca",
    nameScientific: "Orcinus orca",
    nameIndigenous: "ḴEL,ȽOLEMEĆEN",
    description:
      "The Orca is the largest member of the oceanic dolphin family. This toothed whale has a diverse diet, although individual populations often specialize in particular types of prey. Some feed exclusively on fish, while others hunt marine mammals such as seals and other species of dolphin.",
    image: Orca
  },
  {
    name: "Great Blue Heron",
    nameScientific: "Ardea herodias",
    nameIndigenous: "SṈE₭E",
    description:
      "This large wading bird is common near the shores of open water and in wetlands over most of Greater Victoria. Despite their impressive size, Great Blue Herons (on the cover) weigh only 2 to 3 kg thanks in part to their hollow bones, a feature shared by all birds.",
    image: GreatBlueHeron
  },
  {
    name: "Harbour Seal",
    nameScientific: "Phoca vitulina",
    nameIndigenous: "ÁSW̱",
    description:
      "Harbour Seals are found along the coast in coastal waters, estuaries and river systems. Look for them basking in the sun on the rocks along the shore. They range in colour from brownish to black with a speckled pattern.",
    image: HarbourSeal
  },
  {
    name: "Pacific Chorus Frog",
    nameScientific: "Pseudacris regilla",
    nameIndigenous: "WEKEK",
    description:
      "This small frog is usually about 5 cm long full grown. They can be green, bronze, grey, and all colours in between. Pacific Chorus Frogs can be heard calling throughout the year, especially during rainstorms, and the spring mating choruses are impossible to miss. It’s very difficult to spot these little fellows, though, since they will cease calling if they feel threatened.",
    image: PacificChorusFrog
  },
  {
    name: "Pacific Wren",
    nameScientific: "Troglodytes pacificus",
    nameIndigenous: "DEDEM",
    description:
      "These birds are very vocal, so listen for their rapid series of tumbling and trill- ing notes in forest environments. When you hear their sweet song, patiently look in the understory for mouse-like movements along decaying logs and in upturned roots. Early mornings during the breeding season are the best times to find them perched in the open, shaking as they sing.",
    image: PacificWren
  },
  {
    name: "Douglas-Fir",
    nameScientific: "Pseudotsuga menziesii",
    nameIndigenous: "JSȺ",
    description:
      "There are two varieties of Douglas-fir: they are Coastal and Interior. The Coastal variety that grows in the NatureHood can reach heights of 80 m.",
    image: DouglasFir
  },
  {
    name: "Red Squirrel",
    nameScientific: "Tamiasciurus hudsonicus",
    nameIndigenous: "ĆEPSIOŦEN",
    description:
      "This small tree squirrel prefers coniferous forests. They spend most of their day in the tree canopy and will chirp loudly when you get close, which makes it easier to find them by listen- ing than by sight. Their colour will change during the winter season to a greyish brown hue without a black side stripe.",
    image: RedSquirrel
  },
  {
    name: "River Otter",
    nameScientific: "Lontra Canadensis",
    nameIndigenous: "ĆTEMES",
    description:
      "River Otters have short coarse fur and lengthy, streamlined bodies. They have short powerful legs with fully webbed toes and a long tail to help them swim efficiently underwater while searching for fish, their main source of food.",
    image: RiverOtter
  },
  {
    name: "Salmon",
    nameScientific: "Oncorhynchus kisutch",
    nameIndigenous: "SĆÁÁNEW̱",
    description:
      "Salmon are large fish, in various colours from silver and grey with dark spots or fins. Chinook, can weigh up to 36 kg. There are 6 species of Pacific Salmon (Oncorhynchus spp.): Chinook, Chum, Coho, Pink, Sockeye, and Steelhead.",
    image: Salmon
  },
  {
    name: "Salmonberry",
    nameScientific: "Rubus spectabilis",
    nameIndigenous: "ELILE",
    description:
      "Salmonberry grows in groups and reaches up to 4 m tall. Look for the butterfly-shaped basil leaves, and the pink flowers that bloom in spring. Its salmon-red coloured berries ripen in summer. The thorny stems of the plant are covered in papery brown bark.",
    image: Salmonberry
  },
  {
    name: "Western Purple Martin",
    nameScientific: "Progne subis arboricola",
    nameIndigenous: "QSEĆEN",
    description:
      "This iridescent dark blue/purple bird occurs exclusively west of the Rocky Mountains from southwest BC to southern California. They have been designated as a species at risk in BC are recovering from a severe population decline in the mid-late 1900s. (on the cover)",
    image: WesternPurpleMartin
  },
  {
    name: "Western Terrestrial Garter Snake",
    nameScientific: "Thamnophis elegans vagrans",
    nameIndigenous: "SOȽḴE",
    description:
      "Also known as the “wandering” Garter Snake, this species is a frequent visitor to many back s throughout its range. Garter Snakes are rarely found far from water, either fresh or marine. During the summer, these snakes prefer open areas like meadows and estuaries.",
    image: WesternTerrestrialGarterSnake
  },
  {
    name: "Wood Duck",
    nameScientific: "Aix sponsa",
    nameIndigenous: "MO,EḴ",
    description:
      "This species of perching duck breeds most widely in the wooded valleys and floodplains of southern British Columbia. It is one of the most colorful North American waterfowl.",
    image: WoodDuck
  },
];

function RouteComponent() {
  const { topicId } = Route.useParams()
  
  // TODO: Refactor to one API call, use future endpoint useTab(tabId)
  const [loadingTopic, errorTopic, topic] = useTopic('nature-in-the-city-map')
  
  // Extract currently active tab from list of tabs for dropdown menu
  let otherTabs = topic?.tabs.slice() ?? []
  otherTabs.sort((a, b) => a.displayOrder - b.displayOrder)

  // TODO: handle and display loading and error states.

  return topicId !== 'nature-in-the-city-map' ? (
        <Navigate to="/app/$topicId" params={{ topicId: topicId }} />
      ) : (
    <Content
      loading={loadingTopic}
      title={topic?.title ?? 'Topic'}
      tabs={otherTabs}
      activeTab={{link: '', label: 'Locals in the NatureHood', icon: <FaBinoculars />}}
    >
      <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: '500', lineHeight: '130%', textShadow: 'rgba(0,0,0,0.3) 1px 1px 4px', marginTop: '.25rem', marginBottom: '1rem'}}>
        Use this handy checklist to track the Locals you have seen in the
        NatureHood. Artwork by{" "}
        <a href="https://www.kristibridgeman.com/" target='_blank' rel='noreferrer'>
          Kristi Bridgeman
        </a>
        .
      </p>
      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500', fontSize: '0.75rem'}}>
        <LuInfo style={{ display: 'inline' }} /> Data is kept on your device,
        cannot be transfered to another device, and is never sent to the
        cloud, RUSH, or anyone.
      </p>
      <div style={{
        margin: '0.25rem',
        padding: '0.25rem',
        backgroundColor: '#eef4d6',
        boxShadow: 'rgba(0,0,0,0.1) 0 2px 4px;',
      }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400', fontSize: '0.875rem', fontStyle: 'italic'}}>
          NatureHood recognizes that language is critical for connecting the{" "}
          <span style={{ color: "#ffaa2d" }}>W̱SÁNEĆ</span> and{" "}
          <span style={{ color: "#0d3396" }}>lək̓ʷəŋən</span> speaking peoples
          to their culture, spirituality, identity and land.&emsp;
          <span style={{ color: "#ffaa2d", fontStyle: "normal" }}>
            ■&nbsp;SENĆOŦEN
          </span>
          &emsp;
          <span style={{ color: "#0d3396", fontStyle: "normal" }}>
            ■&nbsp;lək̓ʷəŋən
          </span>
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'stretch'}}>
        { locals.map((local) => (
          <ChecklistCard
            key={local.name}
            {...local}
            onCheckChange={onCheckChange(local.name)}
            defaultChecked={isCheckInStorage(local.name)}
          />
        ))}
      </div>
      {errorTopic ? errorTopic.message : null}
    </Content>
  )
}
