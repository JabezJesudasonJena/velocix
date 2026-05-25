// utils/catchAsync.js

export const catchAsync = (fn) => {
    return (req, res, next) => {
        // Promise.resolve ensures both async and sync errors are caught
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};