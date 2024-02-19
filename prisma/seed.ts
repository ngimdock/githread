import { faker } from "@faker-js/faker";
import { Post, Prisma, PrismaClient, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

type PrimaTransactionType = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

const NOMBER_OF_USERS = 10;
const NOMBER_OF_POSTS = 100;
const NOMBER_OF_LIKES = 200;

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$transaction(async (prismaTransactionInstance) => {
    const users = await createRandomUsers(
      NOMBER_OF_USERS,
      prismaTransactionInstance
    );

    const posts = await createRandomPosts(
      NOMBER_OF_POSTS,
      users,
      prismaTransactionInstance
    );
    await createrandomLikes(
      NOMBER_OF_LIKES,
      users,
      posts,
      prismaTransactionInstance
    );
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function createRandomUsers(
  nomberOfUsers: number,
  prismaTransaction: PrimaTransactionType
): Promise<User[]> {
  const users = [];

  for (let i = 1; i <= nomberOfUsers; i++) {
    const user: Prisma.UserCreateInput = {
      email: faker.internet.email(),
      name: faker.person.firstName(),
      username: faker.internet.userName(),
      image: faker.image.avatar(),
      bio: faker.lorem.paragraph(),
    };

    const createdUser = await prismaTransaction.user.create({ data: user });

    users.push(createdUser);
  }

  return users;
}

async function createRandomPosts(
  nomberOfPosts: number,
  users: User[],
  prismaTransaction: PrimaTransactionType
): Promise<Post[]> {
  const posts = [];

  for (let i = 1; i <= nomberOfPosts; i++) {
    const randomUserIndex = faker.number.int({
      min: 0,
      max: users.length - 1,
    });

    const randomWoldCount = faker.number.int({
      min: 5,
      max: 15,
    });

    const post: Prisma.PostUncheckedCreateInput = {
      content: faker.lorem.sentence(randomWoldCount),
      userId: users[randomUserIndex].id,
    };

    const createdPost = await prismaTransaction.post.create({ data: post });

    posts.push(createdPost);
  }

  return posts;
}

async function createrandomLikes(
  nomberOfLikes: number,
  users: User[],
  posts: Post[],
  prismatransaction: PrimaTransactionType
): Promise<void> {
  for (let i = 1; i <= nomberOfLikes; i++) {
    const randomUserIndex = faker.number.int({
      min: 0,
      max: users.length - 1,
    });

    const randomPostIndex = faker.number.int({
      min: 0,
      max: posts.length - 1,
    });

    const like: Prisma.LikeUncheckedCreateInput = {
      userId: users[randomUserIndex].id,
      postId: posts[randomPostIndex].id,
    };

    await prismatransaction.like.create({ data: like });
  }
}
