const paginationMiddleware = (req, res, next) => {
    // Parse the 'page' and 'limit' query parameters and set defaults if not provided
    let page = parseInt(req.query.page, 10);
    let limit = parseInt(req.query.limit, 10);
  
    // Default values
    page = isNaN(page) || page <= 0 ? 1 : page ; // Ensure page is a positive integer
    limit = isNaN(limit) || limit <= 0 ? 5 : limit; // Ensure limit is a positive integer
    
    // Calculate the offset based on the page and limit
    req.pagination = {
      page,
      limit,
      offset: (page - 1) * limit,
    };
  
    next(); // Call the next middleware or route handler
  };
  
  module.exports = paginationMiddleware;
  