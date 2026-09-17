// Wraps an async route/controller so thrown errors go to errorHandler
// instead of crashing the process or needing try/catch everywhere.
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
