import GithubProvider from "next-auth/providers/github";
import { env } from "./env";
import { AuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      profile(profile) {
        console.log({ profile });

        return {
          id: profile.id,
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) session.user.id = user.id;

      return session;
    },
  },
};

export const getAuthSession = async () => {
  const session = await getServerSession(authOptions);

  return session;
};

export const getAuthRequiredSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Not session found");
  }

  return session;
};
