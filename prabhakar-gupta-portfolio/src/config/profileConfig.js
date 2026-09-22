export const profileConfig = {
  github: {
    username: import.meta.env.VITE_GITHUB_USERNAME || "PrabhakarG001"
  },
  leetcode: {
    username: import.meta.env.VITE_LEETCODE_USERNAME || "PrabhakarG001"
  },
  codolio: {
    username: import.meta.env.VITE_CODOLIO_USERNAME || "PrabhakarG001",
    get profileUrl() {
      return `https://codolio.com/profile/${this.username}`;
    }
  },
  codeforces: {
    username: import.meta.env.VITE_CODEFORCES_USERNAME || "PrabhakarG001"
  }
};
