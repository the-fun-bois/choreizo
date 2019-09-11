const faker = require('faker');

const createArrayOfSentences = numberOfSentences => {
  const sentenceArr = [];
  Array(numberOfSentences)
    .fill(1)
    .forEach(val => sentenceArr.push(faker.lorem.sentence()));
  return sentenceArr;
};

const choresSeed = [
  [
    {
      name: 'Clean the kitchen',
      difficulty: 3,
      penalty: 150,
      isActive: true,
      timeLimit: 1,
      details: ['wash dishes', 'wipe stove top'],
    },
    {
      name: 'Take out the trash',
      difficulty: 1,
      penalty: 100,
      isActive: true,
      timeLimit: 3,
      details: [
        'kitchen, living room, and bathroom',
        'dont forget to replace the bag!',
      ],
    },
    {
      name: 'Clean the bathroom',
      difficulty: 5,
      penalty: 1000,
      isActive: true,
      timeLimit: 7,
      details: ['wipe down toilet', 'scrub shower and sink area'],
    },
    {
      name: 'Feed the dog',
      difficulty: 1,
      penalty: 10000,
      isActive: true,
      timeLimit: 1,
      details: [
        'make sure water bowl is full',
        'mix one scoop of wet food with the kibble',
      ],
    },
    {
      name: 'Vacuum the living room',
      difficulty: 2,
      penalty: 200,
      isActive: true,
      timeLimit: 7,
      details: ['move the chairs before vacuuming under the table'],
    },
    {
      name: 'Teach REACTO',
      difficulty: 3,
      penalty: 150,
      isActive: true,
      timeLimit: 3,
      details: createArrayOfSentences(Math.floor(Math.random() * 3) + 1),
    },

    {
      name: 'Walk the dog',
      difficulty: 2,
      penalty: 1000,
      isActive: true,
      timeLimit: 1,
      details: ['20 minutes minimum', 'make sure he poops'],
    },
    {
      name: 'Make dinner',
      difficulty: 3,
      penalty: 250,
      isActive: true,
      timeLimit: 1,
      details: ['Tom is allergic to carrots', 'Jackie hates cilantro'],
    },
  ],
  [
    {
      name: 'Grade Papers',
      difficulty: Math.floor(Math.random() * 10) + 1,
      penalty: 100,
      isActive: true,
      timeLimit: Math.floor(Math.random() * 7) + 1,
      details: createArrayOfSentences(Math.floor(Math.random() * 3) + 1),
    },
    {
      name: 'Sign paychecks',
      difficulty: Math.floor(Math.random() * 10) + 1,
      penalty: 100,
      isActive: true,
      timeLimit: Math.floor(Math.random() * 7) + 1,
      details: createArrayOfSentences(Math.floor(Math.random() * 3) + 1),
    },
    {
      name: 'Office Hours',
      difficulty: Math.floor(Math.random() * 10) + 1,
      penalty: 100,
      isActive: true,
      timeLimit: Math.floor(Math.random() * 7) + 1,
      details: createArrayOfSentences(Math.floor(Math.random() * 3) + 1),
    },
  ],
];

module.exports = choresSeed;
