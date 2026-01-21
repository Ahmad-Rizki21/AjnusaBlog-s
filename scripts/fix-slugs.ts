import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function fixSlugs() {
  const posts = await prisma.blogPost.findMany();

  for (const post of posts) {
    // Check if slug is a UUID (contains only hexadecimal chars and dashes)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(post.slug);

    if (isUUID) {
      const newSlug = generateSlug(post.title);
      console.log(`Updating slug for "${post.title}":`);
      console.log(`  Old: ${post.slug}`);
      console.log(`  New: ${newSlug}`);

      await prisma.blogPost.update({
        where: { id: post.id },
        data: { slug: newSlug },
      });
    }
  }

  console.log('✅ All slugs fixed!');
}

fixSlugs()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
