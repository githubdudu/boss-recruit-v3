import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { connectToDatabase, disconnectFromDatabase } from "./mongodb.js";
import { MessageModel } from "./models/MessageModel.js";
import { ConversationModel } from "./models/ConversationModel.js";
import { UserModel } from "./models/UserModel.js";

// Dummy data for initial users, ten recruiters and ten applicants
const DUMMY_USERS = [
  {
    userName: "recruiter1",
    userPassword: "password1",
    userType: "recruiter",
    avatar: "/images/avatars/man.png",
    email: "recruiter1@example.com",
    salary: 50000,
    company: "Tech Corp",
    jobPosition: "Software Engineer",
    address: "Los Angeles, CA",
    description: "Experienced software engineer with a passion for building scalable applications.",
  },
  {
    userName: "recruiter2",
    userPassword: "password2",
    userType: "recruiter",
    avatar: "/images/avatars/woman.png",
    email: "recruiter2@example.com",
    salary: 60000,
    company: "Tech Corp",
    jobPosition: "Product Manager",
    address: "San Francisco, CA",
    description: "Product manager with a track record of successful product launches.",
  },
  {
    userName: "recruiter3",
    userPassword: "password3",
    userType: "recruiter",
    avatar: "/images/avatars/man2.png",
    email: "recruiter3@example.com",
    salary: 70000,
    company: "Tech Corp",
    jobPosition: "Data Scientist",
    address: "Auckland, NZ",
    description: "Data scientist with expertise in machine learning and data analysis.",
  },
  {
    userName: "recruiter4",
    userPassword: "password4",
    userType: "recruiter",
    avatar: "/images/avatars/woman2.png",
    email: "recruiter4@example.com",
    salary: 80000,
    company: "Tech Corp",
    jobPosition: "UX Designer",
    address: "Sydney, AU",
    description: "UX designer with a focus on user-centered design and usability testing.",
  },
  {
    userName: "recruiter5",
    userPassword: "password5",
    userType: "recruiter",
    avatar: "/images/avatars/man3.png",
    email: "recruiter5@example.com",
    salary: 90000,
    company: "Tech Corp",
    jobPosition: "Marketing Manager",
    address: "Christchurch, NZ",
    description: "Marketing manager with experience in digital marketing and brand strategy.",
  },
  {
    userName: "recruiter6",
    userPassword: "password6",
    userType: "recruiter",
    avatar: "/images/avatars/avatar_8323209.png",
    email: "recruiter6@example.com",
    salary: 110000,
    company: "Northwind Labs",
    jobPosition: "Backend Engineer",
    address: "Wellington, NZ",
    description: "Backend engineer focused on distributed systems and API design.",
  },
  {
    userName: "recruiter7",
    userPassword: "password7",
    userType: "recruiter",
    avatar: "/images/avatars/girl_435066.png",
    email: "recruiter7@example.com",
    salary: 95000,
    company: "Harbour Analytics",
    jobPosition: "DevOps Engineer",
    address: "Melbourne, AU",
    description:
      "DevOps engineer who has spent the last six years turning fragile deployment scripts into boring, repeatable pipelines. Comfortable owning infrastructure end to end.",
  },
  {
    userName: "recruiter8",
    userPassword: "password8",
    userType: "recruiter",
    avatar: "/images/avatars/pirate_3530467.png",
    email: "recruiter8@example.com",
    salary: 130000,
    company: "Kōwhai Digital",
    jobPosition: "Engineering Manager",
    address: "Hamilton, NZ",
    description: "Engineering manager for two platform teams.",
  },
  {
    userName: "recruiter9",
    userPassword: "password9",
    userType: "recruiter",
    avatar: "/images/avatars/man.png",
    email: "recruiter9@example.com",
    salary: 78000,
    company: "Southern Cross Software",
    jobPosition: "QA Lead",
    address: "Dunedin, NZ",
    description:
      "QA lead building test strategy from scratch, with a bias towards fast feedback over exhaustive suites.",
  },
  {
    userName: "recruiter10",
    userPassword: "password10",
    userType: "recruiter",
    avatar: "/images/avatars/woman.png",
    email: "recruiter10@example.com",
    salary: 145000,
    company: "Meridian Cloud",
    jobPosition: "Solutions Architect",
    address: "Brisbane, AU",
    description:
      "Solutions architect working with enterprise customers on migrations. Spends most of the week translating between what the business asked for and what the system can actually do.",
  },
  {
    userName: "applicant1",
    userPassword: "password1",
    userType: "applicant",
    avatar: "/images/avatars/woman3.png",
    email: "applicant1@example.com",
    education: ["Bachelor's in Computer Science"],
    experience: ["2 years in software development"],
    skills: ["JavaScript", "React", "Node.js"],
    phone: "123-456-7890",
  },
  {
    userName: "applicant2",
    userPassword: "password2",
    userType: "applicant",
    avatar: "/images/avatars/man4.png",
    email: "applicant2@example.com",
    education: ["Master's in Business Administration"],
    experience: ["3 years in product management"],
    skills: ["Agile", "Scrum", "Product Strategy"],
    phone: "987-654-3210",
  },
  {
    userName: "applicant3",
    userPassword: "password3",
    userType: "applicant",
    avatar: "/images/avatars/woman4.png",
    email: "applicant3@example.com",
    education: ["Bachelor's in Data Science"],
    experience: ["4 years in data analysis"],
    skills: ["Python", "Machine Learning", "SQL"],
    phone: "456-789-1230",
  },
  {
    userName: "applicant4",
    userPassword: "password4",
    userType: "applicant",
    avatar: "/images/avatars/man5.png",
    email: "applicant4@example.com",
    education: ["Bachelor's in Design"],
    experience: ["5 years in UX design"],
    skills: ["Figma", "User Research", "Prototyping"],
    phone: "321-654-9870",
  },
  {
    userName: "applicant5",
    userPassword: "password5",
    userType: "applicant",
    avatar: "/images/avatars/woman5.png",
    email: "applicant5@example.com",
    education: ["Master's in Marketing"],
    experience: ["3 years in digital marketing"],
    skills: ["SEO", "Content Marketing", "Social Media"],
    phone: "654-321-0987",
  },
  {
    userName: "applicant6",
    userPassword: "password6",
    userType: "applicant",
    avatar: "/images/avatars/man2.png",
    email: "applicant6@example.com",
    education: ["Bachelor's in Software Engineering"],
    experience: ["1 year as a junior backend developer"],
    skills: ["Go", "PostgreSQL", "Docker"],
    phone: "021-555-0142",
  },
  {
    userName: "applicant7",
    userPassword: "password7",
    userType: "applicant",
    avatar: "/images/avatars/woman2.png",
    email: "applicant7@example.com",
    education: ["Master's in Human-Computer Interaction", "Bachelor's in Psychology"],
    experience: ["4 years in product design", "1 year freelancing"],
    skills: ["Figma", "Accessibility", "Design Systems", "User Interviews"],
    phone: "021-555-0198",
  },
  {
    userName: "applicant8",
    userPassword: "password8",
    userType: "applicant",
    avatar: "/images/avatars/man3.png",
    email: "applicant8@example.com",
    education: ["Diploma in Web Development"],
    experience: ["6 years building client sites"],
    skills: ["TypeScript", "Vue", "Tailwind CSS"],
    phone: "021-555-0233",
  },
  {
    userName: "applicant9",
    userPassword: "password9",
    userType: "applicant",
    avatar: "/images/avatars/woman3.png",
    email: "applicant9@example.com",
    education: ["PhD in Statistics", "Master's in Applied Mathematics"],
    experience: ["3 years in quantitative research", "2 years lecturing"],
    skills: ["R", "Python", "Bayesian Inference", "Data Visualisation", "SQL"],
    phone: "021-555-0307",
  },
  {
    userName: "applicant10",
    userPassword: "password10",
    userType: "applicant",
    avatar: "/images/avatars/man4.png",
    email: "applicant10@example.com",
    education: ["Bachelor's in Information Systems"],
    experience: ["8 years in platform and reliability engineering"],
    skills: ["Kubernetes", "Terraform", "Observability", "Incident Response"],
    phone: "021-555-0451",
  },
];

const LOREM = [
  // Not words
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Curabitur pretium tincidunt lacus.",
  "Nulla gravida orci a odio.",
  "Nullam varius, turpis et commodo pharetra, est eros bibendum elit.",
  "Aenean ut eros et nisl sagittis vestibulum.",
  "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
  "In enim justo, rhoncus ut, imperdiet a, venenatis vitae",
  "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.",
  "Aliquam erat volutpat.",
  "Phasellus iaculis neque.",
  "Phasellus leo dolor, tempus non, auctor et, hendrerit quis.",
  "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  "Et harum quidem rerum facilis est et expedita distinctio.",
  "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
  "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
  "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
];

async function initDatabase() {
  await connectToDatabase();

  await MessageModel.deleteMany({}); // Clear existing messages
  await ConversationModel.deleteMany({}); // Clear existing conversations
  await UserModel.deleteMany({}); // Clear existing users

  // Hash passwords for dummy users
  const hashedUsers = await Promise.all(
    DUMMY_USERS.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.userPassword = await bcrypt.hash(user.userPassword, salt);
      return user;
    }),
  );

  const userResult = await UserModel.insertMany(hashedUsers); // Insert new dummy users
  console.log(`💬 ${userResult.length} dummy users created! 💬`);

  const recruiters = await UserModel.find({ userType: "recruiter" }).lean();
  const applicants = await UserModel.find({ userType: "applicant" }).lean();

  const randomMessages = await createRandomMessages(recruiters, applicants);
  // disable auto timestamps
  const messageResult = await MessageModel.insertMany(randomMessages, { timestamps: false });

  const conversationCounts = await ConversationModel.countDocuments();
  console.log(
    `💬 ${messageResult.length} random messages created in ${conversationCounts} conversations! 💬`,
  );

  console.log("✨Database initialized done!✨");

  await disconnectFromDatabase();
}

initDatabase();

async function createRandomMessages(recruiters, applicants) {
  const randomMessages = [];
  const aDayAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  //  Chronological timestamps generator
  const nextRandomTime = getRandomTimeFrom(aDayAgo);

  for (let i = 0; i < LOREM.length * 5; i++) {
    const randomText = LOREM[Math.floor(Math.random() * LOREM.length)];

    const [randomRecruiterId, randomApplicantId] = createRandomParticipants(recruiters, applicants);
    const conversationId = await findOrCreateConversation(randomRecruiterId, randomApplicantId);

    // Create chronological timestamps
    const createdAt = nextRandomTime();
    randomMessages.push({
      senderId: Math.random() < 0.5 ? randomRecruiterId : randomApplicantId,
      conversationId: conversationId,
      text: randomText,
      createdAt: createdAt,
      updatedAt: createdAt,
    });
  }
  return randomMessages;
}

/** * Select random recruiters and applicants.
 * @param {Array} recruiters - Array of recruiter user objects.
 * @param {Array} applicants - Array of applicant user objects.
 * @returns {Array<mongoose.Types.ObjectId>} Array containing recruiter ID and applicant ID.
 */
function createRandomParticipants(recruiters, applicants) {
  const randomRecruiter = recruiters[Math.floor(Math.random() * recruiters.length)];
  const randomApplicant = applicants[Math.floor(Math.random() * applicants.length)];
  return [randomRecruiter._id, randomApplicant._id];
}

/**
 * Atomically finds a conversation or creates it if it doesn't exist.
 * Does NOT update the conversation if it already exists.
 * @param {mongoose.Types.ObjectId} recruiterId
 * @param {mongoose.Types.ObjectId} applicantId
 * @returns {Promise<mongoose.Types.ObjectId>} The _id of the found or created conversation.
 */
async function findOrCreateConversation(recruiterId, applicantId) {
  // 1. The Filter
  // Sorting ensures that the order of participants doesn't matter.
  const participantsArray = [recruiterId, applicantId].sort();
  const _id = participantsArray.join("_");

  const filter = {
    _id: _id,
  };

  // 2. The Update: This is the key part.
  // An empty update `{}` means "do nothing" if the document is found.
  // `$setOnInsert` specifies the data to use ONLY when a new document is created.
  const update = {
    $setOnInsert: {
      _id: _id,
      participants: participantsArray,
    },
  };

  // 3. The Options:
  const options = {
    upsert: true, // Create the document if it doesn't exist.
    returnDocument: "after", // Return the document after the update.
    setDefaultsOnInsert: true, // Apply schema defaults on creation.
  };

  const conversation = await ConversationModel.findOneAndUpdate(filter, update, options);

  return conversation._id;
}

/**
 * Generates a random timestamp starting from the given date.
 * The function maintains an internal state to incrementally generate
 * random timestamps within a 1-hour period from the last generated time.
 *
 * @param {Date|string} start - The starting date or timestamp.
 * @param {number} [period=3600000] - The period in milliseconds to generate random timestamps.
 * @returns {Object} An object with a `next` method to get the next random timestamp.
 */
function getRandomTimeFrom(start, period = 60 * 60 * 1000) {
  let startTime = new Date(start);

  return function next() {
    const randomOffset = Math.floor(Math.random() * period) + 1000;
    startTime = new Date(startTime.getTime() + randomOffset);
    return startTime;
  };
}
