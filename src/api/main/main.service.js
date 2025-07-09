import pkg from "../../../package.json" with { type: 'json' };

export const getApiService = () => {
  const apiInfo = {
    title: pkg.name,
    description: pkg.description,
    version: pkg.version,
    author: {
      name: "David Serrano",
      username: "SurivZ",
      email: "franklinserrano23@gmail.com",
      github: "https://github.com/SurivZ",
    },

    documentation: "https://surivz-dev-team.postman.co/workspace/Team-Workspace~99acc882-3372-4fee-8b21-2898e960b2d0/collection/25097128-b258fdea-d65d-4f0b-a1ac-49ec86722e12?action=share&creator=25097128",
  };
  return apiInfo;
};
