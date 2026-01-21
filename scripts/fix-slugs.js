const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function fixSlugs() {
  const posts = await prisma.blogPost.findMany();

  console.log(`Found ${posts.length} posts`);
  let fixedCount = 0;

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
      fixedCount++;
    } else {
      console.log(`Skipped "${post.title}" - slug is already valid: ${post.slug}`);
    }
  }

  console.log(`\n✅ Fixed ${fixedCount} slugs!`);
}

fixSlugs()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
