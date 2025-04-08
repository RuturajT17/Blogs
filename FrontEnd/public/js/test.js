// Fetch blogs from your backend API
async function fetchBlogs() {
    try {
        const response = await fetch('http://localhost:3000/api/blogs');
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
}

// Create blog card HTML
function createBlogCard(blog) {
    return `
        <div class="blog-card" data-id="${blog.blog_id}">
            <div class="blog-image-container">
                <img src="${blog.image_url || '/public/images/blog-placeholder.jpg'}" 
                     alt="${blog.title}" 
                     class="blog-image">
                <div class="category-badge">${blog.category}</div>
            </div>
            <div class="blog-content">
                <div class="blog-meta-top">
                    <span class="blog-date">${new Date(blog.created_at).toLocaleDateString()}</span>
                    <span class="read-time">${Math.ceil(blog.content.length / 1000)} min read</span>
                </div>
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.content.substring(0, 150)}...</p>
                <div class="blog-tags">
                    ${blog.keywords ? blog.keywords.split(',').map(keyword => 
                        `<span class="tag">${keyword.trim()}</span>`
                    ).join('') : ''}
                </div>
            </div>
            <div class="blog-meta">
                <div class="author-info">
                    <img src="/public/images/profile-placeholder.png" 
                         alt="Author" 
                         class="author-img">
                    <span class="author-name">John Doe</span>
                </div>
                <div class="blog-actions">
                    <button class="action-btn like-btn">
                        <i class="far fa-heart"></i>
                        <span class="count">42</span>
                    </button>
                    <button class="action-btn comment-btn">
                        <i class="far fa-comment"></i>
                        <span class="count">8</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Display blogs with animations
async function displayBlogs() {
    const blogContainer = document.getElementById('blogContainer');
    blogContainer.innerHTML = '<div class="loading-blogs"><i class="fas fa-spinner fa-spin"></i> Loading blogs...</div>';
    
    const blogs = await fetchBlogs();
    
    if (blogs.length === 0) {
        blogContainer.innerHTML = '<div class="error-message">No blogs found. Create one!</div>';
        return;
    }
    
    blogContainer.innerHTML = '';
    
    // Add each blog with staggered animation
    blogs.forEach((blog, index) => {
        const card = document.createElement('div');
        card.innerHTML = createBlogCard(blog);
        blogContainer.appendChild(card.firstElementChild);
        
        // Add animation delay based on index
        card.firstElementChild.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // 1. Show loading state
        const blogContainer = document.getElementById('blogContainer');
        blogContainer.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Loading blogs...</p>
            </div>
        `;

        // 2. Fetch blogs from your backend
        const response = await fetch('http://localhost:3000/api/blogs');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blogs = await response.json();
        
        // 3. Clear loading state
        blogContainer.innerHTML = '';
        
        // 4. Check if we got blogs
        if (blogs.length === 0) {
            blogContainer.innerHTML = `
                <div class="alert alert-info">
                    No blogs found. Create your first blog!
                </div>
            `;
            return;
        }
        
        // 5. Display each blog
        blogs.forEach(blog => {
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card mb-4';
            blogCard.innerHTML = `
                <div class="card h-100">
                    <img src="${blog.image_url || '/public/images/blog-placeholder.jpg'}" 
                         class="card-img-top blog-image" 
                         alt="${blog.title}">
                    <div class="card-body">
                        <span class="badge bg-primary mb-2">${blog.category}</span>
                        <h5 class="card-title">${blog.title}</h5>
                        <p class="card-text">${blog.content.substring(0, 100)}...</p>
                    </div>
                    <div class="card-footer bg-transparent">
                        <small class="text-muted">
                            Posted on ${new Date(blog.created_at).toLocaleDateString()}
                        </small>
                    </div>
                </div>
            `;
            blogContainer.appendChild(blogCard);
        });
        
    } catch (error) {
        console.error('Error loading blogs:', error);
        document.getElementById('blogContainer').innerHTML = `
            <div class="alert alert-danger">
                Failed to load blogs. Please try again later.
                <br><small>${error.message}</small>
            </div>
        `;
    }
});