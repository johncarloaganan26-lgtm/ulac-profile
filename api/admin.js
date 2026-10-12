const db = require('../db');

module.exports = async (req, res) => {
  // Generic admin router: normalizes path so it works with both Express mounting and serverless
  const { method } = req;
  const rawPath = (req.headers['x-matched-path'] || req.headers['x-now-route-matches'] || req.originalUrl || req.url || '').split('?')[0];
  let path = rawPath.replace(/^\/api\/admin/, '') || '/';
  if (!path.startsWith('/')) path = '/' + path;

  // GET /inquiries
  if (path === '/inquiries' && method === 'GET') {
    try {
      const rows = await db.getInquiries();
      return res.status(200).json({ data: rows });
    } catch (err) {
      console.error('Failed to load inquiries:', err);
      return res.status(500).json({ message: 'Failed to load inquiries' });
    }
  }

  // POST /inquiries
  if (path === '/inquiries' && method === 'POST') {
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
      const created = await db.createInquiry({ name, email, subject: subject || 'General Inquiry', message });
      return res.status(201).json({ data: created });
    } catch (err) {
      console.error('Failed to create inquiry:', err);
      return res.status(500).json({ message: 'Failed to create inquiry' });
    }
  }

  // DELETE /inquiries/:id
  const matchInquiryDelete = path.match(/^\/inquiries\/([^/]+)$/);
  if (matchInquiryDelete && method === 'DELETE') {
    const id = matchInquiryDelete[1];
    try {
      const deleted = await db.deleteInquiry(id);
      if (!deleted) return res.status(404).json({ message: 'Inquiry not found' });
      return res.status(200).json({ message: 'Deleted' });
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
      return res.status(500).json({ message: 'Failed to delete inquiry' });
    }
  }

  // GET /testimonials
  if (path === '/testimonials' && method === 'GET') {
    try {
      const rows = await db.getTestimonials();
      return res.status(200).json({ data: rows });
    } catch (err) {
      console.error('Failed to load testimonials:', err);
      return res.status(500).json({ message: 'Failed to load testimonials' });
    }
  }

  // GET /testimonials/approved
  if (path === '/testimonials/approved' && method === 'GET') {
    try {
      const rows = await db.getApprovedTestimonials();
      return res.status(200).json({ data: rows });
    } catch (err) {
      console.error('Failed to load approved testimonials:', err);
      return res.status(500).json({ message: 'Failed to load approved testimonials' });
    }
  }

  // POST /testimonials
  if (path === '/testimonials' && method === 'POST') {
    const { name, email, role, content, rating } = req.body || {};
    if (!name || !email || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
      const created = await db.createTestimonial({ name, email, role, content, rating });
      return res.status(201).json({ data: created });
    } catch (err) {
      console.error('Failed to create testimonial:', err);
      return res.status(500).json({ message: 'Failed to create testimonial' });
    }
  }

  // POST /testimonials/:id/approval
  const matchApproval = path.match(/^\/testimonials\/([^/]+)\/approval$/);
  if (matchApproval && method === 'POST') {
    const id = matchApproval[1];
    try {
      const isApproved = await db.toggleTestimonialApproval(id);
      if (isApproved == null) return res.status(404).json({ message: 'Testimonial not found' });
      return res.status(200).json({ data: { id, is_approved: isApproved } });
    } catch (err) {
      console.error('Failed to toggle testimonial approval:', err);
      return res.status(500).json({ message: 'Failed to toggle testimonial approval' });
    }
  }

  // DELETE /testimonials/:id
  const matchTestimonialDelete = path.match(/^\/testimonials\/([^/]+)$/);
  if (matchTestimonialDelete && method === 'DELETE') {
    const id = matchTestimonialDelete[1];
    try {
      const deleted = await db.deleteTestimonial(id);
      if (!deleted) return res.status(404).json({ message: 'Testimonial not found' });
      return res.status(200).json({ message: 'Deleted' });
    } catch (err) {
      console.error('Failed to delete testimonial:', err);
      return res.status(500).json({ message: 'Failed to delete testimonial' });
    }
  }

  // GET /views
  if (path === '/views' && method === 'GET') {
    try {
      const count = await db.incrementViews();
      return res.status(200).json({ views: count });
    } catch (err) {
      console.error('Failed to increment views:', err);
      return res.status(500).json({ message: 'Failed to update views' });
    }
  }

  return res.status(404).json({ message: 'Not found' });
};
