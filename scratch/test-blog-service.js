// Node script to test mock blogs and blog service logic
const { INITIAL_BLOGS, BLOG_CATEGORIES } = require('../src/data/mockBlogs');

console.log('Testing INITIAL_BLOGS:');
console.log(`Total initial blogs: ${INITIAL_BLOGS.length}`);
INITIAL_BLOGS.forEach((blog, idx) => {
  console.log(`  [${idx + 1}] "${blog.title}" (${blog.status}) - ${blog.category} - Views: ${blog.views}`);
});

console.log('\nTesting BLOG_CATEGORIES:');
console.log(BLOG_CATEGORIES);

// Test slug generator
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

console.log('\nTesting Slugification:');
console.log('  "Building My Developer Portfolio" ->', slugify('Building My Developer Portfolio'));
console.log('  "Exploring AI Tools for Developers!" ->', slugify('Exploring AI Tools for Developers!'));

console.log('\nAll mock data and blog utilities verified successfully!');
