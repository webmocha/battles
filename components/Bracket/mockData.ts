export const packages = {
  react: {
    outcome: -123,
    downloads: [
      {
        downloads: 1028650,
        day: "2019-03-25",
      },
      {
        downloads: 0,
        day: "2019-03-26",
      },
    ],
    package: "react",
    start: "2019-03-25",
    end: "2019-03-26",
  },
  vue: {
    outcome: 123,
    downloads: [
      {
        downloads: 178361,
        day: "2019-03-25",
      },
      {
        downloads: 0,
        day: "2019-03-26",
      },
    ],
    package: "vue",
    start: "2019-03-25",
    end: "2019-03-26",
  },
  angular: {
    outcome: 321,
    downloads: [
      {
        downloads: 80292,
        day: "2019-03-25",
      },
      {
        downloads: 0,
        day: "2019-03-26",
      },
    ],
    package: "angular",
    start: "2019-03-25",
    end: "2019-03-26",
  },
  mithril: {
    outcome: -321,
    downloads: [
      {
        downloads: 2380,
        day: "2019-03-25",
      },
      {
        downloads: 0,
        day: "2019-03-26",
      },
    ],
    package: "mithril",
    start: "2019-03-25",
    end: "2019-03-26",
  },
  knockout: {
    outcome: 567,
    downloads: [
      {
        downloads: 4532,
        day: "2019-03-25",
      },
      {
        downloads: 4578,
        day: "2019-03-26",
      },
    ],
    package: "knockout",
    start: "2019-03-25",
    end: "2019-03-26",
  },
  preact: {
    outcome: -567,
    downloads: [
      {
        downloads: 25314,
        day: "2019-03-25",
      },
      {
        downloads: 27271,
        day: "2019-03-26",
      },
    ],
    package: "preact",
    start: "2019-03-25",
    end: "2019-03-26",
  },
};

export const matches = [
  [["react", "vue"], ["angular"]],
  [["vue", "angular"]],
  [["angular"]],
];
