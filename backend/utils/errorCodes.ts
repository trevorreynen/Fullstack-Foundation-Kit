// ./backend/utils/errorCodes.ts

export const ERROR_MESSAGES = {
  // 400 – Bad Request
  MISSING_REQUIRED_FIELDS: 'Missing required fields',
  MISSING_LIKE_TARGET: 'Missing required like target',
  CANNOT_LIKE_BOTH: 'Cannot like both a post and comment at once',
  INVALID_USER_ID: 'Invalid userId',
  INVALID_PARENT_COMMENT: 'Invalid parent comment for this post',
  INVALID_USERNAME_OR_PASSWORD: 'Invalid username or password',
  INVALID_PASSWORD_FORMAT: 'Password must be at least 5 characters and include one lowercase, one uppercase, and one symbol',
  INVALID_FILE: 'Missing file',

  // 401 – Unauthorized
  UNAUTHORIZED: 'Unauthorized',
  INVALID_TOKEN: 'Invalid token',
  NOT_AUTHENTICATED: 'Not authenticated',
  PASSWORD_INCORRECT: 'Current password is incorrect',

  // 403 – Forbidden
  UNAUTHORIZED_ACTION: 'You are not authorized to perform this action',

  // 404 – Not Found
  USER_NOT_FOUND: 'User not found',
  POST_NOT_FOUND: 'Post not found',
  COMMENT_NOT_FOUND: 'Comment not found',
  SETTINGS_NOT_FOUND: 'Settings not found',

  // 409 – Conflict
  USERNAME_TAKEN: 'Username is already taken',
  EMAIL_IN_USE: 'Email is already in use',
  EMAIL_OR_USERNAME_EXISTS: 'Email or username already exists',

  // 500 – Server Errors
  SERVER_ERROR: 'Internal server error',
  ERROR_FETCHING_USER: 'Error fetching user data',
  ERROR_UPDATING_USERNAME: 'Error updating username',
  ERROR_UPDATING_EMAIL: 'Error updating email',
  ERROR_UPDATING_PASSWORD: 'Error updating password',
  ERROR_DELETING_USER: 'Error deleting user',
  ERROR_CREATING_POST: 'Error creating post',
  ERROR_EDITING_POST: 'Error editing post',
  ERROR_FETCHING_POST: 'Error fetching post',
  ERROR_DELETING_POST: 'Error deleting post',
  ERROR_FETCHING_POSTS: 'Error fetching posts',
  ERROR_FETCHING_USER_POSTS: 'Error fetching user posts',
  ERROR_CREATING_COMMENT: 'Error creating comment',
  ERROR_EDITING_COMMENT: 'Error editing comment',
  ERROR_DELETING_COMMENT: 'Error deleting comment',
  ERROR_FETCHING_COMMENTS: 'Error fetching comments',
  ERROR_COUNTING_COMMENTS: 'Failed to count comments',
  ERROR_CREATING_REPLY: 'Error creating reply',
  ERROR_TOGGLING_LIKE: 'Error toggling like',
  ERROR_FETCHING_LIKES: 'Error fetching likes',
  ERROR_FETCHING_LIKE_STATUS: 'Error checking like status',
  ERROR_UPLOADING_IMAGE: 'Error uploading image',
  REGISTRATION_FAILED: 'Registration failed',
  LOGIN_FAILED: 'Error logging in',
  ERROR_FETCHING_SETTINGS: 'Error loading user settings',
  ERROR_UPDATING_SETTINGS: 'Error updating user settings',
}
