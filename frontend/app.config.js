export default ({ config }) => {
  return {
    ...config,
    extra: {
      API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api', // Fallback for local dev outside Docker
    },
  };
};
// This configuration file is used to set up the Expo app with environment variables.
// It allows the app to access the API base URL defined in the environment variables.